---
weight: 55
layout: redirect
title: Monitoring support for microservices
---

{{< product-c8y-iot >}} supports the [OpenTelemetry (OTLP) framework](https://opentelemetry.io/) for exporting telemetry data (metrics, logs, and traces) from your microservice to help you analyze your application’s performance and behavior.
The Java Microservice SDK leverages the [OpenTelemetry Java agent](https://opentelemetry.io/docs/zero-code/java/agent/) which provides automatic instrumentation for many popular libraries and frameworks.

### OTLP Configuration {#otlp-configuration}
Microservices can obtain the current OTLP configuration from their individual [tenant options](https://cumulocity.com/api/core/#tag/Options).
The category names for tenant options assigned to a microservice can be defined by:

- The settingsCategory defined in the microservice manifest
- The microservice’s context path
- The microservice name

The tenant option category containing the OTLP parameters is determined in the order of the list above.
All OTLP parameters must be defined in the same category.


#### OTLP tenant options {#otlp-tenant-options}
Tenant options with OTLP configuration parameters can be set via [REST commands](https://cumulocity.com/api/core/#operation/postOptionCollectionResource) sent to
the tenant options endpoint of the tenant.
For example, setting the endpoint to which OTLP signals are exported is done with this JSON document:

```json
{
"category": "<application-name>",
"key": "otel.exporter.otlp.endpoint",
"value": "https://otlp-gateway.net/otlp"
}
```

A detailed list of configuration parameters can be found in the [OTLP configuration documentation](https://opentelemetry.io/docs/languages/java/configuration/).
The parameters are stored as tenant options and injected into the microservice as environment variables.
To convert a tenant option to an environment variable, these steps are applied as described in [Environment variables and system properties](https://opentelemetry.io/docs/languages/java/configuration/#environment-variables-and-system-properties):
- Convert the name to uppercase.
- Replace all `.` and `-` characters with `_`.

For example, the `otel.sdk.disabled` tenant option is equivalent to the `OTEL_SDK_DISABLED` environment variable.

##### Encryption {#encryption}
Tenant options containing values to be encrypted, like passwords or access tokens, must be preceded with a `credentials.` prefix,
as described in the [Encryption](/microservice-sdk/general-aspects/#encryption) section.

```json
{
"category": "<application-name>",
"key": "credentials.otel.exporter.otlp.headers",
"value": "Authorization=Basic MTAxNTI0OTpnbGNfZ..."
}
```

##### OTEL parameter values {#otel-parameter-values}

As an example, the parameter values required to export OTLP signals to Grafana (without using an OTLP collector instance) could be set like this:

```properties
otel.exporter.otlp.endpoint: https://otlp-gateway-prod.grafana.net/otlp
otel.exporter.otlp.protocol: http/protobuf
credentials.otel.exporter.otlp.headers: <authentication data>
```

The `otel.service.name` parameter value is automatically set with the microservice pod name at runtime.

The parameter `otel.resource.attributes` gets automatically assigned these properties:

```properties
service.name: application name
service.instance.id: microservice pod name
service.namespace: tenant name
service.version: application version
```

OTEL parameters are only set in the microservice deployment if either
`otel.sdk.disabled=false` or `otel.javaagent.enabled=true`.


{{< c8y-admon-important >}}
To let parameter changes take effect, the microservice must be unsubscribed and subscribed again.
{{< /c8y-admon-important >}}


### Enabling auto-instrumentation {#enabling-auto-instrumentation}
The instrumentation of the microservice application by the OpenTelemetry Java agent is controlled by the `otel.javaagent.enabled` parameter. Setting this parameter to `true` enables instrumentation.

```json
{
"category": "<application-name>",
"key": "otel.javaagent.enabled",
"value": "true"
}
```

If enabled, the Java agent JAR file is attached to the microservice JVM at startup time.

{{< c8y-admon-important >}}
To enable or disable instrumentation, the microservice must be unsubscribed and subscribed again.
{{< /c8y-admon-important >}}

Configuring auto-instrumentation for selected libraries or frameworks, or opting for manual instrumentation only, is described
in the [OpenTelemetry instrumention documentation](https://opentelemetry.io/docs/zero-code/java/agent/disable/).

#### Maven configuration
Besides setting up the OTLP configuration in tenant options, the Java agent JAR file must be included in the microservice image at build time.
By default, this JAR file is not contained in the image.
To download and copy the Java agent JAR file to the microservice image, the `microservice-package-maven-plugin` must be
configured with the `otelJavaAgentInclude` element set to `true` in the Maven `pom.xml` file:

```xml
            <plugin>
                <groupId>com.nsn.cumulocity.clients-java</groupId>
                <artifactId>microservice-package-maven-plugin</artifactId>
                <version>${c8y.version}</version>
                <executions>
                    <execution>
                        <id>package</id>
                        <phase>package</phase>
                        <goals>
                            <goal>package</goal>
                        </goals>
                        <configuration>
                            ...
                            <otelJavaAgentInclude>true</otelJavaAgentInclude>
                            ...
                        </configuration>
                    </execution>
                </executions>
            </plugin>
```


{{< c8y-admon-important >}}
If the Java agent JAR file is not contained in the microservice image
and `otel.javaagent.enabled` is set to `true`, then the microservice will fail to start.
The error message will be like "Error opening ... opentelemetry-javaagent.jar".
{{< /c8y-admon-important >}}


### Manual instrumentation {#manual-instrumentation}
In addition to automatic instrumentation, microservices can be manually instrumented.

The Java agent creates the GlobalOpenTelemetry object which can be used as a starting point to create
individual Tracer or Meter objects for [custom instrumentation](https://opentelemetry.io/docs/zero-code/java/agent/api/).

Java code example:
```java
import io.opentelemetry.api.GlobalOpenTelemetry;
import io.opentelemetry.api.metrics.Meter;

Meter meter = GlobalOpenTelemetry.getMeter("application");
```

A basic example for this use case can be found in the [OpenTelemetry GitHub repository](https://github.com/open-telemetry/opentelemetry-java-examples/tree/main/javaagent/src/main/java/io/opentelemetry/example/javagent).

If instrumentation with the Java agent is disabled, complete manual instrumentation without the Java agent can be applied as well.
Detailed examples for various use cases can be found in the [OpenTelemetry GitHub repository](https://github.com/open-telemetry/opentelemetry-java-examples/tree/main).

#### Maven dependencies {#maven-dependencies}
The Maven `pom.xml` file of the microservice application needs to be extended with the required OTLP library dependencies according to the manual instrumentation code.
