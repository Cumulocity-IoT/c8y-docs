---
weight: 30
title: Managing applications
layout: redirect
---

In the Cumulocity platform we distinguish between two kinds of applications:

* [Subscribed applications](#subscribed-applications) -  all applications subscribed to the tenant (either provided by the platform or a service provider) but not owned. May not be added, modified or removed by the user.
* [Own applications](#own-applications) - all applications owned by the tenant. Users can [add custom applications](#add-applications) in various ways as own applications. 

Both applications are available through the **Applications** menu in the navigator:

<img src="/guides/images/users-guide/Administration/admin-menu.png" alt="Applications menu"> 

### <a name="application-properties"></a>Application properties

Click on an application card to view the application properties.

<img src="/guides/images/users-guide/Administration/admin-application-properties.png" alt="Application properties" style="max-width: 100%">

Each application will show the following properties, depending on the application type:

<table>
<col width= 100>
<col width= 250>
<col width= 150>
<thead>
<tr>
<th style="text-align:left">Field</th>
<th style="text-align:left">Description</th>
<th style="text-align:left">Hosted (Web app)</th>
<th style="text-align:left">Microservice</th>
<th style="text-align:left">External</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">ID</td>
<td style="text-align:left">Unique ID to identify the application</td>
<td style="text-align:left">Automatically provided</td>
<td style="text-align:left">Automatically provided</td>
<td style="text-align:left">Automatically provided</td>
</tr>
<tr>
<td style="text-align:left">Name</td>
<td style="text-align:left">Application name. Will be shown as title of the application in the top bar and in the application switcher.</td>
<td style="text-align:left">Automatically created</td>
<td style="text-align:left">Automatically created, based on the zip file name</td>
<td style="text-align:left">Specified by the user</td>
</tr>
<tr>
<td style="text-align:left">Application key</td>
<td style="text-align:left">Used to identify the application and to make the application available for subscription, see the <a href="/guides/concepts/applications" class="no-ajaxy">Concepts Guide</a>.</td>
<td style="text-align:left">Automatically created</td>
<td style="text-align:left">Automatically created based on the zip file name</td>
<td style="text-align:left">Specified by the user</td>
</tr>
<tr>
<td style="text-align:left">Type</td>
<td style="text-align:left">Application type</td>
<td style="text-align:left">Hosted application</td>
<td style="text-align:left">Microservice</td>
<td style="text-align:left">External</td>
</tr>
<tr>
<td style="text-align:left">Path</td>
<td style="text-align:left">Part of the URL invoking the application</td>
<td style="text-align:left">Automatically created</td>
<td style="text-align:left">Automatically created as .../service/&lt;microservice name&gt;</td>
<td style="text-align:left">Specified by the user. For example, if you use "hello" as application path, the URL of the application will be "/apps/hello".</td>
</tr>
</tbody>
</table>

> **Info**: ID and type cannot be changed.

### <a name="subscribed-applications"></a>Subscribed applications

Cumulocity provides a variety of applications for different purposes. 

Depending on your installation and/or optional services your tenant will show a selection of the potentially available applications listed below. 

The columns show the following information:

* **Application**: Application name as visible in the Administration application.
* **Functionality**: Brief description.
* **Name**: Identification of the application in the API. In case you want to subscribe a tenant to the application using an API, use this string in the argument (as name).
* **Type**: Technical type of the application. "Feature" refers to built-in applications subscriptions, i.e. these applications are not represented by an explicit artefact (microservice or web application).

### Standard Tenant default applications

In the Standard Tenant you will find the following default applications:

<table>
<col width="200">
<col width="350">
<col width="200">
<thead>
<tr>
<th style="text-align:center">Application</th>
<th style="text-align:left">Functionality</th>
<th style="text-align:left">Name (as used in the API)</th>
<th style="text-align:left">Type</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><a href="/guides/users-guide/administration" class="no-ajaxy">Administration</a></td>
<td style="text-align:left">Lets account administrators manage users, roles, tenants and applications.</td>
<td style="text-align:left">administration</td>
<td style="text-align:left">Web app</td>
</tr>
<tr>
<td style="text-align:center"><a href="/guides/apama" class="no-ajaxy">Apama-ctrl*</a></td>
<td style="text-align:left">Runtime for Apama EPL Apps, Smart Rules and Analytics Builder.</td>
<td style="text-align:left">apama-ctrl-* (different strings for different size/capability options)</td>
<td style="text-align:left">Microservice</td>
</tr>
<tr>
<td style="text-align:center"><a href="/guides/apama" class="no-ajaxy">Apama Analytics Builder</a></td>
<td style="text-align:left">Analytics Builder model manager and editor – allows models to be built graphically to process and react to data from devices.</td>
<td style="text-align:left">Apama Analytics Builder</td>
<td style="text-align:left">Web app</td>
</tr>
<tr>
<td style="text-align:center"><a href="/guides/event-language" class="no-ajaxy">Cep</a></td>
<td style="text-align:left"><b>This application is deprecated and no longer a default application in the Standard Tenant. Apama now is the standard CEP engine.</b> <br>Define business operations based on realtime data by using the Esper CEP engine. This CEP variant uses a shared instance for multiple tenants. See "Cep-small" for a per-tenant approach.</td>
<td style="text-align:left">cep</td>
<td style="text-align:left">Microservice</td>
</tr>
<tr>
<td style="text-align:center"><a href="/guides/users-guide/cockpit" class="no-ajaxy">Cockpit</a></td>
<td style="text-align:left">Manage and monitor IoT assets and data from a business perspective.</td>
<td style="text-align:left">cockpit</td>
<td style="text-align:left">Web app</td>
</tr>
<tr>
<td style="text-align:center"><a href="/guides/users-guide/device-management" class="no-ajaxy">Device Management</a></td>
<td style="text-align:left">Manage and monitor devices, and control and troubleshoot devices remotely.</td>
<td style="text-align:left">devicemanagement</td>
<td style="text-align:left">Web app</td>
</tr>
<tr>
<td style="text-align:center"><a href="/guides/users-guide/device-management#simulator" class="no-ajaxy">Device simulator</a></td>
<td style="text-align:left">Simulate all aspects of IoT devices.</td>
<td style="text-align:left">device-simulator</td>
<td style="text-align:left">Microservice</td>
</tr>
<tr>
<td style="text-align:center"><a href="/guides/users-guide/cockpit#smart-rules" class="no-ajaxy">Smart Rules</a></td>
<td style="text-align:left">Use the Smart Rule engine and create <a href="/guides/users-guide/cockpit#smart-rules" class="no-ajaxy">Smart Rules</a> to perform actions based on realtime data. Requires one of the following applications: "Cep", "Apama"</td>
<td style="text-align:left">smartrule</td>
<td style="text-align:left">Microservice</td>
</tr>
</tbody>
</table>


### Enterprise Tenant applications

<table>
<col width="200">
<col width="350">
<col width="200">
<thead>
<tr>
<th style="text-align:center">Application</th>
<th style="text-align:left">Functionality</th>
<th style="text-align:left">Name (as used in the API)</th>
<th style="text-align:left">Type</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><a href="/guides/users-guide/enterprise-edition/#branding" class="no-ajaxy">Branding</a></td>
<td style="text-align:left">Customize the look of your tenants to your own preferences.</td>
<td style="text-align:left">branding</td>
<td style="text-align:left">Microservice</td>
</tr>
<tr>
<td style="text-align:center"><a href="/guides/users-guide/enterprise-edition/#data-broker" class="no-ajaxy">Data Broker</a></td>
<td style="text-align:left">Lets you share data selectively with other tenants.</td>
<td style="text-align:left">feature-broker</td>
<td style="text-align:left">Feature</td>
</tr>
<tr>
<td style="text-align:center"><a href="/guides/users-guide/enterprise-edition#customization" class="no-ajaxy">SSL management</a></td>
<td style="text-align:left">Activate your own custom domain name by using a SSL certificate.</td>
<td style="text-align:left">sslmanagement</td>
<td style="text-align:left">Microservice</td>
</tr>
<tr>
<td style="text-align:center"><a href="/guides/users-guide/enterprise-edition/#user-hierarchies" class="no-ajaxy">User hierarchies</a></td>
<td style="text-align:left">Reflect independent organizational entities in Cumulocity that share the same database.</td>
<td style="text-align:left">feature-user-hierarchy</td>
<td style="text-align:left">Feature</td>
</tr>
</tbody>
</table>

### Optional applications

<table>
<col width="200">
<col width="350">
<col width="200">
<thead>
<tr>
<th style="text-align:center">Application</th>
<th style="text-align:left">Functionality</th>
<th style="text-align:left">Name (as used in the API)</th>
<th style="text-align:left">Type</th>
</tr>
</thead>
<tbody>
<td style="text-align:center"><a href="/guides/apama" class="no-ajaxy">Apama EPL Apps</a></td>
<td style="text-align:left"><b>This application is an optional service in Cumulocity IoT Core but standard in Cumulocity IoT Edge.</b><br>
Manager and editor for Apama Event Processing Language (EPL) apps, for immediate processing of incoming data.</td>
<td style="text-align:left">Apama EPL Apps</td>
<td style="text-align:left">Web app</td>
</tr>
<tr>
<td style="text-align:center"><a href="/guides/event-language" class="no-ajaxy">CEP custom rules</a></td>
<td style="text-align:left"><b>This application is deprecated.</b><br>Upload your own CEP rules created with Esper in a per-tenant deployment. You need to be subscribed to the application "Cep-small" to be able to use this feature.</td>
<td style="text-align:left">feature-cep-custom-rules</td>
<td style="text-align:left">Feature</td>
</tr>
<tr>
<td style="text-align:center"><a href="/guides/event-language" class="no-ajaxy">Cep-small</a></td>
<td style="text-align:left"><b>This application is deprecated.</b><br>CEP variant. Lets you work with CEP rules based on Esper in a per-tenant deployment (as opposed to "Cep" which uses a shared instance). You need to be subscribed to "CEP custom rules" to upload your own Esper CEP rules.</td>
<td style="text-align:left">cep-small</td>
<td style="text-align:left">Microservice</td>
</tr>
<tr>
<td style="text-align:center"><a href="/guides/users-guide/optional-services/#cloud-fieldbus" class="no-ajaxy">Cloud Fieldbus</a></td>
<td style="text-align:left">Collect data from fieldbus devices and remotely manage them in Cumulocity.</td>
<td style="text-align:left">feature-fieldbus4</td>
<td style="text-align:left">Feature</td>
</tr>
<tr>
<td style="text-align:center"><a href="/guides/users-guide/optional-services/#cloud-remote-access" class="no-ajaxy">Cloud Remote Access</a></td>
<td style="text-align:left">Implements Virtual Network Computing (VNC) to remotely access operating panels and other devices via a web browser.</td>
<td style="text-align:left">cloud-remote-access</td>
<td style="text-align:left">Microservice</td>
</tr>
<tr>
<td style="text-align:center"><a href="/guides/users-guide/optional-services/#connectivity" class="no-ajaxy">Connectivity</a></td>
<td style="text-align:left">Interface with mobile devices through various SIM providers like Jasper, Ericsson and Comarch.</td>
<td style="text-align:left">connectivity-agent-server</td>
<td style="text-align:left">Microservice</td>
</tr>
<tr>
<td style="text-align:center">Microservice hosting</td>
<td style="text-align:left">Host your own microservices on top of Cumulocity.</td>
<td style="text-align:left">feature-microservice-hosting</td>
<td style="text-align:left">Feature</td>
</tr>
<tr>
<td style="text-align:center"><a href="/guides/users-guide/optional-services#nokia-impact" class="no-ajaxy">Nokia IMPACT agent</a></td>
<td style="text-align:left">Interface with heterogeneous devices through the Nokia IMPACT Data Collector.</td>
<td style="text-align:left">impact</td>
<td style="text-align:left">Microservice</td>
</tr>
<tr>
<td style="text-align:center"><a href="/guides/users-guide/optional-services#sigfox" class="no-ajaxy">Sigfox</a></td>
<td style="text-align:left">Interface with Sigfox devices through the Sigfox cloud. Requires the following application: "feature-fieldbus4"</td>
<td style="text-align:left">sigfox-agent</td>
<td style="text-align:left">Microservice</td>
</tr>
<tr>
<td style="text-align:center"><a href="/guides/users-guide/optional-services/#tenant-sla-monitoring" class="no-ajaxy">Tenant SLA Monitoring</a></td>
<td style="text-align:left">Lets service providers monitor the availability and response time of tenants and sub-tenants.</td>
<td style="text-align:left">tenant-sla-monitoring</td>
<td style="text-align:left">Microservice</td>
</tr>

</tbody>
</table>

 
### <a name="own-applications"></a>Own applications

Own applications may be 

* duplicates of subscribed applications (in order to be able to customize them)
* web-based UI applications, either deployed as standalone applications or as plugins deployed into a specific application (e.g. a widget to the Cockpit dashboard)
* server-side business logic deployed through microservices

Your applications are available through the application switcher in the top bar which allows to easily switch between applications.

<img src="/guides/images/users-guide/Administration/admin-app-switcher.png" alt="App switcher">

You manage your applications under **Own applications**, accessible through the **Applications** menu. 

In the **Own applications** page you will find a list of the applications available in your account.

<img src="/guides/images/users-guide/Administration/admin-applications-own.png" alt="Own applications">

To display further information on the application, simply click its card. For details on the fields, refer to [Application properties](#application-properties). 

To directly open an application from here, click **Open** on the respective application card. 


#### <a name="adding-applications"></a>To add an own application

Click **Add application** in the **Own applications** page. 

<img src="/guides/images/users-guide/Administration/admin-application-add.png" alt="Add application methods">

In the resulting dialog box, choose one of the following methods:

* [Upload web application](#uploading-zip-files) - by dropping a ZIP file or browsing for it on your computer.
* [Upload microservice](#uploading-microservices) - by dropping a ZIP file or browsing for it on your computer
* [External application](#external-application) - by linking to an application running elsewhere 
* [Duplicate existing application](#clone-application) - by creating a copy of an existing application

##### <a name="uploading-zip-files"></a>To upload a web application

1. Click **Add application** in the **Own applications** page.
2. Select **Upload web application**.
3. In the resulting dialog box, drop a ZIP file or browse for it on your computer.

The application is created once the ZIP file has been successfully uploaded.

<img src="/guides/images/users-guide/Administration/admin-application-upload-web-app.png" alt="Uploading zip file">

##### <a name="uploading-microservices"></a>To upload a microservice

1. Click **Add application** in the **Own applications** page.
2. Select **Upload microservice**.
3. In the resulting dialog box, drop a ZIP file or browse for it in your file system. Note that the size limit of the file to be uploaded is 500 MB.

The microservice application is created once the ZIP file has been successfully uploaded.

>**Important**: The ZIP file must contain the application manifest and the Docker image of the microservice. Refer to [Packing](/guides/microservice-sdk/concept/#packing) in the Microservice SDK guide under **General aspects** in order to prepare and deploy the microservice package.


##### <a name="external-application"></a>To link to an external application

1. Click **Add application** in the **Own applications** page.
2. Select **External application**.
<br><br>
<img src="/guides/images/users-guide/Administration/admin-application-external.png" alt="External application">
<br><br>
3. In the resulting dialog box, enter the name of the application. The name will be shown as title of the application. 
5. Enter an application key, used to identify this application.
6. Enter the external URL where the application can be reached. 
7. Click **Save** to create the application.

For details on the fields, see also [Application properties](#application-properties) below. 

##### <a name="clone-application"></a>To duplicate an application

Duplicating an application might be useful if you want to customize a subscribed application according to your needs. Duplicating a subscribed application creates a copy of the application as an own application, with a link to the original application.

1. Click **Add application** in the **Own applications** page.
2. In the upcoming dialog, select **Duplicate existing application**.
3. Select the desired application from the dropdown list. 
<br><br>
<img src="/guides/images/users-guide/Administration/admin-application-duplicate.png" alt="Duplicate application">
<br><br>
4. In the next window, provide a name for the application. By default, the name of the original application is provided, extended by a number.
<br><br>
<img src="/guides/images/users-guide/Administration/admin-application-duplicate-2.png" alt="Duplicate application">
<br><br>
5. Provide an application key, used to identify this application. By default, the key of the original application is provided, extended by a number.
6. Provide the application path as part of the URL to invoke the application. By default, the path of the original application is provided, extended by a number. If you set it to the path of the original subscribed application, your own application will overrule the subscribed application. 
7. Finally, click **Duplicate** to create the application.

For details on the fields, see also [Application properties](#application-properties) below.

> **Info**: If you want your "own application" to overrule a subscribed standard application, the path of the "own application" needs to be set to the path of the original subscribed application.


#### <a name="editing-and-removing"></a>To edit an own application

Simply click the application or click the menu icon at the right of an entry and then click **Edit**. 

In the **Properties** tab, several fields can be modified, depending on the application type (see [Application properties](#application-properties)).

>**Important:** Never change the system application names (e.g. "Device Management", "Cockpit"). Otherwise, tenant initialization will fail. 


#### To remove an own application

Click the menu icon at the right of an entry and then click **Remove**. 

If you remove an application that overwrites a subscribed application, the currently subscribed application becomes available to all users. Additionally, the users will then also benefit from future upgrades of the subscribed application.

It is not possible to remove subscribed applications. This can only be done by the owner of the subscribed application.


#### Uploading archives

Multiple archive file versions can be stored in Cumulocity when they were created by uploading either a ZIP file or a MON file. Each version is called an archive. You can upload different versions at the same time and switch between these versions.

##### To upload an archive

1. Open the application by clicking on it.
2. Switch to the **Archives** tab.
3. Click **Upload archive** and browse for the archive on your computer or simply drop the archive file.
4. Click **Upload** to upload the archive to your Cumulocity account.

<img src="/guides/images/users-guide/Administration/admin-application-archive.png" alt="Application archive">

Once uploaded, the recently uploaded version is automatically the active version, i.e. the version of the application that is currently being served to the users of your account. This version cannot be deleted. 

> **Info**: The **Archive** tab is not available for subscribed applications, as only the owner of the application can perform this action.

##### To restore an older application version

Users can restore previous versions of an application from an archive.

1. Open the application by clicking on it.
2. Switch to the **Archives** tab.
3. Open the context menu for the desired version by clicking the menu icon and select **Set as active** to make it the active version.
4. Click **Remove** to remove the version from the archive.

<img src="/guides/images/users-guide/Administration/admin-application-set-as-archive.png" alt="Application set as archive">

### Monitoring microservices

You can monitor microservices hosted by Cumulocity in two ways.

#### Status information

The status of the microservice can be checked on the **Status** tab of the respective application. 

<img src="/guides/images/users-guide/Administration/admin-microservice-status.png" alt="Microservice status" style="max-width: 100%">

The following information is provided on the **Status** tab:

* Instances: Number of active, unhealthy and desired microservice instances for the current tenant
* Subscribed tenants: Number of active, unhealthy and desired microservice instances for all subtenants subscribed to the microservice
* Alarms: Alarms for given application, provided in realtime
* Events: Events for given application, provided in realtime

The status information is available for subscribed applications as well as for own applications. Information on subscribed subtenants is only visible for the application owner. 

To view the status you need the following permissions: ROLE&#95;APPLICATION&#95;MANAGEMENT&#95;READ and ROLE&#95;INVENTORY&#95;READ

##### Alarms and events

Most of the alarms and events visible in the **Status** tab are strictly technical descriptions of what's going on with the microservice.

There are two user-friendly alarm types:

* `c8y_Application_Down` - critical alarm which is created when no microservice instance is available 
* `c8y_Application_Unhealthy` - minor alarm which is created when there is at least one microservice instance working properly, but not all of them are fully operating

User-friendly alarms are created for the microservice owner tenant only. They are also automatically cleared when the situation gets back to normal, i.e. all the microservice instances are working properly.

User-friendly alarms can be used to create Smart Rules. For details on creating Smart Rules of various types, see [Smart Rules](/guides/users-guide/cockpit/#smart-rules). 

For example, to send an email, if a microservice is down, create an "On alarm send email" Smart Rule. 

In the **On alarm matching** section, use `c8y_Application_Down` as an alarm type. As a target asset select the microservice which you would like to monitor, for example "echo-agent-server".

#### Log files

Cumulocity offers viewing logs which provide more details on the status of microservices.

To view logs, open the **Logs** tab of the respective microservice. 

<img src="/guides/images/users-guide/Administration/admin-applications-logs.png" alt="Microservice log" style="max-width: 100%">

At the top of the page, you can select the instance of the microservice, for which you want to view the logs. 

> **Info**: If your microservice was re-scaled into two instances you should be able to switch between them, but it is not possible to see the logs from both instances at once.

Next to the instance dropdown you can select the time range for the log entries to be shown by selecting a date from the calendar and entering a time.

> **Info**: Your local time may differ from the log´s timestamp which is in UTC standard.

At the top right, additional functionality is provided:

* **Download** - To download the log data for a specified time range.
* **Dark theme** - To turn dark theme on or off.
* **Auto refresh** - To activate the auto refresh functionality. If activated, the displayed log data will automatically be refreshed every 10 seconds.
* **Unsubscribe** - To unsubscribe the microservice.
* **Delete** - To delete the microservice.

Initially, the **Logs** tab shows the latest logs of the microservice instance. 

At the bottom right you find navigation buttons:

* **First** - directly navigates to the oldest available log entries for the microservice after its restart (maximum capacity 350MB of logs).
* **Previous** - increases the time range in 10 minutes steps.
* **Next** - reduces the time range in 10 minutes steps.
* **Last** - directly navigates to the latest available log entries.
  
If no logs are available in the selected time range, a message is shown accordingly:

<img src="/guides/images/users-guide/Administration/admin-microservice-no-logs.png" alt="Microservice log">

> **Info**: There is no possibility to see the logs from the previously running instances, however inside the instance there is a docker container running and if only this one was restarted (not the whole instance) you should see the logs from the currently running and also lately terminated docker container.

>Logs are always loaded from the docker container using both `stdout` and `stderr` sources and there is no possibility to distinguish/filter by the source. 


### <a name="default-applications"></a>Default applications

To define default applications for subtenants, a tenant policy with the following options can be created and used when creating new tenants:

* category: configuration
* key: default.tenant.applications
* value: comma-separated list of applications names, e.g. administration,devicemanagement,cockpit,feature-microservice-hosting,feature-cep-custom-rules