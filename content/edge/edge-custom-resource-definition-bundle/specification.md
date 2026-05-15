---
weight: 15
title: Specification
layout: redirect
---

### version {#version}
`spec.version` | string | Required

Edge version to install. Specify `2026` to install the latest available version from the release, or use a fully qualified version like `2026.0.1` to install a specific patch version.



### domain {#domain}
`spec.domain` | string | Required

A fully qualified domain name where Edge will be hosted, for example, myown.iot.com. The domain name provided here must match the scope of your Edge license, either the exact subdomain domain, or the parent domain.

If you used **c8yedge** tool to install, you can configure this field using the below command: 
```shell
c8yedge config --set domain=<domain-name>
```

### licenseKey {#licensekey}
`spec.licenseKey` | string | Required

Edge license key you received for the domain. If you do not have a license key, you must request one from [product support](/additional-resources/contacting-support/). For more information, see [Domain name validation for Edge license key generation](/edge/installing-edge/#domain-name-validation-for-edge-license-key-generation).
When requesting license, you must provide the following details:
  - Your company name, under which the license has been bought.
  - The domain name (for example, myown.iot.com), where Edge will be reachable.

If you used **c8yedge** tool to install, you can configure this field using the below command: 
```shell
c8yedge config --set-file licenseKey=<path/to/license.txt>
```

### company {#company}
`spec.company` | string | Required

Name of the Edge tenant, for example, the company’s name.
Changes made to the Edge tenant's name using the user interface or Cumulocity API will be overwritten by the Edge operator. Modify this field instead to permanently update the name.

If you used **c8yedge** tool to install, you can configure this field using the below command: 
```shell
c8yedge config --set company=<company-name>
```

### email {#email}
`spec.email` | string | Required

The email address to configure for the platform administrator account.
Changes made to the administrator email using the user interface or Cumulocity API will be overwritten by the Edge operator. Modify this field instead to permanently update the email.

If you used **c8yedge** tool to install, you can configure this field using the below command: 
```shell
c8yedge config --set email=<email-address>
```

### cumulocityPasswordSecretName {#cumulocitypasswordsecretname}
`spec.cumulocityPasswordSecretName` | string | Required

Name of the Kubernetes secret containing the Cumulocity admin user password for both the Management tenant and the Edge tenant. This secret must contain a key named `INITIAL_C8Y_ADMIN_PASSWORD` with the initial password.

**Important**: The password must be at least 8 letters long.
**Info**: This value is used only during the Edge installation and can’t be changed for existing installations. All subsequent password changes must be made via the [user interface](/standard-tenant/managing-users/#to-edit-a-user) or the Cumulocity API.
**Info**: The Edge operator retrieves this secret from the **EDGE-CR-NAMESPACE**. Ensure that this secret is created before initiating the Edge deployment process.



### tlsSecretName {#tlssecretname}
`spec.tlsSecretName` | string | Optional

Name of the Kubernetes secret containing the TLS/SSL private key and certificates for the domain name specified in the `spec.domain` field. If not provided, Edge automatically generates and assigns self-signed certificates.
This secret must contain two keys:
  - `tls.key`: TLS/SSL private key in the PEM format.<br>Generate a TLS/SSL key pair and a Certificate Signing Request (CSR) following your organization's policies, specifying either a wildcard domain in the Common Name (CN) (for example, **.iot.com*) or listing required domains in the Subject Alternative Name (SAN) field, including the Edge tenant and Management tenant tenant domains (for example, *myown.iot.com*, *management-myown.iot.com*).
  - `tls.crt`: The TLS/SSL certificate chain associated with the private key in PEM format. It's essential to ensure the certificates are arranged in the correct sequence for TLS/SSL validation to succeed. The proper order of the certificate chain is:
    - **End-entity (Leaf) Certificate:** This is the TLS/SSL certificate issued to your domain or server, sometimes referred to as the "leaf" or "server" certificate.
    - **Intermediate certificate(s):** These certificates link your end-entity certificate to the trusted root certificate. If there are multiple intermediate certificates, they must be ordered correctly as well.
    - **Root CA certificate:** This is the certificate for the Certificate Authority (CA) that is trusted by browsers and other clients. It's generally included last in the chain.

**Info**: The Edge operator retrieves this secret from the **EDGE-CR-NAMESPACE**. Ensure that this secret is created before initiating the Edge deployment or update process.

If you used **c8yedge** tool to install, you can configure this field using the below command: 
```shell
c8yedge config --set-file tlsSecret.tls.key=<path/to/tls.key> --set-file tlsSecret.tls.crt=<path/to/tls.crt>
```


## cloudTenant {#cloudtenant}
Edge can be managed, configured, and monitored remotely through a Cumulocity cloud tenant. You can control and troubleshoot your Edge deployments remotely. To enable this, you must first register Edge as a device within the cloud tenant.
See [Connecting Edge to a cloud tenant](/edge/connecting-edge-to-cloud/#register-edge-on-cloud) for more details.
            
            

### cloudTenant.domain {#cloudtenant-domain}
`spec.cloudTenant.domain` | string | Required

Cumulocity cloud tenant domain. For example, `<tenantid>.cumulocity.com`. See [Connecting Edge to a cloud tenant](/edge/connecting-edge-to-cloud) for more details.

If you used **c8yedge** tool to install, you can configure this field using the below command: 
```shell
c8yedge config --set cloudTenant.domain=<cloud-tenant-domain>
```

### cloudTenant.otp {#cloudtenant-otp}
`spec.cloudTenant.otp` | string | Optional

One-time password (OTP) for initial registration of Edge as a device in the cloud tenant. If both this and `cloudTenant.tlsSecretName` are not provided, Edge generates and uses self-signed certificates. See [Registering Edge in the cloud tenant](/edge/connecting-edge-to-cloud/#register-edge-on-cloud) for more details.

If you used **c8yedge** tool to install, you can configure this field using the below command: 
```shell
c8yedge config --set cloudTenant.otp=<one-time password>
```

### cloudTenant.tlsSecretName {#cloudtenant-tlssecretname}
`spec.cloudTenant.tlsSecretName` | string | Optional

Name of the Kubernetes secret containing the TLS/SSL private key and certificates with which Edge connects to the cloud through MQTT protocol using a X.509 certificate for authentication. If both this and `cloudTenant.otp` are not provided, Edge generates and uses self-signed certificates. This secret must contain two keys:
  - `tls.key`: TLS/SSL private key in the PEM format.
  - `tls.crt`: The TLS/SSL certificate chain associated with the private key in PEM format. It's essential to ensure the certificates are arranged in the correct sequence for TLS/SSL validation to succeed. The proper order of the certificate chain is:
    - **End-entity (Leaf) Certificate:** This is the TLS/SSL certificate issued to your domain or server, sometimes referred to as the "leaf" or "server" certificate.
    - **Intermediate certificate(s):** These certificates link your end-entity certificate to the trusted root certificate. If there are multiple intermediate certificates, they must be ordered correctly as well.
    - **Root CA certificate:** This is the certificate for the Certificate Authority (CA) that is trusted by browsers and other clients. It's generally included last in the chain.

**Info**: You can also reuse the secret name provided in the `spec.tlsSecretName` provided that the TLS/SSL certificate it references is issued by an intermediate Certificate Authority (CA) within your organization and can be added to the trusted certificate list of your Cumulocity cloud tenant.
**Info**: The Edge operator retrieves this secret from the **EDGE-CR-NAMESPACE**. Ensure that this secret is created before initiating the Edge deployment or update process.

See [Registering Edge in the cloud tenant](/edge/connecting-edge-to-cloud/#register-edge-on-cloud) for more details.

If you used **c8yedge** tool to install, you can configure this field using the below command: 
```shell
c8yedge config --set-file cloudTenant.tlsSecret.tls.key=<path/to/tls.key> --set-file cloudTenant.tlsSecret.tls.crt=<path/to/tls.crt>
```


## mongodb {#mongodb}
This field is used to specify the MongoDB admin credentials and persistent volume storage size.
            
            

### mongodb.credentialsSecretName {#mongodb-credentialssecretname}
`spec.mongodb.credentialsSecretName` | string | Optional

Name of the Kubernetes Secret containing the database admin credentials with which the MongoDB server must be configured. If not provided, `databaseAdmin` and a generated password are used as the database admin user and password.
This secret must contain two keys:
  - `MONGODB_DATABASE_ADMIN_USER`: Database admin username with which the MongoDB server is configured.
  - `MONGODB_DATABASE_ADMIN_PASSWORD`: Database admin password with which the MongoDB server is configured.

**Info**: The Edge operator retrieves this secret from the `EDGE-CR-NAMESPACE`. Ensure that this secret is created before initiating the Edge deployment or update process.

If you used **c8yedge** tool to install, you can configure this field using the below command: 
```shell
c8yedge config --set mongodb.credentialsSecret.MONGODB_DATABASE_ADMIN_USER=<database-admin-user> --set mongodb.credentialsSecret.MONGODB_DATABASE_ADMIN_PASSWORD=<database-admin-password>
```
            
            

### mongodb.resources.requests.storage {#mongodb-resources-requests-storage}
`spec.mongodb.resources.requests.storage` | string | Optional

Specify the size of the Persistent Volume Claim (PVC) named `mongod-data-edge-db-rs0-0` made by MongoDB server for persisting application data. If not provided, it defaults to 75GB. Once Edge is installed, you can only increase this value, but cannot reduce.

If you used **c8yedge** tool to install, you can configure this field using the below command: 
```shell
c8yedge config --set mongodb.resources.requests.storage=<storage-size>
```

### storageClassName {#storageclassname}
`spec.storageClassName` | string | Optional

The StorageClass to be used for Persistent Volume Claims (PVCs) requested by the Edge operator for persisting application data, microservice images, and logs.
If the `storageClassName` is not provided, the Edge operator requests PVCs without a StorageClass, thereby instructing Kubernetes to utilize the default StorageClass configured in the cluster. If you specify the name of an existing StorageClass for which dynamic provisioning is enabled, the Operator requests PVCs with that class name, thereby instructing Kubernetes to utilize dynamic provisioning according to the specified class.

**Info**: This value is used only during the Edge installation and can’t be changed for existing installations.

