---
weight: 120
title: Changing the IP address of the Edge installation
layout: bundle
sector:
  - edge
---

{{< c8y-admon-caution>}}
This section only applies to an installation managed by the **c8yedge** tool. If Edge is installed on a self-managed Kubernetes cluster, then host network configuration is outside the scope of this documentation.
{{< /c8y-admon-caution>}}

Edge runs on top of the Kubernetes platform, which is very much a server application and not adapted for dynamic network environments, unlike desktop applications. Changing the IP address of the host that Edge is running on will lead to undefined behaviour.

If possible, change of IP address should be immediately followed by a reboot of the host.
