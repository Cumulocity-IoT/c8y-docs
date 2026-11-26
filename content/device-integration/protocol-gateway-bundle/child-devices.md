---
weight: 100
title: Child devices and device information
layout: redirect
---

thin-edge.io creates a child device when the first measurement arrives, but with only a name. To give every machine the same device information, let the gateway register it. Follow these conventions:

- **Keep Protocol Gateway data off the thin-edge.io device.** Its inventory describes the Linux device only. Do not add information such as firmware to it.
- **Create one child device for each machine,** directly below the thin-edge.io device.
- **Set the type `ProtocolGateway`** on every device that Protocol Gateway creates. Children that other methods create, for example another device that runs thin-edge.io, keep their own types.
- **Add the fragment `protocolGateway`** with the data source, the driver, and the gateway version. The fragment identifies devices from Protocol Gateway even when their types change later.
- **Fill the agent and hardware information.** Set `c8y_Agent` to the gateway software and `c8y_Hardware` to the machine (model, revision, serial number). The device certification requirements expect these fragments.
- **Do not use the `c8y_` prefix** for your own fragments.

### To register a machine {#to-register-a-machine}

Create another event that publishes the registration of the child device. The registration consists of a registration message and twin messages. A twin message sets one fragment of the device. The gateway then applies the same information on every device, without commands on the device.

1. Open **Event**, click the plus, click **Event**, and enter the name “register-plc01”.
2. Add a trigger of type **Cycle** with **Cycle(msec)** “3600000” and enable **Force Initial Activating**. The event runs when the gateway starts and then every hour.
3. Add 4 **Send MQTT** actions in this order. For all of them, select “thin-edge” as **Destination server**, set **Message Type** to “Text” and **Publishing QoS** (quality of service) to “1”, and enable **Retain**.

   | Action name | Topic name | Message to send |
   |-------------|------------|-----------------|
   | `reg-entity` | `te/device/plc01//` | `{"@type":"child-device","@parent":"device/main//","name":"plc01","type":"ProtocolGateway"}` |
   | `reg-agent` | `te/device/plc01///twin/c8y_Agent` | `{"name":"Protocol Gateway","version":"3.7.0.2490","url":"https://www.faweb.net/en/product/devicegateway"}` |
   | `reg-hardware` | `te/device/plc01///twin/c8y_Hardware` | `{"model":"Simulated PLC","revision":"n/a","serialNumber":"n/a"}` |
   | `reg-marker` | `te/device/plc01///twin/protocolGateway` | `{"dataSource":"plc01","driver":"Simulator","gatewayVersion":"3.7.0.2490"}` |

4. Click the check marks and **Save**, and start the event with the play button.

![Registration event](/images/device-protocols/protocol-gateway/gateway-register-event.png)

Notes:

- **Retain** keeps the messages in the broker, so thin-edge.io applies them even if it starts after the gateway. The hourly repeat restores them if the broker loses its data.
- `device/main//` is the topic identifier of the thin-edge.io device. Keep it exactly like this.
- Entity topics have 2 slashes (`te/device/plc01//`), and twin topics have 3 (`te/device/plc01///twin/<fragment>`). A wrong number of slashes publishes to a topic that nothing reads.
- For a real PLC, use the PLC model, revision, and serial number in `c8y_Hardware`, and the driver name, for example `Modbus TCP`, in the marker. Use `n/a` only if the machine does not report them.
- For each additional machine, add 4 actions with its own topic, such as `te/device/plc02//`.
- The registration updates a device that already exists, so the order of the two events does not matter.

Check on the device:

```bash
tedge mqtt sub 'te/device/plc01/#' --duration 3s
```

The output lists the registration message and the twin messages `type`, `name`, `c8y_Agent`, `c8y_Hardware`, and `protocolGateway`. In Device Management, open *plc01* and click **Info**. **Type** shows `ProtocolGateway`, and the **Agent**, **Hardware**, and `protocolGateway` blocks show the values.

![Child device information](/images/device-protocols/protocol-gateway/child-device-info.png)
