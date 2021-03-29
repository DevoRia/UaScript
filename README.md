# UaScript
Ukrainian programming language

## To run demo:
### (in cloned this project from git)
`npm i`
`sh scripts/compiler-runner.sh demo demo-lib`

## How to use in own projects

1. Run script inside npm project:
`npm i uascript`

2. Create folder `src` and create inside `index.uas`

The tree of your project should be something like this:
```
├── _src
│   └── index.uas
├── _package.json
...
```

3. Next input into `index.uas` file simple code to say hello to this world:)

```
функція Головна() {
    написати("Привіт, світ!");
}

Головна();
```

4. Then add replace scripts configuration in `package.json` in project root.

```
"scripts": {
    "build": "sh node_modules/uascript/scripts/compiler.sh $(pwd) src dist",
    "start": "node dist"
}
```

5. Run this and enjoy 🦄

```
npm run build
npm run start
```
