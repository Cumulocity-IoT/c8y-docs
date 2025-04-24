---
weight: 20
title: Microservice development
layout: redirect
---

This section will introduce you to the basic REST endpoints required for developing microservices. You will also learn the basic use cases in which the {{< product-c8y-iot >}} REST APIs can be employed to develop microservice applications.


### Creating applications {#creating-applications}

In order to start working with microservices, an instance of an application must be created on the platform beforehand. It can be done using the following endpoint:

```http
POST /application/applications
Host: ...
Authorization: Basic ...
Content-Length: ...
Content-Type: application/vnd.com.nsn.cumulocity.application+json
{
  "key": "<APPLICATION_NAME>-key",
  "name": "<APPLICATION_NAME>",
  "type": "MICROSERVICE",
  "requiredRoles": [ "ROLE_INVENTORY_READ" ],
  "roles": [ "ROLE_CUSTOM_MICROSERVICE" ]
}
```

A success response consists of a 201 status and a location header similar to `<HOST>/application/applications/<APPLICATION_ID>`.

The properties `key`, `name` and `type` from the above request body are self explanatory, and about the roles:

* `requiredRoles` - A list of {{< product-c8y-iot >}} permissions the microservice user needs in order to get data from {{< product-c8y-iot >}}, for example, if the microservice creates a managed object, one of the required roles shall be `ROLE_INVENTORY_ADMIN`.
* `roles` - A list of microservice permissions. If the microservice exposes an own REST API, it can be secured with an own set of permissions, for example, a SMS microservice would require `SMS_ADMIN` permission to send SMS messages. These permissions become available in the tenant after microservice subscription. Afterwards, an admin user can grant such permission to  another user that wants to send SMS messages via the {{< product-c8y-iot >}} platform.

The application ID for existing applications can be obtained employing a GET request with the name of the application:

```http
GET /application/applicationsByName/<APPLICATION_NAME>
Host: ...
Authorization: Basic ...
Accept: application/vnd.com.nsn.cumulocity.application+json
```

The success response will look similar to:

```json
{
    "applications": [
        {
            "activeVersionId": "329",
            "availability": "MARKET",
            "id": "174",
            "key": "<APPLICATION_NAME>-microservice-key",
            "manifest": {
                "imports": [],
                "noAppSwitcher": true
            },
            "name": "<APPLICATION_NAME>",
            "owner": {
                "self": "<HOST>/tenant/tenants/<TENANT>",
                "tenant": {
                    "id": "<TENANT>"
                }
            },
            "requiredRoles": [],
            "roles": [],
            "self": "<HOST>/application/applications/174",
            "type": "MICROSERVICE"
        }
    ],
    "next": "<HOST>/application/applications?pageSize=5&currentPage=2",
    "statistics": {
        "currentPage": 1,
        "pageSize": 5
    },
    "self": "<HOST>/application/applications?pageSize=5&currentPage=1"
}
```

The application can be updated afterwards by employing a PUT request:

```http
PUT /application/applications/<APPLICATION_ID>
Host: ...
Authorization: Basic ...
Content-Length: ...
Content-Type: application/vnd.com.nsn.cumulocity.application+json
{
    "key": "<APPLICATION_NAME>-key",
    "name": "<APPLICATION_NAME>",
    "type": "MICROSERVICE",
    "requiredRoles": [ "ROLE_INVENTORY_READ" ],
    "roles": [ "ROLE_CUSTOM_MICSROSERVICE" ]
}
```

### Deploying applications {#deploying-applications}

A microservice application gets available for {{< product-c8y-iot >}} platform users by uploading a binary ZIP file.

```http
POST /application/applications/<APPLICATION_ID>/binaries
Host: ...
Authorization: Basic ...
Content-Type: multipart/form-data
```

The ZIP file must consist of:

* _cumulocity.json_ - The application manifest file describing the deployment
* _image.tar_ - An executable Docker image



### Acquiring microservice credentials {#acquiring-microservice-credentials}

The following section is a wrap up for user management as described under [General aspects](/microservice-sdk/general-aspects) of microservices in {{< product-c8y-iot >}}.

