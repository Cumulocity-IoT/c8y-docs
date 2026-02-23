---
date: '2025-06-26'
title: Python used by Streaming Analytics upgraded to version 3.13
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
version: 26.126.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---

The version of Python used in {{< product-c8y-iot >}} Streaming Analytics has been upgraded to version 3.13. Customers with extensions containing Python code should test that they are still working as expected. Virtual environments used to provide additional Python libraries may need to be recreated. If possible make these changes before the corresponding build gets rolled out to production SaaS environments.

See online resources such as the [Python What's New](https://docs.python.org/3/whatsnew/3.13.html) for detailed information about breaking changes and new features in Python 3.13. Additional information can also be seen in the corresponding [Apama change log](https://cumulocity.com/apama/docs/latest/change-logs/#26.x/upgrade-python).

