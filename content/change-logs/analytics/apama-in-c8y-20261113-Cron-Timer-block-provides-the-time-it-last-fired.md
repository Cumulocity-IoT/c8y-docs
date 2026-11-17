---
date:
title: Cron Timer block provides the time at which it last fired
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAB-5518
version:
---

Analytics Builder models that use the **Cron Timer** block often need the time at which the timer fired, for example, to set the time of an alarm or to show the time in a message. Previously, models had no way to get this time.

The **Cron Timer** block now has a **Last Trigger Time** output. This output provides the model time at which the timer last fired, in seconds since the epoch, and keeps this value until the timer fires again. The **Timer Tick** output is unchanged, so existing models continue to work without changes.

You can connect the **Last Trigger Time** output to any float input, such as the **Time** input of the **Create Alarm** block. To show the time as a date in the **Text Substitution** block, use the **Set Properties** block to give the value a property name that contains "time", such as `time`, and then use `#{time}` in the text.

For details, see [Cron Timer](/streaming-analytics/block-reference/#cron-timer).
