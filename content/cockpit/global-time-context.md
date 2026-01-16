---
weight: 42
title: Global time context
layout: bundle
outputs:
  - html
  - json
sector:
  - app_enablement
helpcontent:
  - label: global-time-context
    title: Global time context
    content: "The global time context is the toolbar at the top of dashboards that lets you control the time range, auto-refresh, and data aggregation for all widgets at once. Instead of setting these options in each widget individually, you configure them once and all compatible widgets update together.


    The toolbar provides centralized time control, auto-refresh capabilities, and data aggregation options. Your settings are saved in the URL for bookmarking and sharing."
---

The global time context is the toolbar at the top of dashboards that lets you control the time range, auto-refresh, and data aggregation for all widgets at once. Instead of setting these options in each widget individually, you configure them once and all compatible widgets update together.

![Global time context toolbar](/images/users-guide/cockpit/cockpit-global-time-context-toolbar.png)

<!--PLACEHOLDER: Screenshot showing the full toolbar with all controls visible: Mode toggle, Time Range dropdown, Auto-refresh toggle, Aggregation options-->

{{< c8y-admon-related >}}

- [Application enablement & solutions > Cockpit > Working with dashboards](/cockpit/working-with-dashboards/) for details on creating and managing dashboards.
- [Application enablement & solutions > Cockpit > Widgets collection](/cockpit/widgets-collection/) for details on available widget types.
  {{< /c8y-admon-related >}}

The toolbar contains the following controls:

| Control      | Description                          |
| :----------- | :----------------------------------- |
| Mode toggle  | Switch between Live and History mode |
| Time range   | Select the time period to display    |
| Auto-refresh | Toggle automatic data refresh        |
| Aggregation  | Choose how data points are grouped   |

The toolbar only appears if at least one widget on the dashboard is connected to the global time context. If all widgets are unlinked, a red icon appears in the toolbar indicating that no widgets are synchronized.

![Toolbar with no synced widgets](/images/users-guide/cockpit/cockpit-global-time-context-no-synced-widgets.png)

### Supported widgets {#supported-widgets}

Not all widgets currently support the global time context. Support is being progressively extended to more widgets. Additionally, each widget may support a different set of time context capabilities:

- **Time range** - The widget respects the selected time period
- **Auto-refresh** - The widget refreshes when auto-refresh is enabled
- **Aggregation** - The widget groups data according to the selected aggregation level


### Live mode and History mode {#live-and-history-mode}

The global time context operates in two modes:

**Live mode** shows a rolling time window that moves forward automatically. For example, "Last hour" at 3:00 PM shows 2:00 PM - 3:00 PM. At 3:05 PM, it automatically shows 2:05 PM - 3:05 PM. This mode is suitable for monitoring current status.

![Live mode indicator](/images/users-guide/cockpit/cockpit-global-time-context-live-mode.png)

**History mode** shows a fixed time period. When you select specific dates, the widgets always show that exact period regardless of when you view them. This mode is suitable for analyzing past events.

![History mode indicator](/images/users-guide/cockpit/cockpit-global-time-context-history-mode.png)

### To select a time range {#to-select-time-range}

The time range determines which data is displayed in the widgets.

![Time range presets](/images/users-guide/cockpit/cockpit-global-time-context-time-range-options.png)

Available preset options:

| Option      | Description                      |
| :---------- | :------------------------------- |
| Last minute | 60 seconds ago to now            |
| Last hour   | 1 hour ago to now                |
| Last day    | 24 hours ago to now              |
| Last week   | 7 days ago to now                |
| Last month  | Approximately 30 days ago to now |
| Custom      | Selected start date to now       |

In History mode, you can also select a custom time range where you can specify exact start and end dates.

![Time range history mode](/images/users-guide/cockpit/cockpit-global-time-context-time-range-options-history.png)

### To enable or disable auto-refresh {#to-enable-disable-auto-refresh}

Auto-refresh periodically reloads data in all widgets. When enabled, most widgets refresh every 5 seconds, while some (such as the "Data point graph" widget) update via realtime connections.

Click the **Auto-refresh** toggle in the toolbar to enable or disable automatic data refresh.

![Auto-refresh toggle](/images/users-guide/cockpit/cockpit-global-time-context-auto-refresh.png)

{{< c8y-admon-info >}}
In some widgets (such as the "Alarm list" widget), scrolling down unlinks the widget from the global time context. To relink it, scroll back up or click the link button in the widget header.
{{< /c8y-admon-info >}}

### To change data aggregation {#to-change-data-aggregation}

Aggregation groups multiple data points into summarized values. This improves performance and readability for large time ranges.

![Aggregation options](/images/users-guide/cockpit/cockpit-global-time-context-aggregation.png)

In the **Aggregation** section of the toolbar, select one of the available options:

| Type     | Description                         |
| :------- | :---------------------------------- |
| None     | No grouping, shows raw data points  |
| Minutely | Groups data into 1-minute intervals |
| Hourly   | Groups data into 1-hour intervals   |
| Daily    | Groups data into 1-day intervals    |

{{< c8y-admon-info >}}
Some aggregation options may be disabled if they don't make sense for your selected time range. For example, **Daily** aggregation is disabled for ranges less than 1 day.
{{< /c8y-admon-info >}}

### To link or unlink a widget {#to-link-unlink-widget}

Widgets can be linked or unlinked from the global time context. When linked, a widget is synchronized and updates automatically when you change the time range, aggregation, or refresh settings. Unlinked widgets operate independently with their own time controls.

#### Using the link icon

Look for the link icon in the widget header. Click the icon to toggle between states.

**Linked** - The widget is synchronized with the global time context.

![Linked widget](/images/users-guide/cockpit/cockpit-global-time-context-widget-linked.png)

**Unlinked** - The widget has independent time controls.

![Unlinked widget](/images/users-guide/cockpit/cockpit-global-time-context-widget-unlinked.png)

Unlinking widgets is useful for comparing different time periods side-by-side.

#### Using widget configuration

You can also configure the time context in the widget settings. By default, new widgets are connected to the global time context.

In the widget configuration, expand the **Time context** section. Select one of the following options:

**Dashboard** - The widget uses the global time context.

![Time context configuration - Dashboard](/images/users-guide/cockpit/cockpit-global-time-context-widget-config-dashboard.png)

**Widget** - The widget uses its own time settings.
When **Widget** is selected, additional options appear allowing you to configure the widget's own time range, mode, and auto-refresh settings.

![Time context configuration - Widget](/images/users-guide/cockpit/cockpit-global-time-context-widget-config-widget.png)

{{< c8y-admon-info >}}
Not all widgets support global time context. Some widgets are configured to operate independently and have their own time picker within the widget. These widgets do not show a link icon.
{{< /c8y-admon-info >}}

### URL persistence {#url-persistence}

Your global time context settings are automatically saved in the URL. This allows you to bookmark dashboards with specific time configurations or share links that preserve your selected time range, mode, and aggregation settings.
