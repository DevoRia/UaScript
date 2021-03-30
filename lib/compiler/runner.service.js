"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSource = exports.compileAndRunSource = void 0;
const compiler_service_1 = require("./compiler.service");
async function compileAndRunSource(source) {
    runSource(await compiler_service_1.compile(source));
}
exports.compileAndRunSource = compileAndRunSource;
function runSource(source) {
    eval(source);
}
exports.runSource = runSource;
