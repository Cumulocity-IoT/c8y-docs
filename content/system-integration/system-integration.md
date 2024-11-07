---
title: System integration options
layout: bundle
sector:
  - app_enablement
weight: 10
aliases:
  - /webmethods-io/webmethods-io/
---

This section guides you to available options and resources for integrating cloud applications and services using various cloud integration platforms. This enables you to automate tasks by connecting cloud applications and services (such as Marketo, Salesforce, Evernote, and Gmail) without writing any code.

The choice of the system integration option depends on the organization's specific needs, technical expertise, and integration requirements. Solutions like Zapier offer flexibility and scalability simplifying integration for non-developers, while self-hosted solutions like n8n.io provide greater control and customization.  

By carefully evaluating these options, organizations can select the integration solution that best aligns with their unique requirements, empowering them to unlock the full potential of {{< product-c8y-iot >}} and drive business transformation.

### Microservices approach - Developer-friendly integration {#microservices-approach}

For developers seeking a versatile and flexible integration solution, {{< product-c8y-iot >}}'s microservices approach offers a developer-friendly solution. This method involves creating microservices that connect {{< product-c8y-iot >}} to external systems, allowing for customized data exchange and automation. While requiring initial development effort, the microservices approach provides greater control and adaptability. The option is utilized by many customers for integrating with CRM, ERPs, and FSM tools.

This [article](https://tech.forums.softwareag.com/t/jump-start-your-next-cumulocity-microservice-project-in-java/257641) explains how to set up a {{< product-c8y-iot >}} microservice project in Java, and a corresponding webinar can be found on [YouTube](https://www.youtube.com/watch?v=2j21ULZbtlg).

### Workflow automation tools {#workflow-automation-tools}

These tools provide a user-friendly interface and extensive integrations, suitable for basic to moderately complex workflows. Popular options include Zapier, n8n.io, and Make.com (formerly Integromat). While some tools cater to straightforward automation tasks, others offer high customizability, open-source access, and self-hosting capabilities, making them suitable for more technically proficient users.  

Here are some examples of what you can achieve with these tools:

#### Zapier

This [article](https://tech.forums.softwareag.com/t/cumulocity-iot-google-spreadsheet-no-code-integration-guide/287731) explains how to integrate {{< product-c8y-iot >}} with Google Sheets to automatically export sensor data for further analysis.

#### n8n.io

This [article]( https://tech.forums.softwareag.com/t/integration-guide-sending-cumulocity-iot-alarms-to-zendisk-twilio-using-n8n/288085) explains how to create a multi-step automation for {{< product-c8y-iot >}} alarms, generating Zendesk tickets and SMS notifications based on severity.
