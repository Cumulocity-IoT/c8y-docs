{{< c8y-admon-important >}}
To ensure this feature works smoothly, please ensure that your environment is properly configured with both 
Pulsar and the MQTT Service running before starting the {{< product-c8y-iot >}} configuration. Without these 
prerequisites, the {{< product-c8y-iot >}} may generate excessive log data indicating that it cannot establish 
a connection to the MQTT Service.
{{< /c8y-admon-important >}}

{{< c8y-admon-info >}}
Please note that this section does not cover the basics of MQTT communication. If you are not familiar 
with MQTT, we recommend reviewing one of the many available online resources. For more information, you 
can check the [MQTT website](https://mqtt.org/mqtt-specification/).
{{< /c8y-admon-info >}}

### What is MQTT Service?

The MQTT Service, developed by Cumulocity, provides several key benefits:

- **Multi-tenancy support**: A single endpoint can serve multiple tenants.
- **Identity management**: Services connected to the MQTT Service can leverage Cumulocity tenant platform credentials.
- **Low traffic overhead**: Efficient communication with minimal data load.
- **WebSocket and TLS support**: Secure and flexible communication options.
- **Horizontal scalability**: Easily scale the service as needed.
- **Custom payload formats**: In this case, we use SENML-JSON, a common format for transmitting device measurement data.

Starting from release 2025, the {{< product-c8y-iot >}} supports sending device data to the Cumulocity MQTT 
microservice. This service queues the data, allowing you to read and process it through your custom service. 
The data will be persisted in the Cumulocity platform, giving you the option to use integrated data analysis tools.

### Configuration Instructions

To configure the {{< product-c8y-iot >}} to send device data to the MQTT Service, use the following settings:

| **Property** | **Description** |
|--------------|-----------------|
| `C8Y.mqtt.messaging.service.url` | The WebSocket URL for the MQTT service. For example: `ws://cumulocity.default.svc.cluster.local` |
| `C8Y.mqtt.messaging.service.enabledForTenants` | A comma-separated list of tenants whose device data will be sent to the MQTT Service. |

If you provide the MQTT service URL but do not specify any tenants for data transmission, the {{< product-c8y-iot >}} 
will not establish a connection.

To pull data from the MQTT Service, you can deploy a custom microservice to the Cumulocity Platform using the 
Microservice Deployer. The microservice will use the tenant’s credentials and needs the following roles to function 
correctly:

- `ROLE_INVENTORY_READ`
- `ROLE_NOTIFICATION_2_ADMIN`
- `ROLE_MQTT_SERVICE_ADMIN`

Once running, the microservice will subscribe to the `lwm2m/data` topic, where the {{< product-c8y-iot >}} sends 
device data. The microservice will only pull device data for the specified tenant and its subtenants. If you need 
to access data from another tenant, you will need a separate microservice for that tenant.

For guidance on developing your own microservice, refer to this 
[sample project](https://github.com/Cumulocity-IoT/lwm2m-devicedata-listener).

### MQTT Data Payload

The MQTT data payload follows the SENML-JSON format and complies with the 
[RFC8428 specification](https://datatracker.ietf.org/doc/html/rfc8428). Note that LWM2M’s Time 
resource data is stored as a timestamp in seconds, while the Base Time may include fractional 
data and is serialized in scientific notation.
