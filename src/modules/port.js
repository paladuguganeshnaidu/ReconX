const { exec } = require("child_process");

function scan(targets) {
    return new Promise((resolve) => {
        console.log("[*] Running Nmap...");

        if (!targets.length) return resolve([]);

        exec(`nmap -F ${targets.join(" ")}`, (err, stdout) => {
            if (err) return resolve([]);

            resolve(stdout);
        });
    });
}

module.exports = { scan };
