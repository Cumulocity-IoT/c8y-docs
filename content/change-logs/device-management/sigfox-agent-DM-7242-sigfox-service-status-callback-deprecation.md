---
date: '2026-09-09'
title: Sigfox discontinues the Service Status callback used for battery and temperature measurements
product_area: Device management & connectivity
change_type:
  - value: change-inv-3bw8e
    label: Announcement
component:
  - value: component-TCiiCOknp5
    label: LPWAN
build_artifact:
  - value: tc-CB45dexyZ
    label: sigfox-agent
ticket: DM-7242
version:
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
**Context**

Sigfox has announced in its backend release 15.5 that the Service Status callback service is being phased out. This is a decision by Sigfox about its own platform and is outside the control of {{< product-c8y-iot >}}. The Sigfox timeline is:

- **September 2026**: The Sigfox backend no longer accepts the creation of new Service Status callbacks.
- **April 2027**: The Sigfox backend discontinues the Service Status callback service entirely. Existing Service Status callbacks stop delivering data.

The Sigfox agent has so far registered a Service Status callback (`sigfoxServiceStatusCallback`) for every Sigfox device type. This callback receives the Sigfox out-of-band (OOB) status messages and turns them into two measurements on each Sigfox device:

- `c8y_BatteryMeasurement` with the battery voltage reported by the device.
- `c8y_TemperatureMeasurement` with the device temperature.

Sigfox provides no replacement callback that carries battery or temperature values. Sigfox recommends that devices transmit this information in their regular application messages instead. See the [Sigfox Cloud Integration](https://build.sigfox.com/backend-callbacks-and-api) documentation.

**Change**

The Sigfox agent continues to request the Service Status callback for every new device type, so the callback is still created as long as the Sigfox backend accepts it. Once the Sigfox backend rejects the request, the Sigfox agent no longer raises a CRITICAL `c8y_ProviderCallbackAlarm_<deviceTypeId>` alarm for this specific callback. Device type registration completes without an alarm as long as all other callbacks are created successfully. All other callbacks (uplink data, service acknowledge, error, and advanced data) are not affected and continue to be created and monitored as before.

**Consequence**

- Sigfox devices that are registered with a **new device type** after the Sigfox backend starts rejecting the Service Status callback (September 2026) do not receive `c8y_BatteryMeasurement` and `c8y_TemperatureMeasurement` measurements from Sigfox status messages.
- Sigfox devices that belong to a device type with an **existing** Service Status callback continue to receive these measurements until Sigfox discontinues the service in April 2027.
- From April 2027, no Sigfox device receives battery or temperature measurements from Sigfox status messages anymore.
- Anything that depends on these two measurements stops updating. This includes dashboards and data point widgets, smart rules and alarms on battery level or temperature, data exports, and integrations that query these measurement types through the Measurement API.

**Persona**

This change affects all users and integrators who operate Sigfox devices through {{< product-c8y-iot >}} and use the automatically created battery voltage or device temperature measurements.

**Action**

We recommend that you plan the migration before April 2027:

1. **Check whether you are affected.** Query the Measurement API for your Sigfox devices with `type=c8y_BatteryMeasurement` or `type=c8y_TemperatureMeasurement`, or check the **Measurements** tab of a Sigfox device in the Device Management application. If these measurements are present, review which dashboards, smart rules, alarms, and integrations use them.
2. **Change the device firmware** so that the device transmits battery voltage and temperature as part of its regular Sigfox application payload, as recommended by Sigfox.
3. **Map the payload in the device protocol.** In **Device Management** > **Device types** > **Device protocols**, open the Sigfox device protocol of the affected device type and add the byte ranges that carry battery voltage and temperature. Select **Send measurement** as the action. To keep existing dashboards and rules working, use the same fragment and series names as before, that is `c8y_BatteryMeasurement` with the series `c8y_Battery.level` in the unit `V`, and `c8y_TemperatureMeasurement` with the series `c8y_TemperatureMeasurement.T` in the unit `C`. See [Creating device protocols](/device-integration/lpwan/#sigfox-creating-device-protocols).
4. **Update dependent configuration** if you decide to use different fragment or series names, for example data point selections in dashboards, smart rules, and any external integrations that filter on the measurement type.

If your devices cannot be changed to transmit battery and temperature values in their application messages, be aware that these values are not available in {{< product-c8y-iot >}} after April 2027.

**Documentation**

See [Sigfox](/device-integration/lpwan/#sigfox) in the device integration documentation.
