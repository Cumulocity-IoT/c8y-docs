---
weight: 10
title: Application
layout: redirect
sector:
  - platform_administration
---

Click **Application** in the **Settings** menu to change applications settings.

![Application settings](/images/users-guide/Administration/admin-settings-application.png)

### To change application settings {#to-change-application-settings}

Under **Default application**, you can select a default application from the list which will apply to all users within the tenant. Whenever the platform is accessed, for example, by domain name only, without mentioning a specific application, the application selected as default application is used as default landing page.

{{< c8y-admon-info >}}
All users must have access to this application.
{{< /c8y-admon-info >}}

Under **Access control**, administrators can enable cross-origin resource sharing or "CORS" on the {{< product-c8y-iot >}} API.

The **Allowed Domain** setting will enable your JavaScript web applications to directly communicate with REST APIs.

* Set it to "*" to allow communication from any host.
* Set it to `http://my.host.com`, `http://myother.host.com` to allow applications from `http://my.host.com` and from `http://myother.host.com` to communicate with the platform.

For further information, see [http://enable-cors.org](http://enable-cors.org).

{{< c8y-admon-related >}}
- [Platform administration > {{< standard-tenant >}} administration > Managing applications](/standard-tenant/ecosystem/#managing-applications) for general information on managing applications.
- [Platform administration > {{< standard-tenant >}} administration > Managing users](/standard-tenant/managing-users/) for general information on managing users.
{{< /c8y-admon-related >}}
