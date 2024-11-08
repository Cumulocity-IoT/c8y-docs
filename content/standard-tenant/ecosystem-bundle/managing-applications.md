---
weight: 10
title: Managing applications
layout: bundle
sector:
  - platform_administration
helpcontent:
  - label: managing-applications
    title: Applications
    content: "In the **Applications** tab, you can see all applications available in your tenant. There are two kinds of applications:


    **Subscribed applications** - Applications subscribed to the tenant, either provided by the platform or a service provider. Cumulocity IoT provides a variety of applications for different purposes. Find a list of all applications in the user documentation.

    **Custom applications** - Applications owned by the tenant. You can add custom applications in various ways as own applications.


    Custom applications may be:


    Web applications uploaded to the platform.

    Links to external applications running elsewhere.

    Packages deployed to the platform.

    Duplicates of subscribed applications.


    Click on an application to view the application details. To add an application, click **Add application** and follow the instructions in the wizard, see also the user documentation."
  - label: features
    title: Features
    content: "On the **Features** tab, you will find a list of all features subscribed to your tenant. Features are applications which are built-in and not represented by an explicit artifact (like microservices or web applications)."
---

There are two types of availability for applications:

- [Subscribed](#subscribed-applications) - applications subscribed to the tenant, either provided by the platform (as default applications) or by a service provider.
- [Custom](#custom-applications) - applications owned by the tenant. You can [add custom applications](#custom-applications) in various ways as own applications.

Your applications are available through the application switcher in the top bar.

<img src="/images/users-guide/Administration/admin-app-switcher.png" alt="App switcher">

### To view applications {#to-view-applications}

Click **Applications** in the **Ecosystem** menu in the navigator to display a list or grid of all applications in your account.

<img src="/images/users-guide/Administration/admin-all-applications.png" alt="All applications" style="max-width: 100%">

In the **Applications** tab, you can see all applications available in your tenant.

Applications can be filtered by name or by availability.


### To edit an application {#to-edit-an-application}

Click the application or click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the right of an entry and then click **Edit**.

In the **Properties** tab, several fields can be modified, depending on the application type (see [Application properties](#application-properties)).

{{< c8y-admon-important >}}
Never change the system application names (such as "Device Management", "Cockpit"). Otherwise, tenant initialization will fail.
{{< /c8y-admon-important >}}

### To delete an application {#to-delete-an-application}

Click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the right of an entry and then click **Delete**. You can also delete an application directly from the **Properties** tab in the application details.

If you delete an application that overwrites a subscribed application, the currently subscribed application becomes available to all users. Additionally, the users will then also benefit from future upgrades of the subscribed application.

It is not possible to delete subscribed applications. This can only be done by the owner of the subscribed application.


### Features {#features}

Features are applications which are built-in and not represented by an explicit artifact (like microservices or web applications).

In the **Features** tab, you will find a list of all features subscribed in your tenant. In an {{< enterprise-tenant >}}, the following features are available by default:

<table>
<col width="200">
<col width="350">
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
<td style="text-align:left"><a href="/enterprise-tenant/customization/#branding" class="no-ajaxy">Feature-branding</a></td>
<td style="text-align:left">Customize the look of your tenants to your own preferences</td>
<td style="text-align:left">feature-branding</td>
<td style="text-align:left">{{< enterprise-tenant >}}</td>

</tr>
<tr>
<td style="text-align:left"><a href="/data-broker/" class="no-ajaxy">Feature-broker</a></td>
<td style="text-align:left">Share data selectively with other tenants</td>
<td style="text-align:left">feature-broker</td>
<td style="text-align:left">{{< enterprise-tenant >}}</td>
</tr>

<tr>
<td style="text-align:left"><a href="/enterprise-tenant/managing-user-hierarchies/" class="no-ajaxy">Feature-user-hierarchy</a></td>
<td style="text-align:left">Reflect independent organizational entities in {{< product-c8y-iot >}} that share the same database</td>
<td style="text-align:left">feature-user-hierarchy</td>
<td style="text-align:left">{{< enterprise-tenant >}}</td>
</tr>
</tbody>
</table>

{{< c8y-admon-info >}}
All applications listed here are of the type "Feature".
{{< /c8y-admon-info >}}

Other features may show up, depending on the individual subscriptions of your tenant.
