---
weight: 55
layout: redirect
title: Monitoring support for microservices
---

{{< product-c8y-iot >}} supports the [OpenTelemetry (OTLP) framework](https://opentelemetry.io/) for exporting telemetry data (metrics, logs, and traces) from your microservice to help you analyze your application’s performance and behavior.
The Java Microservice SDK leverages the [OpenTelemetry Java agent](https://opentelemetry.io/docs/zero-code/java/agent/) which provides automatic instrumentation for many popular libraries and frameworks.

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
                            <otelJavaAgentDownloadUrl>https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/download/v2.21.0/opentelemetry-javaagent.jar</otelJavaAgentDownloadUrl>
                            ...
                        </configuration>
                    </execution>
                </executions>
            </plugin>
```

The Java agent JAR file download URL can be set with the parameter `otelJavaAgentDownloadUrl`.

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

