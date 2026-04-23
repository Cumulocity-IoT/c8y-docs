---
date: ""
title: Asset property mappings and global time context integration in HTML widget
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
ticket: MTM-66200
version: 1023.73.0
---
The HTML widget in Cockpit got two improvements:

- **Asset properties configuration**: instead of a read-only list of properties from the currently selected asset, which you could copy and paste as expressions into the HTML code editor, now you can browse and select properties not only from that asset but also from its children, including computed properties; selected properties can be pasted into HTML code as expressions.
- **Global time context integration**: the HTML widget is now integrated with dashboard's global time context,  and both `c8yContext` and the new `c8yProperties` objects update automatically when auto-refresh is enabled.

For more details, refer to the [HTML widget documentation](https://cumulocity.com/docs/cockpit/widgets-collection/#html).