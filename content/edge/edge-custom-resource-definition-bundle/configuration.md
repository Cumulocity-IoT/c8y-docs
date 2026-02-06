---
weight: 10
title: Configuration
layout: redirect
---

The initial part of the CR defines the CRD details, and the CR name and namespace, which referred to in this document as **`EDGE-CR-NAME`** and **EDGE-CR-NAMESPACE**.

```yaml
apiVersion: edge.cumulocity.com/v1  
kind: CumulocityIoTEdge
metadata:
  name: <EDGE-CR-NAME>
  namespace: <EDGE-CR-NAMESPACE>
```
