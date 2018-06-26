# Minify a JavaScript file very fast


# CLI 

```sh
npm install -g minify-fast
minify-fast --input src/**/*.js # will modify files in src !
minify-fast --input src/**/*.js --output out
```

## node.js API

```sh
npm install --save-dev minify-fast
```

```js
var minify = require('minifyFast')
// import minify from 'minifyFast' // or using ES modules

const code = `
let a     = [1, 2, 3]
const b = a.map (n => n * 2)
console.log(a, b) 
`
console.log(minify(code))
```
