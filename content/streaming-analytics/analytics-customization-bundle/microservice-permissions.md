---
weight: 50
title: Modifying microservice permissions and resource usage
layout: redirect
---

The resource usage and permissions that the Apama-ctrl microservice operates with are defined in the manifest file of the Apama-ctrl microservice. See [Microservice manifest](/microservice-sdk/general-aspects/#microservice-manifest) for more information.

If you have access to the microservice image (typically available only to operations), then you are able to extract the microservice image, modify the manifest, rebuild the microservice, and reupload the microservive to {{< product-c8y-iot >}} as an application in the Administration application.

The manifest specifies CPU and memory resource usage. In some circumstances, these must be changed (different sizes of the microservice image are provided with different configurations).

The manifest also specifies the permissions with which the microservice runs. This is the set of permissions that every request from EPL (or any other code running in the Apama-ctrl microservice) runs with. The Apama-ctrl microservice itself requires the following permissions:

- ROLE_APPLICATION_MANAGEMENT_READ
- ROLE_INVENTORY_READ
- ROLE_INVENTORY_ADMIN
- ROLE_INVENTORY_CREATE
- ROLE_MEASUREMENT_READ
- ROLE_MEASUREMENT_ADMIN
- ROLE_EVENT_READ
- ROLE_EVENT_ADMIN
- ROLE_ALARM_READ
- ROLE_ALARM_ADMIN
- ROLE_DEVICE_CONTROL_READ
- ROLE_DEVICE_CONTROL_ADMIN
- ROLE_IDENTITY_READ
- ROLE_IDENTITY_ADMIN
- ROLE_CEP_MANAGEMENT_READ
- ROLE_CEP_MANAGEMENT_ADMIN
- ROLE_OPTION_MANAGEMENT_READ
- ROLE_SMS_ADMIN
- ROLE_AUDIT_ADMIN
- ROLE_AUDIT_READ
- ROLE_USER_MANAGEMENT_READ
- ROLE_USER_MANAGEMENT_OWN_READ
- ROLE_TENANT_MANAGEMENT_READ
- ROLE_BULK_OPERATION_ADMIN
- ROLE_BULK_OPERATION_READ
- ROLE_NOTIFICATION_2_ADMIN

You can add other roles to this list (or remove them from it) to grant (or remove) permissions to EPL code.
