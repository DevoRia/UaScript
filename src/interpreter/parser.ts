export function parse(source: string, fragments: string[], pattern: string): string {
    fragments.forEach((savedString, i) => source = source.replace(savedString, `${pattern}${i}${pattern}`))
    return source;
}

export function restore(source: string, fragments: string[], pattern: string): string {
    fragments.forEach((savedString, i) => source = source.replace(`${pattern}${i}${pattern}`, savedString));
    return source;
}