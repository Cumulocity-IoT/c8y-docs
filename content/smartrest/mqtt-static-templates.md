---
title: MQTT Static templates
layout: bundle
sector:
  - device_management
weight: 60
---

To ease device integration {{< product-c8y-iot >}} already supports a number of static templates that can be used by any client without the need to create your own templates. These templates focus on the most commonly used messages for device management purposes.

To use the templates listed below, you must publish the messages to the topic <kbd>s/us</kbd> (<kbd>t/us</kbd> for transient processing of published content, <kbd>q/us</kbd> for quiescent processing of published content or <kbd>c/us</kbd> for CEP processing of published content. Refer to [Processing mode](/smartrest/smartrest-one/#processing-mode) for further information.

You must subscribe to the topic <kbd>s/ds</kbd> to receive operations with the static templates.

#### Templates quick reference {#templates-quick-reference}

Click the commands below to see more information on the respective template.
If a parameter is in square brackets, it is optional.

<table>
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<tbody>
<tr>
<td>

<strong><a href="#inventory-templates">Inventory templates</a></strong>
+ <a href="#100">100,createdDeviceName,deviceType</a>
+ <a href="#101">101,createdChildId,childName,childType</a>
+ <a href="#102">102,serviceExternalId,serviceType,serviceName,serviceStatus</a>
+ <a href="#104">104,serviceStatus</a>
+ <a href="#105">105 (Get children, reply: 106,child1,child2,…)</a>
+ <a href="#107">107,fragmenttoBeUninstalled1,fragment2,...</a>
+ <a href="#110">110,serialNumber,hardwareModel,revision</a>
+ <a href="#111">111,IMEI,ICCID,IMSI,MCC,MNC,LAC,cellId</a>
+ <a href="#112">112,latitude,longitude,altitude,accuracy</a>
+ <a href="#113">113,&quot;configProp1=val1\nprop2=val2\n…&quot;</a>
+ <a href="#114">114,supportedOperation1,operation2,…</a>
+ <a href="#115">115,currentFirmwareName,version,url</a>
+ <a href="#116">116,currentSoftwareName1,version1,url1,name2,…</a>
+ <a href="#117">117,requiredInterval</a>
+ <a href="#118">118,supportedLog1,log2,...</a>
+ <a href="#119">119,supportedConfiguration1,config2,...</a>
+ <a href="#120">120,configType,url,filename[,time]</a>
+ <a href="#121">121,profileExecuted,profileID</a>
+ <a href="#122">122,agentName,agentVersion,agentURL,agentMaintainer</a>
+ <a href="#123">123 (Retrieve the internal ID, reply: "124,id")</a>
+ <a href="#125">125 (send heartbeat)</a>
+ <a href="#140">140,setAdvancedSWName1,AdvancedSWVersion1,AdvancedSWType1,AdvancedSWurl1,sw2,ver2,type2,url2,...</a>
+ <a href="#141">141,appendAdvancedSWName1,AdvancedSWVersion1,AdvancedSWType1,AdvancedSWurl1,sw2,ver2,type2,url2,...</a>
+ <a href="#142">142,deleteAdvancedSWname1,AdvancedSWVersion1,sw2,ver2,...</a>
+ <a href="#143">143,supportedSoftwareType1,supportedSoftwareType2,...</a>

<strong><a href="#measurement-templates">Measurement templates</a></strong>
+ <a href="#200">200,fragment,series,value[,unit,time]</a>
+ <a href="#201">201,type,[time],fragment1,series1,value1,[unit1],...</a>
+ <a href="#210">210,rssi,ber[,time]</a>
+ <a href="#211">211,temperature[,time]</a>
+ <a href="#212">212,battery[,time]</a>

<strong><a href="#alarm-templates">Alarm templates</a></strong>
+ <a href="#301">301,criticalAlarmType[,text][,time]</a>
+ <a href="#302">302,majorAlarmType[,text][,time]</a>
+ <a href="#303">303,minorAlarmType[,text][,time]</a>
+ <a href="#304">304,warningAlarmType[,text][,time]</a>
+ <a href="#305">305,alarmType,newSeverity</a>
+ <a href="#306">306,alarmTypeToBeCleared</a>
+ <a href="#307">307,alarmType,fragmentToBeRemoved1,fragment2,...</a>

</td>
<td>

<strong><a href="#event-templates">Event templates</a></strong>
+ <a href="#400">400,eventType,text[,time]</a>
+ <a href="#401">401,latitude,longitude,altitude,accuracy[,time]</a>
+ <a href="#402">402,latitude,longitude,altitude,accuracy[,time] (incl. inv. update)</a>
+ <a href="#407">407,eventType,fragmentToBeRemoved1,fragment2,...</a>

<strong><a href="#operation-templates">Operation templates</a></strong>
+ <a href="#500">500 (get pending)</a>
+ <a href="#501">501,typeToSetToExecuting</a>
+ <a href="#502">502,typeToSetToFailed,failureReason</a>
+ <a href="#503">503,typeToSetToSuccessful,parameters</a>
+ <a href="#504">504,operationId</a>
+ <a href="#505">505,operationId,failureReason</a>
+ <a href="#506">506,operationId,parameters</a>
+ <a href="#507">507,typeToSetToExecuting,failureReason</a>
+ <a href="#510">510,serial (restart)</a>
+ <a href="#511">511,serial,commandToExecute</a>
+ <a href="#513">513,serial,configurationText</a>
+ <a href="#515">515,serial,firmwareToBeInstalled,version,url</a>
+ <a href="#516">516,serial,softwareToBeInstalled1,version1,url1,sw2,ver2,url2,...</a>
+ <a href="#517">517,serial,measurementToBeSent</a>
+ <a href="#518">518,serial,relayStatusToBeSet [OPEN/CLOSED]</a>
+ <a href="#519">519,serial,relay1Status,relay2Status,...</a>
+ <a href="#520">520,serial (upload your current configuration)</a>
+ <a href="#521">521,serial,url (download configuration)</a>
+ <a href="#522">522,serial,logFileToBeSend,start,stop,searchText,maxLines</a>
+ <a href="#523">523,serial,communicationMode (SMS/IP)</a>
+ <a href="#524">524,serial,url,configType</a>
+ <a href="#525">525,serial,currentFirmwareName,version,url,dependency</a>
+ <a href="#526">526,serial,configType</a>
+ <a href="#527">527,serial,firmwareMarker,name,version,url,isPatch,dependency,softwareMarker,name,version,url,action,configurationMarker,url,type</a>
+ <a href="#528">528,serial,softwareToBeUpdated1,version1,url1,action1,sw2,ver2,url2,action2,...</a>
+ <a href="#529">529,serial,softwareToBeUpdated1,version1,type1,url1,action1,sw2,ver2,type2,url2,action2,...</a>
+ <a href="#530">530,serial,hostname,port,connectionKey</a>

</td>
</tr>
</tbody>
</table>

The client can receive the following templates when subscribing to <kbd>s/ds</kbd>.

<table>
<colgroup>
<col style="width: 100%;">
</colgroup>
<tbody>
<tr>
<td>

**[Inventory templates](#subscribe-inventory)**

+ [106,child1,child2,…](#106)
+ [124,id](#124)

**[Operation templates](#subscribe-operations)**

+ [510,serial (restart)](#510)
+ [511,serial,commandToExecute](#511)
+ [513,serial,configurationText](#513)
+ [515,serial,firmwareToBeInstalled,version,url](#515)
+ [516,serial,softwareToBeInstalled1,version1,url1,sw2,ver2,url2,...](#516)
+ [517,serial,measurementToBeSent](#517)
+ [518,serial,relayStatusToBeSet [OPEN/CLOSED]](#518)
+ [519,serial,relay1Status,relay2Status,...](#519)
+ [520,serial (upload your current configuration)](#520)
+ [521,serial,url (download configuration)](#521)
+ [522,serial,logFileToBeSend,start,stop,searchText,maxLines](#522)
+ [523,serial,communicationMode (SMS/IP)](#523)
+ [524,serial,url,configType](#524)
+ [525,serial,currentFirmwareName,version,url,dependency](#525)
+ [526,serial,configType](#526)
+ [527,serial,firmwareMarker,name,version,url,isPatch,dependency,softwareMarker,name,version,url,action,configurationMarker,url,type](#527)
+ [528,serial,softwareToBeUpdated1,version1,url1,action1,sw2,ver2,url2,action2,...](#528)
+ [529,serial,softwareToBeUpdated1,version1,type1,url1,action1,sw2,ver2,type2,url2,action2,...](#529)
+ [530,serial,hostname,port,connectionKey](#530)

</td>
</tr>
</tbody>
</table>

### Automatic device creation {#automatic-device-creation}

The topic for static templates supports an automatic creation of devices. Whenever there is no child associated with your MQTT ClientID and you send data, {{< product-c8y-iot >}} will automatically create a device for the MQTT ClientID. If you want to create the device on your own, your first message must be the device creation. In this case {{< product-c8y-iot >}} will create the device from the template.

The automatic creation of devices is also supported for 1st level child devices. For child devices on a deeper level, you must use the template for creating a child device by sending it to the topic of the child device under the one you want to place the new child.


### Handling non-mandatory parameters {#handling-non-mandatory-parameters}

If a parameter is not declared as mandatory, the client can send an empty string in that place.

```text
100,,myType
```

Tailing commas is not required. The two lines below result in the same message.

```text
100,,
100
```


### Publish templates {#publish-templates}

The following templates can be used to publish data on the topics <kbd>s/us</kbd> as well as <kbd>t/us</kbd>. Refer to [Processing mode](/smartrest/smartrest-one/#processing-mode) for more information about the <kbd>t/</kbd> topic for transient data processing.

#### Inventory templates (1xx) {#inventory-templates}

##### Device creation (100) {#100}

Create a new device for the serial number in the inventory if not yet existing. An externalId for the device with type `c8y_Serial` and the device identifier of the MQTT clientId as value will be created.

|Position|Parameter  |Mandatory|Type  |Default value|
|:-------|:----------|:--------|:-----|:------------|
|1|device name|NO|String|MQTT Device &lt;serialNumber&gt;|
|2|device type|NO|String|c8y_MQTTDevice|

**Example**

```text
100,myDevice,myType
```

##### Child device creation (101) {#101}

Create a new child device for the current device. The newly created object will be added as child device. Additionally, an externaId for the child will be created with type `c8y_Serial` and the value a combination of the serial of the root device and the unique child ID.

|Position|Parameter|Mandatory|Type    |Default value|
|:-------|:--------|:--------|:-------|:------------|
|1|unique child ID|YES|String| &nbsp; |
|2|device name|NO|String|MQTT Device &lt;serialNumber&gt;|
|3|device type|NO|String|c8y_MQTTChildDevice|

**Example**

```text
101,uniqueChildId,myChildDevice,myChildType
```

##### Service creation (102) {#102}

Create a new software service for given device.

|Position|Parameter  |Mandatory|Type  |
|:-------|:----------|:--------|:-----|
|1|service unique external id|YES|String|
|2|service type|YES|String|
|3|service name|YES|String|
|4|service status|YES|String|

**Example**

```text
102,myDatabaseDevice,systemd,DatabaseService,up
```

##### Service status update (104) {#104}

Set a status for given software service.

|Position|Parameter  |Mandatory|Type  |
|:-------|:----------|:--------|:-----|
|1|service status|YES|String|

**Example**

```text
104,up
```

##### Get child devices (105) {#105}

Trigger the sending of child devices of the device.

**Example**

```text
105
```

##### Clear device's fragment (107) {#107}

Remove one or more fragments from a device.

|Position|Parameter|Mandatory|Type |
|:-------|:--------|:--------|:----|
|1...|fragmentName|YES|String|

**Example**

```text
107,c8y_Position,c8y_Configuration
```

##### Configure Hardware (110) {#110}

Update the hardware properties of the device.

|Position|Parameter|Mandatory|Type|
|:-------|:-------|:-------|:---|
|1|serialNumber|NO|String|
|2|model|NO|String|
|3|revision|NO|String|

**Example**

```text
110,1234567890,myModel,1.2.3
```

##### Configure Mobile (111) {#111}

Update the mobile properties of the device.

|Position|Parameter|Mandatory|Type|
|:-------|:-------|:-------|:----|
|1|imei|NO|String|
|2|iccid|NO|String|
|3|imsi|NO|String|
|4|mcc|NO|String|
|5|mnc|NO|String|
|6|lac|NO|String|
|7|cellId|NO|String|

**Example**

```text
111,1234567890,,54353
```

##### Configure Position (112) {#112}

Update the position properties of the device.

|Position|Parameter|Mandatory|Type|
|:-------|:-------|:-------|:---|
|1|latitude|NO|Number|
|2|longitude|NO|Number|
|3|altitude|NO|Number|
|4|accuracy|NO|Integer|

**Example**

```text
112,50.323423,6.423423
```

##### Set Configuration (113) {#113}

Update the configuration properties of the device.

|Position|Parameter|Mandatory|Type|
|:-------|:-------|:-------|:---|
|1|configuration|NO|String|

Example

```text
113,"val1=1\nval2=2"
```

##### Set supported operations (114) {#114}

Set the supported operations of the device.

|Position|Parameter|Mandatory|Type|
|:-------|:-------|:-------|:---|
|1...|List of supported operations|NO|String|

**Example**

```text
114,c8y_Restart,c8y_Configuration,c8y_SoftwareList
```

{{< c8y-admon-info >}}
If you want to remove an item from the supported operations list, send a new 114 request with the updated list, for example, `114, c8y_Restart,c8y_Configuration` in order to remove `c8y_SoftwareList` after the request from the example above.
{{< /c8y-admon-info >}}

##### Set firmware (115) {#115}

Set the firmware installed on the device.

|Position|Parameter|Mandatory|Type|
|:-------|:-------|:-------|:---|
|1|name|NO|String|
|2|version|NO|String|
|3|url|NO|String|

**Example**

```text
115,firmwareName,firmwareVersion,firmwareUrl
```

##### Set software list (116) {#116}

Set the list of software installed on the device.

|Position|Parameter|Mandatory|Type|
|:-------|:-------|:-------|:---|
|1...|List of 3 values per software|NO|(n/a)|
|1.1|name|NO|String|
|1.2|version|NO|String|
|1.3|url|NO|String|

**Example**

```text
116,software1,version1,url1,software2,,url2,software3,version3
```

##### Set required availability (117) {#117}

Set the required interval for availability monitoring as an integer value representing minutes.
For more information, see *c8y_RequiredAvailability* in [Device availability](/device-integration/fragment-library/#device-availability).
This will only set the value if it does not exist. Values entered, for example, through the UI, are not overwritten.

|Position|Parameter|Mandatory|Type|
|:-------|:-------|:-------|:---|
|1|Required interval|NO|Integer|

**Example**

```text
117,60
```

##### Set supported logs (118) {#118}

Set the supported logs of the device.

|Position|Parameter|Mandatory|Type|
|:-------|:-------|:-------|:---|
|1...|List of supported logs|NO|String|

**Example**

```text
118,ntcagent,dmesg,logread
```

##### Set supported configurations (119) {#119}

Set the supported configurations of the device.

|Position|Parameter|Mandatory|Type|
|:-------|:-------|:-------|:---|
|1...|List of supported configurations|NO|String|

**Example**

```text
119,modbus,system
```

##### Set currently installed configuration (120) {#120}

Set currently installed configuration of the device.

|Position|Parameter|Mandatory|Type|Default value|
|:-------|:-------|:-------|:-------|:---|
|1|Configuration type|YES|String| &nbsp;|
|2|Configuration file download URL|YES|String| &nbsp;|
|3|File name|NO|String|Configuration type|
|4|Date and time when the configuration was applied|NO|Date|Current date and time|

**Example**

```text
120,myType,http://www.my.url,config.bin,2020-07-22T17:03:14.000+02:00
```

##### Set device profile that is being applied (121) {#121}

Set device profile that is being applied to the device.

|Position|Parameter|Mandatory|Type|Default value|
|:-------|:-------|:-------|:-------|:---|
|1|Profile executed|YES|String| &nbsp;|
|2|Profile ID|NO|String|Profile ID from the oldest EXECUTING device profile operation|

**Example**

```text
121,true,8473
```

##### Set device agent information (122) {#122}

Allows a device to provide information about the agent running on it.

| Position | Parameter              | Mandatory | Type   | Default value |
|:---------|:-----------------------|:----------|:-------|:--------------|
| 1        | Name of the agent      | YES       | String |               |
| 2        | Version of the agent   | YES       | String |               |
| 3        | The agent URL          | NO        | String |               |
| 4        | Maintainer of the agent| YES       | String |               |

**Example**

```text
122,thin-edge.io,0.6,https://thin-edge.io,Cumulocity
```

##### Send heartbeat (125) {#125}

Sends a heartbeat from the device to update its availability status.

**Example**

```text
125
```

##### Set advanced software list (140) {#140}

Sets the list of advanced software installed on the device. Any existing list will be overwritten.

| Position | Parameter               | Mandatory | Type   | Default value |
|:---------|:------------------------|:----------|:-------|:--------------|
| 1        | Name of the software    | YES       | String |               |
| 2        | Version of the software | YES       | String |               |
| 3        | Type of the software    | NO        | String |               |
| 4        | URL of the software     | NO        | String |               |

**Example**

```text
140,docker,3.2.1,systemd,https://www.docker.com/,nginx,1.6,container,https://www.nginx.com/
```

##### Get the device managed object ID (123) {#123}

Retrieve the ID of the device managed object.

**Example**

```text
123
```

##### Append advanced software items (141) {#141}

Appends advanced software items to the list that exists for the device.

| Position | Parameter               | Mandatory | Type   | Default value |
|:---------|:------------------------|:----------|:-------|:--------------|
| 1        | Name of the software    | YES       | String |               |
| 2        | Version of the software | YES       | String |               |
| 3        | Type of the software    | NO        | String |               |
| 4        | URL of the software     | NO        | String |               |

**Example**

```text
141,docker,3.2.1,systemd,https://www.docker.com/,nginx,1.6,container,https://www.nginx.com/
```

##### Remove advanced software items (142) {#142}

Removes advanced software items from the list that exists for the device.

| Position | Parameter               | Mandatory | Type   | Default value |
|:---------|:------------------------|:----------|:-------|:--------------|
| 1        | Name of the software    | YES       | String |               |
| 2        | Version of the software | YES       | String |               |

**Example**

```text
142,docker,3.2.1,nginx,1.6
```

##### Set supported software types (143) {#143}

Set the supported software types of the device. Ignores empty elements. An empty list removes the `c8y_SupportedSoftwareTypes` fragment entirely.

|Position|Parameter|Mandatory|Type|
|:-------|:-------|:-------|:---|
|1...|List of supported software types|NO|String|

**Example**

```text
143,yum,docker
```

#### Measurement templates (2xx) {#measurement-templates}

##### Create custom measurement (200) {#200}

Create a measurement with a given fragment and series.

|Position|Parameter|Mandatory|Type|Default value|
|:-------|:-------|:-------|:-------|:---|
|1|fragment|YES|String| &nbsp;|
|2|series|YES|String| &nbsp;|
|3|value|YES|Number| &nbsp;|
|4|unit|NO|String| &nbsp;|
|5|time|NO|Date|Current server time|

**Example**

```text
200,c8y_Temperature,T,25
```

##### Create a custom measurement with multiple fragments and series (201) {#201}

Create a measurement with multiple fragments and series.

|Position|Parameter|Mandatory|Type|Default value|
|:-------|:-------|:-------|:-------|:---|
|1|type|YES|String| &nbsp;|
|2|time|NO|Date| &nbsp;|
|3|List of 4 values per fragment-series combination|YES|(n/a)| &nbsp;|
|3.1|fragment|YES|String| &nbsp;|
|3.2|series|YES|String| &nbsp;|
|3.3|value|YES|Number| &nbsp;|
|3.4|unit|NO|String| &nbsp;|

**Example**

```text
201,KamstrupA220Reading,2022-03-19T12:03:27.845Z,c8y_SinglePhaseEnergyMeasurement,A+:1,1234,kWh,c8y_SinglePhaseEnergyMeasurement,A-:1,2345,kWh,c8y_ThreePhaseEnergyMeasurement,A+:1,123,kWh,c8y_ThreePhaseEnergyMeasurement,A+:2,234,kWh,c8y_ThreePhaseEnergyMeasurement,A+:3,345,kWh
```

##### Create signal strength measurement (210) {#210}

Create a measurement of type `c8y_SignalStrength`.

|Position|Parameter|Mandatory|Type|Default value|
|:-------|:-------|:-------|:-------|:---|
|1|rssi value|YES, if 2 not set|Number| &nbsp;|
|2|ber value|YES, if 1 not set|Number| &nbsp;|
|3|time|NO|Date|Current server time|

**Example**

```text
210,-90,23,2016-06-22T17:03:14.000+02:00
```

##### Create temperature measurement (211) {#211}

Create a measurement of type `c8y_TemperatureMeasurement`.

|Position|Parameter|Mandatory|Type|Default value|
|:-------|:-------|:-------|:-------|:---|
|1|temperature value|YES|Number| &nbsp;|
|2|time|NO|Date|Current server time|

**Example**

```text
211,25,2016-06-22T17:03:14.000+02:00
```

##### Create battery measurement (212) {#212}

Create a measurement of type `c8y_Battery`.

|Position|Parameter|Mandatory|Type|Default value|
|:-------|:-------|:-------|:-------|:---|
|1|battery value|YES|Number| &nbsp;|
|2|time|NO|Date|Current server time|

**Example**

```text
212,95,2016-06-22T17:03:14.000+02:00
```

#### Alarm templates (3xx) {#alarm-templates}

##### Create CRITICAL alarm (301) {#301}

Create a CRITICAL alarm.

|Position|Parameter|Mandatory|Type|Default value|
|:-------|:-------|:-------|:-------|:---|
|1|type|YES|String| &nbsp;|
|2|text|NO|String|Alarm of type **alarmType** raised|
|3|time|NO|Date|Current server time|

**Example**

```text
301,c8y_TemperatureAlarm
```

##### Create MAJOR alarm (302) {#302}

Create a MAJOR alarm.

|Position|Parameter|Mandatory|Type|Default value|
|:-------|:-------|:-------|:-------|:---|
|1|type|YES|String| &nbsp;|
|2|text|NO|String|Alarm of type **alarmType** raised|
|3|time|NO|Date|Current server time|

**Example**

```text
302,c8y_TemperatureAlarm,"This is an alarm"
```

##### Create MINOR alarm (303) {#303}

Create a MINOR alarm.

|Position|Parameter|Mandatory|Type|Default value|
|:-------|:-------|:-------|:-------|:---|
|1|type|YES|String| &nbsp;|
|2|text|NO|String|Alarm of type **alarmType** raised|
|3|time|NO|Date|Current server time|

**Example**

```text
303,c8y_TemperatureAlarm
```

##### Create WARNING alarm (304) {#304}

Create a WARNING alarm.

|Position|Parameter|Mandatory|Type|Default value|
|:-------|:-------|:-------|:-------|:---|
|1|type|YES|String| &nbsp;|
|2|text|NO|String|Alarm of type **alarmType** raised|
|3|time|NO|Date|Current server time|

**Example**

```text
304,c8y_TemperatureAlarm,,2013-06-22T17:03:14.000+02:00
```

##### Update severity of existing alarm (305) {#305}

Change the severity of an existing alarm.

|Position|Parameter|Mandatory|Type|
|:-------|:-------|:-------|:---|
|1|type|YES|String|
|2|severity|YES|String|

**Example**

```text
305,c8y_TemperatureAlarm,CRITICAL
```

##### Clear existing alarm (306) {#306}

Clear an existing alarm.

|Position|Parameter|Mandatory|Type|
|:-------|:-------|:-------|:---|
|1|type|YES|String|

**Example**

```text
306,c8y_TemperatureAlarm
```

##### Clear alarm's fragment (307) {#307}

Remove one or more fragments from an alarm of a specific type.

|Position|Parameter|Mandatory|Type|
|:-------|:-------|:-------|:---|
|1|alarmType|YES|String|
|2...|fragmentName|YES|String|

**Example**

```text
307,c8y_TemperatureAlarm,c8y_Position,c8y_Configuration
```

#### Event templates (4xx) {#event-templates}

##### Create basic event (400) {#400}

Create an event of given type and text.

|Position|Parameter|Mandatory|Type|Default value|
|:-------|:-------|:-------|:-------|:---|
|1|type|YES|String|&nbsp;|
|2|text|YES|String|&nbsp;|
|3|time|NO|Date|Current server time|

**Example**

```text
400,c8y_MyEvent,"Something was triggered"
```

##### Create location update event (401) {#401}

Create typical location update event containing `c8y_Position`.

|Position|Parameter|Mandatory|Type|Default value|
|:-------|:-------|:-------|:-------|:---|
|1|latitude|NO|Number|&nbsp;|
|2|longitude|NO|Number|&nbsp;|
|3|altitude|NO|Number|&nbsp;|
|4|accuracy|NO|Number|&nbsp;|
|5|time|NO|Date|Current server time|

**Example**

```text
401,51.151977,6.95173,67
```

##### Create location update event with device update (402) {#402}

Create typical location update event containing `c8y_Position`. Additionally the device will be updated with the same `c8y_Position` fragment.

|Position|Parameter|Mandatory|Type|Default value|
|:-------|:-------|:-------|:-------|:---|
|1|latitude|NO|Number|&nbsp;|
|2|longitude|NO|Number|&nbsp;|
|3|altitude|NO|Number|&nbsp;|
|4|accuracy|NO|Number|&nbsp;|
|5|time|NO|Date|Current server time|

**Example**

```text
402,51.151977,6.95173,67
```

##### Clear event's fragment (407) {#407}

Remove one or more fragments from an event of a specific type.

|Position|Parameter|Mandatory|Type|
|:-------|:-------|:-------|:---|
|1|eventType|YES|String|
|2...|fragmentName|NO|String|

**Example**

```text
407,c8y_MyEvent,c8y_Position,c8y_Configuration
```

#### Operation templates (5xx) {#operation-templates}

##### Get PENDING operations (500) {#500}

Trigger the sending of all PENDING operations for the agent.

**Example**

```text
500
```

##### Set operation to EXECUTING (501) {#501}

Set the oldest PENDING operation with given fragment to EXECUTING.

|Position|Parameter|Mandatory|Type|
|:-------|:-------|:-------|:---|
|1|fragment|YES|String|

**Example**

```text
501,c8y_Restart
```

##### Set operation to FAILED (502) {#502}

Set the oldest EXECUTING operation with given fragment to FAILED.

|Position|Parameter|Mandatory|Type|
|:-------|:-------|:-------|:---|
|1|fragment|YES|String|
|2|failureReason|NO|String|

**Example**

```text
502,c8y_Restart,"Could not restart"
```

##### Set operation to SUCCESSFUL (503) {#503}

Set the oldest EXECUTING operation with given fragment to SUCCESSFUL.

It enables the device to send additional parameters that trigger additional steps based on the type of operation sent as fragment (see Section [Updating operations](#updating-operations)).

|Position|Parameter|Mandatory|Type|
|:-------|:-------|:-------|:---|
|1|fragment|YES|String|
|2...|parameters|NO|String|

**Example**

```text
503,c8y_Restart
```

##### Set operation to EXECUTING (504) {#504}

Set the operation with the given ID to EXECUTING. The operation must exist and must have the requesting device as the source.

|Position|Parameter|Mandatory|Type|
|:-------|:-------|:-------|:---|
|1|operationId|YES|String|

**Example**

```text
504,123
```

##### Set operation to FAILED (505) {#505}

Set the operation with the given ID to FAILED. The operation must exist and must have the requesting device as the source.

|Position|Parameter|Mandatory|Type|
|:-------|:-------|:-------|:---|
|1|operationId|YES|String|
|2|failureReason|NO|String|

**Example**

```text
505,123,"Could not restart"
```

##### Set operation to SUCCESSFUL (506) {#506}

Set the operation with given ID to SUCCESSFUL. The operation must exist and must have the requesting device as the source.

This may let the device send additional parameters that trigger further steps based on the type of the operation, also see [Updating operations](#updating-operations).

|Position|Parameter|Mandatory|Type|
|:-------|:-------|:-------|:---|
|1|operationId|YES|String|
|2...|parameters|NO|String|

**Example**

```text
506,123
```

##### Set EXECUTING operations to FAILED (507) {#507}

Set EXECUTING operations with a given fragment to FAILED.
If the fragment parameter is empty, all EXECUTING operations are set to FAILED.

|Position|Parameter|Mandatory|Type|
|:-------|:-------|:-------|:---|
|1|fragment|NO|String|
|2|failureReason|NO|String|

**Example**

```text
507,c8y_Restart,"Unexpected device restart"
```

### Subscribe templates {#subscribe-templates}

#### Inventory templates (1xx) {#inventory-templates-1xx}

##### Get children of device (106) {#106}

List all children of the device.

|Position|Parameter|Type|
|:-------|:-------|:---|
|1...|child|String|

**Example**

```text
106,child1,child2,child3
```

##### Get the device managed object ID (124) {#124}

Retrieve the ID of the device managed object.

|Position|Parameter|Type|
|:-------|:-------|:---|
|1|id|String|

**Example**

```text
124,12345
```

#### Operation templates (5xx) {#subscribe-operations}

All operation responses have the same base structure, leading with the message ID and followed by the ID of either the root device or a child which should handle the operation.

##### Restart (510) {#510}

Restart a device.

**Example**

```text
510,DeviceSerial
```

##### Command (511) {#511}

Run the command being sent in the operation.

|Position|Parameter|Type|
|:-------|:-------|:---|
|1|Command text|String|

**Example**

```text
511,DeviceSerial,execute this
```

##### Configuration (513) {#513}

Set the configuration being sent in the operation.

|Position|Parameter|Type|
|:-------|:-------|:---|
|1|configuration|String|

**Example**

```text
513,DeviceSerial,"val1=1\nval2=2"
```

##### Firmware (515) {#515}

Install the firmware from the url.

|Position|Parameter|Type|
|:-------|:-------|:---|
|1|firmware name|String|
|2|firmware version|String|
|3|url|String|

**Example**

```text
515,DeviceSerial,myFirmware,1.0,http://www.my.url
```

##### Software list (516) {#516}

Install the software sent in the operation.

|Position|Parameter|Type|
|:-------|:-------|:---|
|1...|List of 3 values per software|(n/a)|
|1.1|name|String|
|1.2|version|String|
|1.3|url|String|

**Example**

```text
516,DeviceSerial,softwareA,1.0,url1,softwareB,2.0,url2
```

##### Measurement request operation (517) {#517}

Send the measurements specified by the request name.

|Position|Parameter|Type|
|:-------|:-------|:---|
|1|request name|String|

**Example**

```text
517,DeviceSerial,LOGA
```

##### Relay (518) {#518}

Open or close the relay.

|Position|Parameter|Type|
|:-------|:-------|:---|
|1|Relay state|String|

**Example**

```text
518,DeviceSerial,OPEN
```

##### RelayArray (519) {#519}

Open or close the relays in the array.

|Position|Parameter|Type|
|:-------|:-------|:---|
|1...|List of relay state|String|

**Example**

```text
519,DeviceSerial,OPEN,CLOSE,CLOSE,OPEN
```

##### Upload configuration file (520) {#520}

Upload the current configuration to {{< product-c8y-iot >}}.

**Example**

```text
520,DeviceSerial
```

##### Download configuration file (521) {#521}

Download a configuration file from the URL.

|Position|Parameter|Type|
|:-------|:-------|:---|
|1|url|String|

**Example**

```text
521,DeviceSerial,http://www.my.url
```

##### Logfile request (522) {#522}

Upload a log file for the given parameters.

|Position|Parameter|Type|
|:-------|:-------|:---|
|1|Log file name|String|
|2|Start date|Date|
|3|End date|Date|
|4|Search text|String|
|5|Maximum lines|Integer|

**Example**

```text
522,DeviceSerial,logfileA,2013-06-22T17:03:14.000+02:00,2013-06-22T18:03:14.000+02:00,ERROR,1000
```

##### Communication mode (523) {#523}

Change the communication mode.

|Position|Parameter|Type|
|:-------|:-------|:---|
|1|mode|String|

**Example**

```text
523,DeviceSerial,SMS
```

##### Download configuration file with type (524) {#524}

Download a configuration file from the URL with type.

|Position|Parameter|Type|
|:-------|:-------|:---|
|1|URL|String|
|2|configuration type|String|

**Example**

```text
524,DeviceSerial,http://www.my.url,type
```

##### Firmware from patch (525) {#525}

Install the firmware from the patch.

|Position|Parameter|Type|
|:-------|:-------|:---|
|1|firmware name|String|
|2|firmware version|String|
|3|URL|String|
|4|dependency|String|

**Example**

```text
525,DeviceSerial,firmwareName,1.0,http://www.my.url,dependency
```

##### Upload configuration file with type (526) {#526}

Configuration is uploaded from {{< product-c8y-iot >}} to the device with type.

Position|Parameter|Type|
|:-------|:-------|:---|
|1|configuration type|String|

**Example**

```text
526,DeviceSerial,type
```

##### Set device profiles (527) {#527}

Set the device profiles

|Position|Parameter|Type|
|:-------|:-------|:---|
|1|firmware marker|(n/a)|
|1...| 5 values of firmware|(n/a)|
|1.1|firmware name|String|
|1.2|firmware version|String|
|1.3|firmware URL|String|
|1.4|firmware isPatch|String|
|1.5|firmware dependency|String|
|2|software marker|(n/a)|
|2...|List of 4 values per software|(n/a)|
|2.1|software name|String|
|2.2|software version|String|
|2.3|software URL|String|
|2.4|software action|String|
|3|configuration marker|(n/a)|
|3...|List of 2 values per configuration|(n/a)|
|3.1|configuration URL|String|
|3.2|configuration type|String|

**Example**

```text
527,DeviceSerial,$FW,firmwareName,1.0,http://www.my.url,true,dependency,$SW,softwareA,1.0,http://www.my.url1,action1,softwareB,2.0,http://www.my.url2,action2,$CONF,http://www.my.url1,type1,http://www.my.url2,type2
```

##### Update software (528) {#528}

Update the software installed on the device.


|Position|Parameter|Type|
|:-------|:-------|:---|
|1...|List of 4 values per software|(n/a)|
|1.1|name|String|
|1.2|version|String|
|1.3|URL|String|
|1.4|action|String|

**Example**

```text
528,DeviceSerial,softwareA,1.0,url1,install,softwareB,2.0,url2,install
```

{{< c8y-admon-info >}}
The action can either be `install` or `delete`.

When the `install` action is received, the device agent ensures that the software will appear in the `c8y_SoftwareList` fragment of the device after it has completed the installation.
The agent will also determine if there is a previous version of the software and replace it with the new version, resulting in an update.

When the `delete` action is received, the device agent ensures that the software will no longer appear in the `c8y_SoftwareList` fragment of the device after the software update operation has completed.
{{< /c8y-admon-info >}}

##### Update advanced software (529) {#529}

Update the software installed on the device.


| Position | Parameter                     | Type   |
|:---------|:------------------------------|:-------|
| 1...     | List of 5 values per software | (n/a)  |
| 1.1      | name                          | String |
| 1.2      | version                       | String |
| 1.3      | type                          | String |
| 1.4      | URL                           | String |
| 1.5      | action to be performed        | String |

**Example**

```text
529,DeviceSerial,softwareA,1.0,url1,install,softwareB,2.0,url2,install
```


##### Cloud Remote Access connect (530) {#530}

Establish tunneling by Remote Access device agent.

|Position|Parameter|Type|
|:-------|:-------|:---|
|1|hostname|String|
|2|port|Integer|
|3|connection key|String|

**Example**

```text
530,DeviceSerial,10.0.0.67,22,eb5e9d13-1caa-486b-bdda-130ca0d87df8
```

### Updating operations {#updating-operations}

When using the template to set an operation to status SUCCESSFUL, it supports sending additional parameters to trigger additional calls on the server.
The table below shows the operations supporting this feature and what will be done with the parameters.

<table>
<colgroup>
  <col width="25%">
  <col width="20%">
  <col width="55%">
</colgroup>
<thead>
<tr>
<th style="text-align:left">Fragment</th>
<th style="text-align:left">Parameters</th>
<th style="text-align:left">Action triggered</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">c8y_Command</td>
<td style="text-align:left">result</td>
<td style="text-align:left">Result will be added to operation</td>
</tr>
<tr>
<td style="text-align:left">c8y_RelayArray</td>
<td style="text-align:left">relay states</td>
<td style="text-align:left">Device object will be updated with the states</td>
</tr>
<tr>
<td style="text-align:left">c8y_CommunicationMode</td>
<td style="text-align:left">no parameter needed</td>
<td style="text-align:left">Device object will be updated with the mode</td>
</tr>
<tr>
<td style="text-align:left">c8y_LogfileRequest</td>
<td style="text-align:left">file url</td>
<td style="text-align:left">File url will be added to operation</td>
</tr>
<tr>
<td style="text-align:left">c8y_DownloadConfigFile</td>
<td style="text-align:left">(optional) timestamp</td>
<td style="text-align:left">Device object will be updated with the ID of the configuration dump and the timestamp (or server time)</td>
</tr>
</tbody>
</table>
