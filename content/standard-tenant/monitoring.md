---
weight: 40
title: Monitoring
layout: bundle
outputs:
  - html
  - json
sector:
  - platform_administration
helpcontent:
  - label: monitoring
    title: Monitoring
    content: "Audit logs show the operations that users have carried out.


      In order to easily search through logs, specify filter criteria in the top bar for type, date range or user and apply them."
---

**Audit logs** show security-relevant operations a user has processed. For example, an audit log is generated when a user logs into a gateway.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

- To view audit logs: READ permission for permission type "Audit"
- To create audit logs you need Admin permission for the permission type "Audit". Note however, that you cannot create audit logs from the UI. For details on how to create audit logs via REST refer to [Audits](https://{{< domain-c8y >}}/api/core/#tag/Audits) in the {{< openapi >}}.
{{< /c8y-admon-req >}}


{{< c8y-admon-related >}}
- [Getting started > Technical concepts > Security aspects > Management security](/concepts/security/#management-security) for general aspects of audit logging.
- [Audits](https://{{< domain-c8y >}}/api/core/#tag/Audits) in the {{< openapi >}} for details on managing audit records via REST.
{{< /c8y-admon-related >}}

### To view audit logs {#to-view-audit-logs}

To view the audit log list, click **Audit logs** in the **Accounts** menu. For each log entry, the following information is provided:

<table>
<colgroup>
<col style="width: 15%;">
<col style="width: 85%;">
</colgroup>
<thead>
<tr>
<th align="left">Column</th>
<th align="left">Description</th>
</tr>
</thead>

<tbody>
<tr>
<td align="left">Server time</td>
<td align="left">Server time when the operation was processed.</td>
</tr>

<tr>
<td align="left">Event</td>
<td align="left">Type of operation, for example "Alarm created", "Smart rule deleted". Below it, the user who processed it is displayed.</td>
</tr>

<tr>
<td align="left">Description</td>
<td align="left">Provides further information depending on the operation, for example, the device name, alarm text, operation status.</td>
</tr>

<tr>
<td align="left">Device time</td>
<td align="left">Device time when the operation was processed. This can differ from the server time.</td>
</tr>
</tbody>
</table>

Only the last 100 logs are visible. Scroll down the page to **Load more** to view more log entries.

![Audit logs](/images/users-guide/Administration/admin-audit-logs.png)

{{< c8y-admon-info >}}
The audit log list is not automatically refreshed after a realtime update for operations. Click **Reload** at the right of the top menu bar to update the list to the latest operations.
{{< /c8y-admon-info >}}

### To filter logs {#to-filter-logs}

In order to easily search through logs, you can filter logs by:

 - Type (alarm, operation, smart rule, and so on)
 - Device time (provide a date range in "From" and/or "To" inputs)
 - User

To apply a filter, click the **Apply** button next to the respective filter field. To discard filters, click the clear icon <i class="dlt-c8y-icon-clear text-primary icon-20"></i> next to the **Apply** button (only visible if filters are set).

### Audit log types {#audit-log-types}

<table>
<colgroup>
<col style="width: 25%;">
<col style="width: 75%;">
</colgroup>

<thead>
<tr>
<th align="left">Audit type</th>
<th align="left">Actions</th>
</tr>
</thead>

<tbody>

<tr>
<td align="left">Alarm</td>
<td align="left"><ul>
<li>Alarm created</li>
<li>Alarm updated</li>
</ul></td>
</tr>

<tr>
<td align="left">Application</td>
<td align="left"><ul>
<li>Application activated</li>
<li>Application subscribed</li>
<li>Application unsubscribed</li>
<li>Application deployed</li>
<li>Application deployment failure</li>
<li>Application undeployed</li>
<li>Application rescaled</li>
<li>Application deleted</li>
</ul>
This type of audit logs may be created for both hosted applications and microservices.
</td>
</tr>

<tr>
<td align="left">Bulk operation</td>
<td align="left"><ul>
<li>Bulk operation created</li>
<li>Bulk operation updated</li>
<li>Bulk operation deleted</li>
</ul></td>
</tr>

<tr>
<td align="left">Data broker connector</td>
<td align="left"><ul>
<li>Connector created</li>
<li>Connector updated</li>
<li>Connector deleted</li>
</ul></td>
</tr>

<tr>
<td align="left">Devices availability monitoring</td>
<td align="left"><ul>
<li>Device availability enabled</li>
<li>Device availability disabled</li>
<li>Device availability interval updated</li>
<li>Device put into maintenance state</li>
</ul></td>
</tr>

<tr>
<td align="left">Global role</td>
<td align="left"><ul>
<li>Global role updated</li>
<li>Global role authorities updated</li>
<li>Global role device permissions updated</li>
</ul></td>
</tr>

<tr>
<td align="left">Inventory</td>
<td align="left"><ul>
<li>Managed object deleted</li>
<li>Device registration failed due to missing token</li>
<li>Device registration failed due to invalid token</li>
<li>Device registration max number of failed attempts reached</li>
</ul></td>
</tr>

<tr>
<td align="left">Inventory role</td>
<td align="left"><ul>
<li>Inventory role created</li>
<li>Inventory role updated</li>
<li>Inventory role deleted</li>
</ul></td>
</tr>

<tr>
<td align="left">Operation</td>
<td align="left"><ul>
<li>Operation created</li>
<li>Operation updated</li>
</ul></td>
</tr>

<tr>
<td align="left">Option</td>
<td align="left"><ul>
<li>Option created</li>
<li>Option updated</li>
<li>Option deleted</li>
</ul></td>
</tr>

<tr>
<td align="left">Reliable notification</td>
<td align="left"><ul>
<li>Reliable notification token created</li>
<li>Reliable notification subscription created</li>
<li>Reliable notification subscription deleted</li>
</ul></td>
</tr>

<tr>
<td align="left">Report</td>
<td align="left"><ul>
<li>Test tenant statistics accessed</li>
<li>Real tenant statistics accessed</li>
</ul></td>
</tr>

<tr>
<td align="left">Single sign-on</td>
<td align="left"><ul>
<li>SSO login</li>
<li>SSO logout</li>
<li>SSO logout failed</li>
</ul></td>
</tr>

<tr>
<td align="left">Smart rule</td>
<td align="left"><ul>
<li>Smart rule created</li>
<li>Smart rule updated</li>
<li>Smart rule enabled</li>
<li>Smart rule disabled</li>
<li>Smart rule deleted</li>
</ul></td>
</tr>

<tr>
<td align="left">Tenant</td>
<td align="left"><ul>
<li>Tenant created</li>
<li>Tenant updated</li>
<li>Tenant suspended</li>
<li>Tenant activated</li>
<li>Tenant deleted</li>
</ul></td>
</tr>

<tr>
<td align="left">Tenant auth configuration</td>
<td align="left"><ul>
<li>Authentication configuration added</li>
<li>Authentication configuration updated</li>
<li>Authentication configuration deleted</li>
</ul></td>
</tr>

<tr>
<td align="left">Trusted certificate</td>
<td align="left"><ul>
<li>Trusted certificate uploaded</li>
<li>Trusted certificate updated</li>
<li>Trusted certificate deleted</li>
</ul></td>
</tr>

<tr>
<td align="left">User</td>
<td align="left"><ul>
<li>User created</li>
<li>User updated</li>
<li>User username updated</li>
<li>User password updated</li>
<li>User roles updated</li>
<li>User groups updated</li>
<li>User delegation updated</li>
<li>User owner updated</li>
<li>User inventory assignment updated</li>
<li>User device permissions updated</li>
<li>User deleted</li>
</ul></td>
</tr>

<tr>
<td align="left">User login</td>
<td align="left"><ul>
<li>User login</li>
<li>User logout</li>
</ul>
Note that entries of this type are not created when using Basic authentication.
</td>
</tr>

</tbody>
</table>

{{< c8y-admon-info >}}
See also [Audit logs for Streaming Analytics](/streaming-analytics/troubleshooting/#analytics-audit-logs).
{{< /c8y-admon-info >}}
