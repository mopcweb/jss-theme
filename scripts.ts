import { writeFileSync, readFileSync } from 'fs';
import { resolve } from 'path';

/* eslint-disable-next-line */
const pkg = require('./package.json');

/**
 *  Updates Readme with current version
 */
export const updateReadme = (): void => {
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
  const path = resolve(__dirname, './lib/index.js');
  const file = readFileSync(path);

  if (file) writeFileSync(path, `/* eslint-disable */${file}`);
};

updateReadme();
updateBundle();
