---
weight: 20
title: Python microservice
layout: redirect
---

In this tutorial, you will learn how to create and run a microservice written in Python. This example contains:

* A sample Python application using the Flask framework to expose REST endpoints.
* An application manifest file with minimal content to run a microservice.
* The configuration of the Dockerfile which allows creating a ready to run Docker image with a bundled application (inside a light Alpine linux distribution).
* Instructions for building and packaging a ZIP file containing the full application (ready to upload into the platform).
* Instructions for uploading and subscribing to the packaged microservice.

### Prerequisites {#prerequisites}

Create an account on [{{< domain-c8y >}}](https://{{< domain-c8y >}}), for example by using a free trial. At this step you will be provided with a dedicated URL address.

{{< product-c8y-iot >}} hosts linux/amd64 Docker containers and not Windows containers. The Docker version must be >= 1.12.6. Verify your Docker installation with the following command:

```shell
$ docker version
    Client:
     Version:         1.12.6
     API version:     1.24
     OS/Arch:         linux/amd64

    Server:
     Version:         1.12.6
     API version:     1.24
     OS/Arch:         linux/amd64
```

### Developing the "Hello world" microservice {#developing-the-hello-world-microservice}

To develop a simple "Hello world" microservice in Python, you must:

* Create a Python web application.
* Create the Dockerfile.
* Add the microservice manifest.
* Build and run the application.

#### Create a Python web application {#create-a-python-web-application}

This example uses Python 3 with a Flask microframework which enables simple exposing of endpoints and an embedded HTTP server.

Start by creating the _application.py_ script with the following content:

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
    app.run(host='0.0.0.0', port=80)
```

The application is configured to run on port 80 – which is required for microservices – and exposes three endpoints:

- <kbd>/</kbd> returns a hello world message.
- <kbd>/health</kbd> is the common endpoint to verify if a microservice is up and running. It should be included into all production microservices to enable high availability.
- <kbd>/environment</kbd> reads some standard variables provided to the environment by the platform during the microservice installation and returns their values in JSON format.

#### Create the Dockerfile {#create-the-dockerfile}

You must create a Dockerfile in order to build a Docker image with your application. For this example, it shall be in the same directory as the _application.py_ script and with the following content:

```
FROM python:alpine3.6

COPY application.py /
RUN pip install flask==0.10.1

ENTRYPOINT ["python"]
CMD ["-u", "application.py"]
```

This build uses Alpine Linux with the Python SDK inside. It is a very thin distribution and the resulting Docker image is small (about 100 MB). The instruction `RUN pip install flask` installs the required Python library using the `pip` installer.

#### Add the application manifest {#add-the-application-manifest}

The microservice manifest file _cumulocity.json_ is required for the application. Create that file with the following content:

```json
{
    "apiVersion": "1",
    "version": "1.0.0",
    "provider": {
        "name": "{{< company-c8y >}}"
    },
    "isolation": "MULTI_TENANT",
    "requiredRoles": [
    ],
    "roles": [
    ]
}
```

#### Build the application {#build-the-application}

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

Uploading the _hello-microservice.zip_ into the platform can be done via the UI. In the Administration application, navigate to **Ecosystem** > **Microservices** and click **Add microservice**. Drop the ZIP file of the microservice and then click **Subscribe**.

For more details about uploading a microservice ZIP file, refer to [Custom microservices](/standard-tenant/ecosystem/#custom-microservices).

### Using the microservice utility tool {#using-the-microservice-utility-tool}

You can also build, upload and subscribe the application using the [microservice utility tool](/microservice-sdk/general-aspects/#microservice-utility-tool). In this case, the files must follow the directory structure required by the script.

For this particular microservice example, the structure shall be:


/docker/Dockerfile <br>
/docker/application.py <br>
/cumulocity.json <br>


### Execution {#execution}

After the microservice has been successfully uploaded and subscribed by your tenant, it will run in a Docker container. A request similar to:

```http
GET <URL>/service/hello-microservice/environment

HEADERS:
  "Authorization": "<AUTHORIZATION>"
```

with proper credentials (user from any subscribed tenant), returns a response as:

```json
{
    "microserviceIsolation": "MULTI_TENANT",
    "mqttPlatformUrl": "tcp://cumulocity:1881",
    "password": "...",
    "platformUrl": "https://cumulocity:8111",
    "tenant": "mytenant",
    "user": "servicebootstrap_hello-microservice"
}
```

The authorization header is formed as "Basic &lt;Base64(&lt;tenantID>/&lt;username>:&lt;password>)>". For instance, if your tenant ID, username and password are **t0071234**, **testuser** and **secret123** respectively, you can get the Base64 string with the following command:

```shell
$ echo -n t0071234/testuser:secret123 | base64
dDAwNzEyMzQvdGVzdHVzZXI6c2VjcmV0MTIz
```

and your authorization header would look like `"Authorization": "Basic dDAwNzEyMzQvdGVzdHVzZXI6c2VjcmV0MTIz"`.

### Source code {#source-code}

The source code of this Hello world microservice can be found in our [GitHub repository]({{< link-c8y-github >}}/c8y_microservice-python). Moreover, in our GitHub repository you can find a more comprehensive [Python microservice application]({{< link-c8y-github >}}/cumulocity-examples/tree/develop/microservices/sample-python-microservice) which uses the {{< product-c8y-iot >}} REST API and exposes endpoints to verify if the microservice is up and running, create a device and random measurements for it, and to get the current application subscriptions for a particular tenant.
