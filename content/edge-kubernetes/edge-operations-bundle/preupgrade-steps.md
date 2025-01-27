---  
weight: 10
title: ClusterRole Patch Documentation for Operator Upgrade from 1018.0.1 to 2025.0.0
layout: redirect
---
# **ClusterRole Patch Documentation for Operator Upgrade**  

## **Table of Contents**  

1. [Overview](#overview)  
2. [Important Note](#important-note)  
3. [Reason for the Patch](#reason-for-the-patch)  
4. [Patch Methods](#patch-methods)  
   - [Using the Patch Script](#using-the-patch-script)  
   - [Manual Patch Methods](#manual-patch-methods)  
     - [YAML Patch](#yaml-patch-method-recommended-for-simplicity)  
     - [JSON Patch](#json-patch-method-recommended-for-automation)  
5. [Verification](#verification)  
6. [Conclusion](#conclusion)  

---  

## **Overview**  
This document describes the steps taken to patch the `ClusterRole` named `c8yedge-operator-manager-role` as part of the upgrade from **version 1018.0.1 to 2025.0.0** of the operator.  

## **Important Note**  
⚠️ **This patch must be applied *before* upgrading the operator to version 2025.0.0.**  
Failure to apply the patch beforehand may result in insufficient permissions for the operator, potentially causing webhook-related functionalities to fail.  

## **Reason for the Patch**  
In version **2025.0.0**, the operator introduced **webhook functionality**, which requires additional permissions to manage webhook-related Kubernetes resources. Specifically, permissions are needed for:  

- `mutatingwebhookconfigurations`  
- `validatingwebhookconfigurations`  
- `jobs` (additional watching requirements)  
- `poddisruptionbudgets`  

Applying this patch ensures that the operator has the necessary permissions when it is upgraded.  

---  

## **Patch Methods**  

We provide two approaches to apply the patch:  

1. **[Using the Patch Script](#using-the-patch-script)** (recommended for automation and simplicity).  
2. **[Manual Patch Methods](#manual-patch-methods)** (YAML and JSON options).  

---  

### **Using the Patch Script**  

To simplify the patching process, a helper script is provided. It offers multiple options for applying and verifying the patch.  

#### **Script Download and Usage**  

1. **Download the script:**  

   ```bash
   curl -O https://github.com/Cumulocity-IoT/c8y-docs/blob/develop/scripts/c8yedge-1018-0-1-to-2025-apply-clusterrole-patch.sh
   ```

2. **Make the script executable:**  

   ```bash
   chmod +x c8yedge-1018-0-1-to-2025-apply-clusterrole-patch.sh
   ```

3. **Script Options:**  

   | Option        | Short | Description                                             |
   |---------------|-------|---------------------------------------------------------|
   | `--yaml`      | `-y`  | Apply the patch using the YAML method (downloads file). |
   | `--json`      | `-j`  | Apply the patch using the JSON method (inline).         |
   | `--verify`    | `-v`  | Verify if the necessary permissions are applied.        |
   | `--help`      | `-h`  | Display help message with usage details.                |

#### **Script Download and Usage**  

You can run the script directly without downloading it manually using:  

```bash
curl -s https://raw.githubusercontent.com/Cumulocity-IoT/c8y-docs/develop/scripts/c8yedge-1018-0-1-to-2025-apply-clusterrole-patch.sh | bash -s -- [OPTIONS]
```

Alternatively, using `wget`:  

```bash
wget -qO- https://raw.githubusercontent.com/Cumulocity-IoT/c8y-docs/develop/scripts/c8yedge-1018-0-1-to-2025-apply-clusterrole-patch.sh | bash -s -- [OPTIONS]
```

If users prefer to download and execute manually:  

1. **Download the script:**  

   ```bash
   curl -O https://raw.githubusercontent.com/Cumulocity-IoT/c8y-docs/develop/scripts/c8yedge-1018-0-1-to-2025-apply-clusterrole-patch.sh
   ```

2. **Make the script executable:**  

   ```bash
   chmod +x c8yedge-1018-0-1-to-2025-apply-clusterrole-patch.sh
   ```

3. **Run the script:**  

   ```bash
   ./c8yedge-1018-0-1-to-2025-apply-clusterrole-patch.sh --yaml
   ```

### **Explanation of the `curl | bash` method:**  

- The `-s` option in `curl` silences progress output for cleaner execution.  
- The `-qO-` option in `wget` downloads the file and pipes it to `bash`.  
- The `-s --` after `bash` allows passing additional arguments to the script.  


#### **Examples**  

- Apply the patch using YAML (downloads the patch file):  

  ```bash
  ./c8yedge-1018-0-1-to-2025-apply-clusterrole-patch.sh --yaml
  ./c8yedge-1018-0-1-to-2025-apply-clusterrole-patch.sh -y
  ```

- Apply the patch using JSON (inline):  

  ```bash
  ./c8yedge-1018-0-1-to-2025-apply-clusterrole-patch.sh --json
  ./c8yedge-1018-0-1-to-2025-apply-clusterrole-patch.sh -j
  ```

- Verify if the patch was applied successfully:  

  ```bash
  ./c8yedge-1018-0-1-to-2025-apply-clusterrole-patch.sh --verify
  ./c8yedge-1018-0-1-to-2025-apply-clusterrole-patch.sh -v
  ```

- Show help message:  

  ```bash
  ./c8yedge-1018-0-1-to-2025-apply-clusterrole-patch.sh --help
  ./c8yedge-1018-0-1-to-2025-apply-clusterrole-patch.sh -h
  ```

- Apply the patch using YAML (downloads the patch file):  

  ```bash
  curl -s https://raw.githubusercontent.com/Cumulocity-IoT/c8y-docs/develop/scripts/c8yedge-1018-0-1-to-2025-apply-clusterrole-patch.sh | bash -s -- --yaml
  ```

- Apply the patch using JSON (inline):  

  ```bash
  curl -s https://raw.githubusercontent.com/Cumulocity-IoT/c8y-docs/develop/scripts/c8yedge-1018-0-1-to-2025-apply-clusterrole-patch.sh | bash -s -- --json
  ```

- Verify if the patch was applied successfully:  

  ```bash
  curl -s https://raw.githubusercontent.com/Cumulocity-IoT/c8y-docs/develop/scripts/c8yedge-1018-0-1-to-2025-apply-clusterrole-patch.sh | bash -s -- --verify
  ```

### **Manual Patch Methods**  

If you'd prefer to apply the patch manually without using the script, you can choose between YAML or JSON methods.  

#### **YAML Patch Method (Recommended for simplicity)**  

The YAML patch can be downloaded from the following link:  

[Download missing-permissions.yaml](https://github.com/Cumulocity-IoT/c8y-docs/blob/develop/static/files/edge-k8s/c8yedge-operator-claster-role-patch.yaml)  

#### **Applying the Patch with YAML**  

```bash
kubectl patch clusterrole c8yedge-operator-manager-role --type='json' --patch-file c8yedge-operator-claster-role-patch.yaml
```

##### **Why Use YAML Patch?**  
- Easier to read and modify.  
- Useful for environments where YAML files are managed via GitOps or manual approvals.  

---

#### **JSON Patch Method (Recommended for automation)**  

Apply the patch using an inline JSON command:  

```bash
kubectl patch clusterrole c8yedge-operator-manager-role --type='json' -p '[
  {
    "op": "add",
    "path": "/rules/-",
    "value": {
      "apiGroups": ["admissionregistration.k8s.io"],
      "resources": [
        "mutatingwebhookconfigurations",
        "validatingwebhookconfigurations"
      ],
      "verbs": [
        "get",
        "create",
        "list",
        "patch",
        "update",
        "watch"
      ]
    }
  },
  {
    "op": "add",
    "path": "/rules/-",
    "value": {
      "apiGroups": [""],
      "resources": ["jobs"],
      "verbs": ["watch"]
    }
  },
  {
    "op": "add",
    "path": "/rules/-",
    "value": {
      "apiGroups": ["policy"],
      "resources": ["poddisruptionbudgets"],
      "verbs": [
        "create",
        "delete",
        "get",
        "list",
        "patch",
        "update"
      ]
    }
  }
]'
```

##### **Why Use JSON Patch?**  
- Ensures rules are **appended** without overwriting existing ones.  
- Provides precise control over specific sections of the resource.  

---

## **Verification**  

After applying the patch, validate that the new permissions have been added correctly by running:  

```bash
kubectl get clusterrole c8yedge-operator-manager-role -o yaml
```

Alternatively, run the verification option of the script:  

```bash
./c8yedge-1018-0-1-to-2025-apply-clusterrole-patch.sh --verify
```

If the patch was applied correctly, the output should confirm that the required permissions exist. If any are missing, you should reapply the patch.  

---

## **Conclusion**  

- The upgrade from **1018.0.1 to 2025.0.0** requires additional webhook-related permissions for the `ClusterRole`.  
- **This patch must be applied before the operator upgrade** to prevent permission-related failures.  
- Two methods were documented for applying the required permissions:  
  1. **Using the provided script** (Recommended for ease and automation).  
  2. **Manual YAML/JSON application** (For manual control).  

---
