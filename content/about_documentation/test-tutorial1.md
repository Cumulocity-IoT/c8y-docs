---
weight: 20
title: Previous documentation versions
layout: bundle
sector:
  - terms_conditions
---
Introduction
Extension Packages empower the loading of features at runtime, enabling the extension of any Web SDK-based web application without the necessity of rebuilding the entire application.

Extension Packages consist of two types of applications:

Plugins, such as widgets, facilitate the extension of existing applications without requiring rebuilding.
Blueprints, which are collections of multiple UI functionalities hosted by the platform, allowing the construction of new applications from scratch.
This approach leads to improved modularity, reusability, and scalability, providing a more flexible and efficient environment for Cumulocity IoT.

Available Extensions
At the time of writing this article, the Cumulocity community offers over 40+ extensions that can be installed in Cockpit, Device Management, and other areas, allowing users to enhance the functionalities of their applications.

For example, Bookmark Widget allows you to bookmark devices to the navigator to access them quickly.

Many widgets created by Global Presales for Application Builder have also been released as UI Plugins.

How to Install
From 10.16 onwards, you can view a list of available plugins in administration. Follow these steps

Navigate to Cumulocity > Administration > Ecosystem > Applications > Packages.
Browse through the list of available extension packages and click on the extension name
Check the list of available plugins within the package
Click on “Install” to add the plugin to your custom application (cloned cockpit or any other custom app).


An alternate way of installing the plugins is to directly go to the custom application and install it via the plugins section. 
Some Cool Things Extension Packages Can Do​
Extensions are versatile and can extend beyond widgets. They find utility in various UI functionalities, and here are some examples:

Device Replacement Wizard​: An extension for Device Management app that allows to replace devices via a wizard.​
Dynamic MQTT Mapping Service​: Coupled with microservice, use it to connect to any MQTT broker and map any JSON-based payload dynamically to C8Y IoT Domain Model in a graphical way.​
Weather Forecast Widget: Displays a 5-day weather forecast using weather data provided by the OpenWeatherAPI
These examples showcase the power and flexibility of extensions, enabling developers to create rich and dynamic UI experiences in their applications.