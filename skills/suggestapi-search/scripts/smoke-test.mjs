#!/usr/bin/env node
/**
 * Live SuggestAPI search smoke test.
 *
 * Usage:
 *   node scripts/smoke-test.mjs --api-key "$SUGGESTAPI_PUBLIC_KEY" --index products --query "running shoes"
 */

const BASE = "https://api.suggestapi.com";
const CREDENTIAL_RE =
  /algolia|typesense|meilisearch|elastic(?:search)?[-_ ]?(?:admin|api)?[-_ ]?key|x-algolia-api-key/i;

function parseArgs(argv) {
  const out = { endpoint: "autocomplete", limit: "8" };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) continue;
    const key = arg.slice(2);
    const value = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : "true";
    out[key] = value;
  }
  return out;
}

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
}

function ok(message) {
  console.log(`OK: ${message}`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const apiKey = args["api-key"] || process.env.SUGGESTAPI_PUBLIC_KEY || process.env.SUGGESTAPI_KEY;
  const index = args.index || process.env.SUGGESTAPI_INDEX || "products";
  const query = args.query || "running shoes";
  const endpoint = args.endpoint === "typeahead" ? "typeahead" : "autocomplete";
  const limit = args.limit || "8";

  if (!apiKey) {
    fail("missing --api-key or SUGGESTAPI_PUBLIC_KEY");
    return;
  }

  const url = new URL(`${BASE}/v1/${endpoint}`);
  url.searchParams.set("index", index);
  url.searchParams.set("query", query);
  url.searchParams.set("limit", String(limit));

  const response = await fetch(url, {
    headers: { "x-api-key": apiKey, accept: "application/json" },
  });

  const text = await response.text();
  if (response.status !== 200) {
    fail(`HTTP ${response.status}: ${text.slice(0, 300)}`);
    return;
  }
  ok("HTTP 200");

  let body;
  try {
    body = JSON.parse(text);
  } catch {
    fail("response is not JSON");
    return;
  }

  if (!Array.isArray(body.suggestions)) {
    fail("suggestions[] missing");
    return;
  }
  ok(`suggestions[] length ${body.suggestions.length}`);

  if (CREDENTIAL_RE.test(text)) {
    fail("response appears to contain upstream provider credential material");
    return;
  }
  ok("no upstream credential strings in payload");

  if (body.degraded === true) {
    console.warn("WARN: degraded=true; do not fabricate products from this response");
  } else {
    ok("degraded is not true");
  }

  for (const [i, hit] of body.suggestions.entries()) {
    if (!hit || typeof hit.id !== "string" || !hit.id.trim()) {
      fail(`suggestions[${i}].id missing`);
      return;
    }
    if (typeof hit.title !== "string" || !hit.title.trim()) {
      fail(`suggestions[${i}].title missing`);
      return;
    }
  }
  if (body.suggestions.length) ok("each suggestion has id and title");

  console.log(JSON.stringify({ endpoint, index, query, count: body.suggestions.length, degraded: Boolean(body.degraded) }));
}

main().catch((error) => {
  fail(error instanceof Error ? error.message : String(error));
});
