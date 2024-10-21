---
date: '2024-10-17'
title: Upgraded angular-gettext-tools library to fix vulnerabilities
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-58403
version: 1020.28.10
---
The angular-gettext-tools library is used to extract translatable strings from the source code in the {{< product-c8y-iot >}} UI. Security vulnerabilities were discovered in the nth-check and cheerio dependencies of angular-gettext-tools. To address these vulnerabilities, angular-gettext-tools has been upgraded to a newer version that includes fixed versions of the affected dependencies. This change is not expected to have any impact on the functionality of the {{< product-c8y-iot >}} UI.
