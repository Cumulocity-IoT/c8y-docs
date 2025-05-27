---
title: Troubleshooting
weight: 50
layout: bundle
---

**Endpoints cannot be set up**

If you cannot set up new endpoints, check if you have sufficient permissions.

To set up new endpoints, you need ADMIN permission for "Device control" to be able to register a device and ADMIN permission for "Remote access" to be able to add an endpoint.

For more information on permissions, refer to [Managing permissions](/standard-tenant/managing-permissions/).

**Connection fails**

The connection via a gateway to a remote VNC, SSH or Telnet server can fail because of network problems. In this case you must contact your network administrator.

**Unsupported protocol version**

In case of Real VNC, if you get an error message stating that you are using an unsupported protocol version (for example 005.00x), try the following workaround:

1. Open VNC.
2. Navigate to **Options**.
3. Select the **Export** tab.
4. Search for **Protocol version**.
5. Enter "3.8" as protocol version.
