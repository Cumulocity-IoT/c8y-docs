---
weight: 15
title: Specification
layout: redirect
---

This section defines the Edge deployment’s configurations.






### CumulocityIoTEdge {#cumulocityiotedgespec}



#### Fields

- `version` | [IntOrString](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.32/#intorstring-intstr-util) | Required <br/>
    Edge version to install. Specify `2026` to install the latest available version from the release, or use a fully qualified version like `2026.0.1` to install a specific patch version.
  
<br/>


- `domain` | string | Required <br/>
    A fully qualified domain name where Edge will be hosted, for example, myown.iot.com. The domain name provided here must match the scope of your Edge license, either the exact subdomain domain, or the parent domain.
  <br/><br/>If you used **c8yedge** tool to install, you can configure this field using the below command: 
  ```shell
  c8yedge config --set domain=<domain-name>
  ```
<br/>


- `licenseKey` | string | Required <br/>
    Edge license key you received for the domain. If you do not have a license key, you must request one from [product support](/additional-resources/contacting-support/).For more information, see [Domain name validation for Edge license key generation](/edge/installing-edge/#domain-name-validation-for-edge-license-key-generation).  
  When requesting license, you must provide the following details:
  
    - Your company name, under which the license has been bought.
  
    - The domain name (for example, myown.iot.com), where Edge will be reachable.
  <br/><br/>If you used **c8yedge** tool to install, you can configure this field using the below command: 
  ```shell
  c8yedge config --set-file licenseKey=<path/to/license.txt>
  ```
<br/>


- `company` | string | Required <br/>
    Name of the “edge” tenant, for example, the company’s name.  
  <br/>  
  **Info**: This value is used only during the Edge installation and can’t be changed for existing installations. All subsequent tenant changes must be made via the [user interface](/enterprise-tenant/managing-tenants/#to-view-or-edit-subtenant-properties) or the Cumulocity API.
  <br/><br/>If you used **c8yedge** tool to install, you can configure this field using the below command: 
  ```shell
  c8yedge config --set company=<company-name>
  ```
<br/>


- `email` | string | Required <br/>
    The email address associated with the platform administrator account.  
  <br/>  
  **Info**: This value is used only during the initial Edge installation to bootstrap the admin account and cannot be changed for existing installations. All subsequent admin user changes must be made via the [user interface](/standard-tenant/managing-users/#to-edit-a-user) or the Cumulocity API.
  <br/><br/>If you used **c8yedge** tool to install, you can configure this field using the below command: 
  ```shell
  c8yedge config --set email=<email-address>
  ```
<br/>


- `cumulocityPasswordSecretName` | string | Required <br/>
    Name of the Kubernetes secret containing the Cumulocity admin user password for both the Management tenant and the Edge tenant. This secret must contain a key named `INITIAL_C8Y_ADMIN_PASSWORD` with the initial password.  
  <br/>  
  **Important**: The password must be at least 8 letters long.  
  **Info**: This value is used only during the Edge installation and can’t be changed for existing installations. All subsequent password changes must be made via the [user interface](/standard-tenant/managing-users/#to-edit-a-user) or the Cumulocity API.  
  **Info**: The Edge operator retrieves this secret from the **EDGE-CR-NAMESPACE**. Ensure that this secret is created before initiating the Edge deployment process.
  
<br/>


- `tlsSecretName` | string | Optional <br/>
    Name of the Kubernetes secret containing the TLS/SSL private key and certificates for the domain name specified in the `spec.domain` field. If not provided, Edge automatically generates and assigns self-signed certificates.  
  This secret must contain two keys:
  
    - `tls.key`: TLS/SSL private key in the PEM format.<br>Generate a TLS/SSL key pair and a Certificate Signing Request (CSR) following your organization's policies, specifying either a wildcard domain in the Common Name (CN) (for example, **.iot.com*) or listing required domains in the Subject Alternative Name (SAN) field, including the Edge tenant and Management tenant tenant domains (for example, *myown.iot.com*, *management-myown.iot.com*).
  
    - `tls.crt`: The TLS/SSL certificate chain associated with the private key in PEM format. It's essential to ensure the certificates are arranged in the correct sequence for TLS/SSL validation to succeed. The proper order of the certificate chain is:
  
      - **End-entity (Leaf) Certificate:** This is the TLS/SSL certificate issued to your domain or server, sometimes referred to as the "leaf" or "server" certificate.
  
      - **Intermediate certificate(s):** These certificates link your end-entity certificate to the trusted root certificate. If there are multiple intermediate certificates, they must be ordered correctly as well.
  
      - **Root CA certificate:** This is the certificate for the Certificate Authority (CA) that is trusted by browsers and other clients. It's generally included last in the chain.  
    
  <br/>  
  **Info**: The Edge operator retrieves this secret from the **EDGE-CR-NAMESPACE**. Ensure that this secret is created before initiating the Edge deployment or update process.
  <br/><br/>If you used **c8yedge** tool to install, you can configure this field using the below command: 
  ```shell
  c8yedge config --set-file tlsSecret.tls.key=<path/to/tls.key> --set-file tlsSecret.tls.crt=<path/to/tls.crt>
  ```
<br/>


- `cloudTenant` | [CloudTenantSpec](#cloudtenantspec) | Optional <br/>
    Cumulocity cloud tenant details to configure and manage Edge remotely.
  
<br/>


- `mongodb` | [MongodbSpec](#mongodbspec) | Optional <br/>
    Configurations needed to deploy the MongoDB server.
  
<br/>


- `storageClassName` | string | Optional <br/>
    The StorageClass to be used for Persistent Volume Claims (PVCs) requested by the Edge operator for persisting application data, microservice images, and logs.  
  If the `storageClassName` is not provided, the Edge operator requests PVCs without a StorageClass, thereby instructing Kubernetes to utilize the default StorageClass configured in the cluster. If you specify the name of an existing StorageClass for which dynamic provisioning is enabled, the Operator requests PVCs with that class name, thereby instructing Kubernetes to utilize dynamic provisioning according to the specified class.  
  <br/>  
  **Info**: This value is used only during the Edge installation and can’t be changed for existing installations.
  
<br/>





### CloudTenant {#cloudtenantspec}

Edge can be managed, configured, and monitored remotely through a Cumulocity cloud tenant. You can control and troubleshoot your Edge deployments remotely. To enable this, you must first register Edge as a device within the cloud tenant.

See [Connecting Edge to a cloud tenant](/edge/connecting-edge-to-cloud/#register-edge-on-cloud) for more details.

#### Fields

- `domain` | string | Required <br/>
    Cumulocity cloud tenant domain. For example, `<tenantid>.cumulocity.com`. See [Connecting Edge to a cloud tenant](/edge/connecting-edge-to-cloud) for more details.
  <br/><br/>If you used **c8yedge** tool to install, you can configure this field using the below command: 
  ```shell
  c8yedge config --set cloudTenant.domain=<cloud-tenant-domain>
  ```
<br/>


- `otp` | string | Optional <br/>
    One-time password (OTP) for initial registration of Edge as a device in the cloud tenant. If both this and `cloudTenant.tlsSecretName` are not provided, Edge generates and uses self-signed certificates. See [Registering Edge in the cloud tenant](/edge/connecting-edge-to-cloud/#register-edge-on-cloud) for more details.
  <br/><br/>If you used **c8yedge** tool to install, you can configure this field using the below command: 
  ```shell
  c8yedge config --set cloudTenant.otp=<one-time password>
  ```
<br/>


- `tlsSecretName` | string | Optional <br/>
    Name of the Kubernetes secret containing the TLS/SSL private key and certificates with which Edge connects to the cloud through MQTT protocol using a X.509 certificate for authentication. If both this and `cloudTenant.otp` are not provided, Edge generates and uses self-signed certificates. This secret must contain two keys:
  
    - `tls.key`: TLS/SSL private key in the PEM format.
  
    - `tls.crt`: The TLS/SSL certificate chain associated with the private key in PEM format. It's essential to ensure the certificates are arranged in the correct sequence for TLS/SSL validation to succeed. The proper order of the certificate chain is:
  
      - **End-entity (Leaf) Certificate:** This is the TLS/SSL certificate issued to your domain or server, sometimes referred to as the "leaf" or "server" certificate.
  
      - **Intermediate certificate(s):** These certificates link your end-entity certificate to the trusted root certificate. If there are multiple intermediate certificates, they must be ordered correctly as well.
  
      - **Root CA certificate:** This is the certificate for the Certificate Authority (CA) that is trusted by browsers and other clients. It's generally included last in the chain.  
    
  <br/>  
  **Info**: You can also reuse the secret name provided in the `spec.tlsSecretName` provided that the TLS/SSL certificate it references is issued by an intermediate Certificate Authority (CA) within your organization and can be added to the trusted certificate list of your Cumulocity cloud tenant.  
  **Info**: The Edge operator retrieves this secret from the **EDGE-CR-NAMESPACE**. Ensure that this secret is created before initiating the Edge deployment or update process.  
  <br/>  
  See [Registering Edge in the cloud tenant](/edge/connecting-edge-to-cloud/#register-edge-on-cloud) for more details.
  <br/><br/>If you used **c8yedge** tool to install, you can configure this field using the below command: 
  ```shell
  c8yedge config --set-file cloudTenant.tlsSecret.tls.key=<path/to/tls.key> --set-file cloudTenant.tlsSecret.tls.crt=<path/to/tls.crt>
  ```
<br/>



### Mongodb {#mongodbspec}

This field is used to specify the MongoDB admin credentials and persistent volume storage size.

#### Fields

- `credentialsSecretName` | string | Optional <br/>
    Name of the Kubernetes Secret containing the database admin credentials with which the MongoDB server must be configured. If not provided, `databaseAdmin` and a generated password are used as the database admin user and password.  
  This secret must contain two keys:
  
    - `MONGODB_DATABASE_ADMIN_USER`: Database admin username with which the MongoDB server is configured.
  
    - `MONGODB_DATABASE_ADMIN_PASSWORD`: Database admin password with which the MongoDB server is configured.  
  <br/>  
  **Info**: The Edge operator retrieves this secret from the `EDGE-CR-NAMESPACE`. Ensure that this secret is created before initiating the Edge deployment or update process.
  <br/><br/>If you used **c8yedge** tool to install, you can configure this field using the below command: 
  ```shell
  c8yedge config --set mongodb.credentialsSecret.MONGODB_DATABASE_ADMIN_USER=<database-admin-user> --set mongodb.credentialsSecret.MONGODB_DATABASE_ADMIN_PASSWORD=<database-admin-password>
  ```
<br/>


- `resources` | [PodResources](#podresources) | Optional <br/>
    Specify the size of the Persistent Volume Claim (PVC) named `mongod-data-edge-db-rs0-0` made by MongoDB server for persisting application data. If not provided, it defaults to 75GB.  
  <br/>  
  **Info**: Once Edge is installed, you can only increase this value, but cannot reduce.
  <br/><br/>If you used **c8yedge** tool to install, you can configure this field using the below command: 
  ```shell
  c8yedge config --set mongodb.resources.requests.storage=<storage-size>
  ```
<br/>



### PodResources {#podresources}



#### Fields

- `requests` | [RequestValues](#requestvalues) | Optional <br/>
    Specify resource requests for the component.
  
<br/>



### RequestValues {#requestvalues}



#### Fields

- `storage` | [Quantity](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.32/#quantity-resource-api) | Optional <br/>
    The amount of persistent storage allocated. Values are specified with suffixes, for example, 10Gi (10 Gibibytes) or 100Gi.
  <br/><br/>If you used **c8yedge** tool to install, you can configure this field using the below command: 
  ```shell
  c8yedge config --set mongodb.resources.requests.storage=<storage-size>
  ```
<br/>




