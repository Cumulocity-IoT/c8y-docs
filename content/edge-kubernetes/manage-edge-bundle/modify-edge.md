---
weight: 10
title: Modifying Edge
layout: redirect
---

You can configure Edge using the **c8yedge** tool, if you have installed Edge using the tool. You can also configure Edge by making changes to the custom resource (CR), an object in Kubernetes representing this Edge installation. 

### Configuring with the c8yedge tool {#configuring-with-c8yedge}

After installing Edge using the c8yedge tool, you might want to configure an SSL certificate for your Edge, give it a custom domain, and set the Edge tenant's name (company name) and the admin user email. This can be achieved by using the `config` command of the c8yedge tool.

First, ensure that your certificate and private key are in separate files, in PEM format. Then use the following command to configure your domain, license key, and SSL certificate.
```bash
c8yedge config \
  --set domain=<DOMAIN-NAME> \
  --set-file licenseKey=<path/to/license.txt> \
  --set-file tlsSecret.tls.key=<path/to/tls.key> \
  --set-file tlsSecret.tls.crt=<path/to/tls.crt>
```
Note that the license key must always be valid for the domain name, so any change of domain name should be made simultaneously with a change of license key.

Use the following command to modify the Edge tenant's name and the administrator's email address.
```bash
c8yedge config \
  --set company=<COMPANY-NAME> \
  --set email=<ADMIN-EMAIL>
```
Note that the company name and the admin user email can also be changed later using the [user interface](/standard-tenant/managing-users/#to-edit-a-user) or {{< product-c8y-iot >}} API.

Upon successful configuration, the tool will exit automatically.

For a complete list of all supported configurations beyond those described in this section, use the `c8yedge config --help` command.

### Configuring Edge in a self-managed Kubernetes cluster {#configuring-with-kubernetes-native}

You can modify the Edge configuration by directly editing a YAML document that represents the Edge custom resource. Refer to [Edge custom resource](/edge-kubernetes/edge-custom-resource-definition/) for details of the CR structure and configuration options available.

In the below examples, we assume that the Edge object is called `c8yedge` and is in the namespace `c8yedge`. All commands should be executed in the shell of the environment you have installed Edge on.

First, retrieve the current state of the custom resource
```bash
kubectl get --namespace=c8yedge edge/c8yedge -o yaml > edge.yaml
```

Edit this file, referring to [Edge custom resource](/edge-kubernetes/edge-custom-resource-definition/) for an exhaustive listing of what could be changed. For example, you might add
```bash
  domain: <DOMAIN-NAME>
  licenseKey: <CONTENTS-OF-THE-LICENSE-FILE>
  tlsSecretName: edge-tls-secret
```
indented under the custom resource's `spec` for configuring an SSL certificate for your Edge, give it a custom domain. Note that the license key must always be valid for the domain name, so any change of domain name should be made simultaneously with a change of license key. 

Create a secret `edge-tls-secret` in the `c8yedge` namespace with your certificate and private key before applying the changed custom resource.
```bash
kubectl create secret tls edge-tls-secret --namespace=c8yedge \
  --cert=./certs/tls.crt \
  --key=./certs/tls.key
```

Apply the changed custom resource with
```bash
kubectl apply -f edge.yaml
```

If you are comfortable using a text editor installed on the host system, then you can edit the custom resource in place.
```bash
kubectl edit --namespace=c8yedge edge/c8yedge
```
Any changes you make will be applied when you save and exit the editor.

These changes may take some time to complete. See [Monitoring changes](/edge-kubernetes/manage-edge/#monitoring-changes).