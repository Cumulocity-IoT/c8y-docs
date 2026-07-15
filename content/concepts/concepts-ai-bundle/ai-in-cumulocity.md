---
weight: 10
title: How AI works in Cumulocity
sector:
  - getting_started
---

### Overview {#ai-aspects-overview}

{{< company-c8y >}}, that is {{< company-c8y >}} GmbH and its affiliates, take the protection of Customer data seriously; to this end we place the Customer in charge of when and how a Large Language Model (LLM) is used. {{< company-c8y >}} does not develop LLMs or use Customer data to train them, neither does the platform host or operate an LLM. So what does {{< company-c8y >}} do and how does the platform enable and use AI to accelerate and enhance the customer experience?  

{{< company-c8y >}} provides an AI Agent Manager enabling the management of agents written by the {{< company-c8y >}} team or by the Customer. For {{< company-c8y >}}-delivered agents, the inputs and outputs are monitored so the product can improve the agents to ensure the results are accurate. Agents written by the Customer can use a simple good/bad emoji that can be clicked by the user, in order to provide feedback on the accuracy of their agent.

The platform connects to a LLM provider you choose and contract with directly. The tested options are Anthropic, OpenAI, and Google Gemini. The connection uses an API key supplied by the Customer, whether the prompts and responses are used to train that provider’s model is governed by the Customer agreement with that provider. All three tested providers commit, by default under their API or commercial terms, not to use API data to train models.

If an LLM provider is not configured, no data leaves the platform for any external LLM. The AI Agent Manager remains inactive.

### Components {#ai-aspects-components}

The AI Agent Manager has three components, cleanly separated so it is obvious to the Customer what they are using:

#### Agent {#ai-aspects-agent}

A configured assistant that lives inside your {{< product-c8y-iot >}} tenant. Each agent has a system prompt (the instructions that define its role), a set of assigned tools, and a chosen LLM provider. The agent runs the conversation. It receives a request from a user, agent or tool, decides whether it needs to fetch data, and produces the answer. Agents are provided by {{< company-c8y >}} or can be written by the user.

#### Tools and MCP {#ai-aspects-tools}

Agents reach data through tools. {{< company-c8y >}} ships built-in tools for the obvious work: querying devices, retrieving measurements, reading alarms and events. Built-in tools run under the calling user’s permissions, so an agent cannot access more than the user can. For custom needs, agents can be extended with Model Context Protocol (MCP) servers. MCP is an open standard for exposing tools to AI agents. You, or a third party, can run an MCP server and connect it to the AI Agent Manager.

#### LLM {#ai-aspects-llm}

The language model that does the reasoning lives with your chosen provider. {{< product-c8y-iot >}} sends prompts to it over the provider’s API. It returns text, or a request to call a tool.

{{< product-c8y-iot >}} is the orchestrator. It holds the agent definition, manages the conversation loop, calls tools, and routes prompts and responses between the user and the LLM provider.      

### How it works {#ai-aspects-how-it-works}

For the purposes of this explanation we use the noun **User**, however a User can be any component, microservice or human user. A single agent interaction proceeds as follows:

1. The agents are exposed via a REST API so that they can be embedded in any {{< product-c8y-iot >}} application or accessed by external AI agents and applications. For instance when creating a new HTML widget, a prompt suggestion agent is automatically triggered by the UI application with context on the device at hand with suggestions on the kind of visualization to create. While some agents are triggered automatically, many agents are exposed to the end user via a chat interface in {{< product-c8y-iot >}} applications, in this instance the user types the questions or actions they want the agent to undertake in the agent’s system prompt.

2. When triggered with a prompt, the agent decides which tools are appropriate and sends the relevant data to the configured LLM provider over the provider’s API.

3. The LLM returns either an answer or a request to call a tool.

4. If a tool is called, {{< product-c8y-iot >}} executes it (a built-in {{< product-c8y-iot >}} API, an MCP server, or an external service) and returns the result to the LLM.

5. The LLM produces the final answer, the agent returns it to the User.

The {{< product-c8y-iot >}} documentation is explicit on this: without a configured LLM provider, the platform is never connected to any external LLM, even if subscribed agents are listed in the UI. The decision to enable LLM use remains with the Customer. This statement holds true even if the Customer decides to use AI outside of the AI Agent Manager framework.

The API key provided by the Customer is held in the platform’s secure store. It is written and cannot be read back.

**Note:** As the use, advantage and limitations of LLMs are moving at a rapid pace {{< company-c8y >}} may in future provide a pre-configured, limited LLM account out of the box; {{< company-c8y >}} will publish the data protection agreements that apply to that LLM account.  {{< company-c8y >}} will ensure the Customer is aware of the LLM and will be able to disable or replace it with a Customer-provided key.

#### What the LLM providers commit to {#ai-aspects-llm-providers}

Your contract with the LLM provider governs how it handles your data.  At the time of writing {{< product-c8y-iot >}} is tested with three providers who provide differing levels of protection depending upon the license, links are to the pages that contain information on the options available.

