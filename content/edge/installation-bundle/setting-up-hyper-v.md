---
weight: 80
title: Example setup for Hyper-V
layout: redirect
---

To set up Hyper-V, you must first enable Hyper-V on your system, and  create Network Address Translation (NAT) adapter. For enabling Hyper-V, see the Microsoft documentation.

### Creating a NAT adapter

You can create a NAT adapter using two ways:

* [Using default settings](/edge/installation/#creating-a-nat-adapter-using-default-settings)  
* [Using user-defined settings](/edge/installation/#creating-a-nat-adapter-using-user-defined-settings) 

Run all the commands in Windows PowerShell as an administrator.

#### Creating a NAT adapter using default settings

>**Info:** You must use the default adapter name `NATSwitchForEdge` and the default IP address `192.168.66.1`.

1. Create a new NAT adapter.
```
PS C:\WINDOWS\system32> New-VMSwitch -SwitchName "NATSwitchForEDGE" -SwitchType Internal
```
2. Verify that the new NAT adapter is created.
```
PS C:\WINDOWS\system32> Get-NetAdapter
```
<br>
<img src="/images/edge/edge-hyper-v-get-netadapter.png" name="Get-NetAdapter" style="width:75%;"/>
Note down the `ifIndex` of the adapter. The `ifIndex` in the above screenshot is 31. The `ifIndex` may vary in your system and the same `ifIndex` should be used in the next step. 

3. Assign an IP address for the adapter.
```
PS C:\WINDOWS\system32> New-NetIPAddress -IPAddress 192.168.66.1 -PrefixLength 24 -InterfaceIndex 31
```
4. Create a NAT rule.
```
PS C:\WINDOWS\system32> New-NetNat -Name NATSwitchForEDGE -InternalIPInterfaceAddressPrefix 192.168.66.0/24
```

#### Creating a NAT adapter using user-defined settings

You can define the adapter name and configure the IP address for your Edge VM. In this example, the adapter name is `EdgeAdapter1` and the IP address is `10.20.30.40`.

>**Info:** The following steps show a reference example. The final configuration also depends on the end user setup.

1. Create a new NAT adapter.
```
PS C:\WINDOWS\system32> New-VMSwitch -SwitchName "EdgeAdapter1" -SwitchType Internal
```
2. Verify that the new NAT adapter is created.
```
PS C:\WINDOWS\system32> Get-NetAdapter
```
Note down the `ifIndex` of the adapter. The `ifIndex` may vary in your system and the same `ifIndex` should be used in the next step. 

3. Assign an IP address for the adapter.
```
PS C:\WINDOWS\system32> New-NetIPAddress -IPAddress 10.20.30.40 -PrefixLength 24 -InterfaceIndex 71
```
4. Create a NAT rule.
```
PS C:\WINDOWS\system32> New-NetNat -Name EdgeNATRule1 -InternalIPInterfaceAddressPrefix 10.20.30.0/24
```

### Setting up Hyper-V

After creating a NAT adapter, you must import the Edge VM image into Hyper-V.

1. In Hyper-V Manager, go to **Action** > **Import Virtual Machine**. <br>
<img src="/images/edge/edge-hyper-v-001.png" name="Import Virtual Machine" style="width:75%;"/>

2. In the **Before You Begin** wizard, click **Next**. <br>

3. Provide the location of the Edge VM image and click **Next**. <br>

4. Select the Edge VM and click **Next**. <br>

5. In the **Choose Import Type** wizard, select **Register the virtual machine in-place (use the existing unique ID)** and click **Next**. <br>

6. If you have used the default NAT adapter name, skip this step and proceed with step 7. <br>
If you have used a different NAT adapter name, you will see the following screen:
<br>
<img src="/images/edge/edge-hyper-v-008.png" name="Select-NetAdapter" style="width:75%;"/>
Select the adapter from the **Connection** drop down list and click **Next**.

7. Click **Finish**. The Edge VM image appears in the Hyper-V Manager. <br> 

8. Right-click the Edge VM image and click **Connect**. <br>
<img src="/images/edge/edge-hyper-v-007.png" name="Connecting to Edge VM" style="width:75%;"/>

9. If you have defined the adapter name and IP address other than the default settings, you must first configure the network before running the post installation. See [Configuring the Edge Server](/edge/installation/#configuring-the-edge-server).

>**Info:** By default, the NTP servers are configured to Europe NTP servers. You can configure the NTP server as per your requirements.