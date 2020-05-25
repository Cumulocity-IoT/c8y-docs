---
weight: 10
title: Developing apps
layout: redirect
---

An Apama EPL app is a monitor (*.mon) file. You can develop EPL apps in two different ways:

* You can use [Apama EPL Apps](#apama-epl-apps) which is available from Cumulocity IoT's application switcher and develop your EPL apps within Cumulocity IoT.
* Or you can install Apama on your local machine and then develop your EPL apps (as monitor files) in [Software AG Designer](#sag-designer), that is, in a separate environment.

See also [Using the Apama Event Processing Language (EPL)](/concepts/realtime/#using-epl) in the *Concepts guide*.

### <a name="apama-epl-apps"></a>Developing apps with Apama EPL Apps

Apama EPL Apps provides an interface for interactively editing new or existing EPL apps (\*.mon files) as well as importing and activating (deploying) EPL apps. 

Any user on the tenant wishing to use Apama EPL Apps will need to be a **CEP Manager**. See [Managing permissions](/users-guide/administration/#managing-permissions) in the *User guide*.

> **Info**: To be able to develop apps with Apama EPL Apps and/or to import monitor files from Software AG Designer into Cumulocity IoT, your tenant needs to be subscribed to both the Apama-ctrl microservice and the Apama EPL Apps web application provided in Cumulocity IoT. If you have Apama Starter or Apama Smart Rules-only, Apama EPL Apps is not available in the application switcher. If you want to have this capability, contact Software AG support. 

**Step 1 - Invoke Apama EPL Apps**

Open the application switcher and click the icon for the **Apama EPL Apps** application.

When you invoke Apama EPL Apps, the EPL app manager is shown first, listing any existing EPL apps. Each app is shown as a card. You can add new EPL apps and manage existing EPL apps from here.

![Apama EPL Apps](/images/apama/apama-epl-apps-cards.png)

Each card that is shown for an app has an actions menu at the top which allows you to edit or remove the app.

From this page, you can:

* Edit existing EPL apps. Either use the **Edit** command from the actions menu or simply click on the card that is shown for the app. 

* Create new EPL apps. See below.

* Import EPL apps. If you prefer to develop your apps outside of Cumulocity IoT (for example, using Software AG Designer), click **Import EPL** in the top menu bar to upload an Apama monitor (*.mon) file as an app into Apama EPL Apps.

* Deploy existing EPL apps. On the card that is shown for an app, change the mode from **Inactive** to **Active**. For more information, see [Deploying apps](/apama/analytics-introduction/#deploying-apps).

    When activating an app, any syntax errors are reported back immediately. The error state is shown on the card, helping you to ensure your app is in good shape. Click on the error to display information on what went wrong. It is not possible to activate an app if it has syntax errors. The errors are shown on the card until they have been fixed and the app has been activated again.

* Reload all EPL apps. Click **Reload** in the top menu bar to refresh the display to show any changes other users have made since the page loaded, including any errors that have been introduced in the meantime.

**Step 2 - Create an EPL app**

Click **New EPL app** in the top menu bar. Give the app a unique name. You can also enter a description which will be shown on the card that is created for the new app. 

The EPL editor is shown next. The EPL code for the new app already contains the typical basic event definitions and utilities that are required for working with Cumulocity IoT. You can adapt them as required for your app. Consult the documentation and samples for more details.

![EPL editor](/images/apama/apama-epl-apps-editor.png)

To help you get started, several samples are available. To see them, click **Samples** which is shown to the right of the editor. Click on a sample to see a preview of its contents. You can select part of the sample code and copy it over into your own code using the standard key combinations Ctrl+C and Ctrl+V. You can also use the command buttons to copy the entire code to the clipboard and insert it at an appropriate position in your own code, or to replace all of your existing code with the sample code. 

Using the buttons in the top menu bar, you can undo/redo your last changes in the current session and you can save your changes.

It is also possible to change the mode from **Inactive** to **Active** (or vice versa) in the EPL editor. Again, when there is an error in your EPL code, it is not possible to activate the app. The errors are highlighted within the code.

Keep the following in mind while creating (or importing) an EPL app: When an EPL app is activated, it is possible that some EPL operations are performed that are not allowed for the user who created the app. For example, you may only have ADMIN permission for "CEP management" for injecting EPL and creating Analytics Builder models. However, when the app is activated, it is also possible that the injected EPL can create or clear an alarm and that an Analytics Builder model can create an operation.

> **Side note:** Be aware that the EPL editor makes use of a standard web component. It provides many generic developer functions, some of which are not relevant to EPL, including but not limited to Quick Fix and Show Hover.

Click **X** in the top menu bar to leave the EPL editor and thus to return to the list of EPL apps.

<!--I wanted to use ""/images/apama/apama-epl-apps-exit-button.png", but it looks like it's not possible to define inline images. This is shown in a line of its own. So I'm using the bold X instead.-->

> **Caution:** All unsaved changes are lost when you navigate to a different URL or close the browser window.

**Step 3 - Test the EPL app**

Once your app is activated, you should be able to see the results of it running. This may include sending measurements, receiving data, creating alarms, and logging in the Apama-ctrl microservice. For information on how to check the log files of the Apama-ctrl microservice, see [Managing applications](/users-guide/administration/#managing-applications) in the *User guide*.

See also [Deploying apps](/apama/analytics-introduction/#deploying-apps).

### <a name="sag-designer"></a>Developing apps with Software AG Designer

Software AG Designer provides a full development environment and is the tool of choice when you have a complex EPL application. When your EPL app (that is, the monitor file) is ready, you then need to import it into Cumulocity IoT.

**Step 1 - Install Apama**

If you have licensed Apama, install it using Software AG Installer.

You can also use a freemium version of Apama which runs with reduced capabilities and several restrictions. If you want to use this, download the Apama Community Edition from http://www.apamacommunity.com/downloads/ and install it. 

Both versions, the licensed version and the freemuim version, include Software AG Designer.

**Step 2 - Create a project**

Once installed, create an Apama project in Software AG Designer and enable it for Cumulocity IoT connectivity. For instructions on how to create an Apama project, refer to [Creating Apama projects](https://documentation.softwareag.com/onlinehelp/Rohan/Apama/v10-5/apama10-5/apama-webhelp/index.html#page/apama-webhelp%2FWIZARD_NEW_APAMA_PROJECT.html) in the Apama documentation.

**Step 3 - Add Apama bundles to the project**

Add the following Apama bundles to the newly created Apama project. These are required by Cumulocity IoT so that it can activate your app. For instructions on how to add bundles to a project, refer to [Adding bundles to projects](https://documentation.softwareag.com/onlinehelp/Rohan/Apama/v10-5/apama10-5/apama-webhelp/index.html#page/apama-webhelp%2Fco-UsiApaStu_adding_bundles_to_projects.html) in the Apama documentation.

* **Cumulocity IoT > Event Definitions for Cumulocity** <br>
Provides event APIs required for sending and receiving data to/from Cumulocity IoT.
* **Cumulocity IoT > Utilities for Cumulocity** <br>
Provides helper utility functions for working with data received from Cumulocity IoT.
* **Any Extractor** <br>
Provides support for extracting values from the `any` type.
* **Time Format** <br>
Required to access all the methods of the Time Format plug-in. Useful for formatting and parsing time.
* **HTTP Client Generic Events** <br>
Exposes predefined generic events used by the HTTP client connectivity plug-in.
* **Automatic onApplicationInitialized**<br>
This starts all connectivity plug-ins immediately on start up.
* **HTTP Client > JSON with generic request/response event definitions**<br>Allows EPL apps to make HTTP calls.
* **Cumulocity IoT > Cumulocity Client**<br>Exposes the Cumulocity IoT client to EPL apps.

The bundles above are the only ones that are permissible in an EPL app, so be careful not to add any other bundles or your app may not work when activated in Cumulocity IoT.

**Step 4 - Create a monitor file**

To create a new Apama monitor file, refer to [Creating new monitor files for EPL applications](https://documentation.softwareag.com/onlinehelp/Rohan/Apama/v10-5/apama10-5/apama-webhelp/index.html#page/apama-webhelp%2FWIZARD_NEW_MONITORSCRIPT.html) in the Apama documentation. 

Before you import the newly created monitor file as an EPL app into Cumulocity IoT and activate it there, you might want to test if the monitor file works as expected from within Software AG Designer.

For further information, see [The Cumulocity IoT Transport Connectivity Plug-in](https://documentation.softwareag.com/onlinehelp/Rohan/Apama/v10-5/apama10-5/apama-webhelp/index.html#page/apama-webhelp%2Fco-ConApaAppToExtCom_the_cumulocity_connectivity_plug_in.html) in the Apama documentation.

**Step 5 - Run and test the monitor file**

When running the project locally, you will need to provide your Cumulocity IoT credentials in the project configuration. Configure the credentials in the *CumulocityIoT.properties* file under the Cumulocity IoT client. For example:

```
CUMULOCITY_USERNAME=user@example.com 
CUMULOCITY_SERVER_URL=http://exampleTenant.cumulocity.com 
CUMULOCITY_PASSWORD=examplePassword 
CUMULOCITY_APPKEY=apamaAppKey
```

>**Info:** You need to [create an application](/users-guide/administration#managing-applications) in Cumulocity IoT to get a value for `CUMULOCITY_APPKEY`.

Note that the above description assumes that you are connecting to a tenant where the URL identifies the tenant. If that is not true (for example, if you are connecting by an IP address), you may need to set this in the *CumulocityIoT.properties* file: 

```
CUMULOCITY_TENANT=my_custom_tenant
```

You can now proceed with testing your EPL in Software AG Designer.

Once the EPL app is ready, refer to [Deploying apps](/apama/analytics-introduction/#deploying-apps) to find out how to deploy it to Cumulocity IoT.
