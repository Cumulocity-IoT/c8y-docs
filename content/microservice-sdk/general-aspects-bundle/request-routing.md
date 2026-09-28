---
weight: 90
title: Request routing
layout: redirect
---

The request is redirected to a microservice depending on the isolation level (auto-scaling is ignored at this moment for clarity), subscription and authorization. A typical request to the platform looks like

```http
<METHOD>  /service/<MICROSERVICE>/<MICROSERVICE_ENDPOINT>
Host: ...
Authorization: Basic ...
```

Credentials are used to verify if a requesting user is authorized to access the microservice, and tenant subscription is verified afterwards. If both checks pass, the request is routed to a dedicated microservice deployment in case that the isolation level is per tenant, or to a shared deployment in case of multi-tenant isolation.

The routed request is stripped of <kbd>/service/&lt;MICROSERVICE&gt;</kbd> part. However, the Authorization header is not modified, thus a request is still executed as a tenant platform user.

```http
<METHOD>  /<MICROSERVICE_ENDPOINT>
Host: ...
Authorization: Basic ...
```
