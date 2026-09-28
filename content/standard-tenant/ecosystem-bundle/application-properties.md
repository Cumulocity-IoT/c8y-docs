---
title: Application properties
layout: bundle
weight: 40
sector:
  - platform_administration
---

To display further details on an application, click it to open its **Properties** tab.

<img src="/images/users-guide/Administration/admin-application-properties.png" alt="Application properties" style="max-width: 100%">

In the **Properties** tab, each application will show the following information, depending on the application type (hosted or external):

<table>
<col width="150">
<col width="350">
<col width="200">
<col width="300">
<thead>
<tr>
<th style="text-align:left">Field</th>
<th style="text-align:left">Description</th>
<th style="text-align:left">Hosted (web application)</th>
<th style="text-align:left">External</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">ID</td>
<td style="text-align:left">Unique ID to identify the application</td>
<td style="text-align:left">Automatically provided</td>
<td style="text-align:left">Automatically provided</td>
</tr>
<tr>
<td style="text-align:left">Name</td>
<td style="text-align:left">Application name; will be shown as title of the application in the top bar and in the application switcher</td>
<td style="text-align:left">Automatically created</td>
<td style="text-align:left">Specified by the user</td>
</tr>
<tr>
<td style="text-align:left">Application key</td>
<td style="text-align:left">Used to identify the application and to make it available for <a href="/enterprise-tenant/managing-tenants/#subscribing-applications" class="no-ajaxy">subscription</a></td>
<td style="text-align:left">Automatically created</td>
<td style="text-align:left">Specified by the user</td>
</tr>
<tr>
<td style="text-align:left">Type</td>
<td style="text-align:left">Application type</td>
<td style="text-align:left">Hosted</td>
<td style="text-align:left">External</td>
</tr>
<tr>
<td style="text-align:left">Path</td>
<td style="text-align:left">Part of the URL invoking the application</td>
<td style="text-align:left">Automatically created</td>
<td style="text-align:left">Specified by the user; for example, if you use "hello" as application path, the URL of the application will be "/apps/hello"</td>
</tr>
<tr>
<td style="text-align:left">Select icon</td>
<td style="text-align:left">Provides a variety of icons from which an icon for the application can be selected.</td>
<td style="text-align:left">Automatically created</td>
<td style="text-align:left">Specified by the user</td>
</tr>
</tbody>
</table>

{{< c8y-admon-info >}}
The icon selector is only available for custom application.
{{< /c8y-admon-info >}}
