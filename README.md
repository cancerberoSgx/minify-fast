# Minify a JavaScript file very fast


# CLI 

```sh
npm install -g minify-fast
minify-fast --input 
```

```js
var minifyFast = require('minifyFast')
const code = `
let a     = [1, 2, 3]
const b = a.map (n => n * 2)
console.log(a, b) 
`
console.log(minifyFast(code))
```


## node.js API

```sh
npm install --save-dev minify-fast
```

```js
var minifyFast = require('minifyFast')
// import minifyFast from 'minifyFast' // or using ES modules

const code = `
let a     = [1, 2, 3]
const b = a.map (n => n * 2)
console.log(a, b) 
`
console.log(minifyFast(code))
```
