---
name: suggestapi-shopify
description: Add SuggestAPI search and discovery to a Shopify storefront. Use for Shopify product search, predictive search, autocomplete, catalog routing, agent-facing product discovery, or replacing an existing search provider while preserving the storefront experience. Do not use for non-Shopify apps.
license: MIT
compatibility: Requires network access to api.suggestapi.com for live API testing. Coding workflows may require access to the target application's source tree.
metadata:
  author: suggestapi
  version: "0.2.0"
---

# Add SuggestAPI to Shopify

## Workflow

1. Identify the theme architecture and current search implementation: native predictive search, custom JavaScript, Hydrogen, or a third-party provider.
2. Preserve the existing storefront markup and interaction model where practical.
3. Determine the SuggestAPI index slug for the product catalog.
4. Route search-bar suggestions through `/v1/autocomplete` or `/v1/typeahead`.
5. Route full result pages or custom search experiences through `GET /v1/autocomplete`.
6. Render product title, subtitle, URL, type, and other normalized fields using safe theme/client code.
7. Never embed upstream Algolia/Typesense/Elastic credentials in Liquid, theme JavaScript, or public agent manifests.
8. Validate product URLs, variants, availability handling, currency/price rendering, mobile behavior, and keyboard accessibility.

Read `references/api.md` for request examples.

## Existing third-party search

If Algolia is present, also load the `suggestapi-migrate-algolia` skill when it is installed. If Typesense is present, also load `suggestapi-typesense` when it is installed.

## Agent commerce

If the goal includes AI shopping assistants, catalog agents, ARD, or agent-readable discovery surfaces, also load `suggestapi-agent-search` when it is installed.
