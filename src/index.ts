import {compileByPath} from "./file-manager/file-manager";
import {compileAndRunSource} from "./interpreter/runner";

async function main() {
  const args = process.argv.slice(2);

  if (!args.length || !args[0] || !args[1]) {
    process.exit(0);
  }
  const isFileCompiler = Boolean(args[0]);

  if (isFileCompiler && args[2]) {
    const fromPath = args[1];
    const outPath = args[2];
    await compileByPath(fromPath, outPath);
  } else if (!isFileCompiler) {
    const source = args[1];
    await compileAndRunSource(source);
  }
}

main();