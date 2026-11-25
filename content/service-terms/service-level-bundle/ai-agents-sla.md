---
title: AI Agent Manager and AI Workbench service-level agreement
layout: bundle
weight: 24
aliases:
  - /ai-agents-sla/
---

{{< c8y-admon-info >}}
The AI Agent Manager is currently in Public Preview. Preview features are not subject to a service-level agreement, as described in [Public Preview](/service-terms/previews/#public-preview). The following text is for information purposes only.
{{< /c8y-admon-info >}}

This agreement is made between {{< company-c8y >}} ("Provider") and the Customer ("Customer") who uses the {{< product-c8y-iot >}} AI Agent Manager and {{< product-c8y-iot >}} AI Workbench ("Service") for running artificial intelligence ("AI") agents with the data of Customer's {{< product-c8y-iot >}} tenants on Provider's cloud instances ("software-as-a-service", "SaaS").

### Service description {#ai-service-description}

The Service lets Customer create AI agents that answer questions and perform tasks with the data and APIs of Customer's tenant. An AI agent combines a system prompt, a large language model ("LLM") of an LLM provider selected by Customer, and tools. For more information, see the [AI Agent Manager introduction](/ai/aim-introduction/). The Service consists of the following microservices:

* **AI Agent Manager** (`ai-agents` microservice): Stores agent definitions and model configurations, runs agents with Customer's LLM provider, connects agents to the tools of Model Context Protocol ("MCP") servers, and stores conversations. Customer uses it through the **AI Agent Manager** pages of the Administration application and through the [REST API](/ai/rest-api/).
* **AI Workbench** (`ai-workbench` microservice): Provides the `codemode` tool through an MCP server. In code mode, an agent writes JavaScript code that AI Workbench runs in an isolated sandbox. The code has no direct network access. It reaches the APIs of Customer's tenant only through AI Workbench. For more information, see [AI Workbench and code mode](/ai/ai-workbench/).

This agreement defines the service level of the AI Agent Manager and AI Workbench as part of {{< product-c8y-iot >}} Software-as-a-Service operated by {{< company-c8y >}}. The following components are outside the scope of this agreement:

* LLM providers and their models, including models that Customer hosts.
* MCP servers operated by Customer or by third parties.
* Microservices, applications, and agents developed by Customer or by third parties, including the APIs and MCP servers that they provide to the Service.
* MCP clients that Customer connects to the Service, and the LLMs that these clients use.
* {{< product-c8y-iot >}} Edge.

### Service features {#ai-service-features}

The Service provides the following features:

* **Agent management:** Text agents and object agents that Customer creates, configures, tests, and deletes in the AI Agent Manager or through the REST API. Applications can provide [subscribed agents](/ai/agents/#subscribed-agents), which Customer can override with custom agents of the same name.
* **Model choice:** Agents use the LLM provider and the model of the [model configuration](/ai/control-panel/#model-configuration) of the tenant or of the [local provider](/ai/agents/#local-providers) of the agent. The application that provides a subscribed agent can define its local provider.
* **Tools:** Customer assigns [built-in tools](/ai/tools-mcp/#builtin-tools), the tools of subscribed microservices, the tools of Customer's own [MCP servers](/ai/tools-mcp/#mcp-servers), and the `codemode` tool of AI Workbench to agents. Tool calls of agents in the AI Agent Manager can require the approval of the user before they run.
* **Access control:** The ROLE_AI_AGENT_ADMIN and ROLE_AI_AGENT_READ permissions control access to the AI Agent Manager and its REST API. Built-in tools and code mode act with the permissions of the user. The MCP servers of subscribed microservices receive the authentication of the user by default. The permissions that their tools use depend on the microservice.
* **Kill switch:** An administrator blocks new agent runs of the tenant with the [AI agent availability switch](/ai/control-panel/#ai-agent-availability) (kill switch), within the scope described under [Limitations and constraints](#ai-limitations-and-constraints).
* **Audit trail:** The AI Agent Manager writes audit records for agent runs, for the tool calls of these runs, and for changes of agent definitions. Audit records contain metadata, such as the agent, the user, the duration, and the token usage. They do not contain prompts, responses, tool arguments, or tool results. The AI Agent Manager writes audit records on a best-effort basis, so the audit trail can be incomplete.
* **Conversations:** The Service stores the conversations that applications, such as AI chat widgets, save for their users. Only the user who saved a conversation can read it. Each conversation expires at the end of the retention period, and the Service then deletes it, as detailed in [Service quotas](/service-terms/quotas/#ai-agent-manager).

### Customer responsibilities {#ai-customer-responsibilities}

Customers are encouraged to review the [AI Agent Manager documentation](/ai/aim-introduction/). In particular, Customer acknowledges the following Customer responsibilities:

* **LLM provider:** Customer selects the LLM provider and the model, holds the account with this LLM provider, and provides the API key. Customer pays for the usage of the models and complies with the terms of the LLM provider, including its rate limits and data processing terms. {{< company-c8y >}} is not responsible for the charges of the LLM provider, including charges for retried, failed, interrupted, and repeated agent runs. {{< company-c8y >}} does not test the Service with LLM providers that are not listed as [recommended providers](/ai/control-panel/#adding-model-configuration). When the LLM provider retires or renames a model, the agents that use this model fail until Customer updates the model configuration or the local provider of the agent. Agents can define their own [local provider](/ai/agents/#local-providers), including subscribed agents that applications provide. Such agents use their LLM provider even if the tenant has no model configuration. Customer reviews the LLM providers of the agents it uses.
* **Data sent to third parties:** For each agent run, the Service sends the system prompt, the messages with their resolved variables, the tool definitions, and the tool results to the LLM provider. Applications, such as the assistant in the header of the {{< product-c8y-iot >}} applications, add context of the current page to the messages. This data leaves {{< product-c8y-iot >}}. The LLM provider processes it under its own terms, which can include processing outside of the region of Customer's tenant. The security and business continuity measures of the [platform service-level agreement](/service-terms/service-level/#platform-sla) do not apply to this processing. The same applies to the data that agents send by email or to MCP servers outside of {{< product-c8y-iot >}}, and to the traces of an OpenTelemetry export that Customer configures, which contain prompts, responses, tool arguments, and tool results by default. Customer controls which data agents can access by selecting the tools of each agent and by granting permissions to users. For more information, see [How it works](/concepts/concepts-ai/#ai-aspects-how-it-works).
* **Agent configuration and use of results:** Customer configures the system prompts, tools, and settings of custom agents. Customer reviews the responses and actions of agents before relying on them.
* **Prompt injection:** Data that agents read through tools, for example, device data, files, or results of MCP servers, can contain instructions that change the behavior of an agent. The Service provides no automatic protection against prompt injection, as described in [Variables](/ai/agents/#ai-agent-variables). Customer limits the tools and permissions of agents that process data from untrusted sources and requires approval for tools that change data.
* **Access management and tool approval:** Customer grants the ROLE_AI_AGENT_ADMIN and ROLE_AI_AGENT_READ permissions only to qualified users. Tools and code mode can create, change, or delete data, send operations to devices, and send emails with the permissions of the user. Customer decides which tools require approval and configures the approval in the agent definition. Approval rules based on tool annotations rely on the annotations that the MCP server provides. Tool approval does not apply to MCP clients that connect to the MCP servers of the Service directly. To prevent direct access to code mode, Customer unsubscribes the tenant from AI Workbench, as described in [Security and limits](/ai/ai-workbench/#security-and-limits).
* **MCP servers:** Customer operates and secures its own MCP servers, including their availability and credentials. Customer forwards the authentication of users only to trusted MCP servers. The MCP servers of subscribed microservices receive the authentication of users by default, so Customer subscribes only to microservices that it trusts. If an MCP server that an agent uses is unreachable or no longer provides a tool that is assigned to the agent, the runs of this agent fail. A slow MCP server delays the runs of the agents that use it.
* **Deletion of conversations:** Conversations remain stored until the end of their retention period, even after Customer deletes the user who saved them and after the tenant unsubscribes from the AI Agent Manager. Users with the ROLE_AI_AGENT_ADMIN permission can delete the conversations of every user, also of deleted users. To remove conversations before the end of their retention period, Customer deletes them before unsubscribing the tenant.

### Limitations and constraints {#ai-limitations-and-constraints}

Customer acknowledges the following limitations and constraints in using the Service:

* **Dependency on the LLM provider:** Every agent run depends on the availability, latency, and rate limits of Customer's LLM provider. The Service retries a model call that fails with a rate limit, a server error, or a network error up to 2 times by default. It does not switch to another LLM provider or model. Failures of the LLM provider do not constitute a failure of the Service.
* **Accuracy of results:** The output of LLMs is not deterministic. {{< company-c8y >}} does not guarantee that the responses and actions of agents are correct, complete, or reproducible.
* **Response time:** The duration of an agent run depends on the LLM provider, the number of steps, and the tools that the agent calls. {{< company-c8y >}} does not guarantee response times. A text agent runs up to 40 steps by default. When a run reaches this limit, it ends without an error, and the response can be incomplete. The Service sets no overall time limit for an agent run. A timeout that Customer sets for the agent, as described in [Common settings](/ai/agents/#ai-agent-common-settings), limits the model calls and tool calls of a run, but not the connection to the MCP servers at the start of the run. Request timeouts of the platform and of the LLM provider still apply.
* **Interrupted runs:** Events such as service restarts, upgrades, or network failures can interrupt agent runs, streamed responses, and code mode runs. A streamed response can end or stop without an error message, and it sends no data while a tool runs. Customer's clients use a timeout to detect a stopped response. An interrupted run can already have made changes through tools or code mode. A run can also continue in the Service after the client cancels it or disconnects. The built-in tools that request a device restart, a shell command, or a log file wait up to 60 seconds for the device. If the device does not respond in time, the operation stays pending, and the device can still run it later. Before Customer repeats an interrupted run, Customer checks which changes the run already made.
* **Shared environment:** The microservices of the Service serve all subscribed tenants of a {{< product-c8y-iot >}} instance and share their capacity. Under high load, agent runs take longer, and code mode runs wait for a free slot. If the capacity of AI Workbench is exhausted, code mode runs fail with a capacity error. Customer does not run load tests or stress tests against the Service on production instances.
* **Code mode:** AI Workbench limits the runtime, CPU time, memory, and number of API and discovery calls of each code mode run, as detailed in [Service quotas](/service-terms/quotas/#ai-workbench). A run that reaches a limit fails. Code mode keeps no data between runs. A newly subscribed microservice is available in code mode after AI Workbench refreshes its API discovery, or after Customer refreshes the discovery, as described in [Available APIs](/ai/ai-workbench/#available-apis). Code mode can be unavailable or incomplete for a tenant while AI Workbench cannot discover the APIs of the tenant.
* **Scope of the kill switch:** The kill switch blocks new agent runs of the AI Agent Manager. It does not stop agent runs that are already in progress.
* **Individual run tracing:** {{< company-c8y >}} does not perform ad-hoc investigations of individual agent runs without evidence of a reproducible defect of the Service.
* **Service quotas:** Customer acknowledges the existence of hard and soft quotas for the [AI Agent Manager](/service-terms/quotas/#ai-agent-manager) and for [AI Workbench](/service-terms/quotas/#ai-workbench). Exceeding soft quotas can lead to a reduced service level. Built-in tools and code mode call the {{< product-c8y-iot >}} APIs with the credentials of the user. These calls count toward the API usage of the tenant and are subject to the [REST API quotas](/service-terms/quotas/#rest-api) of the platform.

### Service availability {#ai-service-availability}

{{< company-c8y >}} is committed to providing reliable service. While the AI Agent Manager is in Public Preview, {{< company-c8y >}} does not measure the availability of the Service separately, and the availability of the Service is not subject to service credits. The Service depends on the {{< product-c8y-iot >}} platform. The [platform's service availability section](/service-terms/service-level/#service-availability) describes the availability of the platform.

The availability of LLM providers, of MCP servers, and of the microservices of Customer or third parties is outside the scope of this agreement.

### Support and maintenance {#ai-support-and-maintenance}

Support and maintenance are provided as outlined in the [platform service-level agreement](/service-terms/service-level/#support-and-maintenance). While the AI Agent Manager is in Public Preview, limited support applies, as described in [Public Preview](/service-terms/previews/#public-preview).

{{< company-c8y >}} updates the microservices of the Service independently of platform upgrades. Updates can interrupt agent runs and code mode runs in progress, as described under [Limitations and constraints](#ai-limitations-and-constraints).

Support can assist with agent definitions, model configurations, and MCP server configurations in {{< product-c8y-iot >}}. Support can generally not assist with the output of LLMs, the writing of system prompts, accounts with LLM providers, MCP servers of Customer or third parties, or the code that agents write in code mode.
