---
weight: 60
title: Hello MQTT Python
layout: redirect
---

In this tutorial, you will learn how to use the Python MQTT client with {{< product-c8y-iot >}} using pre-defined messages (called "static templates").

### Prerequisites {#prerequisites}

In order to follow this tutorial, check the following prerequisites:

* You have a valid tenant, a user, and a password in order to access {{< product-c8y-iot >}}.
* Verify that you have Python 3 installed:

```shell
$ python3 --version
Python 3.8.5
```
Python can be downloaded from [www.python.org](https://www.python.org/).

* Install the Python Paho client using your system's package manager or using pip:

```shell
$ pip install paho-mqtt
```
{{< c8y-admon-info >}}
The above command installs Paho on your system. You may want to use [virtualenv](https://virtualenv.pypa.io/en/latest/user_guide.html) to install it only for this example.
{{< /c8y-admon-info >}}

{{< c8y-admon-info >}}
On macOS you may need to execute `sudo easy_install pip` in case the `pip` command is not found.
{{< /c8y-admon-info >}}

### Developing the "Hello, MQTT world!" client {#developing-the-hello-mqtt-world-client}

To develop a very simple "Hello, world!" MQTT client for {{< product-c8y-iot >}}, you must

* create a Python script,
* run the script.

#### Create a Python script {#create-a-python-script}

Create a script file (for example *hello_mqtt.py*) with the following content:

```python
# /usr/bin/env python3
# -*- coding: utf-8 -*-

import paho.mqtt.client as mqtt
import time, random, threading
import multiprocessing as mp

# client, user and device details
serverUrl   = "mqtt.cumulocity.com"
clientId    = "my_mqtt_python_client"
device_name = "My Python MQTT device"
tenant      = "<<tenant_ID>>"
username    = "<<username>>"
password    = "<<password>>"

# task queue to overcome issue with paho when using multiple threads:
#   https://github.com/eclipse/paho.mqtt.python/issues/354
task_queue = mp.Queue()

# display all incoming messages
def on_message(client, userdata, message):
    payload = message.payload.decode("utf-8")
    print(" < received message " + payload)
    if payload.startswith("510"):
        task_queue.put(perform_restart)

# simulate restart
def perform_restart():
    print("Simulating device restart...")
    publish("s/us", "501,c8y_Restart", wait_for_ack = True);

    print("...restarting...")
    time.sleep(1)

    publish("s/us", "503,c8y_Restart", wait_for_ack = True);
    print("...restart completed")

# send temperature measurement
def send_measurement():
    print("Sending temperature measurement...")
    temperature = random.randint(10, 20)
    publish("s/us", "211,{}".format(temperature))

# publish a message
def publish(topic, message, wait_for_ack = False):
    QoS = 2 if wait_for_ack else 0
    message_info = client.publish(topic, message, QoS)
    if wait_for_ack:
        print(" > awaiting ACK for {}".format(message_info.mid))
        message_info.wait_for_publish()
        print(" < received ACK for {}".format(message_info.mid))

# display all outgoing messages
def on_publish(client, userdata, mid):
    print(" > published message: {}".format(mid))

# main device loop
def device_loop():
    while True:
        task_queue.put(send_measurement)
        time.sleep(7)

# connect the client to {{< product-c8y-iot >}} and register a device
client = mqtt.Client(clientId)
client.username_pw_set(tenant + "/" + username, password)
client.on_message = on_message
client.on_publish = on_publish

client.connect(serverUrl)
client.loop_start()
publish("s/us", "100," + device_name + ",c8y_MQTTDevice", wait_for_ack = True)
publish("s/us", "110,S123456789,MQTT test model,Rev0.1")
publish("s/us", "114,c8y_Restart")
print("Device registered successfully!")

client.subscribe("s/ds")

device_loop_thread = threading.Thread(target = device_loop)
device_loop_thread.daemon = True
device_loop_thread.start()

# process all tasks on queue
try:
    while True:
        task = task_queue.get()
        task()
except (KeyboardInterrupt, SystemExit):
    print("Received keyboard interrupt, quitting ...")
    exit(0)

```

Replace `serverUrl`, `clientId` and `device_name` as needed. Do not forget to specify the user credentials setting values for `tenant_ID`, `username` and `password`.

{{< product-c8y-iot >}} MQTT protocol supports both unsecured TCP and secured SSL connections, so when configuring  a port remember to use the correct one. No matter which connection type you select, your `serverUrl` should stay the same (like `mqtt.{{< domain-c8y >}}`).

The above example uses a TCP connection. If you would like to use an SSL connection, remember to use the proper configuration from the Paho MQTT client. Further information can be found at [www.eclipse.org](http://www.eclipse.org/paho/clients/python/docs/#option-functions).

What does the script do?

-   Configure a MQTT connection.
-   Register an ``on_message`` callback function which will print incoming messages. In case of a `c8y_Restart` operation, it will simulate a device restart.
-   Register an ``on_publish`` callback function which will be called after a publish message has been delivered.
-   Connect with {{< product-c8y-iot >}} via the MQTT protocol.
-   Create a new device with a name (`device_name`) and a type (`c8y_MQTTDevice`).
-   Update the device hardware information by putting a `"S123456789"` serial, a `"MQTT test model"` model and a `"Rev0.1"` revision.
-   Subscribe to the static operation templates for the device – this will result in an ``on_message`` method call every time a new operation is created.
-   Start the ``device_loop_thread`` which sends a temperature measurement every 7 seconds.
-   Prepare a ``task_queue``, used mainly to overcome deadlock [issue](https://github.com/eclipse/paho.mqtt.python/issues/354) in Python Paho library. Task queue will run all tasks one by one.

What does the ``publish`` message do?

-   Publish a given message about the given topic via MQTT.
-   When publishing the message it uses QoS 2. So to be sure that the message was delivered, it will wait for server ACK (until the ``on_publish`` method is called with the matching message ID).

Note that the subscription is established after the device creation, otherwise if there is no device for a given ``clientId``, the server will not accept it.

#### Run the script {#run-the-script}

To run the script just use the command:

```shell
$ python3 hello_mqtt.py
```

After starting the application you should see a new registered device in the Device Management application, listed in **All devices**. In the **Measurements** tab, you will see the temperature measurements being sent by your client.

Additionally, if there will be a new operation created for this device (for example `c8y_Restart`), information about it will be printed to the console.


### Improving the agent {#improving-the-agent}

Now that you have done your first step, check out the section [Hello MQTT](/device-integration/mqtt-examples/#hello-mqtt) to learn more about {{< product-c8y-iot >}} MQTT and improve your application.
