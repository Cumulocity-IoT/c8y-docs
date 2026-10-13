---
date: ""
title: new details list view
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-VtytA3d55
    label: AI Agents
build_artifact:
  - value: tc--gWykZ78v
    label: ai-agents
ticket: MTM-67403
version: 2.6.0
---
The AI Agent Manager previously displayed agents in a split view with a list on the left and editor on the right, where your selection was only kept in memory. The interface now splits into two separate pages: a card list view at `#/ai-agents/list` that you can display as a grid or list, and individual detail pages for each agent at `#/ai-agents/list/<name>`. The card list includes a search function that matches agent names, descriptions, and source applications, along with filter options to show all agents, custom agents only, or subscribed agents only. Each agent card now displays an optional description field, and agents with the same name show visual indicators (overruled or overruling tags) instead of being grouped into collapsible rows. The detail page provides deep linking so every agent has its own URL, includes a breadcrumb for easier navigation, and prompts you to confirm if you try to leave with unsaved changes. When you rename an agent, the URL automatically updates to reflect the new name. The editor functionality remains unchanged, with tabs, test chat, and save options working as before. Additionally, a bug has been fixed where quickly switching between fields could silently drop your edits due to shared debouncing; each field is now debounced independently. When cloning agents, the source and overruled status are now always removed, ensuring consistent behavior across all clone operations. These changes improve your ability to manage and navigate between agents while maintaining a clearer separation between list and detail views.