
---
weight: 30
title: Events
layout: redirect
---

Events are used to pass real-time information through {{< product-c8y-iot >}}.

Events come in three types:

-   A **base event** signals when something happens. An event can be triggered when a switch is switched on or off.
-   An **alarm** signals an event that requires manual action, for example, when a meter has been tampered with or the temperature of a fridge increases above a particular threshold.
-   An **audit log** stores events that are security-relevant and should be stored for auditing. For example, an audit log should be generated when a user logs into a gateway.

An event has one specific type (as specified in its naming convention), a time when the event occurred and a text to describe the event. An event refers to a source managed object in the inventory. This is an example of an event representation:

```json
{
    "type": "c8y_LocationUpdate",
    "time": "2010-11-13T18:28:36.000Z",
    "text": "Location updated",
    "source": {
        "id": "47634"
    },
    "c8y_Position": {
        "alt": 67,
        "lng": 6.15173,
        "lat": 51.211977
    }
}
```

Any event can be extended in the same way as described for managed objects above. In this example, we not only signal that an object moved, we also include the new position of the object in the form of a `c8y_Position` fragment.

An audit log extends an event through:

-   A username of the user that carried out the activity.
-   An application that was used to carry out the activity.
-   The actual activity.
-   A severity.

This is an example of an audit record structure:

```json
{
    "type": "c8y_SecurityEvent",
    "time": "2010-11-13T18:28:36.000Z",
    "text": "Gateway login failed",
    "source": {
        "id": "47633"
    },
    "user": "skywalker",
    "application": "Resort energy management",
    "activity": "login",
    "severity": "MINOR"
}
```

An alarm extends events through:

-   A status showing whether the alarm is active or cleared.
-   A time stamp when the alarm was last updated.
-   A classification such as critical, major, minor, warning.
-   A history of changes to the event in form of audit logs.

This is an example of an alarm that has been cleared:

```json
{
    "count": 1,
    "creationTime": "2020-03-19T12:16:31.586Z",
    "id": "20200301",
    "severity": "MAJOR",
    "source": {
        "id": "251982",
        "name": "My tracking device"
    },
    "status": "CLEARED",
    "text": "No data received from the device within the required interval.",
    "time": "2020-03-19T00:00:00.000Z",
    "type": "c8y_UnavailabilityAlarm"
}
```

More detailed information can be found in [Events](https://{{< domain-c8y >}}/api/core/#tag/Events), [Alarms](https://{{< domain-c8y >}}/api/core/#tag/Alarms) and [Audits](https://{{< domain-c8y >}}/api/core/#tag/Audits) in the {{< openapi >}}.
