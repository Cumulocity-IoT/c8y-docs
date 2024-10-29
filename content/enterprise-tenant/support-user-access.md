---
weight: 50
title: Support user access
layout: bundle
sector:
  - platform_administration
---

{{< c8y-admon-req >}}
To allow support users to log in as a user of your tenant, **support user access** must be enabled. This option is available at tenant level and applies to all users of the tenant.
{{< /c8y-admon-req >}}

The support user access feature enables {{< product-c8y-iot >}} platform providers ({{< company-sag >}} in case of the public cloud instances or service providers in case of individual on-prem installations) to support their customers by accessing their users using a support user. A support user is a user in the {{< management-tenant >}} that has specific permissions, that is, to access subtenant users in case of any issues.

{{< c8y-admon-req >}}
To use this feature, support user access must be configured and the required support users must be created in the {{< management-tenant >}}. Contact your Operations team on how to configure this feature according to your needs.

On the {{< product-c8y-iot >}} public cloud instances, the support user functionality can only be used by the {{< company-c8y >}} team for providing customer support. It is not available for {{< enterprise-tenant >}} customers to support their customers/subtenants.
{{< /c8y-admon-req >}}


### To configure support user access {#to-configure-support-user-access}

Support user access can either be:

* Activated for all subtenants by default.
* Deactivated for all subtenants, but explicitly be enabled by a user for their tenant.

This is configured globally in the {{< management-tenant >}}. Contact your Operations team on how to configure the settings according to your needs.

If activated globally, the support user can log in to all allowed subtenants as any user without restriction.

If deactivated globally, support user access can still be enabled by a subtenant user if required. This is done by clicking **Enable support** in the **User** menu, see [User options and settings](/get-familiar-with-the-ui/user-settings). The support access is not restricted to the user who activated it but applies to all users of the tenant. This is necessary for retracing of role/right issues.

After a user has activated support access, the menu item changes to **Disable support**, so that the user can disable a pending support request which has been resolved actively before it expires.

{{< c8y-admon-info >}}
If you don't see either the **Enable support** or **Disable support** button in the **User** menu, support user access has been activated globally. Contact [product support](/additional-resources/contacting-support/) or your Operations team for more details.

If a user with tenant management admin permission disables the support request, *all* support requests for the tenant will be disabled.
{{< /c8y-admon-info >}}

The duration of the active support request can be globally configured in the {{< management-tenant >}} (default is 24 hours). Contact your Operations team on how to configure this setting according to your needs.

Each new support request will prolong the support duration for the specified number of hours. After the last support request in a subtenant has expired or has been actively disabled by the user, the support user access for the subtenant will immediately be disabled (if not activated globally).

Details on the status of support requests and support user access for a tenant can be found in the **Properties** tab of the tenant, see [Managing tenants](/enterprise-tenant/managing-tenants/).
