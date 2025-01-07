---
weight: 25
title: TLS/SSL secret
layout: redirect
---

Specifies the Kubernetes secret containing the TLS/SSL private key and certificate chain. The Edge operator retrieves this secret from the `EDGE-CR-NAMESPACE`. Ensure that the secret is created before initiating the Edge deployment or update process.

This secret should contain the fields described in the table below.

|<div style="width:150px">Field</div>|Required|<div style="width:115px">Type</div>|Default|Description|
|:---|:---|:---|:---|:---|
|tls.key|Yes|String||TLS/SSL private key in the PEM format. 
|tls.crt|Yes|String||The TLS/SSL certificate chain associated with the private key in PEM format. It's essential to ensure the certificates are arranged in the correct sequence for TLS/SSL validation to succeed. The proper order of the certificate chain is:<p style="margin: 0; padding-left: 2em;">- **End-entity certificate:** This is the TLS/SSL certificate issued to your domain or server, sometimes referred to as the "leaf" or "server" certificate.</p><p style="margin: 0; padding-left: 2em;">- **Intermediate certificate(s):** These certificates link your end-entity certificate to the trusted root certificate. If there are multiple intermediate certificates, they must be ordered correctly as well.</p><p style="margin: 0; padding-left: 2em;">- **Root CA certificate:** This is the certificate for the Certificate Authority (CA) that is trusted by browsers and other clients. It's generally included last in the chain.</p>
