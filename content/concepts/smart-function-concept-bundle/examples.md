---
weight: 70
title: Examples
layout: redirect
---

This section provides practical examples of smart functions from different components and domains.

### Data preparation: Parse and create measurements {#data-preparation-example}

This example parses an incoming device message and creates a {{< product-c8y-iot >}} measurement:

```javascript
export function onMessage(message, context) {
  try {
    const decoder = new TextDecoder();
    const data = JSON.parse(decoder.decode(message.payload));

    return [{
      cumulocityType: 'measurement',
      payload: {
        type: 'c8y_Temperature',
        time: message.time,
        c8y_Temperature: {
          T: { value: data.tempCelsius, unit: 'C' }
        }
      },
      externalSource: [{ externalId: message.clientID, type: 'c8y_Serial' }]
    }];
  } catch (error) {
    return []; // Drop malformed messages
  }
}
```

### Streaming analytics: Calculate moving average {#streaming-analytics-example}

This example maintains state to compute a moving average of input values:

```javascript
export function onInput(inputs, context) {
  const history = context.getState('history') || [];
  const value = inputs[0].value;
  
  history.push(value);
  if (history.length > 10) history.shift();
  context.setState('history', history);

  const average = history.reduce((a, b) => a + b, 0) / history.length;
  return [average];
}
```

### thin-edge.io: Filter and forward edge messages {#thin-edge-io-example}

This example filters messages at the edge to reduce bandwidth:

```javascript
export function onMessage(message, context) {
  // Only forward messages from temperature sensors
  if (message.topic.includes('temperature')) {
    return [message];
  }
  return []; // Drop other topics
}
```

For further thin-edge.io examples, see [Flows examples](https://thin-edge.github.io/thin-edge.io/extend/flows/#examples).

For detailed examples and component-specific patterns, refer to the documentation for each component (Data Preparation, Streaming Analytics, or thin-edge.io).
