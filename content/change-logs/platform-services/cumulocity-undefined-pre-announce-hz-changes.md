---
date: '2025-08-27'
title: Public Preview of internal implementation changes
change_type:
  - value: change-inv-3bw8e
    label: Announcement
product_area: Platform services
component:
  - value: component-OG_650_b2
    label: Core platform
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-48688
---
As a part of continuous modernization of the {{< product-c8y-iot >}} platform we have introduced some internal implementation
changes that enhance the reliability and scalability of {{< product-c8y-iot >}}. The new implementation is currently
the default on  https://eu-latest.cumulocity.com/ and available on all other instances as a Public Preview.
The new implementation will go to GA and become the default on all SaaS systems by the end of September 2025.
The purpose of this announcement is to invite customers who wish to take advantage of this update to participate in the Public Preview.

Enabling the new implementation is on a per tenant basis and requires your role to include ADMIN permission for "Tenant management" (API string = `ROLE_TENANT_MANAGEMENT_ADMIN`) and use of
the [Feature Toggles REST API](https://cumulocity.com/api/core/#operation/setCurrentTenantFeatureToggleValue):

```bash
curl --location --request PUT "https://<TENANT_DOMAIN>/features/cluster-subscriptions.mongo-persistence/by-tenant" \
--header "Authorization: Basic <AUTHORIZATION>" \
--header "Accept: application/json" \
--header "Content-Type: application/json" \
--data-raw '{ "active": true }'
```

To disable the feature, issue the same request with: `{ "active": false }`.

The expected behaviour is that all platform features and/or functionality continue working as before. After enabling
the feature we recommend observing active Realtime Notifications 1.0 subscriptions. Should you experience any change
in behaviour please deactivate the feature toggle and open a support ticket to inform {{< product-c8y-iot >}} Support
about the incident. If we're informed in advance about your schedule of enabling the toggle for a particular tenant,
then we can also more closely observe the patterns of traffic of that tenant with the tools we have available.
