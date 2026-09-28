---
date: 2023-12-06T16:07:09.414Z
title: User administrator can no longer set password for other users
change_type:
  - value: change-inv-3bw8e
    label: Announcement
product_area: Platform services
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
---
As announced earlier, see the release notes for [release 10.17](https://cumulocity.com/releasenotes/release-10-17-0/announcements-10-17-0), to improve security, from a future version, user administrators will no longer be able to explicitly set passwords or email addresses for other users in the tenant. This change prevents that an attacker could have access to all users, in case the administrator account was compromised. Note that the administrator will still have the option to force the user to reset the password on the next login or disable the user.
