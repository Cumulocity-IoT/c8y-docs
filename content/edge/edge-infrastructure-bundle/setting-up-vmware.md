---
weight: 70
title: Example setup for VMware Workstation Player
layout: bundle
sector:
  - edge_server
---

### Setting up for VMware {#setting-up-for-vmware}

To set up the Edge appliance in VMware Workstation Player, follow the steps below.

{{< c8y-admon-info >}}
The following steps show a reference example. Refer to the VMware documentation for the exact setup. The final configuration also depends on the end user setup.
{{< /c8y-admon-info >}}

1. In VMware, navigate to **Player** > **File** > **Open** to import the Edge appliance.

2. Navigate to the folder where the Edge appliance files are located, select the OVF file and click **Open**.

3. Change the Edge appliance name if required and click **Import**. You can also change the storage path of the Edge appliance here.

   {{< c8y-admon-important >}}
On VMware Workstation, you must use UTC on your host machine. If you choose not to use UTC, you may have time sync issues. Set `rtc.diffFromUTC=0` in the .vmx file to avoid the time sync issues.
   {{< /c8y-admon-important >}}

4. Start the Edge appliance by clicking **Play virtual machine**.

Next, perform the Edge appliance installation. See, [Installing Edge](/edge/edge-installation/).

### Setting up for vmnetcfg utility {#setting-up-for-vmnetcfg-utility}

You can use the VMware `vmnetcfg` utility to get the necessary details like the subnet mask and gateway IP required to configure the network.

The following example illustrates the network configuration on a Windows platform. For instructions on Linux platform, see VMware Knowledge Base.  

1. Download the correct version of the `vmnetcfg` utility. It can also be extracted from the VMware Workstation Pro installer.

2. Save the vmnetcfg binary file (*vmnetcfg.exe*) in the VMware Workstation Player installation directory. In a Windows environment, this is usually *C:\Program Files (x86)\VMware\VMware Player*.<br>

3. Open the file with the appropriate rights. <br>
<img src="/images/edge/edge-vmware-05.png" name="Setting up VMware"/>

4. Select "NAT" as external connection.<br>

5. Click **NAT settings** to open the **NAT Settings** window.<br>

6. Note down the gateway IP address and close the **NAT settings** window.<br>
<img src="/images/edge/edge-vmware-06.png" name="Setting up VMware"/>

7. Click **DHCP Settings** to open the **DHCP Settings** window.<br>
8. In the fields **Starting IP address** and **Ending IP address**, change the IP range from 3 to 254, that means, if your gateway IP is 192.168.117.2, set the IP range from 192.168.117.3 to 192.168.117.254.<br>
<img src="/images/edge/edge-vmware-07.png" name="Setting up VMware"/>

9. Click **OK** to save your settings.
