---
title: Read the provisioned certificates of a device
description: Find the device user of a device and read the X.509 certificates that the platform provisioned to the device, as shown in its x509 tab.
weight: 449
sector:
  - device_management
requires:
  - authentication
api:
  - operation: getExternalIDResource
    method: GET
    path: /identity/externalIds/{type}/{externalId}
    title: Retrieve a specific external ID
  - operation: getManagedObjectUserResource
    method: GET
    path: /inventory/managedObjects/{id}/user
    title: Retrieve the username and state of a specific managed object
  - operation: getUserResource
    method: GET
    path: /user/{tenantId}/users/{userId}
    title: Retrieve a specific user for a specific tenant
---

The certificate authority of your tenant issues X.509 certificates to devices. The platform records the certificates that a device used in a successful handshake with the platform. These are the provisioned certificates of the device. The Device Management application shows them in the **x509** tab of the device, see [Provisioned certificates](/device-certificate-authentication/provisioned-certificates/).

You read the provisioned certificates from the device user, that is, the platform user with which the device authenticates. A device has a device user only if it was registered with credentials that the platform manages. The name of a device user starts with `device_`, followed by the ID that was used to register the device. This ID is not the name of the device, the ID of its managed object, or its IMEI. Always read the username from the platform. Do not build it.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To find the device by its external ID: ROLE_IDENTITY_READ
* To read the user of the device: ROLE_INVENTORY_READ
* To read the certificates: ROLE_USER_MANAGEMENT_READ
{{< /c8y-admon-req >}}

The examples use `<device_id>` for the ID of the managed object of the device, `<tenant_id>` for the ID of your tenant, and `<device_username>` for the name of the device user.

### To find the device by its external ID {#to-find-the-device-by-its-external-id}

If you know the IMEI or the serial number of the device instead of its ID, look up the device by this external ID. The external ID type of an IMEI is `c8y_IMEI`, the type of a serial number is `c8y_Serial`. The example uses `<external_id>` for the IMEI.

Send a [Retrieve a specific external ID](https://{{< domain-c8y >}}/api/core/#operation/getExternalIDResource) request:

```http
GET /identity/externalIds/c8y_IMEI/<external_id>
```

The platform returns HTTP 200. Note the `managedObject.id` of the response as `<device_id>`. If the platform returns HTTP 404, no device has this external ID.

### To find the device user {#to-find-the-device-user}

Send a [Retrieve the username and state of a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectUserResource) request:

```http
GET /inventory/managedObjects/<device_id>/user
```

The platform returns HTTP 200 and the owner of the managed object in `userName`. Check the value:

* **The value starts with `device_`**: It is the device user. Note it as `<device_username>`.
* **The value does not start with `device_`**: A regular user created the managed object, for example with the REST API. The device has no device user and no provisioned certificates.
* **The value is empty or missing**: The device has no device user and no provisioned certificates.

If the platform returns HTTP 404, the device has no device user.

### To read the provisioned certificates {#to-read-the-provisioned-certificates}

Send a [Retrieve a specific user for a specific tenant](https://{{< domain-c8y >}}/api/core/#operation/getUserResource) request with the parameter `withCertificates=true`:

```http
GET /user/<tenant_id>/users/<device_username>?withCertificates=true
```

The platform returns HTTP 200 and the device user. The `provisionedCertificates` array contains the provisioned certificates of the device. The array is empty or missing if the device has no provisioned certificates.

The platform keeps the 5 most recently issued certificates of a device. Each certificate is valid for one year.

If the platform returns HTTP 404 with the error `usermangement/Not Found`, the platform has no certificate data for the user. The device has no provisioned certificates. If it returns HTTP 403, you do not have the role ROLE_USER_MANAGEMENT_READ.

To revoke provisioned certificates, use the **x509** tab of the device, see [To revoke a provisioned certificate](/device-certificate-authentication/provisioned-certificates/#to-revoke-a-provisioned-certificate).
