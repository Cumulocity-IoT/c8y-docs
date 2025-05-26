---
weight: 160
title: Platform capabilities
layout: bundle
sector: 
  - device_management
---

Devices may require information about platform capabilities. To enable new device-side functionality, a new API or optional components may be required. For this purpose, {{< product-c8y-iot >}} provides dedicated interfaces.
### Platform version {#platform-version}

To enable functionality that requires a minumum {{< product-c8y-iot >}} platform version it is best practice to first query this version before attempting to use a newly added API. 

```http
```http
GET /tenant/system/options/system/version
```

**SmartREST example**

The 600 static request template and its corresponding 601 static response template are available for SmartREST enabled devices:

Sending request
`600`
Receiving response
`601,2025.0.0`

