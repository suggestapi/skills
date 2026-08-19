---
name: suggestapi
description: >
  Explain SuggestAPI capabilities and choose which SuggestAPI integration
  workflow to use. Use when the user asks generally how to integrate
  SuggestAPI or is unsure whether they need search, autocomplete,
  ingestion, document management, Shopify, Algolia migration, Typesense, or agent search.
  Do not use when the user has already specified one of those workflows.
license: MIT
compatibility: Requires network access to api.suggestapi.com for live API testing. Coding workflows may require access to the target application's source tree.
metadata:
  author: suggestapi
  version: "0.2.0"
---

# SuggestAPI orientation

Use this skill only when the task is still ambiguous. If the user already named search, autocomplete, Shopify, Algolia, Typesense, agent catalog access, ingestion, or document management, use that specialized skill instead.

Specialized skills are independently discoverable. Load them by skill name if they are installed; do not depend on sibling relative paths.

## Choose a workflow

- Full application or catalog search → `suggestapi-search`
- Search-bar autocomplete or typeahead → `suggestapi-autocomplete`
- Shopify theme or Hydrogen storefront → `suggestapi-shopify`
- Existing Algolia implementation → `suggestapi-migrate-algolia`
- Existing Typesense implementation → `suggestapi-typesense`
- AI assistant, copilot, ARD, or agent-facing catalog retrieval → `suggestapi-agent-search`
- Indexing, document CRUD, import, sync, or bulk loading → `suggestapi-ingestion`

## Core architecture

SuggestAPI is normally an acceleration and abstraction layer in front of an existing search backend. Preserve the customer's current index unless the task explicitly calls for a migration.

Clients should speak to SuggestAPI using a stable index slug. SuggestAPI can route that index to an upstream provider and normalize the result shape.

## Non-negotiables

- Do not expose upstream provider credentials in browser or agent code.
- Do not hardcode a provider into client code when SuggestAPI routing can keep the client provider-agnostic.
- Preserve existing result URLs, identifiers, filters, and analytics semantics where possible.
- Verify current API fields against the live SuggestAPI docs/OpenAPI before production release.
