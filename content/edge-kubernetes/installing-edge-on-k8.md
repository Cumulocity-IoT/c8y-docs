---
weight: 20
title: Installation
layout: bundle
sector:
  - edge_server
---

This documentation explains how to install {{< product-c8y-iot >}} Edge. 

Edge can be installed using one of two supported methods. The method you choose depends on whether you already have a Kubernetes environment or would like the tool to provision one for you.
  - **Installing with c8yedge tool (Recommended for first-time or simplified setups)**
    This method is ideal if you **do not already have a Kubernetes cluster** and want a simplified, self-contained setup.
    The `c8yedge` command-line tool automates the entire process of preparing the environment and installing Edge. 
    
    Specifically, it:
      - Installs [K3s](https://docs.k3s.io/installation), a lightweight Kubernetes distribution optimized for edge environments.
      - Deploys the Edge Operator and uses it to install {{< product-c8y-iot >}} Edge with the below configuration
        - **Name**: `c8yedge`
        - **Company**: `Edge Bootstrap`
        - **Domain**: `edgebootstrap.example`
        - **Email**: `company@edgebootstrap.example`


    This is the recommended method for users who want a quick, consistent setup experience with minimal Kubernetes knowledge. <br>


  - **Installing with the Edge Operator (For users with an existing Kubernetes setup)**
    This method is suitable for users who already have a Kubernetes cluster (typically with a single worker node) and want to install Edge using the Kubernetes-native approach.

    In this case, you are expected to:
      - Set up and manage the Kubernetes cluster yourself (including K3s or any compatible Kubernetes distribution).
      - Install any [prerequisites](/edge-kubernetes/installing-edge-on-k8/#prerequisites)
      - Deploy the Edge Operator using Helm.
      - Install Edge by creating and applying the Edge Custom Resource (CR)


    Choose this method if you want more control over the environment or if your organization already has Kubernetes expertise and infrastructure in place.
