---
weight: 120
title: O
layout: bundle
sector:
  - getting_started
build:
  render: false

---

### Operation {#operation}

Operations are instructions sent to a [device](#device) or [asset](#asset) to perform a specific action, such as control, configuration, or maintenance. Operations are linked to a source [managed object](#managed-object), and are delivered asynchronously via {{< product-c8y-iot >}}’s reliable queuing mechanism. Devices execute operations and report results back, enabling consistent remote management and automation. Typical operations include installing a new firmware, switching a relay in a power meter or sending a credit to a vending machine.  


### Owner {#owner}

The [user](#user) who creates an [inventory](#inventory) object (such as a [device](#device) or a [group](#group)) automatically becomes its owner. Ownership grants users full [permission](#permission) (ADMIN, READ, CHANGE) for that specific object to ensure that they can fully manage the resources they create.  

{{< c8y-details title="Developer details" >}}
Ownership is an implicit permission model enforced by the platform's core APIs. When a user creates an object via `POST /inventory/managedObjects`, the owner field of the new object is automatically set to that user's ID.
{{< /c8y-details >}}  
