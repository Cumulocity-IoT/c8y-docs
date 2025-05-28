---
title: Introduction
weight: 10
layout: bundle
sector:
  - device_management
---

The {{< product-c8y-iot >}} Cloud Remote Access feature offers a seamless and secure way to connect to your devices using either a browser-based remote desktop or an SSH connection. Devices can be directly accessed through the {{< product-c8y-iot >}} platform's web-based user interface without exposing any ports to a public network, thereby eliminating the need for additional software or complex VPN infrastructure. Alternatively, you can also establish a secure TCP tunnel directly to a local machine.

Leveraging these remote access and management capabilities allows for effective configuration and troubleshooting of devices, such as industrial machines, IoT gateways, or network infrastructure. This includes, for example, the following scenarios:

1. Remote assistance and troubleshooting of machines by accessing the Human Machine Interface (HMI) via VNC.
2. Access local UIs like the configuration UI of a NodeRed server to manage your flows or access the stream of your CCTV camera.
3. Directly access an SSH server in a private network from the browser via WebSSH without requiring any additional software. The connection is easy to set up which makes it very convenient particularly when working with multiple devices. 
4. Natively connect to an SSH server in a private network with any local client like PuTTY or OpenSSH. This provides more advanced functionalities compared to WebSSH, like file copy via SCP, while providing better performance and latency.
5. Remotely program apps deployed on top of your devices like a container or Codesys runtime by using Visual Studio Code and its Remote SSH plugin, or directly transfer updated project files using SSH commands.

