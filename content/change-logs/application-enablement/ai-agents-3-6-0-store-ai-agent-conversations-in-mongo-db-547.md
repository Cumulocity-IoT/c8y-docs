---
date: ""
title: store AI agent conversations in MongoDB (#547)
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
ticket: MTM-66369
version: 3.6.0
---
Conversations used to live only in the browser, so they were lost on
reload and could not be continued on another device. ai-agents now
stores them server-side, one MongoDB database per tenant.

Backend (ai-agents):
- /conversation CRUD and a paginated list with label/title filters,
  shared conversations (withShared) and self/prev/next links. Requires
  ADMIN or READ; owners see their own and shared conversations, admins
  see all. The owner/shared check is applied again on write.
- Tenant isolation by database (connection.useDb(tenantId), collection
  ai_conversations), not by a tenantId field. The service never creates
  a tenant database the platform has not provisioned.
- Storage is optional. Without MONGODB_CONNECTION_STRING, or when the
  connection fails (5 retries, 10s apart) or drops, the conversation
  endpoints return 503 and every other feature keeps working.
- Retention: TTL index on expiresAt, plus ConversationCleanupService,
  which caps unlimited-TTL conversations at 1 year after a tenant
  unsubscribes.
- /health reports database UP/DOWN/CONNECTING/NOT_CONFIGURED. The
  overall status is unchanged.
- Conversations are not bound to an agent. Assistant messages carry an
  optional agentName, and labels (max 10) record the features that used
  a conversation.
- manifest.json declares databaseUser "c8y-ai-agents", so the platform
  injects a least-privilege connection string scoped to
  ai_conversations.
- List pagination links use the calling tenant's domain (req.fullPath),
  not the in-cluster C8Y_BASEURL.
- yarn dev:remote-db and yarn mongosh:remote tunnel to a deployed
  environment's MongoDB for local development.

Shared types: @c8y/ai-types adds conversation.model.ts.

UI (ai-plugins):
- Conversation persistence is on for the assistant panel
  chat widget, which use their own labels.
- The assistant panel stays attached while it is closed, so reopening
  it continues the current conversation.
- Workaround for body-appended popovers, such as the "Del
  conversation" confirmation, rendering behind the panel. Remove it once
  @c8y/ngx-components fixes the popover.