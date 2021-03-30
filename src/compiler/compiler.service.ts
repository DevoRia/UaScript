import {dataMap} from "./map.service";

export function compile(source: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      Object.entries(dataMap)
        .map(map => source = source.replace(new RegExp(map[1], 'g'), map[0]))
      resolve(source);
    } catch (e) {
      reject(e);
    }
  })
}