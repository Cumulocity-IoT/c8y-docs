---
title: Read the network configuration and availability of a device
description: Read the LAN, WAN, and DHCP configuration that a device reports, and check whether the platform monitors the device and whether the device is available and connected.
weight: 220
sector:
  - device_management
requires:
  - authentication
api:
  - operation: getManagedObjectResource
    method: GET
    path: /inventory/managedObjects/{id}
    title: Retrieve a specific managed object
  - operation: getLastAvailabilityManagedObjectResource
    method: GET
    path: /inventory/managedObjects/{id}/availability
    title: Retrieve the latest availability date of a specific managed object
---

A device reports its network configuration in its own managed object. The platform also stores the results of availability monitoring in this managed object. In addition, the platform provides the availability data of a monitored device with a separate request.

The Device Management application shows the network configuration in the **Network** tab of the device, see [Network](/device-management-application/viewing-device-details/#network). The **Availability** views of the Device Management application are deprecated, see [Availability](/device-management-application/monitoring-and-controlling-devices/#availability). The fragments and requests in this recipe remain available.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To read the device and its availability: ROLE_INVENTORY_READ or ROLE_MANAGED_OBJECT_READ
{{< /c8y-admon-req >}}

The examples use `<device_id>` for the ID of the managed object of the device.

### To read the network configuration {#to-read-the-network-configuration}

Send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request:

```http
GET /inventory/managedObjects/<device_id>
```

The platform returns HTTP 200 and the managed object. Check that it contains the fragment `c8y_IsDevice`. If the platform returns HTTP 404, no managed object with this ID exists.

The network configuration is in the fragment `c8y_Network`. It has the following optional parts:

* `c8y_LAN`: The local network interface, with `ip`, `netmask`, `name`, `mac`, and `enabled`.
* `c8y_WAN`: The mobile network connection of the SIM card, with `apn`, `username`, `password`, `authType`, and `simStatus`.
* `c8y_DHCP`: The DHCP server, with `dns1`, `dns2`, `domainName`, `addressRange.start`, `addressRange.end`, and `enabled`.

All properties are optional, so a part can contain any subset of them. `enabled` is an integer, 1 for enabled and 0 for disabled. If the managed object has no `c8y_Network` fragment, the device reports no network information, and the Device Management application does not show the **Network** tab.

For details, see [Network](/device-integration/fragment-library/#network) in the fragment library. To change the network configuration of a device that supports it, send a `c8y_Network` operation, see [Setting network configuration](/device-integration/fragment-library/#setting-network-configuration) and [Send an operation to a device](/recipes/send-operation/).

### To check the availability status {#to-check-the-availability-status}

Read the following fragments in the same response:

* `c8y_RequiredAvailability`: The expected response interval of the device in minutes, in `responseInterval`. If this fragment is missing, the platform does not monitor the device. If the interval is 0 or less, the device is in maintenance mode.
* `c8y_Availability`: The availability `status` that the platform computes, one of AVAILABLE, UNAVAILABLE, or MAINTENANCE, and the time of the last message from the device in `lastMessage`. A device is UNAVAILABLE if it sends no message within its response interval.
* `c8y_Connection`: The `status` of the push connection, one of CONNECTED, DISCONNECTED, or MAINTENANCE.

The platform adds `c8y_Availability` asynchronously after the monitoring starts. If `c8y_RequiredAvailability` is present but `c8y_Availability` is missing, the platform has not computed the availability yet.

A device can be AVAILABLE without being CONNECTED: it sent a message within its response interval but has no push connection. For details, see [Device availability](/device-integration/fragment-library/#device-availability) in the fragment library.

### To read the availability data of the device {#to-read-the-availability-data-of-the-device}

Send a [Retrieve the latest availability date of a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getLastAvailabilityManagedObjectResource) request:

```http
GET /inventory/managedObjects/<device_id>/availability
```

The platform returns HTTP 200 and the following properties:

* `deviceId`: The ID of the device.
* `externalId`: The external ID of the device, or `null` if it has none.
* `lastMessage`: The time when the device sent its last message.
* `interval`: The required response interval of the device.
* `dataStatus`: AVAILABLE, UNAVAILABLE, or MAINTENANCE.
* `connectionStatus`: CONNECTED, DISCONNECTED, or MAINTENANCE.

If the platform returns HTTP 404, the device is not monitored. This response also occurs for a device that has never sent a message, even if its managed object contains `c8y_RequiredAvailability` and `c8y_Availability`. In this case, use the fragments described in [To check the availability status](#to-check-the-availability-status).
