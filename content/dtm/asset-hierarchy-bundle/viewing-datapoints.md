---
weight: 32
title: Viewing Asset data points
layout: redirect
---


To view the data points for a specific asset, navigate to the **Assets** page by selecting the desired asset from the asset hierarchy. In the asset details view, select the **Data points** section.

### Understanding the Columns in the Data Points Tab
The **Data points** section presents a table all relevant information about the data points associated with the selected asset. Each row in the table represents a unique data point with the following columns:

| Column | Description
| ---------- | -----------
| Measurement Series | The fragment and series (e.g., c8y_Temperature → T), clearly identifying the specific type of measurement being tracked. The measurement series represents the unique identifier for the data point and its particular data stream.
| Data Point Template | Indicates if a predefined template from the Cumulocity Data Point Library is applied to this measurement. If a template matches the fragment and series, it provides default visualization settings (like color and label) and pre-configured threshold rules for alarms.   
| Source | Identifies the unique ID, or if available the name, of the device or managed object that is generating this measurement. For linked data points, this shows where the linked data point originates from.   
| Status | The current state of the data point, possibly indicating whether it is actively receiving data, requires further configuration, or if its source is unavailable. This is crucial for troubleshooting and understanding data flow and is paericularly useful for linked data points.
| Latest Value | Displays the most recently reported numerical value for this data point including it's unit. If the data point is not yet configured or linked, it may show *Not Configured*.


### Data Point Statuses

The **Status** column provides immediate feedback on the state of a data point. Understanding these statuses is key to ensuring assets are receiving the expected data. Statuses currently supported in the DTM application are:

| Column | Description
| ---------- | -----------
| Linked | The data point is a linked data point and is successfully connected to its designated source (managed object/device). This indicates a fully operational link, however, it does not indicate if the link source is actively receiving measurements.
| Source missing | The managed object (device) configured as the source for this linked data point cannot be found or is currently unavailable in the Cumulocity inventory. This could be due to the device being deleted. The link itself is defined, but its target is absent.
| Incomplete | The data point link has been initiated, and its fragment and series are defined, but it requires further action to become fully operational. Typically, this means a specific source device or managed object needs to be selected and assigned to the data point for the link to be established.