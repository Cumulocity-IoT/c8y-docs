---
weight: 70
title: Usage statistics and billing
layout: bundle
outputs:
  - html
  - json
sector:
  - platform_administration
helpcontent:
  - label: usage-and-billing
    title: Usage statistics
    content: "The **Usage statistics** page provides statistical information on each subtenant such as the number of API requests, the number of devices connected to the subtenant, the amount of data stored in the account, or the number applications subscribed to the tenant. For details, see the user documentation.


    You can filter the usage statistics list for a time period by adding the start and end date in the top menu bar and click **Filter**. The **Usage statistics** page will show the numbers for all subtenants for this time period. You can also filter and sort the list on any column by clicking the filter icon next to the column name and providing the filtering criteria."

---


### To view usage statistics {#to-view-usage-statistics}

{{< c8y-admon-req >}}
APPLICATION ACCESS:

The user must have access to the Administration application of a {{< management-tenant >}} or an {{< enterprise-tenant >}}.

ROLES & PERMISSIONS:

* To view tenants usage statistics: READ permission for the permission type "Tenant management".

{{< /c8y-admon-req >}}

The **Usage statistics** page provides statistical information on each subtenant.

![Subtenant statistics](/images/users-guide/enterprise-tenant/et-subtenants-usage-statistics.png)

The following information is provided for each subtenant (not completely visible in the screenshot above due to space restrictions):

<table>
  <thead>
    <colgroup>
      <col style="width: 20%;">
      <col style="width: 80%;">
    </colgroup>
    <tr>
      <th align="left">Field</th>
      <th align="left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="left">ID</td>
      <td align="left">ID of the subtenant</td>
    </tr>
    <tr>
      <td align="left">Tenant</td>
      <td align="left">Name of the subtenant</td>
    </tr>
    <tr>
      <td align="left">API requests</td>
      <td align="left">Total number of API requests, including requests from  devices and applications</td>
    </tr>
    <tr>
      <td align="left">Device API requests</td>
      <td align="left">Number of API requests from devices</td>
    </tr>
    <tr>
      <td align="left">Storage (MB)</td>
      <td align="left">Amount of data stored in your account</td>
    </tr>
    <tr>
      <td align="left">Peak storage (MB)</td>
      <td align="left">Peak value of storage</td>
    </tr>
    <tr>
      <td align="left">Root devices</td>
      <td align="left">Number of root devices excluding child devices, see also <a href="#devices-count">Devices count details</a> </td>
    </tr>
    <tr>
      <td align="left">Peak root devices</td>
      <td align="left">Peak number of root devices, excluding child devices</td>
    </tr>
    <tr>
      <td align="left">Devices</td>
      <td align="left">Total number of devices connected to the subtenant, including child devices</td>
    </tr>
    <tr>
      <td align="left">Peak devices</td>
      <td align="left">Peak number of devices, including child devices</td>
    </tr>
    <tr>
      <td align="left">Endpoint devices</td>
      <td align="left">Leaf machines, without gateways and edges</td>
    </tr>
    <tr>
      <td align="left">Subscribed applications</td>
      <td align="left">Number of applications that the subtenant is subscribed to</td>
    </tr>
    <tr>
      <td align="left">Creation time</td>
      <td align="left">Date and time of the creation of the subtenant</td>
    </tr>
    <tr>
      <td align="left">Alarms created</td>
      <td align="left">Number of alarms created</td>
    </tr>
    <tr>
      <td align="left">Alarms updated</td>
      <td align="left">Number of updates on alarms</td>
    </tr>
    <tr>
      <td align="left">Inventories created</td>
      <td align="left">Number of managed objects created</td>
    </tr>
    <tr>
      <td align="left">Inventories updated</td>
      <td align="left">Number of updates on managed objects</td>
    </tr>
    <tr>
      <td align="left">Events created</td>
      <td align="left">Number of events created</td>
    </tr>
    <tr>
      <td align="left">Events updated</td>
      <td align="left">Number of updates on events</td>
    </tr>
    <tr>
      <td align="left">Measurements created</td>
      <td align="left">Number of measurements created</td>
    </tr>
    <tr>
      <td align="left">Operations created</td>
      <td align="left">Number of operations created</td>
    </tr>
    <tr>
      <td align="left">Operations updated</td>
      <td align="left">Number of updates on operations</td>
    </tr>
    <tr>
      <td align="left">Total inbound transfer</td>
      <td align="left">Sum of all inbound transfers (alarms created, alarms updated, events created, events updated, inventories created, inventories updated, measurements created, operations created, operations updated)</td>
    </tr>
    <tr>
      <td align="left">CPU (M)</td>
      <td align="left">Microservice CPU usage, specified in CPU millicores, see <a href="#microservice-usage">Microservice usage</a> for details</td>
    </tr>
    <tr>
      <td align="left">Memory (MB)</td>
      <td align="left">Microservice memory usage, see <a href="#microservice-usage">Microservice usage</a> for details</td>
    </tr>
    <tr>
      <td align="left">Parent tenant</td>
      <td align="left">Name of the parent tenant (available only for {{< management-tenant >}})</td>
    </tr>
    <tr>
      <td align="left">External reference</td>
      <td align="left">This field is for individual usage, for example, you can add a link to the CRM system here or an internal customer number</td>
    </tr>
  </tbody>
