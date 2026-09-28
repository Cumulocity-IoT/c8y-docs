---
weight: 70
title: Built-in messages
layout: redirect
---

SmartREST has a variety of built-in messages.

### Request messages {#request-messages}

<table>
<colgroup>
<col style="width: 15%;">
<col style="width: 25%;">
<col style="width: 60%;">
</colgroup>
<thead>
<tr>
<th>Message&nbsp;identifier</th>
<th>Message&nbsp;parameters</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>10</td>
<td>Template&nbsp;message&nbsp;identifier<br>Method<br>Resource&nbsp;identifier<br>Content&nbsp;MIME&nbsp;type<br>Accept&nbsp;MIME&nbsp;type<br>Placeholder<br>Request&nbsp;parameters<br>Template&nbsp;string</td>
<td>Represents a request template. If this message occours in the body, the whole body is treated as a <em>SmartREST</em> template and thus, all messages besides <code>10</code> and <code>11</code> will yield an error.</td>
</tr>
<tr>
<td>11</td>
<td>Template&nbsp;message&nbsp;identifier<br>Base&nbsp;JSON&nbsp;path<br>Conditional&nbsp;JSON&nbsp;ath<br>Value&nbsp;JSON&nbsp;paths</td>
<td>Represents a response template. If this message occours in the body, the whole body is treated as a <em>SmartREST</em> template and thus, all messages besides <code>10</code> and <code>11</code> will yield an error.</td>
</tr>
<tr>
<td>15</td>
<td>X-Id</td>
<td>Defines which X-Id to use for the following lines. You must not use the X-Id header when using this line.</td>
</tr>
<tr>
<td>61</td>
<td>Device MO GId</td>
<td>Poll device credentials during device bootstrapping process. No <code>X-Id</code> header must be present and the device bootstrap authorization must be used.</td>
</tr>
<tr>
<td>80</td>
<td><em>None</em></td>
<td>Initial handshake that will return a unique bayeux clientId. SmartREST real-time notifications.</td>
</tr>
<tr>
<td>81</td>
<td>clientId,channel</td>
<td>Subscribe for the given channel. SmartREST real-time notifications.</td>
</tr>
<tr>
<td>82</td>
<td>clientId,channel</td>
<td>Unsubscribe for the given channel. SmartREST real-time notifications.</td>
</tr>
<tr>
<td>83</td>
<td>clientId</td>
<td>Establish connection for receiving the notifications (long-polling). SmartREST real-time notifications.</td>
</tr>
<tr>
<td>84</td>
<td>clientId</td>
<td>Disconnect the client from the server. SmartREST real-time notifications.</td>
</tr>
</tbody>
</table>

### Response messages {#response-messages}

<table>
<colgroup>
<col style="width: 15%;">
<col style="width: 25%;">
<col style="width: 60%;">
</colgroup>
<thead>
<tr>
<th>Message&nbsp;identifier</th>
<th>Message&nbsp;parameters</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>20</td>
<td><em>SmartREST</em>&nbsp;Template&nbsp;MO&nbsp;GId</td>
<td>Echo response message. Template was found or has been created and everything is OK.</td>
</tr>
<tr>
<td>40</td>
<td><em>None</em></td>
<td>Template not found.</td>
</tr>
<tr>
<td>41</td>
<td>Line&nbsp;number&nbsp;(optional)</td>
<td>Template creation error.</td>
</tr>
<tr>
<td>42</td>
<td>Line&nbsp;number</td>
<td>Malformed request line</td>
</tr>
<tr>
<td>43</td>
<td>Line&nbsp;number</td>
<td>Invalid message identifier.</td>
</tr>
<tr>
<td>45</td>
<td>Line&nbsp;number</td>
<td>Invalid message arguments.</td>
</tr>
<tr>
<td>50</td>
<td>Line&nbsp;number<br><em>HTTP</em>&nbsp;response&nbsp;code</td>
<td>Server error. This message occurs when an error happened between the <em>SmartREST</em> proxy and the platform.</td>
</tr>
<tr>
<td>70</td>
<td>Line&nbsp;number<br>Unique&nbsp;device&nbsp;identifier<br>Tenant&nbsp;ID<br>Username<br>Password</td>
<td>Device bootstrap polling response with credentials.</td>
</tr>
<tr>
<td>86</td>
<td>timeout,interval,reconnect policy</td>
<td>Settings advice for the client using SmartREST real-time notifications.</td>
</tr>
<tr>
<td>87</td>
<td>amount of lines, X-Id</td>
<td>Indicates which X-Id was used to create the amount of following response lines.</td>
</tr>
</tbody>
</table>

#### Error messages {#error-messages}

Message identifier | Error message
-------------------|-------------------------
41 | Cannot create templates for already existing template object
41 | Duplicate message identifiers are not allowed
41 | Bad request template definition
41 | Bad response template definition
41 | Bad value type: ...
41 | Bad pattern
41 | Not a valid message identifier for template creation
41 | Invalid JsonPath
41 | Using JsonPath to refer to a list of objects is not allowed for SmartRest
41 | Using Filters (?) in JsonPath is not allowed for SmartRest
41 | No content type supported for {GET or DELETE} templates.
41 | No template string supported for {GET or DELETE} templates.
41 | No content type found for {POST or PUT} templates.
41 | No template string found for {POST or PUT} templates.
41 | Values are only supported for templates with placeholder.
42 | Malformed Request
43 | Invalid message identifier
45 | No arguments supported
45 | Wrong number of arguments
45 | Value is not a {value type}: {value}
