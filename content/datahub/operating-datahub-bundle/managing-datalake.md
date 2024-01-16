---
weight: 50
title: Managing the data lake
layout: redirect
---

{{< product-c8y-iot >}} DataHub uses a data lake to store data being offloaded from the {{< product-c8y-iot >}} operational database. The data is organized in hierarchical folders, following a temporal hierarchy. Within the folders the offloaded data is organized in Parquet files. During the offloading process {{< product-c8y-iot >}} DataHub creates temporary Parquet files, holding intermediate data, which are deleted afterwards. In order to prevent data being spread over multiple small files, a compaction process is executed regularly, producing fewer, larger files. 

The contents and hierarchy of the data lake should not be modified. There is a high risk that data gets lost and subsequent querying of the data lake produces incomplete results.

### Empty Parquet files

{{< product-c8y-iot >}} DataHub may produce empty Parquet files in certain constellations, like an execution node crashing during a write process. In case such empty files exist in the data lake, the initial configuration as well as offloading runs will fail. This requires interaction with the data lake. {{< product-c8y-iot >}} DataHub does not delete those empty files automatically. You have to delete them manually using the tooling of your data lake provider, like AWS S3 Console or Azure Storage Explorer.

If the initial configuration has failed due to an empty Parquet file, the error message shown during the failed configuration attempt provides the details on the file. This includes the folder containing the empty Parquet file, like *c8y_cdh_temp/connectionTest*. You have to delete the folder with all its sub-folders, including potential other non-empty parquet files, in order to avoid inconsistencies caused by incomplete, partially written data.

If an offloading has failed, the associated error is shown in the job history, providing details on the empty Parquet file causing the error. You have to browse to the associated collection folder in the data lake, like *events* or *alarms*. Within that folder a couple of sub-folders can exist, starting with *incremental_*, *daily_*, *monthly_*, or *chunk_*. The error message gives you the corresponding folder in which that empty Parquet file is located, like *events/incremental_1694787385*. You have to delete the folder with all its sub-folders. With the next offloading run, the corresponding timeframe of data within that folder will be offloaded again, so that no data will be lost. However, data might be lost if the data already moved out of the retention window in the operational database before a corresponding offloading was successfully executed.