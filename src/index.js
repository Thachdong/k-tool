const { Command } = require('commander');
const { generate } = require('./commands/generate');

const program = new Command();

program
    .name('k-tool')
    .description('CLI tool for various file operations')
    .version('1.0.0');

program
    .command('generate')
    .description('Scan files, generate data and append data files')
    .action(generate);

program.parse(process.argv);
