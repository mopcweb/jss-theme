import * as path from 'path';
import * as fs from 'fs';

/**
 *  Parses package.json and returns current version
 */
export const parsePackage = (): Record<
string | number, string | number | { [x: string]: string | number | boolean } | Array<string | number | boolean>
> => {
  const file = fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8');

  return JSON.parse(file);
};

/**
 *  Updates Readme with current version
 */
export const updateReadme = (): void => {
  const filePath = path.join(__dirname, 'Readme.md');

  const file = fs.readFileSync(filePath, 'utf-8');

  const { version } = parsePackage();

  const oldStr = /badge\/version.*-yellow\.svg/gi;
  const newStr = `badge/version-${version}-yellow.svg`;

  const newFile = file.replace(oldStr, newStr);

  fs.writeFileSync(filePath, newFile, 'utf-8');
};

updateReadme();
