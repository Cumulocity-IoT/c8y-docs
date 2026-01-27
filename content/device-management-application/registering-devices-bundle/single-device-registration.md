---
weight: 10
title: Single device registration
layout: redirect
---

{{< product-c8y-iot >}} offers single device registration to connect devices manually one by one.

### To connect a device manually {#to-connect-a-device-manually}

{{< c8y-admon-info >}}
Depending on the type of device you want to connect, not all steps of the following process may be relevant.
{{< /c8y-admon-info >}}

1. Click **Registration** in the **Devices** menu of the navigator.
2. In the **Device registration** page, click **Register device** at the right of the top bar and from the dropdown menu select **Single registration** > **General**. The **Register devices** dialog box will be displayed.
3. In the **Device ID** field, enter a unique ID for the device. To determine the ID, consult the device documentation. In case of mobile devices the ID usually is the IMEI (International Mobile Equipment Identity) often found on the back of the device.
4. Optionally, select a group to assign your device to after registration, see also [Grouping devices](/device-management-application/grouping-devices).
5. Click **Add device** to register one more device. Again, enter the device ID and optionally select a group. This way, you can add multiple devices in one step.
6. Click **Next** to register your device(s).

{{< c8y-admon-info >}}
In an {{< enterprise-tenant >}}, the {{< management-tenant >}} may also directly select a tenant to which the device will be added from here. Note that since the {{< management-tenant >}} does not have access to the subtenant's inventory you can either register devices to a tenant OR to a group, not both.

<img src="/images/users-guide/DeviceManagement/devmgmt-device-registration-tenant.png" alt="General device registration">
{{< /c8y-admon-info >}}

After successful registration the device(s) will be listed in the [Device registration](/device-management-application/registering-devices) page with the status "Waiting for connection".

Turn on the device(s) and wait for the connection to be established.

Once a device is connected, its status will change to "Pending acceptance".

{{< c8y-admon-info >}}
The **Pending acceptance** screen might differ depending on the [security token policy](#security-token-policy).
{{< /c8y-admon-info >}}

Click **Accept** to confirm the connection. The status of the device will change to "Accepted".

{{< c8y-admon-info >}}
In case of any issues, consult the documentation applicable for your device type in the [{{< product-c8y-iot >}} {{< device-portal >}}]({{< link-device-portal >}}) or look up the manual of your device.
{{< /c8y-admon-info >}}

This dialog can also be prefilled via query parameters.
The field for the **Device ID** can be prefilled using the `externalId` query parameter, while the optional field **One-time password** can be prefilled via the `one-time-password` query parameter.

A sample path could look like this:
`/apps/devicemanagement/index.html#/deviceregistration?externalId=tedge-12345678&one-time-password=myRandomOTP`

Any special characters may need to be URL-encoded.

### Security token policy {#security-token-policy}

Configure the security token policy to reduce the risk of devices which are not yet registered being taken over by threat actors, for example, by guessing their serial numbers.

{{< c8y-admon-info >}}
The feature requires  READ permission for "Option management". If the permission is missing, the security token policy defaults to OPTIONAL.
{{< /c8y-admon-info >}}

{{< product-c8y-iot >}} supports the following values for the security token policy:

* IGNORED - Even if a device requires secure registration, {{< product-c8y-iot >}} will ignore that requirement.
* OPTIONAL - If a device requires secure registration, {{< product-c8y-iot >}} will request an additional security token from the user.
* REQUIRED - All devices connected to {{< product-c8y-iot >}} must use a security token during registration.

The policy can be configured by setting the following tenant option with one of the values listed above, for example:

```json
{
  "category": "device-registration",
  "key": "security-token.policy",
  "value": "IGNORED"
}
```

{{< c8y-admon-info >}}
The **Pending acceptance** screen might differ depending on the [security token policy](#security-token-policy).
{{< /c8y-admon-info >}}

#### Ignored security token policy {#ignored-security-token-policy}

With a value of IGNORED for the security token policy, a device connected to {{< product-c8y-iot >}} can be accepted without any token validation:

![Accepting devices registrations under ignored security token policy](/images/users-guide/DeviceManagement/devmgmt-at-register-device-pending-acceptance-ignored-security.png)

#### Optional security token policy {#optional-security-token-policy}

The list of device registrations is presented in the image below. Note that the input for security token is displayed for all devices.

![Accepting devices registrations under optional security token policy](/images/users-guide/DeviceManagement/devmgmt-at-register-device-pending-acceptance-optional-security.png)

**Registration without using a security token**

When a device connected to {{< product-c8y-iot >}} doesn't use a security token, the registration can proceed without providing any value in the security token input.

If a security token is provided for a device which is connected insecurely, it will be accepted and the token will be ignored.

**Registration using a security token**

When a device connected to {{< product-c8y-iot >}} does use a security token, the registration can be completed only if the user provides a token matching the one sent by the device on establishing the connection.

![Providing a token for device registration request in optional security token policy](/images/users-guide/DeviceManagement/devmgmt-at-register-device-pending-acceptance-optional-security-enter-token.png)

In the case of providing an incorrect token, an error message will be displayed informing about a mismatch between the value used by the device and the value provided via the user interface.

After a certain amount of failed attempts, the registration will reach the blocked state, indicated by a corresponding error message.
The blocked registration must be removed before the next attempt to connect the device.

**Limited  usage of "Accept all" feature**

The **accept all** feature is supported for devices connected to {{< product-c8y-iot >}} without the usage of a security token.

For any device which uses a security token, the **accept all** feature is not available and will display a warning message. The details of the warning message provide the list of devices which could not be accepted automatically.

Such devices must be accepted manually by providing the correct **Security token** value and clicking **Accept**.


#### Required security token policy {#required-security-token-policy}

In this mode any device connected to {{< product-c8y-iot >}} must use a security token on establishing the connection and the user must enter the same token when accepting the device.

The procedure of accepting devices is the same as described in [Optional security token policy](#optional-security-token-policy).

While in this mode, any devices connecting to {{< product-c8y-iot >}} without a security token will be blocked and it won't be possible to complete their registration.
