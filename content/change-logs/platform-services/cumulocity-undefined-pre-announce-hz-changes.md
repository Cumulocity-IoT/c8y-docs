---
date: '2025-08-25'
title: Advance notice of internal changes in platform implementation
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
As a part of continuous modernization of the {{< product-c8y-iot >}} platform some internal implementation changes
have been introduced that enhance the reliability and scalability of {{< product-c8y-iot >}}. The new implementation is already available on all production 
servers, but disabled behind a `cluster-subscriptions.mongo-persistence` feature toggle. The feature is already enabled 
on all our test systems and on https://eu-latest.cumulocity.com/ without any issues, as the changes have been fully 
tested in the development environment and are ready for production rollout. We plan to enable the new implementation
for all tenants on all production systems by the end of September 2025.

In an abundance of caution we would like to invite early adopters to participate in the gradual rollout of switching 
the platform to the new implementation. We believe that a gradual rollout that is fully controlled by the customers 
allows better observability and faster reaction times if any edge case scenarios are encountered. 
All customers not participating in the gradual rollout will have the feature enabled in bulk by the end of September 2025.

To enable a feature for a tenant, a user of that tenant with a role `ROLE_TENANT_MANAGEMENT_ADMIN` can use 
the [Feature Toggles REST API](https://cumulocity.com/api/core/#operation/setCurrentTenantFeatureToggleValue):

```bash
curl --location --request PUT "https://<TENANT_DOMAIN>/features/cluster-subscriptions.mongo-persistence/by-tenant" \
--header "Authorization: Basic <AUTHORIZATION>" \
--header "Accept: application/json" \
--header "Content-Type: application/json" \
--data-raw '{ "active": true }'
```

To disable the feature, issue the same request with `{ "active": false }`.

Activating this toggle is expected not to change any platform features and/or functionalities. It only switches the internal 
implementations of some of them. After enabling the feature we recommend observing active Realtime Notifications 1.0 
subscriptions and in case any potential misbehaviour occurs we recommend deactivating the feature toggle and informing 
{{< product-c8y-iot >}} Support about the incident. If we're informed in advance about the customer's schedule of enabling the toggle
for a particular tenant, then we can also more closely observe the patterns of traffic of that tenant with the tools 
we have available.
