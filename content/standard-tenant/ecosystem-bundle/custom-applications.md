---
weight: 30
title: Custom applications
layout: bundle
sector:
  - platform_administration
---

**Custom applications** may be:

* Web-based UI applications, either deployed as standalone applications or as plugins deployed into a specific application (for example, a widget to the Cockpit dashboard).
* Links to an application running elsewhere.
* Duplicates of subscribed applications (in order to be able to customize them).

{{< c8y-admon-info >}}
In the **Applications** tab, custom applications are labeled as "Custom".
{{< /c8y-admon-info >}}

Click **Add application** at the top right of the **Applications** tab to add a custom application.

In the resulting dialog box, select one of the following methods:

* [Upload web application](#to-upload-a-web-application) - drop a ZIP file or browse for it in your file system.
* [External application](#to-link-to-an-external-application) - link to an application running elsewhere.
* [Install from available packages](#to-install-an-application-from-a-blueprint) - select a package blueprint.
* [Duplicate existing application](#to-duplicate-an-application) - create a copy of an existing application.



### To upload a web application {#to-upload-a-web-application}

1. Click **Add application** at the top right of the **Applications** tab.
2. Select **Upload web application**.
3. In the resulting dialog box, drop a ZIP file or browse for it in your file system.

The application is created once the ZIP file has been successfully uploaded.

{{< c8y-admon-important >}}
The ZIP file must contain the *index.html* and *cumulocity.json* in its root directory, otherwise the application will not work.
{{< /c8y-admon-important >}}


### To link to an external application {#to-link-to-an-external-application}

1. Click **Add application** at the top right of the **Applications** tab.
2. Select **External application**.
3. In the resulting dialog box, enter the name of the application. The name will be shown as title of the application.
5. Enter an application key, used to identify this application.
6. Enter the external URL where the application can be reached.
7. Click **Save** to create the application.

For details on the fields, see also [Application properties](/standard-tenant/ecosystem/#application-properties) below.


### To install an application from a blueprint {#to-install-an-application-from-a-blueprint}

1. Click **Add application** at the top right of the **Applications** tab.
2. Select **Install from available packages**.
3. Select the desired package.
4. In the resulting dialog box, enter the name of the application. The name will be shown as title of the application.
5. Enter an application key, used to identify this application.
6. Enter the path where the application can be reached.
7. Click **Save** to create the application.

For details on the fields, see also [Application properties](/standard-tenant/ecosystem/#application-properties) below.


### To duplicate an application {#to-duplicate-an-application}

Duplicating an application might be useful if you want to customize a subscribed application according to your needs. Duplicating a subscribed application creates a copy of the application as an own application, with a link to the original application.

1. Click **Add application** at the top right of the **Applications** tab.
2. In the upcoming dialog, select **Duplicate existing application**.
3. Select the desired application from the dropdown list, for example "Cockpit".
4. In the next window, provide a name for the application, an application key to identify the application, and a path as part of the URL to invoke the application.  Finally select an icon for the new application from the available icons. Per default, the values of the original application are provided, extended by a number. If you set the path to the path of the original subscribed application, your own application will overrule the subscribed application.
    {{< c8y-admon-info >}}
The platform restricts the use of the prefix "feature-" in the **Name** field. You cannot create applications using this prefix in the application name. This also applies to existing applications in cases where the duplicate application feature is used.
    {{< /c8y-admon-info >}}
5. Finally, click **Duplicate** to create the application.

{{< c8y-admon-info >}}
In case the application has been subscribed to the tenant, there is an additional toggle **Overrule subscribed application**. If you turn this toggle on, the values for name, key and path will be inherited from the original application and your duplicated application will overrule the subscribed application. Turn it off, to modify the values.<br><br><img src="/images/users-guide/Administration/admin-application-duplicate-3.png" alt="Duplicate application">
{{< /c8y-admon-info >}}

For details on the fields, see also [Application properties](/standard-tenant/ecosystem/#application-properties) below.
