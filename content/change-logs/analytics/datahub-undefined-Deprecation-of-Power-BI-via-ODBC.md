---
date: 2026-06-10
title: Deprecation of ODBC-based connectivity to Power BI
product_area: Analytics
change_type:
  - value: change-inv-3bw8e
    label: Announcement
component:
  - value: component-A8vMaVaTg
    label: DataHub
build_artifact:
  - value: tc-H-tuq-8Es
    label: datahub
---
Microsoft Power BI can be connected to Dremio so that you can analyze your IoT data residing in the data lake. So far, that connection has been based on an ODBC driver. Microsoft has announced the transition from legacy ODBC drivers to Apache Arrow Database Connectivity (ADBC) drivers. While in the transition phase ODBC is still supported, ADBC will eventually become mandatory. Therefore, the connection between Power BI and Dremio needs to be reconfigured so that ADBC is used instead of ODBC.