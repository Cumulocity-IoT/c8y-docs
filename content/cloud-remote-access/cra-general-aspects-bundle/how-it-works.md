---
title: How Cloud Remote Access works
weight: 20
layout: bundle
---

Cloud Remote Access is a technique to tunnel protocol traffic (such as VNC, Telnet and SSH) to the cloud without opening any ports at the gateway. Thus Cloud Remote Access is a secure way to directly access low level protocols on devices through the {{< product-c8y-iot >}} platform UI in a web browser.


![Cloud Remote Access - VNC](/images/cra/cra-VNC1a.png)

The following protocols are supported:

* Remote Desktop (VNC)
* Secure Shell (SSH)
* Terminal (Telnet)

See [Supported protocols and gateways](/cloud-remote-access/communication/#supported-protocols) for details.

Cloud Remote Access works as in the illustration below. The remotely controlled device runs a VNC, SSH or Telnet server and is connected to a gateway compatible with Cloud Remote Access. This gateway must be registered as a device within the Device Management application in {{< product-c8y-iot >}}. More information about registering devices and instructions can be found in [Registering devices](/device-management-application/registering-devices).

![Cloud Remote Access - VNC](/images/cra/cra-VNC2.png)

With Cloud Remote Access users can

* view status visualizations and track updates of remote devices directly in the same way as if you were at the device location.
* connect to remote devices easily as complex VPN setups are not required.
* establish a connection via Telnet or SSH to the gateway itself or to any device in the local area network.

![Cloud Remote Access visualizations](/images/cra/cra-VNC1b.png)

The connection to remote devices is securely encrypted through TLS technology. Additionally, passwords are encrypted in your {{< product-c8y-iot >}} account, so that you do not need to manage them elsewhere.
