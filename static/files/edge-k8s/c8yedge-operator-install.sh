#!/bin/bash

# 
# Install Cumulocity IoT Edge operator
# Usage:
#   ./c8yedge-operator-install.sh [-v C8YEDGE_OPERATOR_VERSION] [-n C8YEDGE_OPERATOR_NAMESPACE] [-i C8YEDGE_IMAGE_PULL_POLICY] [-r C8YEDGE_REGISTRY_HOST] -u C8YEDGE_REGISTRY_USERNAME -p C8YEDGE_REGISTRY_PASSWORD
#       or
#   ENV_VAR=... ./c8yedge-operator-install.sh
#
# Example:
#   Installing latest version (1018.0.1) into 'c8yedge' namespace:
#     ./c8yedge-operator-install.sh -n 'c8yedge' -u 'edge' -p '*******'
#           or
#     C8YEDGE_OPERATOR_NAMESPACE='c8yedge' C8YEDGE_REGISTRY_USERNAME='edge' C8YEDGE_REGISTRY_PASSWORD='*******' ./c8yedge-operator-install.sh
#
# Environment variables:
#   - C8YEDGE_OPERATOR_VERSION
#     Version of C8y Edge operator to install. Will install latest version if not specificed.
#
#   - C8YEDGE_OPERATOR_NAMESPACE
#     Namespace in which to install. Will install in 'c8yedge' namespace if not specified.
#
#   - C8YEDGE_REGISTRY_HOST
#     Edge operator registry URI. Points to production registry 'registry.c8y.io' if not specified.
#    
#   - C8YEDGE_IMAGE_PULL_POLICY
#     Configures the ImagePullPolicy for the Edge operator. Can be set to 'Always' or 'IfNotPresent', defaults to 'IfNotPresent'.
#
#   - C8YEDGE_REGISTRY_USERNAME
#     Username to access Edge operator registry. Prompted if not specified.
#
#   - C8YEDGE_REGISTRY_PASSWORD
#     Password to access Edge operator registry. Prompted if not specified.
#

display_usage() {
    echo ""
    echo "Usage:"
    echo "  ./c8yedge-operator-install.sh [-v C8YEDGE_OPERATOR_VERSION] [-n C8YEDGE_OPERATOR_NAMESPACE] [-i C8YEDGE_IMAGE_PULL_POLICY] [-r C8YEDGE_REGISTRY_HOST] -u C8YEDGE_REGISTRY_USERNAME -p C8YEDGE_REGISTRY_PASSWORD"
    echo "      or"
    echo "  ENV_VAR=... ./c8yedge-operator-install.sh"
    echo ""
    echo "Example:"
    echo "  Installing latest version (1018.0.1) into 'c8yedge' namespace:"
    echo "    ./c8yedge-operator-install.sh -n 'c8yedge' -u 'edge' -p '*******'"
    echo "      or"
    echo "  C8YEDGE_OPERATOR_NAMESPACE='c8yedge' C8YEDGE_REGISTRY_USERNAME='edge' C8YEDGE_REGISTRY_PASSWORD='*******' ./c8yedge-operator-install.sh"
    echo ""
    echo "Environment variables:"
    echo "  - C8YEDGE_OPERATOR_VERSION"
    echo "    Version of C8y Edge operator to install. Will install latest version if not specificed."
    echo ""
    echo "  - C8YEDGE_OPERATOR_NAMESPACE"
    echo "    Namespace in which to install. Will install in 'c8yedge' namespace if not specified."
    echo ""
    echo "  - C8YEDGE_REGISTRY_HOST"
    echo "    Edge operator registry URI. Points to production registry 'registry.c8y.io' if not specified."
    echo ""
    echo "  - C8YEDGE_IMAGE_PULL_POLICY"
    echo "    Configures the ImagePullPolicy for the Edge operator. Can be set to 'Always' or 'IfNotPresent', defaults to 'IfNotPresent'."
    echo ""
    echo "  - C8YEDGE_REGISTRY_USERNAME"
    echo "    Username to access Edge operator registry. Prompted if not specified."
    echo ""
    echo "  - C8YEDGE_REGISTRY_PASSWORD"
    echo "    Password to access Edge operator registry. Prompted if not specified."
    echo ""
    exit 1
}

