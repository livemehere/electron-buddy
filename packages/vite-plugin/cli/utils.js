/**
 * @return {Record<'preview', string|boolean>}
 * */
const argsToMap = (argv) => {
  const result = {};
  for (let i = 2; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const key = argv[i].slice(2);
      const value = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : true;
      result[key] = value;
      if (value !== true) i++;
    }
  }
  return result;
};

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

module.exports = {
  argsToMap,
  isEmpty
};
