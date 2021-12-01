---
weight: 160
title: Tracking
layout: redirect
---

Tracking tab allows the device's path to be visualized. To achieve that the device must periodically send tracking events and update its position.

### Tracking position history

A device may upload its current or past positions as location updated events with the *c8y_Position* fragment. This is useful for tracking devices on a route or generally tracing the location history of devices.

<table>
<colgroup>
<col width="25%">
<col width="75%">
</colgroup>
<tbody>
<tr>
<td style="text-align:center" colspan="2" rowspan="1"> &#x1f4f1;&#10145; &#65039; create event &#10145;&#65039; &#9729;&#65039;</td>
</tr>
<tr>
<td style="text-align:center"> <b>POST</b>
</td>
<td style="text-align:center"> <em>/event/events</em>
</td>
</tr>
</tbody>
</table>

```
{
    "c8y_Position": {
    	"alt": 67,
      	"lng": 6.95173,
      	"lat": 51.151977
    },
    "time":"2013-06-22T17:03:14.000+02:00",
    "source": {
    	"id":"10300"
     },
    "type": "c8y_LocationUpdate",
    "text": "LocUpdate"
}
```

<table>
<colgroup>
<col width="20%">
<col width="10%">
<col width="10%">
<col width="60%">
</colgroup>
<thead>
<tr>
<th>Field</th>
<th>DataType</th>
<th>Mandatory</th>
<th>Details</th>
</tr>
</thead>
<tbody>
<tr>
<td>c8y_Position</td>
<td>Object</td>
<td>Yes</td>
<td>Holds geographical location properties</td>
</tr>
<tr>
<td>c8y_Position.alt</td>
<td>number</td>
<td>No</td>
<td>Optional altitude of the device position in meters</td>
</tr>
<tr>
<td>c8y_Position.lng</td>
<td>number</td>
<td>Yes</td>
<td>Longitude of the device position in degrees</td>
</tr>
<tr>
<td>c8y_Position.lat</td>
<td>number</td>
<td>Yes</td>
<td>Latitude of the device position in degrees</td>
</tr>
<tr>
<td>time</td>
<td>String</td>
<td>Yes</td>
<td>The time the position was measured</td>
</tr>
<tr>
<td>source</td>
<td>Object</td>
<td>Yes</td>
<td>ID of the source device.</td>
</tr>
<tr>
<td>type</td>
<td>String</td>
<td>Yes</td>
<td>Must always be <em>c8y_LocationUpdate</em> to designate this event as location update event</td>
</tr>
<tr>
<td>text</td>
<td>String</td>
<td>Yes</td>
<td>Description of the event. This parameter is required because it is a required for events in general. There are no further semantics applied to the text in the context of tracking devices</td>
</tr>
</tbody>
</table>

**SmartREST2 example**

The 401 static template is prepared to send location update events using SmartREST <br>
`401,51.151977,6.95173,67,2013-06-22T17:03:14.000+02:00`

### Setting the current position

The current device position is represented using the c8y_Position fragment in the device’s own managed object.

<table>
<colgroup>
<col width="25%">
<col width="75%">
</colgroup>
<tbody>
<tr>
<td style="text-align:center" colspan="2" rowspan="1"> &#x1f4f1;&#10145; &#65039; update inventory &#10145;&#65039; &#9729;&#65039; </td>
</tr>
<tr>
<td style="text-align:center"><b>PUT </b>
</td>
<td style="text-align:center"><em>/inventory/managedObjects/&lt;deviceId&gt;</em>
</td>
</tr>
</tbody>
</table>

```
{
    "c8y_Position": {
    	"alt": 67,
      	"lng": 6.95173,
      	"lat": 51.151977
    }
}
```

|Field|DataType|Mandatory|Details|
|----|----|----|----|
|alt|number|No|Optional altitude of the device position in meters|
|lng|number|Yes|Longitude of the device position in degrees|
|lat|number|Yes|Latitude of the device position in degrees|

**SmartREST2 example**

Devices may update their current position using the 112 static template

`112,51.151977,6.95173,67,`


In Cumulocity tracking over time is done using events and the current position is represented as fragment in the device's own managed object (see above for details). In practice devices usually determine their current position in an interval and upload the coordinates as they are measured. In this case the current position and the position at that time are the same and can be uploaded at the same time using 402 static template.

`402,51.151977,6.95173,67,,`
