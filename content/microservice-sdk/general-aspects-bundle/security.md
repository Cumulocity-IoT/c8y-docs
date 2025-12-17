---
weight: 60
title: Security
layout: redirect
---

Microservices typically provide a REST API and {{< product-c8y-iot >}} provides a light API gateway (Proxy) for inbound REST requests. Inbound WebSocket requests are supported. The API gateway, located between the client and the microservice container, provides:

* Authorization: All calls are authenticated using {{< product-c8y-iot >}} credentials with basic or OAuth authorization.
* TLS Termination: TLS inbound calls are terminated and only HTTP is used inside the cluster.
* Metering: The API calls are metered in the API calls tenant statistics.
* Routing: The API gateway routes requests for <kbd>/service/&lt;name&gt;</kbd> to the microservice _&lt;name&gt;_. The request routed to the microservice includes the client’s request headers. If `contextPath` is defined in the application manifest, the API gateway routes requests for <kbd>/service/&lt;contextPath&gt;</kbd>.

### Authentication and authorization {#authentication-and-authorization}

A request to a microservice can be authenticated using various authentication mechanisms supported by {{< product-c8y-iot >}} such as:
1. Basic authentication
2. OAI-Secure
3. SSO
4. JWT token authentication (deprecated)

If you use Java for your development, we recommend you to use the Microservice SDK version 10.4.6 or later to gain support for all available authentication ways in {{< product-c8y-iot >}}.

In case of other programming languages, for which {{< product-c8y-iot >}} does not provide an SDK, we recommend developers to ensure support for all authentication mechanisms available in the {{< product-c8y-iot >}} platform.

The {{< product-c8y-iot >}} exposes the REST endpoint <kbd>/user/currentUser</kbd>. The microservice retrieves the {{< product-c8y-iot >}} address from the `C8Y_BASEURL` operating system environment variable. The microservice can verify if the credentials embedded in the HTTP request, which is handled by the microservice, are valid or not by using the REST endpoint <kbd>/user/currentUser</kbd>. If the credentials are correct, the response status from the <kbd>/user/currentUser</kbd> endpoint is `200 OK`. In case of incorrect credentials, the response contains a `401 Unauthorized` status code. In order to verify if the credentials are correct, the microservice copies the credentials from ongoing requests and sends them to the <kbd>/user/currentUser</kbd> endpoint.

Depending on the authentication method, the credentials can be passed to the microservice in various ways, such as:

  1. `Authorization` HTTP header
  2. Cookie called `authorization`
  3. Custom HTTP header called `X-XSRF-TOKEN`
  4. Custom HTTP header called `tfatoken`

If the incoming request contains the cookie `authorization`, the microservice must copy the cookie and the header `X-XSRF-TOKEN` to the request to the <kbd>/user/currentUser</kbd> endpoint. In other cases, the header `Authorization` must be copied. This is necessary, if a request contains the header `tfatoken`, which always must be included in the request to <kbd>/user/currentUser</kbd>.

You can see the credential validation flow on the sequence diagram below:

![OAuth](/images/microservices-sdk/ms-oauth.png)

**Example**

The microservice can receive the HTTP requests with the following header (see example below). The authentication process is based on basic authentication and SMS based TFA.

```
GET https://cumulocity.default.svc.cluster.local/test HTTP/1.1
accept: */*
authorization: Basic dGVuYW50X2lkL3VzZXJuYW1lOnBhc3N3b3JkCg==
connection: close
content-length: 0
cookie: REQUEST_ORIGIN=
host: auth-scope-management.default.svc.cluster.local:80
tfatoken: 23b75292468e0ba7fe03245d502d9c29e21e8a997fc7dd7e1a1df7fe31cbfb17
x-forwarded-host: cumulocity.default.svc.cluster.local:80
x-forwarded-prefix: /service/auth
x-forwarded-proto: http
x-real-ip: 192.168.1.20
```

The microservice sends the following requests to validate the credentials (provided that `c8y_baseurl` is equal to `https://cumulocity:8111`):

```
GET https://cumulocity:8111/user/currentUser HTTP/1.1
Accept: text/plain, application/json, application/*+json, */*
Authorization: Basic dGVuYW50X2lkL3VzZXJuYW1lOnBhc3N3b3JkCg==
Content-Length: 0
tfatoken: 23b75292468e0ba7fe03245d502d9c29e21e8a997fc7dd7e1a1df7fe31cbfb17
```

