---
name: manage-trusted-certificates
description: Upload, list, update, prove possession of, and delete the trusted X.509 certificates a Cumulocity tenant accepts for device authentication.
area: trusted-certificates
inputs:
  - name: cert_pem
    description: The X.509 certificate in PEM format (version 3, BasicConstraints CA:true, not expired, not already uploaded)
    example: "PEM text: the BEGIN CERTIFICATE / END CERTIFICATE block including its dash delimiters, newlines escaped as \\n in JSON"
    required: true
  - name: cert_pem_file
    description: Path of a file holding the same PEM as cert_pem (with delimiters) - the CLI route reads the certificate from this file
    example: "/tmp/my-ca.pem"
    required: false
  - name: cert_name
    description: User-provided name for the certificate
    example: "My Certificate"
    required: true
  - name: cert_status
    description: ENABLED (devices using it can connect) or DISABLED
    example: "ENABLED"
    required: true
  - name: auto_registration
    description: true to auto-register new devices presenting a certificate signed by this authority
    example: "false"
    required: true
  - name: signed_verification_code
    description: Verification code signed with the certificate's private key (only for Step 6, proof of possession)
    example: "6qgyIiqnYAx+...FlK2"
    required: false
outputs:
  - name: result_fingerprint
    description: Unique fingerprint of the stored trusted certificate
prerequisites:
  - Role ROLE_TENANT_MANAGEMENT_ADMIN or ROLE_TENANT_ADMIN (write operations; ROLE_TENANT_MANAGEMENT_READ suffices for reads)
  - The requests target the current tenant (<C8Y_TENANT> in the paths below)
cli_version: "2.55.0"
sources:
  - repo: go-c8y-cli
    path: "c8y devicemanagement certificates create|list|get|update|delete --help (v2.55.0); --dry --dryFormat json previews"
    note: CLI actions verified request-equivalent to the REST actions on 2026-09-03; no native command exists for bulk upload or proof of possession
  - repo: cumulocity-openapi
    path: src/openapi.yml
    note: "/tenant/tenants/{tenantId}/trusted-certificates (POST/GET), /bulk, /{fingerprint} (GET/PUT/DELETE), /trusted-certificates-pop/{fingerprint}/{pop,confirmed,verification-code} — bodies, responses, required roles"
  - repo: cumulocity-openapi
    path: src/components/schemas.yml
    note: "UploadedTrustedCertificate (required certInPemFormat+status), TrustedCertificate (fingerprint, readOnly fields), UploadedTrustedCertSignedVerificationCode"
  - repo: c8y-docs
    path: content/device-certificate-authentication/managing-trusted-certificates.md
    note: "certificate requirements (PEM, v3, CA:true, valid, not yet uploaded) and UI-equivalent flow"
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

# Manage trusted certificates

