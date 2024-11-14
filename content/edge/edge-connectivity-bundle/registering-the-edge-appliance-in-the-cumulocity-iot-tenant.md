---
weight: 20
title: Registering the Edge appliance in the Cumulocity IoT tenant
layout: bundle
sector:
  - edge_server
---

Before performing these steps, ensure that you have [configured the URL](/edge/edge-connectivity/#config-remote-connectivity) for the {{< product-c8y-iot >}} cloud tenant in the Edge appliance.   

1. Log in to your {{< product-c8y-iot >}} tenant.

2. Go to the Device Management application.

3. Click **Registration** in the **Devices** menu and then click **Register device**.

4. Select **General device registration**.

   <img src="/images/users-guide/DeviceManagement/devmgmt-registration-general.png" alt="General device registration" style="max-width: 100%">

5. In the **Device ID** field, enter the Edge device ID.

6. Click **Next**.

7. Click **Complete** to register your Edge appliance.<br>
   After successful registration, the Edge appliance appears in the [**Device registration**](/device-management-application/registering-devices/) page with the status **Waiting for connection**.<br>
   Turn on the Edge appliance and wait for the connection to be established.
   Once the device is connected, the device status changes to **Pending acceptance**.

8. Click **Accept** to confirm the connection. The status of the device changes to **Accepted**.

<a name="accessing-the-edge-appliance-from-the-cumulocity-iot-tenant"></a>
