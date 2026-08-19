# SuggestAPI Agent Skills

Official Agent Skills for teaching coding agents how to integrate SuggestAPI into search, commerce, and agent-discovery workflows.

Repository: [github.com/suggestapi/skills](https://github.com/suggestapi/skills)

## Included skills

Each skill is a self-contained directory. Install the whole repository or copy a single skill folder.

- `suggestapi` — orientation only, when the workflow is still unclear
- `suggestapi-search` — full ranked search via `GET /v1/autocomplete`
- `suggestapi-autocomplete` — search-bar autocomplete and typeahead
- `suggestapi-shopify` — Shopify theme / Hydrogen storefront
- `suggestapi-migrate-algolia` — route an existing Algolia implementation through SuggestAPI
- `suggestapi-typesense` — route Typesense through SuggestAPI
- `suggestapi-agent-search` — expose live catalog/search to agents
- `suggestapi-ingestion` — indexing, document management, import, and catalog sync

## Design principles

1. Skills describe jobs, not just endpoint families.
2. Specialized skills are independently discoverable. The root skill does not steal those triggers.
3. Keep each `SKILL.md` concise and keep API details in that skill's `references/api.md`.
4. Preserve the customer's existing search backend when using Bring Your Own Search.
5. Never expose upstream provider credentials to browser or agent clients.
6. Prefer live SuggestAPI docs/OpenAPI as the source of truth when implementation details conflict with these files.

## Install pattern

Use the Agent Skills mechanism supported by your coding-agent client. Installing an individual skill directory is enough; each specialist skill includes its own `references/api.md`.

After editing the canonical API reference, copy it into skills:

```bash
node scripts/sync-api-reference.mjs
```

## Validation

```bash
node scripts/validate-skills.mjs
node scripts/check-openapi.mjs
```

Live smoke tests (public SuggestAPI key required):

```bash
node skills/suggestapi-search/scripts/validate-config.mjs --api-key "$SUGGESTAPI_PUBLIC_KEY" --index products
node evals/api/search-smoke.mjs --api-key "$SUGGESTAPI_PUBLIC_KEY" --index products --query "running shoes"
node evals/api/typeahead-smoke.mjs --api-key "$SUGGESTAPI_PUBLIC_KEY" --index products --query "run"
```

Routing eval prompts: `evals/routing/*.jsonl` and `evals/trigger-prompts.md`.

## Next steps

- Add exact auth/setup steps for the SuggestAPI control plane.
- Add provider-specific configuration examples for Elasticsearch and Meilisearch.
- Expand integration fixtures under `evals/integration/` (vanilla JS, React, Liquid, Hydrogen).
- Publish versioned releases and keep skill `references/api.md` synchronized with the public OpenAPI spec.
