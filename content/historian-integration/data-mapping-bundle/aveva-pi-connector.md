---
title: AVEVA PI connector
weight: 20
layout: redirect
---

The AVEVA PI connector reads the current value of each configured PI tag at every poll interval and sends it as a measurement to the thin-edge.io device. You list the tags by their PI tag name in the `datapoints.json` configuration file. Optionally, each entry can define a display name and a unit:

```json
[
  {
    "tag": "78FIQ301.A",
    "name": "Flow Rate - Inlet 301",
    "unit": "m³/h"
  }
]
```

{{< c8y-admon-info >}}
The poll interval determines the time resolution of the data in {{< product-c8y-iot >}}. Values that change between two polls are not transferred.
{{< /c8y-admon-info >}}
