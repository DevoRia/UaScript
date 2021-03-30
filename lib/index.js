"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_director_1 = require("./compiler/file-director");
const runner_service_1 = require("./compiler/runner.service");
async function main() {
    const args = process.argv.slice(2);
    if (!args.length || !args[0] || !args[1]) {
        process.exit(0);
    }
    const isFileCompiler = Boolean(args[0]);
    if (isFileCompiler && args[2]) {
        const fromPath = args[1];
        const outPath = args[2];
        await file_director_1.compileByPath(fromPath, outPath);
    }
    else if (!isFileCompiler) {
        const source = args[1];
        await runner_service_1.compileAndRunSource(source);
    }
}
main();
