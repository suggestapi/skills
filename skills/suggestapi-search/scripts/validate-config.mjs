#!/usr/bin/env node
/**
 * Fail fast if live API smoke-test inputs are missing.
 *
 * Usage:
 *   node scripts/validate-config.mjs --api-key "$SUGGESTAPI_PUBLIC_KEY" --index products
 */

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) continue;
    const key = arg.slice(2);
    const value = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : "true";
    out[key] = value;
  }
  return out;
}

const args = parseArgs(process.argv.slice(2));
const apiKey = args["api-key"] || process.env.SUGGESTAPI_PUBLIC_KEY || process.env.SUGGESTAPI_KEY;
const index = args.index || process.env.SUGGESTAPI_INDEX;

const errors = [];
if (!apiKey) errors.push("missing --api-key or SUGGESTAPI_PUBLIC_KEY");
if (!index) errors.push("missing --index or SUGGESTAPI_INDEX");
if (apiKey && /algolia|typesense|elastic/i.test(apiKey)) {
  errors.push("api key looks like an upstream provider credential; use a SuggestAPI public key");
}

if (errors.length) {
  for (const error of errors) console.error(`FAIL: ${error}`);
  process.exit(1);
}

console.log("OK: SuggestAPI smoke-test config is present (key not printed)");
