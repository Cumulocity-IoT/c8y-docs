---
weight: 10
title: Prerequisites
layout: redirect
---

|<div style="width:140px">Item</div>|Details|
|:---|:---|
|Hardware|CPU: 6 cores<br>RAM: 10 GB<br>CPU Architecture: x86-64 <p><p>**Info:** These are the minimum system requirements for deploying Edge. If a custom microservice requires additional resources, you must configure the system accordingly in addition to the minimum requirements. For example, if a custom microservice requires 2 CPU cores and 4 GB of RAM, then the Kubernetes node must have 8 CPU cores (6 cores for standard workloads + 2 cores for your microservice) and 14 GB of RAM (10 GB for standard workloads + 4 GB for your microservice). <br><br>**Important:** MongoDB requires a CPU that supports AVX instructions. Ensure that the CPU type of the Kubernetes node supports AVX instructions. Use the command `sudo lscpu` to check whether the CPU supports AVX instructions.|
|Kubernetes|Version 1.25.x has been tested (with potential compatibility for subsequent versions) and is supported across the following platforms:<p style="margin: 0; padding-left: 2em;">- [Lightweight Kubernetes (K3s)](https://docs.k3s.io/installation). To enable the proper functioning of the Edge operator on K3s, you must install K3s with the following configuration options. For more information, see [Special instructions for K3s](/edge-kubernetes/installing-edge-on-k8/#special-instructions-for-k3s). <p style="margin: 0; padding-left: 2em;">- [Kubernetes (K8s)](https://kubernetes.io/docs/setup/)<p style="margin: 0; padding-left: 2em;">- [Amazon Elastic Kubernetes Service (EKS)](https://docs.aws.amazon.com/eks/latest/userguide/create-cluster.html)<p style="margin: 0; padding-left: 2em;">- [Microsoft Azure Kubernetes Service (AKS)](https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-portal?tabs=azure-cli) <p><p>**Info:** Edge on Kubernetes has undergone testing on the Kubernetes platforms mentioned above, using the Containerd, CRI-O, and Docker container runtimes. {{< c8y-admon-important >}} Edge on Kubernetes is tested and supported on single-node Kubernetes clusters. {{< /c8y-admon-important >}}|
|Helm version 3.x|Refer to [Installing Helm](https://helm.sh/docs/intro/install/) for the installation instructions.|
|Disk space|Three static Persistent Volumes (PV) or a StorageClass configured with dynamic provisioning to bind.<p style="margin: 0; padding-left: 2em;">- 75 GB for the Persistent Volume Claim (PVC) made for MongoDB (configurable through the Custom Resource).<p style="margin: 0; padding-left: 2em;">- 10 GB for the Persistent Volume Claim (PVC) made for the Private Registry to host custom microservices.<p style="margin: 0; padding-left: 2em;">- 5 GB for the Persistent Volume Claim (PVC) made for application logs.</p><br>For more information about configuring the storage, see [Configuring storage](/edge-kubernetes/installing-edge-on-k8/#configuring-storage).|
|Edge license file|To request the license file for Edge, contact the logistics team for your region:<p style="margin: 0; padding-left: 2em;">- North and South America: LogisSrvus@softwareagusa.com <p style="margin: 0; padding-left: 2em;">- All Other Regions: LogisticsServiceCenterGER@softwareag.com </p><br>In the email, you must include <p style="margin: 0; padding-left: 2em;">- Your company name, under which the license has been bought <p style="margin: 0; padding-left: 2em;">- The domain name (for example, myown.iot.com), where Edge will be reachable</p><br>For more information, see [Domain name validation for Edge license key generation](/edge/edge-installation/#domain-name-validation-for-edge-license-key-generation).|
|The Edge operator registry credentials|You will receive the Edge operator registry credentials along with the Edge license.|
|TLS/SSL key and certificates|Optional. TLS/SSL private key and domain certificates in PEM format.<br>Generate a TLS/SSL key pair and a Certificate Signing Request (CSR) according to your company policies, and submit it to your internal or external Certificate Authority (CA). When creating the CSR, in addition to providing the Common Name (CN), Organization (O), and other required details, you must specify the Subject Alternative Name (SAN) to request a multi-domain certificate. Ensure that the SAN includes the domain names for the "edge" tenant and {{< management-tenant >}}. If you plan to install {{< product-c8y-iot >}} DataHub, include its domain name as well. For instance, if your Edge domain is *myown.iot.com*, make sure *myown.iot.com*, *management.myown.iot.com*, and *datahub.myown.iot.com* are listed in the SAN field.<br>Additionally, verify that the TLS/SSL certificate includes the complete certificate chain in the correct order.|
|Connect Edge to the cloud|Optional. To connect and manage one or more Edge deployments from your {{< product-c8y-iot >}} cloud tenant, you will need an active {{< product-c8y-iot >}} {{< standard-tenant >}} with a subscription plan that includes the _advanced-software-mgmt_ microservice.|

### Special instructions for K3s {#special-instructions-for-k3s}

To enable the proper functioning of the Edge operator on K3s, you must install K3s with the following configuration options.

Run the command below to install Kubernetes version 1.25.13:

```shell
USER_NAME=$(whoami)
USER_HOME=$(eval echo ~${USER_NAME})
sudo sh -c '
    touch /etc/sysctl.d/90-kubelet.conf  && \
    sed -i "/^vm\.panic_on_oom=/d; /^vm\.overcommit_memory=/d; /^kernel\.panic=/d; /^kernel\.panic_on_oops=/d" /etc/sysctl.d/90-kubelet.conf && \
    printf "vm.panic_on_oom=0\nvm.overcommit_memory=1\nkernel.panic=10\nkernel.panic_on_oops=1\n" | tee -a /etc/sysctl.d/90-kubelet.conf && \

    sysctl -p /etc/sysctl.d/90-kubelet.conf && \

    curl -sfL https://get.k3s.io | INSTALL_K3S_VERSION=v1.25.13+k3s1 sh -s - \
        --write-kubeconfig-mode 644 \
        --disable=traefik \
        --protect-kernel-defaults true \
        --kube-apiserver-arg=admission-control=ValidatingAdmissionWebhook,MutatingAdmissionWebhook && \
    
    mkdir -p '"$USER_HOME"'/.kube && \
    cp /etc/rancher/k3s/k3s.yaml '"$USER_HOME"'/.kube/config && \
    chown '"$USER_NAME:"' '"$USER_HOME"'/.kube/config && \
    chmod 600 '"$USER_HOME"'/.kube/config && \

    printf "\e[32mSuccessfully installed k3s!\e[0m\n" && \
    
    k3s crictl pull rancher/klipper-lb:v0.4.4 && \
    k3s crictl pull rancher/mirrored-metrics-server:v0.6.3 && \
    k3s crictl pull rancher/local-path-provisioner:v0.0.24
'
```

For configuration options, see [K3s configuration options](https://docs.k3s.io/installation/configuration).

- Added `--disable=traefik` in the install command to disable Traefik to avoid port conflicts between Traefik and cumulocity-core service, as both are LoadBalancer type services which expose port 443.
- Added `--kube-apiserver-arg=admission-control=ValidatingAdmissionWebhook,MutatingAdmissionWebhook` to enable admission controllers. The flag is set to enable the `ValidatingAdmissionWebhook` and `MutatingAdmissionWebhook` admission controllers, as Edge requires them. See [https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/).
- Added `--protect-kernel-defaults` true to protect the default kernel settings on the host system. It prevents modifications to critical kernel parameters by container workloads running in Kubernetes. For more information, see [https://docs.k3s.io/security/hardening-guide#host-level-requirements](https://docs.k3s.io/security/hardening-guide#host-level-requirements).

{{< c8y-admon-info >}}

To install a later version of Kubernetes, update the environment variable `INSTALL_K3S_VERSION`.

{{< /c8y-admon-info >}}
