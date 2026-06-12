---
date: ""
title: "prevent potential data loss from highly concurrent updates on assets"
product_area: "Application enablement & solutions"
change_type:
    - value: "change-QHu1GdukP"
      label: "Feature"
component:
    - value: "component-Tl88RYb4A"
      label: "Digital Twin Manager"
build_artifact:
    - value: "tc-wYIY0MBDO"
      label: "dtm"
ticket: "CTM-2926"
version: "1025.7.0"
---
The Asset API now implements per-asset and per-device locking to
serialize concurrent create and update operations. Previously, when
multiple operations updated the same asset or LinkedSeries pointing to
the same device simultaneously, data could be lost or corrupted because
changes were not properly sequenced. The new locking mechanism ensures
that concurrent updates on the same asset or device are processed
sequentially, preventing lost updates and maintaining data integrity.

Your applications and devices continue to operate normally, but you can
now safely perform concurrent update operations without risking data
loss. There might be a performance decrease for highly concurrent
operations due to the nature of the locking mechanism which waits for
the previous request to be finished before starting the next request.