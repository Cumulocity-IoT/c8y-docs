---
date: 2025-11-XX
title: MQTT Service will enforce CN validation for certificate-authenticated clients
change_type:
  - value: change-inv-3bw8e
    label: Announcement
product_area: Platform services
component:
  - value: component-LcWEQW5gs
    label: MQTT
build_artifact:
  - value: tc-hc5Tfixeqqei
    label: mqtt-service
issue: MTM-65167
---

### Introduction

To strengthen identity assurance for certificate-authenticated MQTT clients, the {{< product-c8y-iot >}} [MQTT Service](/device-integration/mqtt-service/) will begin enforcing **Common Name (CN) validation** during client certificate authentication.

Currently, the MQTT Service accepts certificates where the CN does not match the MQTT client ID.  
This will change: the CN must correspond to the client ID used during connection, improving device-to-certificate integrity and reducing the risk of certificate misuse.

### What is changing?

When an MQTT client connects using certificate-based authentication:

* The **CN in the certificate must match the MQTT client ID**.
* SmartREST-style identifiers are supported, including:
  * `CN == <clientId>`
  * `CN == "d:<clientId>"`

Only clients using certificate-based authentication are affected.  
No changes apply to clients using other authentication mechanisms.

### Impact on existing MQTT clients

This is a **breaking change**.  
Devices using certificates whose CN does not align with the MQTT client ID will fail authentication once enforcement begins.

Customers should verify and update their certificate issuance processes during the grace period.

For support, please contact product support.

### Roll-out plan

To allow a smooth transition, CN validation will be introduced **four weeks after this announcement**.