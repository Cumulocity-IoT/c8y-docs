**How AI works in Cumulocity**

*How the platform provides the advantages of AI whilst protecting your data*

# **In short**

Cumulocity, i.e. Cumulocity GmbH and its affiliates,  take the protection of customer data seriously; to this end we place the customer in charge of when and how a Large Language Model (LLM) is used. Cumulocity does not develop LLMs or use customer data to train them, neither does the platform host or operate an LLM.  So what does Cumulocity do and how does the platform enable and use AI to accelerate and enhance the customer experience?  

Cumulocity provides an AI Agent Manager enabling management of  Agents written by the Cumulocity team or by the Customer.  For Cumulocity-delivered Agents, the Inputs and Outputs are monitored so the product can improve the Agents to ensure the results are accurate.  Agents written by the Customer can use a simple good/bad emoji that can be clicked by the user, in order to provide feedback on the accuracy of their Agent.

The platform connects to a LLM provider you choose and contract with directly. The tested options are Anthropic, OpenAI, and Google Gemini. The connection uses an API key supplied by the Customer, whether the prompts and responses are used to train that provider’s model is governed by the Customer agreement with that provider. All three tested providers commit, by default under their API or commercial terms, not to use API data to train models.

If an LLM provider is not configured, no data leaves the platform for any external LLM. The AI Agent Manager remains inactive.

# **The components**

The AI Agent Manager has three components, cleanly separated so it is obvious to the customer what they are using:

## **The Agent**

A configured assistant that lives inside your Cumulocity tenant. Each agent has a system prompt (the instructions that define its role), a set of assigned tools, and a chosen LLM provider. The agent runs the conversation. It receives a request from a user, Agent or tool, decides whether it needs to fetch data, and produces the answer. Agents are provided by Cumulocity or can be written by the user.

## **Tools and MCP**

Agents reach data through tools. Cumulocity ships built-in tools for the obvious work: querying devices, retrieving measurements, reading alarms and events. Built-in tools run under the calling user’s permissions, so an agent cannot access more than the user can. For custom needs, agents can be extended with Model Context Protocol (MCP) servers. MCP is an open standard for exposing tools to AI agents. You, or a third party, can run an MCP server and connect it to the AI Agent Manager.

## **The LLM**

The language model that does the reasoning lives with your chosen provider. Cumulocity sends prompts to it over the provider’s API. It returns text, or a request to call a tool.

Cumulocity is the orchestrator. It holds the agent definition, manages the conversation loop, calls tools, and routes prompts and responses between the user and the LLM provider.      

# **How it works**

For the purposes of this explanation we have used the noun, User, however a **User** can be any component, microservice or human user. A single agent interaction proceeds as follows:

1. The agents are exposed via an REST API so that they can be embedded in any Cumulocity application or accessed by external AI agents and applications. For instance when creating a new HTML widget, a prompt suggestion agent is automatically triggered by the UI application with context on the device at hand with suggestions on the kind of visualization to create. While some agents are triggered automatically, many agents are exposed to the end user via a chat interface in Cumulocity applications, in this instance the user types the questions or actions they want the agent to undertake in the agent’s system prompt.

2. When triggered with a prompt, the agent decides which tools are appropriate and sends the relevant data to the configured  LLM provider over the provider’s API.

3. The LLM returns either an answer or a request to call a tool.

4. If a tool is called, Cumulocity executes it (a built-in Cumulocity API, an MCP server, or an external service) and returns the result to the LLM.

5. The LLM produces the final answer, the agent returns it to the User.

The Cumulocity documentation is explicit on this: without a configured LLM provider, the platform is never connected to any external LLM, even if subscribed agents are listed in the UI. The decision to enable LLM use remains with the Customer. This statement holds true even if the Customer decides to use AI outside of the AI Agent Manager framework.

The API key provided by the Customer is held in the platform’s secure store. It is written and cannot be read back.

**Note:**   As the use, advantage and limitations of LLMs are moving at a rapid pace Cumulocity may in future provide a pre-configured, limited LLM account out of the box; Cumulocity will publish the data protection agreements that apply to that LLM account.  Cumulocity will ensure the customer is aware of the LLM and will be able to disable or replace it with a customer-provided key.

# **What the LLM providers commit to**

Your contract with the LLM provider governs how it handles your data.  At the time of writing Cumulocity is tested with three providers who provide differing levels of protection depending upon the license, links are to the pages that contain information on the options available.

