---
title: Authenticate REST API requests
description: Send authenticated requests to the Cumulocity REST API with basic authentication or an OAI-Secure access token, check the credentials, and keep them out of logs and replies.
weight: 5
api:
  - operation: getCurrentUserResource
    method: GET
    path: /user/currentUser
    title: Retrieve the current user
  - operation: getCurrentTenantResource
    method: GET
    path: /tenant/currentTenant
    title: Retrieve the current tenant
  - operation: getLoginOptionCollectionResource
    method: GET
    path: /tenant/loginOptions
    title: Retrieve all login options
  - operation: postLoginFormBody
    method: POST
    path: /tenant/oauth/token
    title: Obtain an access token
---

Every request to the {{< product-c8y-iot >}} REST API is sent to your tenant and is authenticated with the credentials of a platform user. The other skills assume that you send their requests as described here.

### What you need {#what-you-need}

You need the following information:

* **Tenant domain**: The URL of your tenant, for example `https://mytenant.cumulocity.com`. All request paths in the skills are relative to this URL.
* **Tenant ID**: The unique ID of your tenant, for example `t07007007`. In the UI, the tenant ID is shown in the user dropdown menu, see [User options and settings](/get-familiar-with-the-ui/user-settings/).
* **Username and password**: The credentials of a platform user. Use a user who has the roles that the skill lists, not a device user.

The examples use `<tenant_domain>`, `<tenant_id>`, `<username>`, and `<password>` for these values.

### To authenticate with basic authentication {#to-authenticate-with-basic-authentication}

Send the credentials in the `Authorization` header of every request. The username is the tenant ID and the username, separated by a slash.

1. Create the Base64 string of `<tenant_id>/<username>:<password>`:

    ```shell
    echo -n '<tenant_id>/<username>:<password>' | base64
    ```

2. Send the string in the `Authorization` header:

    ```http
    GET /user/currentUser
    Host: <tenant_domain>
    Authorization: Basic <base64_string>
    Accept: application/json
    ```

With curl, the `-u` option creates the header for you:

```shell
curl -sS -u '<tenant_id>/<username>:<password>' -H 'Accept: application/json' 'https://<tenant_domain>/user/currentUser'
```

Basic authentication remains available for API clients even if users log in to the UI with OAI-Secure. An administrator can restrict it, for example for specific user agents, see [Basic Auth restrictions](/authentication/basic-settings/#basic-auth-restrictions). To see which login options your tenant offers, send a [Retrieve all login options](https://{{< domain-c8y >}}/api/core/#operation/getLoginOptionCollectionResource) request to `GET /tenant/loginOptions`. This request needs no authentication.

### To authenticate with an access token {#to-authenticate-with-an-access-token}

If basic authentication is restricted for your client, use an OAI-Secure access token instead.

1. Send an [Obtain an access token](https://{{< domain-c8y >}}/api/core/#operation/postLoginFormBody) request with the credentials as form data:

    ```http
    POST /tenant/oauth/token?tenant_id=<tenant_id>
    Content-Type: application/x-www-form-urlencoded
    Accept: application/json

    grant_type=PASSWORD&username=<username>&password=<password>
    ```

    If the user must enter a two-factor authentication code, also send the code in the `tfa_code` form field.

2. Read the token from the `access_token` property of the response.
3. Send the token in the `Authorization` header of every request:

    ```http
    GET /user/currentUser
    Authorization: Bearer <access_token>
    Accept: application/json
    ```

The token expires after the lifetime that your tenant configures. When a request returns HTTP 401, request a new token. See [OAI-Secure session configuration](/authentication/oai-secure/#oai-secure-session-configuration).

### To check the credentials {#to-check-the-credentials}

Send a [Retrieve the current user](https://{{< domain-c8y >}}/api/core/#operation/getCurrentUserResource) request:

```http
GET /user/currentUser
```

The platform returns HTTP 200 and the user. The `effectiveRoles` array lists the roles of the user. Compare them with the roles that a skill lists before you start it.

If the platform returns HTTP 401, the credentials are wrong, the token expired, or basic authentication is restricted for your client.

To find the tenant ID with the API, send a [Retrieve the current tenant](https://{{< domain-c8y >}}/api/core/#operation/getCurrentTenantResource) request to `GET /tenant/currentTenant`. The `name` property of the response is the tenant ID.

### Headers for every request {#headers-for-every-request}

Send the following headers in addition to the `Authorization` header:

* `Accept: application/json` with every request. Without this header, POST and PUT requests return no body.
* `Content-Type: application/json` with every request that has a JSON body.

### Instructions for AI agents {#instructions-for-ai-agents}

If you are an AI agent that runs the skills for a user, follow these rules in addition:

1. Read the credentials from the environment variables `C8Y_BASEURL` (the tenant domain URL, without a trailing slash), `C8Y_TENANT`, `C8Y_USER`, and `C8Y_PASSWORD`.
2. Check that the variables are set without printing their values:

    ```shell
    for v in C8Y_BASEURL C8Y_TENANT C8Y_USER C8Y_PASSWORD; do if [ -n "$(printenv "$v")" ]; then echo "$v set"; else echo "$v missing"; fi; done
    ```

    If a variable is missing, stop and ask the user to set it. Do not ask for the password in the conversation.

3. Reference the variables in each command, never their values:

    ```shell
    curl -sS -u "${C8Y_TENANT}/${C8Y_USER}:${C8Y_PASSWORD}" -H 'Accept: application/json' "${C8Y_BASEURL}<path>"
    ```

    For a request with a body, add `-X POST` or `-X PUT`, `-H 'Content-Type: application/json'`, and `-d '<json>'`. For a DELETE request, add `-X DELETE`.

4. Never print a credential. Do not run `env`, `set`, or `printenv` without a variable name, do not echo `C8Y_PASSWORD`, and do not use the curl options `-v` or `--trace`, which print the `Authorization` header. To see the HTTP status, add `-w '%{http_code}'` instead.
