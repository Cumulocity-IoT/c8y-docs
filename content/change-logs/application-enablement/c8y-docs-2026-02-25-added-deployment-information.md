---
date: 2026-02-25
title: Added deployment information to change logs in the documentation
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
product_area: Application enablement & solutions
component:
  - value: component-docs-123
    label: Documentation
build_artifact:
  - value: 
    label: n/a
ticket: MTM-66020
---

Change logs previously only indicated deployment availability for Zone 1 (eu-latest.cumulocity.com), limiting the usefulness of the information for users on other zones.

Each change log entry now includes an expandable **Technical details** section that displays deployment availability information for all environments: eu-latest.cumulocity.com, apj.cumulocity.com, jp.cumulocity.com, emea.cumulocity.com, us.cumulocity.com, and cumulocity.com. This section also displays technical details such as build artifact, version, and internal ticket number that were previously hidden.

Users can now quickly verify whether a change is available in their specific environment without contacting support or searching multiple sources. This improvement helps users make informed decisions about feature adoption and troubleshooting across all zones.