</table>

Moreover custom properties are displayed, if configured.

Custom properties may be defined in the [properties library](/standard-tenant/changing-settings/#properties-library) and then set their values in the [Custom properties](/enterprise-tenant/managing-tenants/#custom-properties) tab of the tenant.

You can filter the usage statistics list for a time period by adding the start and end date in the top menu bar and click **Apply**. The **Usage statistics** page will show the numbers for all subtenants for this time period.

{{< c8y-admon-info >}}
If a tenant was created after the selected time period, it will show up but the numbers are "0".
{{< /c8y-admon-info >}}

You can also filter and sort the list on any column by clicking the filter icon <i class="dlt-c8y-icon-filter icon-20"></i> next to the column name and providing the filtering criteria. See also [Filtering](/get-familiar-with-the-ui/gui-features/#filtering).

{{< c8y-admon-important >}}
The date/time range used here might differ from your server time due to different time zones.
{{< /c8y-admon-important >}}

### To export the usage statistics table {#to-export-the-usage-statistics-table}

1. Click Export CSV at the right of the top menu bar to export the current view of the statistics table to a CSV file.
2. In the resulting dialog box you can customize the CSV output by specifying a field separator, decimal separator and charset.
3. Click **Download** to start the export.

The CSV file will be downloaded to your file system.

#### Devices count details {#devices-count}
The device count calculations assume that only top-level devices are marked with the [device marker](/device-integration/fragment-library/#device-marker) fragment `c8y_IsDevice`.
Accordingly, the following formulas are used in the calculations:
* root devices - all devices with the `c8y_IsDevice` fragment
* all devices - all devices with the `c8y_IsDevice` fragment and their children from the whole device hierarchy
* leaf devices - only leafs of the device hierarchies starting from devices with the `c8y_IsDevice` fragment

If child devices are also marked with the `c8y_IsDevice` fragment, the calculation results may look different than expected.


### Microservice usage {#microservice-usage}

The microservice usage feature gathers information on the resource usage per subtenant for each microservice. This enables {{< enterprise-tenant >}}s and service providers to charge tenants not only based on subscriptions but also based on resources usage.


#### Billing modes {#billing-modes}

{{< product-c8y-iot >}} offers two billing modes:

* **Subscription-based billing** - charges a constant price when a tenant is subscribed to a microservice while resource usage is assigned to the owner.

* **Resource-based billing** - exposes the number of resources used by a microservice to calculate billing.

The billing modes are specified per microservice in the [microservice manifest](/microservice-sdk/general-aspects/#microservice-manifest) and are set in the field "billingMode".

RESOURCES: Sets the billing mode to resources-based. This is the default mode and will be applied to all microservices that are not explicitly switched to subscription-based billing mode.

SUBSCRIPTION: Sets the billing mode to subscription-based.

#### Isolation level {#isolation-level}

Two isolation levels are distinguished for microservices: per-tenant isolation and multi-tenant isolation.

In case of subscription-based billing, the entire resources usage is always assigned to the microservice owner, independent of the isolation level,  while the subscribed tenant will be billed for the subscription.

In case of resources-based billing, charging depends on the isolation level:

* Per-tenant - the subscriber tenant is charged for used resources.
* Multi-tenant - the owner of the microservice is charged for used resources.

In case of multi-tenant isolation level, the owner of a microservice (for example the {{< management-tenant >}} of an {{< enterprise-tenant >}} or a service provider) is charged for the used resources of the subtenants. The subtenants should be charged based on the subscription according to the agreement between the microservice owner and the subscribed tenant. The list of subscribed applications is available as part of the [tenant applications](https://{{< domain-c8y >}}/api/core/#tag/Tenant-applications) as `subscribedApplications`.

#### Resources usage assignment for billing mode and isolation level {#resources-usage-assignment-for-billing-mode-and-isolation-level}

|Billing mode|Microservice Isolation|Resources usage assigned to
|:--------|:-----|:-----
|Subscription-based|Per-tenant|Owner
|Subscription-based|Multi-tenant|Owner
|Resources-based|Per-tenant|Subscriber
|Resources-based|Multi-tenant|Owner

#### Collected values {#collected-values}

The following values are collected on a daily base for each tenant:

* CPU usage, specified in CPU millicores (1000m = 1 CPU)
* Memory usage, specified in MB

Microservice resources are counted based at limits defined in the microservice manifest per day. At the end of each day, the information about resource usage is collected into the tenant statistics. It is also considered that a microservice might not be subscribed for a whole day.

**Example**

If a tenant was subscribed to a microservice for 12h and the microservice has 4 CPU and 4 GB of memory it should be counted as 2000 CPU millicores and 2048 MB of memory.

For billing purposes, in addition to CPU usage and memory usage the cause for the billing is collected (for example owner, subscription for tenant):

```json
{
  "name": "cep",
	"cpu": 6000,
	"memory": "20000",
	"cause": "Owner"
},
{
  "name": "cep-small",
  "cpu": 1000,
  "memory": "2000",
  "cause": "Subscription for tenant"
}
```

The information on the microservice usage is presented in the **Usage statistics** page.

![Tenant statistics](/images/users-guide/enterprise-tenant/et-subtenants-usage-statistics-microservice.png)

For more details, refer to [Tenants](https://{{< domain-c8y >}}/api/core/#tag/Tenants) in the {{< openapi >}}. Note that details are available only for daily usage. For a summary query only the sum of all issued requests is returned.

#### Scaling {#scaling}

Auto-scaling monitors your microservices and automatically adjusts capacity to maintain steady, predictable performance at the lowest possible cost. It is easy to configure the microservice scaling by setting the property `scale` in the [Microservice manifest](/microservice-sdk/general-aspects/#microservice-manifest).

For instance, when you have a microservice with scale policy set to AUTO and the CPU usage points that it is needed to start a new microservice instance for three hours, the billing logs: (24/24 + 3/24) * consumed resources.

* 24/24 - one instance active for the whole day
* 3/24 - second instance active only three hours

Note that an audit record is created for every change of the number of instances.

For more information, refer to [Audits](https://{{< domain-c8y >}}/api/core/#tag/Audits) in the {{< openapi >}}.


### Timezone handling {#timezone-handling}

{{< c8y-admon-important >}}
{{< product-c8y-iot >}} platform servers by default work at UTC timezone. Other time zones are also supported by the platform and can be selected by the service provider at installation time. Thus, the general metering functionality is also guaranteed for non-UTC server time zones.
{{< /c8y-admon-important >}}

The tenant usage statistics are collected on a daily base according to the beginning of day (`BOD`) and the end of day (`EOD`), which are defined by the server timezone. As a result, if the local time zone of a user is different from the server timezone, an operation triggered by the user may be assigned to a different day according to the server time.

#### Examples {#examples}

##### Request counting - Example 1 {#request-counting---example-1}

||Device| Server|
|:---|:----|:-----|
|Time zone| CEST +2h |UTC|
|Send measurement time | 26.08.2020T01:30:00+02:00| 25.08.2020T23:30:00Z|

**Result:**

The request will be billed to the day 25.08.2020 as this is the server time of the request handing.
<br><br>

##### Request counting - Example 2 {#request-counting---example-2}

||Device| Server|
|:---|:----|:-----|
|Time zone| UTC |UTC|
|Send measurement time | 26.08.2020T01:30:00Z| 26.08.2020T01:30:00Z|

**Result:**

The request will be billed to the day 26.08.2020 as the server time is the same as the device time.
<br><br>

##### Microservice resource billing - Example 1 {#microservice-resource-billing---example-1}

||User| Server|
|:---|:----|:-----|
|Time zone| CEST +2h |UTC|
|Subscribe time | 26.08.2020T12:00:00+02:00| 26.08.2020T10:00:00Z|
|Unsubscribe time | 27.08.2020T12:00:00+02:00| 27.08.2020T10:00:00Z|

**Result:**

The resources will be assigned mainly to the day 26.08.2020 as according to the UTC time zone the microservice was active for 14 hours that day and for 10 hours the next day. This might be a bit different from what a user expects as from his perspective the microservice was active for 12 hours each day.
<br><br>

##### Microservice resource billing - Example 2 {#microservice-resource-billing---example-2}

||User| Server|
|:---|:----|:-----|
|Time zone| KI +14h (Kiribati Islands)|UTC|
|Subscribe time | 26.08.2020T12:00:00+14:00| 25.08.2020T22:00:00Z|
|Unsubscribe time | 26.08.2020T20:00:00+14:00| 26.08.2020T06:00:00Z|

**Result:**

From the user perspective the microservice was subscribed for 8 hours at 26.08.2020 but at server time it was 2 hours before EOD of 25.08.2020 and 6 hours after BOD at 26.08.2020.
<br><br>

##### Microservice resource billing - Example 3 {#microservice-resource-billing---example-3}

||User| Server|
|:---|:----|:-----|
|Time zone| CEST| AS -11h (American Samoa)|
|Subscribe time | 26.08.2020T12:30:00+2:00| 25.08.2020T23:30:00Z|
|Unsubscribe time | 26.08.2020T13:00:00+2:00| 25.08.2020T24:00:00Z|

**Result:**

In this case we have a big time shift between the server and the user time. All resources will be billed to the day 25.08.2020 according to the server time.


### Daily routine {#daily-routine}

Usage statistics consist of values that are progressive like the request count and values that are snapshots of a state at a given time period. In case of the second type of data, values are refreshed several times each day but the value from EOD is the value that is assigned for the given day.

|Value type|Refreshed|
|:--------|:--------|
|Request count flush| Every 5 minutes|
|Used storage | 9, 17 and EOD|
|Device count | 9, 17 and EOD|
|Subscribed applications | 9, 17 and EOD|
|Microservice resources | 9, 17 and EOD|


### Lifecycle {#lifecycle}

**Tenant**

A {{< product-c8y-iot >}} platform tenant can have several states:

  * Active - the common state when the tenant can interact with the platform. In that state all billing values are stored and updated.
  * Suspended - suspended tenants are not billed for request count and microservice resources, the only value that is still counted is the existence of the tenant and the storage size. The microservice resource usage is billed as "used", that means, when the tenant is switched to suspended state all microservices are stopped so there are no resources to bill.
  * Deleted - this is the point of no return. The tenant is not billed for any resources but there is no way of restoring the data also.


**Microservice**

Any extension deployed to the platform as a microservice is billed as "used" and the billing starts according to the begin of usage. After the application is subscribed to the tenant a process of application startup is triggered which will go through several high level phases:

  * Pending - the microservice has been scheduled to be started but the Docker container is not running yet. In this state the microservice is not yet billed.
  * Scheduled - the microservice has been assigned to a node, the Docker container initialization has been started. The resources for the microservice have already been allocated so billing is started.
  * Not ready - the microservice container is not ready yet to handle incoming traffic but the application is already running.
  * Ready - the microservice container is ready to handle incoming traffic. "Ready" is resolved based on liveness and readiness probes defined in the [microservice manifest](/microservice-sdk/general-aspects/#microservice-manifest). If probes are not defined then the microservice is immediately ready.

A tenant that is billed for resources can view the point in time when the microservices billing has been changed in [the audit logs](/standard-tenant/audit-logs/). The audit log entries, for example "Scaling application '...' from X to Y instances" contain the information about the changes of instances and resources consumed by the microservice.

Tenants should also be able to see the full application lifecyle in the application details. In the **Status** tab, you can see an **Events** section that is showing very low level stages of the application startup. Some of the most important are:

  * `Pod "apama-ctrl-starter-scope-..." created.` - a new microservice instance has been scheduled to be started for the tenant. This means that the resource allocation has been successful but the application is not running yet (maps to the state "Scheduled").
  * `Pulling image "apama-ctrl-starter-scope-..."` - the microservice initialization process has been started and the Docker image download is already in progress (state "Scheduled").
  * `Container created.` - the microservice container has been created but not started yet (state "Scheduled").
  * `Container started.` - the microservice container is started but not ready yet to handle incoming traffic (state "Not ready").

{{< c8y-admon-info >}}
There is no event in the **Events** section when the microservice has reached the state "Ready" as this happens according to the readiness probe.
{{< /c8y-admon-info >}}

  <img src="/images/users-guide/enterprise-tenant/et-ms-billing-events.png" name="Microservice details - Events"/>

Audit logs and events are stored at tenant space according to the isolation level. For multi-tenant isolated microservices this is the tenant that is the owner of the microservice and in case of per-tenant isolation level it is the subscribed tenant.

### Billing pricing models {#billing-pricing-models}

The {{< product-c8y-iot >}} platform collects a lot of different usage statistics data which is used for billing customers.

Based on the contract, there are two pricing models for billing:

* Tenant usage pricing model - based on tenant usage statistics
* Device pricing model - based mostly on device statistics and microservice resource usage

The table below presents which values are used in each model for billing purposes:

<table>
  <col style="width:25%">
  <col style="width:25%">
  <col style="width:30%">
  <col style="width:20%">
  <thead>
    <tr>
      <th style="text-align:left">Source</th>
      <th style="text-align:left">Name</th>
      <th style="text-align:left">Tenant usage pricing model</th>
      <th style="text-align:left">Device pricing model</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><a href="#to-view-usage-statistics">TenantUsageStatistics</a></td>
      <td style="text-align:left">ID</td>
      <td style="text-align:left">x</td>
      <td style="text-align:left">x</td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="#to-view-usage-statistics">TenantUsageStatistics</a></td>
      <td style="text-align:left">Tenant</td>
      <td style="text-align:left">x</td>
      <td style="text-align:left">x</td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="#to-view-usage-statistics">TenantUsageStatistics</a></td>
      <td style="text-align:left">API requests</td>
      <td style="text-align:left">x</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="#to-view-usage-statistics">TenantUsageStatistics</a></td>
      <td style="text-align:left">Device API requests</td>
      <td style="text-align:left">x</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="#to-view-usage-statistics">TenantUsageStatistics</a></td>
      <td style="text-align:left">Storage</td>
      <td style="text-align:left">x</td>
      <td style="text-align:left">x</td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="#to-view-usage-statistics">TenantUsageStatistics</a></td>
      <td style="text-align:left">Peak storage</td>
      <td style="text-align:left">x</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="#to-view-usage-statistics">TenantUsageStatistics</a></td>
      <td style="text-align:left">Root device</td>
      <td style="text-align:left">x</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="#to-view-usage-statistics">TenantUsageStatistics</a></td>
      <td style="text-align:left">Peak root device</td>
      <td style="text-align:left">x</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="#to-view-usage-statistics">TenantUsageStatistics</a></td>
      <td style="text-align:left">Devices</td>
      <td style="text-align:left">x</td>
      <td style="text-align:left">x</td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="#to-view-usage-statistics">TenantUsageStatistics</a></td>
      <td style="text-align:left">Peak devices</td>
      <td style="text-align:left">x</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="#to-view-usage-statistics">TenantUsageStatistics</a></td>
      <td style="text-align:left">Endpoint devices</td>
      <td style="text-align:left">x</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="#to-view-usage-statistics">TenantUsageStatistics</a></td>
      <td style="text-align:left">Subscribed applications</td>
      <td style="text-align:left">x</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="#to-view-usage-statistics">TenantUsageStatistics</a></td>
      <td style="text-align:left">Creation time</td>
      <td style="text-align:left">x</td>
      <td style="text-align:left">x</td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="#to-view-usage-statistics">TenantUsageStatistics</a></td>
      <td style="text-align:left">Alarms created</td>
      <td style="text-align:left">x</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="#to-view-usage-statistics">TenantUsageStatistics</a></td>
      <td style="text-align:left">Alarms updated</td>
      <td style="text-align:left">x</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="#to-view-usage-statistics">TenantUsageStatistics</a></td>
      <td style="text-align:left">Inventories created</td>
      <td style="text-align:left">x</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="#to-view-usage-statistics">TenantUsageStatistics</a></td>
      <td style="text-align:left">Inventories updated</td>
      <td style="text-align:left">x</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="#to-view-usage-statistics">TenantUsageStatistics</a></td>
      <td style="text-align:left">Events created</td>
      <td style="text-align:left">x</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="#to-view-usage-statistics">TenantUsageStatistics</a></td>
      <td style="text-align:left">Events updated</td>
      <td style="text-align:left">x</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="#to-view-usage-statistics">TenantUsageStatistics</a></td>
      <td style="text-align:left">Measurements created</td>
      <td style="text-align:left">x</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="#to-view-usage-statistics">TenantUsageStatistics</a></td>
      <td style="text-align:left">Operations created</td>
      <td style="text-align:left">x</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="#to-view-usage-statistics">TenantUsageStatistics</a></td>
      <td style="text-align:left">Operations updated</td>
      <td style="text-align:left">x</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="#to-view-usage-statistics">TenantUsageStatistics</a></td>
      <td style="text-align:left">Total inbound transfer</td>
      <td style="text-align:left">x</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="#to-view-usage-statistics">TenantUsageStatistics</a></td>
      <td style="text-align:left">Parent tenant</td>
      <td style="text-align:left">x</td>
      <td style="text-align:left">x</td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="#to-view-usage-statistics">TenantUsageStatistics</a></td>
      <td style="text-align:left">Tenant domain</td>
      <td style="text-align:left"></td>
      <td style="text-align:left">x</td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="#to-view-usage-statistics">TenantUsageStatistics</a></td>
      <td style="text-align:left">Can create subtenants</td>
      <td style="text-align:left"></td>
      <td style="text-align:left">x</td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="#to-view-usage-statistics">TenantUsageStatistics</a></td>
      <td style="text-align:left">External reference</td>
      <td style="text-align:left">x</td>
      <td style="text-align:left">x</td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="#to-view-usage-statistics">TenantUsageStatistics</a></td>
      <td style="text-align:left">Total microservice CPU usage</td>
      <td style="text-align:left">x</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="#to-view-usage-statistics">TenantUsageStatistics</a></td>
      <td style="text-align:left">Total microservice memory usage</td>
      <td style="text-align:left">x</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="#microservice-usage">MicroserviceUsageStatistics</a></td>
      <td style="text-align:left">Per microservice CPU usage</td>
      <td style="text-align:left"></td>
      <td style="text-align:left">x</td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="#microservice-usage">MicroserviceUsageStatistics</a></td>
      <td style="text-align:left">Per microservice memory usage</td>
      <td style="text-align:left"></td>
      <td style="text-align:left">x</td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="https://{{< domain-c8y >}}/api/core/#tag/Tenant-API">DeviceStatistics</a></td>
      <td style="text-align:left">Monthly measurements, events and alarms created and updated per device</td>
      <td style="text-align:left"></td>
      <td style="text-align:left">x</td>
    </tr>
  </tbody>
</table>
