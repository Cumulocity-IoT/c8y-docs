---
title: RBAC versus multi-tenancy approach
layout: bundle
weight: 100
sector:
  - platform_administration
---

### Introduction {#introduction}

When you think about offering your applications and services to your customers you must think at some point about how to structure your customers within the platform. {{< product-c8y-iot >}} can help you with that in two different ways.

The first is **role-based access control (RBAC)** that is part of every tenant in the {{< product-c8y-iot >}} platform and lets you granularly define the rights of each user. This can be used to give certain users (like a customer) only partial visibility of the tenant (only the devices that belong to them).

On top of that the {{< product-c8y-iot >}} platform in general is a **multi-tenant platform** which also gives you the ability to create your own subtenants, which function like any other tenant in the platform.

This will leave you with two options to organize your customers. You can either create a tenant for each of your customers or you can manage multiple customers within a single tenant and protect them from each other using RBAC.

In the following we will look at both approaches in more detail and run through some use cases explaining how to solve them in both ways. This should help you to decide which approach suits your business case better. {{< product-c8y-iot >}} is designed to manage tenants using the tenant hierarchy. As a result, some aspects that must be handled in a customer environment are more challenging when using Role Based Access Control. Using a combination of both approaches will provide you and your customers with the most flexible approach.

{{< c8y-admon-info >}}
Starting with one approach and then switching to the other one will require some migration. It is easier to go from RBAC to multi-tenancy than vice versa.
{{< /c8y-admon-info >}}

### General setup {#general-setup}

Before going into detail with certain use cases we must clarify the general setup for each approach and the underlying concepts.

#### Role-Based Access Control (RBAC) {#rolebased-access-control-rbac}

Handling everything in a single tenant usually starts by creating an asset hierarchy in which you create separate folders for your customers. Details of the asset hierarchy can be customized but at some point you will probably end up with one folder for each customer. Your customers will then only have access to their folders and will not be able to see anything outside of that folder.

#### Multi-tenancy {#multi-tenancy}

Creating a tenant for each customer will separate your customers at the tenant level. Your customers will get access to their tenants only and can work in this tenant the same way you do in yours (with whatever specific access you want to grant them). In the use cases we will assume that the customer is the admin of his tenant and therefore has full access.

{{< c8y-admon-info >}}
The customer tenant is not different from your tenant unless you restrict your customer from certain functionality explicitly.
{{< /c8y-admon-info >}}

### Comparison of various use cases {#comparison-of-various-use-cases}

