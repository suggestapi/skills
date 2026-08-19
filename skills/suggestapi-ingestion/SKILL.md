---
name: suggestapi-ingestion
description: Plan and implement SuggestAPI indexing, document management, imports, catalog sync, or bulk-loading workflows. Use when a user needs to create/populate an index, list/get/update/delete documents, import products, schedule updates, process large files, or keep catalog data synchronized. Do not use when the task is only querying an already populated index.
license: MIT
compatibility: Requires network access to api.suggestapi.com for live API testing. Coding workflows may require access to the target application's source tree.
metadata:
  author: suggestapi
  version: "0.2.0"
---

# Ingest data into SuggestAPI

Index and document routes are public on `https://api.suggestapi.com`.

## Workflow

1. Determine the source of truth and update frequency.
2. Create or reuse a logical index with `POST /v1/indexes` / `GET /v1/indexes`.
3. Choose between inline document writes, paginated document management, bulk import, file/job-based ingestion, commerce integration, or keeping an existing BYOS provider as the source of truth.
4. Define stable document IDs and canonical URLs before importing.
5. Normalize searchable text, filterable attributes, product/category types, and availability/price fields.
6. Make ingestion idempotent so replays do not duplicate documents.
7. Prefer asynchronous jobs for large datasets (`POST /v1/indexes/{index_id}/ingest/start`) and poll `GET /v1/ingestion-jobs/{job_id}`.
8. Plan deletes and stale-record cleanup as part of synchronization (`DELETE /v1/indexes/{index_id}/documents/{doc_id}`), not as an afterthought.
9. Validate search behavior after ingestion using representative `GET /v1/autocomplete` queries.

Writes and document/index admin calls use `Authorization: Bearer` with a private key. See `references/api.md` for the public index/document routes and auth split; search verification still uses `GET /v1/autocomplete` with `x-api-key`.

## Public index and document routes

- Indexes: `GET/POST /v1/indexes`, `GET /v1/indexes/{index_id}/stats`, `DELETE /v1/indexes/{index_id}`
- Documents: `GET/POST /v1/indexes/{index_id}/documents`, `GET/PATCH/DELETE /v1/indexes/{index_id}/documents/{doc_id}`
- Jobs: `POST /v1/indexes/{index_id}/upload`, `POST /v1/indexes/{index_id}/ingest/start`, `GET /v1/ingestion-jobs/{job_id}`

Use inline `POST .../documents` for small JSON batches. Use upload + ingest jobs for CSV/JSON/JSONL and large feeds.

## Important

If the customer already runs Algolia, Typesense, Elasticsearch, or Meilisearch and only wants SuggestAPI routing/acceleration, do not duplicate the index unnecessarily. Use Bring Your Own Search instead.

Verify current request fields against the Indexes API, Ingestion and Documents API, and `https://api.suggestapi.com/openapi.json` before generating production endpoint code.
