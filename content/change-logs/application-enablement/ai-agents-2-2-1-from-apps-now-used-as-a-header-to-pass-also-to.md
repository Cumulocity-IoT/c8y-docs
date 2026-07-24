---
date: ""
title: fromApps now used as a header to pass also to agent-2-agent tool (#662)
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-VtytA3d55
    label: AI Agents
build_artifact:
  - value: tc--gWykZ78v
    label: ai-agents
ticket: MTM-66754
version: 2.2.1
---
Main issue was, that a agent-2-agent call with subscribed agents wasn't
working, as the fromApps url parameter was not passed. Now we changed it
from url-parameter to `x-from-app` header which can be easily attached
to follow up request. The URL parameter still exist, but is marked as
deprecated.

Before - agent not found:
<img width="1786" height="1027" alt="fromApp-before-fix"
src="https://github.com/user-attachments/assets/98425046-642c-4073-a8f0-c3ee5e6a88b4"
/>

---------

Co-authored-by: Copilot Autofix powered by AI <175728472+Copilot@users.noreply.github.com>