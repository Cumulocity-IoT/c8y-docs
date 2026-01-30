---
weight: 40
title: Integration with Keycloak
layout: redirect
sector:
  - platform_administration
---

### Global logout feature (available for Keycloak in version 12.0.0 and higher) {#global-logout-feature-available-for-keycloak-in-version-1200-and-higher}

Integration with Keycloak allows administrators to use a global logout feature based on OpenId Connect. An event from the Keycloak authorization server is sent to all applications (including the {{< product-c8y-iot >}} platform) with a logout token that is verified in the same way as the token used in the login process. This feature allows ending sessions on both sides, applications and Keycloak, for the particular user.

To configure the global logout feature follow these steps:

1. Go to the administrator console.
2. Select the realm used in the SSO configuration for the tenant.
3. Navigate to **Clients** in the **Configure** section.
4. Select the client used in the SSO configuration.
5. Set the **Backchannel Logout URL** field to "https://mytenant.{{< domain-c8y >}}/user/logout/oidc".

To use the global logout feature follow these steps:

1. Go to the administrator console.
2. Select the realm used in the SSO configuration for the tenant.
3. Navigate to **Users** in the **Manage** section.
4. Select the particular user.
5. Navigate to the **Sessions** tab in the **Manage** section and click **Logout**.

### Logout all users feature {#logout-all-users-feature}

Keycloak also provides a feature which allows administrators to logout all SSO users.

To configure the logout all users feature follow these steps:

1. Go to the administrator console.
2. Select the realm used in the SSO configuration for the tenant.
3. Navigate to **Clients** in the **Configure** section.
4. Select the client used in the SSO configuration.
5. Set the **Admin URL** to "https://mytenant.{{< domain-c8y >}}/user/keycloak"

To use the logout all users feature follow these steps:

1. Go to the administrator console.
2. Select the realm used in the SSO configuration for the tenant.
3. Navigate to the **Sessions** tab in the **Manage** section and click **Logout all**.

Note that the logout event for all users is only performed in the scope of one Keycloak realm.
Moreover, it is only sent for those tenants where the client being used as a configuration for the SSO feature has the correct **Admin URL** value.

In the **Session** tab, the Keycloak administrator can also check how many active sessions exist on the respective client and estimate how many tenants and users will be affected by the logout event.

To confirm if the logout event for all users or a single user has been received by the tenant, the {{< product-c8y-iot >}} administrator can verify if there is information about the logout event in the audit logs. The audit logs are available in the Administration application under **Accounts** in the **Audit Logs** tab.
