---
weight: 10
title: Downloading diagnostics and logs
layout: redirect
---

{{< c8y-admon-info >}}
Diagnostics are not available for the Apama-ctrl-smartrules and Apama-ctrl-smartrulesmt microservices.
{{< /c8y-admon-info >}}

To download diagnostics information, you need READ permission for "CEP management". See [Managing permissions](/standard-tenant/managing-permissions/) for more information.

{{< c8y-admon-info>}}
ADMIN permission for "CEP management" does not include READ permission.
{{< /c8y-admon-info>}}

If you have READ permission for "CEP management", links for downloading diagnostics information are available when you click the **User** button in the Streaming Analytics application.
This opens the right drawer which contains a **Diagnostics** section with the following links:

- A **Basic diagnostics (ZIP)** link for downloading basic diagnostics information. This should typically be a few megabytes and take about 5 seconds to generate.
- An **Enhanced diagnostics (ZIP)** link for downloading enhanced, more resource-intensive diagnostics information.

It may be useful to capture this diagnostics information when experiencing problems, or for debugging EPL apps. It is also useful to provide to [product support](/additional-resources/contacting-support/) if you are filing a support ticket.
You can find the tenant ID in the **Platform info** section of the right drawer.
If you want to find out the version numbers of the different components on your tenant, click the **Download platform details** button in the **Platform info** section and then open the downloaded JSON file.
See [User options and settings](/get-familiar-with-the-ui/user-settings/) for more details.

Basic diagnostics information is provided in a ZIP file named *diagnostic-overview&lt;timestamp&gt;.zip* and includes the following information:

- The microservice log file contents, if available, including a record of the correlator's startup logging and the last hour or maximum of 20,000 lines of logging.

    {{< c8y-admon-info >}}
  In case of {{< product-c8y-iot >}} Edge Applicance VM, since Apama-ctrl is not deployed as a microservice in the VM-based distribution, Apama logs can be retrieved using the diagnostic utility. For more details, see [Apama log file locations](https://cumulocity.com/docs/edge/operating-edge/#apama-log-file-locations) and [Diagnostic utility](https://cumulocity.com/docs/edge/operating-edge/#diagnostics).
    {{< /c8y-admon-info >}}

- Apama-internal diagnostics information (similar to the `engine_watch` and `engine_inspect` command-line tools available in Apama).

- A copy of all EPL apps, smart rules and analytic models.

- A copy of any alarms that the Apama-ctrl microservice has raised.

- CPU profiling (over a duration of 5 seconds).

- EPL memory profiler snapshots.

- Some information from the environment (tenant details, environment variables).

- Version information for the components.

Enhanced diagnostics information is provided in a ZIP file named *diagnostic-enhanced&lt;timestamp&gt;.zip* and includes the following information:

- Contains what is in the above-mentioned *diagnostic-overview&lt;timestamp&gt;.zip* file.
- In addition, it includes requests that are more resource-intensive and may significantly slow down the correlator. These include the contents of the queues, CPU usage, and so on.

What you can see or do depends on your permissions:

- If you have only READ permission for "CEP management", you have read-only access to EPL apps and analytic models and you can access the diagnostics information.
- Without ADMIN permission for "CEP management", you are not able to activate or edit EPL apps or analytic models.
- If you have both READ and ADMIN permissions for "CEP management", you have read-write access and you can access the diagnostics information.
- If you have only ADMIN permission for "CEP management" and no READ permission, you are able to load, edit and deploy EPL apps and analytic models, but you are not able to see or access the diagnostics information.
