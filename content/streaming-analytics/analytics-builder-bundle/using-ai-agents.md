---
weight: 96
title: Using AI agents in models
layout: redirect
---

### About AI agents in Analytics Builder {#using-ai-agents-in-models}

The [AI Agent Prompt](/streaming-analytics/block-reference/#ai-agent-prompt) block calls an AI agent of the AI Agent Manager as one step of an analytic model. Each value that arrives at the block is one call to the agent. The block runs separately for each device. The block puts the value of its input, the properties of the input, the device, and the time into the prompt, and sends the reply of the agent to its output.

You can use the block, for example, to do the following:

- Explain an alarm in plain language when it is raised.
- Summarize the measurements of a device at regular intervals. Use a Cron Timer block to start each call.
- Classify a reading and create an alarm from the reply.

The agent, its system prompt, its tools, and the LLM provider are configured in the AI Agent Manager. The block holds no LLM settings and no credentials.

### Prerequisites {#ai-agents-prerequisites}

- Your tenant has the AI Acceleration bundle. The block and its sample are shown only for tenants that have the bundle.
- The AI Agent Manager is available in your tenant, with a configured LLM provider. See [Getting started by configuring a model](/ai/aim-introduction/#getting-started-by-configuring-a-global-provider).
- The agent that you want to call exists in the AI Agent Manager, or is the [sample agent](#ai-agents-sample-agents). The agent must have an LLM provider. See [Agents](/ai/agents/#ai-agent-list).
- The agent is a text agent, or an object agent that has a schema. See [Text agents](/ai/agents/#text-agents) and [Object agents](/ai/agents/#object-agents).
- AI agents are turned on for the tenant. If the kill switch of the AI Agent Manager is on, the model does not activate. See [AI agent availability](/ai/control-panel/#ai-agent-availability).

{{< c8y-admon-important >}}
The prompt and the variables that the block sends leave {{< product-c8y-iot >}}. The AI Agent Manager passes them to the LLM provider that you configured. Each call to an agent costs money, because the provider charges for it. Check the volume of data that arrives at the block before you activate the model. See [Controlling the number of calls](#ai-agents-controlling-calls).
{{< /c8y-admon-important >}}

### Building the prompt {#ai-agents-building-the-prompt}

The block sends the following to the AI Agent Manager:

- The agent name.
- The text of the **Prompt template** parameter, if you set it. The block sends the text as you wrote it.
- The variables that the block builds from its input.

The AI Agent Manager combines these with the agent. The system prompt comes from the agent. The user prompt comes from the **Prompt template** parameter. The parameter has a default, `Follow your instructions for this input: {{value}}`, which suits an agent whose system prompt holds all the instructions. The AI Agent Manager replaces each placeholder `{{name}}` or `{{ name }}` with the value of the variable of that name, in the system prompt and in the user prompt.

#### To call an agent from a model {#to-call-an-agent-from-a-model}

1. In the model editor, add the AI Agent Prompt block from the **AI/ML** section of the palette.
2. Connect the **Input** port to the block that provides the value, for example, a Measurement Input block.
3. For **Agent name**, enter the name of the agent in the AI Agent Manager. The name can contain letters, digits, and the characters ``! # $ % & ' * + - . ^ _ ` | ~``.
4. For **Prompt template**, enter the prompt and mark where the variables go, for example, `Device {{source}} reported {{temperature}} at {{timestamp}}. Is this value unusual for an outdoor sensor?`
5. For **Value name**, enter the name of the variable that holds the value of the input, for example, `temperature`. If you do not set the parameter, the name is `value`.
6. Connect the **Result** output to a block that uses the reply, and optionally the **Error** output to a block that handles failed calls.

When you activate the model, the block checks the agent. See [When the model does not activate](#ai-agents-activation-checks).

#### Variables {#ai-agents-variables}

The block sends the following variables. If two variables have the same name, the one that is listed last wins.

| Variable | Value |
|---|---|
| The name of each property of the input | The value of that property. A property is sent only if its name contains only letters, digits, and underscores. Properties with other names, such as `measurement_source.id`, are not sent. |
| `source` | The device that the activation is for. Not set if the model does not run for a device. |
| `timestamp` | The time of the activation in ISO 8601 format in UTC, with milliseconds, for example, `2026-11-25T10:15:30.123Z`. |
| The value name | The value of the input, if the input has a value. The default name is `value`. The name can contain only letters, digits, and underscores, and must not be `source` or `timestamp`. |

The block sends each variable as text. A string is sent as it is, a boolean is sent as `true` or `false`, and a number is sent in its shortest decimal form, for example, `0.5` or `20`. A list or an object is sent as JSON.

The following rules apply:

- If the prompt uses a variable that the block does not provide, the AI Agent Manager leaves the placeholder, for example `{{humidity}}`, in the text. The agent then reads the placeholder. The block writes a warning to the log when the prompt uses a variable that the input does not provide. The block reports each name once.
- If a value contains two opening braces, the block inserts a space between them, so `{{` becomes `{ {`. This keeps a value from being replaced as a placeholder. The text that the agent reads differs from the value only by these spaces.
- A placeholder with a name that has other characters than letters, digits, and underscores, such as `{{a.b}}`, cannot be replaced. The block writes a warning when it activates the model.

To find out which variables a prompt received, see the log on the **Logs** page of Streaming Analytics.

#### To pass several values to the agent {#to-pass-several-values-to-the-agent}

1. Add a Set Properties block and connect each value to one of its inputs.
2. For each input, enter the name of the variable in the matching **Property** parameter, for example, `temperature` for **Property 1** and `humidity` for **Property 2**.
3. Connect the output of the Set Properties block to the **Input** port of the AI Agent Prompt block.
4. In the prompt template, use `{{temperature}}` and `{{humidity}}`.

You can use the same variables in the system prompt of the agent. The AI Agent Manager replaces `{{temperature}}` and `{{humidity}}` there as well, so an agent can hold the whole instruction and the model only supplies the values.

The properties of an input that comes from another block, for example, the properties of an alarm, are variables as well, if their names are valid.

#### When the result arrives {#ai-agents-when-the-result-arrives}

A call to an agent takes seconds, so the block does not send its output in the activation of the model that delivered the input. That activation ends without an output of the block. When the agent has answered, the block sends the **Result** or the **Error** output in a new activation, with a later time.

This matters when the input also reaches a downstream block by another path. For example, a Measurement Input block is wired both to the AI Agent Prompt block and directly to a block that also receives the **Result** output:

- In the first activation, the downstream block receives the value from the direct wire. The reply of the agent for this value does not exist yet. A value that the downstream block still holds from the **Result** output belongs to an earlier input.
- In the second activation, seconds later, the downstream block receives the reply. The value from the direct wire is not sent again. If another input has arrived in the meantime, the value on the direct wire is already that of the newer input.

The downstream block therefore runs twice for one input, and it never receives the input and its reply in the same activation. A block that acts whenever one of its inputs changes, for example, a block that sends an email or creates an alarm, can act on a new value together with an old reply.

To avoid this, do the following:

- Let only the **Result** output start the action. Do not wire the same source to the action by a second path.
- Put everything that the action needs into the reply. Pass the values to the agent as variables and ask the agent to repeat them, or use an object agent and read them from the fields of the reply.
- Use parameters, and not wires, for values that do not depend on the input, such as the subject of an email.

Replies and inputs also do not pair up one to one, because an input that arrives while a call is running can be replaced. See [Controlling the number of calls](#ai-agents-controlling-calls).

#### Trying a prompt first {#ai-agents-trying-a-prompt}

Try the prompt in the **Test** tab of the agent in the AI Agent Manager before you use it in a model. Set the variables in the **Test variables** tab, and enter the same prompt that you plan to use in the **Prompt template** parameter. See [Test](/ai/agents/#ai-agent-test) and [Variables](/ai/agents/#ai-agent-variables).

### Text agents and object agents {#ai-agents-text-and-object-agents}

The block reads the definition of the agent when you activate the model, and the kind of the agent decides what the **Result** output sends.

- **Text agent:** `result` is a string that holds the text of the reply.
- **Object agent:** `result` is a pulse. The properties of the pulse are the fields of the reply. The agent must have a schema, otherwise the model does not activate.

To read a field of the reply of an object agent, connect the **Result** output to an Extract Property block and set the **Property Path** parameter to the name of the field. Use a period for a field inside a field, for example, `location.city`, and square brackets for an element of a list. Use a Smart Function block to read several fields at once.

A text agent that returns no text, or only white space, causes the error `EMPTY_REPLY`. A reply of an object agent that is not an object causes the error `INVALID_REPLY`.

### Handling errors {#ai-agents-handling-errors}

If a call fails for a temporary reason, the block sends a pulse to the **Error** output and the model continues. The block also writes a warning to the log, whether or not the output is connected. The pulse has the following properties:

| Property | Description |
|---|---|
| `message` | What happened, including the name of the agent. The text is in English. |
| `agentName` | The name of the agent. |
| `status` | The HTTP status of the reply of the AI Agent Manager. Present only if there was a reply. |
| `code` | The error code of the AI Agent Manager, or one of the codes of the block. Present only if there is a code. |
| `retryAfterSecs` | The number of seconds that the AI Agent Manager asks you to wait before you call again. Present only if the reply has a number of seconds. |

The block uses the following codes:

| Code | Meaning |
|---|---|
| `EMPTY_REPLY` | The agent returned no text. |
| `INVALID_REPLY` | The reply of an object agent is not an object. |
| `NO_RESPONSE` | The AI Agent Manager did not send an HTTP reply, for example, because the connection was refused. |
| `TIMED_OUT` | The call did not finish within the time limit. See [Controlling the number of calls](#ai-agents-controlling-calls). |
| `TOOL_APPROVAL_REQUIRED` | The agent kept asking for approval of a tool. See [Tools and approval](#ai-agents-tools-and-approval). |

The following failures come out of the **Error** output:

- A reply with HTTP status 401, 402, 408, 409, 429, or 5xx, and any other HTTP status except 400, 403, and 404.
- A reply with the code `PROVIDER_ERROR`, `QUOTA_EXCEEDED`, `RATE_LIMIT_EXCEEDED`, or `ORGANIZATION_LIMIT_EXCEEDED`.
- A reply with HTTP status 400 from an object agent, for example, because the reply did not match the schema. The same status from a text agent stops the model, unless the code is one of the provider codes above.
- No reply, a call that took too long, and an empty or unusable reply.

The following failures stop the model. The model fails and Analytics Builder shows the reason:

- HTTP status 403, for example, because the kill switch is on or a permission is missing.
- HTTP status 404, because the agent no longer exists.
- HTTP status 400 from a text agent, unless the code is a provider code.

A failure of a call can also stop the model later than the activation, for example, when someone deletes the agent while the model is active.

The block does not output anything for an input that a later input replaced. See [Controlling the number of calls](#ai-agents-controlling-calls).

#### To create an alarm for a failed call {#to-create-an-alarm-for-a-failed-call}

1. Add an Alarm Output block. For **Severity**, select a severity, and for **Alarm Type**, enter a type such as `ai_agent_failed`.
2. Connect the **Error** output of the AI Agent Prompt block to the **Create Alarm** input of the Alarm Output block.
3. Add an Extract Property block, set **Property Path** to `message`, and connect the **Error** output to it.
4. Connect the output of the Extract Property block to the **Message** input of the Alarm Output block.

When a call fails, the model creates an alarm with the message of the error.

### When the model does not activate {#ai-agents-activation-checks}

When you activate the model, the block checks its parameters and the agent. If a check fails, the model does not activate and shows the reason. The check fails in the following cases:

- The **Input** port is not connected.
- The agent name or the value name is not valid.
- The prompt template uses a placeholder of the Public Preview, such as `{{inputs[0]}}`. See [Changes since the Public Preview](#ai-agents-changes-since-public-preview).
- The AI Agent Manager is not available in the tenant, or does not answer within 30 seconds.
- The agent does not exist, has no LLM provider, or uses MCP servers that are not configured in the AI Agent Manager.
- The kill switch of the AI Agent Manager is on.
- The agent is an object agent without a schema.

The block activates the model, but writes a warning to the log, if the prompt template has a placeholder that cannot be replaced.

### Controlling the number of calls {#ai-agents-controlling-calls}

Each call costs money, so the block limits the calls.

- **One call at a time for each device.** An input that arrives while a call is running waits. If another input arrives while one waits, the newer input replaces the waiting one, so only the latest input is kept. When the call ends, for any reason, the waiting input starts a new call. A replaced input produces no result and no error. The block writes one warning at most every 10 minutes for each worker and counts the replaced inputs in it. A call for one device does not delay a call for another device in the block.
- **A time limit.** One call, including the rounds after a denied tool, must finish within the time limit. After that time, the call ends with the error `TIMED_OUT`, and the block drops a reply that arrives later. The default time limit is 110 seconds. You can change it with the tenant option `aiAgent.timeoutSecs`, from 1 to 110 seconds. See [Other keys](/streaming-analytics/analytics-builder/#other-keys).
- **No retries.** The block sends each call once and does not repeat it after a failure. The AI Agent Manager can still repeat a request to the LLM provider, unless the agent sets **Maximum retries** to 0. See [Settings and advanced settings](/ai/agents/#ai-agent-settings).
- **No calls in simulation mode.** In simulation mode, the block makes no call and sends no output, because a simulation replays history quickly and can make a large number of paid calls. The block still checks the agent when it activates the model. In test mode, the block calls the agent as in production mode.

To limit the number of calls further, put a [Rate Limiter](/streaming-analytics/block-reference/#rate-limiter) or a [Gate](/streaming-analytics/block-reference/#gate) block in front of the AI Agent Prompt block. For example, the Rate Limiter block passes only the first input in each time period and suppresses the others.

### Tools and approval {#ai-agents-tools-and-approval}

An agent can use tools, for example, to read alarms or measurements from {{< product-c8y-iot >}}. The tools run with the permissions of the service user of the Streaming Analytics microservice (Apama-ctrl), not with your permissions and not with the permissions of the user who created the model. See [Modifying microservice permissions and resource usage](/streaming-analytics/analytics-customization/#microservice-permissions). Everyone who can create a model can therefore read data with these permissions through the tools of an agent, and change data if the agent has tools that change data. Assign only the tools that the model needs.

A tool can require approval of a person before it runs. See [Requiring user approval](/ai/tools-mcp/#user-approval). A model runs without a person, so the block handles an approval request as follows:

- The block denies the request automatically.
- The agent continues without the tool and can explain the denial in its reply, which goes to the **Result** output.
- If the agent asks for approval again, the block denies again, up to three times for each call. If the agent still asks after the third denial, the call ends with the error `TOOL_APPROVAL_REQUIRED`.
- The block writes a warning to the log for each denied tool, at most once every 10 minutes for each tool.

To let a tool run without a person, open the agent in the AI Agent Manager, go to the **Tools** tab, and set **User approval** of the tool to **Never**. See [Setting user approval for a tool](/ai/tools-mcp/#setting-user-approval).

### Sample agent {#ai-agents-sample-agents}

Streaming Analytics provides the agent `streaming-analytics-alarm-triage`. You can use it in the **Agent name** parameter without creating an agent. It uses the LLM provider of your tenant.

The agent explains an alarm that the prompt describes: what the alarm probably means, how urgent it is, and what to check first, in at most 120 words. It can look up the device, its recent alarms and events, and its recent measurements. It has only read-only tools and changes nothing. It answers in plain text, and its system prompt tells it to treat the text of devices and users as data and not as instructions.

Your **Prompt template** must describe the alarm and name the variables. If your tenant has an agent with the same name, the agent of your tenant is used instead.

The agent is listed in the AI Agent Manager under **Agents** as a subscribed agent. See [Viewing subscribed agents](/ai/agents/#viewing-subscribed-agents). To change it for your tenant, see [Overruling subscribed agents](/ai/agents/#aligning-subscribed-agents).

### Smart rule: On alarm, ask an agent and send an email {#ai-agents-sample}

**On alarm, ask an agent and send an email** is a default smart rule. When a new alarm of the selected device or group is raised, the rule asks an agent to explain the alarm and sends the reply by email. You create the rule with the smart rules (NEW) plugin, without opening Analytics Builder. See [What is the smart rules (NEW) plugin](/streaming-analytics/smart-rules-plugin/#what-is-the-smart-rules-plugin). The rule is offered only for tenants that have the AI Acceleration bundle.

{{< c8y-admon-important >}}
Each alarm that the rule sends to the agent is one call to the LLM provider and costs money. Data of the alarm and of the device is sent to the LLM provider that the agent uses. Use the rule for alarm types that occur rarely.
{{< /c8y-admon-important >}}

When you create the rule, you set the following:

| Parameter | Description |
|---|---|
| **Device or group of devices** | The device, group, or asset that the rule is for. It is taken from the place where you create the rule. |
| **Alarm type** | The type of the alarms that the rule reacts to. |
| **Minimum time between calls for a device (seconds)** | The least time between two calls to the agent for the same device. The default is 300. It must be greater than zero. |
| **Agent name** | The agent that writes the email. The default is the [sample agent](#ai-agents-sample-agents) `streaming-analytics-alarm-triage`. If you enter your own agent, it must be a text agent. |
| **Subject** | The subject of the email. The default is "AI analysis of a new alarm". |
| **To**, **CC**, **BCC**, **Reply to** | The recipients of the email. Enter at least one of **To**, **CC**, and **BCC**. |

The rule works as follows:

- The rule reacts to new, active alarms of the type that you entered. A change to an alarm that already exists, such as a higher count, and the clearing of an alarm do not start a call.
- For each device, at most one alarm is sent to the agent in each period. Other new alarms of the device in that period are not sent to the agent and get no email. The rule writes a warning to the log for each alarm that it holds back.
- The prompt is part of the rule and you cannot change it when you create the rule. It gives the agent the severity, the type, and the text of the alarm, the ID of the device, and the time at which the rule received the alarm. It asks the agent to explain what the alarm probably means and what to check first.
- The reply of the agent is the text of the email. The reply is inserted into the email as HTML.
- If the call fails for a temporary reason, the rule writes a warning to the log and sends no email for that alarm.

The email is sent when the agent has answered, in a later activation than the one of the alarm. See [When the result arrives](#ai-agents-when-the-result-arrives). This is why the subject is a parameter and is not built from the alarm.

#### To change what the rule does {#to-change-the-ai-agent-smart-rule}

The rule is also available as a sample in Analytics Builder. To change the prompt, the email, or the blocks, create your own model from the sample.

1. In Analytics Builder, go to the **Samples** tab. See [The Samples tab](/streaming-analytics/analytics-builder/#the-samples-tab).
2. Create a model from the sample **On alarm, ask an agent and send an email**.
3. Change the model in the model editor, for example, the **Prompt template** parameter of the AI Agent Prompt block.
4. Save the model. You can then create smart rules from your model in the same way.

### Good practice {#ai-agents-good-practice}

- Try the prompt in the **Test** tab of the AI Agent Manager first.
- Treat device data and the text of alarms as untrusted input. A value can contain text that tells the LLM what to do, and the LLM reads it. Never rely on the prompt alone to prevent this.
- Give the agent read-only tools only, and do not act on the reply without checks. For example, create an alarm from the reply, but do not let the reply trigger an operation on a device unchecked.
- Put a Rate Limiter or a Gate block in front of the block, so that a burst of inputs does not cause many paid calls.
- Connect the **Error** output, so that you notice failed calls.

### Changes since the Public Preview {#ai-agents-changes-since-public-preview}

The block was released in Public Preview before it became generally available. A model that you saved during the Public Preview must be updated, because the following has changed:

- The block has one input, **Input**, instead of five. Each value that arrives starts one call, and the block has no trigger input. A wire to the second to the fifth input is not valid. To pass several values, combine them with a Set Properties block.
- The prompt template no longer uses `{{inputs[0]}}` to `{{inputs[4]}}`. The value of the input is a variable with the name that you enter in **Value name**, or `value`. The properties of the input, `source`, and `timestamp` are variables as well. A model with `{{inputs[n]}}` in its prompt template does not activate, and the message lists the placeholders to replace.
- The **Prompt template** parameter has a default, so an agent whose system prompt holds all the instructions needs no template of its own.
- The block has the **Error** output in addition to the **Result** output. For an object agent, `result` is a pulse with the fields of the reply as properties.
- The block fails visibly. Problems that persist stop the model, and temporary problems come out of the **Error** output. In the preview, the block wrote a warning to the log and sent no output.
- The block limits the cost. It makes one call at a time for each device, has a time limit, does not retry, and makes no calls in simulation mode.
- The block is shown only for tenants that have the AI Acceleration bundle, and it is in the **AI/ML** section of the palette instead of the **Calculation** section.

A model that has only the first input wired and no `{{inputs[n]}}` placeholders continues to work.
