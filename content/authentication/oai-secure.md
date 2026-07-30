---
title: OAI-Secure
weight: 71
layout: bundle
outputs:
  - html
  - json
sector:
  - platform_administration
helpcontent:
- label: oai-secure
  title: OAI-Secure
  content: "OAI-Secure is the recommended login mode. It exchanges the credentials in the initial request for a JWT token that is set as a cookie in the web browser or returned in the response body.


This tab describes the OAI-Secure session configuration, the token generation options, and how to retrieve a platform token using an X.509 certificate over standard HTTPS.


For selecting the preferred login mode, switch to the **Basic settings** tab."
---

OAI-Secure is the recommended login mode in {{< product-c8y-iot >}}. This tab describes the OAI-Secure session configuration and the available token generation options, as well as how to retrieve a platform token using an X.509 certificate over standard HTTPS.

To select OAI-Secure as the preferred login mode for your tenant, switch to the [**Basic settings**](/authentication/basic-settings/#login-settings) tab.

### OAI-Secure session configuration {#oai-secure-session-configuration}

OAI-Secure is a more secure alternative to the Basic Auth mode that also supports username and password login. In OAI-Secure mode the credentials in the initial request are exchanged for a JWT token that is set as a cookie in the web browser or returned in the response body. Based on the configuration OAI-Secure can support full session management or work as a standard JWT authentication where the user session lifetime is limited by the token expiration time.

#### OAI-Secure without the configuration related to the session management (session configuration turned off) {#oai-secure-without-the-configuration-related-to-the-session-management-session-configuration-turned-off}

When there is no configuration related to the session, OAI-Secure issues a JWT token with a certain lifetime. If the token expires then the user is forced to re-login because token refresh is not supported. This behavior is very inconvenient for the user if the token lifetime is short because the user is forced to re-login frequently.  

#### OAI-Secure with the configuration of the session management (session configuration turned on) {#oai-secure-with-the-configuration-of-the-session-management-session-configuration-turned-on}

Using OAI-Secure with session configuration is more convenient and secure, and can be used to achieve a behavior which is similar to the authentication based on HTTP sessions.

The OAI-Secure token acts as a session identifier on the client side (web browser). Such a token identifier which is stored in the cookie can have a preconfigured short lifetime. Then, the {{< product-c8y-iot >}} platform is responsible for renewing the session identifier without any user interaction. It is sufficient that the user's action causes the web browser to send a request to {{< product-c8y-iot >}}. Then, {{< product-c8y-iot >}} can examine if the renewing of the session identifier should be executed and perform the operation if necessary. {{< product-c8y-iot >}} offers extensive configuration related to this behavior so that tenant administrators can adjust the configuration to their needs.

If the **Use session configuration** option is enabled, the following settings can be configured on tenant level by a tenant administrator:

<table>
<col width="200">
<col width="600">
<col width="200">
<thead>
<tr>
<th style="text-align:left">Field</th>
<th style="text-align:left">Description</th>
<th style="text-align:left">Default</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">User agent validation required</td>
<td style="text-align:left">If turned on, the user agent sent in headers of consecutive requests in the scope of one session will be compared and a request with changed user agent will not be authorized.</td>
<td style="text-align:left">false</td>
</tr>
<tr>
<td style="text-align:left">Session absolute timeout</td>
<td style="text-align:left">Defines the maximum period of time that the user can use {{< product-c8y-iot >}} without having to re-authenticate.</td>
<td style="text-align:left">14 days</td>
</tr>
<tr>
<td style="text-align:left">Session renewal timeout</td>
<td style="text-align:left">Expected to be much shorter than the absolute timeout. Defines the time after which {{< product-c8y-iot >}} tries to provide a new token (session identifier). The renewal may take place only when {{< product-c8y-iot >}} receives an HTTP request from a client with a non-expired token and the period of time between obtaining the token and the execution of the request is greater than the renewal timeout.</td>
<td style="text-align:left">1 day</td>
</tr>
<tr>
<td style="text-align:left">Maximum parallel sessions per user</td>
<td style="text-align:left">Defines the maximum number of sessions which can be started by each user (for example on different machines or browsers). When a user exceeds this limit, then the oldest session will be terminated and the user will be logged out on this particular device.</td>
<td style="text-align:left">5 sessions</td>
</tr>
<tr>
<td style="text-align:left">Token lifespan</td>
<td style="text-align:left">Defines the time for which a token is active. The user is only able to access {{< product-c8y-iot >}} with a valid token. This configuration option is always available, it does not depend on session configuration. See <a href="#token-generation-with-oai-secure" class="no-ajaxy">Token generation with OAI-Secure</a> below. </td>
<td style="text-align:left">2 days</td>
</tr>

</tbody>
</table>

{{< c8y-admon-info >}}
The time parameters should depend on each other in the following manner: renewal timeout < token lifespan < absolute timeout.
Moreover, the renewal timeout should be approximately half of the token lifespan.      

Therefore, the recommended settings for a standard use case for OAI-Secure are the following:   

 * **Session absolute timeout**: 28 800 seconds (8 hours)        
 * **Session renewal timeout**: 2700 seconds (45 minutes)        
 * **Token lifespan**: 5400 seconds (90 minutes)

In such configurations, the idle timeout is in the range of 45 to 90 minutes, depending on when the last activity for the session was performed.
{{< /c8y-admon-info >}}

During the session token renewal the previous token is revoked and a new one is provided. The parameter `renewal token delay` defines the delay used to make this process smooth and not disturbing for the user. The old token is still valid for this period (1 minute by default). This way both tokens, old and new, are accepted by {{< product-c8y-iot >}}. This parameter is only configurable on platform level and cannot be modified by the tenant administrator.


### Token generation with OAI-Secure {#token-generation-with-oai-secure}

OAI-Secure is primarily based on JWT stored in a browser cookie. It can be also used to generate JWT in the response body.
The lifespan of the tokens and the cookie is configurable by tenant options belonging to the category `oauth.internal`.

#### Lifespan configuration of JWT stored in the cookie {#lifespan-configuration-of-jwt-stored-in-the-cookie}

JWT tokens stored in the browser cookie have a default validity time of two weeks.
This can be changed with tenant options:
 - category: `oauth.internal`;
 - key: `basic-token.lifespan.seconds`;

The minimum allowed value is 5 minutes.

For generating a token stored in a cookie, see [{{< openapi >}}](https://{{< domain-c8y >}}/api/core/#operation/postLoginFormCookie).

#### Lifespan configuration of cookies {#lifespan-configuration-of-cookies}

Cookies used to store a JWT token in a browser have their own validity time that can be changed with tenant options:
- category: `oauth.internal`;
- key: `basic-user.cookie.lifespan.seconds`;

The default value is two weeks. To have the cookie deleted when the user closes the browser, set it to any negative value.

#### Lifespan configuration of JWT in response body {#lifespan-configuration-of-jwt-in-response-body}

The lifespan of JWT tokens generated in the response body is configured with the following tenant options:
- category: `oauth.internal`;
- key: `body-token.lifespan.seconds`;

Refer to the [Tenant API](https://{{< domain-c8y >}}/api/core/#tag/Tenant-API) in the {{< openapi >}} for details on the tenant options. For generating a token in the response body, see [{{< openapi >}}](https://{{< domain-c8y >}}/api/core/#operation/postLoginFormBody).

### Retrieving a platform token using an X.509 certificate {#retrieving-a-platform-token-using-an-x509-certificate}

{{< product-c8y-iot >}} provides a REST endpoint that lets a client obtain a platform API access token by presenting an X.509 certificate over standard HTTPS (port 443), without requiring mutual TLS or MQTT. This is useful for clients that cannot use MQTT or the dedicated mTLS REST endpoint (typically exposed on port 8443) because of firewall, network, regulatory, or operational constraints.

The client sends its PEM-encoded leaf certificate or certificate chain to the endpoint and receives a platform access token in return. By default, the token is returned as a JWE encrypted with the public key from the presented certificate, so that only the holder of the corresponding private key can decrypt and use it; a plain JWT response is available only if that mode is explicitly enabled. The encryption profile (JWE compact serialization with RSA-OAEP-256 and AES-256-GCM) requires RSA certificates.

The endpoint reuses the existing certificate validation and tenant trust configuration: the certificate chain must be trusted according to the tenant's trust configuration, the same way as for device authentication with certificates. This tab does not repeat how trusted certificates (CA certificates) are uploaded and managed. For those details refer to:

- [Connecting devices using certificates](/device-certificate-authentication/device-certificates/) for an introduction to certificate-based authentication and X.509 certificates.
- [Managing trusted certificates](/device-certificate-authentication/managing-trusted-certificates/) for uploading and managing the trusted (CA) certificates in a tenant.

{{< c8y-admon-info >}}
Unlike the existing device certificate authentication, this endpoint is not limited to device users. A token can be issued for any eligible {{< product-c8y-iot >}} user type &mdash; device users, regular users, and microservice service users &mdash; provided the user exists in the tenant and is eligible for certificate-based authentication.
{{< /c8y-admon-info >}}

The endpoint is intentionally reachable without bearer-token authentication, because the submitted certificate and the platform-side certificate validation are the authentication proof. Invalid, expired, revoked, untrusted, unsupported, or unmapped certificates are rejected.

For the request and response details, including the required headers and the supported token response modes, see [{{< openapi >}}](https://{{< domain-c8y >}}/api/core/#operation/postCertificateAccessToken).
<!-- TODO(mbak-c8y): The anchor "operation/postCertificateAccessToken" does not exist in the
     published OpenAPI spec (https://cumulocity.com/api/core/dist/c8y-oas.yml) as of 2026-07-30,
     so the Link Checker fails on it (run
     https://github.com/Cumulocity-IoT/c8y-docs/actions/runs/30535957097). The closest published
     operationIds are postDeviceAccessTokenResource and postTrustedCertificatePopResource, which
     are different endpoints - so this was not auto-corrected. Please confirm the final
     operationId, or that this is expected to stay broken until the spec for the release that
     ships this endpoint is published. -->


{{< c8y-admon-important >}}
A single certificate Common Name (CN) can potentially resolve to more than one {{< product-c8y-iot >}} user. For example, a regular user may be represented by the username derived directly from the certificate CN (`my-client`), while a device user may be represented by applying the `device_` prefix to the same CN (`device_my-client`).

If a certificate identity resolves to more than one eligible user, the platform does not choose one implicitly. Instead, the token request is rejected and no token is issued (fail-closed behavior). This prevents the same certificate from being used silently for different user identities.
{{< /c8y-admon-important >}}
