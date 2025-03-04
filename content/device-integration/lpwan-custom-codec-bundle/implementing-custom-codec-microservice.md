---
weight: 20
title: Implementing a custom codec microservice
layout: redirect
---

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