If the user is authenticated with OAI-Secure, the following REST request can reach the microservice:

```
GET https://cumulocity.default.svc.cluster.local/test HTTP/1.1
accept: */*
connection: close
content-length: 0
cookie: authorization=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0YzAwMGVlOC1hYjY5LTRiMzYtYWNhNC0xNzM4ZGYwZWNhZGIiLCJpc3MiOiJjdW11bG9jaXR5LmRlZmF1bHQuc3ZjLmNsdXN0ZXIubG9jYWwiLCJhdWQiOiJjdW11bG9jaXR5LmRlZmF1bHQuc3ZjLmNsdXN0ZXIubG9jYWwiLCJzdWIiOiJhZG1pbiIsInRjaSI6IjMxMWM3YjZiLWM1MmQtNGEzMC1iZDFlLWNiODdlMjNlODQyOSIsImlhdCI6MTY0NjkyODgxMywibmJmIjoxNjQ2OTI4ODEzLCJleHAiOjE2NDgxMzg0MTMsInRmYSI6ZmFsc2UsInRlbiI6Im1hbmFnZW1lbnQiLCJ4c3JmVG9rZW4iOiJHU0l6VFB4b2JQS1FJQmV2Uk1SWiJ9.NL5b9-iHSc3SLaPu87oazBd2_kjNiwO9tM_bXS3qCUd0_wTZ-BKc3q6sRHTKO_LNbtCQg3G6-7ZhD6TyvqjTLsyiZTsgMRtAE7ZiRPtXaFOA0_SDQ9kG_MztAZ3U9O008akgXcjEEAdphVv5eey_lADrg1BmIlqiBFoKts2JGSv1xFtXKIxpcVtRDGUkb-2qb8OhaHamT7b3HL628NSiH4VqfO38vkLLkimHEz-roqmbFGQ355TvA3-s_erO96j3rHbBPDsluFqFN0eOTCidBffKt6OvyKw-_64MaHHs6R9Ulsv-LuY-YAvlTZVxYwFAi3yn3mWlpXEAzvGYHMrx8A
host: auth-scope-management.default.svc.cluster.local:80
user-agent: insomnia/2022.1.1
x-forwarded-host: cumulocity.default.svc.cluster.local:80
x-forwarded-prefix: /service/auth
x-forwarded-proto: http
x-real-ip: 192.168.1.20
x-xsrf-token: GSIzTPxobPKQIBevRMRZ
```

To verify the credentials from the request above, the microservice sends the following request:

```
GET https://cumulocity:8111/user/currentUser HTTP/1.1
Accept: text/plain, application/json, application/*+json, */*
Content-Length: 0
Cookie: authorization=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0YzAwMGVlOC1hYjY5LTRiMzYtYWNhNC0xNzM4ZGYwZWNhZGIiLCJpc3MiOiJjdW11bG9jaXR5LmRlZmF1bHQuc3ZjLmNsdXN0ZXIubG9jYWwiLCJhdWQiOiJjdW11bG9jaXR5LmRlZmF1bHQuc3ZjLmNsdXN0ZXIubG9jYWwiLCJzdWIiOiJhZG1pbiIsInRjaSI6IjMxMWM3YjZiLWM1MmQtNGEzMC1iZDFlLWNiODdlMjNlODQyOSIsImlhdCI6MTY0NjkyODgxMywibmJmIjoxNjQ2OTI4ODEzLCJleHAiOjE2NDgxMzg0MTMsInRmYSI6ZmFsc2UsInRlbiI6Im1hbmFnZW1lbnQiLCJ4c3JmVG9rZW4iOiJHU0l6VFB4b2JQS1FJQmV2Uk1SWiJ9.NL5b9-iHSc3SLaPu87oazBd2_kjNiwO9tM_bXS3qCUd0_wTZ-BKc3q6sRHTKO_LNbtCQg3G6-7ZhD6TyvqjTLsyiZTsgMRtAE7ZiRPtXaFOA0_SDQ9kG_MztAZ3U9O008akgXcjEEAdphVv5eey_lADrg1BmIlqiBFoKts2JGSv1xFtXKIxpcVtRDGUkb-2qb8OhaHamT7b3HL628NSiH4VqfO38vkLLkimHEz-roqmbFGQ355TvA3-s_erO96j3rHbBPDsluFqFN0eOTCidBffKt6OvyKw-_64MaHHs6R9Ulsv-LuY-YAvlTZVxYwFAi3yn3mWlpXEAzvGYHMrx8A
X-XSRF-TOKEN: GSIzTPxobPKQIBevRMRZ
```

