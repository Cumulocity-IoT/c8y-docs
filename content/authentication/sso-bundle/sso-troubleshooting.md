---
weight: 70
title: Troubleshooting
layout: redirect
sector:
  - platform_administration
---

### Inspect token content {#inspect-token-content}

It can be particularly helpful to inspect the content of the authorization token sent to the platform as some of its
fields contain the information required for the correct configuration described above.

In the Administration application, click **Accounts** > **Audit logs**, filter by the type "Single sign-on" and
look for entries with "JSON web token claims".

The contexts of the token will be presented in JSON format.

![Audit token content](/images/users-guide/Administration/admin-sso-audit-token.png)

### Enforce the use of the tenant domain in SSO login {#enforce-use-of-tenant-domain}

If a tenant is configured to use the `tenantId` in the `baseUrl` (instead of a tenant domain), users may experience
unexpected redirect behavior after authenticating via SSO.

If a user opens an application by entering its URL directly and initiates login via SSO, they may not be returned to the
intended application after authentication. Instead, they may be redirected to the default application configured for the
tenant.

This can be changed by setting the following tenant options:

- category: `sso`
- key: `sso-redirect-default-application`
- value: `false`

Setting this tenant option to `false` will enforce the use of the tenant domain during SSO login. This results in:

- Correctly scoped cookies being set for the intended application, ensuring the user is redirected back to the original application after successful authentication.
- Support for SSL certificates using **Subject Alternative Name (SAN)**, eliminating the need for wildcard or tenant-specific certificates.

**When to use:**

Apply this setting when:

- The tenant environment is configured with base URLs that include `{tenantId}` instead of `{tenantDomain}`.
- Users are redirected to the wrong application after SSO login.
- You want to use a single SSL certificate with SAN entries instead of maintaining separate certificates for each domain.
