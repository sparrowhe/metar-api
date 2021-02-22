'use strict';

const colors = require('colors');

const logger = {
    __getUTCTimeString() {
        return (new Date).toUTCString();
    },
    log(str) {
        console.log(`[${colors.blue(this.__getUTCTimeString())}] [info] ${str}`);
    },
    logln(str) {
        console.log(`[${colors.blue(this.__getUTCTimeString())}] [info]\n${str}`);
    },
    error(str) {
        console.log(`[${colors.blue(this.__getUTCTimeString())}] [${colors.red('error')}] ${colors.red(str)}`);
    },
    errln(str) {
        console.log(`[${colors.blue(this.__getUTCTimeString())}] [${colors.red('error')}]\n${colors.red(str)}`);
    },
    warn(str) {
        console.log(`[${colors.blue(this.__getUTCTimeString())}] [${colors.yellow('warn')}] ${colors.yellow(str)}`);
    },
    warnln(str) {
        console.log(`[${colors.blue(this.__getUTCTimeString())}] [${colors.yellow('warn')}]\n${colors.yellow(str)}`);
    }
};

module.exports = logger;
