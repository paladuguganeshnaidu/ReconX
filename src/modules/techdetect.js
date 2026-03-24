const axios = require("axios");

async function detect(targets) {
    console.log("[*] Detecting technologies...");

    let results = [];

    for (let t of targets.slice(0, 5)) {
        try {
            const res = await axios.get(`http://${t}`);

            const server = res.headers["server"] || "unknown";

            results.push({
                target: t,
                server
            });

        } catch {}
    }

    return results;
}

module.exports = { detect };
