---
weight: 60
title: External development
layout: bundle
sector:
  - device_management
---

Besides authoring rules in the Data Preparation application, you can develop, version, test, and deploy rules from your own development environment using the open-source [Data Preparation rules template](https://github.com/Cumulocity-IoT/datapreparation-rules-template) repository.

### What it is {#what-it-is}

The template repository is a ready-to-use project for developing Data Preparation rules in an IDE such as Visual Studio Code instead of the in-app editor. Each rule lives in its own folder with a TypeScript smart function, a `data-prep.yaml` configuration, and test cases. The repository ships with the tooling to type-check, lint, validate, test, and deploy rules.

### Why use it {#why-use-it}

Developing rules externally gives you:

- **Version control** --- keep rules in Git alongside the rest of your IoT solution, with full history and review workflows.
- **IDE tooling** --- TypeScript IntelliSense, inline schema validation for the YAML files, linting that flags unsupported runtime features, and AI coding assistance.
- **CI/CD pipelines** --- run offline checks on every change and deploy automatically from GitHub Actions.

### Getting started {#getting-started}

Fork or clone the [template repository](https://github.com/Cumulocity-IoT/datapreparation-rules-template) and follow its README. The typical workflow is:

1. **Create** a rule from the provided scaffolding command.
2. **Validate** it offline (type-check, lint, schema validation).
3. **Test** it against your tenant using the platform's run-tests endpoint.
4. **Deploy** it to your tenant.

Refer to the template repository's README for the full developer guide, including prerequisites, credentials, and CI/CD setup.

### TypeScript API reference {#typescript-api-reference}

Smart function input and output types are published as the [`@c8y/dataprep-types`](https://www.npmjs.com/package/@c8y/dataprep-types) npm package. The generated TypeScript API reference (TypeDoc) is available at [Data Preparation Smart Function API](https://cumulocity-iot.github.io/datapreparation-rules-template/).

### REST API {#rest-api}

The Data Preparation control plane REST API --- used by the template's test and deploy tooling --- is documented in the public [{{< product-c8y-iot >}} API documentation](https://{{< domain-c8y >}}/api/). An interactive Swagger UI is also available within your tenant at */service/dataprep/swagger-ui.html*.
