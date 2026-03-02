---
weight: 10
title: Retention rules
layout: redirect
sector:
  - platform_administration
helpcontent:
- label: retention-rules
  title: Retention rules
  content: "Retention rules gives you control on how long data is stored in your account. By default, all historical data is deleted after 60 days (configurable in the system settings). You can however store measurements for 90 days for example, but delete alarms already after 10 days."
---


**Retention rules** give you control on how long data is stored in your account. By default, all historical data is deleted after 60 days (configurable in the system settings by the platform administrator). You might however want to store measurements for 90 days for example, but delete alarms already after 10 days.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

- To view retention rules: READ permission for the permission type "Retention rules"
- To manage retention rules (create, update, delete): ADMIN permission for the permission type "Retention rules"

The above permissions can be used to create roles for robust user management. Every new tenant have specified typical roles by default:
- Tenant Manager - Can manage tenant wide configurations like applications, tenant options and retention rules.

{{< /c8y-admon-req >}}


{{< c8y-admon-related >}}
- [Platform administration > {{< enterprise-tenant >}} administration > Managing tenants > Tenant policies](/enterprise-tenant/managing-tenants/#tenant-policies) for details on the creation of tenant policies and retention rules on tenant level.
- [Retention rules](https://{{< domain-c8y >}}/api/core/#tag/Retention-rules) in the {{< openapi >}} for details on managing retention rules via REST.
{{< /c8y-admon-related >}}

{{< c8y-admon-info >}}
Retention rules are usually run once per calendar day.  When you edit a retention rule you don´t see an immediate effect in the **Usage** section on the Home screen of the Administration application.
{{< /c8y-admon-info >}}


### To view retention rules {#to-view-retention-rules}

Click **Retention rules** in the **Management** menu to view a list of retention rules configured for your account.

<img src="/images/users-guide/Administration/admin-retention-rules.png" alt="Retention rules">

For each rule, the rule name, details on the data to be deleted (fragment type, type and source, see below) and the maximum age in days is provided.

The asterisk ("*") indicates that data with any value will be cleaned up.

### Data types {#data-types}

The following data types are covered under retention rules:
+ Alarms
+ Audits
+ Bulk operations
+ Events
+ Measurements
+ Operations

{{< c8y-admon-info >}}
Retention rules do not apply to files stored in the files repository.
{{< /c8y-admon-info >}}


### To add a retention rule {#to-add-a-retention-rule}

1. Click **Add rule** in the top menu bar.
2. In the resulting dialog box, select the type of data to be cleaned up (alarms, measurements, events, operations, audit logs or all).
3. Optionally, enter a type or a fragment type to further restrict the data to be cleaned up.  The type refers to the value of the object's top-level `type` field and identifies the specific kind of object within the selected data type. The fragment type refers to the name of a JSON fragment contained in the object. An object has one type but can contain multiple fragments.
4. If you want to remove data only from a specific device, enter the device ID into the **Source** field.
5. Enter the **Maximum age** in days (max. allowed value is 10 years in days).
6. Click **Save** to save your settings.

The retention rule will be added to the list.

{{< c8y-admon-info >}}
Per default, an asterisk * is set in all fields except the **Maximum age** field, to include all values.
Alarms are only removed if they have a status of CLEARED.
{{< /c8y-admon-info >}}


### To edit a retention rule {#to-edit-a-retention-rule}

Simply click the row of the rule you want to edit.

For details on the fields, see [To add a retention rule](#to-add-a-retention-rule).


### To delete a retention rule {#to-delete-a-retention-rule}

Hover over the row with the rule you want to delete and click the remove icon <i class="dlt-c8y-icon-minus-circle text-danger icon-20"></i> that appears on the right.

### Execution examples {#examples}

All retention rules are executed sequentially and independent of each other.

If we have two retention rules, a more specific one with a greater maximum age that defines a subset of the documents that are defined by a more common rule with a lower maximum age, then effectively it will work as if we had a single, more common rule.

For example, given the two following rules:

| **Data type** | **Fragment type** | **Type**        | **Source** | **Maximum age** |
|---------------|-------------------|-----------------|------------|-----------------|
| MEASUREMENT   | *                 | c8y_Temperature | *          | 30 days         |
| MEASUREMENT   | *                 | c8y_Temperature | 12345      | 60 days         |

All measurements with the type `c8y_Temperature` which are older than 30 days will be removed, including those where the source equals `12345`.

On the other hand, when we have the following retention rules defined:

| **Data type** | **Fragment type** | **Type**        | **Source** | **Maximum age** |
|---------------|-------------------|-----------------|------------|-----------------|
| MEASUREMENT   | *                 | c8y_Temperature | *          | 30 days         |
| MEASUREMENT   | *                 | *               | *          | 60 days         |

The retention process removes the measurements with the type `c8y_Temperature` which are older than 30 days, all other measurements will be removed when they are older than 60 days.

{{< c8y-admon-info >}}
The source parameter is the ID of the device. When it is defined, the retention process only removes the documents directly related to the device represented by the source, not its children or groups it belongs to.
{{< /c8y-admon-info >}}
