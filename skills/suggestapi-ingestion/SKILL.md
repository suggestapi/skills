---
name: suggestapi-ingestion
description: Plan and implement SuggestAPI indexing, imports, document ingestion, catalog sync, or bulk-loading workflows. Use when a user needs to create/populate an index, import products, schedule updates, process large files, or keep catalog data synchronized. Do not use when the task is only querying an already populated index.
license: MIT
compatibility: Requires network access to api.suggestapi.com for live API testing. Coding workflows may require access to the target application's source tree.
metadata:
  author: suggestapi
  version: "0.2.0"
---

# Ingest data into SuggestAPI

## Workflow

1. Determine the source of truth and update frequency.
2. Choose between direct document ingestion, bulk import, file/job-based ingestion, commerce integration, or keeping an existing BYOS provider as the source of truth.
3. Define stable document IDs and canonical URLs before importing.
4. Normalize searchable text, filterable attributes, product/category types, and availability/price fields.
5. Make ingestion idempotent so replays do not duplicate documents.
6. Prefer asynchronous jobs for large datasets and capture job status/errors.
7. Plan deletes and stale-record cleanup as part of synchronization, not as an afterthought.
8. Validate search behavior after ingestion using representative queries.

Writes use `Authorization: Bearer` with a private key. See `references/api.md` for the auth split; search verification still uses `GET /v1/autocomplete` with `x-api-key`.

## Important

If the customer already runs Algolia, Typesense, Elasticsearch, or Meilisearch and only wants SuggestAPI routing/acceleration, do not duplicate the index unnecessarily. Use Bring Your Own Search instead.

Check the current SuggestAPI docs for supported import and jobs APIs before generating production endpoint code.
