---
weight: 65
title: F
layout: bundle
sector:
  - getting_started
_build:
  render: false

---

### Fragment {#fragment}

Fragments are JSON objects used to extend {{< product-c8y-iot >}}'s core data types, such as [managed objects](#managed-object), [events](#event), and [operations](#operation). They are the primary mechanism for creating a flexible and extensible [domain model](#domain-model), allowing the representation of any [asset](#asset) or [device](#device) without a rigid, predefined database schema.

{{< c8y-details title="Developer details" >}}
Fragments are embedded within other resources and are managed as part of their parent resource via the respective APIs (for example, updating a `c8y_Position` fragment via `PUT /inventory/managedObjects/{id}`).
{{< /c8y-details >}}

### Fragment library {#fragment-library}

The fragment library defines the data structures that are used in {{< product-c8y-iot >}} for device management activities like, for example, [configuration management](#configuration-management). The data structures are expressed as [fragments](#fragment) that can be used inside [managed objects](#managed-object), [operations](#operation) and other resources.  

See also [Fragment library](/device-integration/fragment-library/) in the documentation.

{{< c8y-details title="Developer details" >}}
The fragment library is a conceptual, documented library of standard JSON structures (fragments) that define the platform's data model for common device capabilities. It serves as a developer reference for building integrations using REST and SmartREST APIs.
{{< /c8y-details >}}
