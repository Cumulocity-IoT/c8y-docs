---
weight: 20
title: Adding exports to widgets
layout: bundle
outputs:
  - html
  - json
sector:
  - app_enablement
---

While the export functionality itself is a standalone feature, you can combine it with other features that allow you to select data points. To use the export functionality in this way, you must integrate it with the respective feature, for example, the [Data points table](/cockpit/widgets-collection/#data-point-table) widget.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

- To generate exports in a widget: READ permission permission type "Measurement"
{{< /c8y-admon-req >}}

### To create an export in a widget {#to-create-an-export-in-a-widget}

The following example shows you how to integrate the export functionality with the [Data point table](/cockpit/widgets-collection/#data-point-table) widget.

1. Click the export icon <i class="dlt-c8y-icon-data-export text-primary icon-20"></i> at the top right of your data point table:

2. You see the **Generate export** dialog window, which allows you to configure the export further in the following categories:

   - **Time range**: Select the time range for your export. By default, it uses the same time range as configured in the widget's settings.
   - **Data scope**:
     - **Export mode**:  
       - Compact (selected by default) - all data will be exported to one file and downloaded directly by your browser.
       - Full - depending on the number of records to be processed, the data will either be available in a single ZIP file (containing one file per **Data point**), sent by email or not exportable at all.
       Refer to [Export modes](#export-modes) for further details.
     - **Aggregation**: Only available when you select the **Compact** mode. The default value is the same as in the widget's configuration. The following four options are available:
       - None
       - Minutely
       - Hourly
       - Daily
   - **File types**: Select the file format for exporting data. **Microsoft Excel** is selected by default, with **CSV** as another option. You can select both types simultaneously.

3. Click the **Download** button. The download results depend on your chosen export mode.

### Export modes {#export-modes}

The export functionality integrated in a widget offers you a number of export modes:

- **Compact**:
  - Processes up to 5,000 records per data point, or up to the data retention limit
  - Creates a single merged file containing all the data
  - Provides minimum and maximum values
  - Preview is not available
  - Supports optional data aggregation
- **Full**:
  - Processes up to 1,000,000 records per data point, or up to the data retention limit
  - For exports exceeding 50,000 records, data will be sent via email
  - Creates a compressed ZIP file containing separate data files for each selected data point
  - Preview is available
  - Does not support data aggregation

#### Export for data points with over one million records {#export-for-data-points-with-over-one-million-records}

When you have selected the **Full** export mode for a data point that contains more than one million records (our processing limit), the download option is disabled. To proceed with the export, you must reduce the number of records by narrowing the time range. Until you have done this, you see the following message:

<br>![Export exceeded one million records](/images/users-guide/cockpit/cockpit-exports-one-million-for-single-data-point.png)<br>

If you select multiple data points for export in the **Full** mode and one or more individual data points exceed the one million record limit (per data point), narrow the time range to reduce the number. Data points within the limit are not affected.

In this case, you will see a more detailed informational message explaining how many data points are affected and why:

<br>![Export exceeded one million records](/images/users-guide/cockpit/cockpit-exports-one-million-for-single-data-point-with-other-data-points.png)<br>
