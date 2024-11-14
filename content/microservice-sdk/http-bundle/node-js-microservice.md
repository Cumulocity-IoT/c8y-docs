---
weight: 40
title: Node.js microservice
layout: redirect
---

{{< product-c8y-iot >}} provides an SDK for developing microservices using Java. Nevertheless, you are free to choose the tech-stack of your preference to develop a microservice as long as it fulfills the [general requirements](/microservice-sdk/general-aspects/#requirements).

In this example you will learn how to create and deploy a Node.js-based microservice. The application exposes endpoints to verify if the microservice is up and running and get some of the environment variables.

It uses the {{< product-c8y-iot >}} [@c8y/client JavaScript library](https://www.npmjs.com/package/@c8y/client) to subscribe to alarms. When a new alarm is created, a Slack channel gets notified.

### Prerequisites {#prerequisites}

- {{< product-c8y-iot >}} credentials (tenant, user and password).
- Slack channel to post messages to, [Slack app and OAuth token](https://slack.dev/node-slack-sdk/getting-started).
- Docker local installation.
- A *.env* file in the root directory with the following content:

```properties
PORT=80
SLACK_OAUTH_TOKEN=<YOUR-TOKEN-GOES-HERE>
SLACK_CHANNEL_ID=<YOUR-CHANNEL_ID-GOES-HERE>
```

### Developing the microservice {#developing-the-microservice}

#### Configure a Node.js application {#configure-a-nodejs-application}

Start by creating a folder *node-microservice* to contain your files. Inside your folder, use the following command to initialize your project:

```shell
$ npm init
```

It will walk you through creating a *package.json* file which allows to identify the project as well as handling its dependencies. When prompted, enter your project's information and use *app.js* as entry point. Once the file has been created, install the dependencies using:

```shell
$ npm install --save @c8y/client @slack/web-api dotenv express
```

Eventually, your *package.json* file should look similar to:

```json
{
  "name": "node-microservice",
  "version": "1.0.0",
  "description": "{{< product-c8y-iot >}} microservice application",
  "main": "app.js",
  "dependencies": {
    "@c8y/client": "^1004.0.7",
    "@slack/web-api": "^5.0.1",
    "dotenv": "^8.0.0",
    "express": "4.17.0"
  },
  "scripts": {
    "start": "node app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "<your-name>",
  "license": "MIT"
}
```

#### Add the source code {#add-the-source-code}

Now create a file *app.js* which is the main entry point of your application. It uses the Express framework to start a server listening on port 80, defines its endpoints and requires controllers to use the {{< product-c8y-iot >}} and Slack APIs.

```javascript
"use strict";

require("dotenv").config();
const express = require("express");
const app = express();

// Application endpoints
const routes = require("./routes");
routes(app);

// Server listening on port 80
app.use(express.json());
app.listen(process.env.PORT);
console.log(`${process.env.APPLICATION_NAME} started on port ${process.env.PORT}`);

// {{< product-c8y-iot >}} and Slack controllers
require("./controllers");
```

As you may have already noticed, `routes` and `controllers` are required. Create a *routes.js* file with the following content:

```javascript
"use strict";

module.exports = function(app) {
    // Hello world
    app.route("/").get(function(req, res) {
        res.json({ "message" : "Hello world!" });
    });

    // Health check
    app.route("/health").get(function(req, res) {
        res.json({ "status" : "UP" });
    });

    // Environment variables
    app.route("/environment").get(function(req, res) {
        res.json({
            "appName" : process.env.APPLICATION_NAME,
            "platformUrl" : process.env.C8Y_BASEURL,
            "microserviceIsolation" : process.env.C8Y_MICROSERVICE_ISOLATION,
            "tenant" : process.env.C8Y_BOOTSTRAP_TENANT,
            "bootstrapUser" : process.env.C8Y_BOOTSTRAP_USER,
            "bootstrapPassword" : process.env.C8Y_BOOTSTRAP_PASSWORD
        });
    });
};
```

At this point, your microservice would be accessible via web on its endpoints to return a "Hello world" message, verify that the microservice is up and running and get some environment variables.

In order to implement the controllers, you must first create a Slack app and get a token to use the Web API. Go to [Slack API: Applications](https://api.slack.com/apps?new_app=1) to create a new app. Select your workspace and give your app a name, for example, C8Y Slack bot. Then [get an OAuth access token](https://slack.dev/node-slack-sdk/getting-started#getting-a-token-to-use-the-web-api).

Once you have your Slack app and token ready, create the *controllers.js* file with the following content:

```javascript
"use strict";

/********************* Slack *********************/

// Create a new instance of the WebClient class with the OAuth access token
const { WebClient } = require("@slack/web-api");
const web = new WebClient(process.env.SLACK_OAUTH_TOKEN);

// Slack channel ID to know where to send messages to
const channelId = process.env.SLACK_CHANNEL_ID;

// Format a message and post it to the channel
async function postSlackMessage (adata) {
    // Alarm severity
    let color = {
        "WARNING" : "#1c8ce3",
        "MINOR"   : "#ff801f",
        "MAJOR"   : "#e66400",
        "CRITICAL": "#e0000e"
    };

    // Send a message from this app to the specified channel
    let src = adata.source;
    await web.chat.postMessage({
        channel: channelId,
        attachments : [{
            "text": adata.text,
            "fields": [
                {
                    "title": "Source",
                    "value": `<${src.self}|${src.name ? src.name : src.id}>`,
                    "short": true
                },
                {
                    "title": "Alarm type",
                    "value": adata.type,
                    "short": true
                }
            ],
            "color": color[adata.severity]
        }]
    });
}


/********************* {{< product-c8y-iot >}} *********************/

const { Client, FetchClient, BasicAuth } = require("@c8y/client");

const baseUrl = process.env.C8Y_BASEURL;
let cachedUsers = [];

// Get the subscribed users
async function getUsers () {
    const {
        C8Y_BOOTSTRAP_TENANT: tenant,
        C8Y_BOOTSTRAP_USER: user,
        C8Y_BOOTSTRAP_PASSWORD: password
    } = process.env;

    const client = new FetchClient(new BasicAuth({ tenant, user, password }), baseUrl);
    const res = await client.fetch("/application/currentApplication/subscriptions");

    return res.json();
 }


// where the magic happens...
(async () => {

    cachedUsers = (await getUsers()).users;

    if (Array.isArray(cachedUsers) && cachedUsers.length) {
        // List filter for unresolved alarms only
        const filter = {
            pageSize: 100,
            withTotalPages: true,
            resolved: false
        };

        try {
            cachedUsers.forEach(async (user) => {
                // Service user credentials
                let auth = new BasicAuth({
                    user:     user.name,
                    password: user.password,
                    tenant:   user.tenant
                });

                // Platform authentication
                let client = await new Client(auth, baseUrl);

                // Get filtered alarms and post a message to Slack
                let { data } = await client.alarm.list(filter);
                data.forEach((alarm) => {
                    postSlackMessage(alarm);
                });

                // Real time subscription for active alarms
                client.realtime.subscribe("/alarms/*", (alarm) => {
                    if (alarm.data.data.status === "ACTIVE") {
                        postSlackMessage(alarm.data.data);
                    }
                });
            });
            console.log("listening to alarms...");
        }
        catch (err) {
            console.error(err);
        }
    }
    else {
        console.log("[ERROR]: Not subscribed/authorized users found.");
    }

})();
```

The code has two parts. The first one needs your Slack OAuth token and channel ID (chat group where the messages will be posted).
A message is formatted using the colors of the different alarm severities that you may see in the Cockpit application. This message gets posted to the Slack channel.

The second part uses basic authentication to the {{< product-c8y-iot >}} platform, it gets all active alarms and posts alarm messages to the Slack channel. After that, it subscribes to alarms and notifies the Slack channel each time a new alarm is created in the subscribed tenants.

#### Dockerfile and application manifest {#dockerfile-and-application-manifest}

Create a microservice manifest *cumulocity.json* with the following content:

```json
{
    "apiVersion": "2",
    "version": "1.0.0-SNAPSHOT",
    "provider": {
        "name": "{{< company-c8y >}}"
    },
    "isolation": "MULTI_TENANT",
    "replicas": 2,
    "requiredRoles": [
        "ROLE_ALARM_READ",
        "ROLE_ALARM_ADMIN"
    ],
    "roles": [ ]
}
```

Finally, Docker needs to know how to build your microservice. Create a *Dockerfile* as follows:

```
FROM node:alpine

WORKDIR /usr/app

COPY ./package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]
```

### Deploying the microservice {#deploying-the-microservice}

Once you have all the required files, building and deploying the microservice application is fairly simple.
Execute the following Docker commands to build the Docker image and save it as _image.tar_:

```shell
$ docker build -t node-microservice .
$ docker save node-microservice > "image.tar"
```

Then pack _image.tar_ together with the manifest _cumulocity.json_ into a ZIP file.

```shell
$ zip node-microservice cumulocity.json image.tar
```

The resulting _node-microservice.zip_ file contains your microservice and it is ready to be uploaded to the {{< product-c8y-iot >}} platform.
Uploading the _node-microservice.zip_ into the platform can be done via the UI. In the Administration application, navigate to **Ecosystem** > **Microservices** and click **Add microservice**. Drop the ZIP file of the microservice and then click **Subscribe**.

For more details about uploading a microservice ZIP file, refer to [Custom microservices](/standard-tenant/ecosystem/#custom-microservices).

### Testing the microservice {#testing-the-microservice}

After the microservice has been successfully uploaded and subscribed to your tenant, it will run in a Docker container. A request similar to:

```http
GET <URL>/service/node-microservice/environment

HEADERS:
  "Authorization": "<AUTHORIZATION>"
```

with proper credentials (user and password from any subscribed tenant), returns a response as:

```json
{
  "appName": "node-microservice",
  "platformUrl": "http://cumulocity:8111",
  "microserviceIsolation": "MULTI_TENANT",
  "tenant": "t...",
  "bootstrapUser": "...",
  "bootstrapPassword": "..."
}
```

The authorization header is formed as "Basic &lt;Base64(&lt;tenantID>/&lt;username>:&lt;password>)>". For instance, if your tenant ID, username and password are **t0071234**, **testuser** and **secret123** respectively, you can get the Base64 string with the following command:

```shell
$ echo -n t0071234/testuser:secret123 | base64
dDAwNzEyMzQvdGVzdHVzZXI6c2VjcmV0MTIz
```

and your authorization header would look like `"Authorization": "Basic dDAwNzEyMzQvdGVzdHVzZXI6c2VjcmV0MTIz"`.

If there are active alarms on your tenant, your Slack channel will get notified. You can also [create a new alarm](https://{{< domain-c8y >}}/api/core/#operation/postAlarmCollectionResource) using the {{< product-c8y-iot >}} REST API and validate that your microservice is listening to new alarms. Your Slack channel will also get notified.

![Slack app posting alarms](/images/microservices-sdk/microservice-slack-alarms.png)

### Source code {#source-code}

The code of this [node-microservice]({{< link-c8y-github >}}/cumulocity-examples/tree/develop/microservices/node-microservice) can be found in our public GitHub repositories.
