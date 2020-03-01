import { writeFileSync, readFileSync } from 'fs';
import { resolve } from 'path';

const path = resolve(__dirname, './lib/index.js');
const file = readFileSync(path);

writeFileSync(path, `/* eslint-disable */\n${file}`);
