---
weight: 75
title: Adjusting sensor properties
layout: bundle
sector:
  - getting_started
---

When editing sensor properties, it is possible to change the following settings:

* The interval in seconds between measurements sent to {{< product-c8y-iot >}}.
* The minimum and maximum thresholds for data values to be sent.
* The size and number of simulated peak values to be sent.

The update interval determines how often the sensor is queried by the phone, as well as how often data is sent to {{< product-c8y-iot >}}. Altering the value here will also affect the speed at which charts are redrawn in the application. The minimum value for the update interval is 0.1 seconds. Note that at shorter update intervals, both the sensor device and the phone itself will consume more power.

Minimum and maximum thresholds affect the handling of the incoming data. By default, both the minimum and maximum values are infinite - that is, any recorded value from the sensor will be sent directly to {{< product-c8y-iot >}}. You can drag the slider to adjust these values, or type new values directly into the text boxes at each end of the slider. To change the slider between adjusting minimum and maximum values on iOS, tap in the text box on the respective side. Although there is a recommended range for sensor measurements, it is possible to type values outside of this range if desired.

To return to unlimited values, simply drag the slider all the way to the end of the range again.

With non-infinite minimum or maximum threshold values configured, measurements sent to {{< product-c8y-iot >}} will be capped to the minimum and maximum threshold values. No measurement values outside the threshold will be sent to {{< product-c8y-iot >}}.

Simulated peaks can be useful for sending data values outside of the expected range on demand. These can be used for testing rules, alarms and other such functionality in a controlled and repeatable manner. The application allows you to specify the peak value to be used, as well as the number of times the sensor will be simulated at that value.

![Sensor properties](/images/users-guide/csa/csa-sensor-properties.png)
