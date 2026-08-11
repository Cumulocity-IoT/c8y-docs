---
weight: 120
title: Changing the IP address of the Edge installation
layout: bundle
sector:
  - edge
---

{{< c8y-admon-caution >}}
This section applies only to an installation managed by the **c8yedge** tool. If you install Edge on a self-managed Kubernetes cluster, host network configuration is outside the scope of this documentation.
{{< /c8y-admon-caution >}}

Edge runs on top of the Kubernetes platform. Kubernetes is server infrastructure and not adapted for dynamic network environments, unlike desktop applications. Changing the IP address of the host that Edge is running on will lead to undefined behavior.

To avoid this, immediately reboot the host after changing the IP address.

Alternatively, if Edge is running in a hypervisor that supports running a guest behind NAT, you can have it maintain a static IP address for the guest within a private/virtual network. This isolates running software such as Edge from any changes imposed by the outer network.
