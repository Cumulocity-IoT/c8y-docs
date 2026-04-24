---
weight: 30
title: Examples
layout: redirect
---

### Parse JSON and create a measurement {#parse-json-measurement}

This example decodes a JSON payload and creates a temperature measurement:

```javascript
export function onMessage(message, context) {
  try {
    const decoder = new TextDecoder();
    const jsonData = JSON.parse(decoder.decode(message.payload));

    return [{
      cumulocityType: 'measurement',
      payload: {
        type: 'c8y_Temperature',
        time: new Date(),
        c8y_Temperature: {
          T: { value: jsonData.tempCelsius, unit: 'C' }
        }
      },
      externalSource: [{ 
        externalId: jsonData.deviceId, 
        type: 'c8y_Serial' 
      }]
    }];
  } catch (error) {
    // Drop malformed messages
    return [];
  }
}
```

### Filter messages by condition {#filter-messages}

This example only processes messages with specific criteria and drops others:

```javascript
export function onMessage(message, context) {
  const decoder = new TextDecoder();
  const data = JSON.parse(decoder.decode(message.payload));

  // Only process temperature readings above 0°C
  if (data.temperature > 0) {
    return [{
      cumulocityType: 'measurement',
      payload: {
        type: 'c8y_Temperature',
        time: new Date(),
        c8y_Temperature: {
          T: { value: data.temperature, unit: 'C' }
        }
      },
      externalSource: [{ externalId: data.deviceId, type: 'c8y_Serial' }]
    }];
  }

  // Drop messages that don't meet criteria
  return [];
}
```

### Create an event with custom fragments {#create-event}

This example creates a location event with additional custom data:

```javascript
export function onMessage(message, context) {
  const decoder = new TextDecoder();
  const data = JSON.parse(decoder.decode(message.payload));

  return [{
    cumulocityType: 'event',
    payload: {
      type: 'c8y_LocationUpdate',
      text: 'Device location changed',
      time: new Date(),
      c8y_Position: {
        lat: data.latitude,
        lng: data.longitude,
        alt: data.altitude
      },
      customFragment: {
        accuracy: data.gpsAccuracy,
        speed: data.gpsSpeed
      }
    },
    externalSource: [{ externalId: data.deviceId, type: 'c8y_Serial' }]
  }];
}
```

### Enrich a message before forwarding {#enrich-message}

This example adds context to a device message and forwards it for further processing:

```javascript
export function onMessage(message, context) {
  // Add custom metadata to the message
  const enrichedMessage = {
    ...message,
    transportFields: {
      ...message.transportFields,
      processedAt: new Date().toISOString(),
      processingRule: 'enrich-location'
    }
  };

  return [enrichedMessage];
}
```

### Handle binary data with Base64 {#handle-binary-base64}

This example decodes a binary payload using Base64 encoding:

```javascript
export function onMessage(message, context) {
  try {
    // Assume payload is Base64-encoded JSON
    const base64String = new TextDecoder().decode(message.payload);
    const binaryData = Uint8Array.from(
      atob(base64String), 
      c => c.charCodeAt(0)
    );
    const jsonData = JSON.parse(new TextDecoder().decode(binaryData));

    return [{
      cumulocityType: 'measurement',
      payload: {
        type: 'c8y_Humidity',
        time: new Date(),
        c8y_Humidity: {
          H: { value: jsonData.humidityPercent, unit: '%' }
        }
      },
      externalSource: [{ externalId: jsonData.deviceId, type: 'c8y_Serial' }]
    }];
  } catch (error) {
    return [];
  }
}
```

