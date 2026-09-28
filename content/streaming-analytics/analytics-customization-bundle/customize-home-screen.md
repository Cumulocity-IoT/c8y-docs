---
weight: 30
title: Customizing the home screen of the Streaming Analytics application
layout: redirect
---

The cards that are shown on the home screen of the Streaming Analytics application contain text and links
which you can customize on a per-tenant and per-language basis. To do this, download the *documentation.json* file
for the language you wish to customize from the URL */service/cep/apamacorrelator/EN/documentation.json*
(this must be authenticated for a user in the {{< product-c8y-iot >}} tenant). Replace the "EN" within the URL with the
language code for the file you want to download.

The *documentation.json* file includes the URLs for the documentation links across the Streaming Analytics application
and the text that is shown on the home screen. You can modify this to your requirements.

After you have made all required changes, package the modified copies into a ZIP file containing the following files:

- *files/support/cumulocity/EN/documentation.json*
- *cumulocity.json*

The *cumulocity.json* file contains the following:

```
{
   "contextPath": "streaminganalytics-customization",
   "availability": "MARKET",
   "type": "HOSTED",
   "name": "streaminganalytics-customization",
   "key": "streaminganalytics-customization-key",
   "noAppSwitcher": true
}
```

Then upload the ZIP file using the Administration application: go to **Ecosystem** > **Applications**, click **Add application**, and select the method **Upload web application**.
See [Managing applications](/standard-tenant/ecosystem/#managing-applications) for detailed information.

You may need to clear your browser cache for the changes to take effect.

You can include multiple languages in a single ZIP file as needed. You can subscribe this to subtenants as needed from an {{< enterprise-tenant >}}.

On new releases of the platform, it is recommended that you review the source *documentation.json* file for any changes.
New entries in this file will be picked up with their default values.
