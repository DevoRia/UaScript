#!/usr/bin/env node

workDir=$1
source=$2

node $workDir/node_modules/uascript/lib false $source
