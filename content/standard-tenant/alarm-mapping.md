---
weight: 50
title: Alarm mapping
layout: bundle
outputs:
  - html
  - json
sector:
  - platform_administration
helpcontent:
- label: alarm-mapping
  title: Alarm mapping
  content: "Alarm mapping enables you to change the severity and text of alarms to adapt them to your business priorities. For example, a loss of the connection to a device is by default a MAJOR alarm but may be critical to you. To change this, add an alarm mapping to change alarms related to connection losses to CRITICAL."
---

Alarm mapping enables you to change the severity and text of alarms to adapt them to your business priorities. For example, a loss of the connection to a device is by default a MAJOR alarm but may be critical to you. To change this, add an alarm mapping to change alarms related to connection losses to CRITICAL.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

- To view alarm mappings: READ permission for the permission type "Option management".
- To manage (create, edit, or delete) alarm mappings: ADMIN permission for the permission type "Option management".

For easier user access management, the above permissions are included in the global role created by default in every new tenant:
- Tenant Manager - manages tenant-wide configurations like applications, tenant options and business rules.
{{< /c8y-admon-req >}}

{{< c8y-admon-related >}}
- [Device management & connectivity > Device Management application> Monitoring and controlling devices > Working with alarms](/device-management-application/monitoring-and-controlling-devices/#working-with-alarms) for information on working with alarms in general.
- [Alarms](https://{{< domain-c8y >}}/api/core/#tag/Alarms) in the {{< openapi >}} for details on managing alarms via REST.
{{< /c8y-admon-related >}}


### To view alarm mappings {#to-view-alarm-mappings}

Click **Alarm mapping** in the **Business Rules** menu to see a list of all alarm mappings.

<img src="/images/users-guide/Administration/admin-alarm-mapping.png" alt="Alarm mapping">

For each alarm mapping, the alarm severity, the alarm type and a description (optional) are shown.


### To add alarm mapping {#to-add-alarm-mapping}

1. Click **Add alarm mapping** in the top menu bar.
2. Enter the alarm type to be modified.
3. In the **New description** field, optionally enter a new description for the alarm. If you leave this field empty, the original text from the alarm will be kept.
4. Select the desired new severity, or select "Drop" to not show the alarm at all.
5. Click **Save** to save your settings.

{{< c8y-admon-info >}}
The alarm type provided as an alarm mapping is interpreted as alarm type prefix: &quot;&#60;type-prefix&#62;*&quot;. If you create, for example, an alarm mapping to address alarms of type &quot;crit-alarm&quot;, the mapping is effective for any type of alarm that starts with this value, for example, &quot;crit-alarm-1&quot;, &quot;crit-alarm-2&quot;, or &quot;crit-alarm-xyz&quot;.
{{< /c8y-admon-info >}}

### To edit an alarm mapping {#to-edit-an-alarm-mapping}

Expand an alarm mapping to edit it. You may modify the description and the alarm severity. The alarm type is not editable.

{{< c8y-admon-info >}}
Refresh the list to discard any changes without saving.
{{< /c8y-admon-info >}}

### To delete an alarm mapping {#to-delete-an-alarm-mapping}

To delete an alarm mapping, hover over it and click the remove icon <i class="dlt-c8y-icon-minus-circle text-danger icon-20"></i> which appears on hovering over the row.
