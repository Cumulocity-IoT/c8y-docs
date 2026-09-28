---
weight: 40
title: Tenant policies
layout: redirect
helpcontent:
  - label: tenant-policies
    title: Tenant policies
    content: "During tenant creation, tenant options and retention rules may be specified. This can easily be done by using a tenant policy, which defines a set of tenant options and retention rules. Creating a tenant policy with a specific set of options and rules saves time when creating multiple tenants with the same settings.


    Click **Tenant policies** in the **Tenants** menu to view all available tenant policies. To create a tenant policy, click **Add policy** at the top right."

---

A tenant policy is a set of tenant options and retention rules. Tenant options and retention rules may be specified during tenant creation.

Creating a tenant policy with a specific set of options and rules saves time when creating multiple tenants with the same settings.

{{< c8y-admon-info >}}
The options and rules are copied into the tenant. Editing the policy has no effect on tenants that have already been created.
{{< /c8y-admon-info >}}

{{< c8y-admon-important >}}
Tenant options specified in a tenant policy are **not encrypted**. You should not specify or overwrite tenant options here with a "credentials." prefix, since the platform expects those options to be encrypted with data that will appear after the tenant has been created.
{{< /c8y-admon-important >}}

### To view tenant policies {#to-view-tenant-policies}

Click **Tenant policies** in the **Tenants** menu to view all available tenant policies.

For each tenant policy, the name, an optional description and the number of options and retention rules is provided, either in a list or a grid.

### To create a tenant policy {#to-create-a-tenant-policy}

1. Click **Add policy** in the top menu bar.
2. In the resulting dialog box, enter a name and an optional description.
<br>![Add new policy](/images/users-guide/enterprise-tenant/et-tenant-policy-add.png)<br>
3. Add at least one retention rule. For details on creating retention rules, see [Retention rules](/standard-tenant/managing-data/#retention-rules).
4. Optionally, add a tenant option.
5. Click **Save**.

The tenant policy will be added to the tenant policies list.

{{< c8y-admon-important >}}
When defining the retention rules and options you can select a checkbox to allow subtenants to modify definitions of these rules or options. By default, this checkbox is not activated. Be aware that if you do not select this checkbox after creating the subtenant you must run an update from the {{< management-tenant >}} in order to edit those rules and options.
{{< /c8y-admon-important >}}

### To edit a tenant policy {#to-edit-a-tenant-policy}

Click the respective policy entry or click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the right of the policy entry and then click **Edit**.

In the resulting dialog box, make your edits and click **Save** to save your settings.

To delete a retention rule or a tenant option from a policy, hover over it and click the remove icon <i class="dlt-c8y-icon-minus-circle text-danger icon-20"></i>.

### To duplicate a tenant policy {#to-duplicate-a-tenant-policy}

Click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> in the policy entry you want to duplicate and then click **Duplicate**.

### To delete a tenant policy {#to-delete-a-tenant-policy}

Click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> in the policy entry you want to delete and then click **Delete**.
