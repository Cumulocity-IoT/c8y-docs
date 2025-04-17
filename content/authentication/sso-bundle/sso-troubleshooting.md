---
weight: 70
title: Troubleshooting
layout: redirect
sector:
  - platform_administration
---

It can be particularly helpful to inspect the content of the authorization token sent to the platform as some of its fields contain the information required for the correct configuration described above.

In the Administration application, click **Accounts** > **Audit logs** and filter by the category "Single sign-on" and look for entries "Json web token claims".

The contexts of the token will be presented in JSON format.

![Audit token content](/images/users-guide/Administration/admin-sso-audit-token.png)
