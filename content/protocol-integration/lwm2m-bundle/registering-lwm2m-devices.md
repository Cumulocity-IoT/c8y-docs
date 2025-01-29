---
weight: 20
title: Registering LWM2M devices
layout: redirect
---

The data provided during registration must enable LWM2M communication and holds information for factory bootstrap and client-initiated bootstrap.
In the factory bootstrap mode, the LWM2M client has been configured with the necessary bootstrap information prior to the deployment of the device.
The client-initiated bootstrap mode requires a LWM2M bootstrap server account preloaded in the LWM2M client.
{{< product-c8y-iot >}} supports registration for **unsecured** and **secured** LWM2M devices allowing connection with NO_SEC, PSK and X.509 security modes respectively.


You can register a LWM2M device in {{< product-c8y-iot >}} in two ways:

* [Single device registration](#single-device-registration)
* [Bulk device registration](#bulk-device-registration)

### Single device registration {#single-device-registration}

To register a LWM2M device in {{< product-c8y-iot >}} navigate to **Devices** > **Registration** in the Device Management application, click **Register device** at the top right and select **Single device registration** > **LWM2M** from the dropdown.

The LWM2M device registration wizard has four steps:
* **Device** - configuration of globally unique device identifier.
Refer to [Device settings](#device-settings) section below for details about the fields.
* **Security** - configuration of LWM2M security modes, separate for bootstrap server ("Bootstrap Security Mode") and regular server ("Server Security Mode") connections.
Refer to [Security settings](#security-settings) section below for details about the fields.
* **Bootstrap** settings for enabling the device to connect to the {{< product-c8y-iot >}} LWM2M bootstrap server.
Refer to [Bootstrap settings](#bootstrap-settings) section below for details about the fields.
* **Advanced** setting for further optional configurations.
Refer to [Advanced settings](#advanced-settings) section below for details about the fields.

After filling all applicable information for the device, click **Register**.
The UI will display a confirmation message.

### Bulk device registration {#bulk-device-registration}

If there is a number of devices to be registered at the same time, it is more convenient to use bulk device registration.

To register the LWM2M devices in {{< product-c8y-iot >}}, navigate to **Devices** > **Registration** in the Device Management application, click **Register device** at the top right and select **Bulk device registration** > **LWM2M** from the dropdown.
Upload a CSV file with the registration data in the resulting bulk registration dialog.
The dialog also contains CSV template links.
Refer to [Device settings](#device-settings), [Security settings](#security-settings),
[Bootstrap settings](#bootstrap-settings) and [Advanced settings](#advanced-settings)
below for details about the fields.

{{< c8y-admon-info >}}
The maximum size allowed for the CSV file is 10 MB.
{{< /c8y-admon-info >}}


When you upload the CSV file, the dialog will display a confirmation message that tells you where to find the result. The bulk device registration operation will be displayed in the [LWM2M connector device](#connector-device) object created for the tenant.

#### Device settings {#device-settings}

The fields below must be contained to be able to establish a connection:
<table>
<col>
<col style="width:30%">
<col style="width:11%">
<col style="width:30%">
<col>
<thead>
<tr>
<th style="text-align:left">Field</th>
<th style="text-align:left">CSV field name</th>
<th style="text-align: left">Type</th>
<th style="text-align:left">Description</th>
<th style="text-align: left">Mandatory</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">Endpoint client ID</td>
<td style="text-align:left">endpoint id</td>
<td style="text-align: left">String</td>
<td style="text-align:left">Indicates the LWM2M client's endpoint ID in order to allow the LWM2M bootstrap to provision the bootstrap information for the LWM2M client. The endpoint ID has be to be <b>unique</b> across all tenants and must have the same value as the ID. Registering a device using an endpoint ID already used will result in an error.</td>
<td style="text-align: left">Mandatory</td>
</tr>
</tbody>
</table>

#### Security settings {#security-settings}

We can distinguish 2 types of connectivity:
* **bootstrap** - connection established to bootstrap server in order to provision device with server configuration.
* **server** - connection established to regular server to exchange data.

{{< product-c8y-iot >}} supports different security modes for both connections so device can connect to boostrap server and regular server using different security modes.

Currently {{< product-c8y-iot >}} supports 3 security modes:
* **NO_SEC** - Device connects to the platform without any security. It is highly recommended to always protect the LWM2M protocol. However, there are scenarios in which the LWM2M protocol is deployed in environments where the lower layer security mechanisms are provided.
* **PSK** - Device connects to the platform using DTLS with the given pre-shared ID and KEY (PSK).
  * **bootstrap connectivity** - PSK ID and KEY must be preconfigured on the device by manufacturer and the same credentials must be provided during device registration.
  * **server connectivity** - PSK ID and KEY must be provided during device registration. The device is expected to use these credentials during regular server connection. Bootstrap server will write these credentials to the device during a LWM2M bootstrap session. There are 2 ways to provide PSK ID and KEY:
    * **manual (PSK)** - Manually enter both ID and KEY values (useful when device is preconfigured, and it won't use bootstrap server).
    * **generated (PSK_GENERATED)** - Server will assume PSK ID is equal to the endpoint ID of the device, and it will generate random secure PSK KEY. This scenario is useful when you want to secure server connectivity without preconfiguring PSK keys on the device. Device can bootstrap with NO_SEC/X509, and it will be provisioned with auto-generated PSK credentials for server connectivity.
* **X509** - Device connects to the platform using X.509 certificate.
  * **bootstrap connectivity** - device must be preconfigured by manufacturer with X.509 certificate, private key and trust store/server certificate. There are no additional settings to provide during device registration.
  * **server connectivity** - here we can distinguish 2 scenarios:
    * **device has all X.509 credentials pre-configured by manufacturer** - no additional data is required during device registration.
    * **device expects bootstrap server to provision certificates** - in this case it's possible (but not mandatory, when empty it won't be written to device by bootstrap server) to provide:
      * X.509 Certificate and Private Key in PEM format. Private key will be stored as encrypted data on the platform.
      * Server certificate to use (more on this below).
      * Certificate usage (as defined in LWM2M specification)

##### More details on X.509 security {#more-details-on-x509-security}

Client X.509 certificate must meet the requirements specified in [LWM2M specification](https://www.openmobilealliance.org/release/LightweightM2M/V1_1-20180612-C/OMA-TS-LightweightM2M_Transport-V1_1-20180612-C.html#5-2-8-3-0-5283-X509-Certificates).
For testing purposes, certificate can be generated by a self-signed CA in the following way:
* Creation of self-signed CA:
```shell
openssl ecparam -name prime256v1 -genkey -noout -out myCA.key
openssl req -x509 -new -nodes -key myCA.key -days 36500 -out myCA.pem
```
* Creation of device certificate signed by our CA:
```shell
# create and sign certificate
openssl ecparam -name prime256v1 -genkey -noout -out myDevice.key
openssl req -new -key myDevice.key -out myDevice.csr
openssl x509 -req -in myDevice.csr -CA path/to/myCa.pem -CAkey path/to/myCa.key -CAcreateserial -out myDevice.crt -days 36500
# export to PKCS8 PEM format
openssl pkcs8 -topk8 -inform PEM -outform PEM -in myDevice.key -out myDevice.key.pem -nocrypt
# optionally export to DER format if your device needs it
openssl pkcs8 -topk8 -inform PEM -outform DER -in myDevice.key -out myDevice.der -nocrypt
```

##### Trusting CA in {{< product-c8y-iot >}} {#trusting-ca-in-the-platform}

Before devices are able to connect to the platform, CA that issued device certificates must be added to trusted certificates. See [Managing trusted certificates](/device-management-application/managing-device-data/#managing-trusted-certificates) on how to add and trust CA certificate.

##### All security field details {#all-security-field-details}

The fields below must be contained to configure security modes for bootstrap and regular server connection:
<table>
<col>
<col style="width:30%">
<col style="width:11%">
<col style="width:30%">
<col>
<thead>
<tr>
<th style="text-align:left">Field</th>
<th style="text-align:left">CSV field name</th>
<th style="text-align: left">Type</th>
<th style="text-align:left">Description</th>
<th style="text-align: left">Mandatory</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">Server security mode</td>
<td style="text-align:left">securityMode</td>
<td style="text-align: left">String</td>
<td style="text-align:left">Determines the type of connection used by the LWM2M device when it connects to the {{< product-c8y-iot >}} LWM2M server. Possible values are: "NO_SEC", "PSK" and "X509".</td>
<td style="text-align: left">Mandatory</td>
</tr>
<tr>
<td style="text-align:left">Bootstrap security mode</td>
<td style="text-align:left">bootstrapSecurityMode</td>
<td style="text-align: left">String</td>
<td style="text-align:left">Determines the type of connection used by the LWM2M device when it connects to the {{< product-c8y-iot >}} LWM2M bootstrap server. Possible values are: "NO_SEC", "PSK", "PSK_GENERATED" and "X509".</td>
<td style="text-align: left">Mandatory</td>
</tr>
<tr>
<td style="text-align: left">LWM2M PSK ID</td>
<td style="text-align: left">lwm2m psk_id</td>
<td style="text-align: left">String</td>
<td style="text-align: left">The ID used by the device for server connections in PSK mode. The LWM2M PSK ID has be to be <b>unique</b> across all tenants. Registering a device using an LWM2M PSK ID already used will result in an error.</td>
<td style="text-align: left">Mandatory for PSK security mode.</td>
</tr>
<tr>
<td style="text-align: left">LWM2M PSK key</td>
<td style="text-align: left">lwm2m psk_key</td>
<td style="text-align: left">String</td>
<td style="text-align: left">The hex-encoded pre-shared key used by the device for server connections in PSK mode.</td>
<td style="text-align: left; height: 26px;">Mandatory for PSK security mode.</td>
</tr>
<tr>
<td style="text-align: left">Bootstrap PSK ID</td>
<td style="text-align: left">bootstrap psk_id</td>
<td style="text-align: left">String</td>
<td style="text-align: left">The ID used by the device for bootstrap connections in PSK mode. The bootstrap PSK ID has be to be <b>unique</b> across all tenants. Registering a device using an bootstrap PSK ID already used will result in an error.</td>
<td style="text-align: left">Mandatory for PSK security mode.</td>
</tr>
<tr>
<td style="text-align: left">Bootstrap PSK key</td>
<td style="text-align: left">bootstrap psk_key</td>
<td style="text-align: left">String</td>
<td style="text-align: left">The hex-encoded key used by the device for bootstrap connections in PSK mode.</td>
<td style="text-align: left">Mandatory for PSK security mode.</td>
</tr>
<tr>
<td style="text-align: left">X.509 certificate</td>
<td style="text-align: left">x509ClientCertificate</td>
<td style="text-align: left">String</td>
<td style="text-align: left">X.509 device certificate (in PEM format) written to the device during bootstrap phase. An empty value means that it isn't written at all.</td>
<td style="text-align: left">Optional</td>
</tr>
<tr>
<td style="text-align: left">X.509 private key</td>
<td style="text-align: left">x509ClientPrivateKey</td>
<td style="text-align: left">String</td>
<td style="text-align: left">X.509 device private key (in PEM format) written to the device during bootstrap phase. An empty value means that it isn't written at all.</td>
<td style="text-align: left">Optional</td>
</tr>
<tr>
<td style="text-align: left">X.509 certificate usage</td>
<td style="text-align: left">x509CertificateUsage</td>
<td style="text-align: left">String</td>
<td style="text-align: left">LWM2M Certificate usage written to the device during bootstrap phase. An empty value means that it isn't written at all. One of: <ul><li>CA_CONSTRAINT</li> <li>SERVICE_CERTIFICATE_CONSTRAINT</li> <li>TRUST_ANCHOR_ASSERTION</li> <li>DOMAIN_ISSUER_CERTIFICATE</li></ul></td>
<td style="text-align: left">Optional</td>
</tr>
<tr>
<td style="text-align: left">Server certificate</td>
<td style="text-align: left">serverPublicKey</td>
<td style="text-align: left">String</td>
<td style="text-align: left">Name of the server certificate written to the device during bootstrap phase. Server certificates are preconfigured in the {{< management-tenant >}}. An empty value means that it isn't written at all.</td>
<td style="text-align: left">Optional</td>
</tr>
</tbody>
</table>

#### Bootstrap settings {#bootstrap-settings}

##### Registration of NO_SEC devices {#registration-of-nosec-devices}

Unsecured devices connect during bootstrap connection and server connection through unsecured ports:

* **5683**: unsecure bootstrap connection
* **5783**: unsecure direct server connection

##### Registration of secured devices {#registration-of-secured-devices}

Secured devices connect during a bootstrap connection and a server connection through secured ports:

* **5684**: secured bootstrap connection
* **5784**: secured direct server connection

See the table below for the full set of bootstrap fields you can add:

<table>
<col>
<col style="width:30%">
<col style="width:11%">
<col style="width:30%">
<col>
<thead>
<tr>
<th style="text-align: left">Field</th>
<th style="text-align: left">CSV field name</th>
<th style="text-align: left">Type</th>
<th style="text-align: left">Description</th>
<th style="text-align: left">Mandatory</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align: left">LWM2M server URI</td>
<td style="text-align: left">lwm2m server uri</td>
<td style="text-align: left">String</td>
<td style="text-align: left">The URI the server uses for bootstrap. The LWM2M bootstrap server is used to provision the LWM2M client with the information required to contact the LWM2M servers. If you use the {{< product-c8y-iot >}} service, the hostname of the LWM2M server is "lwm2m.{{< domain-c8y >}}". The bootstrap ports are "5683" for unsecure bootstrap connections and "5684" for secure bootstrap connections. The LWM2M server ports are "5783" for unsecure server connections and "5784" for secure server connections. Note that these values can be different for other services.</td>
<td style="text-align: left">Mandatory for LWM2M bootstrap</td>
</tr>
<tr>
<td style="text-align: left">LWM2M bootstrap short server ID</td>
<td style="text-align: left">bootstrapShortServerId</td>
<td style="text-align: left">Integer</td>
<td style="text-align: left">The short server ID to be used for the bootstrap server. Default is "0".</td>
<td style="text-align: left">Optional</td>
</tr>
<tr>
<td style="text-align: left">LWM2M short server ID</td>
<td style="text-align: left">lwm2mShortServerId</td>
<td style="text-align: left">Integer</td>
<td style="text-align: left">The short server ID to be used for LWM2M server. Default is "1".</td>
<td style="text-align: left">Optional</td>
</tr>
<tr>
<td style="text-align: left">Security instance offset</td>
<td style="text-align: left">securityInstanceOffset</td>
<td style="text-align: left">Integer</td>
<td style="text-align: left">The first instance to be used during bootstrap to which entries are written. Default is "0". If set, for example, to "3", the first instance will be three.</td>
<td style="text-align: left">Optional</td>
</tr>
<tr>
<td style="text-align: left; height: 13px;">Registration lifetime</td>
<td style="text-align: left; height: 13px;">registrationLifetime</td>
<td style="text-align: left">Integer</td>
<td style="text-align: left">The registration lifetime that is sent to the device during bootstrap. Overrides global agent configuration. The value must be specified in seconds.</td>
<td style="text-align: left">Optional</td>
</tr>
<tr>
<td style="text-align: left">Default minimum period</td>
<td style="text-align: left">defaultMinimumPeriod</td>
<td style="text-align: left">Integer</td>
<td style="text-align: left">The default minimum period to configure during bootstrap. See the <a href="http://www.openmobilealliance.org/release/lightweightm2m/V1_0-20170208-A/OMA-TS-LightweightM2M-V1_0-20170208-A.pdf">LWM2M specification</a> for explanation.</td>
<td style="text-align: left">Optional</td>
</tr>
<tr>
<td style="text-align: left; height: 13px;">Default maximum period</td>
<td style="text-align: left; height: 13px;">defaultMaximumPeriod</td>
<td style="text-align: left">Integer</td>
<td style="text-align: left">The default max period to configure during bootstrap. See <a href="http://www.openmobilealliance.org/release/lightweightm2m/V1_0-20170208-A/OMA-TS-LightweightM2M-V1_0-20170208-A.pdf">LWM2M specification</a> for explanation.</td>
<td style="text-align: left">Optional</td>
</tr>
</tbody>
</table>

{{< c8y-admon-info >}}
After creation, you can view and change device parameters in the **LWM2M configuration** tab in the **Device details** page, see [LWM2M configuration](#lwm2m-configuration).
{{< /c8y-admon-info >}}

#### Advanced settings {#advanced-settings}

See the table below for information on additional fields:

<table>
<col>
<col style="width:30%">
<col style="width:11%">
<col style="width:30%">
<col>
<thead>
<tr>
<th style="text-align: left">Field</th>
<th style="text-align: left">CSV field name</th>
<th style="text-align: left">Type</th>
<th style="text-align: left">Description</th>
<th style="text-align: left">Mandatory</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align: left">LWM2M device type</td>
<td style="text-align: left">type</td>
<td style="text-align: left">String</td>
<td style="text-align: left">Type to set for the device managed object on creation. Default is "c8y_lwm2m".
</td>
<td style="text-align: left">Optional</td>
</tr>
<tr style="height: 26px;">
<td style="text-align: left">Binding mode</td>
<td style="text-align: left">bindingMode</td>
<td style="text-align: left">String</td>
<td style="text-align: left">The LWM2M binding mode to be reported to the device. For LWM2M 1.0 devices the supported modes are "UQ" (default, queuing) and "U" (unqueued).
Note that since {{< product-c8y-iot >}} LWM2M 1.1, the "Q" (queue) mode is not supported, and the default mode will be "U" (unqueued). {{< product-c8y-iot >}} will always queue operations, regardless of whether the device is connected or not. This means that the setting has no effect on the behavior of {{< product-c8y-iot >}}.</td>
<td style="text-align: left">Optional</td>
</tr>
<tr>
<td style="text-align: left">Awake time registration parameter</td>
<td style="text-align: left">awakeTimeRegistrationParameter</td>
<td style="text-align: left">Integer</td>
<td style="text-align: left">Specifies a time interval in milliseconds for which a device is awake and accepting network traffic after sending a LWM2M registration or a registration update to {{< product-c8y-iot >}}.
If set to 0, the device will be considered as always online.
If the value is not set, the awake time is determined by the LWM2M client's registration awake time attribute "at" or, if this attribute is also not found, then by the global setting that is defined in the LWM2M microservice.
</td>
<td style="text-align: left">Optional</td>
</tr>
<tr>
<td style="text-align: left; height: 40px;">Notification storing when disabled or offline / notificationIfDisabled</td>
<td style="text-align: left; height: 40px;">notificationIfDisabled</td>
<td style="text-align: left">Boolean</td>
<td style="text-align: left">See the <a href="http://www.openmobilealliance.org/release/lightweightm2m/V1_0-20170208-A/OMA-TS-LightweightM2M-V1_0-20170208-A.pdf">LWM2M specification</a>. Allowed values are true or false. Default: Not configured.</td>
<td style="text-align: left">Optional, defaults to Leshan default behavior</td>
</tr>
<tr style="height: 40px;">
<td style="text-align: left">Disable timeout</td>
<td style="text-align: left">disableTimeout</td>
<td style="text-align: left">Integer</td>
<td style="text-align: left">See the <a href="http://www.openmobilealliance.org/release/lightweightm2m/V1_0-20170208-A/OMA-TS-LightweightM2M-V1_0-20170208-A.pdf">LWM2M specification</a>. Allowed values are integer numbers. Default: Not configured.</td>
<td style="text-align: left">Optional, defaults to Leshan default behavior</td>
</tr>
<tr>
<td style="text-align: left">LWM2M request timeout</td>
<td style="text-align: left">lwm2mRequestTimeout</td>
<td style="text-align: left">Integer</td>
<td style="text-align: left">The timeout used for shell operation requests such as read, write, execute done by the LWM2M microservice to the LWM2M device.
The value is in milliseconds and can be given to override the default value that is provided in the LWM2M microservice property file with the "C8Y.lwm2mRequestTimeout" property.
The value must not exceed the maximum request timeout limit given in the LWM2M microservice property file with the "C8Y.lwm2mMaxRequestTimeout" property.
<td style="text-align: left">Optional</td>
</tr>
<tr>
<td style="text-align: left">Automatic setting of required interval</td>
<td style="text-align: left">autoManageAvailabilityRequiredInterval</td>
<td style="text-align: left">Boolean</td>
<td style="text-align: left">This setting is configurable so that unavailability alarms will only be triggered when an LWM2M device is truly unavailable, reducing the number of false alarms. When true (default), the LWM2M service automatically sets the interval to registration lifetime plus 2 minutes. When false, the user can define a required interval using Availability required interval value "availabilityRequiredInterval" property during device registration or on the "Info" tab in the device details after device creation. If value is not provided ("null"), the default behavior of the LWM2M service will be used.</td>
<td style="text-align: left">Optional, default = true</td>
</tr>
<tr>
<td style="text-align: left">Availability required interval value</td>
<td style="text-align: left">availabilityRequiredInterval</td>
<td style="text-align: left">Integer</td>
<td style="text-align: left">If not empty, this value will be used as the initial required interval in the created device.</td>
<td style="text-align: left">Optional, default = empty</td>
</tr>
<tr>
<td style="text-align: left">Binary delivery encoding</td>
<td style="text-align: left">binaryDeliveryEncoding</td>
<td style="text-align: left">String</td>
<td style="text-align: left">Indicates the encoding format for writing binaries to a LWM2M device. The encoding format can be OPAQUE, TLV, JSON or TEXT. In case of empty or invalid entries, the default format is OPAQUE.
<td style="text-align: left">Optional</td>
</tr>
<tr>
<td style="text-align: left">Use source timestamp</td>
<td style="text-align: left">enableResourceLevelTimestamp</td>
<td style="text-align: left">Boolean</td>
<td style="text-align: left">If this device property is enabled {{< product-c8y-iot >}} uses time stamps reported by the device for constructing measurements, events and alarms. LWM2M offers various methods for associating timestamp information with data points, including resources 5518 and 6050, SenML, or resource 5 for the location object (6). When activated, the LWM2M agent utilizes this timestamp data source to generate measurements, events, or alarms. If deactivated, the LWM2M agent resorts to using its local time. Default: false</td>
<td style="text-align: left">Optional, defaults to false</td>
</tr>
<tr>
<td style="text-align: left">Keep old values in the objects tab if an operation fails </td>
<td style="text-align: left">c8y_GenericUI_retainOldValuesIfError</td>
<td style="text-align: left">Boolean</td>
<td style="text-align: left">Controls if stale values are kept in the Objects tab. If this flag is set to <code>true</code> (default) the agent never removes a value. If set to <code>false</code> the agent will remove values in two cases:
<ol>
<li>A failed read or write operation will lead to removal if the device answers with one of the following CoAP response codes: <code>4.01 (Unauthorized)</code>, <code>4.03 (Forbidden)</code>, <code>4.04 (Not found)</code>, <code>5.00 (Internal Server Error)</code> and <code>5.01 (not implemented)</code>. </li>
<li>Resources not contained in a discover response will be removed. This allows a discover operation to be used for purging resources that do not exist on the device any longer.</li>
</ol>
<td style="text-align: left">Optional</td>
</tr>
<tr>
<tr>
<td style="text-align: left">Serialization format</td>
<td style="text-align: left">serializationFormat</td>
<td style="text-align: left">String</td>
<td style="text-align: left">Indicates the preferred content format for {{< product-c8y-iot >}} to communicate with the device. The allowed content formats are: TLV, JSON, CBOR, TEXT, OPAQUE or SENML_JSON and SENML_CBOR. In case of an empty or invalid entry, {{< product-c8y-iot >}} automatically selects the serialization format which the device sends during device registration.</td>
<td style="text-align: left">Optional</td>
</tr>
<tr>
<td style="text-align: left">Disable the default behavior for object instances</td>
<td style="text-align: left">disableInternalObjectInstanceActions</td>
<td style="text-align: left">Boolean</td>
<td style="text-align: left">{{< product-c8y-iot >}} implements default handlers for objects 3,4 and 6. For example, they update the device name upon the reception of the corresponding resource in object 3 or update the device location. This flag allows those behaviors to be turned off.</td>
<td style="text-align: left">Optional</td>
</tr>
<tr>
<td style="text-align: left">Event log level</td>
<td style="text-align: left">logLevel</td>
<td style="text-align: left">String</td>
<td style="text-align: left">{{< product-c8y-iot >}} can output detailed logs to the event stream. This field configures a log level. Allowed values are: 
<b>NONE</b> (nothing will be logged as events), <b>LIFECYCLE</b> (only registration, de-registration and registration update events),
<b>TRAFFIC</b> (LIFECYCLE + sent/received data), <b>FIRMWARE</b> (LIFECYCLE + detailed firmware update information),
<b>VERBOSE</b> (all of the above will be logged).
Default is LIFECYCLE.</td>
<td style="text-align: left">Optional</td>
</tr>
</tbody>
</table>

The following table explains several optional parameters related to firmware updates which help in tuning the Firmware Over The Air (FOTA) parameters on a device level.

<table>
<col>
<col style="width:30%">
<col style="width:11%">
<col style="width:30%">
<col>
<thead>
<tr>
<th style="text-align: left">Field</th>
<th style="text-align: left">CSV field name</th>
<th style="text-align: left">Type</th>
<th style="text-align: left">Description</th>
<th style="text-align: left">Mandatory</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align: left">Firmware update delivery method</td>
<td style="text-align: left">fwUpdateDeliveryMethod</td>
<td style="text-align: left">String</td>
<td style="text-align: left">Explains the firmware update delivery method.
Allowed values are PUSH, PULL or BOTH.</td>
<td style="text-align: left">Optional</td>
</tr>
<tr>
<td style="text-align: left">Firmware update supported device protocol</td>
<td style="text-align: left">fwUpdateSupportedDeviceProtocol</td>
<td style="text-align: left">String</td>
<td style="text-align: left">Indicates the device protocol to be used for the firmware update. Allowed values are COAP, COAPS, HTTP or HTTPS.</td>
<td style="text-align: left">Optional</td>
</tr>
<tr>
<td style="text-align: left">Firmware update reset mechanism</td>
<td style="text-align: left">fwUpdateResetMechanism</td>
<td style="text-align: left">String</td>
<td style="text-align: left">Indicates the mechanism used to reset the firmware update state machine.
Allowed values are PACKAGE or PACKAGE_URI. Depending on the value, the LWM2M agent either writes an empty string to package URI resource or sets the package resource to NULL ('\0'). If this field is not used, the default reset state machine mechanism is used where a reset is done via package resource for PUSH and via package URI for PULL.</td>
<td style="text-align: left">Optional</td>
</tr>
<tr>
<td style="text-align: left">Initial State Machine Reset</td>
<td style="text-align: left">fwResetStateMachineOnStart</td>
<td style="text-align: left">Boolean</td>
<td style="text-align: left">Controls if the LWM2M agent performs an initial state machine reset before it starts a firmware update. Default is TRUE.</td>
<td style="text-align: left">Optional</td>
</tr>
<tr>
<td style="text-align: left">Firmware update URL (DEPRECATED)</td>
<td style="text-align: left">fwUpdateURL</td>
<td style="text-align: left">String</td>
<td style="text-align: left"><b>DEPRECATED</b>: Use the regular firmware repository to specify the firmware version that links to an external URL. This field will be removed in a future update. 

Indicates the firmware update URL from where the LWM2M device can download the firmware package.</td>
<td style="text-align: left">Optional</td>
</tr>
<tr>
<td style="text-align: left">Disable automated firmware update support</td>
<td style="text-align: left">disableFirmwareStateMachine</td>
<td style="text-align: left">Boolean</td>
<td style="text-align: left">Indicates if the default firmware update state machine should be disabled. Default is false.</td>
<td style="text-align: left">Optional</td>
</tr>
</tbody>
</table>



{{< c8y-admon-info >}}
Firmware updates are also supported for the registration of unsecured devices as well as secured devices. For more information, see [Managing firmware](/device-management-application/managing-device-data/#managing-firmware).
{{< /c8y-admon-info >}}

#### Registering LWM2M devices using the REST API {#registering-lwm2m-devices-using-restapi}

LWM2M internally uses our [Extensible Device Registration](/concepts/applications/#extensible-device-registration) feature. It provides an API based on JSON Schema and REST to extend {{< company-c8y >}} with arbitrary wizards for device registration.

#### REST-based single LWM2M device registration {#rest-lwm2m-single-registration}

Before the actual registration of a LWM2M device, it first is important to understand the set of available device properties. This set can be obtained using the `metadata` endpoint of LWM2M:

`
GET /service/lwm2m-agent/deviceRegistration/metadata
`

The registration of a new device then can be accomplished by posting a set of these values to the corresponding registration endpoint:

`
POST  /service/lwm2m-agent/deviceRegistration/
`

Example request payload:

```
{
  "bootstrapSecurity": {
    "bootstrapSecurityMode": "PSK",
    "bootstrapId": "98ABCD32",
    "bootstrapKey": "AABB3104D212"
  },
  "serverSecurity": {
    "securityMode": "X.509"
  },
  "bootstrapShortServerId": 0,
  "lwm2mShortServerId": 1,
  "securityInstanceOffset": 0,
  "bindingMode": "UQ",
  "enableResourceLevelTimestamp": false,
  "genericUIRetainOldValuesIfError": true,
  "binaryDeliveryEncoding": "OPAQUE",
  "disableObjectInstanceActions": false,
  "disableFirmwareStateMachine": false,
  "stateMachineResetBeforeFirmwareUpdate": true,
  "endpointId": "urn:my:example:device",
  "lwm2mServerUri": "coaps://lwm2m.cumulocity.com:5784",
  "registrationLifetime": 12000
}
```

#### REST-based bulk Registration for LWM2M Devices {#rest-lwm2m-bulk-registration}

Alternatively, LWM2M devices can be registered in bulk using the API by posting a CSV file to the LWM2M service. The API endpoint and request format are as follows:


```
POST /service/lwm2m-agent/deviceRegistration/bulk`
Content-Type: multipart/form-data; boundary=boundary

--boundary
Content-Disposition: form-data; name="file"; filename="<input csv file>"
Content-Type: text/csv

--boundary--
```

For more details on the CSV format being used, please refer to the section on [bulk device registration](#bulk-device-registration).

### Duplicate LWM2M devices {#duplicate-lwm2m-devices}

If a LWM2M device has been registered with the same endpoint ID before, the device registration will not register the device, neither for single nor for bulk device registrations.
For single device registrations, the duplication error message will be displayed after clicking register.
For bulk device registrations, the information about duplicate LWM2M devices will be displayed under the [LWM2M connector device](#connector-device)'s bulk upload operation result.


### Device deletion {#device-deletion}

To remove a LWM2M device, delete it through the [All devices](/device-management-application/viewing-all-devices/#to-delete-devices) list in the Device Management application or the [Devices Status](/device-management-application/viewing-device-details/#info) card of the device info page.

Alternatively, you can delete a LWM2M device using a REST call. With the managed object ID (device ID) of the device to be deleted, this can be accomplished using the following DELETE request.


#### Rest-based single LWM2M device deletion  {#lwm2m-single-device-deletion-using-restapi}

`
DELETE /service/lwm2m-agent/deviceRegistration/{device ID}
`

{{< c8y-admon-important >}}
It is not recommended to use the inventory API for directly deleting LWM2M devices. This action may result in issues when attempting to register a device with the same endpoint name at a later time.
{{< /c8y-admon-info >}}

#### Rest-based bulk LWM2M device deletion  {#lwm2m-bulk-device-deletion-using-restapi}

Multiple LWM2M devices can be deleted in bulk by posting a CSV file to the LWM2M REST API.

```
DELETE /service/lwm2m-agent/deviceRegistration/bulk`
Content-Type: multipart/form-data; boundary=boundary

--boundary
Content-Disposition: form-data; name="file"; filename="<input csv file>"
Content-Type: text/csv

--boundary--
```

This endpoint uses the same CSV format which is also used to [register](#rest-lwm2m-bulk-registration) LWM2M devices in bulk.
