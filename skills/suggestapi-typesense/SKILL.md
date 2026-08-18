---
name: suggestapi-typesense
description: Integrate an existing Typesense search backend through SuggestAPI. Use when proxying Typesense, hiding Typesense credentials, exposing a provider-neutral search API, or switching between Typesense and another backend without rebuilding client code.
license: MIT
metadata:
  author: suggestapi
  version: "0.1.0"
---

# Route Typesense through SuggestAPI

## Workflow

1. Inspect current Typesense collections, search parameters, filters, facets, sorting, and client initialization.
2. Map the desired SuggestAPI index slug to the upstream Typesense collection/index configuration.
3. Keep Typesense credentials in SuggestAPI's server-side configuration.
4. Replace browser or agent calls with SuggestAPI's search/autocomplete endpoints.
5. Normalize result handling at the UI boundary rather than spreading provider-specific field mappings through the application.
6. Validate filters, typo behavior, ranking, URLs, pagination, and latency against the existing implementation.
7. Keep the client provider-neutral so routing can later change without rewriting the UI.
