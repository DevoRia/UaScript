import {dataMap} from "./keyword-map";
import {parse, restore} from "./parser";

const STRING_PATTERN = '$'
const COMMENT_PATTERN = '%'

export function compile(source: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const { source: sourceWithoutStrings, fragments: strings } = parseString(source);
      const { source: sourceWithoutStringsAndComments, fragments: comments } = parseComments(sourceWithoutStrings);
      source = sourceWithoutStringsAndComments;
      Object.entries(dataMap).map(map => source = source.replace(new RegExp(map[1], 'g'), map[0]));
      source = restore(source, strings, STRING_PATTERN);
      source = restore(source, comments, COMMENT_PATTERN);
      resolve(source);
    } catch (e) {
      reject(e);
    }
  })
}

function parseString(source: string) {
  const doubleQuoteStrings = source.match(/"(.*?)"/g) || []
  const singleQuoteStrings = source.match(/'(.*?)'/g) || []
  const templateQuoteStrings = source.match(/`((.|\n)*)`/g) || []

  const strings = [...doubleQuoteStrings, ...singleQuoteStrings, ...templateQuoteStrings]

  return {
    source: parse(source, strings, STRING_PATTERN),
    fragments: strings
  }
}

function parseComments(source: string) {
  const singleLineComment = source.match(/\/\/(.*?)\n/g) || []
  const multiLineStrings = source.match(/\/\*((.|\n)*)\*\//g) || []

  const comments = [...singleLineComment, ...multiLineStrings]

  return {
    source: parse(source, comments, COMMENT_PATTERN),
    fragments: comments
  }
}