---
title: C8Y Command Line Tool (CLI)
layout: redirect
weight: 10
---

To support you with bootstrapping, running and deploying applications we have build a Command Line Interface. The tool is the successor of the `cumulocity-node-tools`. To avoid conflicts, it listens to the new command `c8ycli` instead of `c8y`. You can install it via npm:

```
npm install -g @c8y/cli
```

If you don't want to install the `@c8y/cli` globally you can also run it with the npx command. For example, you can scaffold a new project quickly by executing the following command:

```
npx @c8y/cli new
```

A new project creates a local `@c8y/cli`. You can run the project by navigating to its directory and executing the following commands:

```
npm install && npx c8ycli serve
```

The `serve` command starts a local development server. It supports two important flags:

- `-u`: The -u parameter specifies the {{< product-c8y-iot >}} instance to which all API requests are proxied. This means data is actually pulled from the configured {{< product-c8y-iot >}} instance.
- `-p`: The port to use. If not defined, port 9000 is used. If you have a server running on this port already, the command will fail. The application will then be served at the URL `http://localhost:<<port>>/apps/<<your-application-name>>/`. Tip: Click the URL in the terminal while holding the "control" key.

### General usage {#general-usage}

```
c8ycli [options] [command]
```

{{< c8y-admon-info >}}
The commands must be executed from the root path of the project.
{{< /c8y-admon-info >}}

### Options {#options}

```
    -u, --url <url>                 The URL of the remote instance
    --version                       Provides version number
    -h, --help                      Provides usage information
```

### Commands {#commands}

All the commands except of `new` take an array of [glob patterns](https://en.wikipedia.org/wiki/Glob_%28programming%29). These will be resolved to directories or entry point manifests.

```
    new [name] [template]                   Creates a folder to start a new application or extend an existing one
    serve [options] [appPaths...]           Runs local development server
    build [options] [appPaths...]           Builds the specified applications
    deploy [options] [appPaths...]          Deploys applications from the specified paths
    locale-extract [options] [srcPaths...]  Extracts all strings for translation and outputs the .po files to defined folder
```

### The `new` command {#the-new-command}

The `c8ycli new [name] [template]` command creates an empty application or extends an existing application (Cockpit, Devicemanagement or Administration). To extend an existing application use the name of the existing application as `[name]` and `[template]` like this:

```
$ c8ycli new cockpit cockpit
```

{{< c8y-admon-tip >}}
The `c8ycli new` command has a `-a` flag which defines which package to use for scaffolding. This way you can also define which version of the app you want to scaffold, for example:

`c8ycli new my-cockpit cockpit -a @c8y/apps@1004.11.0` will scaffold an app with the version `10.4.11.0`
  {{< /c8y-admon-tip >}}

The `c8ycli new` command can also be provided on its own without the `[name]` and `[template]` options. In this case, follow the steps below to complete the process via the interface before the application is scaffolded.

**Step 1:**

```
? Enter the name of the project: (my-application)
```

The first step asks for the project name. If no project name is entered, the default value `my-application` is used.

{{< c8y-admon-info >}}
This step can also be skipped if the name is provided in the initial command: `c8ycli new my-application`.
{{< /c8y-admon-info >}}

**Step 2:**

```
? Which base version do you want to scaffold from? (Use arrow keys)
> 1010.0.X (latest)
> 1011.X.0 (next)
> 1011.0.X
> 1009.0.X
> 1007.0.X
> 1006.0.X
> other
```

In the second step, the base scaffolding version must be selected. The interface will provide the CD version (latest), as well as older yearly releases. Additionally a version can be manually entered by selecting the `other` option.

**Step 2 (other):**

```
? Enter the desired version:
```

In this step, the desired version must be entered manually, for example, `1010.0.0`.

{{< c8y-admon-info >}}
This question will appear only if `other` was selected in the previous step.
{{< /c8y-admon-info >}}

**Step 3:**

```
? Which base project do you want to scaffold from?
  administration
  application
  cockpit
  devicemanagement
  hybrid
  tutorial
```

In the final step, the base project to scaffold from must be selected.

{{< c8y-admon-info >}}
This step will only show projects which are available for the selected version in Step 2.
{{< /c8y-admon-info >}}

### Application options {#application-options}

The application options can be defined with `--app.<option>=<value>`. These will be applied to all applications found with `[appPaths...]`.

```
    --app.name="My Application"
    --app.key=myapp-key
    --app.contextPath=myapplication
    --app.brandingEntry="./branding/mybranding.less"
```

### Webpack options {#webpack-options}

The webpack options can be defined with `--env.<option>=<value>`. These will be directly passed to the webpack configuration.

```
    --env.mode="production"
    --env.hmr
```
