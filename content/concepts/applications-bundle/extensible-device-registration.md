---
weight: 50
title: Extensible device registration
layout: bundle
---

To address the growing number of IoT protocols and certain restrictions in the general single or bulk device registration, an extensible device registration is available with release 10.15.

The general concept is based on extending the device registration using a metadata-based approach. Microservices and agents that implement current device registrations can add custom forms to the device registration wizard by providing simple descriptions of the required registration attributes. The metadata is then used by the UI to render a corresponding device registration wizard.

There are two possible ways to extend the UI:
- with a [single device registration](/concepts/applications/#single-device-registration) form
- with a [bulk device registration](/concepts/applications/#bulk-device-registration) form

{{< c8y-admon-req >}}
Extensible device registration requires [application extensions](/concepts/applications/#extension-enabling) to be defined, and the microservice to implement the predefined endpoints used for getting device registration metadata and creating the device.
{{< /c8y-admon-req >}}

### Advantages of extended device registration {#advantages-of-extended-device-registration}

The extended device registration provides the following advantages:

- **Extensibility of the device registration wizard**: You can easily add own forms to the device registration wizard in the Device Management application UI. The values to be entered in the user-specified forms can be freely customized by the device integration developers.

- **Support for bulk registration using custom CSV**: You can customize the bulk registration and hence implement support for CSV files of a different format.

- **No UI code changes required**: You do not need to write UI Angular code. This keeps the amount of integration work as little as possible. The device integration developer must only subscribe a microservice that provides an own wizard, and the wizard shows up automatically.


### Extension enabling {#extension-enabling}

As a first step to extend the device registration flow you must define extensions in the application representation.

{{< c8y-admon-info >}}
The `extensions` fragment can be placed either as root level or inside the `manifest` fragment of the application representation.
{{< /c8y-admon-info >}}

There are two types of extensions:
 - Single device registrations type: `extensibleDeviceRegistration`, for example:

```json
"extensions": [
  {
    "name": "<extension name>",
    "description": "<description>",
    "type": "extensibleDeviceRegistration"
  },
  ...
]
```
- Bulk device registration type: `extensibleBulkDeviceRegistration`, for example:
```json
"extensions": [
  {
    "name": "<extension name>",
    "description": "<description>",
    "type": "extensibleBulkDeviceRegistration"
  },
  ...
]
```

### Single device registration {#single-device-registration}

After enabling the `extensibleDeviceRegistration` extension type, the **Devices** > **Register device** menu in the Device Management application is extended with an entry corresponding to the extension `name` property.

From now on, everything will be rendered based on data provided via the custom microservice. The added menu entry opens a window which fetches the form definition using the following endpoint:

`GET /service/<contextPath>/deviceRegistration/metadata&lang=<user-language>`

Make use of the `lang` query parameter in your microservice to respond with the already translated JSON Schema metadata. See also [Limitations](/concepts/applications/#limitations).


The UI automatically takes the contextPath for the GET request from the application definition of the microservice:

```
{
  "contextPath": "<relative path>",
  "availability": "MARKET",
  "type": "MICROSERVICE",
  "name": "<agent name>",
  ...
}
```

Example metadata definition:
```json
{
    "c8y_DeviceRegistration": {
      "title": "Example extensible registration",
      "description": "The required and optional properties to register and setup devices",
        "pages": [
            {
                "$schema": "https://json-schema.org/draft/2020-12/schema",
                "type": "object",
                "title": "Mandatory settings",
                "properties": {
                    "security": {
                      "default": "NO_SEC",
                      "type": "string",
                      "title": "Security mode",
                      "enum": [
                        "NO_SEC",
                        "SEC"
                      ]
                    },
                    "imei": {
                        "examples": [
                            "012345678901234"
                        ],
                        "type": "string",
                        "title": "Imei number"
                    }
                },
                "required": [
                    "imei",
                    "security"
                ]
            },
            {...}
        ]
    }
}
```
The important part is the `pages` array which contains steps of the wizard that the modal is going to render accordingly to the JSON Schema definition: [https://json-schema.org/](https://json-schema.org/).

As a result the following wizard will be displayed:

![Select guide](/images/concepts-guide/extensible-device-registration/extensible-single-device-reg.png)

In the final step all data collected via the wizard will be sent back to the microservice using the following REST endpoint:

`POST /service/<contextPath>/deviceRegistration`

```json
{
  "imei": "012345678901234",
  "security": "NO_SEC",
  ...
}
```

The form is able to send anything defined via JSON Schema to the microservice. The Microservice provides the form definition and is responsible for the proper handling of the submitted data.

#### API specification {#api-specification}

The device integration microservices must implement the following REST endpoints:

```
GET /service/<contextPath>/deviceRegistration/metadata?lang=<user-language>
Accept: application/json
```
Returns the metadata in the vocabulary of the JSON Schema.


```
POST /service/<contextPath>/deviceRegistration
Content-type: application/json
```
Creates a single device based on the collected data. Sends application/json with key-value pairs.

#### Single device registration flow diagram {#single-device-registration-flow-diagram}

The following diagram visualizes the single device registration flow:

![Single diagram](/images/concepts-guide/extensible-device-registration/single-diagram.png)


### Bulk device registration {#bulk-device-registration}

Many device integrations require the registration of many devices at the same time. Currently, all protocols must rely on the bulk registration mechanism of the platform, which often either requires too many fields or requires custom fields to be added. The latter ones can however so far not be validated, as the core directly creates devices -- and microservices and agents have no control over the properties being written to the managed objects.

After enabling the `extensibleBulkDeviceRegistration` extension type, the Device management & connectivity > Devices > Register device  `Bulk device registration` modal is displayed with an extended wizard entry corresponding to the extension `name` property.

Additionally, the microservice provides the title of the wizard step and example bulk file(s):
```json
{
  "c8y_DeviceRegistration": {
    "title": "<title>",
    "description": "<description>",
    "bulk": {
      "title": "<bulk form title>",
      "exampleFileUrls": [{
        "title": "<example title>",
        "description": "<example description>",
        "url": "<publicly-reachable-URL>"
      }]
    }
  }
}
```

As a result the following wizard will be displayed:

![Select guide](/images/concepts-guide/extensible-device-registration/extensible-bulk-device-reg.png)

#### API specification {#api-specification}

The device integration microservices must implement the following REST endpoints:

```
GET /service/<contextPath>/deviceRegistration/metadata?lang=<user-language>
Accept: application/json
```

Returns the metadata in the vocabulary of the JSON Schema.

```
POST /service/<contextPath>/deviceRegistration/bulk`
Content-Type: multipart/form-data; boundary=boundary

--boundary
Content-Disposition: form-data; name="file"; filename="<input csv file>"
Content-Type: text/csv

--boundary--
```

Sends multipart form-data of the csv file type.


#### Bulk flow diagram {#bulk-flow-diagram}

The following diagram visualizes the bulk device registration flow:

![Bulk diagram](/images/concepts-guide/extensible-device-registration/bulk-diagram-sync.png)


### Limitations {#limitations}

-   The concept does not allow the microservice to hook into deregistrations/decommissioning of a device:
    - Any device integration microservice must check if a device was deleted, for example to perform garbage collection.
- Interactive steps (like “Bluetooth Coupling”) can not be implemented as of now. The reason here is that the concept assumes that only static properties are required for a device registration, not some process that requires user interactions.
    - In theory, the meta-data based approach can easily be extended in a way that the JSON used to render the form is not static, but dynamically generated by the microservice. For example, you could specify a “page” that draws the next specification dynamically from an endpoint after posting all given user inputs there.
    - We step back from such a solution for now, because it complicates the data model and the requirements to be fulfilled by the microservice.
- No custom validations in the UI besides input validations by the JSON Schema vocabulary
- No custom styling possible
- Internationalization is not handled by the UI. As microservice developer it is your responsibility to provide already translated JSON Schema metadata
