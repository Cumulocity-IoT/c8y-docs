---
date: ""
title: Saving a Loriot connection with user management admin rights creates the new output user
product_area: Device management & connectivity
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-TCiiCOknp5
    label: LPWAN
build_artifact:
  - value: tc-ycWx1InI9
    label: loriot-agent
ticket: DM-7716
version: 6.1.0
---
The Loriot agent now creates a new output user, `output_loriot-agent-v2`, with the email address `noreply@loriot-agent.invalid`. This address cannot receive email, so nobody can reset the user's password through email.

The Loriot agent creates `output_loriot-agent-v2` with the rights of the user who creates or saves a Loriot connection. Until the new user exists, only a user with user management admin rights can create or save a Loriot connection. After that, users without these rights can also create and save Loriot connections. Saving a Loriot connection moves the Cumulocity outputs of that connection's Loriot applications to `output_loriot-agent-v2`.

After an upgrade, users can still register devices in Loriot applications that already have a Cumulocity output. To register devices in a Loriot application that has no Cumulocity output yet, a user with user management admin rights must first save a Loriot connection.

