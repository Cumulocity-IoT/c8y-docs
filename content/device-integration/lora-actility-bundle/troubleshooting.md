---
weight: 90
title: Troubleshooting
layout: redirect
---

### Device registration {#device-registration}

#### Access to device denied {#access-to-device-denied}

This warning message shows up when there already exists a provisioned device in ThingPark with the same device EUI used for device registration and the validation comparing those devices based on application EUI (for OTAA activation) and device profile has failed.

To resolve this, provide the correct application EUI from [Connectivity](#configuring-credentials) application and device profile and try again.

#### No LoRa provider settings found {#no-lora-provider-settings-found}

This warning message shows up when there are no credentials set up for the ThingPark account. To resolve this click **Settings** to navigate to the Administration application where the connections are configured.

<img src="/images/device-protocols/lora-actility/lora-registration-no-credentials.png" alt="Device registration failure without credentials" style="max-width: 100%">
<br>

To resolve this, refer to [Configure ThingPark credentials](#configuring-credentials).

#### Getting device profiles from provider failed {#getting-device-profiles-from-provider-failed}

This warning message shows up when the tenant's access token to Thingpark becomes invalid. Invalidation of the token might happen when the same ThingPark credentials are used for another tenant.

This issue can be solved by reconfiguring the Actility ThingPark credentials to renew the access token. Refer to [configure ThingPark credentials](#configuring-credentials) for reconfiguration of the credentials.

#### No device protocols configured {#no-device-protocols-configured}

This warning message shows up when no LoRa device protocol exists to be used for device registration. To resolve this, click  **Device protocols** to navigate to the **Device protocols** page where the protocols are configured.

<img src="/images/device-protocols/lora-actility/lora-registration-no-devicetype.png" alt="No device protocol given for LoRa" style="max-width: 100%"/>

To resolve this, configure at least one device protocol in the [Device database](/device-management-application/managing-device-types).

#### No connectivity plans with free slots available {#no-connectivity-plans-with-free-slots-available}

This warning message shows up when the connectivity plan in Actility ThingPark has reached the limit for the device count.

To resolve this, either contact ThingPark on the device quota limits for your connectivity plans or remove unused devices from ThingPark and retry registering the device in {{< product-c8y-iot >}}.

### Connectivity {#connectivity}

#### Authorization to the LoRa platform failed {#authorization-to-the-lora-platform-failed}

This warning message shows up if a provided profile ID, username or password is invalid.

To resolve this, provide correct credentials and try again.
#### Authentication to the Actility platform failed. Check if the base URL is correct. {#authentication-to-the-actility-platform-failed-check-if-the-base-url-is-correct}

To resolve this, provide a correct URL and try again.

#### Authentication to the Actility platform failed with status code '400'. Check if the profile ID is correct. {#authentication-to-the-actility-platform-failed-with-status-code-400-check-if-the-profile-id-is-correct}

To resolve this, provide a correct profile ID and try again.

#### Authentication to the Actility platform failed with status code '401'. Check if the credentials are correct. {#authentication-to-the-actility-platform-failed-with-status-code-401-check-if-the-credentials-are-correct}

To resolve this, provide a correct username and password and try again.
