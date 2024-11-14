---
weight: 85
title: Developing Cumulocity IoT web applications
layout: redirect
---

If you develop a {{< product-c8y-iot >}} web application using the [Web SDK](/web/introduction/), for an Edge appliance configured with a certificate not trusted by Node.js (for example, a self-signed certificate), then you must ensure that Node.js trusts the root certificate.

To add the Edge appliance's self-signed certificate to the Node.js trust store, set the environment variable `NODE_EXTRA_CA_CERTS` to the path of the certificate before executing the `npm` commands.

**Example:**

On Windows Powershell:

```shell
$env:NODE_EXTRA_CA_CERTS=<path-to-the-certificate>\certificate.pem
```

On Windows command prompt:

```shell
set NODE_EXTRA_CA_CERTS=<path-to-the-certificate>\certificate.pem
```

On Linux platforms:

```shell
export NODE_EXTRA_CA_CERTS=<path-to-the-certificate>/certificate.pem
```

 For more information on the {{< product-c8y-iot >}} web application development, see [Web SDK](/web/introduction/).
