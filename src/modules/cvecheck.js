const fs = require("fs");

// Load CVE database
function loadDatabase() {
    const raw = fs.readFileSync("data/cves.txt", "utf-8");

    return raw
        .split("\n")
        .filter(line => line.trim() !== "")
        .map(line => {
            const [software, min_version, max_version, cve, desc] = line.split("|");

            return {
                software: software.toLowerCase(),
                min_version,
                max_version,
                cve,
                desc
            };
        });
}

// Extract software name
function extractSoftware(serverHeader) {
    if (!serverHeader) return null;

    const header = serverHeader.toLowerCase();

    if (header.includes("nginx")) return "nginx";
    if (header.includes("apache")) return "apache";
    if (header.includes("mongodb")) return "mongodb";
    if (header.includes("iis")) return "iis";
    if (header.includes("openssh")) return "openssh";
    if (header.includes("mysql")) return "mysql";
    if (header.includes("node")) return "node";

    return null;
}

// Extract version
function extractVersion(serverHeader) {
    if (!serverHeader) return null;

    const match = serverHeader.match(/\/([\d.]+)/);
    return match ? match[1] : null;
}

// Convert version to comparable array
function versionToArray(v) {
    return v.split(".").map(num => parseInt(num));
}

// Compare versions
function isVersionInRange(version, min, max) {
    const v = versionToArray(version);
    const minV = versionToArray(min);
    const maxV = versionToArray(max);

    for (let i = 0; i < v.length; i++) {
        if (v[i] < (minV[i] || 0)) return false;
        if (v[i] > (maxV[i] || 999)) return false;
    }

    return true;
}

// Main CVE check
function check(techData) {
    console.log("[*] Checking CVEs...");

    const db = loadDatabase();
    let findings = [];

    for (let item of techData) {
        const software = extractSoftware(item.server);
        const version = extractVersion(item.server);

        if (!software || !version) continue;

        db.forEach(entry => {
            if (
                entry.software === software &&
                isVersionInRange(version, entry.min_version, entry.max_version)
            ) {
                findings.push({
                    target: item.target,
                    software,
                    version,
                    cve: entry.cve,
                    description: entry.desc,
                    confidence: "low" // honest labeling
                });
            }
        });
    }

    return findings;
}

module.exports = { check };
