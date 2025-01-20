---
weight: 50
title: Asset Model for Groups
layout: redirect
---

The default **Group** asset model allows any group to be treated as an asset, providing a unified, flexible, and consistent approach to managing assets.

To create an asset from the default **Group** asset model, in the **New asset** page, select the **Group (Default)** option from the **Choose asset model** dropdown menu on the top left. For information on how to create an asset, refer [To create an asset](/dtm/asset-hierarchy/#to-create-an-asset). 

##### Characteristics of a group asset

Since the default **Group** asset model does not enforce hierarchy, any group asset can be added to another group asset. However, only root assets created using models other than the default **Group** asset model are allowed under a group asset. 

Any asset added to a group asset can be moved out of it using the "Move to the root" option in the **Move assets** dialog.

{{< c8y-admon-info>}}

-  Currently, the [bulk import ](/dtm/asset-hierarchy/#creating-assets-bulk-import) feature does not support creating groups in bulk.
- Groups created in {{< product-c8y-iot >}} cockpit application are not listed in the Digital Twin Manager application.

{{< /c8y-admon-info>}}