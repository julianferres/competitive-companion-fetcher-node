# competitive-companion-fetcher-node

Little HTTP Server written in node.js which works with [competitive-companion](https://github.com/jmerle/competitive-companion). It fetches a problem, parse the corresponding test files and generates a template for it

## Usage

```
npm install
node .
```

If you want to make an executable (Linux/MacOS) use `npm link`. By default, the name of the executable will be `cf_fetch`, but you could modify it in `package.json`