The following tasks should be covered by a platform solution:

  - [Customer onboarding](#customer-onboarding)
  - [Device registration](#device-registration)
  - [Access Rights](#access-rights)
  - [User management](#user-management)
  - [Application management](#application-management)
  - [Invoicing and usage data](#invoicing-and-usage-data)
  - [Analytics](#analytics)
  - [{{< product-c8y-iot >}} DataHub](#datahub)

The following sections discuss how these tasks are handled in both approaches.

#### Customer onboarding {#customer-onboarding}

<table>
<thead>
<colgroup>
   <col style="width: 60%;">
   <col style="width: 40%;">
</colgroup>
<tr>
<th style="text-align:left">Role Based Access Control</th>
<th style="text-align:left">Multi-tenancy</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">Adding a new customer is achieved by expanding your asset hierarchy and creating the respective user accounts for the customer with access to the newly created parts of the hierarchy.</td>
<td style="text-align:left">Adding a new customer is achieved by creating a new subtenant from your own tenant. During tenant creation you can automatically create the first user for the customer which will get admin permissions.</td>
</tr>
</tbody>
</table>

**Comparison:**

The creation of a new customer is equally simple. However, you must consider that in the multi-tenant approach you create a new empty tenant with nothing in it but the standard applications. You still might need to subscribe additional applications, create default dashboards, configure retention and others. These are already present in the RBAC approach as they are set up only once for everyone. On the other hand, this also means that you cannot have different setups for different customers, as certain settings (like retention) are configured at tenant level.

#### Device registration {#device-registration}

<table>
<thead>
<colgroup>
   <col style="width: 70%;">
   <col style="width: 30%;">
</colgroup>
<tr>
<th style="text-align:left">Role Based Access Control</th>
<th style="text-align:left">Multi-tenancy</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">The common scenario in the RBAC setup is that the customer is not responsible for device registration, all devices are registered on the platform by the platform provider. However, it is still technically possible for a customer to register devices. The important detail in this case is that upon creating the registration entry the customer must specify the correct group to which the device belongs; otherwise the device would be created outside of any group and as customers can only see their groups they wouldn't be able to see the device.</td>
<td style="text-align:left">As customers have full access to their tenants they are free to register devices without any further limitations.</td>
</tr>
</tbody>
</table>

**Comparison:**

There is no technical limitation on who registers the device on the platform. However, care should be taken with the RBAC approach since customers can more easily make an incorrect configuration which registers the device without the customers being able to see it.


#### Access rights {#access-rights}

<table>
<thead>
<colgroup>
   <col style="width: 60%;">
   <col style="width: 40%;">
</colgroup>
<tr>
<th style="text-align:left">Role Based Access Control</th>
<th style="text-align:left">Multi-tenancy</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">There are two types of roles in {{< product-c8y-iot >}} – global and inventory. Global roles are applied at the tenant level. In an RBAC approach you must use the inventory roles in order to have the correct level of separation. Apart from some global permissions (like "own user management") customer users will not be assigned any roles. Inventory roles must be created, or the default roles used, and then assigned to the user in combination with the assets the roles apply to. This must be done at least once for each customer.</td>
<td style="text-align:left">As the tenant is completely separated from all other customers you do not necessarily need to be involved in setting up the access rights of the customer. If customers are given administration rights for their tenants they can set up permissions on their own. It is not possible for customers to have any sight or knowledge of other customers.</td>
</tr>
</tbody>
</table>

**Comparison:**

In the RBAC approach, managing access is the most complicated part as a misconfiguration can potentially give customers access to data that they mustn't see, like other customers' data. The inventory roles allow you to granularly define access for only certain parts of data but they don't protect you from accidental misconfigurations. Another limitation here is that customers won't be able to create their own roles.

For security aspects on access control see [Access control](/concepts/security/#access-control).


#### User management {#user-management}

<table>
<thead>
<colgroup>
   <col style="width: 60%;">
   <col style="width: 40%;">
</colgroup>
<tr>
<th style="text-align:left">Role Based Access Control</th>
<th style="text-align:left">Multi-tenancy</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">Using the user hierarchy feature you can delegate the user management to the customers, so that they are able to create new users on their own. Using this feature they are only allowed to create users with the same roles that they have (or less). Therefore you must assign all roles that the customer needs in total to the first user so that he can delegate those.</td>
<td style="text-align:left">Customers have full admin access to the user management and can also define their own roles.</td>
</tr>
</tbody>
</table>

**Comparison:**

Having a separate tenant for each customer they will not be limited with respect to user management and can fully utilize all management functionality. In the RBAC approach you can delegate certain management functionality and the platform will make sure that users can never overstep their boundaries. However, certain functionality like creating roles will only be available to full user management admins.

#### Application management {#application-management}

<table>
<thead>
<colgroup>
   <col style="width: 60%;">
   <col style="width: 40%;">
</colgroup>
<tr>
<th style="text-align:left">Role Based Access Control</th>
<th style="text-align:left">Multi-tenancy</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">Application management can only be done by admins. Customers will still be able to grant their users access to available applications (of course only to those they can access themselves) but they won't be able to create own applications.</td>
<td style="text-align:left">Customers are free to add applications into their tenant as they see fit. The microservice hosting feature is optional and therefore must be granted to the tenant by the {{< management-tenant >}}. This does not apply for UI applications.</td>
</tr>
</tbody>
</table>

**Comparison:**

Application management is only available on tenant level. If you want to give customers the ability to extend the platform on their own you will need to go for a separate customer tenant. In the RBAC approach you need to take care of the application management but it is still possible to have different applications for different customers. This is easily doable for UI applications however if you add microservices you need to manage it via access rights as the microservice is generally available for the whole tenant.


#### Invoicing and usage data {#invoicing-and-usage-data}

<table>
<thead>
<colgroup>
   <col style="width: 60%;">
   <col style="width: 40%;">
</colgroup>
<tr>
<th style="text-align:left">Role Based Access Control</th>
<th style="text-align:left">Multi-tenancy</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">The platform automatically collects usage data like API requests, storage space, number of users and devices. However, this is always on tenant level. Resolving which customer has how much devices is still doable via the API but you will not be able to separate storage space and API requests.
</td>
<td style="text-align:left">If your customers are subtenants of your own tenant you will be able to see and export the usage data for each tenant from your own tenant without requiring any access to your customers´ data. You also have the ability to set limits for your customers, thus ensuring they stay under certain usage amounts.</td>
</tr>
</tbody>
</table>

**Comparison:**

Choosing the RBAC approach limits you in the options for your business model as it will be impossible to get accurate usage data for the customers. A license based business model (for example per device) is far more feasible in the RBAC setup. Dealing with a multi-tenant setup gives you the option to select typical Cloud-based business models where you charge per API call and storage.


#### Analytics {#analytics}

<table>
<thead>
<colgroup>
   <col style="width: 60%;">
   <col style="width: 40%;">
</colgroup>
<tr>
<th style="text-align:left">Role Based Access Control</th>
<th style="text-align:left">Multi-tenancy</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">All data is available in a single database and therefore you can easily apply analytics on the data either using the Apama streaming analytics engine or external tools. Applying analytics to just one customer can be a bit more challenging as you must split the devices based on the customer group they belong to.
</td>
<td style="text-align:left">All data is split across multiple databases (one per tenant/customer) and you are not able to directly access all of them. You either need access to each tenant to extract the data or you are using features like data explorer to synchronize analytic-relevant data into a single tenant where you then can do your analytics.</td>
</tr>
</tbody>
</table>

**Comparison:**

If you are dealing with a single tenant it will be easier to do analytics across all devices of all customers but it might be more complicated to do separate analytics for just one customer. Having the data spread across multiple tenants will take additional effort to collect the data in one place for such use cases. However, it will ease deployment of custom analytics solutions per customer.

##### {{< product-c8y-iot >}} DataHub {#datahub}

{{< product-c8y-iot >}} DataHub currently does not support RBAC. Users who have access to DataHub on the tenant can offload any measurements, events, alarms, and inventory details into the same data lake regardless of the permission in use. Although it might be possible to restrict the offloading job to just data for a user this would require careful and manual configuration. DataHub currently only supports one data lake folder connection per tenant. Also note that only one user is created to access the data lake from analytical tools, therefore enforcing security on the data in the data lake is also currently not possible.
