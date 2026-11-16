---
weight: 50
title: Integration with Azure AD
layout: bundle
sector:
  - platform_administration
---


The integration was successfully verified against Azure AD using OAuth2 and OpenID Connect (SAML is not supported). The configuration steps are available in [https://docs.microsoft.com/en-us/azure/active-directory/develop/v1-protocols-oauth-code](https://docs.microsoft.com/en-us/azure/active-directory/develop/v1-protocols-oauth-code).

The following steps illustrate how to use Azure AD (Azure Active Directory) for SSO in {{< product-c8y-iot >}}.

{{< c8y-admon-req >}}
You need administrative access to your Azure AD.
{{< /c8y-admon-req >}}

### To configure Azure AD {#to-configure-azure-ad}

To connect {{< product-c8y-iot >}} to Azure AD, you must create an App registration in Azure AD.  

1. Select **App Registrations** under **Manage** on the left and at the top click **New Registration**.
3. In the resulting window, provide a name for the new App registration.
4. As **Redirect URI type** select "Web" and enter the URL to your tenant OAuth endpoint, for example "https:&#47;/documentation.cumulocity.com/tenant/oauth". You can derive this value from your {{< product-c8y-iot >}} tenant. Navigate to **Administration** > **Settings** > **Authentication** > **Single sign-on**. The redirect URL is prefilled by the platform. 
Optionally, set for example, "https:&#47;/<tenant_domain>/apps/*" if in the {{< product-c8y-iot >}} SSO configuration `Redirect to the user interface application` is enabled.
5. Click **Register** to create the App registration.

The overview in the details page of your App registration contains several IDs and endpoints that you need later on, like the Application (client) ID and the Directory (tenant) ID (for your tenant in {{< product-c8y-iot >}}).

![App registration overview](/images/users-guide/Administration/admin-AAD-registration.png)

Moreover, the App registration requires a secret which is used by {{< product-c8y-iot >}} for the authentication.  

1. In the details page of your App registration, click **Certificates & secrets** under **Manage** on the left.
2. Select **New client secret**.
3. Enter a description and select an expiry time.
4. Click **Add** to add the secret.  

{{< c8y-admon-caution >}}
- Copy the value of the new secret to another location. It will no longer be visible once you have left the page.
- The secret string must not include a "=" character as this may conflict with the later usage in a URL. If it does, create a new one.  
{{< /c8y-admon-caution >}}

Optionally, create a user in Azure AD that you would like to use with {{< product-c8y-iot >}}.

### To configure SSO for Azure AD in {{< product-c8y-iot >}} {#to-configure-sso-for-azure-ad-in-platform}

Navigate to **Settings > Authentication** in the Administration application and switch to the **Single sign-on** tab.

Retrieve the relevant information by a GET request to:

<code>https://login.microsoftonline.com/&lt;Directory tenant ID&gt;/.well-known/openid-configuration</code>

The response will look like this:

```
  {
      "token_endpoint": "https://login.microsoftonline.com/4d17551b-e234-4e18-9593-3fe717102dfa/oauth2/token",
      "token_endpoint_auth_methods_supported": [
          "client_secret_post",
          "private_key_jwt",
          "client_secret_basic"
      ],
      "jwks_uri": "https://login.microsoftonline.com/common/discovery/keys",
      "response_modes_supported": [
          "query",
          "fragment",
          "form_post"
      ],
      "subject_types_supported": [
          "pairwise"
      ],
      "id_token_signing_alg_values_supported": [
          "RS256"
      ],
      "response_types_supported": [
          "code",
          "id_token",
          "code id_token",
          "token id_token",
          "token"
      ],
      "scopes_supported": [
          "openid"
      ],
      "issuer": "https://sts.windows.net/4d17551b-e234-4e18-9593-3fe717102dfa/",
      "microsoft_multi_refresh_token": true,
      "authorization_endpoint": "https://login.microsoftonline.com/4d17551b-e234-4e18-9593-3fe717102dfa/oauth2/authorize",
      "device_authorization_endpoint": "https://login.microsoftonline.com/4d17551b-e234-4e18-9593-3fe717102dfa/oauth2/devicecode",
      "http_logout_supported": true,
      "frontchannel_logout_supported": true,
      "end_session_endpoint": "https://login.microsoftonline.com/4d17551b-e234-4e18-9593-3fe717102dfa/oauth2/logout",
      "claims_supported": [
          "sub",
          "iss",
          "cloud_instance_name",
          "cloud_instance_host_name",
          "cloud_graph_host_name",
          "msgraph_host",
          "aud",
          "exp",
          "iat",
          "auth_time",
          "acr",
          "amr",
          "nonce",
          "email",
          "given_name",
          "family_name",
          "nickname"
      ],
      "check_session_iframe": "https://login.microsoftonline.com/4d17551b-e234-4e18-9593-3fe717102dfa/oauth2/checksession",
      "userinfo_endpoint": "https://login.microsoftonline.com/4d17551b-e234-4e18-9593-3fe717102dfa/openid/userinfo",
      "kerberos_endpoint": "https://login.microsoftonline.com/4d17551b-e234-4e18-9593-3fe717102dfa/kerberos",
      "tenant_region_scope": "EU",
      "cloud_instance_name": "microsoftonline.com",
      "cloud_graph_host_name": "graph.windows.net",
      "msgraph_host": "graph.microsoft.com",
      "rbac_url": "https://pas.windows.net"
  }
```


Now enter the following values in the configuration:

|Azure|{{< product-c8y-iot >}} |Value
|:---|:---|:---|
|Login URL; OpenID config; Beginning of token endpoint| Azure AD address|Address of your Azure AD tenant, for example "https:&#47;/login.microsoftonline.com"  
|Home > Overview > Primary Domain| Tenant| &lt;directoryName&gt;.onmicrosoft.com, for example "admtest.onmicrosoft.com"
|OpenID config “issuer”| Token issuer| Token issuer value in form of a HTTP address: "https:&#47;/sts.windows.net/&lt;Directory tenant ID&gt;/". Note that this won´t work without the tailing slash.
|App registration > &lt;app&gt; > Application (client) ID| Application ID| for example "7fd1ed48-f4b6-4362-b0af-2b753bb1af2b"
|Redirect URI| |Address of your {{< product-c8y-iot >}} tenant followed by "/tenant/oauth", or optionally followed by "/apps/*" when `Redirect to the user interface application` is enabled.
|App registration - &lt;app&gt; > Certificates & secrets > Value | Client secret| Azure AD client secret, for example "hE68Q~uC1.BlSzGJSDC3_UEFvvyIZvRcCxbvV345"
|From OpenID config | Public key discovery URL|"https:&#47;/login.microsoftonline.com/common/discovery/keys" or "https:&#47;/login.microsoftonline.com/<Directory tenant ID>/discovery/keys"

Optionally single logout can be configured:

|Field|Description|
|:---|:---|
|Redirect after logout| Activates single logout by redirecting the user, after logout, to the authorization server logout endpoint
|Redirect URL| Address to redirect the user to after successful logout from the authorization server

After configuring SSO in {{< product-c8y-iot >}}, you can try to login. You might get an "access denied" error, if this user has no access mapping yet. But you should see a "User login" event and a JSON web token in the audit logs (**Administration** > **Accounts** > **Audit logs**).

The content looks like this:

```
{
    "typ": "JWT",
    "alg": "RS256",
    "x5t": "2ZQpJ3UpbjAYXYGaXEJl8lV0TOI",
    "kid": "2ZQpJ3UpbjAYXYGaXEJl8lV0TOI"
} {
    "aud": "7fd1ed48-f4b6-4362-b0af-2b753bb1af2b",
    "iss": "https://sts.windows.net/4d17551b-e234-4e18-9593-3fe717102dfa/",
    "iat": 1660815959,
    "nbf": 1660815959,
    "exp": 1660820080,
    "acr": "1",
    "aio": "ASQA2/8TAAAAg0xPUeu6HKAlgK3vZJsW8TdejlNB3BGSz4XFmJLzPt0=",
    "amr": [
        "pwd"
    ],
    "appid": "7fd1ed48-f4b6-4362-b0af-2b753bb1af2b",
    "appidacr": "1",
    "family_name": "Doe",
    "given_name": "Jane",
    "ipaddr": "51.116.186.93",
    "name": "Jane Doe",
    "oid": "afbff765-592e-4ae1-9334-b968dad59c84",
    "rh": "0.AXkAG1UXTTTiGE6Vkz_nFxAt-kjt0X-29GJDsK8rdTuxryuUAAw.",
    "scp": "openid User.Read User.Read.All User.ReadBasic.All",
    "sub": "zRTnTukAjU11ME1aqiPMOdwk9jVNmInXbeuoUr_3cYk",
    "tid": "4d17551b-e234-4e18-9593-3fe717102dfa",
    "unique_name": "jane@admtest.onmicrosoft.com",
    "upn": "jane@admtest.onmicrosoft.com",
    "uti": "IcTqpKPIA0G_P1Lyw6xBAA",
    "ver": "1.0"
} [
    256 crypto bytes
]
```

You can now use the claims to map user attributes and give permissions in the same way as described in [Custom template configuration](#custom-template).
