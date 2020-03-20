import { readdirSync } from 'fs';
import { resolve } from 'path';
import { execSync } from 'child_process';

const packages = readdirSync(resolve(process.cwd(), 'packages'));

export const createGeneralBundle = (): void => {
  console.log('> Generating general bundle ...');

  execSync('rm -rf ./lib');

  packages.forEach((item) => {
    execSync(`mkdir -p lib/${item}`);
    execSync(`cp -r ${process.cwd()}/packages/${item}/lib/ ${process.cwd()}/lib/${item}`);
  });
};

createGeneralBundle();
