#!/usr/bin/env node

workDir=$1
inPath=$2
outPath=$3

node $workDir/node_modules/uascript/lib true $workDir/$inPath $workDir/$outPath
