Step-by-Step Guide
1. Make Sure MQTT Service Is Available
First, we need to check that all prerequisites are fulfilled. The first step would be to check if MQTT Service is already available for your Cumulocity Tenant.

For that, you can go to your tenant Administration → Ecosystem → Microservices
Filter or look for Mqtt-service and Messaging-management.

image
image
1901×1483 209 KB
Here we go, MQTT-Service & Messaging-management are installed.

2. Install Management UI
Now we should make sure to install the new Management UI for MQTT Service and Notification 2.0.

You can find it on the user menu when clicking on your user profile in the top right. Select Manage beta features in the section Beta features.

Toggle the Messaging service-monitoring & management

image
image
1605×1044 188 KB
After an automated refresh, you should see a new Monitoring Navigation point to enter the management UI.

image
image
1901×839 74.8 KB
2. Select the right MQTT device
Now we are ready to connect a device via MQTT. There are plenty of MQTT devices out there.

Physical Device
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

MQTT Client
Also, of course, you can just use any MQTT Client like MQTTx, connect manually to MQTT Service, and publish messages or subscribe on topics.

In this guide, I will demonstrate connecting using an MQTT Client and a Device Simulator.

3. Connect Device
MQTTx Device Simulator
The easiest way to simulate a device is using the tool MQTTX.
It lets you manually connect to any MQTT broker. With scripts, you can simulate payload and send this periodically to MQTT.

The first step is to create the connection to MQTT Service. On the left connection pane, click on + to add a new connection. Now provide the following details:

Name: MQTTService or any other recognizable name of your choice
Host: mqtts://<yourTenantURL> e.g., demo.eu-latest.cumulocity.com
Port: 9883
Username: <tenantID/username> e.g., t12345/demoUser
Password: <Your Password>
image
image
822×589 16.6 KB
Click on Connect to verify the connection is working.

To dynamically simulate messages, we need to create a script. In the left grey navigation bar, click on </>.
Next, click on + to add a new script and copy-paste the following:

/**
 * Simulated temperature and humidity reporting
 * @return Return a simulated temperature JSON data - { "temperature": 23, }
 * @param value, MQTT Payload - {}
 */

function random(min, max) {
  return Math.round(Math.random() * (max - min)) + min
}

function handlePayload(value, index) {
  let _value = {}
  _value.temperature = {}
  _value.temperature.value = random(10, 30)
  _value.temperature.unit = "C"
  _value.time = new Date()
  _value.deviceId = "dev4711"
  return JSON.stringify(_value, null, 2)
}

execute(handlePayload)
Click on Save and give it a meaningful name. Click Test to check if everything is working.

image
image
1161×1207 41.9 KB
Let’s go back to the initial view, select and connect to MQTT Service. With the ... on top right, you can select Run Script. Select your script and apply it to Published messages.

image
image
434×449 4.38 KB
Send a message with the payload {} to topic device/sim/message. The message will be replaced with the one from the script.

image
image
819×749 22.8 KB
Click on the arrow to the top in the bottom window. Select Timed Message and enter 10 sec as frequency.

image
image
355×236 3.21 KB
With the next message we send manually, a new message will be created every 10 sec and sent to MQTT Service.

NodeRED Device Simulator
Another way to simulate a device that sends data regularly is using NodeRED.

image
image
1059×333 14.8 KB
First, we need an inject node that is repeated every 10 sec.

image
image
603×283 7.86 KB
We connect this to a function node where we generate the payload like follows:

var devices = ["dev4711", "dev4712", "dev4713"]
var randomTemp = (Math.random() * (30 - (-30)) + (-30)).toFixed(1);  //random temp from -30.0 to 30.0 degrees
var dateObj = new Date();
var idx = context.get('count') || 0;

msg.payload =
{
    "Temperature": {
        "value": randomTemp,
        "unit": "C"
    },
    "time": dateObj,
    "deviceId": devices[idx],
}
if (idx < 2)
    context.set('count', idx + 1)
else
    context.set('count', 0)
msg.payload = JSON.stringify(msg.payload);

return msg;
As a last step, we connect an MQTT out node with the following config:
Create a new Server config with:

Server: <your Tenant Domain> e.g., demo.eu-latest.cumulocity.com
Port: 9883
Connect automatically: True
Use TLS: True
Protocol: MQTT V3.1.1 or MQTT V5
Client ID: You can leave that blank
Session: Use clean session
In the security tab, you need to provide:

Username: <tenantID/username> e.g., t12345/demoUser
Password: <Your Password>
Back in the node configuration, you should add the topic and give the node a name:

Topic: device/sim/message
Name: MQTT Service
Optionally, we can add and connect a debug node to check if the message is okay.
After hitting deploy, our MQTT Device simulator is ready and will send every 10 sec a new message to MQTT Service.

You can import the full flow config by using this JSON:

