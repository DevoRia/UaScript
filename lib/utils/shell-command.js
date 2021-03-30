"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellCommand = void 0;
const { exec } = require("child_process");
class ShellCommand {
    async mkdir(path, deep = false) {
        const command = `mkdir ${deep ? '-p' : null} ${path}`;
        return this.execute(command);
    }
    async ls(path) {
        return this.execute(`ls ${path}`);
    }
    async rmrf(path) {
        return this.execute(`rm -rf ${path}`);
    }
    async execute(command) {
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error || stderr) {
                    reject(error || stderr);
                }
                else {
                    resolve(stdout);
                }
            });
        });
    }
}
exports.ShellCommand = ShellCommand;
