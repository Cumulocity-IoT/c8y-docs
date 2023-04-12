---
weight: 30
title: LWM2M connector device
layout: redirect
---

The LWM2M connector device is an automatically generated device for the tenants which have a subscription to the LWM2M application.
You can use this device to manage tenant-wide LWM2M devices.
The `help` shell command shows the available operations and how to use them.

Additionally, the bulk device registration status and result are shown under this device.

![LWM2M connector bulk device registration result](/images/device-protocols/lwm2m/lwm2m-connector-device-bulk-device-reg-res.png)

{{< c8y-admon-caution >}}
We recommend you to never delete the connector device.
{{< /c8y-admon-caution >}}

### Migration of the LWM2M devices

Starting from version 10.15.0, the new device registration for LWM2M is introduced.
LWM2M devices created earlier than version 10.15.0 and new LWM2M devices created via bulk registration must be migrated
to the new structure using `migrateLwm2mDevices` command for the tenant. The migrate operation will try to migrate all devices and their existing client registration objects to 
the new format in the database. It will be backwards compatible since it retains old fragments. 

Arguments `-d` or `--devices` followed by the device managed object ID(s) can be used to migrate specific device managed objects. To skip the
migration of their corresponding client registration objects, use `-sr` or `--skipRegistrations` as an argument.

Example usages:
* `migrateLwm2mDevices`: to migrate all devices and client registration objects of the tenant
* `migrateLwm2mDevices --skipRegistrations`: to migrate all devices without their client registration objects
* `migrateLwm2mDevices --devices 1111 2222`: to migrate specific devices with their client registration objects
* `migrateLwm2mDevices -sr -d 1111 2222`: to migrate specific devices without their client registration objects

<a name="lwm2m-invalidate-lwm2m-registrations"></a>
## Invalidate registrations

The LWM2M connector device may be used to invalidate LWM2M registrations. This is sometimes helpful to force a LWM2M device to re-register.

### Invalidate registrations by endpoint

This command removes the LWM2M registrations using an endpoint ID.

Syntax: `invalidateRegistrationsForEndpoint <endpoint_ID>`

Example usage: `invalidateRegistrationsForEndpoint urn:imei:012345678901234`

This command invalidates all known LWM2M registrations for the endpoint `urn:imei:012345678901234`.

### Invalidate registrations by LWM2M registration ID

Alternatively an LWM2M registration may be invalidated using its ID, using the following command:

Syntax: `invalidateRegistrationById <registration_ID>`

Example usage: `invalidateRegistrationById F7DqjmW3Yy`

This command invalidates the LWM2M registration with ID `F7DqjmW3Yy`.
