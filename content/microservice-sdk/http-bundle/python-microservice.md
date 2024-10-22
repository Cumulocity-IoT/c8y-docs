---
weight: 20
title: Python microservice
layout: redirect
---

In this tutorial, you will learn how to create and run a microservice written in Python:

1. Install the required prerequisites.
2. Create a sample application exposing REST endpoints using Python and the Flask framework.
3. Create a Dockerfile to build and save your application as a Docker image.
4. Create a {{< product-c8y-iot >}} application manifest.
5. Build and package the Docker image and the application manifest into a microservice ZIP file that is ready to upload to {{< product-c8y-iot >}}.
6. Upload your new microservice ZIP file and subscribe to run it.

### Prerequisites {#prerequisites}

Create an account on [{{< domain-c8y >}}](https://{{< domain-c8y >}}), for example by using a free trial. At this step you will be provided with a dedicated URL that you can also use to test your microservice below.

Make sure that you have a recent version of Docker installed. You can, for example, install [Docker Desktop](https://www.docker.com/products/docker-desktop/) for your operating system.

{{< product-c8y-iot >}} hosts linux/amd64 Docker containers. If you run, for example, a recent Mac with Apple silicon, you need to configure Docker to build linux/amd64 containers:

```shell
$ export DOCKER_DEFAULT_PLATFORM=linux/amd64
```

### Create a sample Python web application {#create-a-python-web-application}

This example uses Python 3 with the [Flask](https://flask.palletsprojects.com/) web framework and the [Waitress](https://docs.pylonsproject.org/projects/waitress/en/latest/) HTTP server. Start by creating the _application.py_ script with the following content:

```python
#!flask/bin/python
from flask import Flask, jsonify
import os

app = Flask(__name__)

# Hello world endpoint
@app.route('/')
def hello():
    return 'Hello world!'

# Verify the status of the microservice
@app.route('/health')
def health():
    return '{ "status" : "UP" }'

# Get environment details
@app.route('/environment')
def environment():
    environment_data = {
        'platformUrl': os.getenv('C8Y_BASEURL'),
        'mqttPlatformUrl': os.getenv('C8Y_BASEURL_MQTT'),
        'tenant': os.getenv('C8Y_BOOTSTRAP_TENANT'),
        'user': os.getenv('C8Y_BOOTSTRAP_USER'),
        'password': os.getenv('C8Y_BOOTSTRAP_PASSWORD'),
        'microserviceIsolation': os.getenv('C8Y_MICROSERVICE_ISOLATION')
    }
    return jsonify(environment_data)

if __name__ == '__main__':
    import logging
    logging.basicConfig(level=logging.INFO)
    from waitress import serve
    serve(app, host="0.0.0.0", port=80)
```

The application exposes three endpoints:

- <kbd>/</kbd> returns a hello world message.
- <kbd>/health</kbd> is the common endpoint to verify if a microservice is up and running. It should be included into all production microservices to enable high availability.
- <kbd>/environment</kbd> reads some standard variables provided to the environment by the platform during the microservice installation and returns their values in JSON format.

It runs the HTTP server on port 80. This is required for all microservices.

Logging is set to "INFO" level to show some logging information in the Administration application. You can remove the log level setting to get only warnings logged.

### Create a Dockerfile {#create-the-dockerfile}

To build a runnable Docker image containing your application, create a so-called _Dockerfile_ in the same directory as your  _application.py_ script and add the following content:

```
FROM python:alpine

COPY application.py /
RUN pip install flask waitress

ENTRYPOINT ["python"]
CMD ["-u", "application.py"]
```

The Dockerfile:

* Uses a very small Docker distribution based on Alpine Linux and Python.
* Copies your _application.py_ file into the image.
* Installs the web framework and web server (Flask and Waitress) in the image.
* And tells Docker to run Python with your _application.py_ as argument.

### Create the application manifest {#add-the-application-manifest}

Besides the Docker image, {{< product-c8y-iot >}} requires some additional information to correctly run the Docker image. This is provided in the application manifest. Create a file _cumulocity.json_ in the same folder as your other files and add the following content:

```json
{
    "apiVersion": "2",
    "version": "1.0.0",
    "provider": {
        "name": "{{< company-c8y >}}"
    },
    "isolation": "MULTI_TENANT",
    "replicas": 2,
    "livenessProbe": {
        "httpGet": {
            "path": "/health"
        },
        "initialDelaySeconds": 10
    },
    "readinessProbe": {
        "httpGet": {
            "path": "/health"
        },
        "initialDelaySeconds": 10
    },
    "requiredRoles": [ ],
    "roles": [ ]
}
```

Your microservice:

* Is a multi-tenant microservice, which means that it runs only once even if many customers are subscribed to it.
* Has two replicas as required for highly available production microservices. Note: For development purposes where high availability is not required, you can set this to one replica only.
* Has so-called liveness and readiness probes that {{< product-c8y-iot >}} uses to check if your microservice is healthy and can run.
* Requires no roles and provides no roles -- it just prints some information.

### Build the application {#build-the-application}

Execute the following Docker commands to build the Docker image and save it as _image.tar_:

```shell
$ docker build -t hello-python-microservice .
$ docker save hello-python-microservice > "image.tar"
```

Then pack _image.tar_ together with the manifest _cumulocity.json_ into a ZIP file.

```shell
$ zip hello-microservice cumulocity.json image.tar
```

The resulting _hello-microservice.zip_ file contains your microservice and it is ready to be uploaded to the {{< product-c8y-iot >}} platform.

#### Run the example {#run-the-example}

Uploading the _hello-microservice.zip_ into the platform can be done via the UI. In the Administration application, navigate to **Ecosystem** > **Microservices** and click **Add microservice**. Drop the ZIP file of the microservice and then click **Subscribe**. For more details about uploading a microservice ZIP file, refer to [Custom microservices](/standard-tenant/ecosystem/#custom-microservices).

After the microservice has been successfully uploaded and subscribed by your tenant, it runs in a Docker container. Verify this by checking the **Status** and **Logs** tabs of your microservice in the Administration application.

To try out your microservice, use a command-line tool such as [curl](https://curl.se/). Your _tenantID_ can be found under **Platform info** in the right drawer which shows up if you click on the user icon <i class="dlt-c8y-icon-supplier text-muted icon-20"></i> at the top right.

```shell
$ curl -u '<tenantID>/<username>:<password>' https://<URL>/service/hello/environment
{
    "microserviceIsolation": "MULTI_TENANT",
    "mqttPlatformUrl": "tcp://cumulocity:1881",
    "password": "...",
    "platformUrl": "https://cumulocity:8111",
    "tenant": "mytenant",
    "user": "servicebootstrap_hello-microservice"
}
```

Note that all requests to your microservice are automatically authenticated. Try running the curl command without the authentication.

```
$ curl -v https://<URL>/service/hello/environment
…
< HTTP/1.1 401 Unauthorized
…
{"error":"general/internalError","message":"No auth information found","info":"https://cumulocity.com/guides/reference/rest-implementation"}
```


### Using the microservice utility tool {#using-the-microservice-utility-tool}

You can also build, upload and subscribe the application using the [microservice utility tool](/microservice-sdk/general-aspects/#microservice-utility-tool). The tool requires a _docker_ folder with the _Dockerfile_ and your application files in it:

```
docker/Dockerfile
docker/application.py
cumulocity.json
```

### Source code {#source-code}

The source code of this Hello world microservice can be found in our [GitHub repository]({{< link-c8y-github >}}/c8y_microservice-python). Moreover, in our GitHub repository you can find a more comprehensive [Python microservice application]({{< link-c8y-github >}}/cumulocity-examples/tree/develop/microservices/sample-python-microservice) which uses the {{< product-c8y-iot >}} REST API and exposes endpoints to verify if the microservice is up and running, create a device and random measurements for it, and to get the current application subscriptions for a particular tenant.
