---
date: ""
title: "Updated confirmation message when deleting an asset on the Subassets page"
product_area: "Application enablement & solutions"
change_type:
    - value: "change-VSkj2iV9m"
      label: "Fix"
component:
    - value: "component-Tl88RYb4A"
      label: "Digital Twin Manager"
build_artifact:
    - value: "tc-wYIY0MBDO"
      label: "dtm"
ticket: "CTM-1588"
version: "1.1.1"
---
Previously, on the **Subassets** page, the confirmation message when deleting an asset was: `You are about to delete: "<<asset_name>>". This operation is irreversible. Do you want to proceed?`. The checkbox contained the message: `Also delete all devices inside "<<asset_name>>" and its subassets`. This caused confusion as it implied that not selecting the checkbox would prevent the deletion of its subassets. To clarify, the messages have been updated to: `You are about to delete: "<<asset_name>>" and all its subassets. This operation is irreversible.` Additionally, the checkbox message has been revised to: `Also delete all devices inside "<<asset_name>>"`.
