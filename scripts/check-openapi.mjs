#!/usr/bin/env node
const spec = await fetch("https://api.suggestapi.com/openapi.json").then((response) => {
  if (!response.ok) throw new Error(`OpenAPI HTTP ${response.status}`);
  return response.json();
});

const paths = spec.paths || {};
const errors = [];

if (!paths["/v1/autocomplete"]?.get) errors.push("OpenAPI missing GET /v1/autocomplete");
if (!paths["/v1/typeahead"]?.get) errors.push("OpenAPI missing GET /v1/typeahead");
if (paths["/query"]) errors.push("OpenAPI unexpectedly defines /query; update skills before teaching it");

if (errors.length) {
  for (const error of errors) console.error(`FAIL: ${error}`);
  process.exit(1);
}

console.log("OK: live OpenAPI still documents GET /v1/autocomplete and GET /v1/typeahead, not POST /query");
