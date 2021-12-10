#!/bin/bash

# Requires Act: https://github.com/nektos/act
set -ex

WORKFLOW=$1

DRY_RUN=$(act -n -W .github/workflows/$WORKFLOW.yml)

# Run
act -W .github/workflows/$WORKFLOW.yml