import {compile} from "./interpreter";

export async function compileAndRunSource(source: string) {
  runSource(await compile(source));
}

export function runSource(source: string) {
  eval(source);
}