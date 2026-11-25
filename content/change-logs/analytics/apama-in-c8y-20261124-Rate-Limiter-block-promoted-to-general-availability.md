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
- The outputs of the block now have the same type as its input, so the usual rules for connecting blocks apply to them. This has two effects on existing models:
  - A model in which the block receives a pulse and one of its outputs is connected to a float or string input can no longer be activated. Activation fails with the error `Cannot convert 'pulse' output to 'float' for input '<input name>'.` (or `to 'string'`). Such a model previously received the value 1 or the text "true". To fix it, connect the output to a pulse or boolean input.
  - A model in which the block receives a string and one of its outputs is connected to a float input now fails on activation with `Cannot convert 'string' output to 'float' for input '<input name>'.` Previously, such a model was activated but failed with a runtime error on the first message that passed.
- If the block receives pulses and its output is connected to a pulse input, every pulse that passes now triggers that input. Previously, only the first pulse did, until a different value was received.

The block has a new **Event Count** parameter, which sets the maximum number of messages that pass in each period for each device. The default is 1, which is the behavior of the block during the Public Preview.

The new **On alarm send email, rate limited** sample shows how to use the block to limit the number of emails that are sent for an alarm.
