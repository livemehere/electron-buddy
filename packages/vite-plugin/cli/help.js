const printHelp = () => {
  console.log(`
    Usage: electron-buddy [options]
    
    Options:
        --help      Show help message
        --preview   Run electron app with 'main' entry file (same as 'electron .')
    `);
};

module.exports = {
  printHelp
};
