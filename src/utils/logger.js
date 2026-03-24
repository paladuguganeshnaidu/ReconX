const chalk = require("chalk");

function info(msg) {
    console.log(chalk.blue("[*] " + msg));
}

function success(msg) {
    console.log(chalk.green("[+] " + msg));
}

function warn(msg) {
    console.log(chalk.yellow("[!] " + msg));
}

module.exports = { info, success, warn };
