---
title: Introduction
weight: 10
layout: bundle
sector:
- device_management
date: '2025-09-01T10:26:32Z'
lastmod: '2025-09-01T10:40:43Z'
---
The {{< product-c8y-iot >}} Cloud Remote Access feature offers a seamless and secure way to connect to your devices using either a browser-based remote desktop or an SSH connection. Devices can be directly accessed through the {{< product-c8y-iot >}} platform's web-based user interface without exposing any ports to a public network, thereby eliminating the need for additional software or complex VPN infrastructure. Alternatively, you can also establish a secure TCP tunnel directly to a local machine.

Leveraging these remote access and management capabilities allows for effective configuration and troubleshooting of devices, such as industrial machines, IoT gateways, or network infrastructure. This includes, for example, the following scenarios:

1. Remote assistance and troubleshooting of machines by accessing the Human Machine Interface (HMI) via VNC.
2. Access local UIs like the configuration UI of a NodeRed server to manage your flows or access the stream of your CCTV camera.
3. Directly access an SSH server in a private network from the browser via WebSSH without requiring any additional software. The connection is easy to set up which makes it very convenient particularly when working with multiple devices. 
4. Natively connect to an SSH server in a private network with any local client like PuTTY or OpenSSH. This provides more advanced functionalities compared to WebSSH, like file copy via SCP, while providing better performance and latency.
5. Remotely develop and debug logic and scripts deployed on top of your devices by using the Codesys IDE or Visual Studio Code using CRA with the Cumulocity CLI acting as a [local proxy](https://goc8ycli.netlify.app/docs/cli/c8y/remoteaccess/connect/c8y_remoteaccess_connect_ssh/).

