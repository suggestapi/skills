#!/usr/bin/env node
/**
 * Live SuggestAPI typeahead smoke test.
 *
 * Usage:
 *   node scripts/smoke-test.mjs --api-key "$SUGGESTAPI_PUBLIC_KEY" --index products --query "run"
 */

const BASE = "https://api.suggestapi.com";
const CREDENTIAL_RE =
  /algolia|typesense|meilisearch|elastic(?:search)?[-_ ]?(?:admin|api)?[-_ ]?key|x-algolia-api-key/i;

function parseArgs(argv) {
  const out = { limit: "8" };
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

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const apiKey = args["api-key"] || process.env.SUGGESTAPI_PUBLIC_KEY || process.env.SUGGESTAPI_KEY;
  const index = args.index || process.env.SUGGESTAPI_INDEX || "products";
  const query = args.query || "run";
  const limit = args.limit || "8";

  if (!apiKey) {
    fail("missing --api-key or SUGGESTAPI_PUBLIC_KEY");
    return;
  }

  const url = new URL(`${BASE}/v1/typeahead`);
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
  if (CREDENTIAL_RE.test(text)) {
    fail("response appears to contain upstream provider credential material");
    return;
  }

  console.log("OK: HTTP 200 typeahead");
  console.log(JSON.stringify({ endpoint: "typeahead", index, query, count: body.suggestions.length }));
}

main().catch((error) => {
  fail(error instanceof Error ? error.message : String(error));
});
