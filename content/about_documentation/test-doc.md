Let’s get started
You first need to install Node.js to not only have a proper JavaScript runtime, but also the necessary package manager (npm) to install additional required tools and dependencies. The correct Node.js version depends on the Angular version, you want to develop your application with. In this tutorial, you will use the latest version of the @c8y/websdk, which depends on Angular 19.x.x. Based on this Angular version, you have to install at least Node.js ^18.19.1 (Version compatibility • Angular).

Once you have finished the setup of Node.js you have to use @angular/cli to create a new project. Instead of installing the @angular/cli tools globally, I rather recommend to install these on demand using the npx command. npx is part of npm and allows you to run commands without having the package installed globally first. Furthermore, you can specify which version you want to have installed.

Let’s create an empty custom Cumulocity web application which is based on the latest version (1022.8.x at the time of writing). Use the @angular/cli and the npx command to create a new project:

npx @angular/cli@v19-lts new --style=less
@v19-lts makes sure to use version 19 long term support of Angular. You can choose any name for the application, e.g. my-c8y-application. Do not enable Server-Side Rendering (SSR).

image
image
1197×667 21.8 KB
Once the Angular project has been generated, you will use the @c8y/websdk to scaffold it to a Cumulocity IoT application. In the command prompt, change directory to the new project and add the @c8y/websdk to the project:

cd my-c8y-application
npx ng add @c8y/websdk
A wizard will guide you through the process to scaffold a new Cumulocity IoT application. The wizard asks you from which version to scaffold the project from and which template should be used:

image
image
822×354 11.8 KB
Select version latest, in this case 1022.8.x. Use the template application from which the project should be scaffolded from. The different templates are described in later articles. More information on creating new applications can be found in the official documentation.

Once the scaffolding has been finished, you can start the Cumulocity IoT web application:

npx ng serve -u <<C8Y-URL>>
Make sure to replace <<C8Y-URL>> with the URL of your Cumulocity IoT instance. The ng serve command will spin up a local web server and deploy the Cumulocity IoT web application. The -u parameter specifies the Cumulocity IoT instance to which all API requests should be proxied to. This means data is actually pulled from the configured Cumulocity IoT instance. The same applies for the authentication. The application can be accessed in the browser via the URL: http://localhost:4200/apps/my-c8y-application/. In case you choose a different application name, you will see your application name instead of my-c8y-application in the URL.

You will be greeted by the login screen.
