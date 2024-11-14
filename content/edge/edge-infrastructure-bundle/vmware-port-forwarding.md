---
weight: 75
title: Port forwarding on a VMware platform
layout: bundle
sector:
  - edge_server
---

To perform port forwarding on a VMware platform, follow the steps below.

{{< c8y-admon-important >}}
The IP addresses used in the screenshots are sample IP addresses, for the purpose of example only. The IP addresses may vary in your set up.
{{< /c8y-admon-important >}}

1. Run the *vmnetcfg.exe* utility as an administrator.
<img src="/images/edge/edge-vmware-port-forwarding-01.png" name="Port forwarding on VMware"/>

2. Select the **NAT** adapter and click **NAT Settings**.
<img src="/images/edge/edge-vmware-port-forwarding-02.png" name="NAT Settings"/>

3. Click **Add** to add the port forwarding rules. Enter the port forwarding rules for HTTPS, MQTT and MQTT over SSL protocols as described in the table below:

	{{< c8y-admon-info >}}
Ensure that the **Virtual machine IP address** is the same as the IP address that you have configured for the Edge appliance.
	{{< /c8y-admon-info >}}

	|Host Port|Type|VM IP Address|VM Port|Description
	|:---|:---|:---|:---|:---
	|443|TCP|192.168.117.10|443|HTTPS
	|1883|TCP|192.168.117.10|1883|MQTT
	|8883|TCP|192.168.117.10|8883|MQTT over SSL

	Click **OK** in the **Map Incoming Port** window after entering the port forwarding rules for each port.

	<img src="/images/edge/edge-vmware-port-forwarding-03.png" name="NAT Settings"/>

4. Click **OK** in the **NAT Settings** window.

5. Click **Apply** > **OK**.
