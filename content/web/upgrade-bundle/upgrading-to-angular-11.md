---
title: Upgrading to Angular 11
layout: redirect
weight: 500
date: '2025-09-01T10:26:32Z'
lastmod: '2025-09-01T10:40:40Z'
---
Angular 11 is supported from version 10.10.4.0. AOT and Ivy are not yet supported. The following configuration changes are required before you can run the application:

- Fix @angular/compiler-cli to version 11.2.9 or lower
- Remove the `index` property from the angular.json file, if it exists. Also, the `--index` flag from ng-cli is not supported. A custom index.html file can be passed with `ApplicationOptions` `indexTemplate`.

{{< c8y-admon-info >}}
If you use Visual Studio Code, make sure that in the Angular Language Service Plugin the option "Use legacy View Engine language service" is not selected.
{{< /c8y-admon-info >}}
