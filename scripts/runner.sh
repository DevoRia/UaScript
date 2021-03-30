#!/usr/bin/env node

workDir=$1
source=$2

if [ ! -d $workDir/node_modules/uascript/lib ]; then
  node $workDir false $source
else
  node $workDir/node_modules/uascript/lib false $source
fi
