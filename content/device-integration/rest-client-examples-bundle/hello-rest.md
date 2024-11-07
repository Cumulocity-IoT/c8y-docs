---
weight: 10
title: Hello REST
layout: redirect
---

This section gives a very basic example how to create a device representation in {{< product-c8y-iot >}} and subsequently how to send related measurement data.

All steps are performed by calling REST interfaces. Those REST calls are demonstrated by CURL statements that can be executed on command line.

Refer to [Using the REST interface](/microservice-sdk/rest) for a short introduction to CURL.


### Prerequisites {#prerequisites}

In order to follow this tutorial, check if the following prerequisites are met:

-   You have a valid tenant, user and password in order to access {{< product-c8y-iot >}}.
-   The command line tool CURL is installed on your system.


### Do the REST calls {#do-the-rest-calls}

We will now perform a sequence of just two REST calls, which are described in detail next:

-   Step 1: Create a new device in the inventory of {{< product-c8y-iot >}}
-   Step 2: Transmit measurement data related to that device

In real world those steps are performed by the 'device agent'.

Step one is performed just once, when the device is connected to {{< product-c8y-iot >}} for the first time.

After that, actions related to that device can be performed by referencing the device by an internal ID which is returned when executing this step.

#### Creating a new device {#creating-a-new-device}

To create a new device in the inventory of {{< product-c8y-iot >}} the following REST request is needed:

    POST /inventory/managedObjects HTTP/1.1
    Content-Type: application/vnd.com.nsn.cumulocity.managedobject+json
    Accept: application/vnd.com.nsn.cumulocity.managedobject+json
    Authorization: Basic <<Base64 encoded credentials <tenant ID>/<username>:<password> >>
    ...
    {
        "c8y_IsDevice" : {},
        "name" : "HelloWorldDevice"
    }

This call can be done by executing the following curl statement:

    curl -v -u <username>:<password> \
       -H 'Accept: application/vnd.com.nsn.cumulocity.managedobject+json' \
       -H 'Content-type: application/vnd.com.nsn.cumulocity.managedobject+json' \
       -X POST \
       -d '{"c8y_IsDevice":{},"name":"HelloWorldDevice"}' \
       https://<{{< product-c8y-iot >}} tenant domain>/inventory/managedObjects

Replace `<username>`, `<password>` and `<tenant-ID>` with the appropriate credentials given to you when registering with {{< product-c8y-iot >}}.

The same credentials used to access the {{< product-c8y-iot >}} Web GUI can be used to execute the REST calls.

You will receive a response like that:

    HTTP/1.1 201 Created
    Content-Type: application/vnd.com.nsn.cumulocity.managedobject+json; charset=UTF-8; ver=0.9
    Authorization: Basic <<Base64 encoded credentials <tenant ID>/<username>:<password> >>
    ...
    {
        "id": "1231234"
        "lastUpdated": "2014-12-15T14:58:26.279+01:00",
        "name": "HelloWorldDevice",
        "owner": "<username>",
        "self": "https://.../inventory/managedObjects/1231234",
        "c8y_IsDevice": {},
        ...
    }

When creating a device, {{< product-c8y-iot >}} generates an ID, which is needed in further calls in order to reference the device. You can find this ID as the "id" attribute-value pair in the response.


#### Sending measurement data {#sending-measurement-data}

After the device is created, we can send measurement data.

In our case, we will send a temperature measurement in the unit of Celsius which was collected on a certain time:

    POST /measurement/measurements
    Content-Type: application/vnd.com.nsn.cumulocity.measurement+json
    Accept: application/vnd.com.nsn.cumulocity.measurement+json
    ...
    {
        "c8y_TemperatureMeasurement": {
            "T": {
                "value": 21.23,
                "unit":"C"
            }
        },
        "time": "2014-12-15T13:00:00.123+02:00",
        "source": {
            "id": "1231234"
        },
        "type":"c8y_PTCMeasurement"
    }

Replace the id value with the appropriate value you received in the first step.

Furthermore, you should update the time value to a recent timestamp in order to make it easy to find back the measurement on {{< product-c8y-iot >}} UI later.

Note the data format for timestamp values which is explained as `date-time` in the [Swagger/OpenAPI Specification](https://swagger.io/specification/#data-types).

    curl -v -u <username>:<password> \
       -H 'Accept: application/vnd.com.nsn.cumulocity.measurement+json' \
       -H 'Content-type: application/vnd.com.nsn.cumulocity.measurement+json' \
       -X POST \
       -d '{"c8y_TemperatureMeasurement":{"T":{"value":21.23,"unit":"C"}},"time":"2014-12-15T13:00:00.123+02:00","source":{"id":"1231234"},"type":"c8y_PTCMeasurement"}' \
       https://<{{< product-c8y-iot >}} tenant domain>/measurement/measurements/

The response to that request will look like this:

    HTTP/1.1 201 Created
    Content-Type: application/vnd.com.nsn.cumulocity.measurement+json; charset=UTF-8; ver=0.9
    ...
    {
        "id": "4711",
        "self": "https://.../measurement/measurements/4711",
        "source": {
            "id": "1231234",
            "self": "https://.../inventory/managedObjects/1231234"
        },
        "time": "2014-12-15T12:00:00.123+01:00",
        "type": "c8y_PTCMeasurement",
        "c8y_TemperatureMeasurement": {
            "T" : {
                "unit" : "C",
                "value" : 21.23
            }
        }
    }

If you like to, you can repeat sending measurements. Before sending the request again, you should update the timestamp (value of attribute 'time') in order to create a time series.

Now you are done. Enter the Device Management application in the {{< product-c8y-iot >}} UI, select your device on the "All devices" page and switch to the "Measurements" tab. Here you can see your measurement data.

If you do not see data, you might need to change the filter setting to, for example, "last week" to include the timestamp you used in your submitted measurement.


#### Go further {#go-further}

The sequence of REST calls demonstrated here is just a shortened procedure of those described in [Device integration](/device-integration/device-integration-rest/).
The first step (creating a new device) is part of the 'startup phase', whereas step two (sending measurements) references to the 'cycle phase'.

Refer to the section on [Device integration](/device-integration/device-integration-rest/) to get the necessary information required for implementing
real-world agents.
