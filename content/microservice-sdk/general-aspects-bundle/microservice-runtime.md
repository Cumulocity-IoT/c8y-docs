---
weight: 70
title: Microservice runtime
layout: redirect
---


Microservices deployed on the platform have a specific runtime environment and they must understand certain details about the specific {{< product-c8y-iot >}} cluster they run in. For example, a microservice needs to know the endpoint address of the {{< product-c8y-iot >}} REST APIs. This information is provided by environment variables and they are injected by {{< product-c8y-iot >}} when the container is started.

### Environment variables {#environment-variables}

The following environment variables are available for microservices:

Name  | Details  
------|--------
APPLICATION_NAME  |  The name of the microservice application
APPLICATION_KEY  |  The key of the microservice application
SERVER_PORT       |  Default open port (80)
MICROSERVICE_SUBSCRIPTION_ENABLED  |  Default value: true
C8Y_BASEURL  |  Platform address (contains port number)
C8Y_BASEURL_MQTT  |  Platform address of the MQTT server (contains port number)
C8Y_BASEURL_PULSAR  |  Platform address of the Pulsar broker (doesn't contain port number, defaults to `6650`) used to access Messaging Service topics via native Pulsar client libraries
C8Y_MICROSERVICE_ISOLATION  |  Isolation level (MULTI_TENANT or PER_TENANT)
C8Y_BOOTSTRAP_REGISTER  |  Indicator whether the microservice should perform self registration or not. <br>Default value: false
C8Y_BOOTSTRAP_TENANT  |  Bootstrap user tenant, for MULTI_TENANT - microservice owner
C8Y_BOOTSTRAP_USER  |  Bootstrap username
C8Y_BOOTSTRAP_PASSWORD  |  Bootstrap user password
C8Y_TENANT  |  Application user tenant (available only for PER_TENANT isolation)
C8Y_USER  |  Application username (available only for PER_TENANT isolation)
C8Y_PASSWORD  |  Application user password (available only for PER_TENANT isolation)
MEMORY_LIMIT  |  Max memory that can be used. Default value: 256M
TZ | Timezone from the host machine or configurable tenant options
LOG4J_FORMAT_MSG_NO_LOOKUPS | Disables the vulnerable Log4j lookup feature (see [CVE-2021-44228](https://www.cve.org/CVERecord?id=CVE-2021-44228)) <br>Default value: true

##### Example {#example}

Prerequisite: The microservice has been packed and deployed in the Docker repository. Get the microservice image name and tag with the following command:

```shell
$ docker images
```

Run the Docker container for the microservice providing the environment variables:

```shell
$ docker run -–cap-drop=ALL -–cap-add=NET_BIND_SERVICE \
   -e C8Y_BOOTSTRAP_TENANT=<BOOTSTRAP_TENANT> \
   -e C8Y_BOOTSTRAP_USER=<BOOTSTRAP_USERNAME> \
   -e C8Y_BOOTSTRAP_PASSWORD=<BOOTSTRAP_USER_PASSWORD> \
   -e C8Y_MICROSERVICE_ISOLATION=MULTI_TENANT \
   -e C8Y_BASEURL=<URL> -i -t <DOCKER_REPOSITORY_IMAGE>:<TAG>
```

Use a backslash (\\) before special characters such as `&, !, ;, \`.

#### Timezone variable {#timezone-variable}

The timezone variable allows configuring a default timezone used by the microservice.
The microservice installer injects the `TZ` environment variable into the microservice according to the following settings:

- Tenant option in the microservice owner tenant
- Platform application environment variables (MICROSERVICE_RUNTIME_TIMEZONE)

The tenant option has higher priority, that means, if the parameter is set in both places, the value from the tenant option is taken.

##### Example {#example}

Assuming that the microservice owner has the tenant option:

```json
{
    "category" : "microservice.runtime",
    "key" : "timezone",
    "value" : "Europe/Warsaw"
}
```

Deploying and running the microservice inside Docker will result in passing the following variables into the microservice environment:

```properties
TZ=Europe/Warsaw
```

When using Java-based microservices this variable is automatically read and applied to the Java process, no additional work is required. Microservices developed with other programming languages may require some manual work, that is, loading the TZ value from the environment and using it to configure the time zone on the language level programmatically.

#### Proxy variables {#proxy-variables}

Proxy variables are used to set a proxy URL for different protocols. For the microservices written in Java, setting each variable will result in passing the corresponding parameter into the JVM runtime (for detailed information see the [Java Networking and Proxies](https://docs.oracle.com/javase/8/docs/technotes/guides/net/proxies.html) webpage).

Proxy variables are passed into the microservice environment during installation. The microservice installer passes the variables into the environment according to the following settings:

 - Tenant options in the microservice owner tenant
 - Platform application environment variables

Tenant options have higher priority, that means, if the parameter is set in both places, the value from the tenant option is taken.

The table below contains the options and proxy variables:

 Tenant option              | Platform env variable                          | Microservice env variable   
----------------------------|------------------------------------------------|---------------------------
 proxy.http.host            | MICROSERVICE_RUNTIME_PROXY_HTTP_HOST           | PROXY_HTTP_HOST           
 proxy.http.port            | MICROSERVICE_RUNTIME_PROXY_HTTP_PORT           | PROXY_HTTP_PORT           
 proxy.http.non.proxy.hosts | MICROSERVICE_RUNTIME_PROXY_HTTP_NON_PROXY_HOSTS| PROXY_HTTP_NON_PROXY_HOSTS
 proxy.https.host           | MICROSERVICE_RUNTIME_PROXY_HTTPS_HOST          | PROXY_HTTPS_HOST          
 proxy.https.port           | MICROSERVICE_RUNTIME_PROXY_HTTPS_PORT          | PROXY_HTTPS_PORT          
 proxy.socks.host           | MICROSERVICE_RUNTIME_PROXY_SOCKS_HOST          | PROXY_SOCKS_HOST          
 proxy.socks.port           | MICROSERVICE_RUNTIME_PROXY_SOCKS_PORT          | PROXY_SOCKS_PORT          

All tenant options have the same category: `microservice.runtime`

For each protocol (HTTP, HTTPS, Socks), microservice environment variables are passed into runtime only if the HOST parameter is set. If the HOST parameter is missing, other parameters for the same protocol are not processed.


##### Examples {#examples}

The microservice owner tenant has the tenant options:

```json
{ "category" : "microservice.runtime", "key" : "proxy.http.host", "value" : "10.11.12.13" }
{ "category" : "microservice.runtime", "key" : "proxy.http.port", "value" : "8080" }
```

and there is an environment variable in the platform application:

```properties
MICROSERVICE_RUNTIME_PROXY_HTTP_PORT=8181
```

Deploying and running the microservice inside Docker will result in passing the following variables into the microservice environment (notice PORT value):

```properties
PROXY_HTTP_HOST=10.11.12.13
PROXY_HTTP_PORT=8080
```
<hr>
The microservice owner tenant has the tenant option:

```json
{ "category" : "microservice.runtime", "key" : "proxy.https.host", "value" : "10.11.12.13" }
```

and there is an environment variable in the platform application:

```properties
MICROSERVICE_RUNTIME_PROXY_HTTPS_PORT=8181
```

Deploying and running the microservice inside Docker will result in passing the following variables into the microservice environment:

```properties
PROXY_HTTP_HOST=10.11.12.13
PROXY_HTTP_PORT=8181        
```

<hr>
The microservice owner tenant has the tenant options:

```json
{ "category" : "microservice.runtime", "key" : "proxy.http.port", "value" : "8080" }
{ "category" : "microservice.runtime", "key" : "proxy.http.non.proxy.hosts", "value" : "localhost" }
```

and the proxy HOST is not set (neither in tenant option, nor env variable).

Deploying and running the microservice inside Docker will not pass any proxy environment variable.

<hr>
The microservice owner tenant has the tenant option:

```json
{ "category" : "microservice.runtime", "key" : "socks.http.host", "value" : "10.11.12.13" }  
```

Deploying and running the microservice inside Docker will result in passing the following variable into the microservice environment (only host parameter):

```properties
SOCKS_HTTP_HOST=10.11.12.13
```

### Platform access and other microservices {#platform-access-and-other-microservices}

To execute requests against the {{< product-c8y-iot >}} platform running a microservice, you must send requests to the host specified by the `C8Y_BASEURL` variable.

A microservice does not have direct access to other microservices running on the platform. Instead, a microservice must use the platform as a proxy. The endpoint used to access other applications is <kbd>&lt;C8Y_BASEURL>/service/&lt;OTHER_APPLICATION_NAME>/</kbd>.

{{< c8y-admon-important >}}
`C8Y_BASEURL` allows access only to microservices' REST endpoints. Hence, a microservice cannot retrieve information from UI applications.


When accessing the REST endpoints the connections may time out. This requires the HTTP client of a microservice to be prepared for retries to establish a connection.

The client used in the Microservice SDK performs the required retries. Using it avoids issues with timed-out connections.
{{< /c8y-admon-important >}}
