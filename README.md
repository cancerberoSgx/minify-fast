# Minify a JavaScript file very fast

This package focus on providing space / comment removal from JavaScript code as fast as possible. No mangling, just spaces / comment removal

For those special situations in which a very large file full minification using uglify takes too long to execute. 

When you need an intermediate stage before real production and very large files are involved...


Technologies used: By default it will use [esprima](http://esprima.readthedocs.io) parser and [escodegen](https://github.com/estools/estraverse) code generatorbut it can be configured to use [acorn](https://github.com/acornjs/acorn/) parser and [astring](https://github.com/davidbonnet/astring) code generator  . 

# CLI 

```sh
npm install -g minify-fast
minify-fast --input src/**/*.js # will modify files in src !
minify-fast --input src/**/*.js --output out

# minify two input globs but this time using acorn parser and dump some debug information: 
minify-fast --input dist/**/*.js --input dist-umd/**/*.js --parser acorn --generator astring --debug
```

## node.js API

```sh
npm install --save-dev minify-fast
```

```js
var minify = require('minify-fast')
// Or if using ES modules / TypeScript
// import minify from 'minify-fast'

const code = `
  let a     = [1  , 2,    3];
  const b = a.map (n => n * 2) /*hello */
  console.log(a, b) 
`
console.log(minify({code}))
// let a=[1,2,3];const b=a.map(n=>n*2);console.log(a,b)
```

By default it will use [acorn](https://github.com/acornjs/acorn/) parser and [astring](https://github.com/davidbonnet/astring) code generator but it can be configured to use [esprima] parser and [escodegen](https://github.com/estools/estraverse) code generator. 


# TODO
 * error handling
 * generator astring not minifying
 * support typescript : https://github.com/eslint/typescript-eslint-parser ? mmm we still need a generator right ?
 * another parser : https://github.com/eslint/espree
 * input CLI verification for --parser, --generator, etc and fail OK
 * benchmarks to compare parsers and generators and against real minifiers like google-closure-compiler / uglify
 * sourcemaps ? test if / how affects performance
 * preserve comments ? 
 * jsx ? 