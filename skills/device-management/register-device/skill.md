---
name: register-device
description: Register one device that fetches its own credentials (new-device request, wait for its connection, accept) and verify it appears in the inventory; a request that supplies a device password or a CSV file goes to bulk-register-devices instead.
area: device-registration-single
inputs:
  - name: device_serial
    description: Unique external ID (serial) of the one device to register; the device requests its own credentials. A device password or a CSV file is not an input of this skill (the skill choice above the Prerequisites check routes it to bulk-register-devices)
    example: "device-4711"
    required: true
outputs:
  - name: request_status
    description: Final status of the new-device request (WAITING_FOR_CONNECTION, PENDING_ACCEPTANCE, or ACCEPTED)
  - name: device_id
    description: Inventory managed object ID of the device (only once the device has connected and been accepted)
prerequisites:
  - Role ROLE_DEVICE_CONTROL_ADMIN
  - Role ROLE_IDENTITY_READ (for Step 4)
cli_version: "2.55.0"
sources:
  - repo: go-c8y-cli
    path: "c8y deviceregistration register|get|approve|delete --help; c8y identity get --help (v2.55.0); --dry --dryFormat json previews"
    note: CLI actions verified request-equivalent to the REST actions on 2026-09-03 (register POST {id}; approve PUT {status ACCEPTED})
  - repo: cumulocity-openapi
    path: src/components/schemas.yml
    note: newDeviceRequest schema (status enum WAITING_FOR_CONNECTION/PENDING_ACCEPTANCE/ACCEPTED, securityToken); its properties (id, groupId, type, securityToken, enrollmentToken) carry no device password
  - repo: cumulocity-openapi
    path: src/openapi.yml
    note: POST /devicecontrol/bulkNewDeviceRequests (CSV columns ID, CREDENTIALS = password for the device's user, TYPE, NAME) is the endpoint that takes preset device passwords; skill choice
  - repo: c8y-docs
    path: content/device-management-application/registering-devices-bundle/bulk-device-registration.md
    note: full registration pre-registers each device with username <tenant>/device_<id> and the CSV password; skill choice
  - repo: cumulocity-openapi
    path: src/markdown/device-control/new-device-requests.md
    note: registration flow
  - repo: c8y-docs
    path: content/device-management-application/registering-devices-bundle/single-device-registration.md
    note: UI-equivalent flow
  - repo: c8y-docs
    path: content/device-integration/device-integration-rest-bundle/integration-life-cycle.md
    note: device-side steps 0-4; after acceptance the platform sends generated credentials to the device (skill choice)
  - repo: cumulocity-openapi
    path: src/components/securitySchemes.yml
    note: "Basic auth username <tenantID>/<c8yuser> (Prerequisites item 1 curl line; presence check and curl line verified 2026-10-07: HTTP 200 /user/currentUser)"
  - repo: cumulocity-openapi
    path: src/markdown/reference-guide.md
    note: "Login options: the tenant has its own dedicated URL (C8Y_BASEURL, never built from the tenant ID); requests authenticate with tenant ID, user and password"
validated:
  platform_version: "2026.292.0"
  date: 2026-09-04
  cli:
    version: "2.55.0"
    status: passed
    date: 2026-09-04
---

# Register a single device

Request URLs and headers follow [authentication](../../_common/authentication.md); the
credential rules every step needs are inline in Prerequisites item 1.

**Choose the skill first.** A new-device request carries no password: after acceptance
the platform generates the device's credentials and sends them to the device. Preset
device passwords are taken only by the bulk device credentials endpoint
(`POST /devicecontrol/bulkNewDeviceRequests`), which creates each device's platform user
`<C8Y_TENANT>/device_<device ID>` with the given password.

| The request | Rule |
|---|---|
| Supplies a password (credentials) for the device, with or without type and name | Stop this skill before any platform call; run `/c8y-dm-repositories:bulk-register-devices` (full registration — a single device is a one-row CSV file). |
| Supplies a CSV file of devices (for example the header `ID;CREDENTIALS;TYPE;NAME` or `ID;PATH`) | Stop this skill before any platform call; run `/c8y-dm-repositories:bulk-register-devices` with that file. |
| Names two or more devices, no password, no file | Run this skill once per device, each run with its own `<device_serial>`. |
| Any other request (one device serial; the device fetches its own credentials) | Continue with the Prerequisites check. |

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
   - Then its route selection rows 1–3: `c8y version` failing (command not found included)
     or showing another major → REST route for the whole skill. Every
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
   `ROLE_DEVICE_CONTROL_ADMIN`.
   **On failure**: missing role → stop and report it; otherwise apply
   [error-handling](../../_common/error-handling.md).

## Steps

### Step 1 — Create the new-device request

**Action (CLI, preferred)**: `c8y deviceregistration register --id <device_serial> --force --select id,status`

**Action (REST, fallback)**: `POST /devicecontrol/newDeviceRequests` with body:

```json
{ "id": "<device_serial>" }
```

**Expected result**: exit code 0 / HTTP 201; the returned object has
`"id": "<device_serial>"` and `"status": "WAITING_FOR_CONNECTION"`.

**On failure**:

| Condition | Rule |
|---|---|
| HTTP 422 / exit code 22 with `message` containing "already exists" | A request for this serial exists. Continue with Step 2 (do not create a second one). |
| Any other mismatch | Apply [error-handling](../../_common/error-handling.md). |

### Step 2 — Wait for the device to connect

The physical device (or its agent) must now request its credentials by calling
`POST /devicecontrol/deviceCredentials` with the tenant's bootstrap user — that call is
made by the device, not by you.

**Action (CLI, preferred)**: `c8y deviceregistration get --id <device_serial> --select id,status`
once per 10 seconds, for at most 12 attempts (2 minutes).

**Action (REST, fallback)**: `GET /devicecontrol/newDeviceRequests/<device_serial>` once per 10 seconds,
for at most 12 attempts (2 minutes).

**Expected result**: exit code 0 / HTTP 200; the returned object has
`"status": "PENDING_ACCEPTANCE"`.

**On failure**:

| Condition | Rule |
|---|---|
| Still `WAITING_FOR_CONNECTION` after 12 attempts | The device never connected. Report `request_status = WAITING_FOR_CONNECTION` and stop — the request remains valid; the device can connect later. Skip Steps 3–4. Never create the device's managed object, external ID or user yourself: the device creates them after acceptance. |
| Any other response | Apply [error-handling](../../_common/error-handling.md). |

### Step 3 — Accept the request

**Action (CLI, preferred)**: `c8y deviceregistration approve --id <device_serial> --force --select id,status`

**Action (REST, fallback)**: `PUT /devicecontrol/newDeviceRequests/<device_serial>` with body:

```json
{ "status": "ACCEPTED" }
```

**Expected result**: exit code 0 / HTTP 200; the returned object has
`"status": "ACCEPTED"`. The device receives its credentials on its next poll and then
creates its own managed object.

**On failure**: apply [error-handling](../../_common/error-handling.md).

### Step 4 — Verify the device appears in the inventory

**Action (CLI, preferred)**: `c8y identity get --name <device_serial> --type c8y_Serial --select managedObject.id`
once per 10 seconds, for at most 12 attempts.

**Action (REST, fallback)**: `GET /identity/externalIds/c8y_Serial/<device_serial>` once per 10 seconds,
for at most 12 attempts.

**Expected result**: exit code 0 / HTTP 200; the returned object contains
`managedObject.id` → record as `device_id` output.

**On failure**:

| Condition | Rule |
|---|---|
| HTTP 404 / exit code 4 on all attempts | Device was accepted but has not created its managed object (agent-specific). Report `request_status = ACCEPTED` and `device_id` unknown; stop. |
| Any other response | Apply [error-handling](../../_common/error-handling.md). |

## Success criteria

- The new-device request exists and its `status` matches the reported
  `request_status`.
- When the device connected and was accepted:
  `c8y inventory get --id <device_id> --select id,c8y_IsDevice` (or
  `GET /inventory/managedObjects/<device_id>`) returns exit code 0 / HTTP 200 with
  fragment `c8y_IsDevice`.

## Cleanup

Only when the registration should be undone:

- **Action (CLI, preferred)**: `c8y deviceregistration delete --id <device_serial> --force`
  **Action (REST, fallback)**: `DELETE /devicecontrol/newDeviceRequests/<device_serial>`
  **Expected result**: exit code 0 / HTTP 204 (cancels a not-yet-completed request).
  **On failure**: apply [error-handling](../../_common/error-handling.md).
