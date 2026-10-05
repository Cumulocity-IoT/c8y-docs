---
date: 
title: Idle SSH sessions in Cloud Remote Access no longer slow down other connections
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-KHZSGmQm0
    label: Cloud Remote Access
build_artifact:
  - value: tc-aHRoC2cxY
    label: cloud-remote-access
ticket: DM-7371
version: 3.3.14
---
Every SSH session opened from the **Remote access** tab of a device used to keep one CPU core busy in the Cloud Remote Access microservice, even while nobody was typing. Four idle SSH sessions were enough to use up the CPU available to the microservice, which slowed down every other remote access connection on the same instance, including new connections and VNC, Telnet, and passthrough tunnels. An idle SSH session now costs practically no CPU, so opening a web terminal stays fast regardless of how many terminals are already open.

Closing an SSH session also used to leave one background thread behind for as long as the microservice ran, so long-running instances accumulated resources over time. Sessions are now cleaned up completely when they close. In addition, an SSH session is no longer dropped when an internal worker of the microservice is recycled, and a device that sends output faster than the web terminal can consume it is slowed down instead of growing the memory of the microservice. If device output cannot be delivered to the terminal for 30 seconds, the session closes with an error instead of hanging.