If a request to the <kbd>/user/currentUser</kbd> REST endpoint contains the correct credentials, the response body contains various information, such as user roles assigned to the user account. This information can be very useful in order for the microservice to carry out the authorization process.

When a microservice receives an HTTP request, it can become necessary to use the REST API exposed by {{< product-c8y-iot >}} to fulfil the request. To access the REST API, the microservice must provide a valid credential. It can use credentials that are present in the incoming REST request or use a dedicated user account, created to access resources belonging to tenants which are subscribed to the microservice. The choice between the credentials provided together with the incoming request to the microservice REST or a dedicated account depends on the use case. In order to utilize the user credentials received by the microservice in an incoming HTTP request, the microservice must copy the credentials according to the rules described above.

Furthermore, most of the HTTP requests which are sent by microservices must contain the HTTP header `X-Cumulocity-Application-Key`. The header indicates that an action is performed by an application. When the header is missing {{< product-c8y-iot >}} assumes that the HTTP request is originated by an IoT device. Therefore, a request without `X-Cumulocity-Application-Key` affects for example, the device availability state, or the billing data.

Thus, the microservice must only include `X-Cumulocity-Application-Key` if the microservice proxy requests from an IoT device to the {{< product-c8y-iot >}} platform.

If the microservice includes the header `X-Cumulocity-Application-Key`, the header must contain the correct application key. Then, the microservice retrieves the application key by sending a REST request to the endpoint <kbd>/application/currentApplication</kbd> exposed by the {{< product-c8y-iot >}} platform. The REST request must contain  the credentials for basic authentication in the following format: `tenantId/username:password`. The tenant ID, username and password are read by the microservice from the following operating system environment variables: C8Y_BOOTSTRAP_TENANT, C8Y_BOOTSTRAP_USER, and C8Y_BOOTSTRAP_PASSWORD. In order to increase the performance, the microservice must implement a caching mechanism related to the user credentials.

#### Microservice authentication and multi-tenancy {#microservice-authentication-and-multi-tenancy}

In general, microservices use the standard {{< product-c8y-iot >}} authentication mechanisms. This is executed in two steps:

1. The microservice can be created in any tenant that has **feature-microservice-hosting** enabled.
2. The microservices access the tenant API.

At the installation time of the microservice, an application is created in the owner tenant (usually a {{< management-tenant >}} or {{< enterprise-tenant >}}) reflecting the new microservice. In addition, a bootstrap user is created in the owner tenant that allows the microservice to retrieve subscriptions.
Whenever required, a platform administrator will subscribe a customer to the new microservice. As part of the subscription, a service user in the customer tenant is created using random credentials.

#### Microservice authorization {#microservice-authorization}

Authorization is relevant on two levels:

1. On the owner tenant level, the only authorization of a microservice is to access its own subscriptions.
2. For accessing customer tenants, the microservice installs a set of required permissions for being able to operate.

A microservice is associated with a bootstrap user in the owner tenant, which will make sure that only its subscriptions are returned. A microservice is also associated with a set of permissions that it requires for carrying out its function on a customer tenant.
These permissions are visualized in the Administration application. The permissions are associated with the service user that is created when a platform administration associates a microservice with a tenant (subscribes to it). The owner tenant must also be subscribed to if you intend to use microservice features on it.


### Users and roles {#users-and-roles}

There are three types of users:

* Tenant user: The user that invokes a microservice through its REST API endpoints <kbd>/service/&lt;microservice-name>/&lt;path></kbd> passed through by the proxy.
* Service user: A generated user that allows a microservice to access a subscribed tenant independent of a REST API invocation, for example, for initialization or regular jobs.
* Microservice bootstrap user: A user passed to the microservice for requesting subscribed tenants and service users.

The following role types are defined for users:

* Required roles: The permissions that are predefined to allow access to {{< product-c8y-iot >}} REST APIs.
For instance, if a microservice creates measurements using the service user, the measurement ADMIN permission must be added as a required role/permission of the application.
Required roles are added to the service users.
* Roles: The custom permissions provided to tenant platform users by the microservice developer.
These permissions can be assigned or revoked to the tenant platform users or groups using the Administration application.

