---
weight: 40
title: UI functionalities and features
layout: bundle
sector:
  - getting_started
sector:
  - getting_started

---

{{< c8y-admon-related >}}
- [Cockpit](/cockpit/cockpit-introduction/) for more details on the {{< product-c8y-iot >}} UI.
- [Managing applications](/standard-tenant/ecosystem/#managing-applications) for more information on managing applications in {{< product-c8y-iot >}}.
- [Web SDK guide](/web/#introduction) for details on building web applications on top of {{< product-c8y-iot >}}.
{{< /c8y-admon-related >}}


### Main screen elements {#main-screen-elements}

The general structure common to all {{< product-c8y-iot >}} applications includes the following screen elements:

![{{< product-c8y-iot >}} application](/images/users-guide/getting-started/getting-started-screen-elements.png)

<table>
<col width="15%">
<col width="85%">
<thead>
<tr>
<th style="text-align:left">Element</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><b>Navigator</b></td>
<td style="text-align:left">On the left you find the navigator. At the top of the navigator the name and logo of the application is displayed, indicating which application you are currently using. Below you find a list of entries leading to the various pages of the application. The entries are grouped into menus and menu items. You can collapse or expand menus in the navigator by clicking the menu name. Clicking the small arrow at the very left of the top bar will hide/or unhide the navigator. Per default, it is visible.</td>
</tr>
<tr>
<td style="text-align:left"><b>Page</b></td>
<td style="text-align:left">"Page" actually refer to the main area in the application. The content provided here depends on the menu item selected in the dashboard. The structuring of the content differs from page to page. Data can for example be displayed in a list with a row for each object or you can find it being presented in a grid in which objects are represented by cards. </td>
</tr>
<tr>
<td style="text-align:left"><b>Tabs</b></td>
<td style="text-align:left">Some pages, for example the page of any particular device, are divided into several tabs, either displayed vertically or horizontally.</td>
</tr>
<tr>
<td style="text-align:left"><b>Top bar</b></td>
<td style="text-align:left"><b>Page title</b><br> At the left of the top bar the title of the active page is displayed, if any. <br> <br><i class="dlt-c8y-icon-search icon-20"></i> <b>Search button</b><br> Clicking the <b>Search</b> button opens a search field to enter text for a full-text search. For details, see <a href="/get-familiar-with-the-ui/gui-features/#search-and-filter-functionality" class="no-ajaxy">Search and filter functionality</a>. Not always available. <br><br><i class="dlt-c8y-icon-app-switcher icon-20"></i> <b>Application Switcher button</b><br> Clicking the <b>Application Switcher</b> button opens the <a href="#application-switcher" class="no-ajaxy">application switcher</a> which allows you to quickly switch between applications. <br><br> <img src="/images/icons/user-icon.png" alt="User" style="max-width:100%"> <b>User button</b><br> Right from the Application Switcher button you will find the <b>User</b> button with your username. Clicking it will open up a context menu with commands related to your account settings. <br> <br>Other buttons/ information may be available in the top bar depending on the application and the page being displayed. </td>
</tr>
<tr>
<td style="text-align:left"><b>Top menu bar</b></td>
<td style="text-align:left">Depending on the active application and the active page, a secondary bar is displayed below the top bar providing further functionalities like a <b>Reload</b> link for reloading the page or a <b>Realtime</b> link for the display of real-time data. <br>A help icon <i class="dlt-c8y-icon-help-outline text-info icon-20"></i> indicates that inline contextual help content is available for the page. Clicking it opens a drawer with a short introduction on the page’s functionality and a direct link to the specific section in the user documentation for more details. Note that the help content is only available in English.</td>
</tr>
<tr>
<td style="text-align:left"><b>Right drawer</b></td>
<td style="text-align:left">Clicking the user icon at the very right of the top bar will unhide/hide the right drawer, offering access to the user settings, quick links to other applications and to relevant documentation. Per default, the right drawer is hidden.</td>
</tr>
</tbody>
</table>

On smaller screens, the layout is slightly different. The navigator is hidden and can be accessed by clicking the arrow icon on the top left. Only the active tab is displayed. To switch tabs, click the arrow on the tab header and select a tab from the list.

<img src="/images/users-guide/getting-started/getting-started-small-screen-elements.png" alt="Layout on small devices" style="max-width: 50%">

{{< c8y-admon-info >}}
{{< product-c8y-iot >}} applications provide tooltips when you hover over a particular screen element. When you use {{< product-c8y-iot >}} applications on touch devices, tooltips are shown when you touch a screen element for a longer time.
{{< /c8y-admon-info >}}


### Application switcher {#application-switcher}

The application switcher allows you to quickly switch between applications. Click the **Application Switcher** button at the right of the top bar to display a list of icons representing applications.

<img src="/images/users-guide/getting-started/getting-started-application-switcher.png" alt="Application switcher" style="max-width: 100%">

The application switcher shows all {{< product-c8y-iot >}} applications you currently have access to. These can be [subscribed applications](/standard-tenant/ecosystem/#subscribed-applications) or [custom applications](/standard-tenant/ecosystem/#custom-applications). Just click the icon for the desired application to open it as active application.


### Search and filter functionality {#search-and-filter-functionality}


#### Full text search {#full-text-search}

{{< product-c8y-iot >}} provides a full text search, available through the **Search** button <i class="dlt-c8y-icon-search icon-20"></i> at the right of the top bar in the UI.

On entering a search term into the textbox at the top of the **Search** window, {{< product-c8y-iot >}} returns all assets (groups, devices, child devices) matching the search criteria.

<img src="/images/users-guide/getting-started/getting-started-search-result.png" alt="Search result" style="max-width: 100%">

Under **Search results**, the assets matching the search criteria are shown. To see more details click **Go to the assets table** at the bottom right. This will show the entire search results in a table format.

The Search window only lists a limited number of matches. In case of more matches, to see the complete results you must switch to the asset table.

{{< c8y-admon-important >}}
The search results include all assets containing the search term in any property (name, model or any fragment), that means, the search results do not only include assets matching the search criteria with their names.
{{< /c8y-admon-important >}}

##### Exact match {#exact-match}

By default, the search option **Exact match** is applied.

The underlying search functionality is based on the MongoDB full text search. For details, see [https://docs.mongodb.com/manual/text-search/](https://docs.mongodb.com/manual/text-search/).

Entering multiple words separated by a blank returns all objects that match any of the words. For example, entering

```text
My Demo Device
```

will return objects containing "My", "Demo" or "Device".

If you want to search for objects matching an exact phrase enclose it in quotation marks:

```text
"My Demo Device"
```

You can also exclude words by putting a hyphen before the word to search the inventory for objects containing, for example, "My" or "Demo" but not "Device":

```text
My Demo -Device
```

Case is ignored. The following search texts return the same result:

```text
My Demo Device
my demo device
```

##### Alternative search options {#alternative-search-options}

Other than with filtering, using wildcards in a search is not supported.

Instead, you can switch the search option by clicking one of the following buttons:

* **Starts with**,
* **Contains** or
* **Ends with**.

This will search for assets starting with, containing or ending with the search term, respectively.


#### Filtering {#filtering}

Some pages offer a filtering functionality to filter objects in a list.

![Filter field](/images/users-guide/getting-started/getting-started-filtering.png)

As opposed to the search functionality, on entering filter criteria you must not necessarily enter complete words.

In many cases you can just enter any arbitrary text into the text field, even just 2-3 characters. Entering

```text
cl
```

will reduce the list to all objects containing the string "cl".

In other cases you may enter * as wildcard character to return all objects starting with "cl":

```text
cl*
```

The list will immediately be reduced to the selected objects.

{{< c8y-admon-important >}}
On certain pages, the filter mechanism only searches through items shown on a page. This means that if an item is not listed on the respective page, it will not appear in the results. You must load all results first to search through all items. This behavior applies to the following pages:

* Device protocols
* Firmware repository
* Software repository
* Configuration repository
* Tenants
* File repository
{{< /c8y-admon-important >}}

For details on the filtering mechanism in the devices list refer to [To filter devices](/device-management-application/viewing-all-devices/#to-filter-devices).

### Real-time behavior of the navigator {#real-time-behavior-of-the-navigator}

In the navigator, changes are not updated in real time, meaning new, removed or renamed devices or groups will not be updated immediately.

You will only see such changes in the navigator of the application, in which you have made the changes.

**Example**

If you unassign a device from a group in the Device management application it is immediately removed from the group in the navigator of your current application. However, if you have another window open with another Device management application, you won't see the changes, but will only see the changes after a refresh or another request (expanding a group in the navigator for example).
