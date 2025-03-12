---
title: TOTP
layout: redirect
sector:
  - platform_administration
weight: 30
---

{{< c8y-admon-req >}}
Users must install a TOTP application on their smartphone (Google Authenticator is recommended), freely available both on App Store and Play Store.
{{< /c8y-admon-req >}}

### To enable a specific user {#to-enable-a-specific-user}

1. In the Administration application, navigate to **Accounts** > **Users** and select a user in the **Users** page.
2. Select the checkbox next to **Two-factor authentication (TOTP)**. This option is available only if the user has TOTP configured. If this is not the case, select **Enforce TOTP setup for the user**.
3. Click **Save**.

![Enable TFA](/images/users-guide/Administration/admin-user-enable-tfa-1.png)

### To set up TOTP {#to-set-up-totp}

Opposed to the SMS strategy TOTP must be set up by each user. By opening **User settings** in the top right corner and then clicking **Set up two-factor authentication** they can start the setup process.

![Trigger TOTP setup](/images/users-guide/Administration/admin-user-enable-tfa-2.png)

IF TFA is enabled, the user will be presented a QR code at login, that must be scanned with the previously installed TOTP mobile application.

Alternatively, the secret can also be inserted manually in case scanning the QR code is not an option.

![TOTP setup process](/images/users-guide/Administration/admin-user-tfa-setup.png)

After this process the mobile application will generate a new code every 30 seconds that can be used to complete the authentication process.

### To revoke the secret {#to-revoke-the-secret}

If a user loses access to the TFA code, for example, if a user loses the phone or uninstalls the application, and needs to set it up again, the secret must be revoked.
TOTP must be set up by each user individually.

{{< c8y-admon-req >}}

Users can not revoke their own TOTP secret. The secret of a user is only revoked by their respective parent user.
See [Managing user hierarchies](/enterprise-tenant/managing-user-hierarchies/) for detailed information on user hierarchies.

ROLES & PERMISSIONS:

- To revoke a secret: ADMIN or CREATE permission for permission type "User management"

{{< /c8y-admon-req >}}

1. In the Administration application, navigate to **Accounts** > **Users** and select a user in the **Users** page.
2. Scroll down to **Login options**.
3. Click **Revoke TOTP secret**.
4. Confirm by clicking **Revoke**.

![TOTP secret revoke](/images/users-guide/Administration/admin-user-totp-revoke.png)

### To disable TOTP for a user {#to-disable-totp-for-a-user}

If a user wants to turn off the use of TOTP (and thus TFA) completely, the secret must be revoked and TOTP enforcement must be disabled.
TOTP must be set up by each user individually.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

- To revoke a secret: ADMIN or CREATE permission for permission type "User management"
- To disable TOTP enforcement: ADMIN permission for permission type "User management"

{{< /c8y-admon-req >}}

To disable TOTP for a user follow these steps:

1. In the Administration application, navigate to **Accounts** > **Users** and select the user in the **Users** page.
2. Scroll down to **Login options**.
3. Clear the **Enforce TOTP for the user** checkbox.
4. Click **Revoke TOTP secret**.
5. Confirm by clicking **Revoke**.
6. Click **Save** to save your changes.

![TOTP disable user](/images/users-guide/Administration/admin-user-totp-disable.png)
