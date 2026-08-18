---
name: suggestapi
description: Route SuggestAPI integration work to the right specialized workflow. Use when a user wants to add, migrate, proxy, optimize, or expose search, autocomplete, catalog discovery, or agent-facing product retrieval through SuggestAPI, including existing Algolia or Typesense stacks.
license: MIT
metadata:
  author: suggestapi
  version: "0.1.0"
---

# SuggestAPI router

Use this skill to choose the narrowest SuggestAPI workflow before making changes.

## Route by task

- Full application or catalog search → load `../suggestapi-search/SKILL.md`.
- Search-bar autocomplete or typeahead → load `../suggestapi-autocomplete/SKILL.md`.
- Shopify storefront search → load `../suggestapi-shopify/SKILL.md`.
- Existing Algolia implementation → load `../suggestapi-migrate-algolia/SKILL.md`.
- Existing Typesense implementation → load `../suggestapi-typesense/SKILL.md`.
- AI assistant, agent, copilot, product-discovery bot, ARD, or agent-facing catalog retrieval → load `../suggestapi-agent-search/SKILL.md`.
- Indexing, import, sync, document ingestion, catalog feed, or bulk loading → load `../suggestapi-ingestion/SKILL.md`.

## Core architecture

SuggestAPI is normally an acceleration and abstraction layer in front of an existing search backend. Preserve the customer's current index unless the task explicitly calls for a migration.

Clients should speak to SuggestAPI using a stable index slug. SuggestAPI can route that index to an upstream provider and normalize the result shape.

## Non-negotiables

- Do not expose upstream provider credentials in browser or agent code.
- Do not hardcode a provider into client code when SuggestAPI routing can keep the client provider-agnostic.
- Preserve existing result URLs, identifiers, filters, and analytics semantics where possible.
- Verify current API fields against the live SuggestAPI docs/OpenAPI before production release.
