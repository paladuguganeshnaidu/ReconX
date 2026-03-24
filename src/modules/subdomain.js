const axios = require("axios");

async function enumerate(domain) {
    console.log("[*] Enumerating subdomains...");

    let subs = new Set();

    // 🔹 Try crt.sh
    try {
        const res = await axios.get(`https://crt.sh/?q=%25.${domain}&output=json`, {
            timeout: 5000
        });

        res.data.forEach(entry => {
            entry.name_value.split("\n").forEach(sub => {
                sub = sub.trim();
                if (sub && !sub.startsWith("*.")) {
                    subs.add(sub);
                }
            });
        });

        console.log(`[+] crt.sh found: ${subs.size}`);
    } catch (err) {
        console.log("[!] crt.sh failed");
    }

    // 🔹 Fallback: always include main domain
    subs.add(domain);

    // 🔹 Common subdomains (manual bruteforce)
    const commonSubs = ["www", "api", "dev", "test", "admin"];

    commonSubs.forEach(sub => {
        subs.add(`${sub}.${domain}`);
    });

    const result = [...subs];

    console.log(`[+] Final subdomains: ${result.length}`);

    return result.slice(0, 10);
}

module.exports = { enumerate };
