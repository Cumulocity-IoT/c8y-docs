---
date: 2026-03-31
title: HTML widget moved to General Availability
product_area: Application enablement & solutions
change_type:
  - value: change-inv-3bw8e
    label: Announcement
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-63358
version: 1023.0.0
---

The HTML widget has been migrated from AngularJS to Angular and is now generally available (GA). This migration brings enhanced security features and improved JavaScript support.

**Key improvements:**

- **Advanced security:** The widget now includes strict HTML sanitization by default to protect against XSS.attacks.
- **Better JavaScript support:** An advanced mode enables you to write custom web components for more sophisticated use cases.
- **Automatic migration:** Existing AngularJS widgets will be automatically migrated to the new Angular implementation.

**Important limitations:**

- **Web components:** Can only be written by Application administrators.
- **Disabling sanitization:** The default strict sanitization can only be disabled by cloning the Cockpit application and adjusting the setting in the application configuration under **Config > Application configuration**.
