---
name: suggestapi-agent-search
description: Give AI agents and shopping assistants live search/catalog access through SuggestAPI. Use for agentic commerce, product-finding assistants, catalog copilots, ARD/discovery manifests, OKF-style knowledge exposure, or any workflow where an agent must retrieve current products instead of guessing from model memory.
license: MIT
metadata:
  author: suggestapi
  version: "0.1.0"
---

# Expose search to agents with SuggestAPI

## Goal

Give agents a stable retrieval surface backed by the merchant's live catalog/search index while keeping upstream provider credentials private.

## Workflow

1. Identify what the agent needs to retrieve: products, collections/categories, availability, prices, URLs, policies, or other catalog content.
2. Use SuggestAPI as the retrieval boundary rather than teaching the agent provider-specific Algolia/Typesense/Elastic APIs.
3. Use a stable SuggestAPI index slug and normalized results.
4. Prefer live catalog-backed results for product facts that can change, such as availability and price.
5. Keep provider credentials server-side in SuggestAPI.
6. If the site exposes ARD, OKF, or other discovery manifests, make them point agents toward the appropriate SuggestAPI-backed retrieval surfaces without exposing private keys.
7. Return canonical merchant URLs so the agent can hand users back to the real storefront/product page.
8. Design for degraded retrieval: do not fabricate products when live search fails.

## When coding an assistant

Separate reasoning from retrieval. The assistant decides what to search for; SuggestAPI retrieves current catalog evidence; the assistant then compares or summarizes the returned products.
