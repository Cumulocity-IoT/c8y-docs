---
weight: 10
title: Modifying Edge
layout: redirect
---

You can configure and upgrade Edge by making changes to the Custom Resource (CR), an object in Kubernetes representing this Edge installation. Power users may wish to jump straight in, and refer to the [Edge Custom Resource](/edge-kubernetes/edge-custom-resource-definition/) for details of the CR structure and configuration options available.

In these examples, we assume that the Edge object is called `c8yedge` and is in the namespace `c8yedge`. This is the case if you have installed Edge using the `c8yedge` tool, and can be taken verbatim. All commands should be executed in the shell of the environment you have installed Edge on. Immediately post-installation, you will probably want to configure an SSL certificate for your Edge, and give it a custom domain.

First, ensure that your certificate and key are in separate files, in PEM format.
```bash
kubectl create secret tls edge-tls-secret -n c8yedge \
  --cert=./certs/tls.crt \
  --key=./certs/tls.key
```

Then apply the configuration
```bash
kubectl -n c8yedge patch edge/c8yedge --type=merge -p '{"spec":{"domain":"myown.iot.com", "licenseKey":"...", "tlsSecretName": "edge-tls-secret"}}'
```
Note that the license key must always be valid for the domain name, so any change of domain name should be made simultaneously with a change of license key.

The change may not apply immediately. You can wait for any change to complete, whether that's an Edge reconfiguration or even an upgrade
```bash
kubectl wait --timeout=300s -n c8yedge --for='jsonpath={.status.state}=Ready' edge/c8yedge
```
This command will exit when the change completes.

In the background, you can also monitor the progress of the changes
```bash
kubectl get events -n c8yedge --field-selector involvedObject.name=c8yedge
```
