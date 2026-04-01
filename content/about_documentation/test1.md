---
weight: 20
title: Deploying the microservice and configuring the AI Agent Manager
layout: bundle
sector:
  - terms_conditions
---


## Prerequisites {#prerequisites}

- A configured and working AI Agent Manager
- Cumulocity microservice hosting enabled

## To deploy the microservice {#to-deploy-the-microservice}

1. Log in to your Cumulocity administration application.
2. Navigate to **Ecosystem** → **Microservices**.
3. Click "Add microservice" in the toolbar.
4. Select the created ZIP file and wait for the upload to complete.

The microservice is deployed and available in the **Microservices** list.

## To configure the MCP server {#to-configure-the-mcp-server}

1. Navigate to the AI Agent Manager in the administration application.
2. Open the **Tools** section.
3. Click "Configure MCP server".
4. At the bottom, add a new MCP server with the context path to your microservice (default: `<<your-base-url>>/service/mcp-example/sse`).
5. Confirm that all tools are listed.
6. Provide a name for the server.
7. Keep "Send user authentication token to MCP server" enabled.
8. Click **Save**.

The MCP server is configured and available in the AI Agent Manager.
