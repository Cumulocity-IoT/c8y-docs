---
date:
title: Rate Limiter block in Analytics Builder is now generally available
change_type:
  - value: change-QHu1GdukP
    label: Feature
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAB-5478
version: TODO
---

The [Rate Limiter](/streaming-analytics/block-reference/#rate-limiter) block, previously released in [Public Preview](/change-logs/?component=.component-M5-cepIIS#apama-in-c8y-20260129-add-quash-messages-block-in-public-preview), is now Generally Available (GA).

The block is available in the Analytics Builder palette by default and no longer requires the preview blocks feature to be enabled. Models that already use the Rate Limiter block continue to work, with the following changes:

- The first message for each device always passes. Previously, the block suppressed the first message if its timestamp was smaller than the period.
- The block rejects a period that is not a finite and positive number.
- The outputs of the block now have the same type as its input. A model that connects an output of the block to an input of a different type, for example a pulse to a float input, can no longer be activated. To fix such a model, add a block that converts the value between the two blocks.

The block has a new **Event Count** parameter, which sets the maximum number of messages that pass in each period for each device. The default is 1, which is the behavior of the block during the Public Preview.

The new **On alarm send email, rate limited** sample shows how to use the block to limit the number of emails that are sent for an alarm.
