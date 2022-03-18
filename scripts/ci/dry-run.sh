#!/bin/bash

# Requires Act: https://github.com/nektos/act
set -ex

WORKFLOW=$1

# Dry-run
act -n -W .github/workflows/$WORKFLOW.yml --secret-file scripts/mock-secrets
