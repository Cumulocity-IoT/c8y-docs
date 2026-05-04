---
weight: 5
title: Prerequisites
---

To use the Data Preparation application, ensure you have the following prerequisites set up.

### Permissions {#permissions}

Verify that your user role includes the following permissions:

| Role                                  | Access granted                                                   |
|---------------------------------------|------------------------------------------------------------------|
| Data Preparation rules                | Create and manage data transformation rules                      |
| Data Preparation deployments          | Deploy and manage rules in production                            |

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
