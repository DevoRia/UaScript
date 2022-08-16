#!/usr/bin/env node

const arg = process.argv[2]

if (!arg) {
    process.exit(0)
}


const config = JSON.parse(arg);

if (!config || !config.from || !config.to) {
    process.exit(0)
}

console.log(config.from, config.to)
