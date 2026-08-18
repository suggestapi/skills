---
name: suggestapi-autocomplete
description: Add or improve SuggestAPI autocomplete and typeahead. Use when building a search box, predictive suggestions, typo-tolerant suggestions, product/category suggestions, or replacing provider-specific autocomplete calls.
license: MIT
metadata:
  author: suggestapi
  version: "0.1.0"
---

# Add SuggestAPI autocomplete

## Choose the endpoint

- Prefer `GET /v1/autocomplete` for richer search-bar suggestions and normalized product/category-style results.
- Prefer `GET /v1/typeahead` when lightweight prefix completion is sufficient.

## Workflow

1. Find the search input and existing debounce/cancel logic.
2. Keep keyboard navigation, accessibility, focus handling, and result highlighting intact.
3. Send the query and SuggestAPI index slug to the selected endpoint.
4. Use a modest result limit suitable for a dropdown.
5. Do not send undocumented `rewrite`, `cache`, or `backend` params; SuggestAPI applies spell correction on the documented search endpoints.
6. Render normalized fields such as title, subtitle, type, and URL rather than depending on provider-specific hit objects.
7. Cancel stale requests as the user continues typing.
8. Track selection/click behavior using the application's existing analytics path unless SuggestAPI tracking is explicitly available and requested.

Read `../../references/api.md` for request examples, then validate against current docs.
