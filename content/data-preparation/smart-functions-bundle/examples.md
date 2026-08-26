---
weight: 70
title: Examples
layout: redirect
---

This section provides practical examples of `onMessage` smart functions for Data Preparation. Each example shows the input message, the function, and the output it produces.

For the data types used in these examples, see [Data types](#data-types). For the runtime guarantees that apply, see [Runtime behavior and limits](#limits).

### Parse JSON and create a measurement {#parse-json-measurement}

Decode a JSON payload and produce a temperature measurement. This example also parses a timestamp from the payload and uses it instead of the message arrival time.

**Example input** (`msg.payload` decoded as UTF-8):

```json
{ "deviceId": "SN-001", "tempCelsius": 22.5, "timestamp": "2026-05-12T14:30:00Z" }
```

**Function**:

```javascript
export function onMessage(msg, context) {
  const data = JSON.parse(new TextDecoder("utf-8").decode(msg.payload));

  return [{
    cumulocityType: "measurement",
    payload: {
      type: "c8y_Temperature",
      time: new Date(data.timestamp),
      c8y_Temperature: {
        T: { value: data.tempCelsius, unit: "C" }
      }
    },
    externalSource: [{ externalId: data.deviceId, type: "c8y_Serial" }]
  }];
}
```

**Output**: one `Measurement` of type `c8y_Temperature` for device `SN-001`, with the timestamp parsed from the payload.

---

### Filter messages by condition {#filter-messages}

Only produce output for messages that meet a condition; silently drop the rest.

**Example input** (`msg.payload` decoded as UTF-8):

```json
{ "deviceId": "SN-002", "temperature": -5 }
```

**Function**:

```javascript
export function onMessage(msg, context) {
  const data = JSON.parse(new TextDecoder("utf-8").decode(msg.payload));

  if (data.temperature <= 0) {
    // Drop sub-zero readings
    return [];
  }

  return [{
    cumulocityType: "measurement",
    payload: {
      type: "c8y_Temperature",
      time: msg.time,
      c8y_Temperature: {
        T: { value: data.temperature, unit: "C" }
      }
    },
    externalSource: [{ externalId: data.deviceId, type: "c8y_Serial" }]
  }];
}
```

**Output**: no output (message dropped because temperature is -5).

---

### Create an alarm {#create-alarm}

Raise a MAJOR alarm when a sensor reading exceeds a threshold.

**Example input** (`msg.payload` decoded as UTF-8):

```json
{ "deviceId": "SN-003", "pressure": 1100 }
```

**Function**:

```javascript
export function onMessage(msg, context) {
  const data = JSON.parse(new TextDecoder("utf-8").decode(msg.payload));

  if (data.pressure > 1050) {
    return [{
      cumulocityType: "alarm",
      payload: {
        type: "c8y_PressureAlarm",
        severity: "MAJOR",
        text: `Pressure exceeded threshold: ${data.pressure} hPa`,
        time: msg.time
      },
      externalSource: [{ externalId: data.deviceId, type: "c8y_Serial" }]
    }];
  }

  return [];
}
```

**Output**: one `Alarm` of type `c8y_PressureAlarm` with severity `MAJOR` for device `SN-003`.

---

### Create a location event {#create-event}

Produce a location update event with a standard `c8y_Position` fragment.

**Example input** (`msg.payload` decoded as UTF-8):

```json
{ "deviceId": "SN-004", "lat": 51.5, "lng": -0.1, "alt": 10 }
```

**Function**:

```javascript
export function onMessage(msg, context) {
  const data = JSON.parse(new TextDecoder("utf-8").decode(msg.payload));

  return [{
    cumulocityType: "event",
    payload: {
      type: "c8y_LocationUpdate",
      text: "Location update",
      time: msg.time,
      c8y_Position: {
        lat: data.lat,
        lng: data.lng,
        alt: data.alt
      }
    },
    externalSource: [{ externalId: data.deviceId, type: "c8y_Serial" }]
  }];
}
```

**Output**: one `Event` of type `c8y_LocationUpdate` with a `c8y_Position` fragment for device `SN-004`.

---

### Update a managed object {#update-managed-object}

Apply an update to a managed object to edit its details. The platform identifies the managed object by the external ID and only updates the fields you include.

**Example input** (`msg.payload` decoded as UTF-8):

```json
{ "deviceId": "SN-005", "name": "Sensor 5", "firmwareVersion": "2.1.0", "hwModel": "SensorX" }
```

**Function**:

```javascript
export function onMessage(msg, context) {
  const data = JSON.parse(new TextDecoder("utf-8").decode(msg.payload));

  return [{
    cumulocityType: "managedObject",
    payload: {
      name: data.name,
      c8y_Firmware: { version: data.firmwareVersion },
      c8y_Hardware: { model: data.hwModel }
    },
    externalSource: [{ externalId: data.deviceId, type: "c8y_Serial" }]
  }];
}
```

**Output**: one `managedObject` update for device `SN-005`, changing the name to `Sensor 5`, and setting the `c8y_Firmware` and `c8y_Hardware` fragments. All other fragments on the managed object are unchanged.

---

### Remove a fragment from a managed object {#remove-managed-object-fragment}

Set a fragment to `null` to remove it from a managed object.

**Example input** (`msg.payload` decoded as UTF-8):

```json
{ "deviceId": "SN-006" }
```

**Function**:

```javascript
export function onMessage(msg, context) {
  const data = JSON.parse(new TextDecoder("utf-8").decode(msg.payload));

  return [{
    cumulocityType: "managedObject",
    payload: {
      c8y_Firmware: null
    },
    externalSource: [{ externalId: data.deviceId, type: "c8y_Serial" }]
  }];
}
```

**Output**: one `managedObject` update. The `c8y_Firmware` fragment is removed from the managed object for device `SN-006`.

---

### Parse binary data directly {#parse-binary}

Extract values directly from a binary payload with a known fixed structure, without text decoding.

{{< c8y-admon-info >}}
For binary payload types, the Test data panel provides a hex editor for viewing and editing the payload. For details, see [Editing binary payloads](/data-preparation/rule-editor/#editing-binary-payloads).
{{< /c8y-admon-info >}}

**Example input**: a 9-byte binary payload structured as:

- Bytes 0--3: device ID as a 32-bit big-endian unsigned integer
- Bytes 4--7: temperature as a 32-bit big-endian IEEE 754 float
- Byte 8: battery level as an unsigned integer (0--100)

**Function**:

```javascript
export function onMessage(msg, context) {
  const view = new DataView(msg.payload.buffer, msg.payload.byteOffset, msg.payload.byteLength);

  const deviceId = view.getUint32(0, false).toString();
  const temperature = view.getFloat32(4, false);
  const battery = view.getUint8(8);

  return [
    {
      cumulocityType: "measurement",
      payload: {
        type: "c8y_Temperature",
        time: msg.time,
        c8y_Temperature: { T: { value: temperature, unit: "C" } }
      },
      externalSource: [{ externalId: deviceId, type: "c8y_Serial" }]
    },
    {
      cumulocityType: "measurement",
      payload: {
        type: "c8y_Battery",
        time: msg.time,
        c8y_Battery: { level: { value: battery, unit: "%" } }
      },
      externalSource: [{ externalId: deviceId, type: "c8y_Serial" }]
    }
  ];
}
```

**Output**: two `Measurement` objects --- one `c8y_Temperature` and one `c8y_Battery` --- for the device identified by the first four bytes of the payload.