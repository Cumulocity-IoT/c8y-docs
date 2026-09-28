---
weight: 150
title: Troubleshooting
layout: redirect
---

Some common issues have been identified and documented below.

##### I get an error saying "Microservice application name is incorrect" on uploading a microservice application {#i-get-an-error-saying-microservice-application-name-is-incorrect-on-uploading-a-microservice-application}

When naming your microservice application only use lower-case letters, digits and dashes. The maximum length for the name is 23 characters.

##### I deployed my microservice but requests to any endpoint returns an error message "Microservice not available Connection refused" {#i-deployed-my-microservice-but-requests-to-any-endpoint-returns-an-error-message-microservice-not-available-connection-refused}

After uploading the microservice, the internal deployment and container run may take a couple of minutes. Once completed, the error message will disappear. Meanwhile, enjoy your coffee ☕️

##### An alarm was created with the message "Failed to pull image ... rpc error: code = Canceled desc = context canceled" {#an-alarm-was-created-with-the-message-failed-to-pull-image--rpc-error-code--canceled-desc--context-canceled}

This may happen occasionally when pulling large Docker images for containers within a pod. It will go to normal once it has been successfully pulled.

##### An alarm was created with the message "Pod synchronization error." {#an-alarm-was-created-with-the-message-pod-synchronization-error}

This may happen when Kubernetes is performing the auto-scaling and is trying to restart the pods.

##### An alarm was created with the message "No nodes are available that match all of the predicates: [Insufficient cpu ...]" {#an-alarm-was-created-with-the-message-no-nodes-are-available-that-match-all-of-the-predicates-insufficient-cpu}

There are additional containers running besides yours and they are provisioned by default with Kubernetes. These additional containers might be taking up of the CPU quota of the single node. Kubernetes will manage this and change the pod status from Pending to Running.
