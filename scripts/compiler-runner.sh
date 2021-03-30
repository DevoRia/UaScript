#!/usr/bin/env node

workDir=$1
inPath=$2
outPath=$3

if [ ! -d $workDir/node_modules/uascript/lib ]; then
  node $workDir true $workDir/$inPath $workDir/$outPath
else
  node $workDir/node_modules/uascript/lib true $workDir/$inPath $workDir/$outPath
fi

node $workDir/$outPath