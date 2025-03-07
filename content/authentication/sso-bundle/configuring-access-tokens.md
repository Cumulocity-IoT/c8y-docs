---
weight: 50
title: Using access tokens from the authorization server
layout: redirect
sector:
  - platform_administration
---

You can directly request {{< product-c8y-iot >}} to use OAuth2 access tokens from your authorization server.
This way, your applications or users can access resources without logging in to the platform
or using Basic authentication. This leverages your authorization server to get access tokens for your applications which you can send in subsequent request to
{{< product-c8y-iot >}}.

{{< c8y-admon-req >}}
This feature requires the following on top of the general requirements:

* Your authorization server must support the OAuth2 client credentials grant type.
* All microservices are built with Microservice Java SDK version 1018.6.0 or higher. For custom-built microservices, refer to [Security](/microservice-sdk/general-aspects/#security).

{{< /c8y-admon-req >}}

### To configure authentication with access tokens from authorization servers {#to-configure-authentication-with-access-tokens-from-authorization-servers}

Enable or disable this authentication option in the **External token configuration** section.
![External token disabled](/images/users-guide/Administration/sso-access-token-external-iam-disabled.png)

If enabled, this authentication takes precedence over the standard [JWT token authentication](https://{{< domain-c8y >}}/api/core/#section/Authentication/JWT-IAM), which means, for example, that an HTTP request to {{< product-c8y-iot >}} with the header `Authorization: Bearer {{access token}}` assumes that the source of the access token is your authorization server instead of the token being issued by {{< product-c8y-iot >}}.
Configure the user ID or the application ID to any top-level claim in the access token.

![External token user id](/images/users-guide/Administration/sso-access-token-external-iam-user-id-config.png)

{{< product-c8y-iot >}} creates a user which gets assigned the configured user ID or application ID. Additionally, this user is granted the roles to access to the applications defined in the **Access mapping** section.

{{< c8y-admon-info >}}
If it is set, the configuration allows you to create a {{< product-c8y-iot >}} user representing your applications (the access tokens are obtained via the *client credentials flow*),
or the users of your authorization server (the access tokens are obtained with the *password grant type*).
{{< /c8y-admon-info >}}

By default, {{< product-c8y-iot >}} verifies that the token is not expired and its signature matches the signature you have configured earlier.
You can strengthen the validation of the token by configuring either an introspection or a user info validation with the necessary credentials.
This way, the platform knows if the access tokens were intentionally invalidated or expired. You cannot access {{< product-c8y-iot >}} resources with an invalidated access token.

### Introspection endpoint {#introspection-endpoint}

{{< product-c8y-iot >}} uses token introspection to verify the validity of the access tokens of your applications. In general, this endpoint can be used for access tokens obtained via the client credentials flow or any other OAuth2 flow.

To configure the introspection, provide an introspection endpoint and a URL-encoded (x-form-urlencoded) body containing the access token, the client ID and the client secret, and an "Authorization" request header.  
{{< product-c8y-iot >}} requests the introspection endpoint of your authorization server to query the status of the access token.
If the token is active, proceed with verifying the token signature.

![External token introspection validation](/images/users-guide/Administration/sso-access-token-external-iam-introspection-validation.png)

You can configure the **Access token validation frequency** to set how often the introspection is performed
as it may be costly to always call the authorization server for the same access token. The validation status of the token is cached internally for the specified time.
If the token is revoked in the meantime, {{< product-c8y-iot >}} will only be aware during the next validation, that is, the token is still considered until the next validation.
To avoid this, use a frequency. The default value is one minute.

![External token validation interval](/images/users-guide/Administration/sso-access-token-external-iam-validation-interval.png)

### User info endpoint {#user-info-endpoint}

The user info request can also be used to check the validity of the access token of your users.
Unlike introspection, a user info request requires a user context. This means you cannot use it to validate access tokens obtained with the client credentials flow.

![External token userinfo validation](/images/users-guide/Administration/sso-access-token-external-iam-userinfo-validation.png)

{{< c8y-admon-caution >}}
If you use one of the two validation methods, make sure that your authorization server exposes the introspection or the user info endpoint.
{{< /c8y-admon-caution >}}
