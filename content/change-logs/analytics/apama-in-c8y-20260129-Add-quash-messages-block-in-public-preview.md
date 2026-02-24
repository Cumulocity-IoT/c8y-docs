---
date: '2026-02-12'
title: Added Rate Limiter block in Public Preview
change_type:
  - value: change-pXAlHAWka
    label: Preview
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAB-5073
version: 27.39.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-02-12'
  - label: apj.cumulocity.com
    date: '2026-02-18'
  - label: jp.cumulocity.com
    date: '2026-02-18'
  - label: emea.cumulocity.com
    date: '2026-02-23'
  - label: us.cumulocity.com
    date: '2026-02-23'
---

A new Rate Limiter block has been added to Analytics Builder. This block suppresses all but the first message received per specified time period.

{{< c8y-admon-preview >}}
This feature is in Public Preview, that is, it is not enabled by default and may be subject to change in the future.
{{< /c8y-admon-preview >}}

The Rate Limiter block has the following outputs:
- Rate limited output:
The first input activation in the specified time period is sent to this output; subsequent activations within that period are sent to the suppressed output.
When the time period has elapsed, the next input activation starts a new period and is again sent to this output.
- Suppressed message output:
Input activations that occur more than once within the specified time period are sent to this output.
- Number of suppressed messages within the current period:
Incremented every time a message is suppressed. Resets to zero when a message is not suppressed.
