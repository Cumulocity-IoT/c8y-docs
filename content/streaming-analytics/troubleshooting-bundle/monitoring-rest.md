---
weight: 50
title: Monitoring REST endpoints
layout: redirect
---


The following monitoring endpoints are available for REST requests. These require authentication as a valid user, but do not require any special roles.

- `/service/cep/health`  
    GET only. JSON.  
    Obtains information on whether the Apama-ctrl microservice is up or not.

    {{< c8y-admon-info >}}
  For Apama-ctrl-smartrulesmt (that is, the multi-tenant variant of the Apama-ctrl-smartrules microservice), only basic microservice status values are provided.
    {{< /c8y-admon-info >}}
- `/service/cep/prometheus`  
    GET only. Plain text format.  
    Prometheus metrics from the correlator and microservice. For details, see [Monitoring with Prometheus]({{< link-apama-webhelp >}}/deploying-and-managing-apama-applications/deploying-and-managing-apama-applications-how-this-book-is-organized#monitoring-with-prometheus) in the Apama documentation.
