
import * as esprima from 'esprima'
import * as escodegen from 'escodegen'
import * as acorn from 'acorn'
import * as astring from 'astring'

export interface MinifierConfig {
  /** input code */
  code: string,
  /** which parser to use. Default is esprima */
  parser?: 'esprima' | 'acorn',
  /** which code generator to use. Default is escodegen */
  generator?: 'escodegen' | 'astring'
  /** see http://esprima.readthedocs.io/en/4.0/syntactic-analysis.html# */
  esprimaOptions?: {
    /** Tolerate a few cases of syntax errors. Default is true */
    tolerant?: boolean,


    // /** Support JSX syntax. Default is true */
    // jsx?: boolean
  },
  acornOptions?: {
    /**Indicates the ECMAScript version to parse. Must be either 3, 5, 6 (2015), 7 (2016), 8 (2017), 9 (2018) or 10 (2019, partial support). This influences support for strict mode, the set of reserved words, and support for new syntax features. Default is 7. */
    ecmaVersion?: '3' | '5' | '6' | '7' | '8' | '9' | '10'

    /** Indicate the mode the code should be parsed in. Can be either "script" or "module". This influences global strict mode and parsing of import and export declarations. Default 'script' */
    sourceType?: 'script' | 'module'
  }
}
export default function (config: MinifierConfig): string {
  config = getDefaultsFor(config)
  let ast: any
  let output: string
  if (config.parser === 'esprima') {
    ast = esprima.parseScript(config.code);
  }
  else {
    ast = acorn.parse(config.code, config.acornOptions)
  }
  if (config.generator === 'escodegen') {
    output = escodegen.generate(ast, {
      format: (escodegen as any).FORMAT_MINIFY
    }) || config.code
  }
  else {
    output = astring.generate(ast) || config.code
  }
  return output
}

function getDefaultsFor(config: MinifierConfig): MinifierConfig {
  config.parser = config.parser || 'esprima'
  config.generator = config.generator || 'escodegen'
  config.esprimaOptions = config.esprimaOptions || {}
  config.esprimaOptions.tolerant = typeof config.esprimaOptions.tolerant === 'boolean' ? config.esprimaOptions.tolerant : true

  config.acornOptions = config.acornOptions || {}
  config.acornOptions.ecmaVersion = config.acornOptions.ecmaVersion || '7'
  config.acornOptions.sourceType = config.acornOptions.sourceType || 'script'

  return config
}