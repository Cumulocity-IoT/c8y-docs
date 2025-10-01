---
weight: 130
title: P
layout: bundle
sector:
  - getting_started
---

### Permission {#permission}

Permissions are the most granular level of access control in {{< product-c8y-iot >}}, defining the ability to perform a specific action (for example, READ, CREATE, ADMIN) on a particular type of data (for example, [alarms](#alarm), [inventory](#inventory)). Permissions are not assigned to [users](#user) directly. Instead, they are grouped into [roles](#roles).  


### Private Preview {#private-preview}

Private Preview denotes a feature release stage in the [Continuous Deployment model](#continuous-deployment-model) where a new feature is made available to a limited, invitation-only group of selected customers for feedback and testing. See also, [Public Preview](#public-preview) and [General Availability](#ga).


### Processing mode {#processing-mode}

The processing mode is a mechanism that allows clients to control how {{< product-c8y-iot >}} handles incoming data ([measurements](#measurement) and [events](#event)) with respect to data persistence and real-time processing. Modes include: PERSISTENT (default), TRANSIENT (process, don't store), QUIESCENT (store, suppress notifications), and CEP (process transiently, suppress notifications).  


### Public Preview {#public-preview}

Public Preview denotes a feature release stage in the [Continuous Deployment model](#continuous-deployment-model) where a new feature is made available to any customer who opts in to use it. Features in this stage are not yet considered generally available. See also, [Private Preview](#private-preview) and [General Availability](#ga).
