const subdomain = require("../modules/subdomain");
const portscan = require("../modules/portscan");
const headers = require("../modules/headers");
const techdetect = require("../modules/techdetect");
const dir = require("../modules/dirbruteforce");
const saver = require("../utils/saver");
const cvecheck = require("../modules/cvecheck");

async function runPipeline(target) {
    console.log("\n[+] Starting ReconX on:", target);

    const subs = await subdomain.enumerate(target);

    const ports = await portscan.scan(subs, "aggressive");
    const headerIssues = await headers.check(subs);
    const tech = await techdetect.detect(subs);
    const cves = await cvecheck.check(tech);
    const dirs = await dir.scan(subs);

    const report = {
       target,
       subdomains: subs,
       ports,
       headers: headerIssues,
       technologies: tech,
       cves,
       directories: dirs
};
    saver.save(report);
    console.log("[DEBUG] Subdomains:", subs);
    console.log("\n[+] Recon Completed.\n");
}

module.exports = { runPipeline };