Anthropic [https://claude.com/pricing](https://claude.com/pricing)

OpenAI [https://chatgpt.com/pricing/](https://chatgpt.com/pricing/)

Google Gemini Enterprise Agent Platform [https://cloud.google.com/products/gemini-enterprise-agent-platform](https://cloud.google.com/products/gemini-enterprise-agent-platform)

Commitments are made by the provider directly to you, not by Cumulocity. We recommend reading the provider’s terms as part of the provider selection.

# **If external LLM use is not acceptable**

The AI Agent Manager supports custom OpenAI-compatible endpoints. If your organisation’s policy prevents the use of an external LLM, you can route the platform to a self-hosted or privately-hosted model that exposes the OpenAI API. In that case, no data leaves your infrastructure for an external LLM. The trade-off is that you operate the model.

# **Practical implications for protecting your data**

* Cumulocity GmbH is not training LLMs on your data. There is no Cumulocity-operated LLM into which your data is fed.

* If you enable the AI Agent Manager, you select the LLM provider, supply the API key, and rely on your direct agreement with that provider for data-handling commitments. The provider acts as a processor for the data you route through it. The standard Cumulocity DPA addresses Cumulocity’s role as a processor for the underlying platform; the LLM provider’s terms address the LLM-specific processing.

* If you do not enable AI agents, none of the above applies. The platform runs without external LLM connectivity.

# **Frequently asked questions**

**Q. Does Cumulocity have its own LLM?**

A. No.

### **Q. Which LLM providers are officially tested and supported by the Cumulocity team?**

A. The Cumulocity team has tested and validated integrations with Anthropic, OpenAI and Google Gemini. These providers can be configured directly through the LLM Provider Settings within the platform, and their integration is supported by Cumulocity.

### **Q. Can I use LLM providers other than Anthropic, OpenAI, and Google Gemini?**

A. Yes. Cumulocity's AI integration is provider-agnostic which supports a broad range of LLM providers. While additional providers may work, they have not been tested by the Cumulocity and are therefore supported without guarantee.

### **Q. Can I use open-source or self-hosted AI models?**

A. Yes. Open-source and self-hosted models that expose an OpenAI-compatible API can be used through the local provider configuration. This typically requires configuring the appropriate baseURL and adjusting the advanced settings, such as strict mode, to match the capabilities of the selected model.

**Q. Is Customer data used to train LLMs?**  
**A.** Cumulocity does not use customer data, prompts, or responses to train LLMs. If a customer configures an external LLM provider, that provider’s use of submitted data is governed by the customer's agreement with the provider.

**Q. Whose API key is used for LLM calls?**  
**A.**  By default, Cumulocity uses a Bring Your Own Key (BYOK) model, where customers provide their own AI provider API credentials and are billed directly by that provider. For trials, an optional managed mode allows AI requests to be routed through Cumulocity-managed accounts (initially Claude) until the allocated trial credits are used.

**Q. Who is responsible for the underlying LLM service?**

**A.** While Cumulocity supports the integration and connectivity to configured LLM providers, the behavior, availability, performance, quotas, rate limits, and overall service reliability of the underlying LLMs remain the responsibility of the respective provider. Any provider-side service disruptions, model changes, usage limits, or performance variations are managed by the LLM provider.

**Q. Can a Cumulocity employee read our prompts?**

A. Prompts pass through the platform with access inside Cumulocity governed by the controls in your tenant and by the Cumulocity DPA.  Access inside the LLM provider’s systems is governed by that provider’s terms.  Certain out-of-the-box features (such as Data Preparation) utilize automated telemetry via Gainsight (which can be disabled) and pre-delivery testing to evaluate system health, token consumption, response quality, and overall product performance. This information is used for performance assessment and product improvement.

**Q. Are subscribed agents (provided by installed applications) different?**

A. They use the same LLM provider you configure globally. The agent definition (system prompt and tool list) is supplied by the application; the LLM call is still made to your contracted provider with your API key.

**Q. Can we restrict which Cumulocity users have access to AI features?**

A. Yes. AI Agent Manager actions are gated by roles. The "talk to an agent" permission (ROLE\_AI\_AGENT\_READ) and the "administer providers" permission (ROLE\_AI\_AGENT\_ADMIN) are separate.

**Q. Where is the LLM call processed geographically?**

A. It depends on the provider and the endpoint you configure. EU-resident processing is available with each of the three tested providers under their enterprise options. We can document the routing for your specific configuration on request.

**Q. What happens if we change our mind and want to switch off AI?**

A..Customers can modify or remove AI provider configurations at any time. Providers can be configured globally or overridden for specific agents. If all provider configurations are removed, no external LLM is contacted and AI-powered capabilities become inactive.

**Q. How do you test the Agents?**

**A**. Cumulocity regularly executes a diverse set of scenario-based testing with both quantitative and qualitative evaluation. The results of these tests are tracked to enable statistical evaluation of performance on multiple axes, including token consumption.

Qualitative evaluation is done automatically by other LLMs that evaluate the performance of the prompt (and we have separate testing evaluating the performance of \_those\_ LLMs), but manual checks with human review are also done whenever we change the prompts.

**Q. Is there any internal use of AI**

**A**  Yes, for Data Preparation Cumulocity sends AI queries and responses to Gainsight (which can be disabled) to evaluate system health, token consumption, response quality, and overall product performance. This information is used for performance assessment and product improvement. 
