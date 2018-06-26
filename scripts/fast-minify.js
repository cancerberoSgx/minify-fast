const esprima = require('esprima')
const escodegen = require('escodegen')

function doUglify(s) {
  try {
    var ast = esprima.parse(s);
    s = escodegen.generate(ast, {
      format: escodegen.FORMAT_MINIFY
    }) || s;
  }
  catch (ex) {
    console.log('WARNING: Error trying to uglify JavaScript code. Not uglified. ');
    console.log('Reason:', ex)
  }
  return s;
}