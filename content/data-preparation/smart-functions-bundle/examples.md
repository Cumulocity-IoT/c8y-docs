---
weight: 70
title: Examples
layout: redirect
---

This section provides practical examples of `onMessage` smart functions for Data Preparation. Each example shows the input message, the function, and the output it produces.

For the data types used in these examples, see [Data types](#data-types). For the runtime guarantees that apply, see [Runtime behavior and limits](#runtime-behavior-and-limits).

### Parse JSON and create a measurement {#parse-json-measurement}

Decode a JSON payload and produce a temperature measurement.

**Example input** (`msg.payload` decoded as UTF-8):

```json
{ "deviceId": "SN-001", "tempCelsius": 22.5 }
```

**Function**:

```javascript
export function onMessage(msg, context) {
  const data = JSON.parse(new TextDecoder("utf-8").decode(msg.payload));

  return [{
    cumulocityType: "measurement",
    payload: {
      type: "c8y_Temperature",
      time: msg.time,
      c8y_Temperature: {
        T: { value: data.tempCelsius, unit: "C" }
      }
    },
    externalSource: [{ externalId: data.deviceId, type: "c8y_Serial" }]
  }];
}
```

**Output**: one `Measurement` of type `c8y_Temperature` for device `SN-001`.

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

### Parse binary data directly {#parse-binary}

Extract values directly from a binary payload with a known fixed structure, without text decoding.

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
