---
weight: 20
title: Prerequisites
---

To use the Data Preparation application, ensure you have the following prerequisites set up.

### Permissions {#permissions}

Verify that your user includes the following role permissions:

| Role | Access granted |
|---|---|
| Data Preparation rules | Create, edit, and delete draft rules. |
| Data Preparation deployments | Deploy and undeploy rules in production. |

Assign these permissions to your user role in the Administration application. See [Managing permissions and roles](/standard-tenant/managing-permissions/) for details.

{{< c8y-admon-important >}}
Editing existing rules and undeploying deployed rules are not available in Private Preview or Public Preview.
{{< /c8y-admon-important >}}

### Subscription {#subscription}
Ensure your tenant meets the following subscription requirements:
* Your tenant is subscribed to the `Data-prep-ctrl` microservice
* Your tenant is subscribed to the `Data Preparation` application


### AI configuration {#ai-configuration}
Set up a [global provider](/ai/aim-introduction/#getting-started-by-configuring-a-global-provider) with the AI Agent Manager to enable the AI assistant in Data Preparation (for details on enabling preview features and learning about the AI Agent Manager, see the [AI Agent Manager documentation](/ai/aim-introduction/)).
The AI assistant helps you describe your business context and automatically generates the necessary transformation code in a smart function. We recommend using Anthropic `claude-sonnet-4-6` as the provider for optimal results.

To gain access to the Private Preview of Data Preparation, reach out to Cumulocity support.
