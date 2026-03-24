const fs = require("fs");

function save(data) {
    const file = `reports/report-${Date.now()}.json`;

    fs.writeFileSync(file, JSON.stringify(data, null, 2));

    console.log("[+] Report saved:", file);
}

module.exports = { save };
