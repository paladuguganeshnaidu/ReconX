# ReconX

ReconX is a Node.js reconnaissance CLI built for authorized security assessments.
It automates early-stage offensive recon tasks and produces structured JSON reports that can be used for manual validation and deeper pentest workflows.

## Positioning

ReconX is designed for:
- Ethical hacking labs
- Internal red team simulations
- Bug bounty recon on in-scope assets
- Baseline attack surface mapping during pentests

ReconX is not an exploitation framework. It focuses on discovery and signal collection.

## Core Capabilities

- Certificate transparency based subdomain collection from crt.sh
- Common subdomain expansion for quick surface growth
- Multi-target Nmap scanning with profile support
- HTTP security header checks
- Basic web technology fingerprinting via Server header
- Lightweight CVE correlation using a local version-range database
- Directory path probing for common endpoints
- JSON report export in the reports folder

## Tech Stack

- Runtime: Node.js (CommonJS)
- Network requests: axios
- CLI output styling: chalk
- External scanner: nmap

## Project Layout

```text
src/
	main.js                 # CLI entrypoint
	core/pipeline.js        # Orchestrates all recon stages
	modules/
		subdomain.js          # crt.sh + common-subdomain expansion
		portscan.js           # Nmap profiles and execution
		headers.js            # Security header checks
		techdetect.js         # Server header fingerprinting
		cvecheck.js           # Local CVE correlation from data/cves.txt
		dirbruteforce.js      # Directory probing
		port.js               # Legacy/simple nmap module
	utils/
		saver.js              # Writes timestamped JSON reports
		logger.js             # Console helpers (currently not wired into pipeline)
data/
	cves.txt                # Local CVE mapping database
reports/
	demo.json               # Example report
```

## Pipeline Flow

Current execution flow in pipeline.js:

1. Enumerate subdomains
2. Run Nmap in aggressive mode
3. Check HTTP security headers
4. Detect technology server banners
5. Correlate possible CVEs from local DB
6. Probe common web directories
7. Save final report as JSON

## Requirements

Install before running:

1. Node.js 18+ recommended
2. Nmap available in PATH

Quick checks:

```bash
node -v
nmap --version
```

## Installation

```bash
git clone https://github.com/paladuguganeshnaidu/ReconX.git
cd ReconX
npm install
```

## Usage

```bash
node src/main.js <target-domain>
```

Example:

```bash
node src/main.js example.com
```

The run will generate a report file like:

```text
reports/report-1711182450123.json
```

## Port Scan Profiles (Implemented)

The scanner module supports multiple Nmap command profiles:

- fast: nmap -F
- stealth: nmap -sS -T4
- full: nmap -p-
- vuln: nmap --script vuln
- service: nmap -sV
- aggressive: nmap -A

The current pipeline uses aggressive by default.

## Report Structure

Generated JSON includes:

```json
{
	"target": "example.com",
	"subdomains": [],
	"ports": "<raw nmap output or [] on error>",
	"headers": [],
	"technologies": [
		{
			"target": "www.example.com",
			"server": "nginx/1.20.1"
		}
	],
	"cves": [],
	"directories": []
}
```

## Current Scope and Practical Notes

- HTTP probing uses http:// in multiple modules. HTTPS-first handling is not yet implemented.
- Subdomain enumeration is intentionally lightweight and capped.
- CVE correlation is heuristic and should be treated as low-confidence lead generation.
- Nmap results are stored as raw stdout for analyst review.

## Legal and Ethical Use

Use ReconX only against systems you own or have explicit written authorization to test.

You are responsible for:
- Staying within legal scope
- Respecting program rules in bug bounty engagements
- Avoiding disruption to production services

Unauthorized scanning may violate law and policy.

## Roadmap Ideas

- HTTPS fallback and TLS-aware header checks
- Better subdomain normalization and deduplication
- Structured parsing of Nmap output
- Concurrency controls and rate limiting
- Severity scoring and confidence tuning for CVE findings
- Optional output formats (CSV/Markdown)

## Author

Paladugu Ganesh Naidu

If this project helps your recon workflow, consider starring the repository.
