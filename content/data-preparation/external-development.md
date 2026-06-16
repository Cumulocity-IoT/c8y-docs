---
weight: 60
title: External development
layout: bundle
sector:
  - device_management
---

Besides authoring rules in the Data Preparation application, you can develop, version, test, and deploy rules from your own development environment using the open-source [Data Preparation rules template](https://github.com/Cumulocity-IoT/data-preparation-rules-template) repository.

### What it is {#what-it-is}

The template repository is a ready-to-use project for developing Data Preparation rules in an IDE such as Visual Studio Code instead of the in-app editor. Each rule lives in its own folder with a TypeScript smart function, a `data-prep.yaml` configuration, and test cases. The repository ships with the tooling to type-check, lint, validate, test, and deploy rules.

### Why use it {#why-use-it}

Developing rules externally gives you:

- **Version control** --- keep rules in Git alongside the rest of your IoT solution, with full history and review workflows.
- **IDE tooling** --- TypeScript IntelliSense, inline schema validation for the YAML files, linting that flags unsupported runtime features, and AI coding assistance.
- **CI/CD pipelines** --- run offline checks on every change and deploy automatically from GitHub Actions.

### Getting started {#getting-started}

Fork or clone the [template repository](https://github.com/Cumulocity-IoT/data-preparation-rules-template) and follow its README. The typical workflow is:

1. **Create** a rule from the provided scaffolding command.
2. **Validate** it offline (type-check, lint, schema validation).
3. **Test** it against your tenant using the platform's testing endpoint.
4. **Deploy** it to your tenant.

Refer to the template repository's README for the full developer guide, including prerequisites, credentials, and CI/CD setup.

### TypeScript API reference {#typescript-api-reference}

Smart function input and output types are published as the [`@c8y/dataprep-types`](https://www.npmjs.com/package/@c8y/dataprep-types) npm package. The generated TypeScript API reference (TypeDoc) is available at [Data Preparation Smart Function API](https://cumulocity-iot.github.io/data-preparation-rules-template/).

### REST API {#rest-api}

The Data Preparation control plane REST API --- used by the template's test and deploy tooling --- is documented at the [OpenAPI specifications website](https://cumulocity.com/api/data-preparation). To access interactive API documentation within your tenant, subscribe to and install the **Api-doc** extension from **Administration** > **Ecosystem** > **Extensions** and open the **API documentation** app > **Data Preparation** tab.

You can also retrieve the raw OpenAPI JSON specification directly:

```shell
curl -u '<username>' 'https://<your-tenant>/service/dataprep/v3/api-docs'
```
