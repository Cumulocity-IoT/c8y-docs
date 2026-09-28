---
title: Introduction
layout: redirect
sector:
  - platform_administration
weight: 10
---
The two-factor authentication (TFA) is an extra layer of security that only completes authentication with a combination of two different factors: something the users know (username and password) and something they have (for example, smartphone) or something they are (for example, fingerprint).

There are two possible TFA strategies: Short Message Service (SMS) and Time-based One-Time Password (TOTP). Only one of them can be active at a time.

To check whether TFA is enabled for a certain user, go to the **Users** page and see the TFA status column right from the password strength column. A key icon indicates that TFA is enabled and by hovering over it you can see the strategy that is being used.

![TFA status](/images/users-guide/Administration/admin-tfa-sms.png)

{{< c8y-admon-related >}}
- [Platform administration > Authentication > Basic settings](/authentication/basic-settings/) for information on how to configure basic authentication settings.
- [Authentication](https://{{< domain-c8y >}}/api/core/#section/Authentication) in the {{< openapi >}} for details on managing authentication via REST.
{{< /c8y-admon-related >}}
