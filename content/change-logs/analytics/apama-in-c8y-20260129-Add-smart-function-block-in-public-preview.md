---
date: '2026-02-05'
title: Added Smart Function block in Public Preview
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
ticket: PAB-5076
version: 27.33.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-02-05'
  - label: apj.cumulocity.com
    date: '2026-02-11'
  - label: jp.cumulocity.com
    date: '2026-02-11'
  - label: emea.cumulocity.com
    date: '2026-02-16'
  - label: us.cumulocity.com
    date: '2026-02-16'
  - label: cumulocity.com
    date: '2026-02-17'
---

A new Smart Function block has been added to Analytics Builder. This block executes a JS Smart Function on the inputs and produces an output.

{{< c8y-admon-preview >}}
This feature is in Public Preview, that is, it is not enabled by default and may be subject to change in the future.
{{< /c8y-admon-preview >}}

The Smart Function must export a function `onInput(inputs, context)` that returns a list of outputs.

**Argument details:**

* `inputs` is a list of ten `Value` objects, with members `value`, `properties`, and `timestamp` corresponding to the block inputs.

* `context` is an object with the following members:
	* `blockParameters` - List that contains the block parameters as specified in the block configuration.
	* `getState(key, def = null)` - Method that retrieves a value previously stored in the context under the given key. If no value is found, returns `def`.
	* `setState(key, value)` - Method that stores the given value in the context under the given key.

In addition, the `console` object has `log`, `warn`, `error`, and `debug` members that can be used to log messages to the microservice log.

The return value of the function is a list of up to ten values corresponding to the block outputs. These can either be bare values, or `Value` objects, with members `value`, `properties`, and `timestamp`. If the function does not generate a value, return `null` instead.
