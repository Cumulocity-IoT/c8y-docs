---
weight: 10
title: Managing subtenants
layout: redirect
helpcontent:
  - label: managing-subtenants
    title: Subtenants
    content: "Click **Subtenants** in the **Tenants** menu to view all subtenants available in your account. The **Tenants** page provides information on each subtenant such as the name of the subtenant, its ID and domain, and the status of the tenant (either active, indicated by a green checkmark icon, or suspended, indicated by a red cross icon).


    To create a subtenant click **Create tenant** at the top right."
---

Using the {{< enterprise-tenant >}} of {{< product-c8y-iot >}}, you can make use of the tenants functionality which allows you to create and manage subtenants.

{{< c8y-admon-req >}}
APPLICATION ACCESS:

The user must have access to the Administration application of an {{< enterprise-tenant >}}.

ROLES & PERMISSIONS:

The user must have at least one permission for the permission type "Tenant management":
* To view all tenants: READ permission.
* To create tenants: CREATE permission.
* To edit tenants (including subscriptions) and to suspend or activate tenants: UPDATE permission.
* To create tenants and perform activity permitted by UPDATE permission: ADMIN permission.

{{< /c8y-admon-req >}}

{{< c8y-admon-important >}}
There is a major difference between providing several tenants and providing several users with different permissions within a single tenant. Tenants are physically separated data spaces with a separate URL, with own users, a separate application management and no sharing of data by default. Users in a single tenant by default share the same URL and the same data space. So if your users, for example, are separate customers of yours and you must strictly separate them because they may be competitors, we strongly recommend you to do so by working with tenants. For details on the role-based access approach versus multi-tenancy, see [RBAC versus multi-tenancy approach](/concepts/tenant-hierarchy/#comparison).
{{< /c8y-admon-important >}}


### To view subtenants {#to-view-subtenants}

Click **Subtenants** in the **Tenants** menu to view all subtenants available in your account.

The **Tenants** page provides the following information on each subtenant:

* The name of the subtenant, for example, company name of your customer.
* The ID and domain.
* Optionally, a contact name.
* The date when the tenant was created.
* The status of the tenant, either active (indicated by a green checkmark icon <i class="dlt-c8y-icon-ok text-success icon-20"></i>) or suspended (indicated by a red cross icon <i class="dlt-c8y-icon-block text-danger icon-20"></i>).

{{< c8y-admon-info >}}
In the {{< management-tenant >}}, you also find a column with information on the parent tenant. The parent tenant is the original tenant that created the subtenants that are listed in the table.
{{< /c8y-admon-info >}}


### To create a subtenant {#to-create-a-subtenant}

1. Click **Create tenant** at the right of the top menu bar.

	![Create subtenant](/images/users-guide/enterprise-tenant/et-subtenant-create.png)

2. Provide the following properties:

	<table>
		<col style="width:20%">
		<col style="width:80%">
		<thead>
			<tr>
				<th style="text-align:left">Field</th>
				<th style="text-align:left">Description</th>
				<th style="text-align:left">Required</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td style="text-align:left">Domain/ URL</td>
				<td style="text-align:left">Enter a subdomain of your choice, for example "acme". The tenant's URL will be "acme.{{< domain-c8y >}}" on {{< domain-c8y >}}. You can only use one subdomain level. For example, you can only use "acme.{{< domain-c8y >}}" on {{< domain-c8y >}}. You cannot use "mycustomer.acme.{{< domain-c8y >}}". This is not permitted by the TLS standard. <br> The tenant domain may contain lowercase letters, digits or hyphens (-). It must start with a letter; hyphens are only allowed in the middle; minimum is 2 characters.</td>
				<td style="text-align:left">Yes</td>
			</tr>
			<tr>
				<td style="text-align:left">Name</td>
				<td style="text-align:left">The name of the tenant, for example, the company's name.</td>
				<td style="text-align:left">Yes</td>
			</tr>
			<tr>
				<td style="text-align:left">Administrator's email</td>
				<td style="text-align:left">A valid email address to enable users to reset their password.</td>
				<td style="text-align:left">Yes</td>
			</tr>
			<tr>
				<td style="text-align:left">Administrator's username</td>
				<td style="text-align:left">Username for the administrator of this tenant.</td>
				<td style="text-align:left">Yes</td>
			</tr>
			<tr>
				<td style="text-align:left">Contact name</td>
				<td style="text-align:left">Name of the contact.</td>
				<td style="text-align:left">No</td>
			</tr>
			<tr>
				<td style="text-align:left">Contact phone</td>
				<td style="text-align:left">Phone number of the contact.</td>
				<td style="text-align:left">Yes</td>
			</tr>
			<tr>
				<td style="text-align:left">Send password reset link as email</td>
				<td style="text-align:left">Selected by default. If you deselect this option, you must provide a password and confirm the password (see <a href="/get-familiar-with-the-ui/user-settings/#to-change-your-password" class="no-ajaxy">To change your password</a> for more information on password strength).</td>
				<td>No</td>
			</tr>
			<tr>
				<td style="text-align:left">Tenant policy</td>
				<td style="text-align:left">You may select a tenant policy to be applied to the tenant from the dropdown list.</td>
				<td style="text-align:left">No</td>
			</tr>
		</tbody>
	</table>


3. Click **Save** to apply your settings.

When the subtenant is created, it gets an auto-generated ID, which cannot be changed. Also, it is automatically provisioned with a first, administrative user ("Administrator's username"). This administrator can create other users and set their permissions. The first user cannot be deleted to prevent you from locking yourself out.

From the {{< management-tenant >}}, you can enable other tenants to create subtenants. Contact your Operations team on how to configure this setting according to your needs.

### To view or edit subtenant properties {#to-view-or-edit-subtenant-properties}

Click on the desired subtenant or click the edit icon <i class="dlt-c8y-icon-edit1 text-primary icon-20"></i> at the right of the subtenant entry.

In the **Properties** tab, all fields are editable except of **ID**, **Domain/ URL**, **Administrator's username** and **Administrator's email**. For details on the fields, refer to [To create a subtenant](#to-create-a-subtenant).
{{<c8y-admon-info>}}
The **Administrator's email** may be changed by logging in to the subtenant with the **Administrator's username** and changing the own email.
{{</c8y-admon-info>}}

To change the tenant password, click **Change password**, enter the new password in the upcoming fields and click **Save**.

#### Support user access information {#support-user-access-information}

At the right of the **Properties** tab, you can find information on the support user requests/access for the subtenants.

<img src="/images/users-guide/enterprise-tenant/et-support-user-properties.png" alt="Support user access information" style="max-width: 100%">

The following information is displayed here:

<table>
<colgroup>
<col width="20%">
<col width="80%">
</colgroup>
<thead>
<tr>
<th style="text-align:left">Field</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">Status</td>
<td style="text-align:left">May be either "Enabled" or "Disabled". <br>"Enabled" indicates that: <br>&nbsp;&nbsp;- Support user access has been activated globally in the {{< management-tenant >}}.<br>&nbsp;&nbsp;- One or more subtenant users have activated support user access.<br>"Disabled" indicates that: <br>&nbsp;&nbsp;- Support user access has been deactivated globally in the {{< management-tenant >}}. <br>&nbsp;&nbsp;- No subtenant user has currently any active support user access (that means, each support user request has either expired or has actively been deactivated).</td>
</tr>
<tr>
<td style="text-align:left">Active requests count</td>
<td style="text-align:left">The number of requests currently active in the subtenant. Only displayed if support user access is not enabled globally in the {{< management-tenant >}}. Shown as a number in a small red dot.</td>
</tr>
<tr>
<td style="text-align:left">Expiry date</td>
<td style="text-align:left">Specifies the date on which support user access for the tenant will expire. If no date has been specified, the expiry date is set to "No limit".</td>
</tr>
</tbody>
</table>

{{<c8y-admon-info>}}
The **Support user access** Log in button is available only when support user access is enabled and the user has the required permissions in the management tenant. For more details, refer to [Support user access](/enterprise-tenant/support-user-access)
{{</c8y-admon-info>}}

### To suspend a subtenant {#to-suspend-a-subtenant}

Suspending a tenant blocks any access to this tenant, regardless whether the access is from devices, users or other applications. In addition, all its microservices are undeployed, and if the tenant is reactivated all its microservices are re-deployed.

Device-related data continues to be subject of the retention rules and will be gradually removed. The rest of the tenant's data remains in the Operational Store and can be made available later by clicking **Activate**.

Refer to [Lifecycle](/enterprise-tenant/usage-and-billing/#lifecycle) for details on the billing perspective of suspended tenants.

{{< c8y-admon-important >}}
Suspended tenants for all {{< product-c8y-iot >}} public cloud instances will be automatically deleted after 60 days.
{{< /c8y-admon-important>}}

{{< c8y-admon-info >}}
If data broker connectors are configured for a tenant, suspending this tenant results in suspending all its data broker connectors as well.
{{< /c8y-admon-info >}}

1. Click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the right of the respective subtenant entry and then click **Suspend**.

	![Suspend tenant](/images/users-guide/enterprise-tenant/et-subtenant-suspend.png)

2. In the resulting dialog box confirm the suspension by clicking **Suspend** and then entering your password.

{{< c8y-admon-info >}}
* As part of suspending the tenant, an email is sent to the email address that was configured for the tenant administrator.
* If you are a service provider, you can suppress this email.
{{< /c8y-admon-info >}}


### To delete a subtenant {#to-delete-a-subtenant}

{{< c8y-admon-important >}}
Deleting a subtenant cannot be reverted. For security reasons, it is therefore only available in the {{< management-tenant >}}. You cannot delete tenants from any tenant but the {{< management-tenant >}}. Contact your Operations team for further support.

Administrators in {{< enterprise-tenant >}}s are only allowed to suspend active subtenants, but not to delete them.
{{< /c8y-admon-important >}}

Click the menu icon  <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the right of the respective subtenant entry and then click **Delete** to finally delete a tenant and remove all the data of the tenant.
