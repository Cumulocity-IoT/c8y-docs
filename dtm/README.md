# DTM doc automation

This folder contains DTM doc automation scripts and resources. 

## Screenshot automation

The screenshot workflow uses [cumulocity-cypress](https://github.com/Cumulocity-IoT/cumulocity-cypress/) `c8yscrn` command to create screenshots automatically.

### Installation

Install `cumulocity-cypress` globally and run the `c8yscrn` command from the command line:

```bash
npm install -g cumulocity-cypress
```

If running directly against a Cumulocity doc tenant, provide authentication information in `dtm/.env` file

```bash
admin_username=admin
admin_password=...
```

and configure the screenshot workflow to login using

```yaml
global:
  login: admin
```

For more infos see [cumulocity-cypress documentation](https://github.com/Cumulocity-IoT/cumulocity-cypress/blob/develop/doc/Screenshot%20Automation.md).

## Visual Studio Code setup

For code completion and yaml workflow validation in Visual Studio Code, just install the [YAML - YAML Lanuage Support by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) plugin. 

If validation does not work automatically using the inline scheme configured using `yaml-language-server`, try to configure the YAML language server to use the schema from `cumulocity-cypress` by providing the schema in `.vscode/settings.json`.

```json
"yaml.schemas": {
  "dtm/node_modules/cumulocity-cypress/c8yscrn/schema.json": "**/*c8yscrn*.config.y*ml"
},
```

### Run screenshot workflow

See `npx c8yscrn --help` and `npx c8yscrn <command> --help` for all command line options.

```bash
npx c8yscrn run --baseUrl https://dtmdoc.latest.stage.c8y.io --config dtm-c8yscrn.config.yaml --folder output/
```

Using the `open` command does open in the Cypress app for development and debugging.

### Image diffing and automated pull requests

tbd

### Mocking of data 

tbd