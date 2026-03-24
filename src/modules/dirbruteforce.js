const axios = require("axios");

const wordlist = ["admin", "login", "dashboard", "api"];

async function scan(targets) {
    console.log("[*] Bruteforcing directories...");

    let found = [];

    for (let t of targets.slice(0, 3)) {
        for (let word of wordlist) {
            try {
                const url = `http://${t}/${word}`;
                const res = await axios.get(url);

                if (res.status === 200) {
                    found.push(url);
                }
            } catch {}
        }
    }

    return found;
}

module.exports = { scan };
