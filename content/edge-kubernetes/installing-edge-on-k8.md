---
weight: 20
title: Installation
layout: bundle
sector:
  - edge_server
---

Edge can be installed using one of two supported methods. The method you choose depends on whether you already have a Kubernetes environment or would like the tool to provision one for you.
  - **[Installing with the c8yedge tool](#install-edge-with-c8yedge-cli) (Recommended for first-time or simplified setups)**
    <br/>
    This method is ideal if you **do not already have a Kubernetes cluster** and want a simplified, self-contained setup.
    <br/>
    The **c8yedge** command-line tool automates the entire process of preparing the environment and installing Edge.
    <br/>
    This is the recommended method for users who want a quick, consistent setup experience with minimal Kubernetes knowledge.
    <br/>
    <br/>

  - **[Installing on a self-managed Kubernetes cluster](#install-edge-with-edge-operator)**
    <br/>
    This method is suitable for users who already have a Kubernetes cluster and want to install Edge using existing Kubernetes tools. Edge is tested and supported on a **single-node** Kubernetes cluster running Kubernetes 1.32.x; see the constraints listed in that section.
    <br/>
    In this case, you are expected to:
    - Set up and manage the Kubernetes cluster yourself (using K3s or any compatible Kubernetes distribution).
    - Deploy the Edge operator using Helm.
    - Install Edge by creating and applying the Edge custom resource (CR)

    <br/>
    Choose this method if you want more control over the environment or if your organization already has Kubernetes expertise and infrastructure in place.
