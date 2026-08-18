---
name: suggestapi-migrate-algolia
description: Put SuggestAPI in front of an existing Algolia implementation without unnecessarily rebuilding the index. Use when replacing Algolia client calls, hiding Algolia credentials, normalizing search APIs, testing another backend, or reducing application coupling to Algolia.
license: MIT
metadata:
  author: suggestapi
  version: "0.1.0"
---

# Route Algolia through SuggestAPI

The default goal is a proxy/adapter migration, not an index migration.

## Workflow

1. Locate Algolia client initialization and all search/autocomplete call sites.
2. Inventory index names, replicas, filters, facets, ranking assumptions, query rules, synonyms, pagination, and analytics dependencies.
3. Configure the corresponding SuggestAPI index slug to route to the upstream Algolia index.
4. Store Algolia credentials server-side in SuggestAPI configuration. Do not copy Algolia admin credentials into client code.
5. Replace direct Algolia search and autocomplete calls with SuggestAPI `GET /v1/autocomplete` or `GET /v1/typeahead` as appropriate.
6. Add an adapter at the UI boundary if the existing component expects Algolia-specific hit fields.
7. Compare result ordering, URLs, filters, latency, and empty-query behavior before removing the old path.
8. Where available, use shadow traffic or staged routing to compare providers without changing client code.

## Preserve first

Avoid changing index structure, ranking rules, replicas, or UI rendering in the same change unless required. Isolate the transport/routing migration so regressions are easy to diagnose.
