const axios = require("axios");

async function check(targets) {
    console.log("[*] Checking headers...");

    let issues = [];

    for (let t of targets.slice(0, 5)) {
        try {
            const res = await axios.get(`http://${t}`);

            if (!res.headers["content-security-policy"]) {
                issues.push(`${t} missing CSP`);
            }

            if (!res.headers["x-frame-options"]) {
                issues.push(`${t} missing X-Frame-Options`);
            }

        } catch {}
    }

    return issues;
}

module.exports = { check };
