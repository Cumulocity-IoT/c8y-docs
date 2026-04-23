---
weight: 70
title: Examples
layout: bundle
---

This section provides practical examples of smart functions from different components and domains.

## Data Preparation: Unit conversion

This example normalizes temperature measurements from a device that sends Celsius values to a standard Fahrenheit format:

```javascript
export function onMessage(message, context) {
  // Assume message has structure: { temperature: 25, unit: 'C', ... }
  if (message.temperature && message.unit === 'C') {
    const fahrenheit = (message.temperature * 9/5) + 32;
    message.temperature = fahrenheit;
    message.unit = 'F';
  }
  return [message];
}
```

**Key points**:
- The function processes a single message.
- It modifies the message in place and returns it wrapped in an array.
- Simple logic focused on a single transformation.

## Data Preparation: Message filtering

This example filters out messages from specific device types before they are stored:

```javascript
export function onMessage(message, context) {
  // Only process messages from 'sensor' devices
  if (message.type === 'sensor') {
    return [message];
  }
  // Drop all other messages
  return [];
}
```

**Key points**:
- Returning an empty array means the message is discarded.
- This reduces storage consumption by filtering at ingestion time.

## Data Preparation: Message enrichment

This example adds a calculated field to device messages:

```javascript
export function onMessage(message, context) {
  // Add timestamp if not present
  if (!message.timestamp) {
    message.timestamp = Date.now();
  }

  // Add a checksum for verification
  message.checksum = calculateChecksum(message);

  return [message];
}

function calculateChecksum(obj) {
  // Simple checksum: sum of all numeric values
  let sum = 0;
  for (const key in obj) {
    if (typeof obj[key] === 'number') {
      sum += obj[key];
    }
  }
  return sum % 256;
}
```

**Key points**:
- The function enriches messages with additional context.
- Helper functions can be defined within the smart function.

## Streaming Analytics: Moving average

This example calculates a moving average over a sliding window of input values:

```javascript
export function onInput(inputs, context) {
  // Assume inputs is an array of numeric values
  // For this example, we compute average of the three most recent values
  
  if (!context.buffer) {
    context.buffer = [];
  }

  context.buffer.push(...inputs);
  
  // Keep only the last 3 values
  if (context.buffer.length > 3) {
    context.buffer = context.buffer.slice(-3);
  }

  // Calculate average
  const average = context.buffer.reduce((a, b) => a + b, 0) / context.buffer.length;
  
  return [average];
}
```

**Key points**:
- Streaming Analytics smart functions can use context to maintain state across invocations.
- The function processes blocks of input values from preceding analytics blocks.
- State is stored in the context object.

## Streaming Analytics: Anomaly detection

This example detects anomalies based on standard deviation from the mean:

```javascript
export function onInput(inputs, context) {
  if (!context.history) {
    context.history = [];
  }

  const value = inputs[0]; // First input value
  context.history.push(value);

  // Keep only the last 100 values
  if (context.history.length > 100) {
    context.history = context.history.shift();
  }

  // Calculate mean and standard deviation
  const mean = context.history.reduce((a, b) => a + b, 0) / context.history.length;
  const variance = context.history.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / context.history.length;
  const stdDev = Math.sqrt(variance);

  // Check if current value is an anomaly (more than 2 standard deviations from mean)
  const isAnomaly = Math.abs(value - mean) > 2 * stdDev;

  return [isAnomaly ? 1 : 0]; // Return 1 for anomaly, 0 for normal
}
```

**Key points**:
- Uses statistical calculations to detect outliers.
- Maintains a rolling window of history in context state.
- Outputs a binary signal (1 or 0) for downstream analytics blocks.

## thin-edge.io: Bandwidth optimization

This example downsamples high-frequency sensor data to reduce bandwidth:

```javascript
export function onMessage(message, context) {
  // Simulate downsampling: only process every 10th message
  if (!context.counter) {
    context.counter = 0;
  }

  context.counter++;

  if (context.counter % 10 === 0) {
    context.counter = 0;
    return [message];
  }

  // Drop 9 out of 10 messages
  return [];
}
```

**Key points**:
- Reduces data transmission by filtering messages at the edge.
- Uses context counter to maintain state between invocations.
- Significant bandwidth savings with minimal loss of information (if timestamps are regular).

## thin-edge.io: Local alerting

This example triggers a local alert if a sensor value exceeds a threshold:

```javascript
export function onMessage(message, context) {
  const ALERT_THRESHOLD = 85;

  if (message.value > ALERT_THRESHOLD) {
    // Log alert locally
    console.warn(`Alert: sensor value ${message.value} exceeds threshold ${ALERT_THRESHOLD}`);

    // Optionally create an alert message to send to the cloud
    const alertMessage = {
      type: 'alert',
      severity: 'high',
      source: message.id,
      value: message.value,
      timestamp: Date.now()
    };

    return [message, alertMessage];
  }

  return [message];
}
```

**Key points**:
- Returns multiple messages when needed (original message and alert).
- Uses console for local logging.
- Enables local action before cloud transmission.

## Async example: API integration

This example calls an external API in an async smart function (applicable to any component supporting async):

```javascript
export async function onMessage(message, context) {
  try {
    // Note: actual API calls depend on component capabilities
    // This is a conceptual example
    
    const enrichmentData = await fetchEnrichmentData(message.id);
    
    message.enriched = enrichmentData;
    return [message];
  } catch (error) {
    console.error('Enrichment failed:', error.message);
    // Return original message if enrichment fails
    return [message];
  }
}

async function fetchEnrichmentData(deviceId) {
  // Simulated API call
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ lastUpdated: Date.now(), status: 'healthy' });
    }, 100);
  });
}
```

**Key points**:
- Async functions allow waiting for long-running operations.
- Errors are caught and handled gracefully.
- Original data is returned even if enrichment fails, ensuring the pipeline continues.

## Common patterns

These examples demonstrate recurring patterns:

- **Filtering**: Return empty array to drop messages; return array with messages to pass them through.
- **Transformation**: Modify message structure or values and return updated messages.
- **Enrichment**: Add calculated fields or external data to messages.
- **State management**: Use context to maintain counters, buffers, or history.
- **Error handling**: Wrap operations in try/catch and log problems.
- **Async operations**: Use async/await for long-running tasks.

## Next steps

See the [Development](development/) section for detailed guidance on writing and testing smart functions.

Check [Deployment](deployment/) for instructions on packaging and deploying your smart function.

For component-specific examples and features, refer to the documentation for your implementation (Data Preparation, Streaming Analytics, or thin-edge.io).
