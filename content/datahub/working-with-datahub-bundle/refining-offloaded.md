---
weight: 90
title: Refining offloaded Cumulocity data
layout: redirect
---

In addition to SQL querying using standard interfaces, you can utilize Dremio functionality to further refine and curate your offloaded data.

For a detailed description of all functionalities Dremio provides you can consult the [Dremio documentation](https://docs.dremio.com/).

### Accessing and logging into Dremio {#accessing-and-logging-into-dremio}

You access Dremio via a web browser. It has been tested with the following web browsers:

* Firefox (latest version)
* Chrome (latest version)

{{< c8y-admon-info >}}
Support for mobile devices like smartphones or tablets has not been tested.
{{< /c8y-admon-info >}}

To access Dremio, navigate to the home page. Under **Quick links** click on the **Dremio** icon. This will direct you to the **Login** screen of Dremio.

{{< c8y-admon-info >}}
Your Dremio user does not have administration rights in Dremio.
{{< /c8y-admon-info >}}

#### How to log into Dremio {#how-to-log-into-dremio}

On the **Login** screen, enter your Dremio account credentials. Click **Login** to enter Dremio.

When you log in successfully, you will be taken to the home page of Dremio.

When you want to log out, click on your username and select **Log out**.

### Sources and spaces {#sources-and-spaces}

On the home page of Dremio you will find at the left under **Datasets** two panels called **Spaces** and **Sources**.

#### Sources {#sources}

In the **Sources** panel there is the data source `YourTenantIdDataLake`, for example, `t47110815DataLake`. This source has been auto-configured for you and points to your data lake.

{{< c8y-admon-info >}}
Terminology-wise, {{< product-c8y-iot >}} DataHub replicates data from the Operational Store of {{< product-c8y-iot >}} into the data lake. For Dremio the data lake, comprising the target tables, is a data source as it allows reading data from it.
{{< /c8y-admon-info >}}

When you click on your data source it will be shown in the main panel. Clicking on the source in the main panel navigates into the data source. Here, you see a list of all target tables of your offloading pipelines. Clicking one of these target tables opens an SQL editor which allows you to run queries against that target table.

{{< c8y-admon-info >}}
You might also see a folder named *c8y_cdh_temp*. The folder is used for {{< product-c8y-iot >}} DataHub internal purposes and must not be deleted or altered.
{{< /c8y-admon-info >}}

#### Spaces {#spaces}

A space in Dremio helps in organizing your data sets. {{< product-c8y-iot >}} DataHub auto-configures a space which is named `YourTenantIdSpace`, for example, `t47110815Space`. A dataset in the space is referred to in queries as `YourTenantIdSpace.YourDataset`. As described in [Offloading {{< product-c8y-iot >}} base collections](/datahub/working-with-datahub/#offloading-base-collections), for the inventory, events, and alarms collections there are preconfigured views providing either all or latest data.

#### Job history {#job-history}

The **Job History** tab displays jobs/queries you have executed. It allows you to view details of a job and offers filter capabilities (time range, job status, query type, and queue). The **Profile** view inside the job detail view is very useful to investigate optimization potentials in your queries.

{{< c8y-admon-info >}}
The job history only contains queries that you have actively triggered; the jobs related to the data extraction are hidden.
{{< /c8y-admon-info >}}

### Creating views {#creating-views}

With {{< product-c8y-iot >}} DataHub, you can replicate data from a {{< product-c8y-iot >}} collection to a data lake using a default transformation of the data. As requirements for subsequent data analysis of the offloaded device data may vary over time, you should configure your offloading pipeline so that all potentially relevant data is included.

Depending on your use cases, you will often find the need to provide a view on the data, which limits, filters, or transforms the data, such as converting Celsius to Fahrenheit or extracting data from JSON fragments.

In Dremio, you can create such a view by defining a corresponding query and saving it as a new dataset. When saving that new dataset, you must select your space as the location and can freely select a name for the view. Once that is done, you can work with the new dataset as with any other source and run queries against it. This includes in particular querying this view from other clients as described in [Querying offloaded {{< product-c8y-iot >}} data](/datahub/working-with-datahub/#querying-offloaded).

{{< c8y-admon-info >}}
Such a view is per default not materialized, that is, it is not stored persistently. Each time you query the view, the underlying query defining the view is run against the source data. For the pre-defined alarms/events/inventory views, you can optionally activate view materialization during the offloading configuration.
{{< /c8y-admon-info >}}

#### Example {#example}
Consider the case that you want to visualize data in a reporting tool. The raw data volume is too high, so you want to instead show the hourly average of the column *myValue*. You can easily do that by creating a view with the following SQL statement and saving it as a view/virtual data set:

```sql
SELECT DATE_TRUNC('HOUR', "time") AS "time", AVG(myValue) AS hourlyAvg
FROM myTable
GROUP BY DATE_TRUNC('HOUR', "time")
```

The creation (and update) of views can be done via the Dremio SQL API, too. This is especially useful to automate tasks. The above example can be created or updated as follows.

```sql
CREATE OR REPLACE VDS YourTenantIdSpace.YourDesiredViewName AS
  SELECT DATE_TRUNC('HOUR', "time") AS "time", AVG(myValue) AS hourlyAvg
  FROM myTable
  GROUP BY DATE_TRUNC('HOUR', "time")
```

### Joining tables/views {#joining-tablesviews}

Views you have defined and target tables from your data lake can be joined as well. In Dremio you can either define joins using the SQL editor or a graphical interface.

A general use case for joining is to enrich your alarms, events, or measurement values with metadata from the inventory collection, for example:

```sql
SELECT *
FROM t47110815DataLake.Dremio.t47110815.alarms
JOIN t47110815DataLake.Dremio.t47110815.inventory
USING(id)
```
