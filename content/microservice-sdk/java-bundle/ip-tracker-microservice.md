---
weight: 30
title: IP-tracker microservice
layout: redirect
---

{{< c8y-admon-important >}}
Visit our [Hello world tutorial for Java](/microservice-sdk/java/#java-hello-world-tutorial) and follow the setup steps there before starting the IP-tracker microservice tutorial. The basic configuration steps are not explained here.
{{< /c8y-admon-important >}}

### Developing the IP-tracker microservice {#developing-the-ip-tracker-microservice}

This microservice application creates a warning alarm message (for demonstration purposes) and it exposes endpoints to:

- Verify that the microservice is up and running.
- Pass a parameter to the platform and return a formatted string.
- Get some of the environment variables and the microservice service settings.
- Track a user's approximate location and store it in the platform.
- Get the tracked IPs and locations.

It also uses the {{< product-c8y-iot >}} UI to display the tracked locations on a map.

#### Update the Project Object Model {#update-the-project-object-model}

Assuming that you have the base code presented in our [Hello world tutorial for Java](/microservice-sdk/java/#java-hello-world-tutorial), edit your *pom.xml* file changing the `artifactId` and `microservice.name` of your microservice to `iptracker-microservice`.
Also add a child element `<java.version>` to the `<properties>` element to specify the Java version you want to use.
Your *pom.xml* file should contain a snippet similar to:

```xml
<name>iptracker-microservice</name>
<artifactId>iptracker-microservice</artifactId>
<properties>
    <java.version>17</java.version>
    <maven.compiler.source>${java.version}</maven.compiler.source>
    <maven.compiler.target>${java.version}</maven.compiler.target>
    <spring-boot-dependencies.version>2.5.14</spring-boot-dependencies.version>
    <c8y.version>1016.0.117</c8y.version>
    <microservice.name>iptracker-microservice</microservice.name>
</properties>
```

{{< c8y-admon-info >}}
This example was implemented using Java 17 and Spring Boot 2. You may [install the JDK 17](https://www.oracle.com/technetwork/java/javase/downloads/index.html) or adjust this example to the version you already have, for example, JDK 11. Note that since Java 13 some API methods were removed or deprecated, so you may get some warning messages during build time but they won't affect the microservice application.
{{< /c8y-admon-info >}}

Finally, add the following dependency:

```xml
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <scope>compile</scope>
</dependency>
```

#### Update the application manifest {#update-the-application-manifest}

In your _cumulocity.json_ file:

1. Add the required roles to be able to create events and alarms.
2. Add the readiness and liveness probes.
3. Add two keys for the microservice settings: `"ipstack.key"` and `"tracker.id"`.
4. Set the isolation level to `"PER_TENANT"`. This means that there will be a separate instance for each tenant. For more details see the Settings section in [Microservice manifest](/microservice-sdk/general-aspects/#microservice-manifest).

Your manifest file should look similar to this:

```json
{
    "apiVersion": "2",
    "version": "@project.version@",
    "provider": {
        "name": "{{< company-c8y >}}"
    },
    "isolation": "PER_TENANT",
    "settings": [
        {
            "key": "ipstack.key",
            "defaultValue": "<your-ipstack-key>"
        },
        {
            "key": "tracker.id",
            "defaultValue": "<your-tracker-id>"
        }
    ],
    "livenessProbe": {
        "httpGet": {
            "path": "/health"
        },
        "initialDelaySeconds": 60,
        "periodSeconds": 10
    },
    "readinessProbe": {
        "httpGet": {
            "path": "/health",
            "port": 80
        },
        "initialDelaySeconds": 20,
        "periodSeconds": 10
    },
    "requiredRoles": [
        "ROLE_EVENT_READ",
        "ROLE_EVENT_ADMIN",
        "ROLE_ALARM_READ",
        "ROLE_ALARM_ADMIN"
    ],
    "roles": []
}
```

### Creating a managed object {#creating-a-managed-object}

An alarm must be associated with a source and it requires an ID.
Hence, you must [create a managed object](https://{{< domain-c8y >}}/api/core/#operation/postManagedObjectCollectionResource) to be your source and use its ID in your microservice application.
The same managed object will track the locations when the microservice gets accessed on a particular endpoint.

First, get your current location (latitude, longitude) using a free service, for example, [My Current Location](https://mycurrentlocation.net).

Create a managed object as a device named "Microservice tracker" via POST request as follows:

```http
POST <URL>/inventory/managedObjects

HEADERS:
  Content-Type: application/vnd.com.nsn.cumulocity.managedobject+json; charset=UTF-8; ver=0.9
  Accept: application/vnd.com.nsn.cumulocity.managedobject+json; charset=UTF-8; ver=0.9
  Authorization: <AUTHORIZATION>

BODY:
  {
    "c8y_IsDevice": {},
    "c8y_Position": {
      "lat": <LATITUDE>,
      "lng": <LONGITUDE>
    },
    "name": "Microservice tracker"
  }
```

You will get the ID of your managed object in the response.
Assign this ID to the `"tracker.id"` key in your _cumulocity.json_ file.

On the {{< product-c8y-iot >}} platform, navigate to **Devices** > **All devices** in the Device Management application to verify that your device has been created and its location is displayed on the map.

![Microservice tracking](/images/microservices-sdk/ms-tracking-newdevice.png)

### Getting the client's location {#getting-the-clients-location}

The microservice will get the approximate location based on the client's IP.
To achieve this, it uses the free service [ipstack](https://ipstack.com) and you must [get a free API key](https://ipstack.com/product).
Once you have it, assign it to the `"ipstack.key"` key in your _cumulocity.json_ file.

A GET request to the ipstack API using your key will return a location object. Therefore, you must create a new file named _Location.java_ in the same directory of your _App.java_ with the following content:

```java
package c8y.example;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Location {

    private String city;
    private String country_code;
    private String latitude;
    private String longitude;

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getCountry_code() {
        return country_code;
    }

    public void setCountry_code(String country_code) {
        this.country_code = country_code;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
```

### Updating the application {#updating-the-application}

Modify your _App.java_ file and:

1. Run the microservice as a Spring application.
2. Add a post-construct init method to get a subset of the environment variables and the microservice settings.
3. Add an event listener to the microservice subscription. Each time a tenant subscribes to the microservice, an alarm will be created.
4. Define a method to create LocationUpdate events based on the client's IP.
4. Add the application endpoints.

Your code should look similar to:

```java
package c8y.example;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.context.event.EventListener;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.cumulocity.microservice.autoconfigure.MicroserviceApplication;
import com.cumulocity.microservice.context.ContextService;
import com.cumulocity.microservice.context.credentials.MicroserviceCredentials;
import com.cumulocity.microservice.settings.service.MicroserviceSettingsService;
import com.cumulocity.microservice.subscription.model.MicroserviceSubscriptionAddedEvent;
import com.cumulocity.model.idtype.GId;
import com.cumulocity.rest.representation.alarm.AlarmRepresentation;
import com.cumulocity.rest.representation.event.EventRepresentation;
import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.sdk.client.Platform;
import com.cumulocity.sdk.client.event.EventFilter;

import net.minidev.json.JSONObject;

@MicroserviceApplication
@RestController
public class App {

    @Autowired
    private MicroserviceSettingsService settingsService;

    @Autowired
    private ContextService<MicroserviceCredentials> contextService;

    @Autowired
    private Platform platform;

    private Map<String, String> c8yEnv;

    public static void main (String[] args) {
        SpringApplication.run(App.class, args);
    }


    /**
    * Get some of the environment variables of the container and load the
    * microservice settings
    */
    @PostConstruct
    private void init () {
        // Environment variables
        var env = System.getenv();

        c8yEnv = new HashMap<>();
        c8yEnv.put("app.name", env.get("APPLICATION_NAME"));
        c8yEnv.put("url", env.get("C8Y_BASEURL"));
        c8yEnv.put("jdk", env.get("JAVA_VERSION"));
        c8yEnv.put("tenant", env.get("C8Y_TENANT"));
        c8yEnv.put("user", env.get("C8Y_USER"));
        c8yEnv.put("password", env.get("C8Y_PASSWORD"));
        c8yEnv.put("isolation", env.get("C8Y_MICROSERVICE_ISOLATION"));
        c8yEnv.put("memory.limit", env.get("MEMORY_LIMIT"));

        // Required ID and key
        c8yEnv.put("tracker.id", settingsService.get("tracker.id"));
        c8yEnv.put("ipstack.key", settingsService.get("ipstack.key"));
    }


    /**
    * Create a warning alarm on microservice subscription
    */
    @EventListener(MicroserviceSubscriptionAddedEvent.class)
    public void createAlarm (MicroserviceSubscriptionAddedEvent event) {
        contextService.callWithinContext(event.getCredentials(), () -> {
            var source = new ManagedObjectRepresentation();
            source.setId(GId.asGId(c8yEnv.get("tracker.id")));

            var alarm = new AlarmRepresentation();
            alarm.setSource(source);
            alarm.setSeverity("WARNING");
            alarm.setStatus("ACTIVE");
            alarm.setDateTime(DateTime.now());
            alarm.setType("c8y_Application__Microservice_subscribed");
            alarm.setText("The microservice " + c8yEnv.get("app.name") + " has been subscribed to tenant "
            + c8yEnv.get("tenant"));

            platform.getAlarmApi().create(alarm);

            return true;
        });
    }


    /**
    * Create a LocationUpdate event based on the client's IP
    *
    * @param String The public IP of the client
    * @return The created event
    */
    public EventRepresentation createLocationUpdateEvent (String ip) {
        // Get location details from ipstack
        var rest = new RestTemplate();
        var apiURL = "http://api.ipstack.com/" + ip + "?access_key=" + c8yEnv.get("ipstack.key");
        var location = rest.getForObject(apiURL, Location.class);

        // Prepare a LocationUpdate event using {{< product-c8y-iot >}}'s API
        var c8y_Position = new JSONObject();
        c8y_Position.put("lat", location.getLatitude());
        c8y_Position.put("lng", location.getLongitude());

        var source = new ManagedObjectRepresentation();
        source.setId(GId.asGId(c8yEnv.get("tracker.id")));

        var event = new EventRepresentation();
        event.setSource(source);
        event.setType("c8y_LocationUpdate");
        event.setDateTime(DateTime.now());
        event.setText("Accessed from " + ip + " (" + (location.getCity() != null ? location.getCity() + ", " : "")
        + location.getCountry_code() + ")");
        event.setProperty("c8y_Position", c8y_Position);
        event.setProperty("ip", ip);

        // Create the event in the platform
        platform.getEventApi().create(event);

        return event;
    }


    /* * * * * * * * * * Application endpoints * * * * * * * * * */

    // Check the microservice status/health (implemented by default)
    // GET /health

    // Greeting endpoints
    @RequestMapping("hello")
    public String greeting (@RequestParam(value = "name", defaultValue = "World") String you) {
        return "Hello " + you + "!";
    }

    @RequestMapping("/")
    public String root () {
        return greeting("World");
    }

    // Return the environment values
    @RequestMapping("environment")
    public Map<String, String> environment () {
        return c8yEnv;
    }

    // Track client's approximate location
    @RequestMapping(value = "location/track", produces="application/json")
    public String trackLocation (HttpServletRequest request) {
        // Get the public IP address and create the event
        return createLocationUpdateEvent(request.getHeader("x-real-ip")).toJSON();
    }

    // Get the tracked IPs and locations
    @RequestMapping("location/locations")
    public ArrayList<Object> getLocations (@RequestParam(value = "max", defaultValue = "5") int max) {
        var filter = new EventFilter().byType("c8y_LocationUpdate");
        var locations = new ArrayList<Object>();
        var eventCollection = platform.getEventApi().getEventsByFilter(filter).get(max);

        eventCollection.getEvents().forEach((event) -> {
            var map = new HashMap<String, Object>();

            map.put("ip", event.getProperty("ip"));
            map.put("coordinates", event.getProperty("c8y_Position"));
            map.put("when", event.getCreationDateTime().toString("yyyy-MM-dd hh:mm:ss"));

            locations.add(map);
        });

        return locations;
    }
}
```

### Building and deploying the application {#building-and-deploying-the-application}

Use the command `mvn clean install` and follow the same steps of the [Hello world tutorial for Java](/microservice-sdk/java/#java-hello-world-tutorial) to deploy your microservice.
You may also employ the cURL command to deploy the microservice.

```shell
$ curl -F "data=@target/iptracker-microservice-1.0.0-SNAPSHOT.zip" \
     -H "Authorization: <AUTHORIZATION>" \
     "<URL>/application/applications/<APPLICATION_ID>/binaries"
```

### Testing the application {#testing-the-application}

You can test any endpoint of your application using the command line or a web browser.
For example, a GET request to <kbd>location/track</kbd> will obtain the client's IP from the request header and use the `createLocationUpdateEvent` method to get the approximate location.
The response will be similar to:

```http
{
  time: "2019-06-03T08:44:21.730Z",
    source: {
      id: "..."
    },
    text: "Accessed from ... (Sofia, BG)",
    type: "c8y_LocationUpdate",
    c8y_Position: {
      lng: "23.3175",
      lat: "42.683"
    },
    ip: "..."
}
```

Using the endpoint <kbd>location/locations</kbd> will return five stored events by default.
You can use the `max` parameter to specify a higher number.

In the Device Management application, navigate to **Devices** > **All devices** and locate your microservice tracker.
Under **Tracking** you will see a map with the tracked locations.
You can also develop your own web application and customize a map widget.
Refer to [Application library](/web/libraries/#application-library).

![Microservice tracking](/images/microservices-sdk/ms-tracking-map.png)

#### Run the Docker container {#run-the-docker-container}

The Docker image is built and added to the local Docker repository during the [Maven build](#build-the-microservice-application) if the following property is set `microservice.package.deleteImage=false`.
As you have learned in our [Hello world tutorial for Java](/microservice-sdk/java/#java-hello-world-tutorial), you can [run the Docker container](/microservice-sdk/java/#run-the-docker-container) locally.
Note that in this case the isolation was changed to `PER_TENANT`.
You can also use your Docker image name and tag to run it as follows:

```shell
$ docker run -p 8082:80 -e C8Y_BOOTSTRAP_TENANT=<BOOTSTRAP_USER_TENANT> -e C8Y_BOOTSTRAP_USER=<BOOTSTRAP_USER_NAME> -e C8Y_BOOTSTRAP_PASSWORD=<BOOTSTRAP_USER_PASSWORD> -e C8Y_MICROSERVICE_ISOLATION=PER_TENANT -i -t -e C8Y_BASEURL=<URL> iptracker-microservice:latest
```

If your Docker image has run successfully, you can test the microservice on any web browser.
For instance, using <http://localhost:8082/location/locations> will return all the tracked locations.

### Source code {#source-code}

The code of our [iptracker-microservice](https://github.com/SoftwareAG/cumulocity-examples/tree/develop/microservices/iptracker-microservice) can be found in our public GitHub repositories.
