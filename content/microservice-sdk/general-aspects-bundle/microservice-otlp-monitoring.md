---
weight: 95
title: Microservice monitoring
layout: redirect
---

Monitoring microservice behavior at runtime is crucial for ensuring the stability, reliability, and performance of the application.
{{< product-c8y-iot >}} allows you to export monitoring data to a customer-provided observability backend using OpenTelemetry.

The OpenTelemetry standard provides a holistic approach to collect and export application logs, metrics, and traces to monitoring systems of various vendors.
You can freely define which data is collected and to which endpoint it is sent.

OpenTelemetry is an open standard with implementations supporting several [languages](https://opentelemetry.io/docs/languages/) like Java, Python, Go, Ruby, C++.
{{< product-c8y-iot >}} provides the option of zero-code instrumentation for microservices developed with the Microservice SDK for Java. 
Refer to the [Microservice SDK for Java](/microservice-sdk/java/) section for details.

### OTLP configuration {#otlp-configuration}
Microservices can obtain the current OTLP configuration from their individual [tenant options](https://cumulocity.com/api/core/#tag/Options).
The category names for tenant options assigned to a microservice can be defined by:

- The `settingsCategory` defined in the microservice manifest
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