# Parse command line arguments
while getopts "v:n:r:i:u:p:h" flag; do
    case "${flag}" in 
        v) C8YEDGE_OPERATOR_VERSION="${OPTARG}";;
        n) C8YEDGE_OPERATOR_NAMESPACE="${OPTARG}";;
        r) C8YEDGE_REGISTRY_HOST="${OPTARG}";;
        i) C8YEDGE_IMAGE_PULL_POLICY="${OPTARG}";;
        u) C8YEDGE_REGISTRY_USERNAME="${OPTARG}";;
        p) C8YEDGE_REGISTRY_PASSWORD="${OPTARG}";;
        h) display_usage;;
        *) display_usage;;
    esac
done

# Set defaults if not specified
if [ -z "$C8YEDGE_OPERATOR_VERSION" ]; then
    C8YEDGE_OPERATOR_VERSION="1018.0.1"
fi

if [ -z "$C8YEDGE_OPERATOR_NAMESPACE" ]; then
    C8YEDGE_OPERATOR_NAMESPACE="c8yedge"
fi

if [ -z "$C8YEDGE_REGISTRY_HOST" ]; then
    C8YEDGE_REGISTRY_HOST="registry.c8y.io"
fi

if [ -z "$C8YEDGE_IMAGE_PULL_POLICY" ]; then
    C8YEDGE_IMAGE_PULL_POLICY="IfNotPresent"
fi

if [ -z "$C8YEDGE_REGISTRY_USERNAME" ]; then
    read -p "Enter username to access Edge operator registry: " C8YEDGE_REGISTRY_USERNAME
fi

if [ -z "$C8YEDGE_REGISTRY_PASSWORD" ]; then
    read -s -p "Enter password to access Edge operator registry: " C8YEDGE_REGISTRY_PASSWORD
fi

# Attempt to login to the registry using provided credentials
login_output=$(echo "$C8YEDGE_REGISTRY_PASSWORD" | helm registry login -u "$C8YEDGE_REGISTRY_USERNAME" --password-stdin "$C8YEDGE_REGISTRY_HOST" 2>&1)

# Check if the login succeeded
if ! echo "$login_output" | grep -qi "Login Succeeded"; then
	echo -e "\n\n$login_output\n"
	if echo "$login_output" | grep -qi "unauthorized"; then
		echo -e "Error: Invalid credentials provided for the Edge operator registry \"${C8YEDGE_REGISTRY_HOST}\"."
		exit 1
	else
		echo -e "Error: Unable to establish a connection with the Edge operator registry \"${C8YEDGE_REGISTRY_HOST}\"."
		exit 1
	fi
fi

# Stop on errors
set -e

echo -e "\n\nInstalling Cumulocity IoT Edge operator, version ${C8YEDGE_OPERATOR_VERSION} from ${C8YEDGE_REGISTRY_HOST}\n\n"

# Install or upgrade Edge operator 
helm upgrade --install c8yedge-operator oci://${C8YEDGE_REGISTRY_HOST}/edge/helm-charts/cumulocity-iot-edge-operator \
    --version="${C8YEDGE_OPERATOR_VERSION}" \
    --namespace "${C8YEDGE_OPERATOR_NAMESPACE}" \
    --create-namespace \
    --set image.repository="${C8YEDGE_REGISTRY_HOST}/edge/cumulocity-iot-edge-operator" \
    --set image.pullPolicy="${C8YEDGE_IMAGE_PULL_POLICY}" \
    --set imageCredentials.registry="${C8YEDGE_REGISTRY_HOST}" \
    --set imageCredentials.username="${C8YEDGE_REGISTRY_USERNAME}" \
    --set imageCredentials.password="${C8YEDGE_REGISTRY_PASSWORD}"