Request URLs and headers follow [authentication](../../_common/authentication.md); the
credential rules every step needs are inline in Prerequisites item 1. `<C8Y_TENANT>`
below is the tenant ID input; the CLI addresses the current tenant implicitly.

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
     or showing another major → REST route for the whole skill. Every REST form below —
     the **Action (REST, fallback)** lines, the `REST:` forms in rules and the REST-only
     **Action** steps, which use REST on both routes — names only a method and a path;
     send it as
     `curl -sS -u "${C8Y_TENANT}/${C8Y_USER}:${C8Y_PASSWORD}" -H 'Accept: application/json' "${C8Y_BASEURL}<path>"`
     with the `${...}` references kept literally. The host is always `${C8Y_BASEURL}`,
     never one built from the tenant ID (body: add
     `-X <POST|PUT> -H 'Content-Type: application/json' -d '<json>'`; delete: add
     `-X DELETE`). Exit codes below follow the cli-conventions table.
   - `c8y version` succeeding → CLI route: every shell call that runs `c8y` — creates, updates and deletes included — starts with `export C8Y_HOST="$C8Y_BASEURL" C8Y_SESSION= C8Y_TOKEN= C8Y_HEADER_AUTHORIZATION= C8Y_SETTINGS_LOGIN_TYPE=BASIC C8Y_SETTINGS_CI=true C8Y_SETTINGS_DEFAULTS_ALLOWEMPTYPIPE=true;` in that same call (the skill's own setup, no confirmation needed; without it a write exits 100 `mode is disabled` → rerun once with it), then `c8y currenttenant get --select name` must print the `C8Y_TENANT` value, else stop: "c8y session override". Never `c8y settings`/`c8y sessions`, `--sessionMode`, or curl in place of a refused `c8y` write.
2. **Action (CLI, preferred)**: `c8y currentuser get --select 'effectiveRoles.*.id' -o csv`
   **Action (REST, fallback)**: `GET /user/currentUser`
   **Expected result**: output (`effectiveRoles[].id`) contains
   `ROLE_TENANT_MANAGEMENT_ADMIN` or `ROLE_TENANT_ADMIN`.
   **On failure**: neither role present → stop and report; otherwise apply
   [error-handling](../../_common/error-handling.md).

## Steps

### Step 1 — Upload the certificate

The certificate must be an X.509 version-3 certificate in PEM format, contain
`BasicConstraints:[CA:true]`, still be valid, and not already be uploaded.

**Action (CLI, preferred)**: `c8y devicemanagement certificates create --file <cert_pem_file> --name "<cert_name>" --status <cert_status> --autoRegistrationEnabled=<auto_registration> --force --select fingerprint,status`

**Action (REST, fallback)**: `POST /tenant/tenants/<C8Y_TENANT>/trusted-certificates` with body
(`<cert_pem>` is the content of `<cert_pem_file>`; the CLI strips the PEM delimiters and
line breaks before sending — the platform accepts both forms):

```json
{
  "certInPemFormat": "<cert_pem>",
  "name": "<cert_name>",
  "status": "<cert_status>",
  "autoRegistrationEnabled": <auto_registration>
}
```

**Expected result**: exit code 0 / HTTP 201; response contains a non-empty `fingerprint`
→ record as `result_fingerprint`. Read-only fields (`issuer`, `subject`, `notBefore`,
`notAfter`, `serialNumber`, `algorithmName`, `version`) are extracted from the
certificate.

**On failure**:

| Condition | Rule |
|---|---|
| HTTP 409 / exit code 9 | A certificate with the same fingerprint already exists. Locate it via Step 2's listing and continue with Step 3 (do not upload again). |
| HTTP 422 / exit code 22 | Certificate data invalid — check the PEM against the requirements above. Stop and report. |
| HTTP 404 / exit code 4 | Tenant `<C8Y_TENANT>` not found — stop and report. |
| Any other mismatch | Apply [error-handling](../../_common/error-handling.md). |

### Step 2 — List the tenant's trusted certificates

**Action (CLI, preferred)**: `c8y devicemanagement certificates list --pageSize 2000 --select fingerprint`

**Action (REST, fallback)**: `GET /tenant/tenants/<C8Y_TENANT>/trusted-certificates?pageSize=2000`

**Expected result**: exit code 0 / HTTP 200; the certificates (CLI: one JSON object per
line; REST: `certificates[]`) contain an entry with `fingerprint` =
`<result_fingerprint>`.

**On failure**: apply [error-handling](../../_common/error-handling.md).

### Step 3 — Retrieve one certificate by fingerprint

**Action (CLI, preferred)**: `c8y devicemanagement certificates get --id <result_fingerprint> --select name,status,autoRegistrationEnabled`

**Action (REST, fallback)**:
`GET /tenant/tenants/<C8Y_TENANT>/trusted-certificates/<result_fingerprint>`

**Expected result**: exit code 0 / HTTP 200; response contains `"name"`, `"status"`,
and `"autoRegistrationEnabled"` with the stored values.

**On failure**:

| Condition | Rule |
|---|---|
| HTTP 404 / exit code 4 | Certificate not found — the fingerprint is wrong or the certificate was deleted. Stop and report. |
| Any other mismatch | Apply [error-handling](../../_common/error-handling.md). |

### Step 4 — Update the certificate's metadata

Only `name`, `status`, and `autoRegistrationEnabled` are writable;
`certInPemFormat` and the proof-of-possession fields are read-only on update.

**Action (CLI, preferred)**: `c8y devicemanagement certificates update --id <result_fingerprint> --name "<cert_name>" --status <cert_status> --force --select name,status`

**Action (REST, fallback)**:
`PUT /tenant/tenants/<C8Y_TENANT>/trusted-certificates/<result_fingerprint>`
with body:

```json
{ "name": "<cert_name>", "status": "<cert_status>" }
```

**Expected result**: exit code 0 / HTTP 200; response reflects the updated values. A
`DISABLED` certificate stops devices using certificates signed by this
authority from connecting.

**On failure**:

| Condition | Rule |
|---|---|
| HTTP 404 / exit code 4 | Certificate not found — stop and report. |
| HTTP 422 / exit code 22 | Payload invalid (attempted to change a read-only field) — stop and report. |
| Any other mismatch | Apply [error-handling](../../_common/error-handling.md). |

### Step 5 — Bulk-upload multiple certificates (alternative to Step 1)

No native `c8y` command covers the bulk endpoint — use REST on either route.

**Action**: `POST /tenant/tenants/<C8Y_TENANT>/trusted-certificates/bulk` with
body:

```json
{
  "certificates": [
    {
      "certInPemFormat": "<cert_pem>",
      "name": "<cert_name>",
      "status": "<cert_status>",
      "autoRegistrationEnabled": <auto_registration>
    }
  ]
}
```

**Expected result**: HTTP 201; response is a certificate collection containing
one entry (with `fingerprint`) per uploaded certificate.

**On failure**:

| Condition | Rule |
|---|---|
| HTTP 409 | A certificate with the same fingerprint already exists — remove the duplicate from the array and retry once. |
| HTTP 422 | Certificates data invalid — stop and report. |
| Any other mismatch | Apply [error-handling](../../_common/error-handling.md). |

### Step 6 — Prove possession of the certificate (optional)

No native `c8y` command covers proof of possession — use REST on either route.

**Action**: three sub-calls, in order:

1. `POST /tenant/tenants/<C8Y_TENANT>/trusted-certificates-pop/<result_fingerprint>/verification-code`
   with no request body → HTTP 200 returns the certificate with
   `proofOfPossessionUnsignedVerificationCode` and
   `proofOfPossessionVerificationCodeUsableUntil`.
2. Sign that code with the certificate's private key — an offline action by
   the certificate owner, not an API call.
3. `POST /tenant/tenants/<C8Y_TENANT>/trusted-certificates-pop/<result_fingerprint>/pop`
   with body
   `{ "proofOfPossessionSignedVerificationCode": "<signed_verification_code>" }`.

**Expected result**: HTTP 200 on both API calls; the final response contains
`"proofOfPossessionValid": true`.

**On failure**:

| Condition | Rule |
|---|---|
| HTTP 400 on `/pop` | The signed verification code is not correct — re-sign the current code and retry once. |
| HTTP 422 on `/pop` | Proof of possession not confirmed — stop and report. |
| HTTP 404 | Certificate not found — stop and report. |
| Working from the management tenant | `POST /tenant/tenants/<C8Y_TENANT>/trusted-certificates-pop/<result_fingerprint>/confirmed` (management tenant only) confirms the certificate without a signature → HTTP 200. |
| Any other mismatch | Apply [error-handling](../../_common/error-handling.md). |

## Success criteria

- `c8y devicemanagement certificates get --id <result_fingerprint> --select name,status,autoRegistrationEnabled`
  (or `GET /tenant/tenants/<C8Y_TENANT>/trusted-certificates/<result_fingerprint>`)
  returns exit code 0 / HTTP 200 with the stored `name`, `status`, and
  `autoRegistrationEnabled`.
- The skill reported `result_fingerprint`.

## Cleanup

Only when the certificate should be removed (this closes the established MQTT
connections of all devices using it):

- **Action (CLI, preferred)**: `c8y devicemanagement certificates delete --id <result_fingerprint> --force`
  **Action (REST, fallback)**:
  `DELETE /tenant/tenants/<C8Y_TENANT>/trusted-certificates/<result_fingerprint>`
  **Expected result**: exit code 0 / HTTP 204.
  **On failure**: HTTP 404 / exit code 4 → already gone, report and continue; otherwise
  apply [error-handling](../../_common/error-handling.md).
