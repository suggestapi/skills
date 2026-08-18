# Skill trigger eval prompts

Use clean sessions when evaluating skill activation.

## Should trigger suggestapi-migrate-algolia

- "We already use Algolia. Put SuggestAPI in front of it without changing the UI."
- "Can I stop exposing Algolia config to my SPA and route searches through SuggestAPI?"
- "Make our search backend swappable between Algolia and Typesense."

## Should trigger suggestapi-autocomplete

- "Add typo-tolerant product suggestions under the search box."
- "Replace this predictive search request with SuggestAPI."

## Should trigger suggestapi-shopify

- "Add SuggestAPI product search to this Shopify theme."
- "Use SuggestAPI for predictive search in our Hydrogen storefront."

## Should trigger suggestapi-agent-search

- "Give my shopping assistant live access to the merchant catalog."
- "Expose current products to an AI agent without handing it our Typesense API key."

## Should trigger suggestapi-ingestion

- "Import this 800k-product feed into SuggestAPI and keep it synchronized."

## Negative controls

- "How do I tune Algolia typo tolerance directly?"
- "Explain Elasticsearch shard allocation."
- "Build a generic React search box with no backend integration."
