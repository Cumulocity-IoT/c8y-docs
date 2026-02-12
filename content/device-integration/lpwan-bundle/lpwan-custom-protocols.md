---
weight: 40
title: LPWAN custom protocols
layout: redirect
---

### Introduction {#lpwan-custom-protocols-introduction}

{{< product-c8y-iot >}} can interface with LPWAN devices through LPWAN network providers via {{< product-c8y-iot >}} LPWAN agents, such as [Actility LoRa](/device-integration/lpwan/#actility-lora).

Our LoRa integration allows you to define device protocols in a self-service manner to create a binary mapping of the LoRa sensor data to the {{< product-c8y-iot >}} data model.
However, this approach does not work for LoRa devices sending dynamic payloads.
To integrate LoRa devices with dynamic payloads, a custom codec for payload decoding and command encoding can be created in form of a microservice.
This microservice will be referred to as a custom codec microservice.
A custom codec microservice is a typical {{< product-c8y-iot >}} microservice which conforms to a specific contract for decoding and encoding LoRa payloads and commands.

When an LPWAN agent receives an uplink message, it forwards the device data to a REST endpoint (such as `/decode`) exposed by the custom codec microservice for decoding.
Similarly, when the user executes a device command through the device shell, the LPWAN agent forwards the command text to a REST endpoint (such as `/encode`) exposed by the custom codec microservice for encoding.

### Implementing a custom codec microservice {#implementing-a-custom-codec-microservice}

A custom codec microservice is a typical {{< product-c8y-iot >}} microservice, which can be implemented and enabled as follows.

1. Create a microservice which exposes the <kbd>/encode</kbd> and <kbd>/decode</kbd> REST endpoints conforming to the [OpenAPI Specification](/files/rest/lpwan-custom-codec-openapi.yaml), implementing the encoding and decoding functionality.

2. The microservice must create device protocols for each LPWAN device type it supports. If you use the lpwan-custom-codec library the device protocols will be created automatically for you.
Otherwise, you must use the Inventory API to create a new managed object describing the device protocol with the following JSON structure:

    You must create a device protocol (with `type` and `fieldbusType` properties, and the `c8y_LpwanCodecDetails` fragment) as well as an external ID for every device manufacturer and device model combination that this codec microservice supports:

    * `type` is always "c8y_LpwanDeviceType".
    * `fieldbusType` is always "lpwan".
    * The `c8y_LpwanCodecDetails` fragment contains:
        * `codecServiceContextPath`- Custom codec microservice context path.
        * `supportedDevice`- Supported device information.
            *  `deviceManufacturer`- Device manufacturer.
            *  `deviceModel`- Device model.
        * `supportedDeviceCommands`- A list of commands which this device supports:
            * `name`- Command name, matching the name of the predefined command template you create (see below).
            * `category`- Command category, matching the category of the predefined command template you create (see below).

    <br/>

    Example for the JSON structure for creating a device protocol using the Inventory API:

    ```json
    {
    	"name": "<<Name of the LPWAN device protocol>>",
    	"description": "<<Description of the LPWAN device protocol>>",
    	"type": "c8y_LpwanDeviceType",
    	"fieldbusType": "lpwan",
    	"c8y_IsDeviceType": {},
    	"c8y_LpwanCodecDetails": {
    		"codecServiceContextPath": "<<Custom Codec microservice context path>>",
    		"supportedDevice": {
    			"deviceManufacturer": "<<Supported device manufacturer>>",
                "deviceModel": "<<Supported device model>>",
    			"supportedDeviceCommands": [
    				{
    					"name": "<<Command name, matching the name of the Predefined Command template you create>>",
    					"category": "<<Command category, matching the category of the Predefined Command template you create>>"
    				}
    			]
    		}
    	}
    }
    ```

    Example for the JSON structure for creating an external ID for the device protocol using the Identity API:

    ```json
    {
    	"externalIds": [
    		{
    			"managedObject": "<<ID of the Device protocol managed object>>",
    			"externalId": "<<Device Protocol Name>>",
    			"type": "c8y_SmartRestDeviceIdentifier"
    		}
    	]
    }
    ```

3. Based on the device protocol assigned to a device, the LPWAN agent automatically routes the request to the corresponding microservice.
  For device downlink commands, the LPWAN agent forwards the device shell command request to the <kbd>/encode</kbd> endpoint only when a predefined command listed as "supportedDeviceCommands" in the `c8y_LpwanCodecDetails` fragment of the device protocol is executed.

    You must create a predefined command template for every supported device command (`supportedDeviceCommands`) specified in the device type.

    The following example shows the JSON structure for creating a predefined command template using the Inventory API:

    ```json
     {
    	"type": "c8y_DeviceShellTemplate",
    	"name": "<<Command name, matching the name of the supported command mentioned in the device protocol>>",
    	"deviceType": [
    		"<<Device Protocol Name>>"
    	],
    	"category": "<<Command Category>>",
    	"command": "<<Command string which gets copied to the device shell command prompt when the user chooses this Predefined command>>",
    	"deliveryTypes": [
    		"Default"
    	]
    }
    ```

### Using the LPWAN custom codec library {#using-the-custom-codec-library}

For convenience, {{< product-c8y-iot >}} provides the Java library `com.nsn.cumulocity.clients-java:lpwan-custom-codec` to develop the custom codec microservice in Java as a SpringBoot application.
When subscribed, such a custom codec microservice automatically creates the required device protocols and predefined command templates as described in [Implementing a custom codec microservice](#implementing-a-custom-codec-microservice).

To create a custom codec microservice using this library, do the following:

1. Add the following dependency to the pom.xml file:

        ```xml
        <dependency>
                <groupId>com.nsn.cumulocity.clients-java</groupId>
                <artifactId>lpwan-custom-codec</artifactId>
                <version>${c8y.version}</version>
            </dependency>
        ```

2. Create a Spring Boot application and annotate its main class with:

    ```java
    @CodecMicroserviceApplication `com.cumulocity.microservice.lpwan.codec.annotation.CodecMicroserviceApplication`
    ```

3. Implement the following Java interfaces and annotate them with:

    ```java
    @Component `org.springframework.stereotype.Component`
    ```

     a. Implement the `supportedDevices` method of `com.cumulocity.microservice.lpwan.codec.Codec` to specify the device manufacturer, device name and the commands this custom codec service supports:

        ```java
        package com.cumulocity.microservice.lpwan.codec;

        public interface Codec {
             Set<DeviceInfo> supportsDevices();
        }
        ```    

     b. Implement the `decode` method of `com.cumulocity.microservice.customdecoders.api.service.DecoderService` to provide the decode functionality. The decode method receives the following input:

    * `inputData`- device payload to be decoded.
    * `deviceId`- device managed object ID.
    * `args`- a map which contains keys:
        * `deviceManufacturer`- device manufacturer.
        * `deviceModel`- device model.
            *  `sourceDeviceEui`- device eui.
            *  `fport`- fport (optional).

    <br/>

    The library also provides the wrapper class `com.cumulocity.microservice.lpwan.codec.decoder.model.LpwanDecoderInputData` to extract the decoder inputs.
    <br/>


         ```java
          package com.cumulocity.microservice.customdecoders.api.service;

          public interface DecoderService {
              DecoderResult decode(String inputData, GId deviceId, Map<String, String> args) throws DecoderServiceException;
          }
          ```

     c. Implement the `encode` method of `com.cumulocity.microservice.customencoders.api.service.EncoderService` to provide the encode functionality:

        ```java
        package com.cumulocity.microservice.customencoders.api.service;

        public interface EncoderService {
            EncoderResult encode(EncoderInputData encoderInputData) throws EncoderServiceException;
        }
        ```

4. Add the following permissions in the microservice manifest file `cumulocity.json`. Note that the respective field in the manifest is called `requiredRoles`, but what you actually add is a list of required permissions strings.

    ```json
    "requiredRoles": [
       "ROLE_INVENTORY_ADMIN",
       "ROLE_INVENTORY_READ"
    ]
    ```

### Deploying the sample codec microservice {#deploying-the-sample-codec-microservice}

Steps to build the example codec `lora-codec-lansitec` microservice.

1. Clone the {{< link-c8y-github >}}/cumulocity-examples.git repository.
2. Build the microservice using `mvn clean install`. This creates a ZIP file of the lanitec codec microservice.
3. Deploy the microservice by uploading the ZIP file using the {{< product-c8y-iot >}} Administration UI.
4. Open the Device Management application. Under **Device protocols**, you should now see the device protocols with type "lpwan" created by the lansitec codec microservice.

The image below shows the device protocols option in the Device Management application.

![Device Protocols Page](/images/device-protocols/lpwan-custom-codec/lpwan-device-protocols-page.png)

The image below shows an example of the device protocols created by the custom codec microservice on subscription.

![List of device protocols created on subscription](/images/device-protocols/lpwan-custom-codec/lpwan-device-protocols.png)

The created device protocols will be listed in the dropdown during the device registration of LPWAN with any of the LPWAN agents.
The Actility LoRa device registration is shown below.

![Device Registration](/images/device-protocols/lpwan-custom-codec/lpwan-protocol-list-device-registration.png)

You can also assign the device protocol from the **LPWAN** device tab.
To do so, navigate to a particular device.
Then, switch to the **LPWAN** tab and click **New device protocol** to view the device protocols created above.

![Device protocol mapping](/images/device-protocols/lpwan-custom-codec/lpwan-device-page-lpwantab.png)

Supported device commands are available in the **Predefined commands option** from the **Device shell** tab.

![Device supported commands](/images/device-protocols/lpwan-custom-codec/lpwan-custom-codec-device-commands.png)
