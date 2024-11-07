---
weight: 10
title: Managing users
layout: bundle
outputs:
  - html
  - json
sector:
  - platform_administration
helpcontent:
  - label: managing-users
    title: Managing users
    content: "The Cumulocity IoT user management allows you to manage the users within your tenant. You can create new users, assign usernames and passwords, store user details, or configure the login and security options.  


    Moreover you can select the global roles for a user, see also *Managing permissions* in the user documentation."
---

The **user management feature** allows you to manage the users within your tenant, that is create users, store user details, or configure login and security options.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

"User management" permission type:
* To view users: READ permission
* To manage (create, edit, delete, disable/enable, delegate, manage permissions) all existing users: ADMIN permission
* To create users: CREATE permission

"Own user management" permission type (has no influence on user management capabilities):
* To view the own user: READ permission
* To edit the own user: ADMIN permission

Note that each user created on the platform can edit its own information by default, regardless of the "Own user management" permissions. The purpose of the "Own user management" permission is to manage specific users created for technical purposes, for example, by microservices, and determine whether such users can be managed by respective services.

On tenant creation, there are default roles available that can be used as a sample configuration for the above mentioned permissions:
* Global User Manager - Can access and modify the full user hierarchy
* Shared User Manager - Can create new users as his own subusers and manage them ("feature-user-hierarchy" application subscription required)

Note that when subscribed to the "feature-user-hierachy" application, the CREATE permission allows to manage (display, create, edit, delete, disable/enable, delegate, manage permissions) underlying users. For details see [Managing user hierarchies](/enterprise-tenant/managing-user-hierarchies).
{{< /c8y-admon-req >}}

For users created via an external authorization server, updating the following settings in {{< product-c8y-iot >}} will have no effect (will be reset on the next user re-login):

* user info (login alias, email, first name, last name, telephone)
* global roles - configurable via SSO access mapping
* application access - configurable via SSO access mapping
* inventory roles assignments - configurable via SSO access mapping

Moreover, password reset in {{< product-c8y-iot >}} is disabled for users created through an external authentication server.

{{< c8y-admon-info >}}
Users which are using single sign-on cannot change the password of users which are managed by the platform.
{{< /c8y-admon-info >}}

