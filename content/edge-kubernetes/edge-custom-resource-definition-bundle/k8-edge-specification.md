# API Reference

## Packages

- [edge.cumulocity.com/v1](#edgecumulocitycomv1)

## edge.cumulocity.com/v1

Package v1 contains API Schema definitions for the edge v1 API group

### Resource Types

- [CumulocityIoTEdge](#cumulocityiotedge)

#### CloudTenantSpec

*Appears in:*

- [CumulocityIoTEdgeSpec](#cumulocityiotedgespec)


| Field                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | CLI                                                                                                                                  | Default | Validation |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------- | ---------- |
| `domain` *string*        | Edge can be managed, configured, and monitored remotely via a Cumulocity cloud tenant. This requires registering Edge as a device within that tenant. The domain of your tenant. For example, 'acme.cumulocity.com' on cumulocity.com, where 'acme' is the subdomain of your tenant.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | c8yedge config --set domain=value                                                                                                    |         |            |
| `tlsSecretName` *string* | Edge uses X.509 certificates to authenticate its connection to the cloud via MQTT. By default, Edge generates and assigns its own self-signed certificates. To provide your own trusted certificates, you must set both of the following keys: - tls.key: TLS/SSL private key in PEM format. - tls.crt: TLS/SSL certificate chain associated with the private key in PEM format. For TLS validation to succeed, the certificates must be concatenated in the following order: - End-entity (Leaf) Certificate: The certificate issued to your specific Edge server. - Intermediate Certificate(s): The link(s) between your leaf and the root CA. If multiple intermediates exist, they must be ordered correctly. - Root CA Certificate: The final authority in the chain (generally included last). | c8yedge config --set-file cloudTenant.tlsSecret.tls.key=<path/to/tls.key> --set-file cloudTenant.tlsSecret.tls.crt=<path/to/tls.crt> |         |            |


#### CoreSpec

*Appears in:*

- [CumulocityIoTEdgeSpec](#cumulocityiotedgespec)


| Field                                                           | Description                                                                                                         | CLI                                                                                           | Default | Validation |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ------- | ---------- |
| `resources` *[PodResourcesWithLimits](#podresourceswithlimits)* | Specify resource limits for the Cumulocity Core container. For more information, see Resource limits specification. | c8yedge config --set core.resources.limits.cpu=value --set core.resources.limits.memory=value |         |            |


#### CumulocityIoTEdge

CumulocityIoTEdge is the Schema for the CumulocityIoTEdges API


| Field                                                                                                              | Description                                                     | CLI | Default | Validation |
| ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- | --- | ------- | ---------- |
| `apiVersion` *string*                                                                                              | `edge.cumulocity.com/v1`                                        |     |         |            |
| `kind` *string*                                                                                                    | `CumulocityIoTEdge`                                             |     |         |            |
| `metadata` *[ObjectMeta](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.32/#objectmeta-v1-meta)* | Refer to Kubernetes API documentation for fields of `metadata`. |     |         |            |
| `spec` *[CumulocityIoTEdgeSpec](#cumulocityiotedgespec)*                                                           |                                                                 |     |         |            |


#### CumulocityIoTEdgeSpec

CumulocityIoTEdgeSpec defines the desired state of CumulocityIoTEdge

*Appears in:*

- [CumulocityIoTEdge](#cumulocityiotedge)


| Field                                                                                                                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | CLI                                                                                                                                                                   | Default | Validation |
| ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ---------- |
| `version` *[IntOrString](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.32/#intorstring-intstr-util)* | Edge version to install. Specify "2025" to install the latest available version from the release, or use a fully qualified version like "2025.0.1" to install a specific patch version.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |                                                                                                                                                                       |         |            |
| `licenseKey` *string*                                                                                                   | Edge license file you received for the domain. If you do not have a license, you must request one from product support at [https://cumulocity.com/docs/additional-resources/contacting-support/](https://cumulocity.com/docs/additional-resources/contacting-support/) When requesting license, you must provide the following details: - Domain Name: The domain name assigned to your Edge installation (for example, 'edge.mycompany.com'). - Company Name: The name under which the license was purchased.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `c8yedge config --set-file licenseKey=<path/to/license.txt>`                                                                                                          |         |            |
| `company` *string*                                                                                                      | The name of your local Edge tenant (for example, your company’s name). This value is used only during the initial Edge installation and cannot be changed for existing installations. Once Edge is installed, company name must be changed via the user interface or the API.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `c8yedge config --set company=value`                                                                                                                                  |         |            |
| `domain` *string*                                                                                                       | The Fully Qualified Domain Name (FQDN) where Edge will be hosted (for example, 'edge.mycompany.com'). The domain name provided here must match the scope of your Edge license, either the exact subdomain domain, or the parent domain.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `c8yedge config --set domain=value`                                                                                                                                   |         |            |
| `email` *string*                                                                                                        | The email address associated with the administrator account. This value is used only during the initial Edge installation to bootstrap the admin account and cannot be changed for existing installations. Once Edge is installed, the admin account must be changed via the user interface or the API.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `c8yedge config --set email=value`                                                                                                                                    |         |            |
| `tlsSecretName` *string*                                                                                                | This defines the identity of your Edge domain. If provided, Edge automatically generates and assigns self-signed certificates. To use your own certificates, you must set both of the following keys: - tls.key: TLS/SSL private key in PEM format. - tls.crt: TLS/SSL certificate chain associated with the private key in PEM format. For TLS validation to succeed, the certificates must be concatenated in the following order: - End-entity (Leaf) Certificate: The certificate issued to your specific Edge server. - Intermediate Certificate(s): The link(s) between your leaf and the root CA. If multiple intermediates exist, they must be ordered correctly. - Root CA Certificate: The final authority in the chain (generally included last).                                                                                                                                                                                                                                                                                                                                                                                                                                          | `c8yedge config --set-file tlsSecret.tls.key=<path/to/tls.key> --set-file tlsSecret.tls.crt=<path/to/tls.crt>`                                                        |         |            |
| `cloudTenant` *[CloudTenantSpec](#cloudtenantspec)*                                                                     | Cumulocity cloud tenant details to configure and manage Edge remotely.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `c8yedge config --set cloudTenant.domain=value --set-file cloudTenant.tlsSecret.tls.key=<path/to/tls.key> --set-file cloudTenant.tlsSecret.tls.crt=<path/to/tls.crt>` |         |            |
| `storageClassName` *string*                                                                                             | The Edge operator requests three PVCs, as outlined below. - 75 GB, PVC named mongod-data-edge-db-rs0-0 made by MongoDB server for persisting application data. 75 GB is the default, and its value can be configured through the Edge CR field spec.mongodb.resources.requests.storage. - 10 GB, PVC named microservices-registry-data made by the private registry for persisting microservice images. - 5 GB, PVC named edge-logs made by the Edge logging component for persisting application and system logs. Each of these PVCs utilizes the StorageClass if specified within the storageClassName field of the Edge CR. - In case you omit the storageClassName, the Edge operator requests PVCs without a StorageClass, thereby instructing Kubernetes to utilize the default StorageClass configured in the cluster. - Finally, if you specify the name of an existing StorageClass for which dynamic provisioning is enabled, the Operator requests PVCs with that class name, thereby instructing Kubernetes to utilize dynamic provisioning according to the specified class. Info: This value is used only during the Edge installation and can’t be changed for existing installations. | Not applicable.                                                                                                                                                       |         |            |
| `core` *[CoreSpec](#corespec)*                                                                                          | Specify resource limits for the Cumulocity Core container. For more information, see Resource limits specification.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `c8yedge config --set core.resources.limits.cpu=value --set core.resources.limits.memory=value`                                                                       |         |            |
| `mongodb` *[MongodbSpec](#mongodbspec)*                                                                                 | Configurations needed to deploy the MongoDB server.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `c8yedge config --set mongodb.credentialsSecret.MONGODB_DATABASE_ADMIN_USER=value --set mongodb.credentialsSecret.MONGODB_DATABASE_ADMIN_PASSWORD=value`              |         |            |
| `microservices` *[MicroserviceSpec](#microservicespec) array*                                                           | Specify resources to allocate to each of the default Cumulocity microservices deployed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `c8yedge config --set microservices.<microservice-name>.resources.limits.cpu=value`                                                                                   |         |            |


#### EdgeStatusType

*Underlying type:* *string*

*Appears in:*

- [CumulocityIoTEdgeStatus](#cumulocityiotedgestatus)


| Field                | Description |
| -------------------- | ----------- |
| `Installing`         |             |
| `Updating`           |             |
| `Deleting`           |             |
| `Ready`              |             |
| `Deleted`            |             |
| `InstallLoopBackOff` |             |
| `UpdateLoopBackOff`  |             |
| `DeleteLoopBackOff`  |             |


#### HelpCommandsKeyType

*Underlying type:* *string*

*Appears in:*

- [CumulocityIoTEdgeStatus](#cumulocityiotedgestatus)

#### LimitValues

*Appears in:*

- [PodResources](#podresources)
- [PodResourcesWithLimits](#podresourceswithlimits)


| Field                                                                                                             | Description                                                                                                                                        | CLI | Default | Validation |
| ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ------- | ---------- |
| `cpu` *[Quantity](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.32/#quantity-resource-api)*    | Maximum compute resources allocated to this component. Values are specified in CPU units: for example, 1000m (1000 millicores) or 1 (1 full core). |     |         |            |
| `memory` *[Quantity](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.32/#quantity-resource-api)* | Maximum RAM allocated to this component. Values are specified in bytes or with suffixes: for example, 512Mi (Mebibytes) or 2Gi (Gibibytes).        |     |         |            |


#### MicroserviceSpec

*Appears in:*

- [CumulocityIoTEdgeSpec](#cumulocityiotedgespec)


| Field                                                           | Description                                                                   | CLI                                                                                 | Default | Validation |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------- | ---------- |
| `name` *string*                                                 | Specify the name of the microservice to configure. For example, 'apama-ctrl'. | `c8yedge config --set microservices.<microservice-name>.resources.limits.cpu=value` |         |            |
| `resources` *[PodResourcesWithLimits](#podresourceswithlimits)* |                                                                               |                                                                                     |         |            |


#### MongodbSpec

*Appears in:*

- [CumulocityIoTEdgeSpec](#cumulocityiotedgespec)


| Field                                       | Description                                                                                                                                                                                                                                                                                          | CLI                                                                                                                                                                                                                                           | Default | Validation |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ---------- |
| `credentialsSecretName` *string*            | By default, MongoDB is configured with the username 'databaseAdmin' and a randomly generated password. To provide your own credentials, you must set both of the following keys: - MONGODB_DATABASE_ADMIN_USER: Database admin username. - MONGODB_DATABASE_ADMIN_PASSWORD: Database admin password. | `c8yedge config --set mongodb.credentialsSecret.MONGODB_DATABASE_ADMIN_USER=value --set mongodb.credentialsSecret.MONGODB_DATABASE_ADMIN_PASSWORD=value --set mongodb.resources.limits.cpu=value --set mongodb.resources.limits.memory=value` |         |            |
| `resources` *[PodResources](#podresources)* | Specify resource limits for the MongoDB server. Specify the size of the Persistent Volume Claim (PVC) named mongod-data-edge-db-rs0-0 made by MongoDB server for persisting application data.``                                                                                                      | `c8yedge config --set mongodb.resources.limits.cpu=value --set mongodb.resources.limits.memory=value --set mongodb.resources.requests.storage=value`                                                                                          |         |            |


#### PodResources

*Appears in:*

- [MongodbSpec](#mongodbspec)


| Field                                        | Description | CLI | Default | Validation |
| -------------------------------------------- | ----------- | --- | ------- | ---------- |
| `limits` *[LimitValues](#limitvalues)*       |             |     |         |            |
| `requests` *[RequestValues](#requestvalues)* |             |     |         |            |


#### PodResourcesWithLimits

*Appears in:*

- [CoreSpec](#corespec)
- [MicroserviceSpec](#microservicespec)


| Field                                  | Description | CLI | Default | Validation |
| -------------------------------------- | ----------- | --- | ------- | ---------- |
| `limits` *[LimitValues](#limitvalues)* |             |     |         |            |


#### RequestValues

*Appears in:*

- [PodResources](#podresources)


| Field                                                                                                              | Description                                                                                                                                                                                                    | CLI | Default | Validation |
| ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ------- | ---------- |
| `storage` *[Quantity](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.32/#quantity-resource-api)* | The amount of persistent storage allocated to this component. Values are specified with suffixes: for example, 10Gi (10 Gibibytes) or 100Gi. Note: Storage can only be increased, decreasing is not supported. |     |         |            |


