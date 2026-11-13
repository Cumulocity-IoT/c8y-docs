---
title: Register devices in bulk
description: Describe devices and their credentials in a CSV file, upload the file to register all devices at once, evaluate the result for each row, and check a registered device.
when: "the user wants to register many devices at once from a CSV file"
weight: 320
requires:
  - authentication
api:
  - operation: postBulkNewDeviceRequestCollectionResource
    method: POST
    path: /devicecontrol/bulkNewDeviceRequests
    title: Create a bulk device credentials request
  - operation: getExternalIDResource
    method: GET
    path: /identity/externalIds/{type}/{externalId}
    title: Retrieve a specific external ID
  - operation: getNewDeviceRequestResource
    method: GET
    path: /devicecontrol/newDeviceRequests/{requestId}
    title: Retrieve a specific new device request
---

To register many devices at once, you upload a CSV file with one row for each device. A single device is a file with one row. The platform supports two kinds of registration:

* **Full registration**: The file contains the credentials of each device. The platform creates a device user for each device, so the devices can connect immediately.
* **Simple registration**: The file contains only the external ID and the group of each device. The platform creates a new device request for each device, and each request goes through the regular acceptance.

A full registration creates an elementary representation of each device. When the device connects for the first time, it updates the representation with its own data.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To upload the CSV file: ROLE_DEVICE_CONTROL_ADMIN
* To read external IDs: ROLE_IDENTITY_READ
* To read new device requests: ROLE_DEVICE_CONTROL_READ
{{< /c8y-admon-req >}}

The examples use `<external_id>` for the external ID of a device, for example its serial number, and `<tenant_id>` for the ID of your tenant.

### To create the CSV file {#to-create-the-csv-file}

The first line of the file contains the column names. Each following line describes one device, with as many values as there are columns. Separate the values with a tab, a semicolon, or a comma. The platform detects the separator. Save the file in UTF-8 or ANSI encoding.

For a full registration, use the following columns:

| Column | Description |
|---|---|
| `ID` | The external ID of the device. Mandatory. |
| `CREDENTIALS` | The password of the device user. It must meet the password policy of the tenant. Mandatory, unless `AUTH_TYPE` is `CERTIFICATES`. |
| `AUTH_TYPE` | `BASIC` (default) for devices that use a password, or `CERTIFICATES` for devices that use certificates. |
| `TYPE` | The type of the device managed object. |
| `NAME` | The name of the device managed object. |
| `IDTYPE` | The type of the external ID. The default is `c8y_Serial`. |
| `PATH` | The group of the device, as group names separated by `/`, for example `Plant A/Line 1`. The platform creates missing groups. |
| `ICCID` | The number of the SIM card. The platform adds it as `c8y_Mobile.iccid`. |
| `SHELL` | `1` adds the shell feature to the `c8y_SupportedOperations` fragment of the device. |
| `ENROLLMENT_OTP` | A one-time password for certificate enrollment. Requires `AUTH_TYPE` `CERTIFICATES`. |
| `TENANT` | The tenant to register the device in. Only for the management tenant. |
| `com_cumulocity_model_Agent.active` | Set it to `true`. The platform adds the fragment `"com_cumulocity_model_Agent": {"active": "true"}` to the device. |

To use `ICCID`, `IDTYPE`, `PATH`, or `SHELL`, the file must also contain the columns `TYPE` and `NAME`. The following file registers two devices:

```text
ID;CREDENTIALS;TYPE;NAME;PATH;com_cumulocity_model_Agent.active
sensor-0001;AbcD1234!1234AbcD;c8y_Device;Sensor 1;Plant A/Line 1;true
sensor-0002;EfgH5678!5678EfgH;c8y_Device;Sensor 2;Plant A/Line 2;true
```

For a simple registration, use only the columns `ID` and `PATH`:

```text
ID;PATH
sensor-0003;Plant A
sensor-0004;Plant A/Line 1
```

For further columns, such as custom external IDs and custom properties, see [Create a bulk device credentials request](https://{{< domain-c8y >}}/api/core/#operation/postBulkNewDeviceRequestCollectionResource) in the {{< openapi >}}.

### To upload the CSV file {#to-upload-the-csv-file}

Send a [Create a bulk device credentials request](https://{{< domain-c8y >}}/api/core/#operation/postBulkNewDeviceRequestCollectionResource) request as `multipart/form-data` with the file in the part `file`:

```http
POST /devicecontrol/bulkNewDeviceRequests
Content-Type: multipart/form-data; boundary=boundary
Accept: application/json

--boundary
Content-Disposition: form-data; name="file"; filename="devices.csv"
Content-Type: text/csv

ID;CREDENTIALS;TYPE;NAME;PATH;com_cumulocity_model_Agent.active
sensor-0001;AbcD1234!1234AbcD;c8y_Device;Sensor 1;Plant A/Line 1;true
sensor-0002;EfgH5678!5678EfgH;c8y_Device;Sensor 2;Plant A/Line 2;true
--boundary--
```

The platform returns HTTP 201 and the result of the registration. If the file contains only the header line, the platform returns HTTP 422.

### To evaluate the result {#to-evaluate-the-result}

The response contains the following properties:

* `numberOfAll`: The number of rows that the platform processed, without the header line.
* `numberOfCreated`: The number of created device credentials.
* `numberOfFailed`: The number of rows that failed.
* `numberOfSuccessful`: The number of successful rows, both created and updated.
* `failedCreationList`: An entry for each failed row, with the `deviceId`, the `failureReason`, and the `line`.
* `credentialUpdatedList`: An entry for each device that already existed, with the `deviceId` and the `bulkNewDeviceStatus` CREDENTIAL_UPDATED.

A failed row does not stop the registration. The platform processes all other rows. Correct the failed rows, for example a password that does not meet the password policy, and upload them again.

If a device already exists, the platform updates its credentials. Of the other columns, it only applies `PATH`, which adds the device to the group, and new external IDs. It ignores `TYPE`, `NAME`, `ICCID`, `SHELL`, and custom properties.

After a full registration, each device connects with the username `<tenant_id>/device_<external_id>` and the password from the `CREDENTIALS` column.

### To check a registered device {#to-check-a-registered-device}

After a full registration, send a [Retrieve a specific external ID](https://{{< domain-c8y >}}/api/core/#operation/getExternalIDResource) request:

```http
GET /identity/externalIds/c8y_Serial/<external_id>
```

If the row has an `IDTYPE`, use that value instead of `c8y_Serial`. The platform returns HTTP 200, and `managedObject.id` is the ID of the device managed object.

If the platform returns HTTP 404, either the row failed, or the row has no `TYPE` and `NAME`. In the second case, the platform did not create a managed object, and the device creates it when it connects for the first time.

After a simple registration, send a [Retrieve a specific new device request](https://{{< domain-c8y >}}/api/core/#operation/getNewDeviceRequestResource) request:

```http
GET /devicecontrol/newDeviceRequests/<external_id>
```

The platform returns HTTP 200 and the request with the `status` WAITING_FOR_CONNECTION. Continue with the regular registration process, see [Register a device](/skills/device-management/register-device/) or [Single device registration](/device-management-application/registering-devices/#single-device-registration).
