---
weight: 10
layout: redirect
title: Unit definitions

helpContent:
- label: unit-definitions
  title: Unit definitions
  content: "A unit definition groups the units that measure the same physical quantity, such as Energy or Length. Each unit has a symbol, aliases, and prefixes.


  Aliases are the labels that devices send for a unit, such as J, joule, or joules. Derived mappings combine each prefix alias with each unit alias, such as kJ or kilojoule.


  To change the aliases and the prefixes of the units, click the name of the unit definition."
---

The unit catalog defines the units that devices use in their measurements. On the **Unit definitions** page, you view the unit definitions of the catalog and adapt the labels that your devices send for each unit.

The unit catalog uses the following terms:

- **Unit definition**: A group of units that measure the same physical quantity, such as Energy or Length. Each unit definition has a base unit, such as Joule for Energy.
- **Unit**: One way to express the physical quantity, such as Degree Celsius or Degree Fahrenheit. Each unit has a symbol, such as °C, and a unit system, such as Metric or Imperial.
- **Alias**: A label that a device can send for a unit, such as J, joule, or joules. The symbol of a unit is always one of its aliases.
- **Prefix**: A power of ten that is combined with a unit, such as Kilo (10³) or Milli (10⁻³). Each prefix has its own aliases, such as k and kilo for Kilo.
- **Derived mapping**: A combination of a prefix alias and a unit alias, such as kJ or kilojoule. Digital Twin Manager creates the derived mappings of every configured prefix.

{{< c8y-admon-info >}}
The **Unit definitions** page is part of the **Unit Definitions** plugin, which is not installed by default. To show the page in Digital Twin Manager, install the **Unit Definitions** plugin in the Digital Twin Manager application. For details, see [Plugins](/standard-tenant/ecosystem/#plugins).
{{< /c8y-admon-info >}}

{{< c8y-admon-info >}}
Your changes apply only to your tenant. The default unit catalog of Digital Twin Manager does not change.
{{< /c8y-admon-info >}}

{{< c8y-admon-req >}}
ROLES & PERMISSIONS

- To see **Unit definitions** in the navigator: CREATE, UPDATE, or ADMIN permission for the "Digital twin definitions" permission type
- To edit unit definitions: CREATE or ADMIN permission for the "Inventory" permission type, and UPDATE or ADMIN permission for the "Digital twin definitions" permission type
{{< /c8y-admon-req >}}

To reach the **Unit definitions** page, navigate to **Libraries > Unit definitions**.

![Unit definitions list](/images/dtm/unit-definitions/dtm-unit-definitions-list.png)

The list shows the **Name**, **Description**, **Base unit**, and **Units** of each unit definition. The **Dimension** column is hidden by default. To show the column, click **Configure columns**.

To filter the list, click the column headers. To sort the list, click the **Name**, **Description**, or **Base unit** column header.

### To view the units of a unit definition {#to-view-the-units-of-a-unit-definition}

- Click the expand icon in the row of the unit definition.

The row shows each unit with its name, symbol, aliases, and prefixes. A dash means that the unit has no prefixes.

![Expanded unit definition](/images/dtm/unit-definitions/dtm-unit-definitions-expanded.png)

### To edit a unit definition {#to-edit-a-unit-definition}

1. Click the name of the unit definition. Alternatively, click **Edit** in the actions of the row.
2. In the **Edit** drawer, change the aliases and the prefixes of the units. For details, see [To add an alias](#to-add-an-alias), [To remove an alias](#to-remove-an-alias), [To add a prefix](#to-add-a-prefix), [To change a prefix](#to-change-a-prefix), and [To remove a prefix](#to-remove-a-prefix).
3. Click **Save**.

Digital Twin Manager saves the unit definition and shows a message such as "Unit definition "Energy" saved." The list shows your changes. To discard your changes, click **Cancel** instead of **Save**.

![Edit unit definition drawer](/images/dtm/unit-definitions/dtm-unit-definitions-edit.png)

{{< c8y-admon-info >}}
In the drawer, only the aliases and the prefixes of a unit are editable. The name, the description, and the base unit of a unit definition are read-only. The symbol and the unit system of each unit are also read-only. You cannot create or delete unit definitions or units.

Without the permission to edit unit definitions, the drawer opens read-only.
{{< /c8y-admon-info >}}

#### To add an alias {#to-add-an-alias}

- In the **Aliases** column of the unit or the prefix, type the alias in the **Add alias** field and press Enter.

The alias appears next to the other aliases, and the derived mappings show the new alias. To add several aliases at once, separate the aliases with commas.

{{< c8y-admon-info >}}
Digital Twin Manager does not add an empty alias or an alias that the unit or the prefix already has.
{{< /c8y-admon-info >}}

#### To remove an alias {#to-remove-an-alias}

- Click the remove icon of the alias.

Digital Twin Manager removes the alias and its derived mappings. You cannot remove the symbol of a unit. If a prefix has no aliases, the prefix has no derived mappings.

#### To add a prefix {#to-add-a-prefix}

- In the row of the unit, select a prefix in the **Select prefix** dropdown.

The prefix appears under **Configured prefixes** with its default aliases and its derived mappings. For example, the prefix Kilo has the default aliases k and kilo. Digital Twin Manager sorts the prefixes of a unit from the largest to the smallest power of ten. You cannot select a prefix that the unit already has.

![Configured prefixes with derived mappings](/images/dtm/unit-definitions/dtm-unit-definitions-prefixes.png)

#### To change a prefix {#to-change-a-prefix}

- In the row of the configured prefix, select another prefix in the dropdown.

The new prefix replaces the old prefix and starts with its own default aliases.

#### To remove a prefix {#to-remove-a-prefix}

- Click the remove icon in the row of the configured prefix.

Digital Twin Manager removes the prefix and its derived mappings from the unit.

### Conflicts {#unit-definition-conflicts}

While you edit a unit definition, Digital Twin Manager checks each change against the other unit definitions. If another unit already uses an alias or a derived mapping of your change, the drawer shows a message. Digital Twin Manager disables **Save** until you resolve the conflict.

**Example:** You add the alias watt to the unit Joule. The drawer shows the message "Alias 'watt' is already used by unit 'Watt' (Power)." To resolve the conflict, remove the alias watt.

![Conflict with an alias of another unit](/images/dtm/unit-definitions/dtm-unit-definitions-conflict.png)
