Step-by-step guide for MQTT Service device connection

1. Make sure the MQTT Service is available
First, check that all prerequisites are fulfilled. Check if MQTT Service is already available for your Cumulocity tenant.

For that, navigate to **Administration** → **Ecosystem** → **Microservices** in your tenant.
Filter or look for Mqtt-service and Messaging-management.

Here we go, MQTT-Service & Messaging-management are installed.

2. Install management UI
Now we should make sure to install the new Management UI for MQTT Service and Notification 2.0.

You can find it on the user menu when clicking on your user profile in the top right. Select Manage beta features in the section Beta features.

Toggle the Messaging service-monitoring & management

After an automated refresh, you should see a new Monitoring Navigation point to enter the management UI.

3. Select the right MQTT device
Now we are ready to connect a device via MQTT. There are plenty of MQTT devices out there.

Physical device
Normally, you would select a physical device. The easiest ones already have an MQTT client embedded, and you just need to configure the broker.

There are plenty of examples of devices like smart cameras, smart gateways, PLCs, and many more.

Alternatively, you can also build your own device like using an ESP32 and attaching any sensor.
With that, you can connect to MQTT Service: https://esphome.io/components/mqtt.html

Please note: Be aware of the current limitations of MQTT Service, which could result in your device being unable to connect, such as:

Last Will Retained Message - results in the device being rejected
Clean Session / Clean Start must be set to true - otherwise, the device is rejected
Simulators
If you don’t have a physical device at hand, you can also use simulators to publish data to MQTT Service.

For example, you can use a nodeRED flow to generate data and publish it to MQTT Service, e.g., check out this simple flow

Another example could be a small Python script to generate data and publish it to MQTT.

Here is an example:
https://github.com/DamascenoRafael/mqtt-simulator

MQTT client
Also, of course, you can just use any MQTT Client like MQTTx, connect manually to MQTT Service, and publish messages or subscribe on topics.

In this guide, I will demonstrate connecting using an MQTT Client and a Device Simulator.
