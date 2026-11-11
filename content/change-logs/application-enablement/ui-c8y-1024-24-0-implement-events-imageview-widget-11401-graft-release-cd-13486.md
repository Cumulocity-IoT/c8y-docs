---
date: '2026-11-09'
title: New Event image view widget shows images attached to events
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-66153
version: 1024.24.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-11-09'
  - label: apj.cumulocity.com
    date: '2026-11-10'
  - label: jp.cumulocity.com
    date: '2026-11-10'
---
A new "Event image view" widget is available. It shows the images attached to the events of a device or group, for example, camera snapshots. Below each image, it shows the source, the type, and the time of the event.

* In live mode, the widget shows the newest image. With auto-refresh enabled, it moves to each new image.
* In history mode, the widget shows the images from the selected time range and loads 50 events at a time. To load older images, move the slider to the oldest image and click **Load older images**.
* To move between the images, use the slider. To show them as a slideshow, click **Play slideshow**.
* In live mode, click **Download** to save the current image. In history mode, you can download the loaded images as a ZIP file or export them to an animated GIF file.

You can limit the widget to one event type and include the events of child devices. For details, see [Event image view](/cockpit/widgets-collection/#event-image-view).
