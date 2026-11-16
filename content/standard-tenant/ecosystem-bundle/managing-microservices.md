---
weight: 70
title: Managing microservices
layout: bundle
sector:
  - platform_administration
helpcontent:
  - label: managing-microservices
    title: Microservices
    content: "A microservice is a specific type of application, that is a server-side application used to develop further functionality on top of Cumulocity.


    As web applications, microservices can either be subscribed to your tenant by the platform or by a service provider, or they can be owned by you as custom applications.


    Click on a microservice to view the application properties. To add a microservice, click **Add microservice** and follow the instructions in the wizard or in the user documentation."
---

Click **Microservices** in the **Ecosystem** menu in the navigator to display a list or grid of all  microservices subscribed to your account.

<img src="/images/users-guide/Administration/admin-microservices.png" alt="Microservices list">

Microservices can be filtered by name and availability.

A microservice is a specific type of application, that is a server-side application used to develop further functionality on top of {{< product-c8y-iot >}}. As web applications, microservices can either be subscribed to your tenant by the platform or by a service provider, or they can be owned by you as custom applications, see [Custom microservices](#custom-microservices).

### Subscribed microservices {#subscribed-microservices}

{{< product-c8y-iot >}} provides a variety of microservice applications for different purposes. Depending on your installation and/or optional services your tenant will show a selection of the potentially available applications.

Below you find a list of all microservices which are by default subscribed in a {{< standard-tenant >}} and/or {{< enterprise-tenant >}}. In addition, numerous optional microservices might be subscribed to your tenant.

#### Microservices subscribed by default {#microservices-subscribed-by-default}

<table>
<col width="200">
<col width="400">
<col width="200">
<col width="200">
<thead>
<tr>
<th style="text-align:left">Name in the UI</th>
<th style="text-align:left">Functionality</th>
<th style="text-align:left">Identification in the API</th>
<th style="text-align:left">Availability</th>
</tr>
</thead>
<tbody>

<tr>
<td style="text-align:left"><a href="/streaming-analytics/introduction-analytics/#microservice-and-applications" class="no-ajaxy">Apama-ctrl-*</a></td>
<td style="text-align:left">Streaming Analytics microservices, including runtime for Analytics Builder, EPL apps and smart rules. Capabilities and resources vary depending on the microservice variant used</td>
<td style="text-align:left">apama-ctrl-*</td>
<td style="text-align:left">{{< standard-tenant >}}, {{< enterprise-tenant >}}</td>
</tr>

<tr>
<td style="text-align:left"><a href="/device-management-application/working-with-simulators/" class="no-ajaxy">Device-simulator</a></td>
<td style="text-align:left">Simulate all aspects of IoT devices</td>
<td style="text-align:left">device-simulator</td>
<td style="text-align:left">{{< standard-tenant >}}, {{< enterprise-tenant >}}</td>
</tr>

<tr>
<td style="text-align:left"><a href="/cockpit/working-with-reports/" class="no-ajaxy">Report agent</a></td>
<td style="text-align:left">Schedule data exports from within the Cockpit application</td>
<td style="text-align:left">report agent</td>
<td style="text-align:left">{{< standard-tenant >}}, {{< enterprise-tenant >}}</td>
</tr>

<tr>
<td style="text-align:left"><a href="/cockpit/smart-rules" class="no-ajaxy">Smartrule</a></td>
<td style="text-align:left">Use the smart rules engine and create smart rules to perform actions based on realtime data. Requires a variant of the Apama-ctrl microservice</td>
<td style="text-align:left">smartrule</td>
<td style="text-align:left">{{< standard-tenant >}}, {{< enterprise-tenant >}}</td>
</tr>

<tr>
<td style="text-align:left"><a href="/enterprise-tenant/customization" class="no-ajaxy">Sslmanagement</a></td>
<td style="text-align:left">Activate your own custom domain name by using an SSL certificate</td>
<td style="text-align:left">sslmanagement</td>
<td style="text-align:left">{{< enterprise-tenant >}}</td>
</tr>

</tbody>
</table>

{{< c8y-admon-info >}}
All applications listed here are of the type "Microservice".
{{< /c8y-admon-info >}}


### Custom microservices {#custom-microservices}

#### To add a microservice as custom application {#to-add-a-microservice-as-custom-application}

1. Click **Add microservice** at the top right.
2. In the resulting dialog box, drop a ZIP file or browse for it in your file system. Note that the size limit of the file to be uploaded is 500 MB.
3. The microservice application is created once the ZIP file has been successfully uploaded.

{{< c8y-admon-important >}}
The ZIP file must contain the application manifest and the Docker image of the microservice. Refer to [General aspects](/microservice-sdk/general-aspects) for information on preparing and deploying the microservice package. You can provide the name of the microservice in its manifest file. If no name is provided in the file, the platform will derive it from the ZIP file name by removing the recognized version suffix. In any case the length of the resulting name must not exceed 23 characters.
{{< /c8y-admon-important >}}


### Microservice properties {#microservice-properties}

To display further details on a microservice, click it to open its **Properties** tab.

<img src="/images/users-guide/Administration/admin-microservice-properties.png" alt="Microservice properties" style="max-width: 100%">

In the **Properties** tab, each microservice will show the following information:

<table>
<col width="250">
<col width="450">
<col width="300">
<thead>
<tr>
<th style="text-align:left">Field</th>
<th style="text-align:left">Description</th>
<th style="text-align:left">Comment</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">ID</td>
<td style="text-align:left">Unique ID to identify the microservice</td>
<td style="text-align:left">Automatically provided</td>
</tr>
<tr>
<td style="text-align:left">Name</td>
<td style="text-align:left">Application name; will be shown as title of the microservice application in the top bar</td>
<td style="text-align:left">Automatically inferred from the ZIP file name (recognized version number is dropped), unless provided in the microservice's manifest file</td>
</tr>
<tr>
<td style="text-align:left">Application key</td>
<td style="text-align:left">Used to identify the microservice application and to make it available for <a href="/enterprise-tenant/managing-tenants/#subscribing-applications" class="no-ajaxy">subscription</a></td>
<td style="text-align:left">Automatically created, based on the ZIP file name</td>
</tr>
<tr>
<td style="text-align:left">Type</td>
<td style="text-align:left">Application type</td>
<td style="text-align:left">Microservice</td>
</tr>
<tr>
<td style="text-align:left">Path</td>
<td style="text-align:left">Part of the URL invoking the application</td>
<td style="text-align:left">Automatically created as /service/&lt;microservice-name&gt;</td>
</tr>
</tbody>
</table>

Below, you will additionally find information on the microservice version, as well as on its isolation level and billing mode, see [Microservice usage](/enterprise-tenant/usage-and-billing/#microservice-usage) for details on these parameters.

#### Microservice subscription {#microservice-subscription}

At the top right of the **Properties** tab, you find a toggle to subscribe to or unsubcribe from a microservice.

Changing the subscription is only possible for custom microservices, that is microservices being owned by you.

### Microservice permissions {#microservice-permissions}

In the **Permissions** tab you can view the permissions required for the respective microservice, and the roles provided for it.
