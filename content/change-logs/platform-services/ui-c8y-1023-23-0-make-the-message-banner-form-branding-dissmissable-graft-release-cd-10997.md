---
date: ""
title: Custom message banners in branding can now be acknowledged and dismissed
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
Users can now permanently dismiss custom messages configured under **Branding** > **Message Banner**. Previously, these messages reappeared every time the page was refreshed, which could disrupt the user experience.

Users can clear these messages from the top of their screen in two ways:
- Close: Temporarily hides the message. It will reappear the next time the page is refreshed.
- Acknowledge and close: Confirms the user has read the message. The application will remember this preference for the specific browser being used and will not show the message again.

Note: The message will reappear if the administrator updates the banner configuration with a new text or if the user clears their browser cache.