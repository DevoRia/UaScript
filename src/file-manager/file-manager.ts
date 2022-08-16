import {compile} from "../interpreter/interpreter";
import {Extensions} from "../constants/extensions";
import {ShellCommand} from "../utils/shell-command";

const fs = require('fs');
const pathHelper = require('path');

const shellCommand = new ShellCommand();

export async function compileByPath(inPath: string, outPath: string): Promise<void> {
  await shellCommand.rmrf(outPath);
  return new Promise(async (resolve, reject) => {
    try {
      if (fs.lstatSync(inPath).isDirectory()) {
        const filePaths = (await getFilesDeep(inPath)).flat(Infinity) as string[];
        const compiledSources = await compileFiles(filePaths);
        await writeCompiledFiles(inPath, outPath, filePaths, compiledSources)
        resolve();
      } else {
        const compiledSources = await compileFiles([inPath]);
        await writeCompiledFiles(inPath, outPath, [inPath], compiledSources)
      }
    } catch (e) {
      reject(e);
    }
  })
}

function getFilesDeep(path: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(path, async (err: Error , files: string[]) => {
      if (err) {
        reject(err);
      }

      const promises = files
        .map(file => {
        const filePath = pathHelper.join(path, file);
        if (fs.lstatSync(filePath).isDirectory()) {
          return getFilesDeep(filePath);
        } else {
          return filePath;
        }
        })
        .filter((file) => typeof file !== 'string' || file.endsWith(Extensions.UAS))

      resolve(await Promise.all(promises));
    })
  })
}

function compileFiles(files: string[]): Promise<string[] | any> {
  const promises = files.map(file => new Promise((resolve, reject) => {
    fs.readFile(file, async (err: Error , source: Buffer) => {
      try {
        const compiledSource = await compile(source.toString("utf-8"));
        resolve(compiledSource)
      } catch (e) {
        reject(e);
      }
    })
  }))
  return Promise.all(promises);
}

async function writeCompiledFiles(inPath: string, outPath: string, filePaths: string[], compiledSource: string[]) {
  const promises = filePaths.map((path, i )=> new Promise(async (resolve, reject) => {
    const outCompiledPath = prepareCompiledFilePath(path, inPath, outPath);
    await prepareFolders(outPath, outCompiledPath);
    fs.writeFile(outCompiledPath, compiledSource[i], { flag: 'wx' },  (err: Error) => {
      if (err) {
        reject(err);
      }
      resolve(outCompiledPath);
    });
  }))
  return Promise.all(promises);
}

function prepareCompiledFilePath(path: string, inPath: string, outPath: string) {
  return path.replace(inPath, outPath).replace(Extensions.UAS, Extensions.JS);
}

async function prepareFolders(rootPath: string, path: string) {
  const pathFolders = path.split('/');
  await shellCommand.mkdir(pathFolders.slice(0, pathFolders.length - 1).join('/'), true);
}