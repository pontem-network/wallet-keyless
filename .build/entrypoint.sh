#!/bin/bash

set -ex

# Check environment
ENV_LIST=(
    "VUE_APP_API_URL"
)
for variable in ${ENV_LIST[@]}; do
    eval ": \"\${$variable:?\"Need to set $variable from .env\"}\""
    sed -i "s|--${variable}--|${!variable}|g;" ./js/*.js
    sed -i "s|--${variable}--|${!variable}|g;" ./*.html
done

exec "$@"
