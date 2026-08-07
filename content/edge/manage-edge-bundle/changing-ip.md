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

Edge runs on top of the Kubernetes platform. Kubernetes is server infrastructure and not adapted for dynamic network environments, unlike desktop applications. Changing the IP address of the host that Edge is running on will lead to undefined behavior.

To avoid this, immediately reboot the host after changing the IP address.
