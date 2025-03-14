---
weight: 50
title: Updating devices registered with the general device registration
layout: redirect
---

If devices have previously been registered via the general device registration the following URLs must be manually changed in the Sigfox Cloud:

- `https://sigfox-agent.{{< domain-c8y >}}/sigfoxDataCallback` to `https://<tenantId>.{{< domain-c8y >}}/service/sigfox-agent/sigfoxDataCallback`.
- `https://sigfox-agent.{{< domain-c8y >}}/sigfoxServiceAcknowledgeCallback` to `https://<tenantId>.{{< domain-c8y >}}/service/sigfox-agent/sigfoxServiceAcknowledgeCallback`.
- `https://sigfox-agent.{{< domain-c8y >}}/sigfoxServiceStatusCallback` to `https://<tenantId>.{{< domain-c8y >}}/service/sigfox-agent/sigfoxServiceStatusCallback`.
- `https://sigfox-agent.{{< domain-c8y >}}/sigfoxErrorCallback` to `https://<tenantId>.{{< domain-c8y >}}/service/sigfox-agent/sigfoxErrorCallback`.

{{< c8y-admon-info >}}
General device registration for Sigfox devices is no longer supported.
{{< /c8y-admon-info >}}
