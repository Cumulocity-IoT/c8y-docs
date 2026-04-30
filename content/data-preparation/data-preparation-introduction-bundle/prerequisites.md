---
weight: 5
title: Prerequisites
---

To use the Data Preparation application, ensure you have the following prerequisites set up.

### Permissions {#permissions}

Verify that your user role includes the following permissions:

• `Data Preparation rules` – Allows you to create, edit, view, and manage data transformation rules. This permission lets you define how incoming raw payloads are converted into Cumulocity-compliant measurements, events, alarms, and inventory objects. You use this permission when setting up Smart Functions and configuring transformation logic.

• `Data Preparation deployments` – Allows you to deploy and manage data preparation rules to production environments. This permission controls the activation, deactivation, and monitoring of deployed rules across your infrastructure. You need this permission to move rules from development to active processing.

Assign these permissions to your user role in the Administration app. See [Managing permissions and roles](/standard-tenant/managing-permissions/) for details.

### AI configuration {#ai-configuration}

Set up a global provider with the AI Agent Manager to enable the AI assistant in Data Preparation.

The AI assistant helps you describe your business context and automatically generates the necessary transformation code in a Smart Function.

Supported providers include Anthropic and other AI services. Contact your administrator to configure the global provider.

### Subscription {#subscription}

Ensure your tenant meets the following subscription requirements:

• Your tenant is subscribed to the `Data Preparation` application

• Your tenant is subscribed to the `mqtt-service`

To gain access to the Private Preview of Data Preparation, reach out to Cumulocity support.
