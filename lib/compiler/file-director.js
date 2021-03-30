"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileByPath = void 0;
const compiler_service_1 = require("./compiler.service");
const constants_1 = require("../constants");
const shell_command_1 = require("../utils/shell-command");
const fs = require('fs');
const pathHelper = require('path');
const shellCommand = new shell_command_1.ShellCommand();
async function compileByPath(inPath, outPath) {
    await shellCommand.rmrf(outPath);
    return new Promise(async (resolve, reject) => {
        try {
            if (fs.lstatSync(inPath).isDirectory()) {
                const filePaths = (await getFilesDeep(inPath)).flat();
                const compiledSources = await compileFiles(filePaths);
                await writeCompiledFiles(inPath, outPath, filePaths, compiledSources);
                resolve();
            }
            else {
                const compiledSources = await compileFiles([inPath]);
                await writeCompiledFiles(inPath, outPath, [inPath], compiledSources);
            }
        }
        catch (e) {
            reject(e);
        }
    });
}
exports.compileByPath = compileByPath;
function getFilesDeep(path) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, async (err, files) => {
            if (err) {
                reject(err);
            }
            const promises = files
                .map(file => {
                const filePath = pathHelper.join(path, file);
                if (fs.lstatSync(filePath).isDirectory()) {
                    return getFilesDeep(filePath);
                }
                else {
                    return filePath;
                }
            })
                .filter((file) => typeof file !== 'string' || file.endsWith(constants_1.Extensions.UAS));
            resolve(await Promise.all(promises));
        });
    });
}
function compileFiles(files) {
    const promises = files.map(file => new Promise((resolve, reject) => {
        fs.readFile(file, async (err, source) => {
            try {
                const compiledSource = await compiler_service_1.compile(source.toString("utf-8"));
                resolve(compiledSource);
            }
            catch (e) {
                reject(e);
            }
        });
    }));
    return Promise.all(promises);
}
async function writeCompiledFiles(inPath, outPath, filePaths, compiledSource) {
    const promises = filePaths.map((path, i) => new Promise(async (resolve, reject) => {
        const outCompiledPath = prepareCompiledFilePath(path, inPath, outPath);
        await prepareFolders(outPath, outCompiledPath);
        fs.writeFile(outCompiledPath, compiledSource[i], { flag: 'wx' }, (err) => {
            if (err) {
                reject(err);
            }
            resolve(outCompiledPath);
        });
    }));
    return Promise.all(promises);
}
function prepareCompiledFilePath(path, inPath, outPath) {
    return path.replace(inPath, outPath).replace(constants_1.Extensions.UAS, constants_1.Extensions.JS);
}
async function prepareFolders(rootPath, path) {
    const pathFolders = path.split('/');
    await shellCommand.mkdir(pathFolders.slice(0, pathFolders.length - 1).join('/'), true);
}
