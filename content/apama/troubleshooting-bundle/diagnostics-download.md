---
weight: 10
title: Downloading diagnostics and logs
layout: redirect
---

If a user has READ permission for "CEP management", then two links for downloading diagnostics information are available in both the Apama EPL Apps and Apama Analytics Builder web applications: one for downloading basic diagnostics information (the **Diagnostics** link) and another one for downloading enhanced (more resource-intensive) diagnostics information (the **Enhanced** link). These links are shown at the bottom of the web application's starting page (that is, in the EPL application manager and in the model manager). 

It may be useful to capture this diagnostics information when experiencing problems, or for debugging EPL applications. It is also useful to provide to support if you are filing a support ticket. 

You can see a version number in the EPL application manager and in the model manager. It is shown next to the above links.

Basic diagnostics information is provided in a ZIP file named *diagnostic-overview&lt;timestamp&gt;.zip* and includes the following information (this should be typically a few Megabytes, and be generated in about 5 seconds):

- The microservice log file contents, if available, including a record of the correlator's startup logging and the last hour or maximum of 20,000 lines of logging.

    > **Info:** In case of Cumulocity IoT Edge 10.6.0, since Apama is not a microservice, Apama logs can be retrieved using the diagnostic utility. For more details, see [Apama log file locations](/edge/operation/#apama-log-file-locations) and [Diagnostics](/edge/operation/#diagnostics) both in the *Cumulocity IoT Edge* guide.

- Apama-internal diagnostics information (similar to the `engine_watch` and `engine_inspect` command-line tools available in Apama).

- A copy of all EPL applications, smart rules and Analytics Builder models.

- A copy of any alarms that the Apama-ctrl microservice has raised.

- CPU profiling (over a duration of 5 seconds).

- Some information from the environment (tenant details, environment variables).

- Version numbers of the components.

Enhanced diagnostics information is provided in a ZIP file named *diagnostic-enhanced&lt;timestamp&gt;.zip* and includes the following information:

- Contains what is in the above-mentioned *diagnostic-overview&lt;timestamp&gt;.zip* file. 
- In addition, it includes requests that are more resource-intensive and may significantly slow down the correlator, including EPL memory profiler snapshots and contents of queues. 

What a user can see or do depends on the permissions:

- A user with only READ permission for "CEP management" has read-only access to the Apama EPL applications and Analytics Builder models. 
- Without ADMIN permission for "CEP management", the user is not able to activate or edit Apama EPL applications or Analytics Builder models.
- If a user has both READ and ADMIN permissions for "CEP management", the user has read-write access and can access the diagnostics information.
- If a user has only the ADMIN permission for "CEP management" and no READ permission, the user is able to load, edit and deploy Apama EPL applications and Analytics Builder models, but is not able to see or access the diagnostics information.
