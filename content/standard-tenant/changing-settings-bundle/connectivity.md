---
weight: 40
title: Connectivity
layout: redirect
sector:
  - platform_administration
---

In the **Connectivity** page, you can manage credentials for different providers. In order to add or replace credentials ADMIN permissions are required.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

The **Connectivity** menu item is only available if you are logged in to the {{< product-c8y-iot >}} platform as administrator and if you have READ or ADMIN permission for the permission type "Connectivity".

To view connectivity settings: READ permission for the permission type "Connectivity"
To set or remove connectivity provider configurations: ADMIN permission for the permission type "Connectivity"

{{< /c8y-admon-req >}}

The following provider settings may currently be specified:

- [Actility LoRa](/device-integration/lpwan/#lora-actility)
- [Sigfox](/device-integration/lpwan/#sigfox)
- [SIM](/device-management-application/connectivity)

### To provide or replace credentials {#to-provide-or-replace-credentials}

1. Switch to the tab of your desired provider.
2. Enter the URL of the provider.
3. Enter the credentials of your provider platform. Depending on the provider, these credentials will be either the credentials of your account in the provider platform or the credentials with which you can register in the {{< product-c8y-iot >}} connectivity page, will be displayed in your account in the provider platform.
4. Finally, click **Save** to save your settings.

Depending on the provider you have selected, there may be additional fields, which will be explained in the respective agent documentation, see [Device integration](/device-integration/).
