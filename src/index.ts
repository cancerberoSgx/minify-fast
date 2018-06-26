
import * as esprima from 'esprima'
import * as escodegen from 'escodegen'

export function minify(s: string): string{
    var ast = esprima.parseScript(s);
    return escodegen.generate(ast, {
      format: (escodegen as any).FORMAT_MINIFY
    }) || s
}
