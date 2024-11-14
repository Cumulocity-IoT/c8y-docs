---
weight: 35
title: Accessing the Edge appliance remotely through SSH
layout: bundle
sector:
  - edge_server
---

You can access the Edge appliance from the {{< product-c8y-iot >}} tenant through SSH.

{{< c8y-admon-info >}} Ensure that you have registered your Edge appliance with the {{< product-c8y-iot >}} tenant. See [Registering the Edge appliance in the {{< product-c8y-iot >}} tenant](/edge/edge-connectivity/#registering-the-edge-appliance-in-the-cumulocity-iot-tenant). {{< /c8y-admon-info >}}

To access and connect to the Edge appliance:

1. In the {{< product-c8y-iot >}} tenant for your registered Edge appliance, add a remote access endpoint. See [To add a remote access endpoint via SSH](/cloud-remote-access/using-cloud-remote-access/#to-add-a-remote-access-endpoint-via-ssh). If you select the **Sign-in method** as **Username and password**, you must enter the operating system's administrator credentials. By default, the port number should always be 22.

2. Connect to the endpoint. See [To connect to an endpoint](/cloud-remote-access/using-cloud-remote-access/#to-connect-to-an-endpoint).
