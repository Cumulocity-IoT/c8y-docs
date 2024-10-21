---
weight: 10
title: Introduction
layout: redirect
sector:
  - platform_administration
---

{{< product-c8y-iot >}} provides single sign-on (SSO) functionality, that allows a user to login with a single 3rd-party authorization server using the OAuth2 protocol, for example Azure Active Directory (AAD). Currently authorization code grant is supported with access and ID tokens in form of JWT. SAML is not supported.
On top of standard SSO, {{< product-c8y-iot >}} also allows you to access the platform resources using access tokens from your authorization server directly as a Bearer token. For details refer to [Using access tokens from the authorization server](#configuring-access-tokens).

{{< c8y-admon-req >}}
To use the SSO feature the following requirements must be met:

* The authorization server you use supports OAuth2 authorization code grant.
* The token is issued as JWT and you know what goes into the token content.
* The JWT must consist of a unique user identifier, "iss" (issuer), "aud" (audience) and "exp" (expiration time) fields.
* All microservices are built with Microservice Java SDK version 10.4.6 but preferably higher. For custom-built microservices, refer to [Security](/microservice-sdk/concept/#security).
* For on premises installation the domain-based tenant resolution is configured properly.
* For {{< enterprise-tenant >}}s, the enterprise domain must be set up as redirect URI in the basic configurations. If SSO providers have a list of allowed domains, the enterprise domain should be added to that list.
* You must assign a role to the user with at least READ permission for "Own user management", otherwise the user cannot log in.
* Users must have cookies enabled in the browser settings, as the SSO feature is built on top of cookies technology.
{{< /c8y-admon-req >}}

{{< c8y-admon-related >}}
- [Platform administration > Authentication > Basic settings](/authentication/basic-settings/) for information on how to configure basic authentication settings.
- [Authentication](https://{{< domain-c8y >}}/api/core/#section/Authentication) in the {{< openapi >}} for details on managing authentication via REST.
{{< /c8y-admon-related >}}
