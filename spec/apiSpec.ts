import minify from '..'
import { fromNow } from 'hrtime-now'
import { readFileSync } from 'fs'

describe('API', () => {

  it('basic call should work', () => {
    const code = `
    let a     = [1, 2, 3]   ;
    const b  = a.map   (n   => n   * 2)  ; /* TODO: something forgotten */
    console.log(a, b)    ;   
    `
    const minified = fromNow(() => minify({ code }), t => console.log('basic took ' + t))
    expect(minified).toContain(`let a=[1,2,3];const b=a.map(n=>n*2);console.log(a,b)`)
  })

  it('syntax error should throw error', () => {
    const code = `
    syntax error be in the code - it should throw;   
    `
    expect(()=>minify({ code })).toThrowError()
  })

  it('how much it takes on a very big file?', () => {
    const code = readFileSync('node_modules/typescript/lib/typescript.js').toString()
    const minified = fromNow(() => minify({ code }), t => console.log('typescript.js took ' + t))
    console.log('Sizes: '+code.length/1000 + ' - '+minified.length/1000)
    // test other parser / generators and compare
  })

})