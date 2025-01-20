---
weight: 10
title: Introduction
layout: redirect
helpcontent:
- label: asset-hierarchy
  title: Assets
  content: "To create an asset, use asset models as the blueprint, which consists of one or more asset properties as well as one or more child asset models.  


  An asset hierarchy consist of a root asset model followed by all its subsequent child asset models. Each hierarchy level can consist of asset properties for the asset, as well as its subassets and devices.


  To get started, open the **Configuration** menu in the navigator and create the necessary asset models and asset properties in the **Asset models** and **Asset properties** pages respectively. Afterwards, navigate back to the **Assets** menu in the navigator and click **Add asset** on the top right corner to create the assets."
---

### Assets {#assets}

In the DTM application assets are the digital representation of physical assets.
An asset in the DTM application can contain subassets and devices.
You also have the opportunity to define properties or parameters of an asset through [asset properties](/dtm/asset-types/#asset-properties).

To work with assets in the DTM application, navigate to the **Assets** page using the navigator menu on the left.
When you first start using the DTM application, no assets are displayed in the **Assets** page by default.

If you already created assets, you find them listed in a hierarchical view on this page.

![assets-view](/images/dtm/assets/dtm-assets-view-assets.png)

{{< c8y-admon-req >}}
ROLES & PERMISSIONS

- To view all assets: READ permission for permission type "Inventory"
- To add/update/delete assets: CREATE/ADMIN permission for permission type "Inventory"
- To view specific assets: READ permissions for "Inventory" in the inventory roles
- To manage or delete specific assets: READ and CHANGE permissions for "Inventory" in the inventory roles

Note that global inventory permissions override inventory role permissions. By default, the user has full access to assets created by them regardless of permissions granted to them. See [Managing permissions](/standard-tenant/managing-permissions/) for further information.
{{< /c8y-admon-req >}}

### Asset hierarchy {#asset-hierarchy}

An asset hierarchy is a structure that organizes multiple assets and devices into a hierarchy, allowing for the visualization and management of complex systems.

The asset hierarchy is displayed in the **Assets** page. An asset hierarchy consists of a root asset and all its subsequent subassets. Click **Add asset** to create the entire hierarchy of an asset in the **New asset** page. For details, see [To create an asset](/dtm/asset-hierarchy/#to-create-an-asset).

**Example:**

If you create the root asset "Wind turbine" with the subasset "Rotor", which has a subasset "Blade" then the hierarchy would be as follows:

Wind turbine > Rotor > Blade

Initially, all the asset hierarchies are collapsed and it lists only the root assets. The list also shows certain asset details, for example, asset model and description. Click the expand icon <i class="dlt-c8y-icon-forward text-primary icon-20"></i> to the left of each asset to view the next level of subassets. Note that the devices assigned to an asset is not shown in the asset hierarchy.

Click the asset name to view the asset details and the devices assigned to it.

To edit or delete an asset from the **Assets** page, click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the right of the row and click either **Edit** or **Delete**.
To delete multiple assets at once, select one or more assets and click **Delete** in the top banner.

Select one or more assets of same type to relocate from its current hierarchy to another. For more information on how to move assets between hierarchies, see [To move assets](/dtm/asset-hierarchy/#to-move-assets).

![asset-hierarchy](/images/dtm/assets/dtm-assets-asset-hierarchy.png)