Custom permissions must adhere to this name format to be shown in the UI:

ROLE_<NAME>_(READ|ADMIN|CREATE)

You can add them to the [application manifest](#microservice-manifest) in the `roles` properties as follows:

```json
"roles": [
    "ROLE_MY_MICROSERVICE_READ",
    "ROLE_MY_MICROSERVICE_ADMIN"
]
```

<!-- TODO: add/describe a picture of "required roles" and "provided roles" showing a microservice as a block -->

The permissions are set in the [Microservice manifest](#microservice-manifest). For more details about users, permissions, and roles, refer to [Managing permissions and roles](/standard-tenant/managing-permissions) or to the [User API](https://{{< domain-c8y >}}/api/core/#tag/User-API) in the {{< openapi >}}.

{{< c8y-admon-important >}}
Be aware that the term "role" might be misleading here as the the `roles` field and `requiredRoles` field expect a "permission" string (for example, ROLE_INVENTORY_ADMIN). See also the glossary for the usage of the terms [permission](/glossary/#permission) and [role](/glossary/#role) in the Cumulocity context.
{{< /c8y-admon-important >}}

### Microservice bootstrap {#microservice-bootstrap}

Each microservice receives a dedicated bootstrap user which ensures that a microservice can be identified by the platform and can have access only to the allowed resources. A microservice runtime provides bootstrap user and service user credentials as environment variables which can also be acquired via platform API. Note that depending on the isolation level, the environment variables differ.

| Variable | Description | Per tenant scope | Multi-tenant scope |
|:---------|:------------|:----------------:|:------------------:|
|C8Y&#95;BOOTSTRAP_TENANT|Application owner tenant ID | x | x |
|C8Y&#95;BOOTSTRAP_USER|Username of the bootstrap user | x | x |
|C8Y&#95;BOOTSTRAP_PASSWORD|Password of the bootstrap user | x | x |
|C8Y&#95;TENANT|Subscribed tenant ID | x | &nbsp; |
|C8Y&#95;USER|Username of the service user of a subscribed tenant | x | &nbsp; |
|C8Y&#95;PASSWORD|Password of the service user of a subscribed tenant | x | &nbsp; |

In multi-tenant scope, there is a single microservice deployment reused by multiple tenants and that is why service user credentials are not provided as hardcoded environment properties. However, a microservice running in multi-tenant isolation can retrieve all subscriptions via a GET request and using bootstrap credentials as follows:

```http
GET /application/currentApplication/subscriptions
Host: ...
Authorization: Basic ...
```

Bootstrap user credentials can be retrieved with a GET request authorized with application owner credentials:

```http
GET /application/applications/<APPLICATION_ID>/bootstrapUser
Host: ...
Authorization: Basic ...
```

An example of a typical user switching in multi-tenant isolation is presented below, where – in a hypothetical scenario – there is a need to send an alarm to each tenant subscribed to a microservice.

![microservice_user_switch_example](/images/concepts-guide/microserviceusersexample.png)

The user wants to employ microservice capabilities to raise alarms to all subscribed tenants calls.

Steps:

1. The user makes a request to the platform's endpoint <kbd>/service/&lt;microservice&gt;/createAlarms</kbd>.
2. The platform verifies the user credentials and redirects the request to the microservice.
3. The microservice reads the bootstrap credentials (from environment variables) and uses them to retrieve the service user credentials for all subscribed tenants.
4. The microservice iterates over the service user credentials and uses them to create alarms to each tenant.
5. The microservice returns the result to the platform, and the platform to the invoking user.

### Encryption {#encryption}

There is a mechanism to encrypt the tenant options.

If a tenant option is created with a key name that starts with "credentials.", it is automatically encrypted and can be fetched as unencrypted only by system users. Note that a space (" ") is not allowed as a tenant option value.

The options can be fetched via REST using the options endpoint at microservice runtime. Encrypted options are decrypted only if the tenant option category matches the category defined by the microservice. This category is determined based on the first non-blank value from:

1. The manifest settings category
2. The context path
3. The service name

Refer to tenant options in the [Tenant API](https://{{< domain-c8y >}}/api/core/#tag/Options) in the {{< openapi >}} for more details.
