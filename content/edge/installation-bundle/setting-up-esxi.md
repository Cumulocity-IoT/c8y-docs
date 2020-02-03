---
weight: 60
title: Example setup for VMware ESXi 
layout: redirect
aliases:
  - /edge/installation/setting-up-esxi
---

### Setting up ESXi

To set up an ESXi virtual machine, follow these steps:

1. Click **Create/Register VM** to open a window to select the creation type.<br>

2.	Under **Select creation type**, select **Deploy a virtual machine from OVA or OVF template** and click **Next**. <br>
<img src="/images/edge/edge-esxi-01.png" name="Setting up ESXi" style="width:75%;"/>

3.	In the next window, provide a name for the VM, e.g. EDGE-server, and drag and drop the required files (ovf, vmdk1, vmdk2) and click **Next**. <br>
<img src="/images/edge/edge-esxi-02.png" name="Setting up ESXi" style="width:75%;"/>

4.	Under **Select storage**, select the datastore where the VM will reside and click **Next**.
<img src="/images/edge/edge-esxi-03.png" name="Setting up ESXi" style="width:75%;"/>

5.	Under **Deployment options**, select options like thin/thick provisioning and click **Next**.
<img src="/images/edge/edge-esxi-04.png" name="Setting up ESXi" style="width:75%;"/>

6.	Review the machine settings and click **Finish** to complete the setup.
<img src="/images/edge/edge-esxi-05.png" name="Setting up ESXi" style="width:75%;"/>

A VM with the provided name, e.g. "EDGE-server", should now show up in the **Virtual Machines** section. Notifications will appear accordingly in the **Recent tasks** pane.

### VM hardware configuration

* Change VM compatibility to the latest ESXi version.
* Make sure that only one network interface is configured. Use VMXNET3 as type.
* Edit VM Settings -> VMware Tools: Check time synchronization
* Edit VM Settings -> General Options: Set guest OS to CentOs 7 (64bit)

### Cumulocity IoT Edge configuration

Perform the following steps to configure the network once the image is imported into ESXi.

1. Run /opt/c8y/utilities/post_installation.sh -> Option 1 ->  “Configure network”.

2. Run /opt/c8y/utilities/post_installation.sh -> Option 2 -> “Run post-installation”.
