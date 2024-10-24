---
weight: 10
title: Basic functionality
layout: redirect
---

### Developing apps {#developing-apps}

An EPL app is a monitor (\*.mon) file. You can develop EPL apps in two different ways:

* You can use the [Streaming Analytics application](#dev-apps-with-sa) which is available from {{< product-c8y-iot >}}'s application switcher and develop your EPL apps within {{< product-c8y-iot >}}.
* Or you can install Apama on your local machine and then develop your EPL apps (as monitor files) in [{{< sag-designer >}}](#sag-designer), that is, in a separate environment.

See also [Using the Apama Event Processing Language (EPL)](/concepts/realtime/#using-epl).

{{< c8y-admon-info >}}
To be able to develop and deploy EPL apps with the Streaming Analytics application and/or to import monitor files from {{< sag-designer >}} into {{< product-c8y-iot >}},
your tenant must be subscribed to the Apama-ctrl microservice that supports EPL apps.
If you do not see the **EPL Apps** page in the Streaming Analytics application and you wish to use EPL apps, contact [product support](/additional-resources/contacting-support/).
{{< /c8y-admon-info >}}

{{< c8y-admon-caution >}}
An EPL app has the ability to make nearly arbitrary changes to the objects in a tenant, whether that's inventory, alarms or many other sorts of object. A user who has ADMIN permission for "CEP management" is able to create and activate EPL apps and thus also has almost full control over the current tenant. Therefore, you should be careful about which users on the tenant have this permission.
{{< /c8y-admon-caution >}}

#### Developing apps with the Streaming Analytics application {#dev-apps-with-sa}

The **EPL Apps** page of the Streaming Analytics application provides an interface for interactively editing new or existing EPL apps (\*.mon files) as well as importing and activating (deploying) EPL apps.

Any user on the tenant wishing to use the **EPL Apps** page must be a **CEP Manager**. See [Managing permissions](/standard-tenant/managing-permissions/).

##### Step 1 - Invoke the Streaming Analytics application {#step-1---invoke-the-streaming-analytics-application}

Open the application switcher and click the <i class="c8y-icon c8y-icon-streaming-analytics c8y-icon-duocolor icon-20"></i> icon for the **Streaming Analytics** application. Then navigate to the **EPL Apps** page.

When you go to the **EPL Apps** page, the EPL app manager is shown first, listing any existing EPL apps. Each app is shown as a card. You can add new EPL apps and manage existing EPL apps from here.

![EPL Apps](/images/streaming-analytics/epl-apps/epl-apps-cards.png)

Each card that is shown for an app has an actions menu at the top which allows you to edit, download or delete the app.

From this page, you can:

* Edit existing EPL apps. Either use the **Edit** command from the actions menu or simply click on the card that is shown for the app.

* Create new EPL apps. See below.

* Import EPL apps. If you prefer to develop your apps outside of {{< product-c8y-iot >}} (for example, using {{< sag-designer >}}), click **Import EPL** in the top menu bar to upload an Apama monitor (\*.mon) file as an app into the Streaming Analytics application.

* Download EPL apps. Use the **Download** command from the actions menu to download the app as a \*.mon file.

* Deploy existing EPL apps. On the card that is shown for an app, change the mode from **Inactive** to **Active**. For more information, see [Deploying apps](/streaming-analytics/epl-apps/#deploying-apps).
    When activating an app, any syntax errors are reported back immediately. The error state is shown on the card, helping you to ensure your app is in good shape. Click on the error to display information on what went wrong. It is not possible to activate an app if it has syntax errors. The errors are shown on the card until they have been fixed and the app has been activated again.

* Reload all EPL apps. Click **Reload** in the top menu bar to refresh the display to show any changes other users have made since the page loaded, including any errors that have been introduced in the meantime.

##### Step 2 - Create an EPL app {#step-2---create-an-epl-app}

Click **New EPL app** in the top menu bar. In the resulting **Create app** dialog box, enter a unique app name.
You can also enter a description which will be shown on the card that is created for the new app. Click **OK**.

The EPL editor appears. The EPL code for the new app already contains the typical basic event definitions and utilities that are required for working with {{< product-c8y-iot >}}. You can adapt them as required for your app. Consult the documentation and samples for more details.

{{< c8y-admon-info>}}
When you click **Cancel** without specifying an app name, the EPL editor also appears and the default name "New" is then shown in the breadcrumb.
You can edit the EPL code, but as long as you do not specify an app name, you will not be able to save the app.
Click **App settings** and specify an app name in the resulting dialog box.
{{< /c8y-admon-info>}}

![EPL editor](/images/streaming-analytics/epl-apps/epl-apps-editor.png)

To help you get started, several samples are available. To see them, click **Samples** which is shown to the right of the editor. Click on a sample to see a preview of its contents. You can select part of the sample code and copy it over into your own code using the standard key combinations Ctrl+C and Ctrl+V. You can also use the command buttons to copy the entire code to the clipboard and insert it at an appropriate position in your own code, or to replace all of your existing code with the sample code.

Using the buttons in the top menu bar, you can undo/redo your last changes in the current session and you can save your changes.

It is also possible to change the mode from **Inactive** to **Active** (or vice versa) in the EPL editor. Again, when there is an error in your EPL code, it is not possible to activate the app. The errors are highlighted within the code.

{{< c8y-admon-info >}}
Be aware that the EPL editor makes use of a standard web component. It provides many generic developer functions, some of which are not relevant to EPL, including but not limited to Quick Fix and Show Hover.
{{< /c8y-admon-info >}}

Click the close icon <i class="dlt-c8y-icon-clear icon-20"></i> in the top menu bar to leave the EPL editor and thus to return to the list of EPL apps.

{{< c8y-admon-caution >}}
All unsaved changes are lost when you navigate to a different URL or close the browser window.
{{< /c8y-admon-caution >}}

##### Step 3 - Test the EPL app {#step-3---test-the-epl-app}

Once your app is activated, you should be able to see the results of it running. This may include sending measurements, receiving data, creating alarms, and logging in the Apama-ctrl microservice. For information on how to check the log files of the Apama-ctrl microservice, see [Monitoring microservices](/standard-tenant/ecosystem/#monitoring-microservices).

See also [Deploying apps](/streaming-analytics/epl-apps/#deploying-apps).

#### Developing apps with {{< sag-designer >}} {#sag-designer}

{{< sag-designer >}} provides a full development environment and is the tool of choice when you have a complex EPL application. When your EPL app (that is, the monitor file) is ready, you must import it into {{< product-c8y-iot >}}.

##### Step 1 - Install Apama {#step-1---install-apama}

Download the `apama-c8y-dev` package of Apama from [https://www.apamacommunity.com/downloads/](https://www.apamacommunity.com/downloads/) and extract it to install Apama. This installs the freemium Apama Community Edition with reduced capabilities and several restrictions. To unlock all features you need a license.

If you have a license, copy the license file into the Apama work directory (*APAMA_WORK/license*).

The `apama-c8y-dev` package includes {{< sag-designer >}} which is available for both the Apama Community Edition and licensed editions of Apama.

##### Step 2 - Create a project {#step-2---create-a-project}

Once installed, create an Apama project in {{< sag-designer >}} and enable it for {{< product-c8y-iot >}} connectivity. For instructions on how to create an Apama project, refer to [Creating Apama projects]({{< link-apama-webhelp >}}index.html#page/pam-webhelp%2FWIZARD_NEW_APAMA_PROJECT.html) in the Apama documentation.

##### Step 3 - Add Apama bundles to the project {#step-3---add-apama-bundles-to-the-project}

Add the following Apama bundles to the newly created Apama project. These are required by {{< product-c8y-iot >}} so that it can activate your app. For instructions on how to add bundles to a project, refer to [Adding bundles to projects]({{< link-apama-webhelp >}}index.html#page/pam-webhelp%2Fco-UsiApaStu_adding_bundles_to_projects.html) in the Apama documentation.

* **Cumulocity IoT > Event Definitions for Cumulocity** <br>
Provides event APIs required for sending and receiving data to/from {{< product-c8y-iot >}}.
* **Cumulocity IoT > Utilities for Cumulocity** <br>
Provides helper utility functions for working with data received from {{< product-c8y-iot >}}.
* **Any Extractor** <br>
Provides support for extracting values from the `any` type.
* **Time Format** <br>
Required to access all the methods of the Time Format plug-in. Useful for formatting and parsing time.
* **HTTP Client Generic Events** <br>
Exposes predefined generic events used by the HTTP client connectivity plug-in.
* **Automatic onApplicationInitialized** <br>
This starts all connectivity plug-ins immediately on start up.
* **HTTP Client > JSON with generic request/response event definitions** <br>
Allows EPL apps to make HTTP calls.
* **Cumulocity IoT > Cumulocity Notifications 2.0** <br>
Exposes the {{< product-c8y-iot >}} client to EPL apps using the Notifications 2.0 mechanism.
For general information on how to receive {{< product-c8y-iot >}} update notifications, see [Receiving update notifications]({{< link-apama-webhelp >}}index.html#page/pam-webhelp%2Fco-ConApaAppToExtCom_cumulocity_receiving_update_notifications.html) in the Apama documentation.

{{< c8y-admon-info >}}
The **Cumulocity Notifications 2.0** connectivity bundle has been added for receiving notifications from {{< product-c8y-iot >}} using the Notifications 2.0 mechanism. The existing **Cumulocity Client** connectivity bundle that uses the legacy long-polling mechanism is deprecated in favor of this new bundle. In addition, it is now possible to add the **Cumulocity REST Support** connectivity bundle if you do not receive any notifications. You must only add one of these three bundles to your project.
For information on how to migrate existing Apama projects to Notifications 2.0, see [Migrating from Cumulocity Client to Cumulocity Notifications 2.0]({{< link-apama-webhelp >}}index.html#page/pam-webhelp%2Fco-ApaRelNot_10155_migrate-to-notifications.html) in the Apama documentation.
{{< /c8y-admon-info >}}

The bundles above are the only ones that are permissible in an EPL app, so be careful not to add any other bundles or your app may not work when activated in {{< product-c8y-iot >}}.

##### Step 4 - Create a monitor file {#step-4---create-a-monitor-file}

To create a new Apama monitor file, refer to [Creating new monitor files for EPL applications]({{< link-apama-webhelp >}}index.html#page/pam-webhelp%2FWIZARD_NEW_MONITORSCRIPT.html) in the Apama documentation.

Before you import the newly created monitor file as an EPL app into {{< product-c8y-iot >}} and activate it there, you might want to test if the monitor file works as expected from within {{< sag-designer >}}.

For further information, see [The Cumulocity IoT Transport Connectivity Plug-in]({{< link-apama-webhelp >}}index.html#page/pam-webhelp%2Fco-ConApaAppToExtCom_the_cumulocity_connectivity_plug_in.html) in the Apama documentation.

##### Step 5 - Run and test the monitor file {#step-5---run-and-test-the-monitor-file}

When running the project locally, you must provide your {{< product-c8y-iot >}} credentials in the project configuration. Configure the credentials in the *CumulocityIoT.properties* file under the {{< product-c8y-iot >}} client. For example:

```
CUMULOCITY_USERNAME=user@example.com
CUMULOCITY_SERVER_URL=http://exampleTenant.{{< domain-c8y >}}
CUMULOCITY_PASSWORD=examplePassword
CUMULOCITY_APPKEY=apamaAppKey
```

{{< c8y-admon-info >}}
You must [create an application](/standard-tenant/ecosystem/#custom-applications) in {{< product-c8y-iot >}} to get a value for `CUMULOCITY_APPKEY`.
{{< /c8y-admon-info >}}

Note that the above description assumes that you are connecting to a tenant where the URL identifies the tenant. If that is not true (for example, if you are connecting by an IP address), you may need to set this in the *CumulocityIoT.properties* file:

```
CUMULOCITY_TENANT=my_custom_tenant
```

If the project needs to run locally in a multi-tenant environment, enable the multi-tenant support and provide the name of the multi-tenant microservice to use
by configuring the following properties in the *CumulocityIoT.properties* file under the {{< product-c8y-iot >}} client:

```
# Enable multi-tenant support
CUMULOCITY_MULTI_TENANT_APPLICATION=true

# The name of the multi-tenant microservice to use.
# If a multi-tenant microservice does not already exist, either upload a multi-tenant microservice or
# create a microservice with a valid manifest. Subscribe the microservice to tenants for which you want
# to run the project.
CUMULOCITY_MULTI_TENANT_MICROSERVICE_NAME=example-multi-tenant-ms
```

In addition, make sure that the monitor files are able to work with the multi-tenant microservice.
For more information, see [Working with multi-tenant deployments]({{< link-apama-webhelp >}}index.html#page/pam-webhelp%2Fco-ConApaAppToExtCom_cumulocity_working_with_multi_tenant_deployments.html) in the Apama documentation.

You can now proceed with testing your EPL in {{< sag-designer >}}.

Once the EPL app is ready, refer to [Deploying apps](/streaming-analytics/epl-apps/#deploying-apps) to find out how to deploy it to {{< product-c8y-iot >}}.

### Deploying apps {#deploying-apps}

You can deploy the following to {{< product-c8y-iot >}}:

* EPL apps. You can [develop or import a single \*.mon file with the Streaming Analytics application](#single-mon-file). This is the simplest mechanism for deploying an EPL app.
* Apama applications. You can upload complex Apama applications (that is, Apama projects developed with {{< sag-designer >}}) to {{< product-c8y-iot >}} and [deploy them as custom microservices](#deploying-as-microservice) using the {{< product-c8y-iot >}} Microservice SDK.

{{< c8y-admon-info >}}
In the Streaming Analytics application, the term "activate" is used for deploying an app.
{{< /c8y-admon-info >}}

#### Deploying EPL apps as single \*.mon files with the Streaming Analytics application  {#single-mon-file}

When an EPL app (that is, a \*.mon file) is activated in {{< product-c8y-iot >}}, the \*.mon file is assigned a unique package name. This prevents conflicts when multiple modules are activated. For this reason, you should not specify a `package` statement in a \*.mon file. If you must share events between different parts of your application, then write the event definitions and monitors that use it in a single \*.mon file.

There is a restricted set of utilities and base events available for your EPL app. At the time of writing, these include the **Time Format** and **HTTP Client > JSON with generic request/response event definitions** bundles.

When any EPL app signals a runtime error, this will be raised as an alarm. Runtime errors include uncaught exceptions, as well as any explicit logging of warnings and errors that your EPL app wants to do. Health issues that relate to the Apama runtime in general will also be raised as alarms.

For more detailed diagnostics of the Apama runtime and any active EPL apps, you can look at the logs for the Apama-ctrl microservice. See [Monitoring microservices](/standard-tenant/ecosystem/#log-files) for more information on log files. However, some familiarity with Apama is necessary to get the most out of an Apama log file.


#### Deploying Apama applications as microservices {#deploying-as-microservice}

Using {{< sag-designer >}}, you can also develop more complex projects which:

* are spread across multiple \*.mon files
* must be isolated from other Apama applications
* use connectivity plug-ins or EPL plug-ins that are not enabled by default

These kinds of applications should be deployed as microservices to {{< product-c8y-iot >}}.

##### Required settings in the microservice manifest {#required-settings-in-the-microservice-manifest}

The microservice manifest provides the required settings to manage microservice instances and the application deployment in {{< product-c8y-iot >}}. For detailed information, see [Microservice manifest](/microservice-sdk/general-aspects/#microservice-manifest).

Apama can be used in either a single-tenant microservice or a multi-tenant microservice.
Therefore, the microservice manifest must set the isolation level to either PER_TENANT or MULTI_TENANT.
When Apama is used in a multi-tenant microservice, the Apama application must be written to be multi-tenant aware.
For more information, see [Working with multi-tenant deployments]({{< link-apama-webhelp >}}index.html#page/pam-webhelp%2Fco-ConApaAppToExtCom_cumulocity_working_with_multi_tenant_deployments.html) in the Apama documentation.

The following permissions are required by the microservice in order to start up and use all features in the {{< product-c8y-iot >}} transport from EPL. These are set with requiredRoles in the microservice manifest.

- ROLE_APPLICATION_MANAGEMENT_READ
- ROLE_INVENTORY_READ
- ROLE_INVENTORY_ADMIN
- ROLE_INVENTORY_CREATE
- ROLE_MEASUREMENT_READ
- ROLE_MEASUREMENT_ADMIN
- ROLE_EVENT_READ
- ROLE_EVENT_ADMIN
- ROLE_ALARM_READ
- ROLE_ALARM_ADMIN
- ROLE_DEVICE_CONTROL_READ
- ROLE_DEVICE_CONTROL_ADMIN
- ROLE_IDENTITY_READ
- ROLE_OPTION_MANAGEMENT_READ
- ROLE_BULK_OPERATION_READ
- ROLE_SMS_ADMIN

{{< c8y-admon-info>}}
To take advantage of the {{< product-c8y-iot >}} Notifications 2.0 reliable data forwarding capability to receive notifications, you must also add the following permission to the manifest of the custom microservice and contact [product support](/additional-resources/contacting-support/) to set the the `notification2.streaming-analytics` feature flag.

- ROLE_NOTIFICATION_2_ADMIN
{{< /c8y-admon-info>}}

{{< c8y-admon-info >}}
The above is the minimum list of permissions that a custom Apama microservice needs. If you are developing a custom microservice, you may add more permissions to the microservice manifest.
{{< /c8y-admon-info >}}

##### To deploy an Apama application as a microservice {#to-deploy-an-apama-application-as-a-microservice}

1. Develop your application in {{< sag-designer >}} in the usual way.

2. You can use Apama's Docker support to turn the entire project into a microservice. In the **Project Explorer** view, right-click the project and select **Apama > Add Docker Support**, which will add a Dockerfile to the root of your project directory.
	When used for building, it will make use of the Apama images available on Docker Hub. You will need Docker Hub credentials that give you access to the Apama images. Apama Docker images are exclusively Linux-based.

3. Add any custom steps to the Dockerfile that might be necessary, for example, building a custom plug-in, or copying your license file into the image.

4. Use the {{< product-c8y-iot >}} microservice utility tool for packaging and deploying the project; for detailed information, see [Microservice utility tool](/microservice-sdk/general-aspects/#microservice-utility-tool). When creating the directory structure for the microservice utility tool to build from, copy your entire project directory inside that directory with the name "docker/". For example:

    *docker/monitors/*<br>
    *docker/eventdefinitions/*<br>
    *docker/Dockerfile*<br>
    *docker/...*<br>
    *cumulocity.json*

    You must create the [microservice manifest](/microservice-sdk/general-aspects/#microservice-manifest) manually, but there is no need for anything special in the microservice manifest; no roles or probes are required. However, if you want to configure a liveness or readiness probe, you can configure an `httpGet` probe for the path */ping* on port 15903 (Apama's default port). Enabling auto-scaling is not recommended, as Apama applications are usually stateful and do not automatically partition their input.

    You can pack, deploy and subscribe from this directory, resulting in your Apama application being turned into a running microservice. The behavior of the application when being run outside of {{< product-c8y-iot >}} (from {{< sag-designer >}} or your test environment) will be near-identical to its behavior inside {{< product-c8y-iot >}}. When deployed as a microservice doing requests to the {{< product-c8y-iot >}} API, Apama will automatically pick up the credentials to connect to the tenant you deployed it to, overwriting any other credentials provided to Apama. However, if you wish to receive real-time events, you must have valid credentials specified in the project configuration as you do when connecting to {{< product-c8y-iot >}} from an external Apama environment.

5. When you are ready to deploy to {{< product-c8y-iot >}}, upload the application as a microservice. For details, refer to [Managing microservices](/standard-tenant/ecosystem/#managing-microservices).

{{< c8y-admon-info >}}
After February 2022, the location of the Docker images on Docker Hub has changed for all supported release trains.
They are now available at *softwareag* instead of within the Docker Hub environment at *store/softwareag*.
If you still use the images from the previous location, you must migrate them.
See also [Apama Docker image availability on Docker Hub]({{< link-sag-tech-forum >}}/t/apama-docker-image-availability-on-docker-hub/260207).
{{< /c8y-admon-info >}}

{{< c8y-admon-important >}}
Apama 10.15.0 introduces several new container images provided via Docker Hub and some of the existing container images have changed content.
When building images for use as a {{< product-c8y-iot >}} microservice, this is now different to earlier releases.
You must now use the
[softwareag/apama-cumulocity-jre](https://hub.docker.com/r/softwareag/apama-cumulocity-jre) image with the
[softwareag/apama-cumulocity-builder](https://hub.docker.com/r/softwareag/apama-cumulocity-builder) image as a builder image.
To do this with the default project Dockerfile created by {{< sag-designer >}} in 10.15.0 and previous versions,
you must either change the `FROM` lines in the Dockerfile appropriately
(you only need to do this once) or build using the following flags (you must do this every time):

```
--build-arg APAMA_BUILDER=softwareag/apama-cumulocity-builder:10.15 --build-arg APAMA_IMAGE=softwareag/apama-cumulocity-jre:10.15
```
{{< /c8y-admon-important >}}


### Testing apps {#testing-apps}

You can use the Apama EPL Apps Tools on GitHub to script uploads of your EPL apps and manage them for  CI/CD (continuous integration and continuous delivery) use cases. This tooling also provides extensions to the PySys test framework to allow you to simply write tests for your EPL apps and to run them automatically.

Apama EPL Apps Tools is available from [https://github.com/Cumulocity-IoT/apama-eplapps-tools](https://github.com/Cumulocity-IoT/apama-eplapps-tools). See the [EPL Apps Tools documentation](https://cumulocity-iot.github.io/apama-eplapps-tools/) for detailed information.

For more information on PySys, see the [API Reference for Python]({{< link-apama-webhelp >}}index.html#page/pam-webhelp%2Fco-ApaDoc_pydoc_documentation.html) that you can access from the Apama documentation.

### Supported REST services {#supported-rest-services}

EPL apps are designed to listen for REST (Representational State Transfer) services and supports all GET, POST, PUT and DELETE operations. Example requests for the different operations are listed below.

To perform these operations, you must have READ and ADMIN permissions for "CEP management" (see also [Managing permissions](/standard-tenant/managing-permissions/)).

#### Request headers for all operations {#request-headers-for-all-operations}

Each request must be authenticated to {{< product-c8y-iot >}}.

| Name   | Description                                        |
| ------ | -------------------------------------------------- |
| Accept | "application/json". This is a mandatory parameter. |

#### Common response codes {#common-response-codes}

The following common error response codes can be expected for all requests:

| Code | Description                                                  |
| ---- | ------------------------------------------------------------ |
| 401  | Unauthorized.                                                |
| 403  | Forbidden. EPL apps are not available with the Apama-ctrl-starter microservice. |

Any other response codes that can be expected from a specific request are given below.

#### Common field descriptions {#common-field-descriptions}

The following common fields are available with the responses, depending on the operation:

| Field          | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| contents       | The full contents of the EPL file.                           |
| description    | A description of the file.                                   |
| eplPackageName | The package name of the EPL file. If the name contains special characters (including spaces), these characters are escaped to make them valid EPL identifiers and avoid injection errors. |
| errors         | A list of all compilation errors in the file, if any, with line numbers and text. |
| id             | A unique identifier of the file.                             |
| name           | The name provided for this bit of EPL.                       |
| state          | Whether the EPL is injected into the correlator and running. This can either be `active` or `inactive`. |
| warnings       | A list of all compilation warnings in the file, if any, with line numbers and text. |

#### GET - Retrieve all available EPL files {#get---retrieve-all-available-epl-files}

Endpoint: `/service/cep/eplfiles`

##### Example request {#example-request}

`GET /service/cep/eplfiles`

##### Responses {#responses}

| Code | Description                                             |
| ---- | ------------------------------------------------------- |
| 200  | Successful operation. See also the example value below. |
| 400  | Bad request. Header contents has unexpected value.      |

Example value for response code 200:

```
{
  "eplfiles":[
    {
      "description":"",
      "eplPackageName": "eplfiles.Ordinal1",
      "errors":[

      ],
      "id":"39615",
      "name":"Ordinal1",
      "state":"active",
      "warnings":[

      ]
    }
  ]
}
```

#### GET - Retrieve all available EPL files with their contents {#get---retrieve-all-available-epl-files-with-their-contents}

Endpoint: `/service/cep/eplfiles`

##### Request parameters {#request-parameters}

| Name     | Description                                                  |
| -------- | ------------------------------------------------------------ |
| contents | Boolean type. Fetches the EPL files with their contents. This is an optional query parameter. |

##### Example request {#example-request}

`GET /service/cep/eplfiles?contents=true`

##### Responses {#responses}

| Code | Description                                             |
| ---- | ------------------------------------------------------- |
| 200  | Successful operation. See also the example value below. |

Example value for response code 200:

```
{
  "eplfiles":[
    {
      "contents":"monitor M0 { action onload() { on wait(1.0) { log \"Hello\" at INFO; }}}",
      "description":"",
      "eplPackageName": "eplfiles.Ordinal1",
      "errors":[
      ],
      "id":"39615",
      "name":"Ordinal1",
      "state":"active",
      "warnings":[
      ]
    }
  ]
}
```

#### GET - Retrieve EPL file by identifier {#get---retrieve-epl-file-by-identifier}

Endpoint: `/service/cep/eplfiles/{id}`

##### Request parameters {#request-parameters}

| Name | Description                                                  |
| ---- | ------------------------------------------------------------ |
| id   | Identifier of the EPL file to be fetched. This is a mandatory parameter. |

##### Example request {#example-request}

`GET /service/cep/eplfiles/{{id}}`

##### Responses {#responses}

| Code | Description                                                  |
| ---- | ------------------------------------------------------------ |
| 200  | Successful operation. See also the example value below.      |
| 404  | File with identifier not found. See also the [example value for this response code](#example-404) at the end of this section. |

Example value for response code 200:

```
{
      "contents":"monitor M0 { action onload() { on wait(1.0) { log \"Hello\" at INFO; }}}",
      "description":"",
      "eplPackageName": "eplfiles.Ordinal1",
      "errors":[
      ],
      "id":"39615",
      "name":"Ordinal1",
      "state":"active",
      "warnings":[
      ]
}
```

#### POST - Create a new EPL application {#post---create-a-new-epl-application}

Endpoint: `/service/cep/eplfiles`

##### Example request {#example-request}

`POST /service/cep/eplfiles`

The following is an example of a request body:

```
{
  "name": "Ordinal1",
  "contents": "monitor M1 { action onload() { on wait(1.0) { log \"Hello\" at INFO; }}}",
  "state": "active",
  "description": ""
}
```

Note the following:

- The `name` is used for the package of the file (thus the EPL file must not contain a `package` statement) and must be unique across all EPL files. The name is prefixed and certain characters are escaped. The actual package name used is returned in the `eplPackageName` field for convenience (you can search for this in the microservice log file to find log statements).
- Make sure to provide safely escaped `contents`.
- `description` is optional and can be empty.


##### Responses {#responses}

| Code | Description                                                  |
| ---- | ------------------------------------------------------------ |
| 201  | Successfully created / Created with errors in file / Created with warnings in file. See also the examples below. |
| 405  | Invalid input.                                               |

Example for response code 201 when successfully created:

```
{
  "description":"",
  "eplPackageName": "eplfiles.Ordinal1",
  "errors":[

  ],
  "id":"39615",
  "name":"Ordinal1",
  "state":"active",
  "warnings":[

  ]
}
```

Example for response code 201 when created with warnings or errors:

```
{
  "description":"",
  "eplPackageName": "eplfiles.Ordinal1",
  "errors":[
    {
      "line":5,
      "text":"assigning a float to an integer variable"
    }
  ],
  "id":"39651",
  "name":"Ordinal1",
  "state":"inactive",
  "warnings":[
    {
      "line":10,
      "text":"\"assert\" may become a reserved word in future versions of EPL"
    }
  ]
}
```

#### PUT - Update EPL file by identifier {#put---update-epl-file-by-identifier}

Endpoint: `/service/cep/eplfiles/{id}`

##### Request parameters {#request-parameters}

| Name | Description                                                  |
| ---- | ------------------------------------------------------------ |
| id   | Identifier of the EPL file to be updated. The identifier must be included in the path. This is a mandatory parameter. |

##### Example request {#example-request}

`PUT /service/cep/eplfiles/{id}`

The following is an example of a request body:

```
{
  "name": "Ordinal1",
  "contents": "monitor M1 { action onload() { on wait(1.0) { log \"Hello\" at INFO; }}}",
  "state": "active",
  "description": ""
}
```

See also the information given for the POST request.

##### Responses {#responses}

| Code | Description                                                  |
| ---- | ------------------------------------------------------------ |
| 200  | Successfully updated. See also the example values below.     |
| 404  | File with identifier not found. See also the [example value for this response code](#example-404) at the end of this section. |

Example value for response code 200 when successfully updated with no errors:

```
{
  "description":"",
  "eplPackageName": "eplfiles.Ordinal1",
  "errors":[

  ],
  "id":"39615",
  "name":"Ordinal1",
  "state":"active",
  "warnings":[

  ]
}
```

Example value for response code 200 when updated with errors or warnings:

```
{
  "description":"",
  "eplPackageName": "eplfiles.Ordinal1",
  "errors":[
    {
      "line":5,
      "text":"assigning a float to an integer variable"
    }
  ],
  "id":"39651",
  "name":"Ordinal1",
  "state":"inactive",
  "warnings":[
    {
      "line":10,
      "text":"\"assert\" may become a reserved word in future versions of EPL"
    }
  ]
}
```

#### DELETE - Delete EPL file by identifier {#delete---delete-epl-file-by-identifier}

Endpoint: `/service/cep/eplfiles/{id}`

##### Request parameters {#request-parameters}

| Name | Description                                                  |
| ---- | ------------------------------------------------------------ |
| id   | Identifier of the EPL file to be deleted. The identifier must be included in the path. This is a mandatory parameter. |

##### Example request {#example-request}

`DELETE /service/cep/eplfiles/{{id}}`

##### Responses {#responses}

| Code | Description                                                  |
| ---- | ------------------------------------------------------------ |
| 200  | Successfully deleted.                                        |
| 404  | File with identifier not found. See also the [example value for this response code](#example-404) at the end of this section. |


#### Example value for response code 404 {#example-404}
The response code 404 indicates that a file with a specific identifier was not found.

```
{
  "error":"Not Found",
  "exception":"com.apama.in_c8y.FileNotFoundException",
  "message":"File with id 39613 not found",
  "path":"/eplfiles/39613",
  "status":404,
  "timestamp":"2020-01-17T12:21:42.457+0000"
}
```

where

- `error` is the error message.
- `exception` specifies the exception that was raised.
- `message` is a description of the exception message.
- `path` is the path that was requested.
- `status` is the status of the application.
- `timestamp` is the timestamp in ISO format.


### Events and channels {#events-and-channels}

In Apama EPL, interactions with the rest of the {{< product-c8y-iot >}} ecosystem are done via events. A number of event definitions is provided for accessing {{< product-c8y-iot >}} data.

{{< c8y-admon-info >}}
Apama and {{< product-c8y-iot >}} use different "event" concepts. Apama events are used for all interactions with {{< product-c8y-iot >}}, such as listening for and creating device measurements, alarms and ({{< product-c8y-iot >}}) events. For more information on Apama events, see [Defining event types]({{< link-apama-webhelp >}}index.html#page/pam-webhelp%2FtutorialEventTypes.html) in the Apama documentation. For more information on {{< product-c8y-iot >}} events, see [Events](https://{{< domain-c8y >}}/api/core/#tag/Events) in the {{< openapi >}}.
{{< /c8y-admon-info >}}

#### Predefined event types {#predefined-event-types}

There are some predefined event types to interact with several {{< product-c8y-iot >}} APIs. Events are sent to Apama applications automatically when a new measurement, alarm or event is created. For interacting with the {{< product-c8y-iot >}} backend, you can create an event and send it to the relevant channel. {{< product-c8y-iot >}} will automatically execute either the database query or create the API calls necessary for sending mails, SMS, or similar.

Look at the [data model]({{< link-apamadoc-api >}}com/apama/cumulocity/package-summary.html) in the API Reference for EPL (ApamaDoc) to see how the events for each stream are structured.

#### Sending events to a channel {#sending-events-to-a-channel}

Sending an event is done by constructing the event, either with `new <type>` followed by assignments to the fields, or with a constructor specifying all of the fields. The `send` statement is then used to send the event to {{< product-c8y-iot >}}. The `send` statement requires a channel - this is the `SEND_CHANNEL` constant on the event type.

#### Listening to events {#listening-to-events}

You can trigger your EPL by listening to events on channels. You can subscribe to channels with the `monitor.subscribe("string name")` method. This can be done in the startup of your monitor, or if you only want to receive events some of the time, called as needed, followed by `monitor.unsubscribe("string name")`.

Listen for events using the `on` statement, followed by the event type that you are listening to, open and close parentheses, and `as <identifier>` to name a variable that will hold the event.

By default, a listener will fire once; to make it repeat for all events, use the `all` keyword before the event type.

#### Filters {#filters}

Adding filters can be done by specifying one or more fields between the parentheses for a listener. Only top-level fields can be filtered for. Use `if` statements for more complex filtering, or for filtering on subproperties of events (for example, in dictionaries).

#### Standard event types and channels {#standard-event-types-and-channels}

For the standard {{< product-c8y-iot >}} events, there are constants that contain the channels for sending and receiving events, for example:

```java
monitor.subscribe(Measurement.SUBSCRIBE_CHANNEL);
send msmnt to Measurement.SEND_CHANNEL;
```

The events listed in the following table are part of the `com.apama.cumulocity` package.

| Event               | Channel for sending              | Channel for receiving                 |
| ------------------- | -------------------------------- | ------------------------------------- |
| Operation           | Operation.SEND_CHANNEL           | Operation.SUBSCRIBE_CHANNEL           |
| Measurement         | Measurement.SEND_CHANNEL         | Measurement.SUBSCRIBE_CHANNEL         |
| Event               | Event.SEND_CHANNEL               | Event.SUBSCRIBE_CHANNEL               |
| Alarm               | Alarm.SEND_CHANNEL               | Alarm.SUBSCRIBE_CHANNEL               |
| ManagedObject       | ManagedObject.SEND_CHANNEL       | ManagedObject.SUBSCRIBE_CHANNEL       |
| MeasurementFragment | MeasurementFragment.SEND_CHANNEL | MeasurementFragment.SUBSCRIBE_CHANNEL |

#### Measurement fragments {#measurement-fragments}

`Measurement` and `MeasurementFragment` events are always published.

You can generate listeners in EPL that will match on the contents of `MeasurementFragment` events rather than `Measurement` events. For example:

```
on all MeasurementFragment(type="c8y_SpeedMeasurement", valueFragment = "c8y_speed", valueSeries = "speedX", value > SPEED_LIMIT) as mf {
}
```

See also [Measurement fragments](/streaming-analytics/epl-apps/#measurement-fragments-advanced).


#### Distinguishing between create and update notifications {#notifications}

When listening for `Alarm`, `Event`, `ManagedObject` or `Operation` events from {{< product-c8y-iot >}}, you may want to to distinguish between create and update operations. Each of these event types have actions named `isCreate()` and `isUpdate()` for this purpose.

Example for listening for new alarms:

```java
on all Alarm() as alarm {
    if alarm.isCreate() {
        log "Alarm created: " + alarm.toString() at INFO;
    }
    // else it's an update
}
```

And similarly, only for updated alarms:

```java
on all Alarm() as alarm {
    if alarm.isUpdate() {
        log "Alarm updated: " + alarm.toString() at INFO;
    }
    // else it's a create
}
```

For events that have come from {{< product-c8y-iot >}}, one of `isUpdate()` or `isCreate()` will always return true. Both actions are provided for choice and readability.

For more information, including examples for the different types of objects, see [Receiving update notifications]({{< link-apama-webhelp >}}index.html#page/pam-webhelp%2Fco-ConApaAppToExtCom_cumulocity_receiving_update_notifications.html) in the Apama documentation.

See also the [API Reference for EPL (ApamaDoc)]({{< link-apamadoc-api >}}/com/apama/cumulocity/package-summary.html) for more information about the `isCreate()` and `isUpdate()` actions.


### Example {#example}

This example listens for new measurements using the `com.apama.cumulocity.MeasurementFragment` API. It filters incoming measurements to find speed values above a given maximum speed and raises an alarm if the limit is breached.

1. Subscribe to the `MeasurementFragment.SUBSCRIBE_CHANNEL` channel.
2. Listen to the measurement fragment and filter on `type`, which is  `c8y_SpeedMeasurement`. Ensure that `valueFragment` has the value  `c8y_speed` and that `valuesSeries` filters on `speedX` only. Also  filter on `value` when it is greater than `SPEED_LIMIT`.
3. Create the event using the constructor specifying all of the fields.
4. Send the event to the correct channel - `Alarm.SEND_CHANNEL`.

The resulting \*.mon file can look like this:

```java
using com.apama.cumulocity.Alarm;
using com.apama.cumulocity.MeasurementFragment;

monitor TriggerAlarmForSpeedBreach {
    constant float SPEED_LIMIT := 30.0;
    action onload() {
        monitor.subscribe(MeasurementFragment.SUBSCRIBE_CHANNEL);
        // Everytime a measurement fragment with the specific details of the match criteria is triggered then we should raise an alarm
        on all MeasurementFragment(type="c8y_SpeedMeasurement", valueFragment = "c8y_speed", valueSeries = "speedX", value > SPEED_LIMIT) as mf {
            send Alarm("", "c8y_SpeedAlarm", mf.source, currentTime,
                        "Speed limit breached", "ACTIVE", "CRITICAL", 1,
                        new dictionary<string,any>) to Alarm.SEND_CHANNEL;
        }
    }
}
```
