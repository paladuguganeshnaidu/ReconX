const { exec } = require("child_process");

function buildCommand(targets, mode = "fast") {
    const targetStr = targets
         .map(t => t.trim())
	 .filter(t => t && !t.includes("\n"))
	.join(" ");
    const profiles = {
        fast: `nmap -F ${targetStr}`,
        stealth: `nmap -sS -T4 ${targetStr}`,
        full: `nmap -p- -T4 ${targetStr}`,
        vuln: `nmap --script vuln ${targetStr}`,
        service: `nmap -sV ${targetStr}`,
        aggressive: `nmap -A ${targetStr}`
    };

    return profiles[mode] || profiles.fast;
}

function scan(targets, mode = "fast") {
    return new Promise((resolve) => {
        console.log(`[*] Running Nmap (${mode} mode)...`);

        if (!targets || targets.length === 0) {
            console.log("[!] No targets for port scan");
            return resolve([]);
        }

        const command = buildCommand(targets, mode);

        exec(command, (err, stdout) => {
            if (err) {
                console.log("[!] Nmap error:", err.message);
                return resolve([]);
            }

            resolve(stdout);
        });
    });
}

module.exports = { scan };
