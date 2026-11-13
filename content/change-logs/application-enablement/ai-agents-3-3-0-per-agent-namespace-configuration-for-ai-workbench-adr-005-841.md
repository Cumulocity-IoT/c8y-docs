---
date: ""
title: per-agent namespace configuration for ai-workbench (ADR-005) (#841)
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-VtytA3d55
    label: AI Agents
build_artifact:
  - value: tc--gWykZ78v
    label: ai-agents
ticket: MTM-67777
version: 3.3.0
---
## What

Implements ADR-005 (#790): per-agent namespace configuration for
ai-workbench. Replaces #807, which also carried the Prometheus metrics;
those are now stacked on top of this PR in #842.

1. **Shared schema and its pure application** (`@c8y/ai-types`,
`ai-workbench/src/config`): valibot schemas for the `WorkbenchConfig`
envelope and the `namespaces` block, service entries as an `api` / `mcp`
variant, the `"*"` fall-through key, external MCP entries, and the path
and name pattern grammar. Types derive from the schemas; `valibot`
becomes a peer dependency of ai-types. Pattern matching is linear (no
regex built from patterns), so a crafted pattern cannot stall the event
loop. In the workbench: header → `full | scoped | invalid`, and the
three selection functions. ai-workbench now depends on ai-types
(resolved from source for typecheck and tests, built in CI before the
nitro build).
2. **Tests are typechecked**: `test/**` is part of `tsconfig.json`, so
`yarn typecheck` covers them.
3. **Deterministic names** (`src/api/naming.ts`): collisions get a
numeric suffix instead of being dropped, for namespaces, MCP tools and
OpenAPI operations, in a fixed order that ignores discovery order and
the server's locale. The candidate already called that wins a tie (for
operations: the first in spec order), and every requested name is
claimed before a suffix is handed out. Reserved names cover the runtime
namespaces, every sandbox global (`RESERVED_GLOBALS` from
durable-isolates) and `__proto__`. This changes behavior for every
agent, configured or not: colliding services, tools and operations that
were silently dropped now show up with a suffix.
4. **Config applied end to end**: the `ai-workbench-config` header is
resolved on every request and carried on the MCP context. A scoped
request builds its namespaces from the config; the entry's `kind` names
the surface; members filtered by path or tool name; aliases; empty
namespaces do not exist. Search and docs indexes are built per request
for scoped calls and cover only the visible surface. An invalid header
fails the codemode call with the reason; no header is the full surface.
The codemode guide lists the namespaces the agent actually sees.
5. **External MCP servers**: `externalMcps` entries become namespaces,
named after tenant sources so a header cannot take a name from a real
service. They are reached through `@iso4/fetch` with DNS pinning:
private, loopback, link-local and metadata addresses are refused, no
redirects, timeouts and body caps. An external server gets exactly its
entry's headers, never tenant auth.
- A successful handshake is cached per pod by URL and headers for the
server's `ttlMs`, at most 3 minutes; failures are not cached. A JSON-RPC
"invalid params" answer to a tool call drops the entry.
- One handshake: 10 s deadline, at most 300 tools and 5 MB. A config
lists at most 20 external servers.
- Unreachable servers are listed as `UNAVAILABLE` in the overview by
alias and origin only (path and query can carry credentials). Bad URLs
or headers fail with fixed messages that never quote the value.
6. **Endpoints for the editor**: `GET /config/catalog` and `POST
/config/preview`, behind `ROLE_AI_AGENT_ADMIN`, with full hand-written
OpenAPI descriptions (verified in the generated document).
7. **Hardening and updates from review**: path parameters `""`, `.` and
`..` are refused (they would leave the operation's path); MCP client
page cap, malformed tool filter and full-body timeouts; `Object.hasOwn`
for service lookup; `@iso4/fetch` 0.1.1 (`createSafeFetcher`),
`durable-isolates` 0.4.0 / `@iso4/sandbox` 0.8.1 (a run the kernel
rejects is returned to the agent with the call and the reason); rolldown
1.2.13, which drops the dev-only bundling workaround.

## Decisions taken while implementing (all in the ADR now)

- One header, `ai-workbench-config`, plain JSON on one line, no
compression, no size constant. Header size is Node's and the proxies'
business.
- Prefer-MCP stays only for unscoped agents; a scoped service's entry
picks the surface via `kind`.
- No cache is keyed on the whole config. The caches that exist hold what
a source said: tenant specs and indexes, and external handshakes by URL
and headers.
- A bad header never fails the HTTP request; `tools/list` keeps working
and the codemode call throws.
- Docs cover only what the agent can reach; the old `specs` view is
gone.
- The never-enabled sandbox branches in `describe` are removed.

## Open points to be aware of

- **No header = full surface.** Convenient for direct connections, but a
header lost in transit widens an agent instead of narrowing it. Revisit
before anything security-relevant rides the same envelope (ADR open
point 1).
- **External tool lists can be up to 3 minutes stale.** Servers built on
the official MCP SDK report an unknown tool as a failed tool result
rather than a JSON-RPC error, so they are only refreshed when the cache
entry expires.
- **The handshake cache has no total cap**, only 5 MB per entry and a
3-minute lifetime. If memory ever shows it, a total budget is the lever.
- **valibot in ai-agents and ai-plugins.** ai-types imports valibot at
runtime for the config schema and declares it as a peer dependency, so
ai-agents and ai-plugins now list `valibot` directly (1.4.2 everywhere)
instead of relying on a hoisted copy. ai-agents therefore ships both zod
(AI SDK tool schemas, `zod-to-json-schema`) and valibot; later we may
want to move ai-agents off zod so the repo has one schema library.
- **Sandbox runs stay on per-call prefixes.** `durable-isolates` now
recommends `di.run()` for model-written code; it would lower the per-run
memory kill line from 38 to 24 MB, so it needs a load test first.
- Agent Manager (sending the header, the editor UI) is not part of this
PR.

## Tests

ai-types: 45. ai-workbench: 220, including scoped runs in the real
sandbox, an end-to-end run against a mock downstream MCP server for the
external path, the handshake cache, and address and credential refusal
through the real `@iso4/fetch`.