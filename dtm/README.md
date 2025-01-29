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
C8Y_ADMIN_USERNAME=admin
C8Y_ADMIN_PASSWORD=...
```

and configure the screenshot workflow to login using

```yaml
global:
  login: admin
```

For more infos see [cumulocity-cypress documentation](https://github.com/Cumulocity-IoT/cumulocity-cypress/blob/develop/doc/Screenshot%20Automation.md).

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