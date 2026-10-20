---
weight: 20
title: MCP servers
layout: redirect
---

### Model Context Protocol (MCP) {#mcp}

The Model Context Protocol (MCP) is a standard for connecting AI agents to external tools and data sources. MCP servers expose custom tools that extend agent capabilities beyond the built-in {{< product-c8y-iot >}} tools.

**MCP server characteristics:**
- Runs as a separate service accessible via Streamable HTTP or HTTP with SSE (Server-Sent Events).
- Exposes one or more tools that agents use.
- Defines tool schemas that describe parameters and functionality.
- Executes tool logic and returns results to the agent.

They are therefore perfect fits to extend the capabilities of {{< product-c8y-iot >}} agents, either by connecting an existing MCP server or by building your own.

### Configuring MCP servers {#configuring-mcp-servers}

To add an MCP server to the AI Agent Manager:

1. Navigate to **AI Agent Manager** > **Tools**.
2. In the action bar, click **Configure MCP Servers**.
   ![The MCP Server configuration view list all configured servers](/images/agents/mcp_server_list.png)
3. Select the **MCP server transport type**: **Streamable HTTP** (default) or **HTTP with SSE**.
4. Enter the URL for your MCP server in the **Add a new MCP server** field. Use an absolute URL, for example, `https://mcp.example.com/mcp`, or a relative URL for a microservice in your tenant, for example, `/service/mcp-server`.
5. Click **Test connection**.
6. If the connection is successful, you see a list of tools the server exposes. Scroll to the bottom of that list, to give the server a name and description and configure authentication or additional headers.
7. Click **Save** to persist the configuration and start using it in agents.

The system connects to the MCP server and discovers available tools.

{{< c8y-admon-info >}}
Only tools are supported, not prompts or resources.
{{< /c8y-admon-info >}}

{{< c8y-admon-important >}}
Forwarding authentication headers to third-party MCP servers is a security risk. Enable this option only if the server is trustworthy.
{{< /c8y-admon-important >}}

### Creating custom MCP servers {#creating-custom-mcp-servers}

To extend the AI Agent Manager with custom tools, develop an MCP server that:

1. Exposes a Streamable HTTP endpoint (recommended) or an SSE endpoint.
2. Implements the MCP protocol.
3. Defines tool schemas with clear descriptions.
4. Executes tool logic and returns structured results.

For MCP server implementation details, refer to the Model Context Protocol specification. You can also find an article on how to build MCP servers with NestJS and publish them on the {{< product-c8y-iot >}} platform as a microservice in the [Cumulocity TechCommunity](https://community.cumulocity.com/t/ai-agent-manager-using-a-mcp-server-to-generate-widgets/14172).

### Best practices {#best-practices}

- **Tool naming**: Use clear, descriptive names for custom MCP tools. The agent uses tool names and descriptions to decide when to call them.

- **Parameter validation**: Ensure MCP tools validate parameters and handle errors gracefully. Return clear error messages that help the agent understand what went wrong.