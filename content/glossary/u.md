---
weight: 170
title: U
layout: bundle
sector:
  - getting_started
_build:
  render: false

---


### User {#user}

An individual account within a {{< product-c8y-iot >}} [tenant](#tenant), identified by a unique username. Users are assigned [roles](#role) with specific [permissions](#permission) that determine their access rights to data and functionalities.

{{< c8y-details title="Developer details" >}}
Users are managed via the [User API](https://cumulocity.com/api/core/#tag/User-API) (`/user/users`). This includes creating (POST), retrieving (GET), updating (PUT), and deleting (DELETE) users. Role assignments are managed via sub-resources like `/user/users/{username}/roles`.
{{< /c8y-details >}}


### User hierarchy {#user-hierarchy}

An optional feature allowing the creation of hierarchical relationships between [users](#user). This enables parent users to manage their sub-users and delegate [permissions](#permission).

{{< c8y-details title="Developer details" >}}
User hierarchies are managed via the [User API](https://cumulocity.com/api/core/#tag/User-API) (`/user/users`). Creating/updating a user with an owner property establishes the hierarchy.
{{< /c8y-details >}}  
