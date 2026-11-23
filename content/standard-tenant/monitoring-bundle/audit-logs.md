---
weight: 10
title: Audit logs
layout: bundle
outputs:
  - html
  - json
  - markdown
sector:
  - platform_administration
helpcontent:
  - label: audit-logs
    title: Audit logs
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

Each audit log has a type. The **Type value** column shows the value that the platform stores in the `type` field of the audit log. Use this value, not the name in the **Audit type** column, in the following places:

- The **Type** field of a retention rule for audit logs. For details, see [Retention rules](/standard-tenant/managing-data/#retention-rules).
- The `type` query parameter when you retrieve audit logs. For details, see [Audits](https://{{< domain-c8y >}}/api/core/#tag/Audits) in the {{< openapi >}}.

The value must match exactly, including uppercase and lowercase letters. For example, a retention rule with the type "Smart rule" removes no audit logs. Use `SmartRule` instead.

<table>
<colgroup>
<col style="width: 20%;">
<col style="width: 25%;">
<col style="width: 55%;">
</colgroup>

<thead>
<tr>
<th align="left">Audit type</th>
<th align="left">Type value</th>
<th align="left">Actions</th>
</tr>
</thead>

<tbody>

<tr>
<td align="left">Alarm</td>
<td align="left"><code>Alarm</code></td>
<td align="left"><ul>
<li>Alarm created</li>
<li>Alarm updated</li>
</ul></td>
</tr>

<tr>
<td align="left">Application</td>
<td align="left"><code>Application</code></td>
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
<td align="left"><code>BulkOperation</code></td>
<td align="left"><ul>
<li>Bulk operation created</li>
<li>Bulk operation updated</li>
<li>Bulk operation deleted</li>
</ul></td>
</tr>

<tr>
<td align="left">Data broker connector</td>
<td align="left"><code>Connector</code></td>
<td align="left"><ul>
<li>Connector created</li>
<li>Connector updated</li>
<li>Connector deleted</li>
</ul></td>
</tr>

<tr>
<td align="left">Devices availability monitoring</td>
<td align="left"><code>DevicesAvailabilityMonitoring</code></td>
<td align="left"><ul>
<li>Device availability enabled</li>
<li>Device availability disabled</li>
<li>Device availability interval updated</li>
<li>Device put into maintenance state</li>
</ul></td>
</tr>

<tr>
<td align="left">Email</td>
<td align="left"><code>Email</code></td>
<td align="left"><ul>
<li>Email sent</li>
</ul></td>
</tr>

<tr>
<td align="left">Global role</td>
<td align="left"><code>Group</code></td>
<td align="left"><ul>
<li>Global role updated</li>
<li>Global role authorities updated</li>
<li>Global role device permissions updated</li>
</ul></td>
</tr>

<tr>
<td align="left">Inventory</td>
<td align="left"><code>Inventory</code></td>
<td align="left"><ul>
<li>Managed object deleted</li>
<li>Device registration failed due to missing token</li>
<li>Device registration failed due to invalid token</li>
<li>Device registration max number of failed attempts reached</li>
</ul></td>
</tr>

<tr>
<td align="left">Inventory role</td>
<td align="left"><code>InventoryRole</code></td>
<td align="left"><ul>
<li>Inventory role created</li>
<li>Inventory role updated</li>
<li>Inventory role deleted</li>
</ul></td>
</tr>

<tr>
<td align="left">MQTT Service</td>
<td align="left"><code>MqttService</code></td>
<td align="left"><ul>
<li>Basic authentication attempt</li>
<li>Certificate authentication attempt</li>
<li>Device ownership check failed</li>
</ul>
The MQTT Service logs authentication attempts only if the platform operator turns on connection auditing for the tenant.
</td>
</tr>

<tr>
<td align="left">Operation</td>
<td align="left"><code>Operation</code></td>
<td align="left"><ul>
<li>Operation created</li>
<li>Operation updated</li>
</ul></td>
</tr>

<tr>
<td align="left">Option</td>
<td align="left"><code>Option</code></td>
<td align="left"><ul>
<li>Option created</li>
<li>Option updated</li>
<li>Option deleted</li>
</ul></td>
</tr>

<tr>
<td align="left">Reliable notification</td>
<td align="left"><code>Notification2</code></td>
<td align="left"><ul>
<li>Reliable notification token created</li>
<li>Reliable notification subscription created</li>
<li>Reliable notification subscription deleted</li>
</ul></td>
</tr>

<tr>
<td align="left">Report</td>
<td align="left"><code>Report</code></td>
<td align="left"><ul>
<li>Test tenant statistics accessed</li>
<li>Real tenant statistics accessed</li>
</ul></td>
</tr>

<tr>
<td align="left">Single sign-on</td>
<td align="left"><code>SingleSignOn</code></td>
<td align="left"><ul>
<li>SSO login</li>
<li>SSO logout</li>
<li>SSO logout failed</li>
</ul></td>
</tr>

<tr>
<td align="left">Smart rule</td>
<td align="left"><code>SmartRule</code></td>
<td align="left"><ul>
<li>Smart rule created</li>
<li>Smart rule updated</li>
<li>Smart rule enabled</li>
<li>Smart rule disabled</li>
<li>Smart rule deleted</li>
</ul></td>
</tr>

<tr>
<td align="left">System</td>
<td align="left"><code>SYSTEM</code></td>
<td align="left"><ul>
<li>Availability monitoring record</li>
</ul>
The platform creates these audit logs when the severity of an alarm changes. It uses them for the availability statistics of devices.
</td>
</tr>

<tr>
<td align="left">Tenant</td>
<td align="left"><code>Tenant</code></td>
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
<td align="left"><code>TenantAuthConfig</code></td>
<td align="left"><ul>
<li>Authentication configuration added</li>
<li>Authentication configuration updated</li>
<li>Authentication configuration deleted</li>
</ul></td>
</tr>

<tr>
<td align="left">Trusted certificate</td>
<td align="left"><code>TrustedCertificates</code></td>
<td align="left"><ul>
<li>Trusted certificate uploaded</li>
<li>Trusted certificate updated</li>
<li>Trusted certificate deleted</li>
</ul></td>
</tr>

<tr>
<td align="left">Tenant Certificate Authority</td>
<td align="left"><code>TenantCertificateAuthority</code></td>
<td align="left"><ul>
<li>Tenant certificate authority(CA) created</li>
<li>Tenant certificate authority(CA) renewed</li>
<li>Tenant certificate authority(CA) renewal failed</li>
<li>Tenant certificate authority(CA) signed certificate</li>
<li>Tenant certificate authority(CA) re-signed certificate</li>
</ul></td>
</tr>

<tr>
<td align="left">User</td>
<td align="left"><code>User</code></td>
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
<li>User device provisioned certificate created</li>
<li>User device provisioned certificate deleted</li>
</ul></td>
</tr>

<tr>
<td align="left">User login</td>
<td align="left"><code>UserAuthentication</code></td>
<td align="left"><ul>
<li>User login</li>
<li>User logout</li>
<li>Certificate token generation</li>
</ul>
Note that entries of this type are not created when using Basic authentication.
Failed logins and single sign-on logins also create "User login" audit logs of this type.
</td>
</tr>

</tbody>
</table>

{{< c8y-admon-info >}}
Microservices and other clients can create audit logs with their own types through the REST API. The table above does not list these types. See also [Audit logs for Streaming Analytics](/streaming-analytics/troubleshooting/#analytics-audit-logs) and [Audit logs for {{< product-c8y-iot >}} DataHub](/datahub/operating-datahub/#system-log).
{{< /c8y-admon-info >}}
