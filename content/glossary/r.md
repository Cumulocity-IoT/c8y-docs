---
weight: 140
title: R
layout: bundle
sector:
  - getting_started
---

### RBAC (Role-Based Access Control){#rbac}

A security model used by {{< product-c8y-iot >}} in which [permissions](#permission) are grouped into [roles](#roles), and these roles are then assigned to [users](#user) or user groups. This allows administrators to manage access based on a user's function or responsibilities.  

### Release notes  {#release-notes}

Release notes are published for each {{< product-c8y-iot >}} [Yearly release](#yearly-release) and its subsequent [maintenance releases](#maintenance-release), detailing new features, bug fixes, and API changes. Release notes help users track changes and understand their impact on deployments.


### Report {#report}

Reports are global [dashboards](#dashboard), accessible in the [Cockpit application](#cockpit-application), and visible across the entire [tenant](#tenant) regardless of the [asset hierarchy](#asset-hierarchy). A report serves as a customizable container for [widgets](#widget) to visualize and track tenant-wide data like [applications](#applications), [alarms](#alarm), and [assets](#asset).   


### REST API {#rest-api}

The {{< product-c8y-iot >}} REST API is an interface that allows for communication between the {{< product-c8y-iot >}} platform and other systems via HTTP and REST.

See the [{{< openapi >}}](https://{{< domain-c8y >}}/api/core/).


### Role {#role}

Roles are named collections of [permissions](#permission) that can be assigned to [users](#user) and/or [devices](#devices) to determine the level of authorization on the platform. Roles are the central component of {{< product-c8y-iot >}}'s [RBAC](#rbac) model. The platform distinguishes between [global roles](#global-role) (tenant-wide) and [inventory roles](#inventory-role) (specific to the device data in the [inventory](#inventory)).  
