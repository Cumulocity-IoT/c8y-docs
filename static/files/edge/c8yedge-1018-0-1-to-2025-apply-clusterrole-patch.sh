#!/bin/bash

# Set variables
YAML_FILE="c8yedge-operator-claster-role-patch.yaml"
YAML_URL="https://github.com/Cumulocity-IoT/c8y-docs/blob/develop/static/files/edge-k8s/${YAML_FILE}"
DOC_URL="https://github.com/Cumulocity-IoT/c8y-docs/blob/develop/docs/clusterrole-patch"

# JSON patch content inline
JSON_PATCH='[
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

# Function to display help
show_help() {
    cat <<EOF

Usage: $(basename "$0") [OPTIONS]

This script patches the Kubernetes ClusterRole required for upgrading the operator.

Options:
  -y, --yaml    Apply the patch using YAML (downloads the patch file from the server).
  -j, --json    Apply the patch using JSON (inline patching).
  -v, --verify  Verify if the necessary permissions exist in the ClusterRole.
  -h, --help    Display this help message and documentation.

Examples:
  Apply patch using YAML:
    ./$(basename "$0") --yaml
    ./$(basename "$0") -y

  Apply patch using JSON:
    ./$(basename "$0") --json
    ./$(basename "$0") -j

  Verify patch application:
    ./$(basename "$0") --verify
    ./$(basename "$0") -v

Documentation:
  For more details, visit: $DOC_URL

EOF
    exit 0
}

# Function to check required dependencies
check_dependencies() {
    REQUIRED_COMMANDS=("kubectl" "curl" "jq")

    for cmd in "${REQUIRED_COMMANDS[@]}"; do
        if ! command -v "$cmd" &> /dev/null; then
            echo "❌ Error: Required command '$cmd' is not installed. Please install it and try again."
            exit 1
        fi
    done

    echo "✅ All required dependencies are installed."
}

# Function to apply YAML patch
apply_yaml_patch() {
    check_dependencies

    echo "Downloading YAML patch file from $YAML_URL..."
    curl -sO "$YAML_URL"

    # Check if the download was successful
    if [ ! -f "$YAML_FILE" ]; then
        echo "❌ Error: Failed to download YAML file from $YAML_URL."
        exit 1
    fi

    # Check if the downloaded file is a valid YAML file
    if ! grep -q "apiGroups:" "$YAML_FILE" || ! grep -q "resources:" "$YAML_FILE"; then
        echo "❌ Error: The downloaded YAML file does not appear to be valid."
        rm -f "$YAML_FILE"  # Remove the invalid file to avoid confusion
        exit 1
    fi

    echo "✅ YAML file downloaded and validated successfully."

    # Apply the YAML patch
    echo "Applying YAML patch..."
    kubectl patch clusterrole c8yedge-operator-manager-role --type='json' --patch-file "$YAML_FILE"

    if [ $? -eq 0 ]; then
        echo "✅ YAML patch applied successfully."
    else
        echo "❌ Error: Failed to apply the YAML patch."
        exit 1
    fi

    # Cleanup the downloaded YAML file after successful patching
    rm -f "$YAML_FILE"
}

# Function to apply JSON patch
apply_json_patch() {
    check_dependencies

    echo "Applying JSON patch..."
    kubectl patch clusterrole c8yedge-operator-manager-role --type='json' -p "$JSON_PATCH"

    if [ $? -eq 0 ]; then
        echo "✅ JSON patch applied successfully."
    else
        echo "❌ Error: Failed to apply the JSON patch."
        exit 1
    fi
}

# Function to verify if the patch was applied
verify_patch() {
    check_dependencies

    echo "Verifying applied permissions..."

    MISSING_RULES=0

    # List of required permissions to check
    RESOURCES=("mutatingwebhookconfigurations" "validatingwebhookconfigurations" "jobs" "poddisruptionbudgets")

    for resource in "${RESOURCES[@]}"; do
        if ! kubectl get clusterrole c8yedge-operator-manager-role -o json | jq -e ".rules[] | select(.resources[] == \"$resource\")" > /dev/null; then
            echo "❌ Missing permission: $resource"
            MISSING_RULES=1
        fi
    done

    if [ $MISSING_RULES -eq 0 ]; then
        echo "✅ All required permissions are present!"
    else
        echo "❌ Some permissions are missing. Please reapply the patch."
        exit 1
    fi
}

# Check for command-line arguments
if [[ $# -eq 0 ]]; then
    show_help
fi

while [[ $# -gt 0 ]]; do
    case "$1" in
        -y|--yaml)
            apply_yaml_patch
            shift
            ;;
        -j|--json)
            apply_json_patch
            shift
            ;;
        -v|--verify)
            verify_patch
            shift
            ;;
        -h|--help)
            show_help
            ;;
        *)
            echo "❌ Invalid option: $1"
            show_help
            ;;
    esac
done

echo "Patch process completed!"
