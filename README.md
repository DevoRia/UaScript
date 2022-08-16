# UaScript
Ukrainian programming language

## To run demo:
### (in cloned this project from git)
`npm i`
`npm run demo`

## How to use in own projects

Before you need to install `Node.js`

0. Run `npm init` and complete all actions.

1. Run script inside npm project:
`npm i uascript`

2. Create folder with your `src` source and create inside `index.uas`
3. Next input into `index.uas` file simple code to say hello to this world:)

```
функція Головна() {
    написати("Привіт, світ!");
}

Головна();
```

4. Then create `uas.config.json` config file in the root of your project. And insert there next:

```
{
  "from": "src",
  "to": "dist"
}
```

The tree of your project should be something like this:
```
├── _src
│   └── index.uas
│   _uas.config.json
├── _package.json
...
```

4. Then open console and execute only

```
uas
```

After that UaScript compiles into JS

5. Run this and enjoy 🦄 

```
node dist
```
