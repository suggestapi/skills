---
name: suggestapi-search
description: Implement full ranked search through SuggestAPI. Use for application search, ecommerce catalog search, filters, result pages, or replacing provider-specific client search calls with GET /v1/autocomplete. Do not use for search-bar typeahead alone, Shopify-specific storefront wiring, or ingestion.
license: MIT
compatibility: Requires network access to api.suggestapi.com for live API testing. Coding workflows may require access to the target application's source tree.
metadata:
  author: suggestapi
  version: "0.2.0"
---

# Implement search with SuggestAPI

Full/ranked search uses `GET https://api.suggestapi.com/v1/autocomplete`. Do not use `POST /query`.

## Workflow

1. Inspect the existing search call site, query parameters, filters, pagination, and result rendering.
2. Identify the SuggestAPI `index` slug for the catalog.
3. Replace provider-specific search requests with `GET /v1/autocomplete` while preserving the UI contract.
4. Authenticate browser/public search with `x-api-key`. Use `Authorization: Bearer` only for trusted server-side writes, not for storefront search.
5. Send `query`, `index`, and a `limit` (1–50). Add `mode` (`hybrid`, `fts_only`, `vector_only`, or `fts_rerank`) and `filters` (JSON string) when the UI needs them.
6. Map `suggestions[]` (`id`, `title`, `subtitle`, `url`, `image_url`, `price`, `currency`, and `extra`) into the application's result model.
7. Handle empty `suggestions`, `degraded: true`, rate limits, and missing URLs without fabricating products.
8. Prove the integration with the bundled smoke test before calling the work done.

## Request shape

Read `references/api.md`, then verify the current Search API docs plus `https://api.suggestapi.com/openapi.json` before shipping.

## Verify

From this skill directory:

```bash
node scripts/validate-config.mjs --api-key "$SUGGESTAPI_PUBLIC_KEY" --index products
node scripts/smoke-test.mjs --api-key "$SUGGESTAPI_PUBLIC_KEY" --index products --query "running shoes"
```

The smoke test must return HTTP 200, a `suggestions` array, `id`/`title` on hits, and no upstream provider credentials.

## Architecture preference

Keep the client bound to SuggestAPI's `index` slug. Do not send a `backend` field or provider config in the request.

## Security

Do not leak upstream provider admin credentials. Use a public SuggestAPI key in the browser; keep private keys on the server.
