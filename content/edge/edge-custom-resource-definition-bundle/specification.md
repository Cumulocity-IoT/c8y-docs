---
weight: 15
title: Specification
layout: redirect
---

This section defines the Edge deployment’s configurations.






#### CumulocityIoTEdgeSpec



CumulocityIoTEdgeSpec defines the desired state of CumulocityIoTEdge




##### Fields

- `version` _[IntOrString](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.32/#intorstring-intstr-util)_ Required
  - Description:
    Edge version to install.
    Specify Major version to install the latest available version from the release, or use a fully qualified version to install a specific patch version.
  


- `licenseKey` _string_ Required
  - Description:
    Edge license file you received for the domain.
    If you do not have a license, you must request one from [product support](/additional-resources/contacting-support/).
    When requesting license, you must provide the following details:
      - Domain Name: The domain name assigned to your Edge installation (for example, 'edge.mycompany.com').
      - Company Name: The name under which the license was purchased.
    For more information, see [Edge license](/edge/installing-edge/#domain-name-validation-for-edge-license-key-generation).
  - **c8yedge tool:**
    ```shell
    c8yedge config --set-file licenseKey=<path/to/license.txt>
    ```


- `company` _string_ Required
  - Description:
    Name of the “edge” tenant, for example, the company’s name.
    **Info:** This value is used only during the Edge installation and can’t be changed for existing installations.
    All subsequent tenant changes are made via the user [interface](/enterprise-tenant/managing-tenants/#to-view-or-edit-subtenant-properties) or the Cumulocity API.
  - **c8yedge tool:**
    ```shell
    c8yedge config --set company=value
    ```


- `domain` _string_ Required
  - Description:
    The Fully Qualified Domain Name (FQDN) where Edge will be hosted (for example, 'edge.mycompany.com').
    The domain name provided here must match the scope of your Edge license, either the exact subdomain domain, or the parent domain.
  - **c8yedge tool:**
    ```shell
    c8yedge config --set domain=value
    ```


- `cumulocityPasswordSecretName` _string_ Required
  - Description:
    Name of the Kubernetes secret containing the Cumulocity admin user password for both the Management tenant and the Edge tenant.
    This secret must contain a key named `INITIAL_C8Y_ADMIN_PASSWORD` with the initial password.
    
    For more information, see [Cumulocity password secret](/edge/edge-custom-resource-definition/#k8-edge-cumulocity-password-secret).
    **Info:** The Edge operator retrieves this secret from the EDGE-CR-NAMESPACE.
    Ensure that this secret is created before initiating the Edge deployment process.
    **Info:** This value is used only during the Edge installation and can’t be changed for existing installations.
    All subsequent password changes are made via the user [interface](/standard-tenant/managing-users/#to-edit-a-user) or the Cumulocity API.
  


- `email` _string_ Required
  - Description:
    The email address associated with the administrator account.
    This value is used only during the initial Edge installation to bootstrap the admin account and cannot be changed for existing installations.
    Once Edge is installed, the admin account must be changed via the user [interface](/standard-tenant/managing-users/#to-edit-a-user) or the Cumulocity API.
  - **c8yedge tool:**
    ```shell
    c8yedge config --set email=value
    ```


- `tlsSecretName` _string_ Optional
  - Description:
    This defines the identity of your Edge domain. If not provided, Edge automatically generates and assigns self-signed certificates.
    To use your own certificates, you must set both of the following keys:
      - tls.key: TLS/SSL private key in PEM format.
      - tls.crt: TLS/SSL certificate chain associated with the private key in PEM format.
        For TLS validation to succeed, the certificates must be concatenated in the following order:
          - End-entity (Leaf) Certificate: The certificate issued to your specific Edge server.
          - Intermediate Certificate(s): The link(s) between your leaf and the root CA. If multiple intermediates exist, they must be ordered correctly.
          - Root CA Certificate: The final authority in the chain (generally included last).
    For more information, see [Edge TLS secret](edge/edge-custom-resource-definition/#tls-secret).
    **Info:** The Edge operator retrieves this secret from the `EDGE-CR-NAMESPACE`.
    Ensure that this secret is created before initiating the Edge deployment or update process.
  - **c8yedge tool:**
    ```shell
    c8yedge config --set-file tlsSecret.tls.key=<path/to/tls.key> --set-file tlsSecret.tls.crt=<path/to/tls.crt>
    ```


- `cloudTenant` _[CloudTenantSpec](#cloudtenantspec)_ Optional
  - Description:
    Cumulocity cloud tenant details to configure and manage Edge remotely.
    For more information, see [Edge cloud tenant](/edge/edge-custom-resource-definition/#cloud-tenant).
  - **c8yedge tool:**
    ```shell
    c8yedge config --set cloudTenant.domain=value --set-file cloudTenant.tlsSecret.tls.key=<path/to/tls.key> --set-file cloudTenant.tlsSecret.tls.crt=<path/to/tls.crt>
    ```


- `storageClassName` _string_ Optional
  - Description:
    The Edge operator requests three PVCs, as outlined below.
    - 75 GB, PVC named mongod-data-edge-db-rs0-0 made by MongoDB server for persisting application data.
      75 GB is the default, and its value can be configured through the Edge CR field spec.mongodb.resources.requests.storage.
    - 10 GB, PVC named microservices-registry-data made by the private registry for persisting microservice images.
    - 5 GB, PVC named edge-logs made by the Edge logging component for persisting application and system logs.
      Each of these PVCs utilizes the StorageClass if specified within the storageClassName field of the Edge CR.
    - In case you omit the storageClassName, the Edge operator requests PVCs without a StorageClass,
      thereby instructing Kubernetes to utilize the default StorageClass configured in the cluster.
    - Finally, if you specify the name of an existing StorageClass for which dynamic provisioning is enabled,
      the Operator requests PVCs with that class name, thereby instructing Kubernetes to utilize dynamic provisioning according to the specified class.
    **Info:** This value is used only during the Edge installation and can’t be changed for existing installations.
  


- `core` _[CoreSpec](#corespec)_ Optional
  - Description:
    Specify resource limits for the Cumulocity Core container.
    For more information, see [Cumulocity Core configurations](/edge/edge-custom-resource-definition/#c8y-core-config).
  - **c8yedge tool:**
    ```shell
    c8yedge config --set core.resources.limits.cpu=value --set core.resources.limits.memory=value
    ```


- `mongodb` _[MongodbSpec](#mongodbspec)_ Optional
  - Description:
    Configurations needed to deploy the MongoDB server.
    For more information, see [MongoDB](/edge/edge-custom-resource-definition/#mongodb).
  - **c8yedge tool:**
    ```shell
    c8yedge config --set mongodb.credentialsSecret.MONGODB_DATABASE_ADMIN_USER=value --set mongodb.credentialsSecret.MONGODB_DATABASE_ADMIN_PASSWORD=value
    ```


- `microservices` _[MicroserviceSpec](#microservicespec) array_ Optional
  - Description:
    Specify resources to allocate to each of the default Cumulocity microservices deployed.
    For more information, see [Microservices](/edge/edge-custom-resource-definition/#microservices).
  - **c8yedge tool:**
    ```shell
    c8yedge config --set microservices.<microservice-name>.resources.limits.cpu=value
    ```




#### CloudTenantSpec








##### Fields

- `domain` _string_ Required
  - Description:
    Edge can be managed, configured, and monitored remotely via a Cumulocity cloud tenant. This requires registering Edge as a device within that tenant.
    The domain of your tenant. For example, 'acme.cumulocity.com' on cumulocity.com, where 'acme' is the subdomain of your tenant.
  - **c8yedge tool:**
    ```shell
    c8yedge config --set domain=value
    ```


- `otp` _string_ Optional
  - Description:
    One-time password (OTP) for initial registration of Edge as a device in the cloud tenant.
    If both this and `cloudTenant.tlsSecret` are not provided, Edge generates and uses self-signed certificates.
    For more information see [Connecting Edge to a cloud tenant](/edge/connecting-edge-to-cloud/#register-edge-on-cloud).
  - **c8yedge tool:**
    ```shell
    c8yedge config --set cloudTenant.domain=<cloud tenant's domain> --set cloudTenant.otp=<one-time password>
    ```


- `tlsSecretName` _string_ Optional
  - Description:
    Edge uses X.509 certificates to authenticate its connection to the cloud via MQTT. If both this and `cloudTenant.otp` are not provided, Edge generates and uses self-signed certificates.
    To provide your own trusted certificates, you must set both of the following keys:
      - tls.key: TLS/SSL private key in PEM format.
      - tls.crt: TLS/SSL certificate chain associated with the private key in PEM format.
        For TLS validation to succeed, the certificates must be concatenated in the following order:
          - End-entity (Leaf) Certificate: The certificate issued to your specific Edge server.
          - Intermediate Certificate(s): The link(s) between your leaf and the root CA. If multiple intermediates exist, they must be ordered correctly.
          - Root CA Certificate: The final authority in the chain (generally included last).
    For more information, see [Edge TLS secret](edge/edge-custom-resource-definition/#tls-secret).
  - **c8yedge tool:**
    ```shell
    c8yedge config --set-file cloudTenant.tlsSecret.tls.key=<path/to/tls.key> --set-file cloudTenant.tlsSecret.tls.crt=<path/to/tls.crt>
    ```


#### CoreSpec








##### Fields

- `resources` _[PodResourcesWithLimits](#podresourceswithlimits)_ Optional
  - Description:
    Specify resource limits for the Cumulocity Core container. For more information, see Resource limits specification.
  - **c8yedge tool:**
    ```shell
    c8yedge config --set core.resources.limits.cpu=value --set core.resources.limits.memory=value
    ```








#### LimitValues








##### Fields

- `cpu` _[Quantity](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.32/#quantity-resource-api)_ Optional
  - Description:
    Maximum compute resources allocated to this component. Values are specified in CPU units: for example, 1000m (1000 millicores) or 1 (1 full core).
  


- `memory` _[Quantity](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.32/#quantity-resource-api)_ Optional
  - Description:
    Maximum RAM allocated to this component. Values are specified in bytes or with suffixes: for example, 512Mi (Mebibytes) or 2Gi (Gibibytes).
  


#### MicroserviceSpec








##### Fields

- `name` _string_ Required
  - Description:
    The name of the Cumulocity microservice. The allowed values are apama-ctrl, smartrule, opcua-mgmt-service, databroker-agent-server and datahub.
  


- `resources` _[PodResourcesWithLimits](#podresourceswithlimits)_ Optional
  - Description:
    Specify resource limits for the Cumulocity microservice container. For more information, see Resource limits specification.
  - **c8yedge tool:**
    ```shell
    c8yedge config --set microservices.<microservice-name>.resources.limits.cpu=value
    ```


#### MongodbSpec








##### Fields

- `credentialsSecretName` _string_ Optional
  - Description:
    By default, MongoDB is configured with the username 'databaseAdmin' and a randomly generated password.
    To provide your own credentials, you must set both of the following keys:
      - MONGODB_DATABASE_ADMIN_USER: Database admin username.
      - MONGODB_DATABASE_ADMIN_PASSWORD: Database admin password.
  - **c8yedge tool:**
    ```shell
    c8yedge config --set mongodb.credentialsSecret.MONGODB_DATABASE_ADMIN_USER=value --set mongodb.credentialsSecret.MONGODB_DATABASE_ADMIN_PASSWORD=value
    ```


- `resources` _[PodResources](#podresources)_ Optional
  - Description:
    Specify resource limits for the MongoDB server. Specify the size of the Persistent Volume Claim (PVC) named mongod-data-edge-db-rs0-0 made by MongoDB server for persisting application data.``
  - **c8yedge tool:**
    ```shell
    c8yedge config --set mongodb.resources.limits.cpu=value --set mongodb.resources.limits.memory=value --set mongodb.resources.requests.storage=value
    ```


#### PodResources








##### Fields

- `limits` _[LimitValues](#limitvalues)_ Optional
  - Description:
    Specify resource limits for the component.
  


- `requests` _[RequestValues](#requestvalues)_ Optional
  - Description:
    Specify resource requests for the component.
  


#### PodResourcesWithLimits








##### Fields

- `limits` _[LimitValues](#limitvalues)_ Optional
  - Description:
    Specify resource limits for the component. For more information, see Resource limits specification.
  


#### RequestValues








##### Fields

- `storage` _[Quantity](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.32/#quantity-resource-api)_ Optional
  - Description:
    The amount of persistent storage allocated to this component. Values are specified with suffixes: for example, 10Gi (10 Gibibytes) or 100Gi.
    Note: Storage can only be increased, decreasing is not supported.
  



