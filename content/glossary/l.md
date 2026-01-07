---
weight: 90
title: L
layout: bundle
sector:
  - getting_started
_build:
  render: false

---

### Location {#location}

The location represents the geographical position of a [managed object](#managed-object). The location is represented by the standard `c8y\_Position` [fragment](#fragment), which contains altitude, longitude, and latitude coordinates. Managed objects with this fragment can be displayed on Map widgets.  

{{< c8y-details title="Developer details" >}}
Location information is updated by sending an event of type `c8y_LocationUpdate` that contains a `c8y_Position fragment` (`POST /event/events`). Additionally, the `c8y_Position` fragment must be updated directly in the managed object (`PUT /inventory/managedObjects/{id}`).
{{< /c8y-details >}}  
