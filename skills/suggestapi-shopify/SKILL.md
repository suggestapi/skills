---
name: suggestapi-shopify
description: Add SuggestAPI search and discovery to a Shopify storefront. Use for Shopify product search, predictive search, autocomplete, catalog routing, agent-facing product discovery, or replacing an existing search provider while preserving the storefront experience.
license: MIT
metadata:
  author: suggestapi
  version: "0.1.0"
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

## Existing third-party search

If Algolia is present, also load `../suggestapi-migrate-algolia/SKILL.md`. If Typesense is present, also load `../suggestapi-typesense/SKILL.md`.

## Agent commerce

If the goal includes AI shopping assistants, catalog agents, ARD, or agent-readable discovery surfaces, also load `../suggestapi-agent-search/SKILL.md`.
