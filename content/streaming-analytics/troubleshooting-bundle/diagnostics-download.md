---
weight: 10
title: Downloading diagnostics and logs
layout: redirect
---

{{< c8y-admon-info >}}
Diagnostics are not available for the Apama-ctrl-smartrules and Apama-ctrl-smartrulesmt microservices.
{{< /c8y-admon-info >}}

To download diagnostics information, you need READ permission for "CEP management". See [Managing permissions and roles](/standard-tenant/managing-permissions/) for more information.

{{< c8y-admon-info>}}
ADMIN permission for "CEP management" does not include READ permission.
{{< /c8y-admon-info>}}

If you have READ permission for "CEP management", you can download diagnostics information when you click the **User** button in the Streaming Analytics application.
This opens the right drawer which contains a **Diagnostics** section. Click **Download diagnostics** and select one of the following:

- **Basic diagnostics (ZIP)** for downloading basic diagnostics information. This is typically a few megabytes and takes about 5 seconds to generate.
- **Enhanced diagnostics (ZIP)** for downloading enhanced, more resource-intensive diagnostics information.

Diagnostics information is available for both per-tenant and multi-tenant microservices. For a multi-tenant microservice, the ZIP files only contain data of your own tenant. Enhanced diagnostics information is only offered to the tenant that owns the microservice. For all other tenants, **Download diagnostics** downloads the basic diagnostics information directly. See [Diagnostics for multi-tenant microservices](#diagnostics-multi-tenant) below.

It may be useful to capture this diagnostics information when experiencing problems, or for debugging EPL apps. It is also useful to provide to [product support](/additional-resources/contacting-support/) if you are filing a support ticket.
You can find the tenant ID in the **Platform info** section of the right drawer.
If you want to find out the version numbers of the different components on your tenant, click the **Download platform details** button in the **Platform info** section and then open the downloaded JSON file.
See [User options and settings](/get-familiar-with-the-ui/user-settings/) for more details.

What you can see or do depends on your permissions:

- If you have only READ permission for "CEP management", you have read-only access to EPL apps and analytic models and you can access the diagnostics information.
- Without ADMIN permission for "CEP management", you are not able to activate or edit EPL apps or analytic models.
- If you have both READ and ADMIN permissions for "CEP management", you have read-write access and you can access the diagnostics information.
- If you have only ADMIN permission for "CEP management" and no READ permission, you are able to load, edit, and deploy EPL apps and analytic models, but you are not able to see or access the diagnostics information.

#### Diagnostics for per-tenant microservices {#diagnostics-per-tenant}

Basic diagnostics information is provided in a ZIP file named *diagnostic-overview_&lt;timestamp&gt;.zip* and includes the following information:

- The microservice log file contents, if available, including a record of the correlator's startup logging and the last hour or maximum of 20,000 lines of logging.

- Apama-internal diagnostics information (similar to the `engine_watch` and `engine_inspect` command-line tools available in Apama).

- A copy of all EPL apps, smart rules and analytic models.

- A copy of any alarms that the Apama-ctrl microservice has raised.

- CPU profiling (over a duration of 5 seconds).

- EPL memory profiler snapshots.

- Some information from the environment (tenant details, environment variables).

- Version information for the components.

Enhanced diagnostics information is provided in a ZIP file named *diagnostic-enhanced_&lt;timestamp&gt;.zip* and includes the following information:

- Contains what is in the above-mentioned *diagnostic-overview_&lt;timestamp&gt;.zip* file.
- In addition, it includes requests that are more resource-intensive and may significantly slow down the correlator. These include the contents of the queues, CPU usage, and so on.

#### Diagnostics for multi-tenant microservices {#diagnostics-multi-tenant}

A multi-tenant microservice is shared by several tenants. The diagnostics ZIP files that you download from such a microservice only contain data that belongs to your own tenant, and that you can otherwise view yourself:

- A copy of all analytic models and template model instances.
- A copy of all smart rules.
- A copy of the alarms of your tenant from the last 24 hours, up to 2000 alarms.
- The log messages of your tenant from the last hour. As on the **Logs** page, only messages that can be attributed to your tenant are included, not the complete microservice log file. See [Viewing logs in the Streaming Analytics application](#logs-view).
- Your tenant details and tenant options.
- Version information for the components.

The ZIP files never contain data of other tenants. They also do not contain information about the shared microservice as a whole, such as Apama-internal diagnostics, metrics, queue contents, or environment details. They do not include CPU or memory profiling either, as these would slow down the microservice for all of its tenants.

The same applies when you download diagnostics from the tenant that owns the microservice. In that case, the ZIP files additionally contain the EPL apps and the names of the extensions, which belong to that tenant. Only the owning tenant can download the enhanced ZIP file, which also contains the extensions themselves.
