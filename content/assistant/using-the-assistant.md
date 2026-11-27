---
title: Using the Assistant
layout: bundle
outputs:
  - html
  - json
  - markdown
sector:
  - ai
weight: 20
---

Open the Assistant from the header of the application, ask your question in the chat, and review the actions that the Assistant takes for you.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

- To use the Assistant: READ or ADMIN permission for the permission type "AI agent".
- To read or change data with the Assistant: the permissions for this data, for example, for the inventory, measurements, or alarms. The Assistant uses your permissions.
{{< /c8y-admon-req >}}

### To open the Assistant {#to-open-the-assistant}

- In the header of the application, click **Assistant**.

The Assistant opens as a side panel on the right, or as a floating window if you used it as a floating window before. To close it, click **Assistant** again or click **Close** in the title bar of the Assistant.

![The Assistant as a side panel with an answer about the alarms of a device](/images/assistant/assistant_side_panel.png)

If the **Assistant** button is missing, your user or your tenant does not meet the requirements. For details, see [Requirements](/assistant/administering-the-assistant/#requirements).

### Side panel and floating window {#side-panel-and-floating-window}

The Assistant has two display modes:

- **Side panel**: The Assistant takes the full height on the right and pushes the page content aside. To change the width, drag the left edge of the panel. Alternatively, focus the left edge and use the arrow keys.
- **Floating window**: The Assistant opens in a window above the application. To move the window, drag its title bar. Alternatively, focus the title bar and use the arrow keys. To resize the window, drag one of its corners. Alternatively, focus the **Resize window** button in the bottom right corner and use the arrow keys.

Use the buttons in the title bar of the Assistant to switch between the modes:

- **Unpin to floating window**: Show the Assistant as a floating window.
- **Pin to side panel**: Show the Assistant as a side panel.
- **Minimize**: Reduce the floating window to its title bar at the bottom of the screen. Click **Restore** to show the window again at its last position and size.

![The Assistant as a floating window above the alarms of a device](/images/assistant/assistant_floating_window.png)

The Assistant keeps the conversation while the floating window is minimized. Your browser stores the display mode, the width of the side panel, and the position and size of the floating window for your next visit.

### Context {#context}

The Assistant uses the screen that you are on as context. The context appears as a chip below the message field, for example, with the name of the device or group that you look at. The context changes when you navigate to another page.

- To ask a general question without the context, click **✕** on the chip.
- To use the context again, click **+** on the chip.

When you remove the context, the Assistant no longer uses the device, group, or other object of the page. It still knows the address of the current page and the dashboard that the page shows.

#### To select assets as context {#to-select-assets-as-context}

To ask about other assets than the ones on the current page, or about several assets at once:

1. In the title bar of the Assistant, click **More actions** and select **Select asset…**.
2. In the **Select assets** dialog, search for and select one or more devices or groups. The list includes child devices and devices that are not assigned to a group.
3. Click **Select**.

![The Select assets dialog with two selected devices](/images/assistant/assistant_select_assets.png)

The selected assets replace the context of the current page and appear as one chip each. To remove an asset from the context, click **✕** on its chip. When you remove the last selected asset, the Assistant uses the context of the current page again.

#### What the Assistant receives with your message {#what-the-assistant-receives}

With each message, the Assistant receives the following information about your screen:

- The device, group, or other object of the current page, or the assets that you selected, with their ID, name, and type.
- The address of the current page, including its query parameters.
- The dashboard on the screen, if there is one: its ID, its name, and the title and type of each widget. The information does not include the configuration of the widgets.
- The documentation topic of the context help of the current page, if the page has one.

The Assistant sends this information, your messages, and the results of its tool calls to the LLM provider that your administrator configures. For details, see [Data sent to the LLM provider](/assistant/administering-the-assistant/#data-sent-to-the-llm-provider).

### Tool calls and approval {#tool-calls-and-approval}

To answer your question, the Assistant calls tools, for example, to read data of your tenant or to look up the documentation. The chat shows each tool call with its details.

For each tool, your administrator sets whether its calls require approval. For details, see [Tool approval](/ai-intro/ai-governance/#tool-approval). When a tool call requires approval, the chat shows the tool call, and you click **Approve** to run it or **Deny** to skip it. If you deny a tool call, the tool does not run.

![A tool call of the Assistant that requires approval, with the code to run and the buttons Deny and Approve](/images/assistant/assistant_tool_approval.png)

Below the message field, select how the chat handles tool calls that require approval:

- **Manual**: The chat asks you before each tool call with the approval option **Ask** or **Always**.
- **Auto**: The chat asks you only before tool calls with the approval option **Always**. All other tool calls run without asking. When you select **Auto**, confirm with **Auto-approve all tools**. While **Auto** mode is on, the chat shows the note "Auto-approve is on" at the top.

Your selection persists as a user preference and applies to your future chats as well.

By default, the chat asks you before each call that runs code to read or change the data of your tenant, in **Manual** and in **Auto** mode. Your administrator can change this. For details, see [Tool approval](/assistant/administering-the-assistant/#tool-approval).

{{< c8y-admon-important >}}
The Assistant uses your permissions. If you approve a tool call, the Assistant can add, change, or delete all data that you have access to. Review each tool call before you approve it.
{{< /c8y-admon-important >}}

### Token usage {#token-usage}

The chat shows the number of tokens that each answer uses. Below the message field, **Tokens used** shows the total number of tokens of the conversation. To see the input and output tokens, point to **Tokens used**. Your LLM provider bills the tokens.

### To clear the chat {#to-clear-the-chat}

- In the title bar of the Assistant, click **More actions** and select **Clear chat**.

The chat removes all messages, and the Assistant starts a new conversation.

### Messages and errors {#messages-and-errors}

- **"AI agent is not available."** with the text "The assistant is missing required MCP servers": The AI Workbench MCP server is missing from the AI Agent Manager. Contact your administrator.
- **"No provider configured. Set a global provider or configure a provider for this agent."**: Your administrator has not configured a model for the AI Agent Manager. Contact your administrator.
- **Truncated answer**: If an answer reaches the maximum number of output tokens, the chat shows an error message. Continue the conversation as usual, because the limit applies to a single answer.

{{< c8y-admon-related >}}
- [Introduction](/assistant/assistant-introduction/) for what the Assistant does.
- [Administering the Assistant](/assistant/administering-the-assistant/) for the requirements and the configuration of the Assistant.
{{< /c8y-admon-related >}}
