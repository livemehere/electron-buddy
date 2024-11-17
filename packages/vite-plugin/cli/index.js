#!/usr/bin/env node

const { argsToMap, isEmpty } = require('./utils');
const { preview } = require('./preview');
const { printHelp } = require('./help');

const args = argsToMap(process.argv);

if (isEmpty(args)) {
  console.error('[@electron-buddy/vite-plugin] No arguments provided');
  printHelp();
  process.exit(1);
}

if (args.help) {
  printHelp();
  return;
}

if (args.preview) {
  preview();
  return;
}
