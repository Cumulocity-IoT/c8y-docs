---
date: ""
title: new details list view
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
ticket: MTM-67403
version: 2.6.0
---
<img width="1903" height="1748" alt="image"
src="https://github.com/user-attachments/assets/ecdc8924-a5f8-453e-acdf-8d2b3e797702"
/>

## Summary

The agents page in the AI Agent Manager was a split view: a list on the
left and the editor on the right, with the selection kept only in
memory. This PR splits it into two pages:

- a **card list** at `#/ai-agents/list`, built on the Codex *Cards
grid/list* pattern;
- a **detail page** per agent at `#/ai-agents/list/<name>`.

It also adds an optional **description** to agents, from `@c8y/ai-types`
through the microservice to the UI.

> **Deployment:** the plugin needs the microservice from this PR as soon
as someone enters a description. An older microservice rejects the field
with `400 property description should not exist`. Agents without a
description still save fine against the old version, because an empty
description isn't sent.

## What changes

### Agent list (`agent.component`, new `agent-card.component`)
- **Grid or list:** cards switch layout with `c8y-list-display-switch`.
The default *Auto* mode shows a grid below 12 agents and a list from 12
on.
- **Action bar, left:** a search (`c8y-filter`, matching name,
description and source app) and an **All | Custom | Subscribed** toggle.
- **Action bar, right:** **Add agent** (moved out of the old list
footer) and **Reload**.
- **One card per agent:** agents with the same name are no longer
grouped into a collapsible row. Instead, cards show *overruled* /
*overruling* tags, and an overruled agent's icon is dimmed.
- **Card menu:** Clone and Delete. **Delete now asks for confirmation**.
When the agent overrules a subscribed one, the message also says the
subscribed agent will be used again.

### Agent details (new `agent-details-page.component`, route
`list/:name`)
- **Deep links:** every agent has its own URL. Subscribed agents add
`?source=<appId>`, so they're not confused with a custom agent of the
same name.
- **Breadcrumb:** *Agents › name*. Renaming an agent replaces the URL
with the new name.
- **Unsaved changes:** a `canDeactivate` guard asks "Discard changes?"
whenever you leave with unsaved changes, whether through Cancel, the
navigator or the breadcrumb.
- **Editor unchanged:** tabs, test chat and Save / Save and close work
as before. Cloning a subscribed agent opens the new copy.

### Agent description
- **Type and API:** `description?: string` on `AgentBaseDefinition` in
`@c8y/ai-types`, an additive, non-breaking change. It's validated in
`AgentDefinitionBaseDto` (`@IsOptional() @IsString()`) and documented in
Swagger through the JSDoc.
- **UI:** an optional field in the New agent modal, inline editing below
the name on the detail page, and the description shown on each card.

### Also fixed
- **Lost edits in the editor:** all fields shared a single 500 ms
debounce, so switching fields quickly could silently drop an edit. The
new description input right below the name made this easy to hit: type a
name, press Tab, keep typing. Each field is now debounced on its own
(`debounceByKey`).
- **Cloning:** a clone now always drops `source` and `isOverruled`.
Before, only copies of an active subscribed agent did.

### Removed
`AgentListComponent`, `AgentListViewItemComponent`,
`AgentGroupedListItemComponent`, the `AgentGroup` type, and the
`agent-list.component` re-export from `ai-manager/index.ts`. The module
federation config only exposes the modules, so nothing outside the
package used them.

## Where to look
- `agent/agent.component.ts|html`: the list page (signals, filters,
actions).
- `agent/agent-details-page.component.ts`: loading by name and source,
save and rename, clone, and the leave guard.
- `agent/agent-list.utils.ts`: pure helpers for overrule marking,
filtering, the name/source link and cloning.
- `agent/agent-details.component.*`: the description input, the
per-field debounce, and a `clone` output instead of injecting the old
list component.

## Testing
- **Unit tests (Karma), the first specs in `ai-plugins`:** 22 tests.
They cover the list helpers, the card (provider shown and click
handling), the list page (delete confirmation and cancel, clone opening
the copy, overruling flags) and the per-field debounce.
- **Backend (Jest):** a DTO spec for `description` checks that it's
kept, can be empty, can be omitted, and is rejected when it isn't a
string. The full backend suite passes.
- **Cypress:**
- new `no-llm/agent-list.cy.ts`: search and filter, description, delete
confirmation, clone, breadcrumb, discard prompt;
- `no-llm/agent-management.cy.ts` and `llm/test-agent.cy.ts` updated for
the new navigation, sharing helpers in
`cypress/support/agent-helpers.ts`.
- **Manual:** checked in a browser against a preprod tenant: grid and
list, search and filters, a subscribed agent opening read-only, add,
rename (URL follows), clone, delete confirmation, breadcrumb, discard
prompt, phone width. Saving a description couldn't be checked there,
because that tenant still runs the old microservice.
- **Not yet run:** the Cypress suites. They need a tenant with this
microservice (`qa-verify`).

## Known gaps
- **Detail-page Clone button has no automated test.** It only shows for
subscribed agents, which CI tenants don't reliably have. A unit test
can't compile either: any spec that imports the agent editor needs
monaco's CSS and `c8y-schema-loader`, which only the `@c8y/devkit` build
config provides, not the stock Karma builder. Giving Karma the same
setup would be a separate change.
- **Only one commit here is unrelated:** `ec3836de` documents the
optional local dev tools (`playwright-cli`, the `c8y-web-sdk-knowledge`
MCP server) in `.claude/CLAUDE.md`.

---------

Co-authored-by: Claude Opus 5.5 (1M context) <noreply@anthropic.com>
Co-authored-by: Carlos Ceia <carlos.ceia@cumulocity.com>