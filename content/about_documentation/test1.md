---
weight: 10
title: Deploying the Microservice and Configuring the AI Agent Manager
layout: bundle
sector:
  - terms_conditions
---


Prerequisites
A configured and working AI Agent Manager
Cumulocity Microservice hosting enabled
Step 1: Deploy the Microservice
Log in to your Cumulocity Administration Application
Navigate to Ecosystem → Microservices
Click “Add microservice” in the toolbar
Select the created ZIP file and wait for the upload to complete
Step 2: Configure the MCP Server
Navigate to the AI Agent Manager in the Administration application
Open the Tools section
Click “Configure MCP Server”
At the bottom, add a new MCP Server with the context-path to your microservice (default: <<your-base-url>>/service/mcp-example/sse)
If configured correctly, all tools will be listed
Provide a name for the server
Keep “Send user authentication token to MCP Server” enabled
Click Save