Microservice related endpoints require a microservice bootstrap user, which can be obtained by a service provider using:

```http
GET /application/applications/<APPLICATION_ID>/bootstrapUser
Host: ...
Authorization: Basic ...
```

Response:

```http
HTTP/1.1 200 Ok
Content-Type: application/vnd.com.nsn.cumulocity.user+json
{
    "tenant": "...",
    "name": "...",
    "password": "..."
}
```

These credentials allow access to the following endpoints:

```http
GET /tenant/currentTenant
GET /user/currentUser
GET /application/currentApplication
GET /application/currentApplication/subscription
PUT /application/currentApplication
```

For example, to get the current application use:

```http
GET /application/currentApplication
Authorization: Basic ...
Content-Type: application/json
```

Response:

```json
{
    "activeVersionId": "329",
    "availability": "MARKET",
    "id": "...",
    "key": "...",
    "manifest": {
        "imports": [],
        "noAppSwitcher": true
    },
    "name": "hello-world",
    "owner": {
        "self": "...",
        "tenant": {
            "id": "..."
        }
    },
    "requiredRoles": [],
    "roles": [],
    "self": "...",
    "type": "MICROSERVICE"
}
```

### Subscriptions {#subscriptions}

Subscription in this scope means tenant subscription to a microservice application. The subscription is an important step after deployment.
When a microservice application is deployed it becomes available for subscription to other tenants. Subscribing to a microservice is the same as subscribing to any other application and it can be done in the Administration application. Also, a tenant can be subscribed employing a POST request:

```http
POST /tenant/tenants/<TENANT>/applications
Host: ...
Authorization: Basic ...
Content-Length: ...
Content-Type: application/vnd.com.nsn.cumulocity.applicationreference+json
Accept: application/vnd.com.nsn.cumulocity.tenant+json
{
    "application": {
        "id": "<APPLICATION_ID>"
    }
}
```

A successful response will look similar to:

```http
HTTP/1.1 201 Created
Content-Type: application/vnd.com.nsn.cumulocity.tenant+json
Content-Length: ...
{
    "application": {
        "id": "<APPLICATION_ID>",
        "key": "...",
        "name": "...",
        "owner": {
            "self": ".../tenant/tenants/<TENANT>",
            "tenant": {
                "id": "<TENANT>"
            }
        },
        "self": "...",
        "type": "MICROSERVICE"
    },
    "self": "..."
}
```

The subscriptions are available to microservice users through the authorized microservice bootstrap user.

```http
GET /application/currentApplication/subscriptions
Host: ...
Authorization: Basic ...
```

Response:

```http
HTTP/1.1 200 OK
Content-Type: application/vnd.com.nsn.cumulocity.applicationusercollection+json
{
    "users": [{
        "tenant": "...",
        "name": "...",
        "password": "..."
    }],
    "self": ".../applications/application/285/users"
}
```

