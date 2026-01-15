---
date: 2026-01-15
title: MQTT Service enforces Common Name validation for certificate authentication
change_type:
  - value: change-3BQrQ6adS
    label: API change
product_area: Platform services
component:
  - value: component-LcWEQW5gs
    label: MQTT
build_artifact:
  - value: tc-hc5Tfixeqqei
    label: mqtt-service
issue: MTM-65164
version: 0.9.44
---

{{< c8y-admon-caution >}}
This change only affects the new {{< product-c8y-iot >}} [MQTT Service](/device-integration/mqtt-service/) capability.

The existing {{< product-c8y-iot >}} [Core MQTT](/device-integration/mqtt/) capability is **not** affected.
{{< /c8y-admon-caution >}}

### Introduction

As [previously announced](/change-logs/#mqtt-service-0.9.x-cn-validation-announcement), the {{< product-c8y-iot >}} [MQTT Service](/device-integration/mqtt-service/) now enforces **Common Name (CN) validation** during client certificate authentication.

This update strengthens identity assurance by ensuring a tight binding between a device's identity and the certificate it presents. By requiring the certificate's CN to match the MQTT client identifier, we significantly reduce the risk of certificate misuse across different devices.

### What is changing?

When an MQTT client connects using certificate-based authentication, the platform now validates that the **Common Name (CN)** field in the provided certificate matches the **MQTT Client ID**.

To ensure backward compatibility and support for legacy migration patterns, the validation logic supports the following matching rules:

| MQTT client ID format | Valid certificate CN | Description |
| --- | --- | --- |
| `<deviceId>` | `CN = <deviceId>` | Standard format for new devices. |
| `d:<deviceId>` | `CN = <deviceId>` OR `CN = d:<deviceId>` | Supported for legacy SmartREST devices migrating to MQTT Service. |

Any connection attempt where the certificate CN does not align with these rules will now be rejected with an authentication failure.

### Impact and required actions

This is a **breaking change** for any environment where devices were previously using "generic" certificates or certificates where the CN did not strictly match the device identifier.

* **Existing devices:** If your devices use certificates with mismatched CNs, they will no longer be able to connect. You must rotate these certificates to align with the device's MQTT Client ID.
* **Certificate issuance:** Update your provisioning workflows to ensure the `Common Name` field is automatically populated with the unique device identifier.
* **Authentication methods:** This change specifically targets certificate-based authentication. Clients using username/password are unaffected.

### Why we are making this change

Aligning the certificate identity with the protocol identity is a security best practice. It prevents "impersonation" scenarios where a valid certificate stolen from one device could be used to authenticate as a different device ID, ensuring higher integrity for your IoT data.