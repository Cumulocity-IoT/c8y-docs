---
weight: 20
title: Prerequisites
---

To use Data Preparation, ensure you have the following prerequisites set up.

### Permissions {#permissions}

Verify that your user's role includes the required permissions:

| Permission type | Level | Access granted |
|---|---|--|
| Data Preparation rules | ADMIN | View, create, edit, and delete draft rules. |
| Data Preparation rules | READ | View rules. |
| Data Preparation deployments | ADMIN | Deploy and undeploy rules to production. Does not include permission to view or edit the rules. |
| Data Preparation deployments | READ | View deployment status and errors. |

Assign these permissions to your global role in the Administration application, and make sure this role has access to the Data Preparation application. See [Managing permissions and roles](/standard-tenant/managing-permissions/) for details.

### AI configuration {#ai-configuration}
Set up a [global provider](/ai/aim-introduction/#getting-started-by-configuring-a-global-provider) with the AI Agent Manager to enable the AI assistant in Data Preparation (for details on enabling preview features and learning about the AI Agent Manager, see the [AI Agent Manager documentation](/ai/aim-introduction/)).
The AI assistant helps you describe your business context and automatically generates the necessary transformation code in a smart function. 

We recommend using Anthropic `claude-sonnet-4-6` as the provider for optimal results.

### Enabling Data Preparation public preview

To enable Data Preparation, open the right drawer (by clicking on your username initials) in the Administration application and select **Manage preview features**. Then activate the toggle next to **Data Preparation**.

