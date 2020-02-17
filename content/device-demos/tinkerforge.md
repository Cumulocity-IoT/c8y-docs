---
weight: 40
title: Tinkerforge Weather Station
layout: bundle
---


### Overview

[TinkerForge](http://tinkerforge.com) is a company that provides generic sensors and controls for diverse use cases ranging from environmental monitoring to industrial automation. Together with Cumulocity, you can:

* Build complete machine-to-machine use cases by just plugging off-the-shelf hardware components together. No configuration is required -- the components are automatically discovered by the Cumulocity Java agent and connected to the cloud.
* Instantly visualize sensor data and remote control devices in real-time.

In this demo, we will link up a [Tinkerforge Weather Station](https://www.tinkerforge.com/en/doc/Kits/WeatherStation/WeatherStation.html) to Cumulocity. We will use a Weather Station configuration without an inbuilt Wi-Fi, so we will use a Raspberry Pi 4 (referred to as "RaspPi" in the description below for brevity) as an intermediary device to attach the Weather Station to the Cumulocity IoT platform. The RaspPi must have an active internet connection. The RaspPi can be integrated as a module in the Weather Station, or it can be an external device that you connect to the Weather Station via a USB cable.

### Installing the Tinkerforge Brick Daemon and the Brick Viewer on the RaspPi

Before we try to connect to Cumulocity, we need to ensure that the RaspPi and the Weather Station can communicate with each other. 

For the software connection between the devices, you need to install  Tinkerforge's Brick Daemon and Brick Viewer on the RaspPi. The installation instructions are provided on the Tinkerforge web page for setting up the Raspberry Pi at https://www.tinkerforge.com/en/doc/Embedded/Raspberry_Pi.html.


### Checking the connection between the Tinkerforge Weather Station and the RaspPi

Now we need to start the Brick Daemon and set up the Brick Viewer to communicate with the Weather Station. Note that both components need to be started with sudo, to permit a USB connection between the devices.

````console
sudo brickd  
sudo brickv
````

To start the Brick Viewer you can also use the Raspbian main menu entry **Programming > Brick Viewer**. 
  
In the Brick Viewer, there is a **Connect** button/bar at the top of the display. Click it to see what hardware is available. The list shows enties such as the following:

* Master Brick 2.0
* LCD 20x4 Bricklet 1.2
* Barometer Bricklet
* Ambient Light Bricklet
* Humidity Bricklet
 
Each of the hardware items in this list has an associated tab at the top of the Brick Viewer display.

If you see such a list, this is already confirmation that the communication between the Weather Station and the RaspPi is working. As a further simple check, you can send a text message like "Hello World!" from the Block Viewer to the Weather Station:

* In the Block Viewer, click on the tab **LCD 20x4 Bricklet**.
* Click the button **Backlight On**, which causes the Weather Station's 20x4 LCD display to light up.
* In the **Text** field, enter "Hello World!", then click the **Send Text** button.

You should now see the text in the LCD display on the Weather Station.


### Installing the Cumulocity agent on the RaspPi

The connection between the Tinkerforge Weather Station and the Cumulocity platform is routed over the RaspPi. The connection between the RaspPi and the Cumulocity platform is implemented by installing and running the Cumulocity Java agent on the RaspPi. The Cumulocity Java agent on the RaspPi supports TinkerForge out of the box.

For details of installing and running the Cumulocity Java agent on the Raspberry Pi, refer to Cumulocity's [demo for the Raspberry Pi](../raspberry-pi-4).

<!-- ![Raspberry Pi and TinkerForge](/images/device-demos/tinkerforge/tinkerforge.jpg) -->

### Registering the RaspPi device on Cumulocity

As a final configuration step, you need to register the RaspPi device on the Cumulocity platform. Instructions for doing this are also provided in the [Raspberry Pi demo](../raspberry-pi-4).

### Using TinkerForge components with Cumulocity

Open the Cumulocity UI in a web browser, open the **Device management** application, go to the panel **All devices** and click the RaspPi device that is running the Java agent. The **Child devices** tab of the RaspPi lists the connected TinkerForge components.

<!--
![Child Devices](/images/device-demos/tinkerforge/tinkerforgechildren.png)
-->

By default, TinkerForge components are named using the name of the device that they are connected to (for example, "RaspPi BCM2708 10000000e2f5ad4d"), the type of component (for example, "TFHumidityBricklet", indicating the Tinkerforge bricklet that measures humidity) and the serial number of the component (for example, "nBL"). You can edit the name in the **Info** tab of the device.

#### Barometer, humidity, ambient light, moisture, distance, voltage, current and temperature bricklets

Sensor data can be visualized in the Cumulocity Cockpit application by clicking on the **Data explorer** tab of the RaspPi. Under **Data points** you can select which sensor readings from the Weather Station you wish to display. The display updates in real time to show a graph of the sensor data over a defined period of time (for example, over the last hour). The period of time is selectable via a drop-down box adjacent to the graph.

<!--
![Sensor measurements](/images/device-demos/tinkerforge/tinkerforgemeasurements.png)
-->

The data is regularly collected by the Cumulocity agent on the RaspPi. The frequency of the collection can be configured on the **Configuration** panel of the RaspPi in the **Device management** application of the Cumulocity web interface. Typical entries in the **Configuration** panel are:

````console
c8y.barometer.interval=5000
c8y.log.eventLevel=INFO
c8y.light.interval=5000
c8y.log.alarmLevel=ERROR
c8y.humidity.interval=5000
````

The settings with `.interval` are given in milliseconds. If you want to change any of the settings, change the configuration value accordingly in this display and save your changes. For example, if you change the value of `c8y.light.interval` from 5000 to 10000, the Data Explorer for the RaspPi in the Cockpit will show updated values for the Weather Station's ambient light bricklet every 10 seconds. 

<!-- omitting the PTC bricklet for the updated demo doc 
#### PTC bricklet

![PTC bricklet](/images/device-demos/tinkerforge/ptc.jpg)

In addition to the polling interval, you can also configure the wire mode of the PTC bricklet via the "c8y.ptc.wiremode" option. For more information on wire mode [visit the TinkerForge online documentation](http://www.tinkerforge.com/en/doc/Hardware/Bricklets/PTC.html).
-->


#### LCD Display bricklet

<!--
![LCD 20x4 Display Bricklet](/images/device-demos/tinkerforge/lcd12_20x4.jpg)
-->

To operate the display from Cumulocity, proceed as follows:

1. In the Cockpit, select the RaspPi.
2. Add a dashboard for the RaspPi, if you haven't defined one yet.
3. Click **Add widget**.
4. In the list of available widgets, select **Message sending**. 
5. Click the **Display** asset of the RaspPi. This adds the **Message sending** widget to the dashboard.
6. In the message field of the widget, type a text such as "Hello from Cumulocity", then click **Send**.
7. The text should now appear on the LCD Bricklet of the Weather Station.

Similarly, if you want to toggle the LCD display's backlight on and off, create a **Relay Control** widget, set it up to use the **Display** asset of the RaspPi, and use the on/off setting.

<!-- omitting this for the updated demo doc

![Display usage](/images/device-demos/tinkerforge/tinkerforgedisplay.png)

The display has four buttons at the bottom. Operating these buttons will send an event to Cumulocity which is shown on the **Events** tab. You can process this event, for example, using a CEP statement. The event is of type "c8y\_ButtonPressedEvent". The number of the button is part of the text of the event.

![Events](/images/device-demos/tinkerforge/tinkerforgeevents.png)

-->

<!-- omitting this for the updated demo doc 

#### 4x7 Segment Display bricklet

![4x7 Segment Display bricklet](/images/device-demos/tinkerforge/4x7_segment_display.jpg)

The 4x7 Segment Display's implementation is similar to that of the LCD Display bricklet. In addition you can set the display brightness in the Configuration panel through the "c8y.4x7segmentdisplay.brightness" option (Max: 7, Min: 1, Default: 4).

-->

<!-- omitting this for the updated demo doc 

#### Remote Switch bricklet

![Remote Switch bricklet](/images/device-demos/tinkerforge/remote_switch.jpg)

##### Configuration

The Remote Switch bricklet can be used to toggle on and off various remote sockets, lamps, etc. It supports three types of addressing.

* Type A addressing: To add a predefined type A device to the Remote Switch bricklet, append the following lines to the Configuration panel:

```
c8y.remoteswitch.<device name>.type=A
c8y.remoteswitch.<device name>.houseCode=<house code>
c8y.remoteswitch.<device name>.receiverCode=<receiver code>
```

Where:

&lt;device name&gt; - the name of the device(e.g. socket1, lamp1, etc.)
&lt;house code&gt; - 5-bit integer (0 to 31)
&lt;receiver code&gt; - 5-bit integer (0 to 31)

* Type B addressing: To add a predefined type B device to the Remote Switch bricklet, append the following lines to the Configuration panel:

```
c8y.remoteswitch.<device name>.type=B
c8y.remoteswitch.<device name>.address=<address>
c8y.remoteswitch.<device name>.unit=<unit>
```

Where:

&lt;device name&gt; - the name of the device(e.g. socket1, lamp1, etc.).
&lt;address&gt; - 16-bit integer (0 to 65534)
&lt;unit&gt; - 4-bit integer (0 to 15)

* Type C addressing: To add a predefined type C device to the Remote Switch bricklet, append the following lines to the Configuration panel:

```
c8y.remoteswitch.<device name>.type=C
c8y.remoteswitch.<device name>.systemCode=<system code>
c8y.remoteswitch.<device name>.deviceCode=<device code>
```

Where:

&lt;device name&gt; - the name of the device(e.g. socket1, lamp1, etc.).
&lt;system code&gt; - 4-bit character (A to P)
&lt;device code&gt; - 4-bit integer (0 to 15)

For more information on Remote Switch addressing please refer to the TinkerForge web page http://www.tinkerforge.com/en/doc/Hardware/Bricklets/Remote_Switch.html.

##### Control

The devices can be switched on and off, in alphabetical order, using the c8y_RelayArray operation. "OPEN" would mean off and "CLOSED" - on.

Example: An operation

```json
"c8y_RelayArray" : [
	"OPEN",
	"CLOSED"
]
```

on a Remote Switch bricklet with the following configuration

```
c8y.remotebricklet.device2.type=B
c8y.remotebricklet.device2.address=31337
c8y.remotebricklet.device2.unit=7
c8y.remotebricklet.device1.type=C
c8y.remotebricklet.device1.systemCode=B
c8y.remotebricklet.device1.deviceCode=13
```

will turn off "device2" and turn on "device1".

-->

<!-- omitting this for the updated demo doc 

#### Dual Relay Bricklet

![Dual Relay Bricklet](/images/device-demos/tinkerforge/dual_relay.jpg)

The dual relay bricklet consists of two relays. Each relay has three terminals such that the terminal in the middle is electrically connected to the terminal left or right depending on the relay state.

##### Control

The Dual Relay bricklet can be switched with the c8y_RelayArray operation.

```json
"c8y_RelayArray" : [
	"OPEN",
	"CLOSED"
]
```

For example, the operation above will set the state of relay one to "OPEN" and relay two to "CLOSED".

-->

<!-- omitting this for the updated demo doc 

#### IO16 bricklet

![IO16 Bricklet](/images/device-demos/tinkerforge/io16.jpg)

##### Configuration

The IO16 bricklet consist of two ports 8-pins each. It can be configured through the Configuration panel. Available options are:

```json
	c8y.io16.porta.direction=<direction>
	c8y.io16.porta.value=<value>
	c8y.io16.portb.direction=<direction>
	c8y.io16.portb.value=<value>
```

Where:

* &lt;direction&gt; is an 8-bit integer(0 to 255) direction mask. 0 - output, 1 - input.
* &lt;value&gt; is an 8-bit integer(0 to 255) value mask describing the type of input or the output value respectively. If a pin is set as output 1 and 0 will simply be the logical values. In case the pin is set as input 1 would mean pull up input and 0 would be default input.

For example, configuring port B direction to 192(11000000) and value to 88(01011000), would mean:
* pins B3, B4 are set as output with logical value 1(3,3/5 V)
* pins B0, B1, B2, B5 are set as output with logical value 0(0V)
* pin B6 is set as input with pull up
* pin B7 is set as default input

##### Control

The IO16 outputs can be switched with a c8y_RelayArray operation.

```json
"c8y_RelayArray" : [
	"OPEN",
	"OPEN",
	"CLOSED",
	"OPEN"
]
```

This operation will find up to four outputs starting from A0 to B7 and switch them.

-->

<!-- omitting this for the updated demo doc 

#### Distance InfraRed and UltraSound bricklets

Additionally to providing measurement data, the Distance US and IR bricklets also send events. Similar to a button press on the display, interrupting the sensor of the distance bricklets will send an event. The event can be seen on the "Events" tab of the distance bricklet and can be post-processed with [CEP](/concepts/realtime). The type of the event is "c8y\_EntranceEvent". Additionally the following configuration options are provided:

* c8y.distanceir.eventSlackTime, c8y.distanceus.eventSlackTime - sets the minimum time between events. Time is in ms. Default is 10000ms.
* c8y.distanceir.eventTreshold - sets the minimum distance in mm that would trigger an event.  Default is 400mm;
* c8y.distanceus.eventTreshold - sets the minimum distance in % that would trigger an event. Default is 25%;

Note: The DistanceUS bricklet measures distance in percentages, where 0% would be around 2cm and 100% would be approximately 400cm.  This is because the relation between the distance value and the actual distance depends on the exact value of the 5V supply voltage(deviations in the supply voltage result in deviations in the measured distance values) and is non-linear (resolution is bigger at close range).

-->

<!-- omitting this for the updated demo doc 

#### GPS bricklet

![GPS Bricklet](/images/device-demos/tinkerforge/gps.jpg)

The GPS bricklet will report its current location and send location updates as the device moves. The current location is shown in Device Management on a map and the movement history can be visualized.

![Location](/images/device-demos/tinkerforge/tinkerforgetracing.png)

-->

### Extending the TinkerForge driver

The source code for the TinkerForge driver is publicly available at https://bitbucket.org/m2m/cumulocity-examples in the folder java-agent/tinkerforge-driver.
