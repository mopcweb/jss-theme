import { execSync } from 'child_process';

/* eslint-disable-next-line */
// const pkg = require('./package.json');

const packages = ['jss-theme', 'jss-theme-angular', 'jss-theme-default'];

export const createGeneralBundle = (): void => {
  console.log('> Generating general bundle ...');

  execSync('rm -rf ./lib');

  packages.forEach((item) => {
    execSync(`mkdir -p lib/${item}`);
    execSync(`cp -r ${__dirname}/packages/${item}/lib/ ${__dirname}/lib/${item}`);
  });
};

createGeneralBundle();
