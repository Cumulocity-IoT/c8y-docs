---
weight: 60
title: Deployment
layout: bundle
---

This section covers how to package and deploy smart functions to {{< product-c8y-iot >}}.

## Preparing your smart function

Before deployment, ensure your smart function is ready:

1. **Verify the function signature**
   Ensure your function uses the correct name and parameters for your component (for example, `onMessage` for Data Preparation, `onInput` for Streaming Analytics). Check the component documentation for the exact requirements.

2. **Test locally (if available)**
   Some components provide local development and testing tools. Use these to validate your function before deployment.

3. **Transpile TypeScript**
   If you wrote your function in TypeScript, transpile it to Javascript before deployment. The platform only accepts Javascript, so this build step is always required when using TypeScript.

4. **Include external libraries (if needed)**
   If your function depends on external Javascript libraries, bundle them with your function according to your component's packaging guidelines.

## Package structure

Smart functions are typically deployed as single files or packages containing:

- The main smart function file (Javascript or TypeScript).
- Any included external libraries bundled together.
- Optional metadata or configuration files (depends on component).

Check your component's deployment documentation for the exact package structure expected.

## Deployment methods

Different components may support different deployment methods. Common approaches include:

**Web user interface**
Most components provide a UI where you can upload or paste your smart function. This is the simplest method for getting started and is suitable for small functions or prototyping.

**REST API**
Components typically expose REST endpoints for programmatic deployment. This enables automation, CI/CD integration, and bulk management of smart functions.

**Command-line interface**
Some components offer CLI tools for deploying smart functions from your development environment.

**Infrastructure as code**
You may be able to define smart functions in configuration files and deploy them alongside other infrastructure, particularly in containerized or cloud-native deployments.

Check your specific component's documentation for the available deployment methods and examples.

## Uploading a smart function

The basic process is similar across components:

1. Prepare your smart function code (Javascript or TypeScript).
2. Use your chosen deployment method (UI, API, CLI) to upload the function.
3. Provide a name and optional description for the function.
4. Configure any component-specific settings (for example, which message types the function applies to).
5. Activate or enable the function.

The system validates your function and makes it available immediately after a successful upload.

## Managing smart functions

After deployment, you can:

**View function details**
Check the function's metadata, creation date, version, and associated configuration.

**Update a function**
Upload a new version of the function. The system replaces the previous version, and the new logic is applied immediately to new invocations.

**Test or preview**
Some components let you test your function against sample data before fully activating it.

**Monitor execution**
View logs, error messages, and performance metrics for your deployed functions.

**Disable or remove**
You can disable a function temporarily or delete it permanently.

## Versioning and rollback

Consider these practices for managing multiple versions:

- **Keep version control**: Use a repository to track changes to your smart function code.
- **Tag releases**: Mark stable versions in your repository for easy reference.
- **Test before deploying**: Validate updates with sample data before enabling them in production.
- **Document changes**: Note what changed in each version to facilitate troubleshooting.

The component hosting your smart function may provide versioning features (for example, keeping history of previous deployments). Check your component's documentation for these capabilities.

## Monitoring and debugging

After deployment, monitor your smart function:

**Check logs**
System logs show console output from your function, including any errors or warnings. Use `console.log()`, `console.warn()`, and `console.error()` strategically to debug issues.

**Review metrics**
Many components track execution counts, error rates, and performance metrics. Use this data to identify problems and optimize.

**Test with real data**
If possible, enable your function in a test environment and monitor real invocations to ensure it works as expected.

**Iterate quickly**
Smart functions are easy to update. If you identify an issue, fix it, re-deploy, and the new logic takes effect immediately.

## Best practices for deployment

- **Start small**: Deploy a simple function first to validate the process, then add complexity.
- **Use descriptive names**: Give your functions clear, meaningful names that indicate their purpose.
- **Document your functions**: Add comments explaining what the function does and why, making it easier for others to maintain it.
- **Test updates**: Before updating a function in production, test the new version against realistic data.
- **Monitor continuously**: Keep an eye on logs and metrics after deployment to catch issues early.
- **Plan for failures**: Write functions that handle errors gracefully and don't break the pipeline if something goes wrong.

## Component-specific guidance

Deployment details vary by component. For specific instructions, see:

- Data Preparation deployment guide
- Streaming Analytics deployment guide
- thin-edge.io deployment guide

## Next steps

See practical examples of deployed smart functions in [Examples](../examples/).

Understand the security and resource limits that apply to your deployed function in [Sandbox and limits](../sandbox-and-limits/).

For component-specific features and configuration, check the documentation for your implementation.
