---
weight: 60
title: Deploying the sample codec microservice
layout: redirect
---

Steps to build the example codec `lora-codec-lansitec` microservice.

1. Clone the https://github.com/SoftwareAG/cumulocity-examples.git repository.
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
