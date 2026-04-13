---
date: ""
title: Search for managed object ID now works when pasting values into the search box
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-66484
version: 1023.68.4
---
# Backport

This will backport the following commits from `develop` to `release/cd`:
- [fix(Web SDK): [MTM-66484] search for MO id does not happen if value
is pasted into search box
(#11681)](https://github.com/Cumulocity-IoT/cumulocity-ui/pull/11681)

<!--- Backport version: 9.5.1 -->

### Questions ?
Please refer to the [Backport tool
documentation](https://github.com/sorenlouv/backport)

[MTM-66484]:
https://cumulocity.atlassian.net/browse/MTM-66484?atlOrigin=eyJpIjoiNWRkNTljNzYxNjVmNDY3MDlhMDU5Y2ZhYzA5YTRkZjUiLCJwIjoiZ2l0aHViLWNvbS1KU1cifQ

Co-authored-by: Lukasz Janusz <114157358+luja-c8y@users.noreply.github.com>
Co-authored-by: Lukasz Janusz <lukasz.janusz@cumuloicty.com>
Co-authored-by: amio <amio@softwareag.com>