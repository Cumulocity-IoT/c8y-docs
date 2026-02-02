---
date: ""
title: Make the message banner form branding dismissable
product_area: Platform services
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-65885
version: 1023.23.0
---
The message banner displayed in your application can now be dismissed by users in two different ways. Previously, the message banner reappeared after every application refresh, which could be disruptive to the user experience. Now you can dismiss it temporarily using the **Close** button, which will hide the banner until the next refresh. To permanently dismiss the banner, click **Acknowledge and close**. This stores the dismissal in the browser's local storage, so the banner does not reappear unless the browser cache is cleared, the user switches to a different browser, or a new message banner is configured in your branding settings. This change gives users more control over their experience while allowing administrators to ensure important messages are still communicated effectively through the branding configuration.