Anthropic [https://claude.com/pricing](https://claude.com/pricing)

OpenAI [https://chatgpt.com/pricing/](https://chatgpt.com/pricing/)

Google Gemini Enterprise Agent Platform [https://cloud.google.com/products/gemini-enterprise-agent-platform](https://cloud.google.com/products/gemini-enterprise-agent-platform)

Commitments are made by the provider directly to you, not by {{< company-c8y >}}. We recommend reading the provider’s terms as part of the provider selection.

#### If external LLM use is not acceptable {#ai-aspects-external-llm-use}

The AI Agent Manager supports custom OpenAI-compatible endpoints. If your organization’s policy prevents the use of an external LLM, you can route the platform to a self-hosted or privately-hosted model that exposes the OpenAI API. In that case, no data leaves your infrastructure for an external LLM. The trade-off is that you operate the model.

#### Practical implications for protecting your data {#ai-aspects-practical-implications}

* {{< company-c8y >}} GmbH is not training LLMs on your data. There is no {{< product-c8y-iot >}}-operated LLM into which your data is fed.

* If you enable the AI Agent Manager, you select the LLM provider, supply the API key, and rely on your direct agreement with that provider for data-handling commitments. The provider acts as a processor for the data you route through it. The standard {{< product-c8y-iot >}} DPA addresses {{< product-c8y-iot >}}’s role as a processor for the underlying platform; the LLM provider’s terms address the LLM-specific processing.

* If you do not enable AI agents, none of the above applies. The platform runs without external LLM connectivity.

### Frequently asked questions {#ai-aspects-faq}

**Q. Does {{< company-c8y >}} have its own LLM?**

A. No.

**Q. Which LLM providers are officially tested and supported by the {{< company-c8y >}} team?**

A. The {{< company-c8y >}} team has tested and validated integrations with Anthropic, OpenAI and Google Gemini. These providers can be configured directly through the LLM provider settings within the platform, and their integration is supported by {{< product-c8y-iot >}}.

**Q. Can I use LLM providers other than Anthropic, OpenAI, and Google Gemini?**

A. Yes. {{< product-c8y-iot >}}'s AI integration is provider-agnostic which supports a broad range of LLM providers. While additional providers may work, they have not been tested by {{< product-c8y-iot >}} and are therefore supported without guarantee.

**Q. Can I use open-source or self-hosted AI models?**

A. Yes. Open-source and self-hosted models that expose an OpenAI-compatible API can be used through the local provider configuration. This typically requires configuring the appropriate base URL and adjusting the advanced settings, such as strict mode, to match the capabilities of the selected model.

**Q. Is Customer data used to train LLMs?**  

A. {{< company-c8y >}} does not use Customer data, prompts, or responses to train LLMs. If a Customer configures an external LLM provider, that provider’s use of submitted data is governed by the Customer's agreement with the provider.

**Q. Whose API key is used for LLM calls?** 

A.  By default, {{< product-c8y-iot >}} uses a Bring Your Own Key (BYOK) model, where Customers provide their own AI provider API credentials and are billed directly by that provider. For trials, an optional managed mode allows AI requests to be routed through {{< product-c8y-iot >}}-managed accounts (initially Claude) until the allocated trial credits are used.

**Q. Who is responsible for the underlying LLM service?**

A. While {{< company-c8y >}} supports the integration and connectivity to configured LLM providers, the behavior, availability, performance, quotas, rate limits, and overall service reliability of the underlying LLMs remain the responsibility of the respective provider. Any provider-side service disruptions, model changes, usage limits, or performance variations are managed by the LLM provider.

**Q. Can a {{< company-c8y >}} employee read our prompts?**

A. Prompts pass through the platform with access inside {{< product-c8y-iot >}} governed by the controls in your tenant and by the {{< product-c8y-iot >}} DPA.  Access inside the LLM provider’s systems is governed by that provider’s terms.  Certain out-of-the-box features (such as Data Preparation) utilize automated telemetry via Gainsight (which can be disabled) and pre-delivery testing to evaluate system health, token consumption, response quality, and overall product performance. This information is used for performance assessment and product improvement.

**Q. Are subscribed agents (provided by installed applications) different?**

A. Subscribed agents use the same LLM provider you configure globally. The agent definition (system prompt and tool list) is supplied by the application; the LLM call is still made to your contracted provider with your API key.

**Q. Can we restrict which {{< product-c8y-iot >}} users have access to AI features?**

A. Yes. AI Agent Manager actions are gated by roles. The "talk to an agent" permission (ROLE\_AI\_AGENT\_READ) and the "administer providers" permission (ROLE\_AI\_AGENT\_ADMIN) are separate.

**Q. Where is the LLM call processed geographically?**

A. It depends on the provider and the endpoint you configure. EU-resident processing is available with each of the three tested providers under their enterprise options. We can document the routing for your specific configuration on request.

**Q. What happens if we change our mind and want to switch off AI?**

A. Customers can modify or remove AI provider configurations at any time. Providers can be configured globally or overridden for specific agents. If all provider configurations are removed, no external LLM is contacted and AI-powered capabilities become inactive.

**Q. How do you test the agents?**

A. {{< company-c8y >}} regularly executes a diverse set of scenario-based testing with both quantitative and qualitative evaluation. The results of these tests are tracked to enable statistical evaluation of performance on multiple axes, including token consumption.

Qualitative evaluation is done automatically by other LLMs that evaluate the performance of the prompt (and we have separate testing evaluating the performance of those LLMs), but manual checks with human review are also done whenever we change the prompts.

**Q. Is there any internal use of AI**

A. Yes, for Data Preparation {{< product-c8y-iot >}} sends AI queries and responses to Gainsight (which can be disabled) to evaluate system health, token consumption, response quality, and overall product performance. This information is used for performance assessment and product improvement. 