{{< c8y-admon-related >}}
- [Platform administration > {{< standard-tenant >}} management > Managing permissions](/standard-tenant/managing-permissions) for details on assigning roles and permissions to users.
- [Getting started > Technical concepts > Tenant hierachy](/concepts/tenant-hierarchy) for information on the concept of multi-tenancy as opposed to user access control.
- [Users](https://{{< domain-c8y >}}/api/core/#tag/Users) in the {{< openapi >}} for managing users via REST.
{{< /c8y-admon-related >}}

### To view users {#to-view-users}

To view all users in your tenant, click **Users** in the **Accounts** menu in the navigator.

![Expanded view](/images/users-guide/Administration/admin-users-list.png)

A user list will be displayed, providing the following information for each user:

* The username that is used to access the tenant.
* The name and email of the user (if set).
* The global roles assigned to the user.
* The [strength](/get-familiar-with-the-ui/user-settings/#to-change-your-password) of the password set for the user

To filter the list by username, you can use the filter field at the left of the top menu bar. With the dropdown list you can filter by global roles. For details on filtering, see [Filtering](/getting-started/gui-features/#filtering).

In order to apply the selected filters click **Apply**.

Initially, the **User** page only shows the top-level users. To see all users in your account at once, click **Expand all** at the right of the top bar. This will expand all top-level users, showing their sub-users. Click **Collapse all** to just show the top-level users again. For details on user hierarchies, refer to [Managing user hierarchies](/enterprise-tenant/managing-user-hierarchies).


### To add a user {#to-add-a-user}

1. Click **Add user** at the right of the top menu bar.  
  {{< c8y-admon-info >}}
If single sign-on is enabled for your tenant, a message will show up which reminds you that you are about to create a local user which will not be able to login via single sign-on. Create new users in **My Cloud** instead, accessible through the application switcher in the upper right corner, to enable them using the single sign-on feature.
  {{< /c8y-admon-info >}}

2. At the left of the **New user** window, provide the following information to identify the user:

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
              <td align="left">Username</td>
              <td align="left">Serves as a unique user ID to identify the user at the system. Note that the username cannot be changed once the user has been created. This field is mandatory.</td>
          </tr>
          <tr>
              <td align="left">Login alias</td>
              <td align="left">In addition to the username, an optional alias can be provided to be used to log on. In contrast to the username, this alias may be changed if required. The login alias cannot be the same as the username. Note that the login alias is not supported for devices.
             </td>
          </tr>
          <tr>
              <td align="left">Status</td>
              <td align="left">Enable/disable the user account here. If the user account is disabled the user cannot login.</td>
          </tr>
         <tr>
             <td align="left">Email</td>
             <td align="left">A valid email address. This field is mandatory.</td>
          </tr>
          <tr>
             <td align="left">First name</td>
             <td align="left">First name of the user.</td>
          </tr>
          <tr>
             <td align="left">Last name</td>
             <td align="left">Last name of the user.</td>
          </tr>
          <tr>
             <td align="left">Telephone</td>
             <td align="left">A valid phone number. The phone number is required if the user is configured to use two-factor authentication.</td>
          </tr>
          <tr>
             <td align="left">Owner</td>
             <td align="left">Another user that manages ("owns") the new user. Select a user from the dropdown list and click <strong>Done</strong> to confirm. Refer to <a href="/enterprise-tenant/managing-user-hierarchies">Managing user hierarchies</a> for details on user hierarchies.</td>
          </tr>
          <tr>
             <td align="left">Delegated by</td>
             <td align="left">Can be activated to delegate user hierarchies and permissions to the user. Refer to <a href="/enterprise-tenant/managing-user-hierarchies">Managing user hierarchies</a> for details on delegation.</td>
          </tr>
      </tbody>
      </table>

      For additional information see [User options and settings](/get-familiar-with-the-ui/user-settings).


3. Select the login options for the user.
	* 	**Two-factor authentication (SMS)** - if selected, the user will receive a verification code via SMS which is required to complete the authentication. The SMS will be sent to the phone number configured above. For details refer to [Two-factor authentication](/authentication/tfa/).
	* **User must reset password on next login** - if selected, you must provide a password which the user must reset on the next login. Enter a password and confirm it. While entering the password, the strength of the password will be checked. See [To change your password](/getting-started/user-settings/#to-change-your-password) for further information on password reset and strength.  
	* **Send password reset link as email** - if selected, the user will receive an email message with a link to set a password. The email will be sent to the email address configured above. This option is only available during user creation.
<br><br>
4. On the right of the page, select the global roles for the user. Details on global roles are described in [Managing permissions](/standard-tenant/managing-permissions).
5. Click **Save** to save your settings.

The new user will be added to the user list.

{{< c8y-admon-info >}}
By default, manually created users always have the "Own user management" permissions set to active.
{{< /c8y-admon-info >}}

### To edit a user {#to-edit-a-user}

1. Click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the right of the respective row and then click **Edit**. All fields except **Username** and **Send password reset link as email** can be changed. For details on the fields, see [To add a user](#to-add-a-user).
2. Click **Change password** to change the password.
3. Click **Save** to apply your settings.


### To copy inventory roles {#to-copy-inventory-roles}

1. Click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the right of the respective row and then click **Copy inventory roles from another user**.
2. In the resulting dialog box, select if you want to merge the roles to be copied with the existing user roles (the default) or if you want to replace the existing user roles.
3. Select the user from which you want to copy roles from the dropdown list.
4. Click **Copy**.

The inventory roles will be copied from the selected user.

### To delegate/undelegate user hierarchies {#to-delegateundelegate-user-hierarchies}

Click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the right of the respective row and then click **Delegate** to delegate your user hierarchies and permissions to a user.

Click **Undelegate** to remove a delegation.

Refer to [Managing user hierarchies](/enterprise-tenant/managing-user-hierarchies) for details on delegation.

### To disable/enable a user {#to-disableenable-a-user}

Click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the right of the respective row and then click **Disable** to disable an active user, or click **Enable** to enable a user that has been disabled.

### To delete a user {#to-delete-a-user}

Click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the right of the respective row and then click **Delete**.

### To log out all users {#to-log-out-all-users}

In the event of a security incident involving the session tokens of your tenant's users, you can invalidate any tokens currently in use.

To log out all users click **Log out all users**  at the right of the top menu bar. This logs out all users currently logged in via OAI-Secure or single sign-on redirect. JWT tokens retrieved by all devices in the current tenant are also invalidated.

Note that, if basic authentication is used, users logged in via base64 token are not logged out.

{{< c8y-admon-req >}}
To log out all users, you must have ADMIN permission for the permission type "User management".
{{< /c8y-admon-req >}}
