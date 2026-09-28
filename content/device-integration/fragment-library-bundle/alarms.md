---
weight: 30
title: Alarms
layout: bundle
sector: 
  - device_management
---

The **Alarm** tab is always shown for all devices. Its content is filled by alarm statuses reported by the device and other sources like analytics or smart rules. Devices raise alarms in {{< product-c8y-iot >}} as they occur. Once the alarm status was resolved the device must also update the status of its created alarm to CLEARED.

### Raising alarms {#raising-alarms}

A device may raise an alarm at any time. Typically alarms are used to communicate problem statuses in the devices environment.

```http
POST /alarm/alarms
```
```json
{
   "source": {
       "id": "4801"
   },
   "type": "c8y_TemperatureAlarm",
   "text": "CPU temperature too high",
   "severity": "MAJOR",
   "time": "2021-10-07T12:00:00.000Z"
}
```

|Field|Data type|Mandatory|Details|
|----|----|----|----|
|source|object|Yes|The ID of the device|
|type|string|Yes|Type of the alarm|
|text|string|Yes|Alarm text, describing the alarm status|
|severity|string|Yes|Alarm severity|
|time|string|Yes|Time of alarm occurrence|

In addition to the required parameters above, the device may also include custom fragments with more details about the alarm status into the alarm.

**SmartREST example**

{{< product-c8y-iot >}} provides several static SmartREST templates for basic alarm management for device. They can be found with message IDs between 301 and 304 for different severities:

`302,c8y_TemperatureAlarm,"CPU temperature too high"`

### Clearing alarms {#clearing-alarms}
When a device detects that the local alarm status was resolved it must clear the alarm. This is done by updating the alarm status to CLEARED.

```http
PUT /alarm/alarms/<alarmId>
```
```json
{
   "status": "CLEARED"
}
```


|Field|Data type|Mandatory|Details|
|----|----|----|----|
|status|string|Yes|The new alarm status|


**SmartREST example**

The 306 static template is provided to clear an active alarm of a specified type:

`306,c8y_TemperatureAlarm`

### Critical alarms {#critical-alarms}

When a device raises an alarm with the severity CRITICAL, the device is considered unavailable for the duration this alarm stays active. The aggregated availability overview in the **Service monitoring** tab will reflect this time as offline.

Devices should use the severity "CRITICAL alarm" only for alarm statuses that impact the device's ability to fulfill its use case.
