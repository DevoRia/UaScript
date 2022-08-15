import {dataMap} from "./keyword-map";

export function compile(source: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const {source: sourceWithoutStrings, strings} = parseString(source)
      source = sourceWithoutStrings;
      Object.entries(dataMap)
        .map(map => source = source.replace(new RegExp(map[1], 'g'), map[0]));
      source = restoreString(source, strings);
      resolve(source);
    } catch (e) {
      reject(e);
    }
  })
}

function parseString(source: string) {
  const doubleQuoteStrings = source.match(/"(.*?)"/g) || []
  const singleQuoteStrings = source.match(/'(.*?)'/g) || []
  const templateQuoteStrings = source.match(/`(.*?)`/g) || []

  const strings = [...doubleQuoteStrings, ...singleQuoteStrings, ...templateQuoteStrings]

  strings.forEach((savedString, i) => source = source.replace(savedString, `$${i}$`))

  return {
    source,
    strings
  }
}

function restoreString(source: string, savedStrings: string[]) {
  savedStrings.forEach((savedString, i) => source = source.replace(`$${i}$`, savedString));
  return source;
}