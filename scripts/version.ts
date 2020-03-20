import { writeFileSync } from 'fs';

const packagePath = `${process.cwd()}/package.json`;
/* eslint-disable-next-line */
const pkg = require(packagePath);

/** Gets version type from arguments and updates package version */
function updateVersion(): void {
  const version = pkg.version.split('.').map((item: string) => +item);

  if (process.argv[2] === 'patch') version[2] += 1;
  if (process.argv[2] === 'minor') {
    version[1] += 1;
    version[2] = 0;
  }
  if (process.argv[2] === 'major') {
    version[0] += 1;
    version[1] = 0;
    version[2] = 0;
  }

  if (process.argv[3] === 'beta' || process.argv[3] === 'alpha') version[2] = `${version[2]}-${process.argv[3]}`;

  pkg.version = version.join('.');

  writeFileSync(packagePath, JSON.stringify(pkg, null, 2));
}

updateVersion();
