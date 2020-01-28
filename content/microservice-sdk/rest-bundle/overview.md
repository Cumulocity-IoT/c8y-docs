---
weight: 10
title: Overview
layout: redirect
---

This section describes specific aspects of developing microservices using the REST interface.

Cumulocity employs REST for all external communication. Regardless whether the communication originates from IoT devices, from web applications or from back-office IT systems, the communication protocol is always REST.

REST is a very simple and secure protocol based on HTTP(S) and TCP. It is today the de-facto Internet standard supported by all networked programming environments ranging from very simple devices up to large-scale IT. One of the many books introducing REST is [RESTful Web Services](http://oreilly.com/catalog/9780596529260).

With this API description you will learn how to use Cumulocity's REST interfaces to develop microservice applications on top of the Cumulocity platform.

The description is closely linked to the Reference guide, which describes each interface in detail. Relevant chapters in the reference guide are in particular:

- [REST implementation](/reference/rest-implementation) is the reference for all general concepts.
- [Device management library](/reference/device-management) specifies the data model for device management.
- [Sensor library](/reference/sensor-library) specifies the data model for sensors and controls.

If you develop applications using Java or C#, check these relevant sections for even more convenient access to Cumulocity's functionality.
For further information on REST interfaces in general and on integrating devices with REST, refer to the [REST section](/device-sdk/rest) in the Device SDK guide.


### Using the REST interfaces

Nowadays, most programming environments have particular support for REST-based communication. For experimentation and for understanding Cumulocity's REST interfaces, it is helpful to use one of the numerous available command line tools or browser extensions.

For example, many operating systems come with pre-installed tools such as the cURL command. If you want to start browsing the Cumulocity APIs, enter on a command line:

```shell
$ curl -u <username>:<password> https://<yourTenant>.cumulocity.com/platform
```

Replace `<username>` and `<password>` with the username and password that you used to register to Cumulocity. Similarly, replace `<yourTenant>` with your tenant URL.

The command will return links to all basic interfaces of Cumulocity:

```json
...
"inventory": {
    "managedObjects": {
        "references": [],
        "self": "https://<yourURL>/inventory/managedObjects"
    },
    "managedObjectsForFragmentType": "https://<yourURL>/inventory/managedObjects?fragmentType={fragmentType}",
    "managedObjectsForListOfIds": "https://<yourURL>/inventory/managedObjects?ids={ids}",
    "managedObjectsForType": "https://<yourURL>/inventory/managedObjects?type={type}",
    "self": "https://<yourURL>/inventory"
},
...
```

To format the output to a more readable way, pass it to the `python -mjson.tool` command:

```shell
$ curl -u <username>:<password> https://<yourTenant>.cumulocity.com/platform | python -mjson.tool
```

From this point, you can navigate further to the different returned objects. For instance, retrieve the items in the inventory by following the <kbd>managedObjects</kbd> endpoint:

```shell
$ curl -u <username>:<password> https://<yourTenant>.cumulocity.com/inventory/managedObjects
```

You will notice that just a subset of the items in the inventory is actually returned, a so-called "page". More information on page handling can be found under [Query result paging](/reference/rest-implementation#paging).

### Using Postman

Graphical REST clients such as [Postman](https://www.getpostman.com/) are a convenient way to explore REST interfaces and the Cumulocity database content.

![Example REST client](/images/rest/postman.png)

Cumulocity provides numerous online API examples. If you want to make use of them, [download and install Postman](https://www.getpostman.com/). After starting Postman, you can choose to either create an account or click **Take me straight to the app**. Then click the button below and choose the variant of Postman that you have just installed. You may see a browser security prompt asking you if you actually want to run Postman (on Windows "Electron").

Import the APIs as a [JSON file](/images/rest/Cumulocity API.json.postman_collection).

Now, click the **Collections** tab on the top left of Postman. You should see a folder _Cumulocity API_ with the examples. Open that folder and the sub-folder _Alarms_, then click **Get collection of alarms**. This shows an example on how to get alarms from Cumulocity.

Note that the example contains placeholders, in this case a placeholder _{{url}}_ in <kbd>{{url}}/alarm/alarms</kbd>. You need to tell Postman how to fill these placeholders and by this, how to connect to your Cumulocity account. To do so, create an [environment](https://www.getpostman.com/docs/environments) and configure the placeholders.

* Click on the cogwheel on the top right and choose **Manage Environments**, then click **Add**.
* Enter a name for the environment (e.g., your tenant ID), then add values for the placeholders.
* Configure a key _url_ with a value of _https://&lt;yourTenant&gt;.cumulocity.com_. Click **Submit**.
* Configure a key _auth_ with the value of the Authorization header for the REST requests.
* Click **Add**, then close the dialog. Now select your newly created environment from the drop-down box on the top right, that initially reads "No environment".

<img src="/images/rest/postmanenvironment.png" alt="Postman environment setup" style="max-width: 50%">

A simple way to determine the correct value for the "auth" key is using an online Base64 encode/decode tool. For example, assume that your tenant ID is "tenant", your username is "me" and your password is "secret". Go to [ostermiller.org/calc/encode.html](http://ostermiller.org/calc/encode.html), type `tenant/me:secret` into the text area, then click **Encode** in the row "Base 64". The resulting text is "dGVuYW50L21lOnNlY3JldA==". Use "Basic dGVuYW50L21lOnNlY3JldA==" as value for the "auth" key.

You can achieve the same result also by using the Base64 command as follows:

```shell
$ echo -n tenant/me:secret | base64
```

Now it is time to start exploring the API!
