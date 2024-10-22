---
weight: 105
title: Microservice utility tool
layout: redirect
---

{{< product-c8y-iot >}} provides you a utility tool for easy microservice packaging, deployment and subscription. The script requires a local installation of Docker and jq, which is a lightweight and flexible JSON processor.

### Prerequisites {#prerequisites}

#### Docker {#docker}

Verify that you have a Docker installation. The Docker version must be >= 1.2.6

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

#### JSON processor {#json-processor}

Execute the following command to install the JSON processor on Linux systems:

```shell
$ sudo yum install jq
```

For macOS, use the following command:

```shell
$ brew install jq
```

#### Bash {#bash}

The microservice utility tool (script) needs Bash version 4+ to run. Verify your Bash version with the following command:

```shell
$ bash --version

GNU bash, version 5.0.3(1)-release (x86_64-apple-darwin18.2.0)
Copyright (C) 2019 Free Software Foundation, Inc.
```

macOS systems come with a preinstalled Bash version 3.x. Hence, you must update it in order to execute the microservice script. To do so, execute the following commands:

```shell
$ brew install bash
$ chsh -s /usr/local/bin/bash
```

If your Bash version has not changed while executing `bash --version`, you may need to restart your system. Note that the updated interpreter gets installed at */usr/local/bin/bash* and you must modify the first line of the microservice utility tool (script) as follows:

```bash
#!/usr/local/bin/bash

or

#!
```

### Configure the microservice utility tool {#configure-the-microservice-utility-tool}

The script can be found in the GitHub repository: [cumulocity-examples]({{< link-c8y-github >}}/cumulocity-examples/blob/develop/microservices/scripts/microservice).

Change the mode to allow the script to be executed:

```shell
$ chmod +x microservice
```

Use the help option to see all the available functions (goals) and options:

```shell
$ ./microservice help
```

### Packing {#packing}

A microservice must be packed as a Docker image in order to be deployed.
It requires a Docker _image.tar_ and _cumulocity.json_ files packed into a ZIP file.

The following directory structure is required to pack a microservice:

```bash
/docker/Dockerfile      # Instructions to build the Docker image
/docker/*               # All files within the directory will be included in the Docker build
/cumulocity.json        # The application manifest file
```

The script can be run in a parent folder holding such structure, or by passing the path to the directory using the `-dir` option. For instance, to pack a "Hello World" microservice application, execute:

```shell
$ ./microservice pack --name hello-world
```

It will create a ZIP file named _hello-world.zip_ and an intermediate _image.tar_ which is an exported Docker image.

{{< c8y-admon-important >}}
When naming your microservice application use only lower-case letters, digits and dashes. The maximum length for the name is 23 characters.
{{< /c8y-admon-important >}}

### Deploying {#deploying}

A microservice becomes available once it has been successfully deployed on the {{< product-c8y-iot >}} platform. This is done by uploading a ZIP file with the microservice packed as specified above. A user cannot directly push an image to the Docker registry.

Deploying your microservice application is rather easy, just execute the following command:

```shell
$ ./microservice deploy -n hello-world -d <URL> -u <username> -p <password> -te <tenant>
```

Note that you must have a tenant and user credentials in order to deploy your microservice.    
The successful execution will create an application on the {{< product-c8y-iot >}} platform with the specified name, if it does not exist yet. Then it will upload the _hello-world.zip_ file into the platform. Once it has been uploaded, your application will be listed in **Ecosystem** > **Microservices** in the Administration application.

If the name of the microservice application is not provided in the manifest file, it will be automatically inferred from the ZIP file name without the version number.

For further information on deploying microservices to {{< product-c8y-iot >}}, refer to [Managing microservices](/standard-tenant/ecosystem/#managing-microservices).

### Subscribing {#subscribing}

You must subscribe to the application in order to use it. Execute the following command to subscribe your tenant to the deployed microservice:

```shell
$ ./microservice subscribe -n hello-world -d <URL> -u <username> -p <password> -te <tenant> -id <APPLICATION_ID>
```

It will result in tenant subscription to an application specified by the ID parameter. If the user has already been subscribed, a warning message will be displayed.

### Multiple goals {#multiple-goals}

Goals can be executed together to pack, deploy and subscribe the application in a single line. In this case, the application ID will be automatically pulled by the script.

```shell
$ ./microservice pack deploy subscribe -n hello-world -d <URL> -u <username> -p <password> -te <tenant>
```

### Operating microservices {#operating-microservices}

{{< product-c8y-iot >}} manages microservices by monitoring the microservice instance and storing the metrics. In case a microservice exceeds the memory limit, it is restarted automatically. Also, microservices can be auto-scaled in case of high CPU usage. For more information, review the [scaling](#isolation-scaling) details above.
