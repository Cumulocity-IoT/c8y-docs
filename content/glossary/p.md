---
weight: 130
title: P
layout: bundle
sector:
  - getting_started
build:
  render: false

---

### Permission {#permission}

Permissions are the most granular level of access control in {{< product-c8y-iot >}}, defining the access rights (for example, READ, CREATE, ADMIN) for a specific capability (for example, [alarms](#alarm), [inventory](#inventory)). Permissions are not assigned to [users](#user) directly. Instead, they are grouped into [roles](#role).

See also [Managing permissions and roles](/standard-tenant/managing-permissions/) in the documentation.

{{< c8y-details title="Developer details" >}}
Permissions are granted via roles, which are managed through the [User API](https://cumulocity.com/api/core/#tag/User-API) (`/user/roles`, `/user/inventoryroles)`.
The platform identifies each granular permission with a unique “permission” string, which is prefixed with ROLE_ (for example, ROLE_ALARM_READ).

To grant a permission to a user, assign the required permission strings, such as ROLE_ALARM_READ, to a suitable global role or inventory role, then assign that role to the users who should have the respective permission.

**Important**: The permission strings are frequently referred to as "roles" throughout the API and in the configuration files (for example, the microservice manifest includes a requiredRoles field) although they actually refer to a permission.
{{< /c8y-details >}}  


### Private Preview {#private-preview}

Private Preview denotes a feature release stage in the [Continuous Deployment model](#continuous-deployment) where a new feature is made available to a limited, invitation-only group of selected customers for feedback and testing, as opposed to [Public Preview](#public-preview) and [General Availability](#ga).

See also [Preview features](/service-terms/previews/) in the documentation.

### Processing mode {#processing-mode}

The processing mode is a mechanism that allows clients to control how {{< product-c8y-iot >}} handles incoming data ([measurements](#measurement) and [events](#event)) with respect to data persistence and real-time processing. Modes include: PERSISTENT (default), TRANSIENT (process, don't store), QUIESCENT (store, suppress notifications), and CEP (process transiently, suppress notifications).  

{{< c8y-details title="Developer details" >}}
For REST, the processing mode is specified using the `X-Cumulocity-Processing-Mode` HTTP header. For MQTT, specific topics are used (s/, t/, q/, c/) to specify the processing mode.
{{< /c8y-details >}}  


### Protocol adapter {#protocol-adapter}

A service that allows devices using a specific protocol to connect to the {{< product-c8y-iot >}} platform.
An adapter is *payload-agnostic*, meaning that it manages the communication with the devices and routes payloads to and from the [Messaging Service](#messaging-service) without translating between the device message format and the {{< product-c8y-iot >}} domain model.
Contrast this with a [device agent](#device-agent) that actively translates device messages to and from the {{< product-c8y-iot >}} domain model.
The [MQTT Service](#mqtt-service) is a good example of a protocol adapter.
It allows *any* device that uses the MQTT protocol to connect, but a separate microservice must implement the mapping to {{< product-c8y-iot >}} measurements, alarms, events and other data types.


### Public Preview {#public-preview}

Public Preview denotes a feature release stage in the [Continuous Deployment model](#continuous-deployment) where a new feature is made available to any customer who opts in to use it. Features in this stage are not yet considered generally available as opposed to [Private Preview](#private-preview) and [General Availability](#ga).

See also [Preview features](/service-terms/previews/) in the documentation.