The response consists of service user credentials dedicated for each tenant. A service user is a user account in the tenant that has the permissions ("roles") that the microservice requested on [registration](#creating-applications) time.


### Settings {#settings}

The microservice settings are available to microservice users through the authorized bootstrap or service user.
When using the bootstrap user, all settings are always loaded for the microservice owner.
The settings are stored in {{< product-c8y-iot >}} as tenant options, where category is by default `contextPath` (or `applicationName` in case context path is not defined).

Request:

```http
GET /application/currentApplication/settings
Host: ...
Authorization: Basic ...
```

Response:

```http
HTTP/1.1 200 OK
Content-Type: application/vnd.com.nsn.cumulocity.option+json;charset=UTF-8;ver=0.9
{
   "email.protocol": "smtps",
   "password.enforce.strength": "true",
   "another.key.1": "$value15"
}
```

### Basic use cases {#basic-use-cases}

#### Registering assets {#registering-assets}

Assets are the objects that your business and your application focuses on. For example, assets might be buildings and rooms if your business centers around building management or home automation. Or they might be routes and machines, if your business is about servicing machines.

Assets are stored in the inventory along with the devices, but they often have their own structure independent of devices. You create assets by POSTing them to the collection of managed objects in the inventory. For example, to create a new room in the inventory, use:

```http
POST /inventory/managedObjects
Content-Type: application/vnd.com.nsn.cumulocity.managedobject+json
Accept: application/vnd.com.nsn.cumulocity.managedobject+json
Authorization: Basic ...
{
    "name": "Building 043",
    "type": "c8y_Building"
}
```

Response:

```http
HTTP/1.1 201 Created
Content-Type: application/vnd.com.nsn.cumulocity.managedobject+json;charset=UTF-8;ver=0.9
...
{
    "owner": "admin",
    "id": "2549800",
    "self": "https://.../inventory/managedObjects/2549800",
    "type": "c8y_Building",
    "lastUpdated": "2018-09-05T16:38:31.250+02:00",
    "name": "Building 043",
    "assetParents": {
        "references": [],
        "self": "https://.../inventory/managedObjects/2549800/assetParents"
    },
    "childAssets": {
        "references": [],
        "self": "https://.../inventory/managedObjects/2549800/childAssets"
    },
    "childDevices": {
        "references": [],
        "self": "https://.../inventory/managedObjects/2549800/childDevices"
    },
    "deviceParents": {
        "references": [],
        "self": "https://.../inventory/managedObjects/2549800/deviceParents"
    }
}
```

If the device could be successfully created, a status code of 201 is returned. If the original request contains an "Accept" header just like in the example above, the complete created object is returned including the ID and URL to reference the object in future requests. The returned object also includes references to collections of child devices and child assets that can be used to add children to the device.

For example, assuming that we have also created a room, and that room's "self" property is "https://.../inventory/managedObjects/2549700", to link the room to the building, POST to the child assets collection of the building (see the "self" property of "childAssets" above):

```http
POST /inventory/managedObjects/2549800/childAssets HTTP/1.1
Content-Type: application/vnd.com.nsn.cumulocity.managedobjectreference+json
{
    "managedObject" : {
        "self" : "https://.../inventory/managedObjects/2549700"
    }
}
```

Now querying the building again shows that the room has been registered as child of the building:

```http
GET /inventory/managedObjects/2549800
```

Response:

```http
HTTP/1.1 200 OK
Content-Type: application/vnd.com.nsn.cumulocity.managedobject+json; charset=UTF-8; ver=0.9
...
{
    "owner": "admin",
    "id": "2549800",
    "self": "https://.../inventory/managedObjects/2549800",
    ...
    "childAssets": {
        "references": [
            {
                "managedObject": {
                    "id": "2549700",
                    "name": "Room 042",
                    "self": "https://.../inventory/managedObjects/2549700"
                },
                "self": "https://.../inventory/managedObjects/2549800/childAssets/2549700"
            }
        ],
        "self": "https://.../inventory/managedObjects/2549800/childAssets"
    }
}
```

#### Linking devices to assets {#linking-devices-to-assets}

Just like you link assets to other child assets, you can also link assets to devices that monitor and control the asset. For example, assume that you have a light sensor installed in the room, and that light sensor has the URL "https://.../inventory/managedObjects/2480500". POST to <kbd>childDevices</kbd> of the room as follows:

```http
POST /inventory/managedObjects/2549700/childDevices
Content-Type: application/vnd.com.nsn.cumulocity.managedobjectreference+json
{
    "managedObject" : {
        "self" : "https://.../inventory/managedObjects/2480500"
    }
}
```

{{< c8y-admon-info >}}
You can link multiple child assets or multiple child devices to the same parent in a single request.
Refer to inventory child operations in the [Inventory API](https://{{< domain-c8y >}}/api/core/#tag/Child-operations) in the {{< openapi >}} for more details.
{{< /c8y-admon-info >}}

#### Synchronizing assets with external systems {#synchronizing-assets-with-external-systems}

Often, {{< product-c8y-iot >}} will not be the only IT system dealing with a company's asset. The technical procedure for synchronizing assets stored in external IT systems is exactly the same as the [procedure used for registering devices](/device-integration/device-integration-rest/):

- Use the Identity API to link the asset ID of the external IT system to the asset ID of {{< product-c8y-iot >}}.
- Use the Inventory API to create or update the assets in {{< product-c8y-iot >}}'s inventory based on the external system's data.

#### Querying particular capabilities {#querying-particular-capabilities}

To decouple applications from the specifics of particular types of devices, applications can use fragments to query the inventory (see the Fragments section of [{{< product-c8y-iot >}}'s domain model](/concepts/domain-model)). For example, to find all managed objects having a location, use:

```http
GET /inventory/managedObjects?fragmentType=c8y_Position&withTotalPages=true
```

Response:

```http
HTTP/1.1 200 OK
Content-Type: application/vnd.com.nsn.cumulocity.managedobjectcollection+json; charset=UTF-8; ver=0.9
...
{
    "managedObjects": [{
        "id": "2480700",
        "lastUpdated": "2013-08-30T10:15:44.218+02:00",
        "name": "RaspPi BCM2708 0000000017b769d5 Gps eM9",
        "owner": "admin",
        "self": "https://.../inventory/managedObjects/2480700",
        "type": "c8y_TinkerForge_Gps",
        "c8y_Position": {
            "alt": 102.36,
            "lng": 6.769717,
            "lat": 51.267259
        },
        ...
    },
    ...
    ]
    "next": "https://.../inventory/managedObjects?withTotalPages=true&fragmentType=c8y_Position&pageSize=5&currentPage=2",
    "statistics": {
        "currentPage": 1,
        "pageSize": 5,
        "totalPages": 4
    },
    "self": "https://.../inventory/managedObjects?withTotalPages=true&fragmentType=c8y_Position&pageSize=5&currentPage=1"
}
```

Now you could, for example, use the `c8y_Position` property to locate/pin the object on a map. Standard fragments are defined in the [fragment library](/device-integration/fragment-library/).

Querying the <kbd>/platform</kbd> resource will show you further possibilities for querying your data (see also [REST](/device-integration/device-integration-rest/)).

Note that queries do not necessarily return all query results at once, but only a page of the results. For more information on paging, refer to [REST implementation > REST usage > Query result paging](https://{{< domain-c8y >}}/api/core/#section/REST-implementation/REST-usage) in the {{< openapi >}}. The optional parameter `withTotalPages` will make the query contain full page statistics at the expense of slightly slower performance.

#### Querying readings from sensors {#querying-readings-from-sensors}

Similar to the inventory, you can also query for particular sensor readings. For example, you can query the light measurements of the past month (from the time of writing this text) as follows:

```http
GET /measurement/measurements?dateFrom=2019-04-01&dateTo=2019-05-31&fragmentType=c8y_LightMeasurement
```

Response:

```http
HTTP/1.1 200 OK
Content-Type: application/vnd.com.nsn.cumulocity.measurementcollection+json; charset=UTF-8; ver=0.9
...
{
    "measurements": [{
        "id": "2480900",
        "self": "https://.../measurement/measurements/2480900",
        "source": {
            "id": "2480500",
            "self": "https://.../inventory/managedObjects/2480500"
        },
        "time": "2013-08-29T21:19:52.321+02:00",
        "type": "c8y_LightMeasurement",
        "c8y_LightMeasurement": {
            "e": {
                "unit": "lux",
                "value": 169.2
            }
        }
    },
    ...
    ]
    ...
}
```

#### Sending operations to devices {#sending-operations-to-devices}

To trigger an operation on a device, POST the operation to the [Device Control API](https://{{< domain-c8y >}}/api/core/#tag/Device-control-API). The following example restarts the device with the ID "2480300" (which is the Raspberry Pi that is integrated in [Device integration](/device-integration/device-integration-rest/).

```http
POST /devicecontrol/operations
Content-Type: application/vnd.com.nsn.cumulocity.operation+json;
Accept: application/vnd.com.nsn.cumulocity.operation+json;
{
    "deviceId": "2480300",
    "c8y_Restart":{}
}
```

Response:

```http
HTTP/1.1 201 Created
Content-Type: application/vnd.com.nsn.cumulocity.operation+json; charset=UTF-8; ver=0.9
...
{
    ...
    "deviceId": "2480300",
    "id": "2550200",
    "self": "https://.../devicecontrol/operations/2550200",
    "status": "PENDING",
    "c8y_Restart": {}
}
```

The POST command returns immediately when the operation has been queued for the device. The actual operation executes asynchronously. Since we added the optional "Accept" header in the example request, we will get the full queued operation in the response including its URL in the `self` property. Using a GET on that URL, you can check the current status of execution of the operation:

```http
GET /devicecontrol/operations/2550200 HTTP/1.1

HTTP/1.1 200 OK
Content-Type: application/vnd.com.nsn.cumulocity.operation+json; charset=UTF-8; ver=0.9
{
    "status": "PENDING",
    ...
}
```

A status of PENDING means here that the device has not yet picked up the operation. EXECUTING means that the device is in the process of executing the operation. Finally, SUCCESSFUL or FAILED indicate that the operation is completed.

#### Listening for events {#listening-for-events}

Besides querying the {{< product-c8y-iot >}} data store, you can also process and receive events in real time. For example, assume that you would like to display real-time location updates on a map.

If you have a device that sends location updates, you should see them immediately in the user interface. To receive them in your own REST client, you can use the [Notification API](https://{{< domain-c8y >}}/api/core/#tag/Real-time-notification-API) to subscribe to them. The API is based on the Bayeux protocol using HTTPS long-polling. The restrictions that apply are described in [Real-time notifications](https://{{< domain-c8y >}}/api/core/#tag/Real-time-notification-API) in the {{< openapi >}}. First, a handshake is required. The handshake tells {{< product-c8y-iot >}} what protocols the client supports for notifications and allocates a client ID to the client.

```http
POST /notification/realtime
Content-Type: application/json
...
[ {
    "id": "1",
    "supportedConnectionTypes": ["long-polling"],
    "channel": "/meta/handshake",
    "version": "1.0"
} ]

HTTP/1.1 200 OK
...
[ {
    "id": "1",
    "supportedConnectionTypes": ["long-polling"],
    "channel": "/meta/handshake",
    "version": "1.0",
    "clientId": "71fjkmy0495rxrkfcmp0mhcev1",
    "minimumVersion": "1.0",
    "successful": true
}]
```

After the handshake, the client must subscribe to the particular device channel or all devices channel (*). This is done using a POST request with the name of the channel.  
For example, if you want to receive notifications about events from the device with internal ID "24800", the subscription channel is "/events/24800".

```http
POST /notification/realtime
Content-Type: application/json
...
[ {
    "id": "2",
    "channel": "/meta/subscribe",
    "subscription": "/events/24800",
    "clientId": "71fjkmy0495rxrkfcmp0mhcev1"
}]

HTTP/1.1 200 OK
...
[ {
    "id":"2",
    "channel": "/meta/subscribe",
    "subscription": "/events/24800",
    "successful": true,
} ]
```

Finally, the client connects and waits for events to be sent to it.

```http
POST /notification/realtime HTTP/1.1
Content-Type: application/json
...
[ {
    "id": "3",
    "connectionType": "long-polling",
    "channel": "/meta/connect",
    "clientId": "71fjkmy0495rxrkfcmp0mhcev1"
} ]
```

This request will hang until an operation is issued. Here is an example of a response with a single location update:

```http
HTTP/1.1 200 OK
...
[
    {
        "id": "3",
        "data": {
            "creationTime": "...",
            "id": "2481400",
            "self": "https://.../event/events/2481400",
            "source": {
                "id": "24800",
                "name": "RaspPi BCM2708 0000000017b769d5 Gps eM9",
                "self": "https://.../inventory/managedObjects/24800"
            },
            "text": "Location updated",
            "time": "...",
            "type": "c8y_LocationUpdate",
            "c8y_Position": {
                "alt": 58.34,
                "lng": 6.769717,
                "lat": 51.267259
            },
            "channel": "/events/24800"
        },
        "successful": true,
        "channel": "/meta/connect"
    }
]
```

{{< c8y-admon-info >}}
A channel for all devices (*) is deprecated and should be avoided. Subscription on this channel may cause performance issues
on both the client and the server side, and this option may be removed in future versions of {{< product-c8y-iot >}}.
{{< /c8y-admon-info >}}
