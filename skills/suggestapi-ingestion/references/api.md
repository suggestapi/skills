# SuggestAPI API quick reference

Base URL: `https://api.suggestapi.com`

Canonical search surface is the [Search API](https://www.suggestapi.com/docs/reference/search-api/). Verify fields against the live OpenAPI spec at `https://api.suggestapi.com/openapi.json` before shipping.

## Authentication

| Use | Header |
| --- | --- |
| Browser or public search (`/v1/autocomplete`, `/v1/typeahead`) | `x-api-key: $SUGGESTAPI_KEY` (public key) |
| Index create, documents, ingest jobs, and other writes | `Authorization: Bearer $SUGGESTAPI_KEY` (private key) |

Do not put a private key in storefront JavaScript, Liquid, or agent manifests.

## Ranked search: `GET /v1/autocomplete`

Primary ranked search endpoint. Use this for result pages, catalog search, and rich suggestion cards — not `POST /query`.

```bash
curl "https://api.suggestapi.com/v1/autocomplete?index=products&query=diaphragm%20pump&limit=8&mode=hybrid" \
  -H "x-api-key: $SUGGESTAPI_KEY"
```

Documented query params:

- `query` required, minimum 1 character
- `index` logical index ID, defaults to `default`
- `limit` 1–50
- `mode` one of `fts_only`, `vector_only`, `hybrid`, `fts_rerank`
- `filters` JSON string for exact and range filters
- `user_id` personalization-aware ranking when enabled
- `bypass_cache` or header `X-Bypass-Cache` for trusted diagnostics only

Do not send undocumented `rewrite`, `cache`, or `backend` body/query fields.

## Prefix suggestions: `GET /v1/typeahead`

Fast prefix endpoint for search-as-you-type. Lighter payloads than autocomplete. OpenAPI: for full search with ranking, use `/v1/autocomplete`.

```bash
curl "https://api.suggestapi.com/v1/typeahead?index=products&query=ptf&limit=5" \
  -H "x-api-key: $SUGGESTAPI_KEY"
```

Common params: `query`, `index`, `limit`, `bypass_cache` / `X-Bypass-Cache`.

## HTTP QUERY

OpenAPI also documents HTTP `QUERY` on `/v1/autocomplete` and `/v1/typeahead` with a JSON body. Prefer `GET` unless the client already speaks `QUERY`.

## Response shape

Expect `suggestions[]` plus query metadata. Typical suggestion fields: `id`, `type`, `title`, `subtitle`, `desc`, `url`, `image_url`, `price`, `currency`, `score`, `extra`. Query metadata includes `query`, `original_query`, `corrected_query`, `expanded_query`, `mode`, and `degraded`.

## Index routing

Clients send a SuggestAPI `index` slug only. Do not pass an upstream engine name in the request. BYOS/adapter routing, when used, is configured in SuggestAPI — not in client search calls.

## Do not generate

Marketing pages may show `POST /query` with `Authorization: Bearer` and a `backend` field. That path is not in the Search API docs or OpenAPI. Do not implement it.

## Security boundary

Never put upstream Algolia admin keys, Typesense API keys, or Elastic credentials into storefront bundles, agent manifests, or generated client code.

## Source of truth

- https://www.suggestapi.com/docs/reference/search-api/
- https://www.suggestapi.com/docs/getting-started/authentication/
- https://api.suggestapi.com/openapi.json
