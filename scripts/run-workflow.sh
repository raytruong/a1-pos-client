#!/bin/bash

# Requires Act: https://github.com/nektos/act
set -ex

WORKFLOW=$1

# Run
act -W .github/workflows/$WORKFLOW.yml --secret-file scripts/mock-secrets