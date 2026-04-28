---
date: '2026-02-05'
title: Combined block parameter for function code in the Smart Function block
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
ticket: PAB-5192
version: 27.103.0

---

The Smart Function block now uses a single, dynamically sized block parameter instead of a fixed set of parameters for providing values to the smart function code.

{{< c8y-admon-preview >}}
The Smart Function block is in Public Preview, that is, it is not enabled by default and may be subject to change in the future.
{{< /c8y-admon-preview >}}

Specifically, the block parameters **params[0]**, **params[1]**, **params[2]**, **params[3]**, and **params[4]** have been replaced by the **Parameters for the Smart Function code** parameter, which is of the list type. You can add any number of values to it.

The way to access the parameter values inside the smart function code remains the same:

```javascript
let firstParam = context.params[0];
let secondParam = context.params[1];
```

Each value in the list can be either a fixed value or refer to a model parameter.

In existing models that use the Smart Function block, you must remove and re-add the block.