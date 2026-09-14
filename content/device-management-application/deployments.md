---
weight: 70
title: Deployments
layout: bundle
outputs:
  - html
  - json
sector:
  - device_management
helpcontent:
  - label: deployments
    title: About Deployment Manager
    content: |
      Deployment Manager replaces manual, single-shot bulk operations with an automated target-state deployment. You define the desired state once, and devices automatically synchronize with it over time – no matter if they are registered last year or tomorrow.

      **How devices join deployments**

      Devices link to deployments automatically based on deployment keys, they are not added manually:

      * **Auto-joining:** When a device requests a deployment key, it automatically joins the corresponding deployment and pulls the matching target state.
      * **Smart suggestions:** When devices request keys that do not exist in Cumulocity yet, Deployment Manager suggests deployment drafts for you to review and create.

      **Key concepts**

      * **Target states and versions:** define update modules containing software, firmware, configuration updates and/or device parameters.
      * **Module selection criteria** (optional): Pair modules with additional device criteria so devices pull only the binaries matching their specific architecture or any other available context-requirement (i.e. being in idle state, at a specific local time etc.).
      * **Strategy and safety:** Control execution with rollout strategies and automated safety rules that halt deployments before errors propagate.
      * **Realtime control:** Track rollout progress live and pause, resume, or stop execution directly from the UI at any time.

      Click **Add deployment** to define a new campaign, or select an existing deployment to view its progress.
---

Deployment Manager rolls firmware, software and configuration out to large fleets of devices, gradually and safely.

Instead of pushing an update to every device at once, you describe the state you want your fleet to be in. Devices ask what they should be running, and a rollout strategy decides which of them are told yet — widening over time, or stopping if the fleet reports trouble.

### About Deployment Manager {#deployments}

Deployment Manager replaces manual, single-shot bulk operations with an automated target-state deployment. You define the desired state once, and devices automatically synchronize with it over time – no matter if they are registered last year or tomorrow.

A fleet is never a fixed list. Devices come online, get decommissioned, sit offline for weeks and drift from what they were meant to be running, while the state you want them in keeps moving. A bulk operation addresses the fleet as it was at the moment you pressed the button; a deployment keeps addressing it as it changes.

### How devices join deployments {#how-devices-join-deployments}

Devices link to deployments automatically based on deployment keys, they are not added manually:

* **Auto-joining**: when a device requests a deployment key, it automatically joins the corresponding deployment and pulls the matching target state.
* **Smart suggestions**: when devices request keys that do not exist in {{< product-c8y-iot >}} yet, Deployment Manager suggests deployment drafts for you to review and create.

Because a device joins by asking, it cannot be added to a deployment from the server side, and no list of members has to be maintained. A device that is registered tomorrow is placed correctly without anyone doing anything.

### Key concepts {#key-concepts}

* **Target states and versions**: define update modules containing software, firmware, configuration updates and/or device parameters. A target state is an immutable, versioned snapshot of what devices should be running. A deployment has many over its life and points at one of them as active.
* **Module selection criteria** (optional): pair modules with additional device criteria so devices pull only the binaries matching their specific architecture or any other available context requirement, for example being in idle state or at a specific local time.
* **Strategy and safety**: control execution with rollout strategies and automated safety rules that halt deployments before errors propagate.
* **Realtime control**: track rollout progress live and pause, resume or stop execution directly from the user interface at any time.

### To view deployments {#to-view-deployments}

Click **Deployments** in the **Fleet control** menu in the navigator to open the list of all deployments in your tenant.

For each deployment the list shows:

|Column|Description|
|:---|:---|
|Name|The human-readable name of the deployment.|
|Deployment key|The key devices use to ask for this deployment. It cannot be changed after creation.|
|Status|Whether the deployment is active, paused or stopped.|
|Version|The version of the target state that is currently active.|
|Devices at target state|How many of the deployment's devices have reached the active target state.|
|Devices|How many devices have joined the deployment.|
|Failed|How many devices reported a failure for the active target state.|
|Started / Last updated|When the deployment was created, and when it last changed.|

Use the filter in a column header to narrow the list by status or by gate controller, click a column header to sort, and use **Configure columns** to choose which columns are shown.

### To create a deployment {#to-create-a-deployment}

1. Click **Add deployment** at the right of the top menu bar.
2. Enter a **Deployment key**. This is the key devices use to ask for this deployment. Use letters, digits, dots, underscores and hyphens only, up to 128 characters. The key cannot be changed later, and it must be unique within the tenant.
3. Enter a **Name**. It is shown wherever the deployment appears.
4. Optionally, enter a **Description** of the purpose of the deployment.
5. Select a **Gate controller**. It decides how devices are admitted to a new target state.
6. Click **Create**.

The deployment is created with no target state, so nothing is rolled out until you create and activate one.

If the deployment key is already taken, the dialog reports it and you can correct the key without losing your entries.
