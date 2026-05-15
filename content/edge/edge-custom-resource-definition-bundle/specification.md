---
weight: 15
title: Specification
layout: redirect
---

### `spec.version`  {#spec-version}
**Path in CR**: `spec.version`
**Type:** `string` <br/>
**Required:** `Yes` <br/>

[DOC]
Edge version to install. Specify `2026` to install the latest available version from the release, or use a fully qualified version like `2026.0.1` to install a specific patch version.

### `spec.domain`  {#spec-domain}
**Path in CR**: `spec.domain`
**Type:** `string` <br/>
**Required:** `Yes` <br/>

[DOC]
A fully qualified domain name where Edge will be hosted, for example, myown.iot.com. The domain name provided here must match the scope of your Edge license, either the exact subdomain domain, or the parent domain.
[CLI-USAGE]
--set domain=<domain-name>

### `spec.licenseKey`  {#spec-licensekey}
**Path in CR**: `spec.licenseKey`
**Type:** `string` <br/>
**Required:** `Yes` <br/>

[DOC]
Edge license key you received for the domain. If you do not have a license key, you must request one from [product support](/additional-resources/contacting-support/). For more information, see [Domain name validation for Edge license key generation](/edge/installing-edge/#domain-name-validation-for-edge-license-key-generation).
When requesting license, you must provide the following details:
  - Your company name, under which the license has been bought.
  - The domain name (for example, myown.iot.com), where Edge will be reachable.
[CLI-HELP]
Edge license key you received for the domain. If you do not have a license key, you must request one from product support at https://cumulocity.com/docs/additional-resources/contacting-support/.
[CLI-USAGE]
--set-file licenseKey=<path/to/license.txt>

### `spec.company`  {#spec-company}
**Path in CR**: `spec.company`
**Type:** `string` <br/>
**Required:** `Yes` <br/>

[DOC]
Name of the “edge” tenant, for example, the company’s name.

**Info**: This value is used only during the Edge installation and can’t be changed for existing installations. All subsequent tenant changes must be made via the [user interface](/enterprise-tenant/managing-tenants/#to-view-or-edit-subtenant-properties) or the Cumulocity API.
[CLI-HELP]
Name of the “edge” tenant, for example, the company’s name. This value is used only during the initial Edge installation and cannot be changed for existing installations.
All subsequent tenant changes must be made via the user interface or the Cumulocity API.
[CLI-USAGE]
--set company=<company-name>

### `spec.email`  {#spec-email}
**Path in CR**: `spec.email`
**Type:** `string` <br/>
**Required:** `Yes` <br/>

[DOC]
The email address associated with the platform administrator account.

**Info**: This value is used only during the initial Edge installation to bootstrap the admin account and cannot be changed for existing installations. All subsequent admin user changes must be made via the [user interface](/standard-tenant/managing-users/#to-edit-a-user) or the Cumulocity API.
[CLI-HELP]
The email address associated with the administrator account. This value is used only during the initial Edge installation to bootstrap the admin account and cannot be changed for existing installations.
All subsequent admin user changes must be made via the user interface or the API.
[CLI-USAGE]
--set email=<email-address>

### `spec.cumulocityPasswordSecretName`  {#spec-cumulocitypasswordsecretname}
**Path in CR**: `spec.cumulocityPasswordSecretName`
**Type:** `string` <br/>
**Required:** `Yes` <br/>

[DOC]
Name of the Kubernetes secret containing the Cumulocity admin user password for both the Management tenant and the Edge tenant. This secret must contain a key named `INITIAL_C8Y_ADMIN_PASSWORD` with the initial password.

**Important**: The password must be at least 8 letters long.
**Info**: This value is used only during the Edge installation and can’t be changed for existing installations. All subsequent password changes must be made via the [user interface](/standard-tenant/managing-users/#to-edit-a-user) or the Cumulocity API.
**Info**: The Edge operator retrieves this secret from the **EDGE-CR-NAMESPACE**. Ensure that this secret is created before initiating the Edge deployment process.

### `spec.tlsSecretName`  {#spec-tlssecretname}
**Path in CR**: `spec.tlsSecretName`
**Type:** `string` <br/>
**Required:** `No` <br/>

[DOC]
Name of the Kubernetes secret containing the TLS/SSL private key and certificates for the domain name specified in the `spec.domain` field. If not provided, Edge automatically generates and assigns self-signed certificates.
This secret must contain two keys:
  - `tls.key`: TLS/SSL private key in the PEM format.<br>Generate a TLS/SSL key pair and a Certificate Signing Request (CSR) following your organization's policies, specifying either a wildcard domain in the Common Name (CN) (for example, **.iot.com*) or listing required domains in the Subject Alternative Name (SAN) field, including the Edge tenant and Management tenant tenant domains (for example, *myown.iot.com*, *management-myown.iot.com*).
  - `tls.crt`: The TLS/SSL certificate chain associated with the private key in PEM format. It's essential to ensure the certificates are arranged in the correct sequence for TLS/SSL validation to succeed. The proper order of the certificate chain is:
    - **End-entity (Leaf) Certificate:** This is the TLS/SSL certificate issued to your domain or server, sometimes referred to as the "leaf" or "server" certificate.
    - **Intermediate certificate(s):** These certificates link your end-entity certificate to the trusted root certificate. If there are multiple intermediate certificates, they must be ordered correctly as well.
    - **Root CA certificate:** This is the certificate for the Certificate Authority (CA) that is trusted by browsers and other clients. It's generally included last in the chain.

**Info**: The Edge operator retrieves this secret from the **EDGE-CR-NAMESPACE**. Ensure that this secret is created before initiating the Edge deployment or update process.
[CLI-HELP]
The TLS/SSL private key and certificates for the domain name specified in the `spec.domain` field. If not provided, Edge automatically generates and assigns self-signed certificates.
To provide your private key and certificates, you must set both of the following keys:
  - tls.key: TLS/SSL private key in PEM format.
  - tls.crt: TLS/SSL certificate chain associated with the private key in PEM format.
    It's essential to ensure the certificates are arranged in the correct sequence for TLS/SSL validation to succeed. The proper order of the certificate chain is:
  	- End-entity (Leaf) Certificate: This is the TLS/SSL certificate issued to your domain or server, sometimes referred to as the "leaf" or "server" certificate.
  	- Intermediate certificate(s): These certificates link your end-entity certificate to the trusted root certificate. If there are multiple intermediate certificates, they must be ordered correctly as well.
  	- Root CA certificate: This is the certificate for the Certificate Authority (CA) that is trusted by browsers and other clients. It's generally included last in the chain.
[CLI-USAGE]
--set-file tlsSecret.tls.key=<path/to/tls.key> --set-file tlsSecret.tls.crt=<path/to/tls.crt>

### `spec.cloudTenant.domain`  {#spec-cloudtenant-domain}
**Path in CR**: `spec.cloudTenant.domain`
**Type:** `string` <br/>
**Required:** `Yes` <br/>

[DOC]
Cumulocity cloud tenant domain. For example, `<tenantid>.cumulocity.com`. See [Connecting Edge to a cloud tenant](/edge/connecting-edge-to-cloud) for more details.
[CLI-HELP]
Edge can be managed, configured, and monitored remotely through a Cumulocity cloud tenant. You can control and troubleshoot your Edge deployments remotely. This requires registering Edge as a device within that tenant.
Specify the domain of your tenant. For example, 'acme.cumulocity.com' on cumulocity.com, where 'acme' is the subdomain of your tenant.
See Connecting Edge to a cloud tenant at https://cumulocity.com/docs/2026/edge/connecting-edge-to-cloud) for more details.
[CLI-USAGE]
--set cloudTenant.domain=<cloud-tenant-domain>

### `spec.cloudTenant.otp`  {#spec-cloudtenant-otp}
**Path in CR**: `spec.cloudTenant.otp`
**Type:** `string` <br/>
**Required:** `No` <br/>

[DOC]
One-time password (OTP) for initial registration of Edge as a device in the cloud tenant. If both this and `cloudTenant.tlsSecretName` are not provided, Edge generates and uses self-signed certificates. See [Registering Edge in the cloud tenant](/edge/connecting-edge-to-cloud/#register-edge-on-cloud) for more details.
[CLI-HELP]
One-time password (OTP) for initial registration of Edge as a device in the cloud tenant. If both this and `cloudTenant.tlsSecret` are not provided, Edge generates and uses self-signed certificates.
See Registering Edge in the cloud tenant at https://cumulocity.com/docs/2026/edge/connecting-edge-to-cloud/#register-edge-on-cloud for more details.
[CLI-USAGE]
--set cloudTenant.otp=<one-time password>

### `spec.cloudTenant.tlsSecretName`  {#spec-cloudtenant-tlssecretname}
**Path in CR**: `spec.cloudTenant.tlsSecretName`
**Type:** `string` <br/>
**Required:** `No` <br/>

[DOC]
Name of the Kubernetes secret containing the TLS/SSL private key and certificates with which Edge connects to the cloud through MQTT protocol using a X.509 certificate for authentication. If both this and `cloudTenant.otp` are not provided, Edge generates and uses self-signed certificates. This secret must contain two keys:
  - `tls.key`: TLS/SSL private key in the PEM format.
  - `tls.crt`: The TLS/SSL certificate chain associated with the private key in PEM format. It's essential to ensure the certificates are arranged in the correct sequence for TLS/SSL validation to succeed. The proper order of the certificate chain is:
    - **End-entity (Leaf) Certificate:** This is the TLS/SSL certificate issued to your domain or server, sometimes referred to as the "leaf" or "server" certificate.
    - **Intermediate certificate(s):** These certificates link your end-entity certificate to the trusted root certificate. If there are multiple intermediate certificates, they must be ordered correctly as well.
    - **Root CA certificate:** This is the certificate for the Certificate Authority (CA) that is trusted by browsers and other clients. It's generally included last in the chain.

**Info**: You can also reuse the secret name provided in the `spec.tlsSecretName` provided that the TLS/SSL certificate it references is issued by an intermediate Certificate Authority (CA) within your organization and can be added to the trusted certificate list of your Cumulocity cloud tenant.
**Info**: The Edge operator retrieves this secret from the **EDGE-CR-NAMESPACE**. Ensure that this secret is created before initiating the Edge deployment or update process.

See [Registering Edge in the cloud tenant](/edge/connecting-edge-to-cloud/#register-edge-on-cloud) for more details.
[CLI-HELP]
TLS/SSL private key and certificates with which you want Edge to connect to the cloud through MQTT protocol using a X.509 certificate for authentication. If both this and `cloudTenant.otp` are not provided, Edge generates and uses self-signed certificates.
To provide your private key and certificates, you must set both of the following keys:
  - tls.key: TLS/SSL private key in PEM format.
  - tls.crt: TLS/SSL certificate chain associated with the private key in PEM format.
    It's essential to ensure the certificates are arranged in the correct sequence for TLS/SSL validation to succeed. The proper order of the certificate chain is:
  	- End-entity (Leaf) Certificate: This is the TLS/SSL certificate issued to your domain or server, sometimes referred to as the "leaf" or "server" certificate.
  	- Intermediate certificate(s): These certificates link your end-entity certificate to the trusted root certificate. If there are multiple intermediate certificates, they must be ordered correctly as well.
  	- Root CA certificate: This is the certificate for the Certificate Authority (CA) that is trusted by browsers and other clients. It's generally included last in the chain.
See Registering Edge in the cloud tenant at https://cumulocity.com/docs/2026/edge/connecting-edge-to-cloud/#register-edge-on-cloud for more details.
[CLI-USAGE]
--set-file cloudTenant.tlsSecret.tls.key=<path/to/tls.key> --set-file cloudTenant.tlsSecret.tls.crt=<path/to/tls.crt>

### `spec.mongodb.credentialsSecretName`  {#spec-mongodb-credentialssecretname}
**Path in CR**: `spec.mongodb.credentialsSecretName`
**Type:** `string` <br/>
**Required:** `No` <br/>

[DOC]
Name of the Kubernetes Secret containing the database admin credentials with which the MongoDB server must be configured. If not provided, `databaseAdmin` and a generated password are used as the database admin user and password.
This secret must contain two keys:
  - `MONGODB_DATABASE_ADMIN_USER`: Database admin username with which the MongoDB server is configured.
  - `MONGODB_DATABASE_ADMIN_PASSWORD`: Database admin password with which the MongoDB server is configured.

**Info**: The Edge operator retrieves this secret from the `EDGE-CR-NAMESPACE`. Ensure that this secret is created before initiating the Edge deployment or update process.
[CLI-HELP]
Database admin credentials with which the MongoDB server must be configured. If not provided, `databaseAdmin` and a generated password are used as the database admin user and password.
To provide your own credentials, you must set both of the following keys:
  - MONGODB_DATABASE_ADMIN_USER: Database admin username.
  - MONGODB_DATABASE_ADMIN_PASSWORD: Database admin password.
[CLI-USAGE]
--set mongodb.credentialsSecret.MONGODB_DATABASE_ADMIN_USER=<database-admin-user> --set mongodb.credentialsSecret.MONGODB_DATABASE_ADMIN_PASSWORD=<database-admin-password>

### `spec.mongodb.resources.requests.storage`  {#spec-mongodb-resources-requests-storage}
**Path in CR**: `spec.mongodb.resources.requests.storage`
**Type:** `string` <br/>
**Required:** `No` <br/>

[DOC]
The amount of persistent storage allocated. Values are specified with suffixes, for example, 10Gi (10 Gibibytes) or 100Gi.
[CLI-USAGE]
--set mongodb.resources.requests.storage=<storage-size>

### `spec.storageClassName`  {#spec-storageclassname}
**Path in CR**: `spec.storageClassName`
**Type:** `string` <br/>
**Required:** `No` <br/>

[DOC]
The StorageClass to be used for Persistent Volume Claims (PVCs) requested by the Edge operator for persisting application data, microservice images, and logs.
If the `storageClassName` is not provided, the Edge operator requests PVCs without a StorageClass, thereby instructing Kubernetes to utilize the default StorageClass configured in the cluster. If you specify the name of an existing StorageClass for which dynamic provisioning is enabled, the Operator requests PVCs with that class name, thereby instructing Kubernetes to utilize dynamic provisioning according to the specified class.

**Info**: This value is used only during the Edge installation and can’t be changed for existing installations.