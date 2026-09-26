# ReconX

ReconX is a Node.js reconnaissance CLI for **authorized security assessments**. It focuses on early attack-surface discovery and produces structured JSON reports for analyst review.

> ReconX is a recon tool, not an exploitation framework. Use it only against assets you own or are explicitly authorized to test.

## What it does

- Certificate-transparency subdomain discovery through crt.sh.
- Lightweight common-subdomain expansion.
- Nmap scanning with multiple profiles.
- HTTP security-header checks.
- Basic server-banner technology detection.
- Local CVE correlation using a version-range database.
- Common directory probing.
- Timestamped JSON report generation.

## Pipeline

Target → Subdomains → Nmap → Headers → Technology → CVE Correlation → Directory Probe → JSON Report.

## Technology

- Node.js.
- CommonJS.
- Axios.
- Chalk.
- Nmap.

## Repository structure

- src/main.js — CLI entrypoint.
- src/core/pipeline.js — orchestration.
- src/modules/subdomain.js — subdomain collection.
- src/modules/portscan.js — Nmap profiles.
- src/modules/headers.js — security headers.
- src/modules/techdetect.js — server-header fingerprinting.
- src/modules/cvecheck.js — local CVE correlation.
- src/modules/dirbruteforce.js — directory probing.
- src/utils/saver.js — report persistence.
- data/cves.txt — local CVE mapping data.
- reports/ — generated/example reports.

## Install

Requirements: Node.js 18+ and Nmap available on PATH.

Install dependencies with npm install.

## Run

The documented entry point is:

node src/main.js <target-domain>

Example: node src/main.js example.com

Reports are written under reports/.

## Nmap profiles

The scanner currently supports fast, stealth, full, vuln, service and aggressive profiles. The current pipeline uses the aggressive profile by default.

## Important limitations

- Some HTTP checks are HTTP-first rather than HTTPS-first.
- Subdomain collection is intentionally lightweight.
- CVE correlation is heuristic and should be treated as a lead, not proof of vulnerability.
- Raw Nmap output remains part of the report for manual validation.
- Concurrency/rate controls and richer structured parsing are future improvements.

## Safe use

Stay within written scope, respect bug-bounty program rules and avoid disruptive scans against production systems.

## License

See the repository license if present. Do not assume third-party Nmap/CVE/data content is covered by the project license.

## Author

Paladugu Ganesh Naidu

Repository: https://github.com/paladuguganeshnaidu/ReconX
