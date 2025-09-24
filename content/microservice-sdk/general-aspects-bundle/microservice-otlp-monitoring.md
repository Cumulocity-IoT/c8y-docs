---
weight: 95
title: Microservice monitoring
layout: redirect
---

{{< product-c8y-iot >}} supports the [OpenTelemetry framework](https://opentelemetry.io/) for exporting telemetry data (metrics, logs, and traces) from your microservice to help you analyze your application’s performance and behavior. 
The Java Microservice SDK leverages the [OpenTelemetry Java agent](https://opentelemetry.io/docs/zero-code/java/agent/) which provides automatic instrumentation for many popular libraries and frameworks.

### Configuration
Microservices can obtain the OTLP configuration from their individual tenant options. 
The tenant option category containing the OTLP parameters is determined in the following order:

- The settingsCategory defined in the microservice manifest
- The microservice’s context path
- The microservice name

A detailed list of configuration parameters can be found in the [OTLP configuration documentation](https://opentelemetry.io/docs/languages/java/configuration/).


#### OTLP tenant options
Tenant options with OTLP configuration parameters can be set via [REST commands](https://cumulocity.com/api/core/2025/#tag/Options) sent to 
the tenant options endpoint of the tenant.
For example, setting the endpoint to which OTLP signals are exported is done with this JSON document:

```json
{
"category": "<application-name>",
"key": "otel.exporter.otlp.endpoint",
"value": "https://otlp-gateway.net/otlp"
}
```

The OpenTelemetry parameter names in this document follow the specification in the [OTLP configuration documentation](https://opentelemetry.io/docs/languages/java/configuration/). 
The parameters are stored as tenant options and injected into the microservice as environment variables.
To convert a tenant option to an environment variable, these steps are applied as described [here](https://opentelemetry.io/docs/languages/java/configuration/#environment-variables-and-system-properties):
- Convert the name to uppercase.
- Replace all `.` and `-` characters with `_`.

For example, the `otel.sdk.disabled` tenant option is equivalent to the `OTEL_SDK_DISABLED` environment variable.

##### Encryption
Tenant options containing values to be encrypted, like passwords or access tokens, must be preceded with a `credentials.` prefix, 
as described in the [Encryption](/microservice-sdk/general-aspects/#encryption) chapter.

```json
{
"category": "<application-name>",
"key": "credentials.otel.exporter.otlp.headers",
"value": "Authorization=Basic MTAxNTI0OTpnbGNfZ..."
}
```

##### OTEL parameter values

As an example, the parameter values required to export OTLP signals to Grafana (without using an OTLP collector instance) could be set like this:

```properties
otel.exporter.otlp.endpoint: https://otlp-gateway-prod.grafana.net/otlp
otel.exporter.otlp.protocol: http/protobuf
credentials.otel.exporter.otlp.headers: <authentication data>
```

The `otel.service.name` parameter value is automatically set with the microservice pod name at run time.

The parameter `otel.resource.attributes` gets automatically assigned these properties:

```properties
service.name: application name
service.instance.id: microservice pod name
service.namespace: tenant name
service.version: application version
```

OTEL parameters are only set in the microservice deployment if either 
`otel.sdk.disabled=false` or `otel.javaagent.enabled=true`.
By default, OTLP parameters in the deployment are:
```properties
otel.sdk.disabled=true
otel.javaagent.enabled=false
```

{{< c8y-admon-important >}}
To let parameter changes take effect, the microservice must be unsubscribed and subscribed again.
{{< /c8y-admon-important >}}


### Enabling auto-instrumentation
Whether the microservice application gets instrumented by the java-agent is controlled 
with the parameter `otel.javaagent.enabled`. Setting it to `true` enables the instrumentation:

```json
{
"category": "<application-name>",
"key": "otel.javaagent.enabled",
"value": "true"
}
```

If enabled, the Java agent JAR file file will be downladed and attached to the microservice JVM at startup time.

Configuring auto-instrumentation for selected libraries or frameworks, or opting for manual instrumentation only, is described 
in the [Opentelemetry instrumention documentation](https://opentelemetry.io/docs/zero-code/java/agent/disable/).

### Manual instrumentation
In parallel to the automatic instrumentation, manual instrumentation of the microservice application is possible as well.

The Java agent creates the GlobalOpenTelemetry object which can be used as a starting point to create 
individual Tracer or Meter objects for [custom instrumentation](https://opentelemetry.io/docs/zero-code/java/agent/api/).

Java code example:
```java
import io.opentelemetry.api.GlobalOpenTelemetry;
import io.opentelemetry.api.metrics.Meter;

Meter meter = GlobalOpenTelemetry.getMeter("application");
```

A basic example for this use case can be found [here](https://github.com/open-telemetry/opentelemetry-java-examples/tree/main/javaagent/src/main/java/io/opentelemetry/example/javagent).

If instrumentation with the Java agent is disabled, complete manual instrumentation without the Java agent can be applied as well.
Detailed examples for various use cases can be found [here](https://github.com/open-telemetry/opentelemetry-java-examples/tree/main).

#### Maven dependencies
The Maven `pom.xml` file of the microservice application needs to be extended with the required OTLP library dependencies according to the manual instrumentation code.


