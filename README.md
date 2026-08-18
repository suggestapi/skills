# SuggestAPI Agent Skills Starter

Portable Agent Skills for teaching coding agents how to integrate SuggestAPI into search, commerce, and agent-discovery workflows.

## Included skills

- `suggestapi` — router/orientation skill
- `suggestapi-search` — full search via SuggestAPI
- `suggestapi-autocomplete` — autocomplete/typeahead integration
- `suggestapi-shopify` — Shopify storefront integration workflow
- `suggestapi-migrate-algolia` — route an existing Algolia implementation through SuggestAPI
- `suggestapi-typesense` — route Typesense through SuggestAPI
- `suggestapi-agent-search` — expose live catalog/search to agents
- `suggestapi-ingestion` — choose and implement indexing/import workflows

## Design principles

1. Skills describe jobs, not just endpoint families.
2. The root skill routes to the narrowest relevant skill.
3. Keep each `SKILL.md` concise and move detailed API material into shared references.
4. Preserve the customer's existing search backend when using Bring Your Own Search.
5. Never expose upstream provider credentials to browser or agent clients.
6. Prefer live SuggestAPI docs/OpenAPI as the source of truth when implementation details conflict with these starter files.

## Suggested repository name

`github.com/suggestapi/skills`

## Install pattern

Use the Agent Skills mechanism supported by your coding-agent client. You can install the entire repository or an individual skill directory.

## Validation

Each skill directory name matches its `name` field and uses lowercase letters, digits, and hyphens, following the Agent Skills specification.

## Next steps

- Add exact auth/setup steps for the SuggestAPI control plane.
- Add provider-specific configuration examples for Elasticsearch and Meilisearch.
- Add scripts that smoke-test `/v1/autocomplete` and `/v1/typeahead`.
- Add skill-trigger and output-quality evals.
- Publish versioned releases and keep references synchronized with the public OpenAPI spec.
