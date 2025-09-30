---
weight: 10
title: Modifying Edge
layout: redirect
---

You can configure and upgrade Edge by making changes to the custom resource (CR), an object in Kubernetes representing this Edge installation. Power users may wish to jump straight in, and refer to [Edge custom resource](/edge-kubernetes/edge-custom-resource-definition/) for details of the CR structure and configuration options available.

In these examples, we assume that the Edge object is called `c8yedge` and is in the namespace `c8yedge`. This is the case if you have installed Edge using the `c8yedge` tool, and can be taken verbatim. All commands should be executed in the shell of the environment you have installed Edge on.

### Basic post-installation configuration {#basic-post-installation-configuration}

Immediately post-installation, you will probably want to configure an SSL certificate for your Edge, and give it a custom domain.

First, ensure that your certificate and key are in separate files, in PEM format.
```bash
kubectl create secret tls edge-tls-secret --namespace=c8yedge \
  --cert=./certs/tls.crt \
  --key=./certs/tls.key
```

Then apply the configuration:
```bash
kubectl --namespace=c8yedge patch edge/c8yedge --type=merge -p '{"spec":{"domain":"myown.iot.com", "licenseKey":"...", "tlsSecretName": "edge-tls-secret"}}'
```
Note that the license key must always be valid for the domain name, so any change of domain name should be made simultaneously with a change of license key.

The change may take some time to complete. See [Monitoring changes](/edge-kubernetes/manage-edge/#monitoring-changes).

### More general configuration changes {#more-general-configuration-changes}

All configuration options can be accessed simply by editing a YAML document that represents the Edge custom resource. First, retrieve the current state of the custom resource
```bash
kubectl get --namespace=c8yedge edge/c8yedge -o yaml > edge.yaml
```
Edit this file, referring to [Edge custom resource](/edge-kubernetes/edge-custom-resource-definition/) for an exhaustive listing of what could be changed. For example, you might add
```
messagingService:
  enabled: true
```
indented under the custom resource's `spec`.

Apply the changed custom resource with
```bash
kubectl apply -f edge.yaml
```

If you are comfortable using a text editor installed on the host system, then you can edit the custom resource in place.
```bash
kubectl edit --namespace=c8yedge edge/c8yedge
```
Any changes you make will be applied when you save and exit the editor.
