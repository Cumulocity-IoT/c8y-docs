---
weight: 50
title: Groups as Assets
layout: redirect
---

The default **Group** asset model allows any group to be treated as an asset, providing a unified, flexible, and consistent approach to managing assets.

To create an asset from the default **Group** asset model, in the **New asset** page, select the **Group (Default)** option from the **Choose asset model** dropdown menu on the top left. For information on how to create an asset, refer [To create an asset](/dtm/asset-hierarchy/#to-create-an-asset). 

##### Characteristics of a group asset

Since the default **Group** asset model does not enforce hierarchy, any group asset can be added to another group asset. However, only root assets created using models other than the default **Group** asset model are allowed under a group asset. 

Once added to a group asset, a non-group asset can be moved back to the root level.

{{< c8y-admon-info>}}

- The Bulk import feature does not support creating group assets in bulk. 
- Groups created in {{< product-c8y-iot >}} cockpit application are not listed in the Digital Twin Manager application.

{{< /c8y-admon-info>}}