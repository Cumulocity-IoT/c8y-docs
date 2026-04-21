---
weight: 15
title: Specification
layout: redirect
---

This section defines the Edge deployment’s configurations.






#### CumulocityIoTEdgeSpec



CumulocityIoTEdgeSpec defines the desired state of CumulocityIoTEdge




| Field | Description | CLI | Default | Validation |
| --- | --- | --- | --- | --- |
| version _[IntOrString](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.32/#intorstring-intstr-util)_ | Edge version to install.<br />Specify Major version to install the latest available version from the release, or use a fully qualified version to install a specific patch version. |  |  |  |
| licenseKey _string_ | Edge license file you received for the domain.<br />If you do not have a license, you must request one from product support at https://cumulocity.com/docs/additional-resources/contacting-support/<br />When requesting license, you must provide the following details:<br />&nbsp;&nbsp;- Domain Name: The domain name assigned to your Edge installation (for example, 'edge.mycompany.com').<br />&nbsp;&nbsp;- Company Name: The name under which the license was purchased.<br /> | `c8yedge config --set-file licenseKey=<path/to/license.txt>` |  |  |
| company _string_ | The name of your local Edge tenant (for example, your company’s name).<br />This value is used only during the initial Edge installation and cannot be changed for existing installations.<br />Once Edge is installed, company name must be changed via the user interface or the API.<br /> | `c8yedge config --set company=value` |  |  |
| domain _string_ | The Fully Qualified Domain Name (FQDN) where Edge will be hosted (for example, 'edge.mycompany.com').<br />The domain name provided here must match the scope of your Edge license, either the exact subdomain domain, or the parent domain.<br /> | `c8yedge config --set domain=value` |  |  |
| cumulocityPasswordSecretName _string_ | Name of the Kubernetes secret containing the Cumulocity admin user password for both the Management tenant and the Edge tenant.<br />This secret must contain a key named `INITIAL_C8Y_ADMIN_PASSWORD` with the initial password.<br />For more information, see [Cumulocity password secret](/edge-kubernetes/edge-custom-resource-definition/#k8-edge-cumulocity-password-secret).<br />Info: The Edge operator retrieves this secret from the EDGE-CR-NAMESPACE. Ensure that this secret is created before initiating the Edge deployment process.<br />Info: This value is used only during the Edge installation and can’t be changed for existing installations. All subsequent password changes are made via the user interface or the Cumulocity API. |  |  |  |
| email _string_ | The email address associated with the administrator account.<br />This value is used only during the initial Edge installation to bootstrap the admin account and cannot be changed for existing installations.<br />Once Edge is installed, the admin account must be changed via the user interface or the API.<br /> | `c8yedge config --set email=value` |  |  |
| tlsSecretName _string_ | This defines the identity of your Edge domain. If not provided, Edge automatically generates and assigns self-signed certificates.<br />To use your own certificates, you must set both of the following keys:<br />&nbsp;&nbsp;- tls.key: TLS/SSL private key in PEM format.<br />&nbsp;&nbsp;- tls.crt: TLS/SSL certificate chain associated with the private key in PEM format.<br />    For TLS validation to succeed, the certificates must be concatenated in the following order:<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- End-entity (Leaf) Certificate: The certificate issued to your specific Edge server.<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Intermediate Certificate(s): The link(s) between your leaf and the root CA. If multiple intermediates exist, they must be ordered correctly.<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Root CA Certificate: The final authority in the chain (generally included last).<br /> | `c8yedge config --set-file tlsSecret.tls.key=<path/to/tls.key> --set-file tlsSecret.tls.crt=<path/to/tls.crt>` |  |  |
| cloudTenant _[CloudTenantSpec](#cloudtenantspec)_ | Cumulocity cloud tenant details to configure and manage Edge remotely.<br /> | `c8yedge config --set cloudTenant.domain=value --set-file cloudTenant.tlsSecret.tls.key=<path/to/tls.key> --set-file cloudTenant.tlsSecret.tls.crt=<path/to/tls.crt>` |  |  |
| storageClassName _string_ | The Edge operator requests three PVCs, as outlined below.<br />- 75 GB, PVC named mongod-data-edge-db-rs0-0 made by MongoDB server for persisting application data. 75 GB is the default, and its value can be configured through the Edge CR field spec.mongodb.resources.requests.storage.<br />- 10 GB, PVC named microservices-registry-data made by the private registry for persisting microservice images.<br />- 5 GB, PVC named edge-logs made by the Edge logging component for persisting application and system logs.<br />Each of these PVCs utilizes the StorageClass if specified within the storageClassName field of the Edge CR.<br />- In case you omit the storageClassName, the Edge operator requests PVCs without a StorageClass, thereby instructing Kubernetes to utilize the default StorageClass configured in the cluster.<br />- Finally, if you specify the name of an existing StorageClass for which dynamic provisioning is enabled, the Operator requests PVCs with that class name, thereby instructing Kubernetes to utilize dynamic provisioning according to the specified class.<br />Info: This value is used only during the Edge installation and can’t be changed for existing installations. |  |  |  |
| core _[CoreSpec](#corespec)_ | Specify resource limits for the Cumulocity Core container. For more information, see Resource limits specification.<br /> | `c8yedge config --set core.resources.limits.cpu=value --set core.resources.limits.memory=value` |  |  |
| mongodb _[MongodbSpec](#mongodbspec)_ | Configurations needed to deploy the MongoDB server.<br /> | `c8yedge config --set mongodb.credentialsSecret.MONGODB_DATABASE_ADMIN_USER=value --set mongodb.credentialsSecret.MONGODB_DATABASE_ADMIN_PASSWORD=value` |  |  |
| microservices _[MicroserviceSpec](#microservicespec) array_ | Specify resources to allocate to each of the default Cumulocity microservices deployed.<br /> | `c8yedge config --set microservices.<microservice-name>.resources.limits.cpu=value` |  |  |


#### CloudTenantSpec








| Field | Description | CLI | Default | Validation |
| --- | --- | --- | --- | --- |
| domain _string_ | Edge can be managed, configured, and monitored remotely via a Cumulocity cloud tenant. This requires registering Edge as a device within that tenant.<br />The domain of your tenant. For example, 'acme.cumulocity.com' on cumulocity.com, where 'acme' is the subdomain of your tenant.<br /> | `c8yedge config --set domain=value` |  |  |
| tlsSecretName _string_ | Edge uses X.509 certificates to authenticate its connection to the cloud via MQTT. By default, Edge generates and assigns its own self-signed certificates.<br />To provide your own trusted certificates, you must set both of the following keys:<br />&nbsp;&nbsp;- tls.key: TLS/SSL private key in PEM format.<br />&nbsp;&nbsp;- tls.crt: TLS/SSL certificate chain associated with the private key in PEM format.<br />    For TLS validation to succeed, the certificates must be concatenated in the following order:<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- End-entity (Leaf) Certificate: The certificate issued to your specific Edge server.<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Intermediate Certificate(s): The link(s) between your leaf and the root CA. If multiple intermediates exist, they must be ordered correctly.<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Root CA Certificate: The final authority in the chain (generally included last).<br /> | `c8yedge config --set-file cloudTenant.tlsSecret.tls.key=<path/to/tls.key> --set-file cloudTenant.tlsSecret.tls.crt=<path/to/tls.crt>` |  |  |
#### CoreSpec








| Field | Description | CLI | Default | Validation |
| --- | --- | --- | --- | --- |
| resources _[PodResourcesWithLimits](#podresourceswithlimits)_ | Specify resource limits for the Cumulocity Core container. For more information, see Resource limits specification.<br /> | `c8yedge config --set core.resources.limits.cpu=value --set core.resources.limits.memory=value` |  |  |
#### LimitValues








| Field | Description | CLI | Default | Validation |
| --- | --- | --- | --- | --- |
| cpu _[Quantity](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.32/#quantity-resource-api)_ | Maximum compute resources allocated to this component. Values are specified in CPU units: for example, 1000m (1000 millicores) or 1 (1 full core). |  |  |  |
| memory _[Quantity](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.32/#quantity-resource-api)_ | Maximum RAM allocated to this component. Values are specified in bytes or with suffixes: for example, 512Mi (Mebibytes) or 2Gi (Gibibytes). |  |  |  |
#### MicroserviceSpec








| Field | Description | CLI | Default | Validation |
| --- | --- | --- | --- | --- |
| name _string_ | The name of the Cumulocity microservice. The allowed values are apama-ctrl, smartrule, opcua-mgmt-service, databroker-agent-server and datahub. |  |  |  |
| resources _[PodResourcesWithLimits](#podresourceswithlimits)_ | Specify resource limits for the Cumulocity microservice container. For more information, see Resource limits specification.<br /> | `c8yedge config --set microservices.<microservice-name>.resources.limits.cpu=value` |  |  |
#### MongodbSpec








| Field | Description | CLI | Default | Validation |
| --- | --- | --- | --- | --- |
| credentialsSecretName _string_ | By default, MongoDB is configured with the username 'databaseAdmin' and a randomly generated password.<br />To provide your own credentials, you must set both of the following keys:<br />&nbsp;&nbsp;- MONGODB_DATABASE_ADMIN_USER: Database admin username.<br />&nbsp;&nbsp;- MONGODB_DATABASE_ADMIN_PASSWORD: Database admin password.<br /> | `c8yedge config --set mongodb.credentialsSecret.MONGODB_DATABASE_ADMIN_USER=value --set mongodb.credentialsSecret.MONGODB_DATABASE_ADMIN_PASSWORD=value --set mongodb.resources.limits.cpu=value --set mongodb.resources.limits.memory=value` |  |  |
#### PodResourcesWithLimits








| Field | Description | CLI | Default | Validation |
| --- | --- | --- | --- | --- |
| limits _[LimitValues](#limitvalues)_ | Specify resource limits for the component. For more information, see Resource limits specification. |  |  |  |

