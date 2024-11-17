#!/usr/bin/env node

const { argsToMap, isEmpty } = require('./utils');
const { preview } = require('./preview');
const { printHelp } = require('./help');

const args = argsToMap(process.argv);

if (isEmpty(args)) {
  console.error('[@electron-buddy/vite-plugin] No arguments provided');
  printHelp();
  return;
}

if (args.help) {
  printHelp();
  return;
}

if (args.preview) {
  preview();
  return;
}
