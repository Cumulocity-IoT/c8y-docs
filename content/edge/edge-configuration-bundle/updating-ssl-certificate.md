---
weight: 40
title: Updating the SSL certificate
layout: bundle
sector:
  - edge_server
---

You must always have a valid SSL certificate for your domain name that is configured. If the validity of the certificate expires or if you have changed your domain name, you must upload or generate a new SSL certificate. You can upload the certificate using the GUI and REST APIs.

### Updating the SSL certificate using the GUI {#updating-the-ssl-certificate-using-the-gui}

1. Log in to the {{< management-tenant >}} using the Edge administrator credentials created during the installation.

	- Username: management/<*Edge admin username*>
	- Password: password provided during the installation

2. Switch to the Administration application using the application switcher at the right of the top bar **<img class="Default" src="/images/icons/switcher-icon.png" alt="Application switcher" style="display: inline; float: none">**.

3. Click **Edge** > **Domain/Certificate** in the navigator.

   Review the domain name and the SSL certificate.

4. Click **Edit** below **SSL Certificate** to upload the new SSL certificate file and the key file.

5. Provide the new SSL certificate file and the SSL certificate key file.

   If you do not have an SSL certificate, select **Generate self-signed certificate** to generate one.

5. Click **Save**.

### Updating the SSL certificate using the REST APIs {#updating-the-ssl-certificate-using-the-rest-apis}

To update the SSL certificate using the REST APIs, see the `/edge/configuration/certificate` API in the [{{< product-c8y-iot >}} Edge OpenAPI Specification](https://{{< domain-c8y >}}/api/edge/{{< c8y-edge-current-version-alt >}}.0/#operation/updateEdgeCertificate).
