import { writeFileSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { execSync } from 'child_process';

/* eslint-disable-next-line */
const pkg = require('./package.json');

/**
 *  Updates Readme with current version
 */
export const updateReadme = (): void => {
  console.log('> Updating readme ...');

  const filePath = resolve(__dirname, 'Readme.md');

  const file = readFileSync(filePath, 'utf-8');

  const oldStr = /badge\/version.*-yellow\.svg/gi;
  const newStr = `badge/version-${pkg.version}-yellow.svg`;

  const newFile = file.replace(oldStr, newStr);

  writeFileSync(filePath, newFile, 'utf-8');
};

/**
 *  Updates bundle after build - disables eslint for file
 */
export const updateBundle = (): void => {
  console.log('> Updating bundle ...');

  const path = resolve(__dirname, './lib/index.js');
  const file = readFileSync(path);

  if (file) writeFileSync(path, `/* eslint-disable */${file}`);
};

/**
 *  Creates correct index.d.ts
 */
export const createTypings = (): void => {
  console.log('> Generating single index.d.ts ...');

  execSync('npx dts-bundle-generator -o index.d.ts ./lib/index.ts');
  execSync(`rm -rf ${__dirname}/lib/*.d.ts`);
  execSync(`rm -rf ${__dirname}/lib/defaultTheme`);
  execSync(`mv ${__dirname}/index.d.ts ${__dirname}/lib`);
};

updateReadme();
updateBundle();
createTypings();
