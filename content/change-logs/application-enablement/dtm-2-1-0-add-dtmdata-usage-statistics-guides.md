---
date: ""
title: "Add dtmdata usage statistics guides"
product_area: "Application enablement & solutions"
change_type:
    - value: "change-2c7RdTdXo4"
      label: "Improvement"
component:
    - value: "component-Tl88RYb4A"
      label: "Digital Twin Manager"
build_artifact:
    - value: "tc-wYIY0MBDO"
      label: "dtm"
ticket: "CTM-3272"
version: "2.1.0"
---
## Summary

Adds two guides on reading the usage (billing) data that
dtm-data-service reports for each tenant:

- `docs/guides/statistics-dtmdata.md`: for operators. Explains `c8y dtm
statistics dtmdata`, what each value counts, the required roles
(`ROLE_MEASUREMENT_READ`, `ROLE_INVENTORY_READ`), the rules for reading
the numbers, and troubleshooting.
- `docs/guides/statistics-dtmdata-internal.md`: for teams that integrate
the data into their own billing or reporting. Covers the data model
(`c8y_MicroserviceBilling` measurements in the management tenant,
managed object → tenant ID, application ID per installation), queries
with the REST API and with go-c8y-cli, a jq program for the totals, and
how to check the result against the extension.

Notes:
- The service is referred to as `dtm-data-service-1fm` throughout, with
the 5-minute report interval of the 1fm build.
- Records under several application IDs (from deleting and reinstalling
the service) are summed per tenant.
- The `c8y dtm statistics dtmdata` command is on `feat/billing-command`
in Cumulocity-IoT/c8y-dtm and has no PR yet. The quick-start commands
and the link to `shared/statistics/jq/dtmdata.jq` work once it is
merged.

## Test plan

- [ ] Run the guide's commands in a management tenant (performance
stage, preprod) and compare the output with the guide

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-authored-by: Claude Opus 5.5 (1M context) <noreply@anthropic.com>