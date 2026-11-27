---
weight: 60
title: Data reporting
layout: redirect
---

An event sends the tag values to thin-edge.io. An event consists of a trigger and one or more actions.

### To send tag values with an event {#to-send-tag-values-with-an-event}

1. Open **Event**, click the plus, click **Event**, and enter a name, for example “send-plc01”.
2. On the **Trigger** page, add a trigger of type **Cycle**. Enter **Cycle(msec)** in milliseconds. The value “10000” sends a message every 10 seconds.

   ![Cycle trigger](/images/device-protocols/protocol-gateway/gateway-event-trigger.png)

3. On the **Action** page, add an action of type **Send MQTT** and set:
   - **Destination server:** “thin-edge” (click the “...” button to select it)
   - **Topic name:** “te/device/plc01///m/simulated”
   - **Message Type:** “Text”
   - **Message to send:** the payload below.

   ![Send MQTT action](/images/device-protocols/protocol-gateway/gateway-event-action.png)

4. For **Message to send**, click “...” and enter:

   ```text
   {"simulator": {"sine_wave": <%=@tv("plc01.temperature")%>}}
   ```

   To insert the macro, click the tag symbol in the editor and select the data source and the tag. The macro format is `<%=@tv("<data source>.<tag>")%>`.

   ![Message payload](/images/device-protocols/protocol-gateway/gateway-event-payload.png)

5. Click the check marks and **Save**, and start the event with the play button. **Event Summary** shows `Running`.

{{< c8y-admon-important >}}
If **Message to send** is empty, the event still shows `Running` and publishes an empty message every 10 seconds, and {{< product-c8y-iot >}} receives no values. To check the message on the device, see [Troubleshooting](/device-integration/protocol-gateway/#troubleshooting).
{{< /c8y-admon-important >}}

### Topic and payload mapping {#topic-and-payload-mapping}

| Part | Example | Result in {{< product-c8y-iot >}} |
|------|---------|----------------------|
| Child device | `plc01` in `te/device/plc01///...` | Child device `plc01` |
| Measurement type | `simulated` in `.../m/simulated` | Measurement type |
| Fragment | `simulator` (outer JSON key) | Measurement fragment |
| Series | `sine_wave` (inner JSON key) | Measurement series |

Use one topic for each machine, so that each machine becomes its own child device. If one PLC represents several machines, split the data further. A plain value, for example `{"sine_wave": 123}`, creates a fragment and a series with the same name. For the complete topic and payload structure, see the [thin-edge.io documentation](https://thin-edge.github.io/thin-edge.io/understand/thin-edge-json/).

### To monitor measurements {#to-monitor-measurements}

In Device Management, open the thin-edge.io device and click **Child devices**. The device *plc01* appears within a few seconds of the first message. Open *plc01* and click **Measurements**. The series `sine_wave` of the fragment `simulator` shows a new value every 10 seconds.

![Measurements](/images/device-protocols/protocol-gateway/measurements.png)

The measurement carries the time at which thin-edge.io received the message. If you do not see values, make sure the time range of the chart includes the current time.

### To set the type of a child device {#to-set-the-type-of-a-child-device}

thin-edge.io creates the child device with a name only. To give every machine the type `ProtocolGateway`, let Protocol Gateway publish a registration message for it:

1. Open **Event**, click the plus, click **Event**, and enter the name “register-plc01”.
2. Add a trigger of type **Cycle** with **Cycle(msec)** “3600000”, and enable **Force Initial Activating**. The event runs when Protocol Gateway starts and then every hour.
3. Add an action of type **Send MQTT** and set:
   - **Destination server:** “thin-edge”
   - **Topic name:** “te/device/plc01//”
   - **Message Type:** “Text”
   - **Publishing QoS:** “1”
   - **Retain:** enabled
   - **Message to send:** `{"@type":"child-device","@parent":"device/main//","name":"plc01","type":"ProtocolGateway"}`
4. Click the check marks and **Save**, and start the event with the play button.

![Registration event](/images/device-protocols/protocol-gateway/gateway-register-event.png)

The registration topic has 2 slashes after the device name, while the measurement topic has 3. `device/main//` identifies the thin-edge.io device, so keep it exactly like this. **Retain** keeps the message in the broker, so thin-edge.io applies it even if it starts after Protocol Gateway. For each additional machine, add an action with its own topic and name, such as `te/device/plc02//`.

In Device Management, open *plc01* and click **Info**. **Type** shows `ProtocolGateway`.

![Child device information](/images/device-protocols/protocol-gateway/child-device-info.png)
