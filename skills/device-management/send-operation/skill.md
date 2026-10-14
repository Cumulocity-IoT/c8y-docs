---
name: send-operation
description: Send a single operation (for example c8y_Restart) to a Cumulocity device after verifying the device supports it, poll it to a terminal state, and list or cancel operations.
area: device-control
inputs:
  - name: device_id
    description: Inventory managed object ID of the target device; a device given by name is resolved to its ID in Prerequisites item 3
    example: "251982"
    required: true
  - name: operation_fragment
    description: Name of the operation fragment to send (must be listed in the device's c8y_SupportedOperations)
    example: "c8y_Restart"
    required: true
  - name: operation_description
    description: User-friendly description shown in operation list views
    example: "Restart device"
    required: true
  - name: cancel_reason
    description: Failure reason recorded when cancelling a stuck PENDING operation (Step 5 only)
    example: "Cancelled by operator - no agent responded"
    required: false
outputs:
  - name: operation_id
    description: ID of the operation created by this skill
  - name: operation_status
    description: Terminal status of the operation (SUCCESSFUL or FAILED)
prerequisites:
  - Role ROLE_DEVICE_CONTROL_ADMIN (create and cancel operations)
  - Role ROLE_DEVICE_CONTROL_READ (read and poll operations)
cli_version: "2.55.0"
sources:
  - repo: go-c8y-cli
    path: "c8y operations create|wait|list|update|deleteCollection --help; c8y devices get --help (v2.55.0); --dry --dryFormat json previews"
    note: CLI actions verified request-equivalent to the REST actions on 2026-09-02/03
  - repo: cumulocity-openapi
    path: src/components/securitySchemes.yml
    note: "Basic auth username <tenantID>/<c8yuser> (Prerequisites item 1 curl line; presence check and curl line verified 2026-10-07: HTTP 200 /user/currentUser)"
  - repo: cumulocity-openapi
    path: src/markdown/reference-guide.md
    note: "Login options: the tenant has its own dedicated URL (C8Y_BASEURL, never built from the tenant ID); requests authenticate with tenant ID, user and password"
  - repo: cumulocity-openapi
    path: src/components/schemas.yml
    note: operation schema — status enum SUCCESSFUL/FAILED/EXECUTING/PENDING, failureReason, deviceId
  - repo: cumulocity-openapi
    path: src/openapi.yml
    note: /devicecontrol/operations paths — create (201, deviceId required, status read-only), list params deviceId/status/fragmentType, PUT updates only the status (example FAILED + failureReason), 422 operationValidationError
  - repo: cumulocity-openapi
    path: src/markdown/device-control/operations.md
    note: Accept header required on POST/PUT for a response body
  - repo: c8y-docs
    path: content/device-integration/fragment-library-bundle/general-concepts.md
    note: c8y_SupportedOperations fragment (array of strings announcing device capabilities)
  - repo: c8y-docs
    path: content/device-management-application/monitoring-and-controlling-devices-bundle/working-with-operations.md
    note: UI-equivalent flow (Control tab)
  - repo: cumulocity-openapi
    path: src/markdown/inventory/query-language.md
    note: "name eq '<name>' exact, case-sensitive match used to resolve a name to its ID (Prerequisites item 3); c8y inventory find --query adds the $filter= prefix (--dry verified 2026-10-07)"
validated:
  platform_version: "2026.292.0"
  date: 2026-09-04
  cli:
    version: "2.55.0"
    status: passed
    date: 2026-09-04
---

# Send an operation to a device

Request URLs and headers follow [authentication](../../_common/authentication.md); the
credential rules every step needs are inline in Prerequisites item 1. Send
`Accept: application/json` on every POST/PUT, otherwise the platform returns an empty
response body.

## Prerequisites check

1. Select the route per [cli-conventions](../../_common/cli-conventions.md), its Credentials section first.
   - The inputs are exactly the four environment variables `C8Y_BASEURL`, `C8Y_TENANT`,
     `C8Y_USER`, `C8Y_PASSWORD`; there is no other name to look for (no `C8Y_HOST`,
     `C8Y_URL` or token variable, no `env | grep` search). Check them without printing them:
     `for v in C8Y_BASEURL C8Y_TENANT C8Y_USER C8Y_PASSWORD; do if [ -n "$(printenv "$v")" ]; then echo "$v set"; else echo "$v missing"; fi; done`

     | Check output | Rule |
     |---|---|
     | four lines `<name> set` | Credentials present: continue; never ask the user for a URL, user or password. |
     | any line `<name> missing` | Stop and report "<name> missing". |
     | anything else | Stop and report the output. |
   - Never print or copy a credential: no `env`, no `printenv` without an argument, no
     `set`, no `echo` of `C8Y_PASSWORD`, no `c8y settings`/`c8y sessions` probing, no
     curl `-v`; never paste a value into a command.
   - Then its route selection rows 1–3: `c8y version` failing (command not found
     included) or showing another major → REST route for the whole skill. Every
     **Action (REST, fallback)** below names only a method and a path; send it as
     `curl -sS -u "${C8Y_TENANT}/${C8Y_USER}:${C8Y_PASSWORD}" -H 'Accept: application/json' "${C8Y_BASEURL}<path>"`
     with the `${...}` references kept literally. The host is always `${C8Y_BASEURL}`,
     never one built from the tenant ID (body: add
     `-X <POST|PUT> -H 'Content-Type: application/json' -d '<json>'`; delete: add
     `-X DELETE`). Exit codes below follow the cli-conventions table.
   - `c8y version` succeeding → CLI route: every shell call that runs `c8y` — creates, updates and deletes included — starts with `export C8Y_HOST="$C8Y_BASEURL" C8Y_SESSION= C8Y_TOKEN= C8Y_HEADER_AUTHORIZATION= C8Y_SETTINGS_LOGIN_TYPE=BASIC C8Y_SETTINGS_CI=true C8Y_SETTINGS_DEFAULTS_ALLOWEMPTYPIPE=true;` in that same call (the skill's own setup, no confirmation needed; without it a write exits 100 `mode is disabled` → rerun once with it), then `c8y currenttenant get --select name` must print the `C8Y_TENANT` value, else stop: "c8y session override". Never `c8y settings`/`c8y sessions`, `--sessionMode`, or curl in place of a refused `c8y` write.
2. **Action (CLI, preferred)**: `c8y currentuser get --select 'effectiveRoles.*.id' -o csv`
   **Action (REST, fallback)**: `GET /user/currentUser`
   **Expected result**: output (`effectiveRoles[].id`) contains
   `ROLE_DEVICE_CONTROL_ADMIN` and `ROLE_DEVICE_CONTROL_READ`.
   **On failure**: missing role → stop and report it; otherwise apply
   [error-handling](../../_common/error-handling.md).
3. **Resolve names to IDs.** `<device_id>` is the managed object ID the platform
   assigned; a device name is never one. When the caller names the device instead of
   giving its ID, resolve the name per
   [name-resolution](../../_common/name-resolution.md) — CLI:
   `c8y inventory find --query "name eq '<object_name>'" --pageSize 100 --select id,name,type`
   — and use the single match's `id`. No match or two or more matches → stop and report
   as that table says; never create a device to stand in for a missing one.

## Steps

### Step 1 — Pre-flight: verify the device supports the operation

**Action (CLI, preferred)**: `c8y devices get --id <device_id> --select id,c8y_IsDevice,c8y_SupportedOperations`

**Action (REST, fallback)**: `GET /inventory/managedObjects/<device_id>`

**Expected result**: exit code 0 / HTTP 200; the object contains the fragment
`c8y_IsDevice` and the array `c8y_SupportedOperations` contains `"<operation_fragment>"`.

**On failure**:

| Condition | Rule |
|---|---|
| HTTP 404 / non-zero exit with `No managedObject for id` naming a value that is a device name, not an ID | The name was never resolved. Run Prerequisites item 3 for it, then repeat Step 1 with the ID. |
| HTTP 404 / exit code 4 | Stop; report "device <device_id> does not exist". |
| `c8y_IsDevice` absent | Stop; report "object <device_id> is not a device". |
| `c8y_SupportedOperations` absent or does not contain `<operation_fragment>` | Stop; report "device <device_id> does not announce support for <operation_fragment> — no agent will execute the operation". Do not create the operation. |
| Any other mismatch | Apply [error-handling](../../_common/error-handling.md). |

### Step 2 — Create the operation

Do not send a `status` field: it is read-only on create; the platform sets `PENDING`.

**Action (CLI, preferred)**: `c8y operations create --device <device_id> --description "<operation_description>" --template '{"<operation_fragment>": {}}' --force --select id,status`

**Action (REST, fallback)**: `POST /devicecontrol/operations` with body:

```json
{
  "deviceId": "<device_id>",
  "description": "<operation_description>",
  "<operation_fragment>": {}
}
```

(The fragment value is the parameter object of the operation; for `c8y_Restart` it is
empty `{}`.)

**Expected result**: exit code 0 / HTTP 201; the returned object has a non-empty `id`
(record as `operation_id` output) and `"status": "PENDING"`.

**On failure**:

| Condition | Rule |
|---|---|
| HTTP 422 / exit code 22 | Payload rejected (`deviceId` must reference an existing device that carries `com_cumulocity_model_Agent`). Stop; report the error body. |
| Any other mismatch | Apply [error-handling](../../_common/error-handling.md). |

### Step 3 — Poll the operation to a terminal state

**Action (CLI, preferred)**: `c8y operations wait --id <operation_id> --status SUCCESSFUL --status FAILED --duration 120s --select id,status,failureReason`

**Action (REST, fallback)**: follow the polling recipe in
[operations-lifecycle](../../_common/operations-lifecycle.md) for `<operation_id>`,
timeout `C8Y_TIMEOUT_OPERATION_S` (default 120 seconds), poll interval 5 seconds.

**Expected result**: the operation reaches `"status": "SUCCESSFUL"` within the timeout
(CLI: exit code 0 and the printed object has that status). Record the terminal status as
`operation_status` output.

**On failure**:

| Condition | Rule |
|---|---|
| Terminal status `FAILED` (CLI: exit code 0, printed `status` FAILED) | Report `operation_status = FAILED` with the `failureReason` field verbatim; stop. |
| Timeout while `PENDING` (CLI: exit code 106; re-read with `c8y operations get --id <operation_id> --select status`) | No agent picked up the operation (device offline or not listening). Continue with Step 5 to cancel it, then stop and report the timeout. |
| Timeout while `EXECUTING` (CLI: exit code 106, last status EXECUTING) | The agent started but never finished. Stop and report the timeout; do not cancel — the device may still complete it. |
| Any other status | Stop and report the unexpected status. |

### Step 4 — List the device's operations by status

**Action (CLI, preferred)**: `c8y operations list --device <device_id> --status SUCCESSFUL --select id,status`

**Action (REST, fallback)**: `GET /devicecontrol/operations?deviceId=<device_id>&status=SUCCESSFUL`

Supported filters: `deviceId`/`--device`, `status` (`SUCCESSFUL`, `FAILED`, `EXECUTING`,
`PENDING`), `fragmentType`, `dateFrom`/`dateTo`, `agentId`/`--agent`, `bulkOperationId`.
Operations are returned in the order of their ascending IDs.

**Expected result**: exit code 0 / HTTP 200; the returned operations (CLI: one JSON
object per line; REST: the `operations` array) include one with `"id": "<operation_id>"`.

**On failure**:

| Condition | Rule |
|---|---|
| No operations returned | Stop; report "operation <operation_id> not returned by filter" with the exact query string used. |
| Any other mismatch | Apply [error-handling](../../_common/error-handling.md). |

### Step 5 — Cancel a stuck PENDING operation

Perform this step only when routed here by Step 3 (timeout while `PENDING`), or when the
caller explicitly asks to abort an operation no agent has picked up. There is no
dedicated cancel endpoint: a PUT may update only the `status`, and marking the operation
`FAILED` with a `failureReason` is the documented way to close it.

**Action (CLI, preferred)**: `c8y operations update --id <operation_id> --status FAILED --failureReason "<cancel_reason>" --force --select id,status,failureReason`

**Action (REST, fallback)**: `PUT /devicecontrol/operations/<operation_id>` with body:

```json
{
  "status": "FAILED",
  "failureReason": "<cancel_reason>"
}
```

**Expected result**: exit code 0 / HTTP 200; the returned object has `"status": "FAILED"`
and `"failureReason": "<cancel_reason>"`. Record `operation_status = FAILED`.

**On failure**:

| Condition | Rule |
|---|---|
| HTTP 422 / exit code 22 | The operation already completed `SUCCESSFUL` and cannot be re-marked. Re-read it with `GET /devicecontrol/operations/<operation_id>` and report its actual status; stop. (Re-marking an operation that is already `FAILED` is accepted and idempotent.) |
| HTTP 404 / exit code 4 | The operation from Step 2 is gone. Stop; report the inconsistency. |
| Any other mismatch | Apply [error-handling](../../_common/error-handling.md). |

## Success criteria

- `c8y operations get --id <operation_id> --select id,status` (or
  `GET /devicecontrol/operations/<operation_id>`) returns a terminal
  status (`SUCCESSFUL`, or `FAILED` when cancelled) that matches the reported
  `operation_status`.
- The skill reported `operation_id` and `operation_status` to the caller.

## Cleanup

Completed operations are part of the device's audit trail and are normally kept. To
remove them together with test devices, delete the device's managed object; to remove
them explicitly:

- **Action (CLI, preferred)**: `c8y operations deleteCollection --device <device_id> --force`
  **Action (REST, fallback)**: `DELETE /devicecontrol/operations?deviceId=<device_id>`
  **Expected result**: exit code 0 / HTTP 204.
  **On failure**: apply [error-handling](../../_common/error-handling.md); report the
  leftover `operation_id`.
