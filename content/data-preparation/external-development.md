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

### Rule package format {#rule-package-format}

Rules are deployed as a gzip-compressed TAR archive (`tar.gz`). This section describes the archive structure required by the deploy endpoint. The `npm run deploy` script in the [template repository](https://github.com/Cumulocity-IoT/data-preparation-rules-template) builds archives in this format automatically.

#### Archive structure {#archive-structure}

Files must be at the **root level** of the archive:

| Path | Required | Description |
|------|----------|-------------|
| `data-prep.yaml` | Yes | Rule configuration (see below) |
| `<smartFunctionFile>` | Yes | Bundled JavaScript file; the filename must match the `smartFunctionFile` field in `data-prep.yaml` |
| `tests/*.yaml` | No | Test cases; each file becomes a named test stored on the deployed rule |

Any other files in the archive are silently ignored.

Archives are subject to the following limits:

- Maximum **100 entries** per archive.
- Maximum **1 MB** per file (`dataprep` / `rule-import.max-file-size`).
- Maximum **10 MB** total extracted size (`dataprep` / `rule-import.max-total-size`).
- Entries containing path traversal segments (`..`) are rejected.

#### `data-prep.yaml` schema {#data-prep-yaml-schema}

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `smartFunctionFile` | string | Yes | Filename of the bundled JavaScript file at the archive root |
| `input` | object | Yes | Transport and topic configuration (see below) |
| `description` | string | No | Human-readable rule description |
| `tags` | string[] | No | Tag list |
| `disabled` | boolean | No | Whether the rule deploys as disabled; defaults to `false` |

The `input` object:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `transport` | string | Yes | Transport type; currently only `"mqtt"` is supported |
| `topicPattern` | string | Yes | Topic filter; use `*` as a wildcard to match zero or more characters. Note that transport-specific wildcards such as `+` and `#` are not supported here. |
| `clientIDPattern` | string | No | Device client ID filter; use `*` as a wildcard to match zero or more characters. |
| `transportID` | string | No | Transport connection identifier. If not specified, falls back to the `transport` value |

Example `data-prep.yaml`:

```yaml
smartFunctionFile: transform.js
description: "Converts temperature sensor readings to Cumulocity measurements"
tags:
  - sensor
  - temperature
input:
  transport: mqtt
  topicPattern: "sensors/temperature/*"
  clientIDPattern: "*"
```

#### Test file format {#test-file-format}

Each `.yaml` file under `tests/` defines a named test case. The filename without extension is the test name. Test files are optional — if included in the archive they are stored server-side on the deployed rule.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `inputs` | array | Yes | One or more device messages to send as input (see below) |
| `expectedOutput` | array | No | Expected [Cumulocity object](/data-preparation/smart-functions/#cumulocity-objects) outputs; used for comparing against actual outputs when running tests |

Each item in `inputs` has the following fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `payload` | string | Yes | Message payload |
| `topic` | string | Yes | Topic string |
| `clientID` | string | Yes | Device client ID |
| `time` | string | Yes | ISO 8601 timestamp, for example `2026-01-01T12:00:00.000Z` |
| `payloadFormat` | string | Yes | Format of the `payload` field; one of `text`, `json`, or `base64` |

Example `tests/temperature-reading.yaml`:

```yaml
inputs:
  - payload: '{"temperature": 25.5}'
    payloadFormat: json
    topic: "devices/sensor01/data"
    clientID: "sensor01"
    time: "2026-01-01T12:00:00.000Z"

expectedOutput:
  - cumulocityType: measurement
    externalSource:
      - externalId: sensor01
        type: c8y_Serial
    payload:
      type: c8y_Weather
      time: "2026-01-01T12:00:00.000Z"
      c8y_Temperature:
        T:
          value: 25.5
          unit: "°C"
```

#### Deploy endpoint {#deploy-endpoint}

```
PUT /service/dataprep/v1/rules/{name}/deployed
Content-Type: application/gzip
```

The rule name comes from the URL path, not from the archive. If a rule with the given name already exists it is overwritten. The endpoint requires the `DATA_PREPARATION_DEPLOYMENTS_ADMIN` role.

| Response code | Meaning |
|---------------|---------|
| `200` | Rule deployed successfully |
| `400` | Malformed archive, missing required files, invalid YAML, or invalid rule name |
| `413` | An archive entry exceeds the maximum permitted size |
| `422` | Package is structurally valid but the rule fails domain validation (for example, `topicPattern` contains `**`) |

Example using `curl`:

```shell
curl -X PUT \
  -H "Content-Type: application/gzip" \
  -H "Authorization: <token>" \
  --data-binary @my-rule.tar.gz \
  'https://<your-tenant>/service/dataprep/v1/rules/my-rule/deployed'
```
