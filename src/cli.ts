
import minimist from 'minimist'
import glob from 'glob'
import { join, dirname } from 'path';
import { mkdir } from 'shelljs';
import { writeFileSync, readFileSync } from 'fs';
import minify from '.';
const args = minimist(process.argv.slice(2));

export interface Config {
  input: string | string[]
  output?: string
  debug?: boolean
}


export function main() {
  const config: Config = args as any
  if (!config.input) {
    help()
    return process.exit(1)
  }
  format(config, (config: Config, file: string) => {
    const content = readFileSync(file).toString()
    return minify(content)
  })
}

function help() {
  console.log(`Incorrect call. 
To output src files minified in 'out' call: 
  minify-fast --input src/**/*.js --output out
To minify all files in src call (warning, src files will be modified!):  
  minify-fast --input src/**/*.js
  `)
}



function format(config: Config, action: (config: Config, ...args: any[]) => string) {
  if (config.debug) {
    console.log(config);
  }
  let files = [];
  config.input = config.input instanceof Array ? config.input : [config.input];
  config.input.forEach((input) => {
    files = files.concat(glob.sync(input)); // TODO: union - no repeats
  });
  if (config.debug) {
    console.log(`Formatting ${files.length} files`);
  }
  if (!files.length) {
    console.log('No files to format, exiting. ');
    process.exit(0);
  }
  const inputFilesPrefix = sharedStart(files);

  const formatResults = [];
  files.forEach((file) => {
    try {
      const result = action(config, file)
      let outputFile;
      if (config.output) {
        outputFile = join(config.output, file.substring(inputFilesPrefix.length, file.length));
        mkdir('-p', dirname(outputFile));
      } else {
        outputFile = file;
      }
      if (config.debug) {
        console.log(`Writing ${outputFile}`);
      }
      if (result) {
        writeFileSync(outputFile, result)
      }
    } catch (ex) {
      console.log(`Error formatting ${file}`);
      throw ex;
    }
  });
  return formatResults;
}

function sharedStart(array) {
  const A = array.concat().sort();
  const a1 = A[0];
  const a2 = A[A.length - 1];
  const L = a1.length;
  let i = 0;
  while (i < L && a1.charAt(i) === a2.charAt(i)) i++;
  return a1.substring(0, i);
}

