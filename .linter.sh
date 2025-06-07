#!/bin/bash
cd /home/kavia/workspace/code-generation/petmemories-chronicle-35817-f3943afe/petmemories_chronicle
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