[
    {
        "id": "f6f2187d.f17ca8",
        "type": "tab",
        "label": "Flow 1",
        "disabled": false,
        "info": ""
    },
    {
        "id": "6dd95995.8f3ca8",
        "type": "inject",
        "z": "f6f2187d.f17ca8",
        "name": "Repeated trigger",
        "props": [],
        "repeat": "10",
        "crontab": "",
        "once": false,
        "onceDelay": "",
        "topic": "",
        "x": 290,
        "y": 560,
        "wires": [
            [
                "901dc50a.12bf"
            ]
        ]
    },
    {
        "id": "b25e6d55.9f44d",
        "type": "debug",
        "z": "f6f2187d.f17ca8",
        "name": "Main Debug",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "targetType": "full",
        "statusVal": "",
        "statusType": "auto",
        "x": 890,
        "y": 480,
        "wires": []
    },
    {
        "id": "901dc50a.12bf",
        "type": "function",
        "z": "f6f2187d.f17ca8",
        "name": "Generate Payload",
        "func": "var devices = [\"dev4711\", \"dev4712\", \"dev4713\"]\nvar randomTemp = (Math.random() * (30 - (-30)) + (-30)).toFixed(1);  //random temp from -30.0 to 30.0 degrees\nvar dateObj = new Date();\nvar idx = context.get('count') || 0;\n\nmsg.payload =\n{\n    \"Temperature\": {\n        \"value\": randomTemp,\n        \"unit\": \"C\"\n    },\n    \"time\": dateObj,\n    \"deviceId\": devices[idx],\n}\nif (idx < 2)\n    context.set('count', idx + 1)\nelse\n    context.set('count', 0)\nmsg.payload = JSON.stringify(msg.payload);\n\nreturn msg;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 497,
        "y": 560,
        "wires": [
            [
                "b25e6d55.9f44d",
                "31ac6556.03bb5a"
            ]
        ]
    },
    {
        "id": "31ac6556.03bb5a",
        "type": "mqtt out",
        "z": "f6f2187d.f17ca8",
        "name": "MQTT Service",
        "topic": "device/sim/message",
        "qos": "",
        "retain": "",
        "respTopic": "",
        "contentType": "",
        "userProps": "",
        "correl": "",
        "expiry": "",
        "broker": "5cb9e151.9886b8",
        "x": 880,
        "y": 600,
        "wires": []
    },
    {
        "id": "5cb9e151.9886b8",
        "type": "mqtt-broker",
        "name": "MQTT Service",
        "broker": "${tenant_url}",
        "port": "9883",
        "tls": "",
        "clientid": "",
        "autoConnect": true,
        "usetls": true,
        "protocolVersion": "4",
        "keepalive": "60",
        "cleansession": true,
        "autoUnsubscribe": true,
        "birthTopic": "",
        "birthQos": "0",
        "birthPayload": "",
        "birthMsg": {},
        "closeTopic": "",
        "closePayload": "",
        "closeMsg": {},
        "willTopic": "",
        "willQos": "0",
        "willPayload": "",
        "willMsg": {},
        "userProps": "",
        "sessionExpiry": ""
    }
]
Make sure to change the broker configuration to your tenant.

4. Confirm Device Is Connected Successfully
Now that we have at least one device / simulator connected, we can confirm that the device is sending data by either just subscribing to the same topic or checking the management UI.

image
image
1891×771 65.1 KB
As we can see, there is a new topic created and 0.1 msg/s are received. There is also one subscriber, which is a MQTTx client subscribing on the same topic.

Next steps would be to integrate it to Cumulocity.

5. Integrate with Cumulocity
Dynamic Mapper
To integrate the device to Cumulocity, we offer an open-source tool called Dynamic Mapper:

github.com

GitHub - Cumulocity-IoT/cumulocity-dynamic-mapper: The ultimate Mapper for building the bridge...
The ultimate Mapper for building the bridge between any Message Broker and Cumulocity IoT in a zero-code approach!

With it, you can map any payload from MQTT Service to the C8Y Domain Model in a graphical approach.

You just need to key in the topic device/sim/message and map the payload we are generating to C8Y measurements.

This is how it would look like in the end:

image
image
1406×896 56.1 KB
When configured to create the device automatically, you could see the device dev4711, which is receiving measurements every 10 sec.

image
image
1626×781 56.1 KB
If you want to know the detailed steps, please read the user guide or follow the following guide:

Introduction Since years Cumulocity IoT is providing a MQTT endpoint dedicated to the Cumulocity Domain Model to connect MQTT devices. But what about devices using a pre-defined topic structure and any custom payload which cannot be modified because they are so called “closed”? Since the latest release of Cumulocity there is a new Service in private-preview - the MQTT Service - which is a full-fledged MQTT Broker without the limitation of pre-defined topic structure and payload. Still, it does…
Custom Microservice
As an alternative, you can also implement your own microservice. The main steps you need to implement are:

Connect to MQTT Service either via MQTT or with the Java WebSocket client
Subscribe on the topics you are interested in
Map the data to the C8Y data format of your choice
Send it to C8Y using the Microservice SDK or any other client.
Summary
With MQTT Service, you have full flexibility to connect any device that can ‘speak’ MQTT with any arbitrary payload. In this guide, I demonstrated how easy it is to connect devices or simulate devices to test MQTT Service. To use the data, you can leverage existing tools like Dynamic Mapper or implement your own custom microservice.

We are looking forward to your feedback and experience with MQTT Service. Please leave a comment if you have questions about it or about this guide.
