---
title: Angular CLI before 10.19.x.x
layout: redirect
weight: 20
date: '2025-09-01T10:26:32Z'
lastmod: '2025-09-01T10:40:40Z'
---
When developing a pure Angular you can create an Angular CLI (`ng`-cli) project and add {{< product-c8y-iot >}} CLI to it.
This functionality is available for:
- Angular 7: Supported from version 10.4.2.0
- Angular 8: Supported from version 10.5.9.0
- Angular 11: Supported from version 10.10.4.0
- Angular 12: Supported from version 10.11.45.0
- Angular 14: Supported from version 10.15.132.0
- Angular 15: Supported from version 10.18.157.0


### Install Angular CLI {#install-angular-cli}

Follow the [instructions](https://angular.io/cli) to install @c8y/cli globally.

```sh
npm install -g @angular/cli@v8-lts
```

### Create a new project {#create-a-new-project}

```sh
ng new my-first-iot-project
cd my-first-iot-project
```

### Add {{< product-c8y-iot >}} CLI {#add-platform-cli}

```sh
ng add @c8y/cli
```

### Run application {#run-application}

```sh
ng serve
```

In your browser, open `http://localhost:4200/` to see the new application run.

You can configure the [application options](/web/application-configuration/#application-options) inside the package.json file and customize [branding](/web/application-configuration#branding-your-application) with LESS or CSS custom variables.
