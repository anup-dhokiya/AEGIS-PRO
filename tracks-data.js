'use strict';
// ═══════════════════════════════════════════════════════════════════════════
// AEGIS PRO — 5 CAREER TRACKS & CYBERSECURITY ACADEMY DATA ENGINE
// Based on the verified blueprint from "Free Cybersecurity Learning Resources"
// Domains:
// 1. DEFENSE      — Cyber Defense & Analysis (Blue Team / SOC)
// 2. OFFENSIVE    — Offensive Security (Red Team / Penetration Testing)
// 3. ENGINEERING  — Security Engineering & Architecture (DevSecOps & Cloud)
// 4. GRC          — Governance, Risk & Compliance (Enterprise Risk & Audit)
// 5. AI_SECURITY  — AI & Emerging Cyber Security (LLM & GenAI Security)
// ═══════════════════════════════════════════════════════════════════════════

const CAREER_TRACKS = {
  // ─────────────────────────────────────────────────────────────────────────
  // 1. CYBER DEFENSE & SOC OPERATIONS (BLUE TEAM)
  // ─────────────────────────────────────────────────────────────────────────
  DEFENSE: {
    id: 'DEFENSE',
    name: 'Cyber Defense & Analysis',
    shortName: 'Blue Team / SOC',
    badge: 'Defender Track',
    icon: '🔍',
    color: '#0284c7',
    tagline: 'Defend enterprise infrastructure, investigate live attacks, triage SIEM alerts, hunt threats, and master digital forensics.',
    targetRoles: ['SOC Analyst (L1, L2, L3)', 'Incident Responder', 'Threat Hunter', 'Detection Engineer', 'SOC Manager'],
    summary: 'Master the art of real-time detection and response. From parsing raw PCAP packets in Wireshark and writing YARA rules to correlating multi-stage attacks in Splunk and orchestrating SOAR playbooks.',
    phases: [
      {
        id: 'def_p1',
        title: 'PHASE 1: SOC L1 TRIAGE & DEFENSIVE BEDROCK',
        subtitle: 'Beginner (0–2 Years Experience)',
        goal: 'Understand the anatomy of enterprise security operations. Learn network packet analysis, log interpretation, endpoint monitoring, and master Level 1 alert triage before escalating incidents.',
        icon: '🛡️',
        modules: [
          {
            id: 'def_p1m1',
            title: 'Network Packet Analysis & Traffic Inspection',
            icon: '📡',
            objectives: [
              'Capture and dissect live traffic using Wireshark and TShark CLI on Windows/Linux.',
              'Analyze 3-way TCP handshakes, window sizing, sequence numbers, and reset packet indicators.',
              'Inspect cleartext and encrypted protocols: DNS queries, HTTP/HTTPS headers, TLS handshakes, and SNI.',
              'Detect malicious traffic patterns: port scanning (SYN/FIN/Xmas scans), ARP poisoning, and DNS exfiltration.',
              'Extract transferred payloads and malware binaries directly from PCAP streams.',
              'Hands-on Lab: Solve Network Traffic Basics challenges on TryHackMe.'
            ],
            resources: [
              { type: 'Ytvideo', label: 'Professor Messer: Network+ N10-009 Deep Dive (Free)', url: 'https://www.youtube.com/playlist?list=PLG49S3nxzAnl_tQe3kvnmeMid0mjF8Le8' },
              { type: 'lab', label: 'TryHackMe: Network Traffic Basics (Free Room)', url: 'https://tryhackme.com/room/networktrafficbasics' },
              { type: 'text', label: 'Wireshark User Guide & Packet Analysis Reference', url: 'https://www.wireshark.org/docs/wsug_html/' },
              { type: 'Ytvideo', label: 'NetworkChuck: Wireshark Crash Course for Defenders', url: 'https://www.youtube.com/watch?v=lb1Dw0elw0Q' },
              { type: 'lab', label: 'CyberDefenders: Free Packet Analysis Lab Challenges', url: 'https://cyberdefenders.org/' }
            ]
          },
          {
            id: 'def_p1m2',
            title: 'SIEM Fundamentals & Splunk Core Operations',
            icon: '📊',
            objectives: [
              'Understand the purpose of SIEM (Security Information and Event Management) and centralized logging.',
              'Master Splunk Search Processing Language (SPL): search, stats, eval, where, table, timechart, dedup.',
              'Install a local Splunk enterprise instance or Splunk Cloud sandbox for personal lab practice.',
              'Ingest and parse Windows Event Logs (Sysmon) and Linux syslog (/var/log/auth.log) into indexes.',
              'Construct custom alerting rules to detect brute-force login attempts (Event ID 4625 thresholding).',
              'Practice: Complete the official Splunk Free Training & Intro to Splunk courses.'
            ],
            resources: [
              { type: 'Ytvideo', label: 'Splunk Official YouTube: Splunk How-To & Training Series', url: 'https://www.youtube.com/@Splunkofficial' },
              { type: 'course', label: 'Splunk Free Training: Intro to Splunk & Using Fields', url: 'https://www.splunk.com/en_us/training/free-courses.html' },
              { type: 'course', label: 'SplunkWork+ Academic Portal: Free Courses & Lab Access', url: 'https://workplus.splunk.com' },
              { type: 'lab', label: 'TryHackMe: Intro to SIEM (Free Room)', url: 'https://tryhackme.com/room/introsiem' },
              { type: 'lab', label: 'TryHackMe: Splunk Basics Room', url: 'https://tryhackme.com/room/splunk101' }
            ]
          },
          {
            id: 'def_p1m3',
            title: 'Windows Event Logs, Sysmon & Endpoint Triage',
            icon: '🪟',
            objectives: [
              'Master critical Windows Security Event IDs: 4624 (Logon), 4625 (Failed Logon), 4688 (Process Creation), 4697 (Service Install), 4720 (User Created).',
              'Deploy Microsoft Sysmon with SwiftOnSecurity configuration to monitor process lineages and network connects.',
              'Analyze parent-child process anomalies (e.g., cmd.exe or powershell.exe spawned by winword.exe or excel.exe).',
              'Understand Windows persistence techniques: registry Run keys, scheduled tasks, and startup folders.',
              'Complete: Windows Logging for SOC room on TryHackMe.'
            ],
            resources: [
              { type: 'lab', label: 'TryHackMe: Windows Logging for SOC (Free Room)', url: 'https://tryhackme.com/room/windowsloggingforsoc' },
              { type: 'text', label: 'SwiftOnSecurity: Sysmon-Modular Configuration Template', url: 'https://github.com/SwiftOnSecurity/sysmon-config' },
              { type: 'text', label: 'Microsoft Learn: Windows Security Auditing Documentation', url: 'https://learn.microsoft.com/en-us/windows/security/threat-protection/auditing/advanced-security-auditing' },
              { type: 'Ytvideo', label: 'John Hammond: Analyzing Real Windows Event Logs', url: 'https://www.youtube.com/@_JohnHammond' }
            ]
          },
          {
            id: 'def_p1m4',
            title: 'SOC L1 Alert Triage & Incident Handling Workflow',
            icon: '🚨',
            objectives: [
              'Learn the standard SOC lifecycle: Alert generation -> Triage -> Verification -> Containment -> Escalation.',
              'Differentiate True Positives (TP), False Positives (FP), True Negatives (TN), and False Negatives (FN).',
              'Map adversary techniques to the MITRE ATT&CK Matrix and Lockheed Martin Cyber Kill Chain.',
              'Write professional Incident Triage Tickets documenting What, Where, When, Scope, and Recommended Actions.',
              'Hands-on: Solve realistic SOC tickets on LetsDefend.io community tier.'
            ],
            resources: [
              { type: 'lab', label: 'LetsDefend: Interactive Blue Team & SOC Simulator', url: 'https://letsdefend.io/' },
              { type: 'lab', label: 'TryHackMe: SOC L1 Alert Triage (Free Room)', url: 'https://tryhackme.com/room/socl1alerttriage' },
              { type: 'lab', label: 'TryHackMe: SOC Role in Blue Team (Free Room)', url: 'https://tryhackme.com/room/socroleinblueteam' },
              { type: 'lab', label: 'TryHackMe: MITRE ATT&CK Framework (Free Room)', url: 'https://tryhackme.com/room/mitre' },
              { type: 'lab', label: 'TryHackMe: Cyber Kill Chain (Free Room)', url: 'https://tryhackme.com/room/cyberkillchainzmt' }
            ]
          }
        ]
      },
      {
        id: 'def_p2',
        title: 'PHASE 2: INCIDENT RESPONSE & THREAT HUNTING',
        subtitle: 'Intermediate (2–5 Years Experience)',
        goal: 'Move beyond reactive triage. Perform deep-dive memory forensics, analyze live malware behavior in sandboxes, deploy EDR sensors, and conduct proactive threat hunts across enterprise endpoints.',
        icon: '🔬',
        modules: [
          {
            id: 'def_p2m1',
            title: 'Memory Forensics & Volatility 3 Analysis',
            icon: '🧠',
            objectives: [
              'Acquire raw RAM images using DumpIt, FTK Imager CLI, or WinPmem.',
              'Analyze Windows memory dumps using Volatility 3: windows.pslist, windows.pstree, windows.malfind.',
              'Identify DLL injection, hollow processes, and unbacked executable memory regions.',
              'Extract injected shellcode from memory and calculate cryptographic hashes (SHA-256).',
              'Reconstruct open network connections from RAM using windows.netscan.'
            ],
            resources: [
              { type: 'text', label: 'Volatility 3 Official Documentation & Command Reference', url: 'https://volatility3.readthedocs.io/' },
              { type: 'lab', label: 'CyberDefenders: Memory Forensics Practice Challenges', url: 'https://cyberdefenders.org/' },
              { type: 'lab', label: 'TryHackMe: Volatility Room (Memory Forensics)', url: 'https://tryhackme.com/room/bpvolatility' },
              { type: 'Ytvideo', label: '13Cubed: Introduction to Volatility 3 (Forensics Series)', url: 'https://www.youtube.com/@13cubed' }
            ]
          },
          {
            id: 'def_p2m2',
            title: 'Malware Triage & Dynamic Sandbox Analysis',
            icon: '🦠',
            objectives: [
              'Safely handle suspicious files in an isolated malware analysis VM (REMnux / FlareVM).',
              'Perform static analysis: string extraction, PE header inspection with PEview/PE-bear, and entropy checks.',
              'Execute dynamic analysis inside Any.Run, VirusTotal, or Hybrid Analysis sandboxes.',
              'Observe registry modifications, C2 beaconing callbacks, and dropped child payloads.',
              'Author custom YARA rules to detect compiled malware signatures and obfuscated strings.'
            ],
            resources: [
              { type: 'lab', label: 'TryHackMe: YARA Rules for Malware Detection (Free Room)', url: 'https://tryhackme.com/room/yara' },
              { type: 'tool', label: 'Any.Run: Interactive Online Malware Sandbox', url: 'https://any.run/' },
              { type: 'tool', label: 'VirusTotal: Threat Intelligence & Hash Search', url: 'https://www.virustotal.com/' },
              { type: 'text', label: 'REMnux: Linux Toolkit for Reverse-Engineering Malware', url: 'https://remnux.org/' }
            ]
          },
          {
            id: 'def_p2m3',
            title: 'EDR Operations & Enterprise Endpoint Threat Hunting',
            icon: '🎯',
            objectives: [
              'Understand modern EDR (Endpoint Detection and Response) architectures: sensors, telemetry, and cloud engines.',
              'Write behavioral hunting queries in Microsoft Defender for Endpoint (KQL) or CrowdStrike Falcon (RTR).',
              'Detect Living-off-the-Land Binaries and Scripts (LOLBAS): certutil download, mshta execution, rundll32 proxying.',
              'Isolate compromised machines from the network while preserving live forensics evidence.',
              'Formulate proactive threat hunting hypotheses based on recent CTI reports and execute across endpoints.'
            ],
            resources: [
              { type: 'text', label: 'LOLBAS Project: Living Off The Land Binaries Reference', url: 'https://lolbas-project.github.io/' },
              { type: 'text', label: 'Microsoft Learn: Kusto Query Language (KQL) for Sentinel & Defender', url: 'https://learn.microsoft.com/en-us/azure/data-explorer/kusto/query/' },
              { type: 'lab', label: 'LetsDefend: SOC Analyst Career Path (L2 Tier)', url: 'https://letsdefend.io/' }
            ]
          },
          {
            id: 'def_p2m4',
            title: 'Vulnerability Management & Nessus Scanning',
            icon: '📋',
            objectives: [
              'Differentiate vulnerability assessment from penetration testing and threat hunting.',
              'Configure credentialed vs non-credentialed vulnerability scans in Tenable Nessus.',
              'Triage scan results: score vulnerabilities using CVSS v3.1/v4.0 and prioritize exploitable CVEs.',
              'Identify false positives in automated scans and document compensating controls.',
              'Hands-on: Complete Nessus Redux lab room on TryHackMe.'
            ],
            resources: [
              { type: 'lab', label: 'TryHackMe: Nessus Redux (Free Room)', url: 'https://tryhackme.com/room/rpnessusredux' },
              { type: 'text', label: 'NIST NVD: National Vulnerability Database CVE Search', url: 'https://nvd.nist.gov/' },
              { type: 'text', label: 'CISA: Known Exploited Vulnerabilities (KEV) Catalog', url: 'https://www.cisa.gov/known-exploited-vulnerabilities-catalog' }
            ]
          }
        ]
      },
      {
        id: 'def_p3',
        title: 'PHASE 3: DETECTION ENGINEERING & THREAT INTEL',
        subtitle: 'Advanced (5–8 Years Experience)',
        goal: 'Transition from consuming alerts to engineering detections. Author Detection-as-Code via Sigma, automate responses with SOAR playbooks, and integrate operational Cyber Threat Intelligence (CTI).',
        icon: '⚙️',
        modules: [
          {
            id: 'def_p3m1',
            title: 'Detection-as-Code & Sigma Rule Development',
            icon: '📝',
            objectives: [
              'Understand the Detection Engineering lifecycle: Threat Modeling -> Rule Authoring -> Unit Testing -> Deployment -> Tuning.',
              'Write generic detection rules using the Sigma format for cross-SIEM portability.',
              'Convert Sigma rules to Splunk SPL, Elastic DSL, and Microsoft Sentinel KQL using pySigma.',
              'Test detection rules against real attack telemetry generated by Atomic Red Team.',
              'Maintain detection rules in a Git repository with CI/CD validation pipelines.'
            ],
            resources: [
              { type: 'text', label: 'SigmaHQ: The Generic Signature Format for SIEM Systems', url: 'https://github.com/SigmaHQ/sigma' },
              { type: 'lab', label: 'Atomic Red Team: Library of Simple, Scripted Cyber Attacks', url: 'https://atomicredteam.io/' },
              { type: 'text', label: 'Splunk Security Content (Detection Repository)', url: 'https://github.com/splunk/security_content' }
            ]
          },
          {
            id: 'def_p3m2',
            title: 'SOAR Automation & Automated Playbooks',
            icon: '⚡',
            objectives: [
              'Understand Security Orchestration, Automation, and Response (SOAR) principles and alert deduplication.',
              'Build automated triage playbooks in open-source SOAR platforms (Shuffle / Tines).',
              'Automate enrichment: query VirusTotal, AbuseIPDB, and WHOIS upon alert ingestion.',
              'Automate containment: trigger firewall block rules and disable compromised Active Directory accounts via API.',
              'Evaluate Mean Time to Detect (MTTD) and Mean Time to Respond (MTTR) performance metrics.'
            ],
            resources: [
              { type: 'tool', label: 'Shuffle SOAR: Open Source Security Automation', url: 'https://shuffler.io/' },
              { type: 'text', label: 'Tines: Workflow Automation for Security Teams', url: 'https://www.tines.com/' },
              { type: 'text', label: 'CISA: Automated Threat Response Guide', url: 'https://www.cisa.gov/' }
            ]
          },
          {
            id: 'def_p3m3',
            title: 'Cyber Threat Intelligence (CTI) & MISP Operations',
            icon: '🌐',
            objectives: [
              'Differentiate Strategic, Operational, Tactical, and Technical Cyber Threat Intelligence.',
              'Master the Diamond Model of Intrusion Analysis and MITRE ATT&CK mapping.',
              'Deploy and manage a MISP (Malware Information Sharing Platform) threat intelligence instance.',
              'Ingest and correlate STIX/TAXII threat feeds into SIEM platforms.',
              'Extract indicators of compromise (IoCs) and create actionable Threat Intelligence Briefs.'
            ],
            resources: [
              { type: 'text', label: 'MISP Project: Open Source Threat Intelligence Platform', url: 'https://www.misp-project.org/' },
              { type: 'text', label: 'OpenCTI: Open Source Cyber Threat Intelligence Platform', url: 'https://www.opencti.io/' },
              { type: 'course', label: 'SANS Cyber Threat Intelligence Summit (Free Recordings)', url: 'https://www.youtube.com/@SANSInstitute' }
            ]
          },
          {
            id: 'def_p3m4',
            title: 'Advanced Forensic Triage & KAPE Artifact Analysis',
            icon: '🔍',
            objectives: [
              'Collect forensic triage packages using Eric Zimmerman KAPE (Kroll Artifact Parser and Extractor).',
              'Parse Shimcache, Amcache, and UserAssist to prove program execution by adversaries.',
              'Analyze $MFT (Master File Table) and USN Journal for anti-forensic timestamp modification detection.',
              'Investigate browser history, LNK shortcut files, and jump lists to trace attacker reconnaissance.',
              'Hands-on Lab: Investigate real-world intrusion dumps on CyberDefenders.'
            ],
            resources: [
              { type: 'text', label: 'Eric Zimmerman Tools for Digital Forensics (Free)', url: 'https://ericzimmerman.github.io/#!index.md' },
              { type: 'lab', label: 'CyberDefenders: Boss of the SOC (BOTS) Blue Team Labs', url: 'https://cyberdefenders.org/' },
              { type: 'text', label: 'SANS DFIR Poster & Cheat Sheets (Free Download)', url: 'https://www.sans.org/posters/' }
            ]
          }
        ]
      },
      {
        id: 'def_p4',
        title: 'PHASE 4: SOC LEADERSHIP & CYBER DEFENSE DIRECTING',
        subtitle: 'Expert / Pro (8+ Years Experience)',
        goal: 'Lead and scale 24/7 Security Operations Centers. Master incident command leadership, threat modeling, budget justification, team training programs, and compliance audit defense.',
        icon: '🏆',
        modules: [
          {
            id: 'def_p4m1',
            title: 'SOC Management, Metrics & Engineering Strategy',
            icon: '📈',
            objectives: [
              'Design follow-the-sun 24/7/365 Tier 1/2/3 shift rotation models and prevent analyst burnout.',
              'Track executive KPIs: Mean Time to Detect (MTTD), Mean Time to Acknowledge (MTTA), and False Positive Ratio.',
              'Conduct annual threat modeling reviews using STRIDE to identify organizational blind spots.',
              'Manage SIEM data ingestion budgets (Splunk GB/day licensing vs Snowflake/Data Lake architectures).',
              'Prepare defense documentation for external regulatory audits (PCI DSS, ISO 27001, SOC 2).'
            ],
            resources: [
              { type: 'text', label: 'MITRE: Ten Strategies of a World-Class Cybersecurity Operations Center', url: 'https://www.mitre.org/news-insights/publication/ten-strategies-world-class-cybersecurity-operations-center' },
              { type: 'course', label: 'Cisco Networking Academy: Cybersecurity Defense Analyst Path', url: 'https://www.netacad.com/' },
              { type: 'text', label: 'ISC2 CISSP Official Exam Outline & Study Guide', url: 'https://www.isc2.org/certifications/cissp' }
            ]
          },
          {
            id: 'def_p4m2',
            title: 'Major Incident Commander & Breach Communications',
            icon: '📢',
            objectives: [
              'Act as Incident Commander during active ransomware outbreaks and critical zero-day exploits.',
              'Establish out-of-band communication channels when primary enterprise infrastructure is compromised.',
              'Coordinate with corporate legal counsel, PR/communications, and executive leadership teams.',
              'Execute mandatory regulatory breach notifications within legal deadlines (e.g., GDPR 72-hour window).',
              'Lead blameless Post-Incident Reviews (PIR) and publish Root Cause Analysis (RCA) reports.'
            ],
            resources: [
              { type: 'text', label: 'NIST SP 800-61 Rev. 2: Computer Security Incident Handling Guide', url: 'https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final' },
              { type: 'text', label: 'CISA: Federal Government Cybersecurity Incident & Vulnerability Response Playbooks', url: 'https://www.cisa.gov/resources-tools/resources/federal-government-cybersecurity-incident-and-vulnerability-response-playbooks' }
            ]
          }
        ]
      }
    ],
    tools: [
      { name: 'Splunk Enterprise', cat: 'SIEM & Log Analytics', desc: 'The industry-standard platform for searching, monitoring, and analyzing machine-generated big data for security.', tags: ['SIEM', 'Logs', 'SPL'], url: 'https://www.splunk.com/' },
      { name: 'Wireshark', cat: 'Packet Analysis', desc: 'The world\'s foremost network protocol analyzer for network troubleshooting, analysis, and threat hunting.', tags: ['PCAP', 'Network', 'Triage'], url: 'https://www.wireshark.org/' },
      { name: 'Sysmon (Microsoft)', cat: 'Host Telemetry', desc: 'Windows system service and device driver that logs detailed process creations, network connections, and file changes.', tags: ['Windows', 'Sysmon', 'Endpoint'], url: 'https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon' },
      { name: 'Volatility 3', cat: 'Memory Forensics', desc: 'The world\'s most widely used memory forensics framework for incident response and malware research.', tags: ['RAM', 'Forensics', 'Malware'], url: 'https://github.com/volatilityfoundation/volatility3' },
      { name: 'YARA', cat: 'Malware Identification', desc: 'The pattern matching Swiss army knife for malware researchers to classify and identify malware samples.', tags: ['Signatures', 'Malware', 'Detection'], url: 'https://github.com/VirusTotal/yara' },
      { name: 'Sigma', cat: 'Detection as Code', desc: 'Generic and open signature format that allows you to write SIEM detection rules once and convert to any tool.', tags: ['Detection', 'SIEM', 'Rules'], url: 'https://github.com/SigmaHQ/sigma' },
      { name: 'Atomic Red Team', cat: 'Adversary Emulation', desc: 'Library of simple, scripted cyber attacks mapped directly to the MITRE ATT&CK framework to test detections.', tags: ['Testing', 'MITRE', 'Blue Team'], url: 'https://atomicredteam.io/' },
      { name: 'MISP', cat: 'Threat Intelligence', desc: 'Open source threat intelligence platform for sharing, storing, and correlating indicators of compromise (IoCs).', tags: ['CTI', 'IoCs', 'Threat Sharing'], url: 'https://www.misp-project.org/' },
      { name: 'KAPE', cat: 'Forensic Triage', desc: 'Kroll Artifact Parser and Extractor enables rapid forensic artifact acquisition and parsing in minutes.', tags: ['DFIR', 'Artifacts', 'Triage'], url: 'https://www.kroll.com/en/services/cyber-risk/incident-response-litigation-support/kroll-artifact-parser-extractor-kape' }
    ],
    certs: [
      { name: 'CompTIA Security+ (SY0-701)', provider: 'CompTIA', level: 'entry', timing: 'Phase 1 — Foundations', cost: '~$392 USD', desc: 'Entry-level security gold standard covering core defensive concepts, threats, and cryptography.', url: 'https://www.comptia.org/certifications/security', examUrl: 'https://www.comptia.org/certifications/security#examdetails' },
      { name: 'ISC2 Certified in Cybersecurity (CC)', provider: 'ISC²', level: 'entry', timing: 'Phase 1 — Free Promo', cost: '100% FREE (1M Campaign)', desc: 'Official foundational certification from ISC² with free course and 100% free exam voucher.', url: 'https://www.isc2.org/certifications/cc', examUrl: 'https://www.isc2.org/certifications/cc' },
      { name: 'CompTIA CySA+ (Cybersecurity Analyst)', provider: 'CompTIA', level: 'associate', timing: 'Phase 2 — Intermediate', cost: '~$404 USD', desc: 'Applies behavioral analytics to networks and devices to prevent, detect, and combat cybersecurity threats.', url: 'https://www.comptia.org/certifications/cybersecurity-analyst', examUrl: 'https://www.comptia.org/certifications/cybersecurity-analyst' },
      { name: 'Blue Team Level 1 (BTL1)', provider: 'Security Blue Team', level: 'associate', timing: 'Phase 2 — Hands-On Exam', cost: '~$499 USD', desc: '24-hour practical incident response exam covering Phishing, SIEM, Forensics, and Threat Intel.', url: 'https://www.securityblue.team/why-btl1', examUrl: 'https://www.securityblue.team/' },
      { name: 'GIAC Certified Incident Handler (GCIH)', provider: 'GIAC / SANS', level: 'professional', timing: 'Phase 3 — Advanced', cost: '~$979+ USD', desc: 'Premier incident handling and response credential validating defense against common attacker techniques.', url: 'https://www.giac.org/certifications/certified-incident-handler-gcih/', examUrl: 'https://www.giac.org/' },
      { name: 'CISSP', provider: 'ISC²', level: 'expert', timing: 'Phase 4 — Leadership', cost: '~$749 USD', desc: 'The most globally respected executive security certification required for SOC Directors and CISOs.', url: 'https://www.isc2.org/certifications/cissp', examUrl: 'https://www.isc2.org/certifications/cissp' }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. OFFENSIVE SECURITY & PENETRATION TESTING (RED TEAM)
  // ─────────────────────────────────────────────────────────────────────────
  OFFENSIVE: {
    id: 'OFFENSIVE',
    name: 'Offensive Security & Penetration Testing',
    shortName: 'Red Team / Pentest',
    badge: 'Breaker Track',
    icon: '⚔️',
    color: '#dc2626',
    tagline: 'Think like an adversary. Master web exploitation, network pivoting, Active Directory dominance, privilege escalation, and custom exploit development.',
    targetRoles: ['Junior Penetration Tester', 'Web/API Pentester', 'Red Team Operator', 'Exploit Developer', 'Red Team Lead'],
    summary: 'The ultimate path for security breakers. Master PortSwigger Web Security Academy labs, conquer Hack The Box and TryHackMe machines, attack Active Directory domain environments, and write custom exploit shellcode.',
    phases: [
      {
        id: 'off_p1',
        title: 'PHASE 1: ETHICAL HACKING & WEB FUNDAMENTALS',
        subtitle: 'Beginner (0–2 Years Experience)',
        goal: 'Build the offensive foundation. Master Linux command line exploitation, active/passive reconnaissance with Nmap, and core web application vulnerabilities from the OWASP Top 10.',
        icon: '🎯',
        modules: [
          {
            id: 'off_p1m1',
            title: 'Reconnaissance, Port Scanning & Enumeration',
            icon: '🗺️',
            objectives: [
              'Perform passive reconnaissance using OSINT: Shodan, Censys, WHOIS, and Google dorking.',
              'Execute targeted active scans with Nmap: SYN scans (-sS), version detection (-sV), and default scripts (-sC).',
              'Identify open ports, banners, underlying operating systems, and firewall configurations.',
              'Enumerate web directories and virtual hosts using gobuster, ffuf, and feroxbuster.',
              'Hands-on Lab: Complete Vulnversity room on TryHackMe.'
            ],
            resources: [
              { type: 'lab', label: 'TryHackMe: Vulnversity — Active Recon & Privesc (Free)', url: 'https://tryhackme.com/room/vulnversity' },
              { type: 'Ytvideo', label: 'NetworkChuck: You need to learn NMAP right now (Free Guide)', url: 'https://www.youtube.com/watch?v=4t4kBkMsDbQ' },
              { type: 'text', label: 'Nmap Official Reference Guide & NSE Scripts', url: 'https://nmap.org/book/man.html' },
              { type: 'lab', label: 'TryHackMe: Pickle Rick — Linux Enumeration (Free)', url: 'https://tryhackme.com/room/picklerick' }
            ]
          },
          {
            id: 'off_p1m2',
            title: 'Web Application Pentesting & PortSwigger Academy',
            icon: '🔓',
            objectives: [
              'Set up Burp Suite Community edition as an intercepting HTTP/HTTPS proxy.',
              'Exploit SQL Injection (SQLi): in-band, error-based, UNION-based, and blind time-based attacks.',
              'Discover and exploit Cross-Site Scripting (XSS): Stored, Reflected, and DOM-based.',
              'Test for Insecure Direct Object References (IDOR) and broken authorization controls.',
              'Practice: Complete 15 beginner apprentice labs on PortSwigger Web Security Academy.'
            ],
            resources: [
              { type: 'lab', label: 'PortSwigger Web Security Academy (100% Free Complete Labs)', url: 'https://portswigger.net/web-security' },
              { type: 'lab', label: 'TryHackMe: OWASP Juice Shop (Free Room)', url: 'https://tryhackme.com/room/owaspjuiceshop' },
              { type: 'Ytvideo', label: 'TCM Security: Practical Web Hacking Tutorials', url: 'https://www.youtube.com/@TCMSecurityAcademy' },
              { type: 'text', label: 'OWASP Top 10 Web Application Security Risks', url: 'https://owasp.org/www-project-top-10/' }
            ]
          },
          {
            id: 'off_p1m3',
            title: 'Network Exploitation & Vulnerability Weaponization',
            icon: '💣',
            objectives: [
              'Search for verified exploit code using searchsploit and the Exploit-DB archive.',
              'Configure and execute remote exploits in Metasploit Framework (msfconsole).',
              'Exploit legacy SMB vulnerabilities: EternalBlue (MS17-010) on unpatched Windows.',
              'Perform online credential brute-forcing against SSH and FTP services using Hydra.',
              'Complete: Blue and Hydra rooms on TryHackMe.'
            ],
            resources: [
              { type: 'lab', label: 'TryHackMe: Blue — EternalBlue MS17-010 (Free Room)', url: 'https://tryhackme.com/room/blue' },
              { type: 'lab', label: 'TryHackMe: Hydra Password Cracking (Free Room)', url: 'https://tryhackme.com/room/hydra' },
              { type: 'lab', label: 'TryHackMe: Ignite — CMS Exploitation (Free Room)', url: 'https://tryhackme.com/room/ignite' },
              { type: 'text', label: 'Exploit Database: Verified Exploits & Shellcodes', url: 'https://www.exploit-db.com/' }
            ]
          },
          {
            id: 'off_p1m4',
            title: 'Linux & Windows Privilege Escalation Basics',
            icon: '🪜',
            objectives: [
              'Run automated audit scripts: LinPEAS for Linux and WinPEAS for Windows.',
              'Exploit Linux SUID binaries (GTFOBins) and writable /etc/passwd files.',
              'Abuse sudo privileges without password requirements (sudo -l).',
              'Identify unquoted service paths and weak service permissions on Windows.',
              'Spawn fully interactive TTY reverse shells using python, stty, and netcat.'
            ],
            resources: [
              { type: 'text', label: 'GTFOBins: Curated List of Unix Binaries for Privesc', url: 'https://gtfobins.github.io/' },
              { type: 'text', label: 'LOLBAS: Windows Binaries for Defense Evasion & Privesc', url: 'https://lolbas-project.github.io/' },
              { type: 'tool', label: 'PEASS-ng: Privilege Escalation Awesome Scripts Suite', url: 'https://github.com/peass-ng/PEASS-ng' },
              { type: 'lab', label: 'Hack The Box: Starting Point (Tier 0 to Tier 2 Free Labs)', url: 'https://app.hackthebox.com/starting-point' }
            ]
          }
        ]
      },
      {
        id: 'off_p2',
        title: 'PHASE 2: ACTIVE DIRECTORY & NETWORK PIVOTING',
        subtitle: 'Intermediate (2–5 Years Experience)',
        goal: 'Conquer enterprise domain environments. Master Active Directory reconnaissance with BloodHound, execute Kerberos attacks, pivot across subnets, and prepare for the OSCP.',
        icon: '🏰',
        modules: [
          {
            id: 'off_p2m1',
            title: 'Active Directory Enumeration & BloodHound Mapping',
            icon: '🩸',
            objectives: [
              'Collect AD domain objects using BloodHound / SharpHound ingestors.',
              'Analyze attack paths leading to Domain Admin using BloodHound graph queries.',
              'Enumerate domain users, groups, computer accounts, and SPNs with PowerView / AD Module.',
              'Identify misconfigured Access Control Lists (ACLs) allowing GenericAll or WriteDacl.',
              'Extract plaintext passwords and hashes from SYSVOL Group Policy Preferences.'
            ],
            resources: [
              { type: 'text', label: 'BloodHound: Six Degrees of Domain Admin Documentation', url: 'https://bloodhound.readthedocs.io/' },
              { type: 'text', label: 'HackTricks: Active Directory Pentesting Methodology', url: 'https://book.hacktricks.xyz/windows-hardening/active-directory-methodology' },
              { type: 'Ytvideo', label: 'IppSec: Hack The Box Active Directory Machine Walkthroughs', url: 'https://www.youtube.com/@ippsec' }
            ]
          },
          {
            id: 'off_p2m2',
            title: 'Kerberos Attacks: Kerberoasting & AS-REP Roasting',
            icon: '🔑',
            objectives: [
              'Request Kerberos TGS tickets for accounts with Service Principal Names (SPNs).',
              'Crack service ticket password hashes offline using Hashcat with rockyou.txt dictionary.',
              'Identify user accounts without Kerberos Pre-Authentication enabled (AS-REP Roasting).',
              'Perform DCSync attacks using Mimikatz to dump NTDS.dit password hashes from Domain Controllers.',
              'Forge Golden and Silver Kerberos Tickets to maintain domain persistence.'
            ],
            resources: [
              { type: 'text', label: 'Impacket Suite: Python Network Protocol Tools (GetNPUsers, GetUserSPNs)', url: 'https://github.com/fortra/impacket' },
              { type: 'text', label: 'Mimikatz: A Little Tool to Play with Windows Security', url: 'https://github.com/gentilkiwi/mimikatz' },
              { type: 'lab', label: 'Hack The Box: Active Directory Machines & Labs', url: 'https://www.hackthebox.com/' }
            ]
          },
          {
            id: 'off_p2m3',
            title: 'Network Pivoting, Port Forwarding & Tunneling',
            icon: '🔀',
            objectives: [
              'Create SSH local, remote, and dynamic SOCKS5 tunnels to bypass network boundaries.',
              'Pivot into internal private subnets using Chisel, Ligolo-ng, and Proxychains.',
              'Route multi-hop Metasploit sessions through compromised pivot machines.',
              'Port forward internal database ports (e.g. 1433 MSSQL, 3306 MySQL) to your local attack box.',
              'Practice: Setup a 2-network virtual lab and execute a multi-hop lateral movement pivot.'
            ],
            resources: [
              { type: 'tool', label: 'Ligolo-ng: An Advanced, Yet Simple Pivoting Tool', url: 'https://github.com/nicocha30/ligolo-ng' },
              { type: 'tool', label: 'Chisel: A Fast TCP/UDP Tunnel Over HTTP', url: 'https://github.com/jpillora/chisel' },
              { type: 'text', label: 'IppSec: Pivoting & Port Forwarding Guide', url: 'https://www.youtube.com/@ippsec' }
            ]
          },
          {
            id: 'off_p2m4',
            title: 'Modern Web & API Pentesting (JWT, SSRF, Deserialization)',
            icon: '🌐',
            objectives: [
              'Exploit Server-Side Request Forgery (SSRF) to read internal AWS/Azure metadata services.',
              'Attack JSON Web Tokens (JWT): none algorithm, weak HMAC secret cracking, and header injection.',
              'Exploit Insecure Deserialization in Java, Python (pickle), and PHP applications.',
              'Perform GraphQL enumeration, introspection querying, and batching attacks.',
              'Complete: PortSwigger Web Security Academy Practitioner Tier Labs.'
            ],
            resources: [
              { type: 'lab', label: 'PortSwigger Academy: SSRF, JWT & Deserialization Labs (Free)', url: 'https://portswigger.net/web-security' },
              { type: 'tool', label: 'jwt_tool: Toolkit for Validating, Testing, and Cracking JWTs', url: 'https://github.com/ticarpi/jwt_tool' },
              { type: 'text', label: 'PayloadsAllTheThings: Web Application Pentesting Payloads', url: 'https://github.com/swisskyrepo/PayloadsAllTheThings' }
            ]
          }
        ]
      },
      {
        id: 'off_p3',
        title: 'PHASE 3: RED TEAM OPERATIONS & EVASION',
        subtitle: 'Advanced (5–8 Years Experience)',
        goal: 'Move from penetration testing to adversary emulation. Deploy Command & Control (C2) infrastructure, bypass endpoint detection (EDR), and develop custom exploit payloads.',
        icon: '🕵️',
        modules: [
          {
            id: 'off_p3m1',
            title: 'C2 Infrastructure & Red Team Operations (Sliver / Havoc)',
            icon: '📡',
            objectives: [
              'Deploy multi-tier Command and Control (C2) infrastructure using Sliver or Havoc framework.',
              'Configure redirectors, Apache mod_rewrite rules, and domain fronting for operational security (OpSec).',
              'Implement encrypted C2 communication profiles over HTTPS, DNS tunneling, and mTLS.',
              'Execute post-exploitation staging: credential dumping, keylogging, and screen capture.',
              'Maintain persistence using COM hijacking, WMI event subscriptions, and service DLL hijacking.'
            ],
            resources: [
              { type: 'tool', label: 'Sliver C2: Open Source Cross-Platform Adversary Emulation Framework', url: 'https://github.com/BishopFox/sliver' },
              { type: 'tool', label: 'Havoc: Modern Post-Exploitation Command and Control Framework', url: 'https://github.com/HavocFramework/Havoc' },
              { type: 'text', label: 'Red Team Ops Guide: Infrastructure Automation & OpSec', url: 'https://github.com/bluscreenofjeff/Red-Team-Infrastructure-Wiki' }
            ]
          },
          {
            id: 'off_p3m2',
            title: 'AV/EDR Evasion & Shellcode Loader Engineering',
            icon: '🛡️',
            objectives: [
              'Understand EDR telemetry mechanisms: user-mode API hooking and kernel ETW (Event Tracing for Windows).',
              'Write custom C/C++ shellcode loaders with XOR/AES encryption to defeat static signatures.',
              'Implement Direct System Calls (Syswhispers3) to bypass user-mode NTDLL API hooks.',
              'Execute process injection techniques: Process Hollowing, Early Bird APC injection, and Thread Hijacking.',
              'Unload or patch AMSI (Antimalware Scan Interface) in memory before executing scripts.'
            ],
            resources: [
              { type: 'text', label: 'SysWhispers3: Direct System Calls for EDR Evasion', url: 'https://github.com/klezVirus/SysWhispers3' },
              { type: 'text', label: '0x00sec: Modern Binary Exploitation & Evasion Articles', url: 'https://0x00sec.org/' },
              { type: 'text', label: 'Sektor7: Malware Development & Evasion Research', url: 'https://institute.sektor7.net/' }
            ]
          }
        ]
      },
      {
        id: 'off_p4',
        title: 'PHASE 4: EXPLOIT DEVELOPMENT & ADVERSARY EMULATION',
        subtitle: 'Expert / Pro (8+ Years Experience)',
        goal: 'Lead full-scale red team exercises against Fortune 500 enterprises. Engineer zero-day exploits, emulate nation-state APT actors, and brief C-suite executives on strategic defense improvements.',
        icon: '👑',
        modules: [
          {
            id: 'off_p4m1',
            title: 'Binary Exploitation & Buffer Overflow Engineering',
            icon: '💻',
            objectives: [
              'Disassemble binaries in IDA Pro, Ghidra, and x64dbg.',
              'Exploit 32-bit and 64-bit stack-based buffer overflows on Windows and Linux.',
              'Defeat modern memory protections: Return-Oriented Programming (ROP chains) to bypass DEP/NX.',
              'Bypass Address Space Layout Randomization (ASLR) using information leaks.',
              'Author reliable custom exploit scripts using Python and pwntools.'
            ],
            resources: [
              { type: 'text', label: 'Corelan Team: Exploit Writing Tutorials (The Gold Standard)', url: 'https://www.corelan.be/index.php/articles/' },
              { type: 'tool', label: 'pwntools: CTF Framework & Exploit Development Library', url: 'https://github.com/Gallopsled/pwntools' },
              { type: 'tool', label: 'Ghidra: NSA Software Reverse Engineering Framework', url: 'https://ghidra-sre.org/' }
            ]
          },
          {
            id: 'off_p4m2',
            title: 'Red Team Campaign Leadership & Executive Reporting',
            icon: '📑',
            objectives: [
              'Draft formal Rules of Engagement (RoE) and safety protocols for enterprise adversary emulation.',
              'Plan end-to-end campaigns aligned with real threat actors (e.g. FIN7, APT29) using MITRE ATT&CK.',
              'Lead "Purple Team" collaboration workshops alongside SOC defenders to evaluate detection coverage.',
              'Translate technical vulnerabilities into quantified financial and operational business risk metrics.',
              'Deliver executive presentations to the Board of Directors and Chief Information Security Officer.'
            ],
            resources: [
              { type: 'text', label: 'MITRE ATT&CK: Adversary Emulation Plans', url: 'https://attack.mitre.org/resources/adversary-emulation-plans/' },
              { type: 'text', label: 'SANS SEC564: Red Team Operations and Adversary Emulation', url: 'https://www.sans.org/cyber-security-courses/red-team-operations-adversary-emulation/' }
            ]
          }
        ]
      }
    ],
    tools: [
      { name: 'Kali Linux', cat: 'Operating System', desc: 'Debian-derived Linux distribution designed for digital forensics and penetration testing with 600+ pre-installed tools.', tags: ['Linux', 'Distro', 'Pentesting'], url: 'https://www.kali.org/' },
      { name: 'Burp Suite Community', cat: 'Web Proxy & Scanner', desc: 'The leading web application security testing tool for request interception, replay, and vulnerability detection.', tags: ['Web', 'Proxy', 'HTTP'], url: 'https://portswigger.net/burp' },
      { name: 'Nmap', cat: 'Network Scanner', desc: 'Network mapper used to discover hosts and services on a computer network, creating a network map with OS detection.', tags: ['Network', 'Scanning', 'Recon'], url: 'https://nmap.org/' },
      { name: 'Metasploit Framework', cat: 'Exploitation Engine', desc: 'World’s most used penetration testing framework providing information about vulnerabilities and aiding in IDS testing.', tags: ['Exploits', 'Post-Exploitation', 'Framework'], url: 'https://www.metasploit.com/' },
      { name: 'BloodHound', cat: 'Active Directory Graph', desc: 'Single-page JavaScript web application using graph theory to reveal the hidden and unintended relationships within AD.', tags: ['Active Directory', 'Graph', 'Privesc'], url: 'https://github.com/BloodHoundAD/BloodHound' },
      { name: 'ffuf', cat: 'Web Fuzzing', desc: 'Extremely fast web fuzzer written in Go for discovering hidden directories, files, vhosts, and parameters.', tags: ['Fuzzing', 'Go', 'Recon'], url: 'https://github.com/ffuf/ffuf' },
      { name: 'Hashcat', cat: 'Password Recovery', desc: 'World\'s fastest and most advanced password recovery utility, supporting five unique modes of attack for over 300 hashes.', tags: ['Cracking', 'Hashes', 'GPU'], url: 'https://hashcat.net/hashcat/' },
      { name: 'Impacket', cat: 'Network Protocols', desc: 'Collection of Python classes for working with network protocols (SMB, Kerberos, WMI, MSRPC) for offensive testing.', tags: ['Python', 'Kerberos', 'SMB'], url: 'https://github.com/fortra/impacket' },
      { name: 'Sliver C2', cat: 'Adversary Emulation', desc: 'Open-source cross-platform adversary emulation and red team framework supporting dynamic code injection and mTLS.', tags: ['C2', 'Red Team', 'Payloads'], url: 'https://github.com/BishopFox/sliver' }
    ],
    certs: [
      { name: 'CompTIA PenTest+', provider: 'CompTIA', level: 'entry', timing: 'Phase 1 — Foundations', cost: '~$404 USD', desc: 'Validates cybersecurity skills covering planning, scoping, and performing penetration testing assignments.', url: 'https://www.comptia.org/certifications/pentest', examUrl: 'https://www.comptia.org/certifications/pentest' },
      { name: 'Practical Junior Penetration Tester (PJPT)', provider: 'TCM Security', level: 'entry', timing: 'Phase 1 — Practical', cost: '~$249 USD', desc: 'Hands-on practical internal network pentesting exam assessing real Active Directory exploitation skills.', url: 'https://certifications.tcm-sec.com/pjpt/', examUrl: 'https://tcm-sec.com/' },
      { name: 'OSCP (OffSec Certified Professional)', provider: 'OffSec', level: 'professional', timing: 'Phase 2 — Gold Standard', cost: '~$1,649 USD', desc: '24-hour hands-on practical exam that defined the modern penetration testing industry standard.', url: 'https://www.offsec.com/courses/pen-200/', examUrl: 'https://www.offsec.com/courses/pen-200/' },
      { name: 'Practical Network Penetration Tester (PNPT)', provider: 'TCM Security', level: 'professional', timing: 'Phase 2 — Alternative', cost: '~$499 USD', desc: '5-day practical assessment that simulates a real-world external, internal, and OSINT penetration test.', url: 'https://certifications.tcm-sec.com/pnpt/', examUrl: 'https://tcm-sec.com/' },
      { name: 'OSWE (OffSec Web Expert)', provider: 'OffSec', level: 'advanced', timing: 'Phase 3 — Web Mastery', cost: '~$1,649 USD', desc: 'Advanced web application security and white-box source code auditing practical certification.', url: 'https://www.offsec.com/courses/web-300/', examUrl: 'https://www.offsec.com/courses/web-300/' },
      { name: 'OSEP (OffSec Experienced Pentester)', provider: 'OffSec', level: 'expert', timing: 'Phase 4 — Red Teaming', cost: '~$1,649 USD', desc: 'Advanced adversary emulation, defense evasion, and custom malware development practical exam.', url: 'https://www.offsec.com/courses/pen-300/', examUrl: 'https://www.offsec.com/courses/pen-300/' }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. SECURITY ENGINEERING & ARCHITECTURE (DEVSECOPS)
  // ─────────────────────────────────────────────────────────────────────────
  ENGINEERING: {
    id: 'ENGINEERING',
    name: 'Security Engineering & Architecture',
    shortName: 'DevSecOps & Cloud',
    badge: 'Builder Track',
    icon: '🛡️',
    color: '#4f46e5',
    tagline: 'Engineer hardened cloud infrastructure, implement shift-left DevSecOps pipelines, secure Kubernetes clusters, and design Zero Trust architectures.',
    targetRoles: ['Cloud Security Engineer', 'DevSecOps Engineer', 'Security Architect', 'Infrastructure Security Engineer', 'Chief Security Architect'],
    summary: 'The builder path for cloud engineers. Master Linux, Python, AWS/Azure architectures, Terraform Infrastructure-as-Code hardening, Docker/Kubernetes container security, CI/CD automated vulnerability scanning, and enterprise Zero Trust.',
    phases: [
      {
        id: 'eng_p1',
        title: 'PHASE 1: BEDROCK & AUTOMATION FOUNDATIONS',
        subtitle: 'Beginner (0–2 Years Experience)',
        goal: 'Master how operating systems and networks communicate, and learn to automate security checks with code. Zero console clicking — everything is automated and code-driven.',
        icon: '🌐',
        modules: [
          {
            id: 'eng_p1m1',
            title: 'Computer Networking & Traffic Engineering',
            icon: '📡',
            objectives: [
              'Master CIDR blocks, subnets, public vs. private IP spaces, and routing protocols.',
              'Understand the OSI 7-layer model and TCP/IP 4-layer stack thoroughly.',
              'Study application-layer protocols: DNS, HTTP/HTTPS, SSH, TLS 1.3, SMTP, and SFTP.',
              'Master TCP handshakes, flags, connection states, and packet analysis with Wireshark.',
              'Understand NAT, PAT, VLAN, and network segmentation concepts.'
            ],
            resources: [
              { type: 'Ytvideo', label: 'Professor Messer: Network+ N10-009 Full Free Course', url: 'https://www.youtube.com/playlist?list=PLG49S3nxzAnl_tQe3kvnmeMid0mjF8Le8' },
              { type: 'Ytvideo', label: 'NetworkChuck: Free CCNA Course & TCP/IP Deep Dive', url: 'https://www.youtube.com/playlist?list=PLIhvC56v63IJVXv0GJcl9vO5Z6znCVb1P' },
              { type: 'text', label: 'Cisco Networking Academy: Free Packet Tracer & Courses', url: 'https://www.netacad.com/' },
              { type: 'lab', label: 'CyBOK: The Cyber Security Body of Knowledge (Free Booklets)', url: 'https://www.cybok.org/' }
            ]
          },
          {
            id: 'eng_p1m2',
            title: 'Linux Systems Administration & CLI Mastery',
            icon: '🐧',
            objectives: [
              'Force yourself to operate headless Ubuntu/Debian/Fedora Server environments without a GUI.',
              'Master directory hierarchies (/etc, /var, /proc, /sys) and Linux process trees.',
              'Understand permission models: chmod, chown, ACLs, SUID/SGID, sticky bit, and umask.',
              'Configure hardened SSH key-pair authentication (ED25519) and disable root login.',
              'Write bash automation scripts utilizing pipes, awk, sed, grep, and cron jobs.'
            ],
            resources: [
              { type: 'course', label: 'Linux Foundation LFD121: Developing Secure Software (Free Certificate)', url: 'https://training.linuxfoundation.org/training/developing-secure-software-lfd121/' },
              { type: 'text', label: 'The Linux Command Line by William Shotts (Free Online Book)', url: 'https://linuxcommand.org/tlcl.php' },
              { type: 'lab', label: 'OverTheWire: Bandit — Linux Wargame', url: 'https://overthewire.org/wargames/bandit/' },
              { type: 'lab', label: 'TryHackMe: Linux Fundamentals Path (Free)', url: 'https://tryhackme.com/module/linux-fundamentals' }
            ]
          },
          {
            id: 'eng_p1m3',
            title: 'Python Automation & DevSecOps Scripting',
            icon: '🐍',
            objectives: [
              'Write security-focused Python scripts utilizing requests, subprocess, socket, and json.',
              'Interact with cloud APIs using the AWS Boto3 SDK to audit open S3 buckets and IAM policies.',
              'Parse security scan results (JSON/XML) and automate vulnerability threshold alerts.',
              'Implement secure coding practices and audit third-party dependencies using pip-audit.',
              'Build a GitHub Actions workflow that executes automated Python unit tests on pull requests.'
            ],
            resources: [
              { type: 'text', label: 'Automate the Boring Stuff with Python (Free Online Book)', url: 'https://automatetheboringstuff.com/' },
              { type: 'Ytvideo', label: 'Abhishek Veeramalla: Python for DevOps / DevSecOps Engineers', url: 'https://www.youtube.com/@AbhishekVeeramalla' },
              { type: 'text', label: 'DevSecOps Playbook & Roadmap on GitHub', url: 'https://roadmap.sh/devsecops' }
            ]
          },
          {
            id: 'eng_p1m4',
            title: 'Foundational Security Principles & CompTIA Security+',
            icon: '🏆',
            objectives: [
              'Master the CIA Triad, AAA frameworks, Defense-in-Depth, and Zero Trust Architecture.',
              'Understand symmetric (AES) vs asymmetric (RSA, ECC) cryptography and digital signatures.',
              'Analyze threat categories: social engineering, malware, web attacks, and supply chain threats.',
              'Review governance fundamentals: risk management, vulnerability prioritization, and compliance standards.',
              'Study with Professor Messer SY0-701 playlist and complete practice exams.'
            ],
            resources: [
              { type: 'Ytvideo', label: 'Professor Messer: Security+ SY0-701 FREE Full Video Series', url: 'https://www.youtube.com/playlist?list=PLG4bLrCdtbH6-E2LYy76K9XO82LMt0a1y' },
              { type: 'course', label: 'ISC2 Certified in Cybersecurity (Free CC Training & Voucher)', url: 'https://www.isc2.org/certifications/cc' },
              { type: 'text', label: 'CompTIA Security+ SY0-701 Exam Objectives (PDF)', url: 'https://www.comptia.org/certifications/security' }
            ]
          }
        ]
      },
      {
        id: 'eng_p2',
        title: 'PHASE 2: CLOUD ARCHITECTURE & INFRASTRUCTURE AS CODE',
        subtitle: 'Intermediate (2–5 Years Experience)',
        goal: 'You cannot protect what you do not understand. Master AWS cloud architecture, write secure Terraform modules, and secure Docker containers and Kubernetes clusters.',
        icon: '☁️',
        modules: [
          {
            id: 'eng_p2m1',
            title: 'Core AWS Infrastructure & Solutions Architecture',
            icon: '⚡',
            objectives: [
              'Design secure multi-tier Virtual Private Clouds (VPC): public/private subnets, NAT Gateways, Security Groups, and NACLs.',
              'Deploy compute workloads: hardened EC2 AMIs, Auto Scaling Groups, and serverless Lambda functions.',
              'Implement secure object storage in Amazon S3: bucket policies, KMS encryption, Block Public Access, and versioning.',
              'Configure central identity: AWS Organizations, Service Control Policies (SCPs), and AWS IAM Identity Center (SSO).',
              'Prepare for and sit the AWS Solutions Architect Associate (SAA-C03) exam.'
            ],
            resources: [
              { type: 'course', label: 'AWS Skill Builder: 600+ Free Cloud Courses', url: 'https://explore.skillbuilder.aws/' },
              { type: 'Ytvideo', label: 'Abhishek Veeramalla: AWS Zero to Hero Playlist', url: 'https://www.youtube.com/playlist?list=PLdpzxOOAlwvLNOxX0RfndiYSt1Le9azze' },
              { type: 'lab', label: 'AWS Free Tier — 12 Months Hands-on Cloud Practice', url: 'https://aws.amazon.com/free/' },
              { type: 'text', label: 'AWS Well-Architected Framework: Security Pillar Whitepaper', url: 'https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html' }
            ]
          },
          {
            id: 'eng_p2m2',
            title: 'Infrastructure as Code (Terraform) Security',
            icon: '🏗️',
            objectives: [
              'Author modular, reusable infrastructure components using Terraform HCL syntax.',
              'Manage Terraform remote state securely: Amazon S3 backend with DynamoDB state locking and SSE-KMS.',
              'Prevent configuration drift and enforce least privilege in provisioned cloud IAM roles.',
              'Integrate static IaC security scanners (Checkov / tfsec / trivy) into pre-commit hooks.',
              'Hands-on Project: Deploy a production-grade hardened AWS VPC using Terraform modules.'
            ],
            resources: [
              { type: 'Ytvideo', label: 'TechWorld with Nana: Terraform Full Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=l5ob4z6-d5s' },
              { type: 'tool', label: 'Checkov: Static Code Analysis for Infrastructure-as-Code', url: 'https://github.com/bridgecrewio/checkov' },
              { type: 'text', label: 'HashiCorp Terraform Documentation & Tutorials', url: 'https://developer.hashicorp.com/terraform/tutorials' },
              { type: 'text', label: 'GitHub: DevSecOps Engineering Guide (jeremybaraka-dev)', url: 'https://github.com/jeremybaraka-dev/devsecops-engineering-guide' }
            ]
          },
          {
            id: 'eng_p2m3',
            title: 'Containerization & Kubernetes Hardening',
            icon: '🐳',
            objectives: [
              'Write secure multi-stage Dockerfiles: execute as non-root user and use minimal distroless base images.',
              'Scan container images for known vulnerabilities using Trivy before pushing to registries (ECR).',
              'Understand Kubernetes core primitives: Pods, Deployments, Services, ConfigMaps, and Secrets.',
              'Implement Kubernetes Role-Based Access Control (RBAC) and restrictive NetworkPolicies.',
              'Deploy runtime security enforcement using CNCF Falco to alert on anomalous container syscalls.'
            ],
            resources: [
              { type: 'Ytvideo', label: 'TechWorld with Nana: Docker & Kubernetes Full Course', url: 'https://www.youtube.com/watch?v=3c-iBn73dDE' },
              { type: 'tool', label: 'Trivy: Comprehensive Vulnerability Scanner for Containers & IaC', url: 'https://github.com/aquasecurity/trivy' },
              { type: 'tool', label: 'Falco: Cloud Native Runtime Security & Threat Detection', url: 'https://falco.org/' },
              { type: 'lab', label: 'Play with Kubernetes: Free In-Browser Multi-Node Clusters', url: 'https://labs.play-with-k8s.com/' }
            ]
          },
          {
            id: 'eng_p2m4',
            title: 'DevSecOps CI/CD Pipeline Automation',
            icon: '🔄',
            objectives: [
              'Implement "Shift Left" security principles across the software development lifecycle (SDLC).',
              'Integrate secret detection (Gitleaks / TruffleHog) to block committed API keys and credentials.',
              'Implement automated SAST (Static Application Security Testing) using Semgrep in GitHub Actions.',
              'Automate DAST (Dynamic Application Security Testing) runs using OWASP ZAP in staging environments.',
              'Hands-on Project: Build an end-to-end GitHub Actions pipeline with automated security gating.'
            ],
            resources: [
              { type: 'text', label: 'DevSecOps Zero to Hero GitHub Repo (Abhishek Veeramalla)', url: 'https://github.com/iam-veeramalla/DevSecOps-Zero-to-Hero' },
              { type: 'tool', label: 'Semgrep: Lightweight Static Analysis for 30+ Languages', url: 'https://semgrep.dev/' },
              { type: 'tool', label: 'Gitleaks: Protect and Discover Secrets in Source Code', url: 'https://github.com/gitleaks/gitleaks' },
              { type: 'text', label: 'OWASP DevSecOps Guideline', url: 'https://owasp.org/www-project-devsecops-guideline/' }
            ]
          }
        ]
      },
      {
        id: 'eng_p3',
        title: 'PHASE 3: ENTERPRISE CLOUD DEFENSE & CSPM',
        subtitle: 'Advanced (5–8 Years Experience)',
        goal: 'Secure enterprise-scale multi-account cloud environments. Deploy Cloud Security Posture Management (CSPM), implement Cloud Incident Response, and master Zero Trust.',
        icon: '🛡️',
        modules: [
          {
            id: 'eng_p3m1',
            title: 'Cloud Identity, Access & IAM Privilege Escalation',
            icon: '🔑',
            objectives: [
              'Audit IAM policies against the Principle of Least Privilege using IAM Access Analyzer.',
              'Differentiate identity-based, resource-based, and Service Control Policies (SCPs).',
              'Identify and remediate the 21 known AWS IAM privilege escalation methods.',
              'Implement short-lived temporary credentials with AWS STS AssumeRole and OIDC federation.',
              'Hands-on: Solve Wiz Big IAM Challenge and CloudGoat scenarios.'
            ],
            resources: [
              { type: 'lab', label: 'Wiz: The Big IAM Challenge (Free AWS IAM CTF)', url: 'https://bigiamchallenge.com/' },
              { type: 'lab', label: 'CloudGoat: Vulnerable-by-Design AWS Deployment Tool', url: 'https://github.com/RhinoSecurityLabs/cloudgoat' },
              { type: 'text', label: 'Rhino Security: AWS IAM Privilege Escalation Methods', url: 'https://rhinosecuritylabs.com/aws/aws-privilege-escalation-methods-mitigation/' }
            ]
          },
          {
            id: 'eng_p3m2',
            title: 'Cloud Posture Management & Prowler Assessments',
            icon: '📊',
            objectives: [
              'Execute automated compliance scans across AWS, Azure, and GCP using Prowler.',
              'Map cloud misconfigurations against CIS Benchmarks, NIST CSF, and GDPR controls.',
              'Implement auto-remediation playbooks using AWS EventBridge and Lambda functions.',
              'Centralize multi-account findings in AWS Security Hub and Amazon GuardDuty.',
              'Generate executive compliance audit reports from automated scanner outputs.'
            ],
            resources: [
              { type: 'tool', label: 'Prowler: Open-Source Cloud Security Posture Management (CSPM)', url: 'https://github.com/prowler-cloud/prowler' },
              { type: 'tool', label: 'ScoutSuite: Multi-Cloud Security Auditing Tool', url: 'https://github.com/nccgroup/ScoutSuite' },
              { type: 'text', label: 'CIS Benchmarks: Hardening Guides for Cloud & OS', url: 'https://www.cisecurity.org/cis-benchmarks/' }
            ]
          }
        ]
      },
      {
        id: 'eng_p4',
        title: 'PHASE 4: ENTERPRISE ARCHITECTURE & EXECUTIVE LEADERSHIP',
        subtitle: 'Expert / Pro (8+ Years Experience)',
        goal: 'Lead enterprise security engineering initiatives. Architect Zero Trust frameworks, direct secure product lifecycles, and achieve top tier credentials (AWS Security Specialty, CCSP, CISSP).',
        icon: '🚀',
        modules: [
          {
            id: 'eng_p4m1',
            title: 'Enterprise Zero Trust & SABSA Architecture',
            icon: '🏛️',
            objectives: [
              'Design end-to-end Zero Trust architectures: identity verification, device health, micro-segmentation, and continuous authorization.',
              'Apply the SABSA (Sherwood Applied Business Security Architecture) matrix to enterprise cloud environments.',
              'Establish cryptographic key management strategies utilizing AWS KMS, CloudHSM, and envelope encryption.',
              'Lead cross-functional engineering teams in architectural security reviews and threat modeling sessions.',
              'Prepare for the AWS Certified Security Specialty (SCS-C02) and CCSP credentials.'
            ],
            resources: [
              { type: 'text', label: 'AWS Certified Security Specialty (SCS-C02) Official Guide (PDF)', url: 'https://d1.awsstatic.com/training-and-certification/docs-security-spec/AWS-Certified-Security-Specialty_Exam-Guide.pdf' },
              { type: 'text', label: 'ISC2 CCSP Official Exam Outline & Body of Knowledge', url: 'https://www.isc2.org/certifications/ccsp' },
              { type: 'text', label: 'NIST SP 800-207: Zero Trust Architecture Specification', url: 'https://csrc.nist.gov/publications/detail/sp/800-207/final' }
            ]
          }
        ]
      }
    ],
    tools: [
      { name: 'Terraform', cat: 'Infrastructure as Code', desc: 'Industry standard for provisioning cloud infrastructure safely and predictably across multiple providers using code.', tags: ['IaC', 'AWS', 'Automation'], url: 'https://developer.hashicorp.com/terraform' },
      { name: 'Trivy', cat: 'Vulnerability Scanner', desc: 'Comprehensive scanner for container images, filesystems, and Git repositories finding CVEs and misconfigs.', tags: ['Docker', 'Containers', 'CVE'], url: 'https://github.com/aquasecurity/trivy' },
      { name: 'Checkov', cat: 'IaC Security', desc: 'Static code analysis tool for infrastructure-as-code (Terraform, CloudFormation, K8s, Dockerfiles).', tags: ['Terraform', 'IaC', 'Compliance'], url: 'https://github.com/bridgecrewio/checkov' },
      { name: 'Prowler', cat: 'CSPM', desc: 'Open-source security assessment, auditing, and hardening tool for AWS, Azure, and GCP following CIS benchmarks.', tags: ['CSPM', 'AWS', 'Audit'], url: 'https://github.com/prowler-cloud/prowler' },
      { name: 'Falco', cat: 'Runtime Security', desc: 'Cloud-native runtime security tool for Kubernetes detecting unexpected behavior, threats, and compliance violations.', tags: ['Kubernetes', 'Runtime', 'Detection'], url: 'https://falco.org/' },
      { name: 'Semgrep', cat: 'SAST', desc: 'Fast, open-source static analysis engine for finding bugs, detecting vulnerabilities, and enforcing code standards.', tags: ['SAST', 'Code Review', 'CI/CD'], url: 'https://semgrep.dev/' },
      { name: 'Vault', cat: 'Secrets Management', desc: 'Manage secrets and protect sensitive data (tokens, passwords, certificates, encryption keys) with a unified API.', tags: ['Secrets', 'PKI', 'HashiCorp'], url: 'https://developer.hashicorp.com/vault' },
      { name: 'Gitleaks', cat: 'Secret Detection', desc: 'Audit git repositories for secrets, passwords, and sensitive keys with customizable regex and pre-commit hooks.', tags: ['Secrets', 'Git', 'Pre-commit'], url: 'https://github.com/gitleaks/gitleaks' }
    ],
    certs: [
      { name: 'AWS Solutions Architect Associate (SAA-C03)', provider: 'Amazon Web Services', level: 'associate', timing: 'Phase 2 — Architecture', cost: '~$150 USD', desc: 'Validates ability to design resilient, high-performing, secure, and cost-optimized cloud architectures.', url: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/', examUrl: 'https://aws.amazon.com/' },
      { name: 'Linux Foundation LFD121 Certificate', provider: 'Linux Foundation', level: 'entry', timing: 'Phase 1 — 100% Free', cost: '100% FREE', desc: 'Official certificate of completion covering security principles for developers and software engineers.', url: 'https://training.linuxfoundation.org/training/developing-secure-software-lfd121/', examUrl: 'https://training.linuxfoundation.org/' },
      { name: 'AWS Certified Security – Specialty (SCS-C02)', provider: 'Amazon Web Services', level: 'professional', timing: 'Phase 3 — Specialization', cost: '~$300 USD', desc: 'The premier AWS security credential validating data protection, incident response, logging, and IAM.', url: 'https://aws.amazon.com/certification/certified-security-specialty/', examUrl: 'https://aws.amazon.com/' },
      { name: 'Certified Kubernetes Security Specialist (CKS)', provider: 'CNCF / Linux Foundation', level: 'professional', timing: 'Phase 3 — Container Sec', cost: '~$395 USD', desc: 'Hands-on performance-based exam on securing container-based applications and Kubernetes platforms.', url: 'https://www.cncf.io/certification/cks/', examUrl: 'https://www.cncf.io/' },
      { name: 'CCSP (Certified Cloud Security Professional)', provider: 'ISC²', level: 'professional', timing: 'Phase 4 — Vendor Neutral', cost: '~$599 USD', desc: 'Highest-standard vendor-neutral cloud security credential covering cloud architecture and compliance.', url: 'https://www.isc2.org/certifications/ccsp', examUrl: 'https://www.isc2.org/' },
      { name: 'CISSP-ISSAP (Security Architecture)', provider: 'ISC²', level: 'expert', timing: 'Phase 4 — Master Tier', cost: '~$599 USD', desc: 'Specialized architecture concentration for CISSPs who design enterprise security infrastructure.', url: 'https://www.isc2.org/certifications/issap', examUrl: 'https://www.isc2.org/' }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. GOVERNANCE, RISK & COMPLIANCE (GRC)
  // ─────────────────────────────────────────────────────────────────────────
  GRC: {
    id: 'GRC',
    name: 'Governance, Risk & Compliance (GRC)',
    shortName: 'GRC & Risk',
    badge: 'Governance Track',
    icon: '⚖️',
    color: '#d97706',
    tagline: 'Bridge business strategy with cybersecurity regulation. Master NIST CSF 2.0, ISO 27001, SOC 2, risk assessment methodologies, and corporate audit leadership.',
    targetRoles: ['GRC Analyst', 'IT Compliance Analyst', 'Security Auditor', 'Risk Specialist', 'Director of GRC / CISO'],
    summary: 'The executive bridge between technical security and corporate business strategy. Master enterprise risk assessments, draft authoritative policies, conduct audit readiness reviews, and navigate global privacy laws (GDPR, HIPAA, PCI DSS).',
    phases: [
      {
        id: 'grc_p1',
        title: 'PHASE 1: GRC FOUNDATIONS & FRAMEWORKS',
        subtitle: 'Beginner (0–3 Years Experience)',
        goal: 'Understand the language of risk, compliance, and information governance. Master the core frameworks (NIST CSF 2.0, ISO 27001) and learn how to build an enterprise risk register.',
        icon: '📚',
        modules: [
          {
            id: 'grc_p1m1',
            title: 'Information Security Governance & Terminology',
            icon: '🏛️',
            objectives: [
              'Understand the core pillars: Governance (rules), Risk (uncertainty), and Compliance (adherence).',
              'Differentiate Policies (mandatory rules), Standards (specifications), Guidelines (advice), and Procedures (step-by-step).',
              'Master the CIA Triad and calculate Risk = Threat × Vulnerability × Asset Value (Impact).',
              'Differentiate Qualitative risk scoring (Low/Med/High matrices) from Quantitative loss expectancy (ALE = SLE × ARO).',
              'Watch Simply Cyber GRC playlist and understand the daily workflow of a GRC Analyst.'
            ],
            resources: [
              { type: 'Ytvideo', label: 'Simply Cyber (Dr. Gerald Auger): GRC Analyst Masterclass & Career Videos', url: 'https://www.youtube.com/@SimplyCyber' },
              { type: 'Ytvideo', label: 'Prabh Nair: GRC Masterclass Series for Cybersecurity Professionals', url: 'https://www.youtube.com/@PrabhNairCyber' },
              { type: 'Ytvideo', label: 'UnixGuy (Abed Hamdan): Breaking into GRC from Any Background', url: 'https://www.youtube.com/@UnixGuy' },
              { type: 'course', label: 'Alison: Fundamentals of GRC (100% Free Online Course)', url: 'https://alison.com/course/fundamentals-of-governance-risk-and-compliance-grc' }
            ]
          },
          {
            id: 'grc_p1m2',
            title: 'NIST Cybersecurity Framework (CSF 2.0) Deep Dive',
            icon: '📋',
            objectives: [
              'Master the 6 Core Functions of NIST CSF 2.0: GOVERN (GV), IDENTIFY (ID), PROTECT (PR), DETECT (DE), RESPOND (RS), RECOVER (RC).',
              'Analyze CSF Categories and Subcategories to map technical controls to business outcomes.',
              'Conduct a baseline maturity assessment across organizational tiers (Tier 1: Partial to Tier 4: Adaptive).',
              'Create a target state improvement roadmap based on gap analysis findings.',
              'Download and utilize the official NIST CSF 2.0 Reference Tool.'
            ],
            resources: [
              { type: 'text', label: 'NIST Official Portal: Cybersecurity Framework (CSF 2.0)', url: 'https://www.nist.gov/cyberframework' },
              { type: 'text', label: 'NIST CSF Quick Start Guide & Implementation Resources', url: 'https://www.nist.gov/cyberframework/getting-started' },
              { type: 'text', label: 'NIST SP 800-53 Rev. 5: Security and Privacy Controls Catalog', url: 'https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final' }
            ]
          },
          {
            id: 'grc_p1m3',
            title: 'ISO/IEC 27001:2022 & ISMS Implementation',
            icon: '🌍',
            objectives: [
              'Understand the structure of an Information Security Management System (ISMS).',
              'Master Annex A controls grouped across 4 themes: Organizational (37), People (8), Physical (14), Technological (34).',
              'Draft a formal Statement of Applicability (SoA) documenting control inclusion and justification.',
              'Execute mandatory internal audit procedures before external stage 1 and stage 2 certification audits.',
              'Establish continuous improvement cycles using the Plan-Do-Check-Act (PDCA) methodology.'
            ],
            resources: [
              { type: 'text', label: 'ISO/IEC 27001:2022 Official Information Security Management Standard', url: 'https://www.iso.org/isoiec-27001-information-security.html' },
              { type: 'text', label: 'ISMS.online: Complete ISO 27001 Free Implementation Guide', url: 'https://www.isms.online/iso-27001/' },
              { type: 'course', label: 'Cybrary: Governance Basics Free Training Module', url: 'https://www.cybrary.it/course/governance-basics' }
            ]
          },
          {
            id: 'grc_p1m4',
            title: 'Global Privacy Laws & Regulatory Compliance (GDPR, HIPAA, PCI)',
            icon: '⚖️',
            objectives: [
              'GDPR: 7 key principles, legal bases for processing, data subject rights, and 72-hour breach reporting.',
              'HIPAA Security Rule: Administrative, physical, and technical safeguards for Protected Health Information (PHI).',
              'PCI DSS v4.0: 12 core requirements for securing cardholder data environments (CDE).',
              'Differentiate SOC 1 (financial reporting controls) from SOC 2 (Trust Services Criteria: Security, Availability, etc.).',
              'Build a unified compliance matrix cross-referencing ISO 27001 controls to NIST CSF and GDPR.'
            ],
            resources: [
              { type: 'text', label: 'GDPR Official Legal Text & Articles (European Union)', url: 'https://gdpr-info.eu/' },
              { type: 'text', label: 'HHS.gov: HIPAA Security Rule Guidance & Resources', url: 'https://www.hhs.gov/hipaa/index.html' },
              { type: 'text', label: 'PCI Security Standards Council: PCI DSS v4.0 Resource Hub', url: 'https://www.pcisecuritystandards.org/' }
            ]
          }
        ]
      },
      {
        id: 'grc_p2',
        title: 'PHASE 2: ENTERPRISE AUDIT & THIRD-PARTY RISK (TPRM)',
        subtitle: 'Intermediate (4–7 Years Experience)',
        goal: 'Lead enterprise internal and external audits, manage third-party vendor risks (TPRM), conduct Business Impact Analyses (BIA), and maintain the enterprise risk register.',
        icon: '🔍',
        modules: [
          {
            id: 'grc_p2m1',
            title: 'Third-Party Risk Management (TPRM) & Vendor Security',
            icon: '🤝',
            objectives: [
              'Design a standardized Vendor Security Assessment questionnaire based on SIG (Standard Information Gathering) or CAIQ.',
              'Review third-party vendor SOC 2 Type II reports and identify qualified auditor opinions or control exceptions.',
              'Calculate vendor risk tiering based on data sensitivity, network connectivity, and criticality to operations.',
              'Draft mandatory security terms for Master Services Agreements (MSAs) and Data Processing Agreements (DPAs).',
              'Conduct continuous vendor monitoring using security rating platforms.'
            ],
            resources: [
              { type: 'text', label: 'Cloud Security Alliance (CSA): Consensus Assessments Initiative Questionnaire (CAIQ)', url: 'https://cloudsecurityalliance.org/research/artifacts/caiq/' },
              { type: 'text', label: 'NIST SP 800-161 Rev. 1: Cybersecurity Supply Chain Risk Management Practices', url: 'https://csrc.nist.gov/publications/detail/sp/800-161/rev-1/final' }
            ]
          },
          {
            id: 'grc_p2m2',
            title: 'Audit Readiness & SOC 2 Type II Examination Leadership',
            icon: '📑',
            objectives: [
              'Coordinate with independent CPA audit firms throughout SOC 2 Type II observation periods (6–12 months).',
              'Collect and catalog audit evidence: screenshot captures, system configs, access request tickets, and termination logs.',
              'Implement automated evidence gathering using open-source compliance scripts or platforms (SimpleRisk / OpenSCAP).',
              'Formulate remediation plans for identified control deficiencies before final report issuance.',
              'Distribute and communicate SOC 2 reports to enterprise B2B sales prospects under non-disclosure agreements.'
            ],
            resources: [
              { type: 'tool', label: 'SimpleRisk: Free Open Source Risk Management Platform', url: 'https://www.simplerisk.com/' },
              { type: 'tool', label: 'OpenSCAP: Open Source Security Compliance Solution', url: 'https://www.open-scap.org/' },
              { type: 'text', label: 'AICPA: SOC 2 Overview & Trust Services Criteria', url: 'https://www.aicpa-cima.com/' }
            ]
          }
        ]
      },
      {
        id: 'grc_p3',
        title: 'PHASE 3: ENTERPRISE RISK MANAGEMENT & STRATEGY',
        subtitle: 'Advanced (8+ Years Experience)',
        goal: 'Direct enterprise risk management (ERM). Align security investments with executive business priorities, author corporate policies, and brief the Board of Directors on cyber risk exposure.',
        icon: '📈',
        modules: [
          {
            id: 'grc_p3m1',
            title: 'FAIR Quantitative Risk Analysis & Board Reporting',
            icon: '💼',
            objectives: [
              'Apply the Factor Analysis of Information Risk (FAIR) framework to quantify cyber risk in financial terms ($).',
              'Calculate Loss Event Frequency (LEF) and Loss Magnitude (LM) using Monte Carlo statistical simulations.',
              'Present cyber risk exposure to the Board of Directors in dollars at risk rather than technical vulnerability counts.',
              'Determine corporate cyber insurance coverage requirements and policy exclusions.',
              'Prepare for the ISACA CISA, CRISC, and CISM certification examinations.'
            ],
            resources: [
              { type: 'text', label: 'FAIR Institute: Quantitative Risk Management Principles', url: 'https://www.fairinstitute.org/' },
              { type: 'text', label: 'ISACA Credentialing: CISA (Auditor), CRISC (Risk), CISM (Manager)', url: 'https://www.isaca.org/credentialing' }
            ]
          }
        ]
      },
      {
        id: 'grc_p4',
        title: 'PHASE 4: CHIEF RISK OFFICER & CISO (GRC TRACK)',
        subtitle: 'Expert / Pro (10+ Years Experience)',
        goal: 'Serve as Chief Compliance Officer, Chief Information Security Officer (CISO), or VP of Governance. Shape national regulatory compliance strategy and drive trusted business growth.',
        icon: '👑',
        modules: [
          {
            id: 'grc_p4m1',
            title: 'Executive Cyber Governance & Regulatory Stewardship',
            icon: '🏆',
            objectives: [
              'Establish the enterprise Cybersecurity Steering Committee and define corporate risk appetite statements.',
              'Navigate cross-border regulatory harmonization between US (SEC cyber rules), EU (NIS2, DORA), and Asian frameworks.',
              'Lead regulatory responses and defend organizational posture during government investigations.',
              'Align security strategy with corporate Environmental, Social, and Governance (ESG) goals.',
              'Mentor the next generation of GRC analysts and compliance auditors.'
            ],
            resources: [
              { type: 'text', label: 'SEC.gov: Cybersecurity Risk Management, Strategy, Governance, and Incident Disclosure Rules', url: 'https://www.sec.gov/' },
              { type: 'text', label: 'ISC2 CISSP Official Exam Outline & Study Guide', url: 'https://www.isc2.org/certifications/cissp' }
            ]
          }
        ]
      }
    ],
    tools: [
      { name: 'SimpleRisk', cat: 'Risk Management', desc: 'Simple, free, and open source risk management application for enterprise risk registers, assessments, and mitigations.', tags: ['Risk', 'Open Source', 'Register'], url: 'https://www.simplerisk.com/' },
      { name: 'OpenSCAP', cat: 'Compliance Automation', desc: 'Suite of automated open source tools to verify and enforce system compliance with security baselines (DISA STIG, PCI DSS).', tags: ['SCAP', 'Hardening', 'Compliance'], url: 'https://www.open-scap.org/' },
      { name: 'Eramba', cat: 'Enterprise GRC', desc: 'Specialized enterprise GRC software helping organizations manage policies, risk assessments, audits, and exceptions.', tags: ['GRC', 'Audits', 'Frameworks'], url: 'https://www.eramba.org/' },
      { name: 'NIST CSF 2.0 Reference Tool', cat: 'Framework Explorer', desc: 'Official interactive tool by NIST to explore and export CSF 2.0 Core functions, categories, subcategories, and implementation examples.', tags: ['NIST', 'CSF', 'Framework'], url: 'https://www.nist.gov/cyberframework' }
    ],
    certs: [
      { name: 'CompTIA Security+ (SY0-701)', provider: 'CompTIA', level: 'entry', timing: 'Phase 1 — Foundations', cost: '~$392 USD', desc: 'Validates baseline cybersecurity and governance knowledge required by compliance analysts.', url: 'https://www.comptia.org/certifications/security', examUrl: 'https://www.comptia.org/' },
      { name: 'ISC2 Certified in Cybersecurity (CC)', provider: 'ISC²', level: 'entry', timing: 'Phase 1 — 100% Free', cost: '100% FREE', desc: 'Free entry security certification from ISC² covering security principles and risk management.', url: 'https://www.isc2.org/certifications/cc', examUrl: 'https://www.isc2.org/' },
      { name: 'CISA (Certified Information Systems Auditor)', provider: 'ISACA', level: 'professional', timing: 'Phase 2 — Audit Gold Standard', cost: '~$575–$760 USD', desc: 'The world-renowned gold standard for IS audit control, assurance, and security assessment professionals.', url: 'https://www.isaca.org/credentialing/cisa', examUrl: 'https://www.isaca.org/' },
      { name: 'CRISC (Risk and Information Systems Control)', provider: 'ISACA', level: 'professional', timing: 'Phase 3 — Risk Specialization', cost: '~$575–$760 USD', desc: 'Validates expertise in identifying, evaluating, and managing enterprise IT and cyber risk.', url: 'https://www.isaca.org/credentialing/crisc', examUrl: 'https://www.isaca.org/' },
      { name: 'CISM (Certified Information Security Manager)', provider: 'ISACA', level: 'professional', timing: 'Phase 3 — Management', cost: '~$575–$760 USD', desc: 'Management-focused credential validating capability to oversee information security governance and program development.', url: 'https://www.isaca.org/credentialing/cism', examUrl: 'https://www.isaca.org/' },
      { name: 'CISSP', provider: 'ISC²', level: 'expert', timing: 'Phase 4 — Executive Level', cost: '~$749 USD', desc: 'The premier credential for cybersecurity leadership, required for Director of GRC and CISO positions.', url: 'https://www.isc2.org/certifications/cissp', examUrl: 'https://www.isc2.org/' }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. AI & EMERGING CYBER SECURITY
  // ─────────────────────────────────────────────────────────────────────────
  AI_SECURITY: {
    id: 'AI_SECURITY',
    name: 'AI & Emerging Cyber Security',
    shortName: 'AI & LLM Sec',
    badge: 'Emerging Tech',
    icon: '🤖',
    color: '#9333ea',
    tagline: 'Secure artificial intelligence and LLM applications. Master prompt injection defense, adversarial machine learning, model hardening, and AI red teaming.',
    targetRoles: ['AI Security Analyst', 'SecAI+ Specialist', 'AI Red Teamer', 'LLM Security Engineer', 'Chief AI Security Architect'],
    summary: 'The frontier of modern cybersecurity. Secure Large Language Models (LLMs) and neural networks against prompt injections, data poisoning, model extraction, and insecure output handling using industry standards like OWASP Top 10 for LLMs and NIST AI RMF.',
    phases: [
      {
        id: 'ai_p1',
        title: 'PHASE 1: AI/ML FOUNDATIONS & PROMPT RISKS',
        subtitle: 'Beginner (0–2 Years Experience)',
        goal: 'Understand the underlying mechanics of modern Machine Learning and Large Language Models, and learn the anatomy of prompt injection and data privacy risks.',
        icon: '🧠',
        modules: [
          {
            id: 'ai_p1m1',
            title: 'Machine Learning & Neural Network Fundamentals',
            icon: '📐',
            objectives: [
              'Understand supervised vs unsupervised vs reinforcement learning (RLHF).',
              'Master how Transformers and Large Language Models (LLMs) operate: tokens, embeddings, attention mechanisms, and weights.',
              'Study model training pipelines: pre-training, fine-tuning, retrieval-augmented generation (RAG), and vector databases.',
              'Identify the AI attack surface: training data, weights, inference APIs, and output consumers.',
              'Complete Stanford CS229 lecture series or Fast.ai practical deep learning course.'
            ],
            resources: [
              { type: 'course', label: 'Fast.ai: Practical Deep Learning for Coders (100% Free Course)', url: 'https://course.fast.ai/' },
              { type: 'Ytvideo', label: 'Stanford CS229: Machine Learning Lecture Playlist (YouTube)', url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU' },
              { type: 'course', label: 'Microsoft Learn: AI Security Fundamentals Learning Path (Free)', url: 'https://learn.microsoft.com/en-us/training/paths/ai-security-fundamentals/' },
              { type: 'text', label: 'Google Cloud: Introduction to Security in the World of AI', url: 'https://cloud.google.com/security/ai-security' }
            ]
          },
          {
            id: 'ai_p1m2',
            title: 'Prompt Injection Attacks & Jailbreak Engineering',
            icon: '💉',
            objectives: [
              'Differentiate Direct Prompt Injection (jailbreaking) from Indirect Prompt Injection (malicious web/doc context).',
              'Execute prompt injection techniques: roleplay hijacking ("DAN"), delimiter confusion, and virtualisation.',
              'Analyze how indirect injection compromises RAG pipelines and AI search agents.',
              'Test LLMs against system prompt extraction attacks.',
              'Practice: Complete interactive prompt injection CTFs (Gandalf by Lakera / Doublethink).'
            ],
            resources: [
              { type: 'lab', label: 'Lakera Gandalf: The Prompt Injection & AI Security Game', url: 'https://gandalf.lakera.ai/' },
              { type: 'text', label: 'OWASP Top 10 for Large Language Model Applications (2025)', url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/' },
              { type: 'course', label: 'AWS Skill Builder: Securing Generative AI on AWS (Free)', url: 'https://explore.skillbuilder.aws/learn/course/securing-generative-ai-on-aws' }
            ]
          },
          {
            id: 'ai_p1m3',
            title: 'AI Data Privacy, Poisoning & Confidentiality',
            icon: '🔒',
            objectives: [
              'Understand Training Data Poisoning: injecting backdoor triggers into datasets.',
              'Analyze sensitive data leakage through LLM memorization and training data extraction.',
              'Differentiate differential privacy from anonymization in AI training pipelines.',
              'Evaluate copyright, PII, and GDPR compliance risks in LLM fine-tuning data.',
              'Implement automated input scrubbing (Presidio / regex) to prevent confidential data ingestion.'
            ],
            resources: [
              { type: 'text', label: 'Microsoft Presidio: Data Protection and De-Identification SDK', url: 'https://github.com/microsoft/presidio' },
              { type: 'text', label: 'NIST AI Risk Management Framework (AI RMF 1.0)', url: 'https://www.nist.gov/itl/ai-risk-management-framework' }
            ]
          },
          {
            id: 'ai_p1m4',
            title: 'Foundational Cybersecurity & CompTIA SecAI+ Prep',
            icon: '🛡️',
            objectives: [
              'Review core cybersecurity controls applicable to AI: API authentication, least privilege access, and TLS in transit.',
              'Understand how traditional vulnerabilities (SSRF, SQLi, Remote Code Execution) execute via AI agent tool calling.',
              'Study the newly released CompTIA SecAI+ domain objectives.',
              'Map AI threats to the MITRE ATLAS (Adversarial Threat Landscape for AI Systems) matrix.',
              'Complete: Practice assessments on AI threat categorization.'
            ],
            resources: [
              { type: 'text', label: 'MITRE ATLAS: Adversarial Threat Landscape for Artificial-Intelligence Systems', url: 'https://atlas.mitre.org/' },
              { type: 'text', label: 'CompTIA SecAI+ Certification Announcement & Objectives', url: 'https://www.comptia.org/certifications/secai' }
            ]
          }
        ]
      },
      {
        id: 'ai_p2',
        title: 'PHASE 2: OWASP LLM TOP 10 & AUTOMATED SCANNING',
        subtitle: 'Intermediate (2–5 Years Experience)',
        goal: 'Master the OWASP LLM Top 10 vulnerabilities in production systems. Deploy automated AI vulnerability scanners like NVIDIA Garak and implement robust runtime AI guardrails.',
        icon: '🤖',
        modules: [
          {
            id: 'ai_p2m1',
            title: 'The OWASP Top 10 for LLM Applications In-Depth',
            icon: '📋',
            objectives: [
              'LLM01: Prompt Injection (Direct & Indirect mitigation).',
              'LLM02: Sensitive Information Disclosure (PII, credentials in weights).',
              'LLM03: Supply Chain Vulnerabilities (poisoned Hugging Face models, malicious pickle files).',
              'LLM04: Data and Model Poisoning (backdoor triggers).',
              'LLM05: Improper Output Handling (XSS / SQLi through unescaped model outputs).',
              'LLM06: Excessive Agency (autonomous agents executing destructive actions without approval).',
              'LLM07: System Prompt Leakage.',
              'LLM08: Vector and Embedding Weaknesses.',
              'LLM09: Misinformation & Hallucination exploitation.',
              'LLM10: Unbounded Consumption (Denial of Service / token exhaustion).'
            ],
            resources: [
              { type: 'text', label: 'OWASP GenAI Security Project Official Portal', url: 'https://genai.owasp.org/' },
              { type: 'text', label: 'OWASP Top 10 for LLM Applications (Complete Guide)', url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/' },
              { type: 'text', label: 'Hugging Face: Safetensors — Secure Model Weight Format', url: 'https://github.com/huggingface/safetensors' }
            ]
          },
          {
            id: 'ai_p2m2',
            title: 'Automated AI Vulnerability Scanning with NVIDIA Garak',
            icon: '🔍',
            objectives: [
              'Install and configure Garak: the LLM vulnerability scanner developed by NVIDIA.',
              'Run automated security probes against OpenAI, Anthropic, Hugging Face, and local Ollama models.',
              'Scan for Dan jailbreaks, prompt injection, hallucination, leakage, and toxic outputs.',
              'Analyze Garak HTML reports to quantify model vulnerability attack pass rates.',
              'Integrate Garak testing into CI/CD pipelines before deploying updated model weights.'
            ],
            resources: [
              { type: 'tool', label: 'NVIDIA Garak: Generative AI Red-Teaming Scanner (GitHub)', url: 'https://github.com/NVIDIA/garak' },
              { type: 'text', label: 'GitHub: LLM Red Team with Garak (BL3IP Guide)', url: 'https://github.com/BL3IP/llm-redteam-garak' },
              { type: 'tool', label: 'Promptfoo: Fast Test-Driven Security & LLM Evaluation', url: 'https://github.com/promptfoo/promptfoo' }
            ]
          },
          {
            id: 'ai_p2m3',
            title: 'AI Guardrails & Runtime Defense Engineering',
            icon: '🛡️',
            objectives: [
              'Deploy programmable guardrails using NVIDIA NeMo Guardrails or Meta Llama Guard.',
              'Implement topical rails (preventing off-topic conversation) and execution rails (preventing malicious function calls).',
              'Detect and block jailbreak attempts in real time using semantic similarity and classification models.',
              'Enforce strict JSON schema validation and output sanitization to prevent downstream XSS and RCE.',
              'Construct a secure multi-turn chatbot architecture with pre-guard and post-guard filters.'
            ],
            resources: [
              { type: 'tool', label: 'NVIDIA NeMo Guardrails: Programmable Rails for LLM Applications', url: 'https://github.com/NVIDIA/NeMo-Guardrails' },
              { type: 'text', label: 'Meta Llama Guard: LLM-Based Input-Output Safeguard Model', url: 'https://llama.meta.com/docs/model-cards-and-prompt-formats/llama-guard-3/' },
              { type: 'tool', label: 'Microsoft PyRIT: Python Risk Identification Tool for Generative AI', url: 'https://github.com/Azure/PyRIT' }
            ]
          }
        ]
      },
      {
        id: 'ai_p3',
        title: 'PHASE 3: AI RED TEAMING & ADVERSARIAL ML',
        subtitle: 'Advanced (5–8 Years Experience)',
        goal: 'Perform adversarial red team attacks against AI systems. Execute model extraction, membership inference, gradient-based evasion attacks, and multimodal jailbreaks.',
        icon: '⚔️',
        modules: [
          {
            id: 'ai_p3m1',
            title: 'Adversarial Machine Learning Attacks',
            icon: '🎯',
            objectives: [
              'Execute Evasion Attacks: Fast Gradient Sign Method (FGSM) and Projected Gradient Descent (PGD) using Adversarial Robustness Toolbox (ART).',
              'Perform Model Inversion and Membership Inference attacks to reconstruct private training data.',
              'Attack computer vision models using adversarial patches and perturbations.',
              'Jailbreak multimodal models via audio and visual adversarial embeddings.',
              'Evaluate model robustness against Black-Box query extraction attacks.'
            ],
            resources: [
              { type: 'tool', label: 'Linux Foundation Adversarial Robustness Toolbox (ART)', url: 'https://github.com/Trusted-AI/adversarial-robustness-toolbox' },
              { type: 'text', label: 'Hack The Box: Certified Offensive AI Expert (COAE) Information', url: 'https://www.hackthebox.com/' },
              { type: 'course', label: 'SANS AI Security Track (SEC598: Generative AI Security)', url: 'https://www.sans.org/cyber-security-courses/ai-security/' }
            ]
          }
        ]
      },
      {
        id: 'ai_p4',
        title: 'PHASE 4: CHIEF AI SECURITY ARCHITECT & GOVERNANCE',
        subtitle: 'Expert / Pro (8+ Years Experience)',
        goal: 'Architect enterprise-scale AI security frameworks. Lead AI trust & safety initiatives, ensure regulatory compliance with the EU AI Act and NIST AI RMF, and direct AI security research teams.',
        icon: '👑',
        modules: [
          {
            id: 'ai_p4m1',
            title: 'Enterprise AI Governance, Safety & EU AI Act Compliance',
            icon: '⚖️',
            objectives: [
              'Classify corporate AI systems according to the EU AI Act risk tiers (Unacceptable, High-Risk, Limited, Minimal).',
              'Implement the NIST AI Risk Management Framework (AI RMF) across development lifecycles.',
              'Establish AI Model Cards and System Transparency documentation for high-risk deployments.',
              'Design secure autonomous AI agent architectures with Human-in-the-Loop (HITL) safety boundaries.',
              'Lead executive briefings on emerging threats from autonomous AI agents and defensive countermeasures.'
            ],
            resources: [
              { type: 'text', label: 'OWASP GenAI COMPASS Playbook for Leaders', url: 'https://genai.owasp.org/compass' },
              { type: 'text', label: 'European Commission: EU Artificial Intelligence Act Portal', url: 'https://artificialintelligenceact.eu/' },
              { type: 'text', label: 'NIST Trustworthy and Responsible AI Resource Center', url: 'https://www.nist.gov/itl/ai-risk-management-framework' }
            ]
          }
        ]
      }
    ],
    tools: [
      { name: 'Garak', cat: 'LLM Vulnerability Scanner', desc: 'LLM vulnerability scanner by NVIDIA that probes generative AI models for hallucination, jailbreaks, data leakage, and prompt injection.', tags: ['NVIDIA', 'LLM', 'Scanner'], url: 'https://github.com/NVIDIA/garak' },
      { name: 'Promptfoo', cat: 'LLM Evaluation & Red Teaming', desc: 'CLI tool and library for evaluating LLM quality, security, and prompt injection resilience with automated test cases.', tags: ['Testing', 'CI/CD', 'Red Team'], url: 'https://github.com/promptfoo/promptfoo' },
      { name: 'PyRIT (Microsoft)', cat: 'AI Red Teaming Tool', desc: 'Python Risk Identification Tool for Generative AI developed by Microsoft AI Red Team to automate adversarial testing.', tags: ['Microsoft', 'Adversarial', 'Red Team'], url: 'https://github.com/Azure/PyRIT' },
      { name: 'NeMo Guardrails', cat: 'AI Guardrails & Safety', desc: 'Open-source toolkit by NVIDIA for easily adding programmable guardrails to LLM-based conversational systems.', tags: ['Safety', 'Guardrails', 'NVIDIA'], url: 'https://github.com/NVIDIA/NeMo-Guardrails' },
      { name: 'Adversarial Robustness Toolbox (ART)', cat: 'Adversarial ML', desc: 'Python library for Machine Learning Security providing tools against Evasion, Poisoning, Extraction, and Inversion.', tags: ['Adversarial', 'ML', 'Attacks'], url: 'https://github.com/Trusted-AI/adversarial-robustness-toolbox' },
      { name: 'Llama Guard', cat: 'Input/Output Moderation', desc: 'Open-weights safeguard model by Meta fine-tuned on safety risks to classify inputs and outputs as safe or unsafe.', tags: ['Meta', 'Moderation', 'Safety'], url: 'https://llama.meta.com/docs/model-cards-and-prompt-formats/llama-guard-3/' }
    ],
    certs: [
      { name: 'CompTIA Security+ (SY0-701)', provider: 'CompTIA', level: 'entry', timing: 'Phase 1 — Foundations', cost: '~$392 USD', desc: 'Validates baseline cybersecurity and threat concepts, including emerging AI risks.', url: 'https://www.comptia.org/certifications/security', examUrl: 'https://www.comptia.org/' },
      { name: 'CompTIA SecAI+ (Security for AI)', provider: 'CompTIA', level: 'associate', timing: 'Phase 2 — AI Specialization', cost: '~$392 USD', desc: 'New specialized credential certifying cybersecurity practitioners in securing AI systems and LLM apps.', url: 'https://www.comptia.org/certifications/secai', examUrl: 'https://www.comptia.org/' },
      { name: 'HTB Certified Offensive AI Expert (COAE)', provider: 'Hack The Box', level: 'advanced', timing: 'Phase 3 — AI Red Teaming', cost: '~$499 USD', desc: 'First-of-its-kind hands-on practical certification testing offensive AI and adversarial ML exploitation.', url: 'https://www.hackthebox.com/', examUrl: 'https://www.hackthebox.com/' },
      { name: 'SANS SEC598: Generative AI Security', provider: 'SANS / GIAC', level: 'expert', timing: 'Phase 4 — Enterprise Defense', cost: '~$979+ USD', desc: 'Premier enterprise course and certification on defending, threat modeling, and securing Generative AI models.', url: 'https://www.sans.org/cyber-security-courses/ai-security/', examUrl: 'https://www.sans.org/' }
    ]
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// FREE CERTIFICATION VOUCHERS & ACADEMIC ALLIANCE PROGRAMS
// Sourced directly from pages 23–24 of file 2.pdf
// ─────────────────────────────────────────────────────────────────────────────
const FREE_VOUCHERS = [
  {
    id: 'splunk_alliance',
    name: 'Splunk Academic Alliance & WorkPlus',
    provider: 'Splunk / Cisco',
    badge: '100% Free Training & Vouchers',
    icon: '📊',
    eligibility: 'College/University Students, Faculty, and Higher Education Staff',
    description: 'Provides free access to 21 comprehensive eLearning courses with live hands-on labs, plus free certification exam vouchers for Splunk Core Certified User.',
    benefits: [
      '21 Free Self-Paced eLearning Courses with cloud lab environments',
      'Free exam vouchers for Splunk Core Certified User',
      'Exclusive webinars and direct access to Splunk engineers'
    ],
    howToApply: 'Sign up using your verified college/university (.edu or college domain) email address at the Splunk WorkPlus portal.',
    url: 'https://workplus.splunk.com',
    secondaryUrl: 'https://www.splunk.com/en_us/training/free-courses.html'
  },
  {
    id: 'isc2_cc',
    name: 'ISC2 One Million Certified in Cybersecurity',
    provider: 'ISC²',
    badge: '100% Free Course + Exam Voucher',
    icon: '🏆',
    eligibility: 'Open to All Global Learners (No prior degree required)',
    description: 'ISC² has pledged to put 1 million individuals through cybersecurity education for free. Includes official online training and a 100% free exam voucher for the Certified in Cybersecurity (CC) credential.',
    benefits: [
      'Official ISC2 self-paced digital training course',
      '100% Free Pearson VUE exam voucher ($199 USD value waived)',
      'Global credential recognized by Fortune 500 security employers'
    ],
    howToApply: 'Create a free ISC2 Candidate account, enroll in the Certified in Cybersecurity free training, and receive your promo code during exam scheduling.',
    url: 'https://www.isc2.org/certifications/cc',
    secondaryUrl: 'https://www.isc2.org/landing/1mcc'
  },
  {
    id: 'linux_foundation_lfd121',
    name: 'Linux Foundation LFD121: Developing Secure Software',
    provider: 'The Linux Foundation & OpenSSF',
    badge: '100% Free Verified Certificate',
    icon: '🐧',
    eligibility: 'Open to All Software Engineers & Cybersecurity Students',
    description: 'Developed by the Open Source Security Foundation (OpenSSF). Focuses on fundamentals of building secure software, threat modeling, and defensive programming with a free verifiable completion badge.',
    benefits: [
      '100% Free course access with verifiable completion certificate',
      'Covers practical secure coding, input validation, and cryptography',
      'Issued directly by The Linux Foundation for your LinkedIn and resume'
    ],
    howToApply: 'Enroll directly on the Linux Foundation Training platform with any email account.',
    url: 'https://training.linuxfoundation.org/training/developing-secure-software-lfd121/'
  },
  {
    id: 'cisco_netacad',
    name: 'Cisco Networking Academy & Cyber Defense Path',
    provider: 'Cisco Systems',
    badge: 'Free Badges & Splunk Labs',
    icon: '🌐',
    eligibility: 'Open to All Students & Self-Paced Learners',
    description: 'Free introductory and intermediate courses in Networking, Linux, Packet Tracer simulations, and the Cybersecurity Defense Analyst Career Path partnered with Splunk.',
    benefits: [
      'Free Cisco Packet Tracer download and virtual network simulation labs',
      'Digital badges for LinkedIn via Credly upon course completion',
      'Hands-on SOC analyst modules integrated with Splunk'
    ],
    howToApply: 'Create a free Cisco NetAcad profile and explore self-paced free courses.',
    url: 'https://www.netacad.com/'
  },
  {
    id: 'checkpoint_secureacademy',
    name: 'Check Point SecureAcademy',
    provider: 'Check Point Software Technologies',
    badge: 'Free Training + 85% Exam Discount',
    icon: '🛡️',
    eligibility: 'Higher Education Students & Partner Universities',
    description: 'Comprehensive cybersecurity training program offering free curriculum access, virtual firewalls, and up to 85% discount exam vouchers for Check Point Certified Security Administrator (CCSA).',
    benefits: [
      'Free cloud security and firewall administration curriculum',
      '85% discount voucher for official Check Point certifications',
      'Hands-on virtual lab environments with live gateways'
    ],
    howToApply: 'Join through your affiliated academic institution or request student verification on the SecureAcademy portal.',
    url: 'https://www.checkpoint.com/secureacademy'
  },
  {
    id: 'fortinet_partner',
    name: 'Fortinet Academic Partner Program',
    provider: 'Fortinet',
    badge: 'Free Student Training & Vouchers',
    icon: '🔥',
    eligibility: 'Students at Participating Higher Education Institutions',
    description: 'Fortinet Training Institute provides academic institutions with free security courses, labs, and free/discounted vouchers for the Fortinet Certified Associate (FCA) and Certified Professional (FCP) exams.',
    benefits: [
      'Free access to Fortinet NSE / Training Institute courses',
      'Discounted or free exam vouchers for university students',
      'Hands-on experience with FortiGate next-gen firewall architectures'
    ],
    howToApply: 'Register via the Fortinet Training Institute using your student credentials.',
    url: 'https://www.fortinet.com/training/cybersecurity-professionals'
  },
  {
    id: 'aws_skill_builder',
    name: 'AWS Skill Builder Free Tier & Builder Labs',
    provider: 'Amazon Web Services',
    badge: '600+ Free Courses & Badges',
    icon: '☁️',
    eligibility: 'Open Globally to Anyone',
    description: 'Amazon’s official learning center offering 600+ free digital courses, official exam readiness webinars, and official AWS digital badges for Cloud Practitioner and Security Learning Plans.',
    benefits: [
      '600+ Free on-demand cloud security courses',
      'Official AWS Digital Badges for completing learning plans',
      'Free official practice question sets for SAA-C03 and SCS-C02'
    ],
    howToApply: 'Sign in with any Amazon consumer account at explore.skillbuilder.aws.',
    url: 'https://explore.skillbuilder.aws/'
  },
  {
    id: 'microsoft_learn',
    name: 'Microsoft Learn Cloud Skills Challenge',
    provider: 'Microsoft',
    badge: 'Free Cert Exam Vouchers (Periodic)',
    icon: '🪟',
    eligibility: 'Open Globally during Microsoft Ignite / Build events',
    description: 'Microsoft regularly hosts Cloud Skills Challenges where completing a free cybersecurity or AI learning path awards a 100% free exam voucher for SC-900, SC-200, AZ-500, or AI-900.',
    benefits: [
      '100% Free certification exam vouchers during seasonal challenges',
      'Free interactive sandbox labs in Microsoft Azure',
      'Verifiable trophies and badges on Microsoft Learn profiles'
    ],
    howToApply: 'Check the Microsoft Learn Cloud Skills Challenge page during major Microsoft conferences.',
    url: 'https://learn.microsoft.com/en-us/training/'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// DECISION TREE & "HOW TO CHOOSE YOUR PATH" DATA
// Sourced directly from page 24 of file 2.pdf
// ─────────────────────────────────────────────────────────────────────────────
const DECISION_TREE = {
  title: 'How to Choose Your Path',
  subtitle: 'Find the cybersecurity specialization that matches your innate curiosity and passion.',
  questions: [
    {
      id: 'investigate',
      prompt: 'Do you love investigating mysteries, finding hidden evidence, analyzing logs, and defending systems against active threats?',
      targetTrack: 'DEFENSE',
      title: 'Cyber Defense & Analysis (Blue Team)',
      icon: '🔍',
      color: '#0284c7',
      bestFor: 'Those who think like detectives, enjoy log correlation, digital forensics, and protecting critical infrastructure.',
      startingStack: [
        { label: 'Splunk Free Training', url: 'https://www.splunk.com/en_us/training/free-courses.html' },
        { label: 'TryHackMe SOC L1 Triage', url: 'https://tryhackme.com/room/socl1alerttriage' },
        { label: 'LetsDefend Blue Team Simulator', url: 'https://letsdefend.io/' }
      ]
    },
    {
      id: 'break',
      prompt: 'Do you love breaking things, finding loopholes, thinking like an attacker, and discovering how software fails?',
      targetTrack: 'OFFENSIVE',
      title: 'Offensive Security & Penetration Testing (Red Team)',
      icon: '⚔️',
      color: '#dc2626',
      bestFor: 'Those who are relentlessly curious, enjoy ethical hacking, reverse engineering, web pentesting, and outsmarting defenses.',
      startingStack: [
        { label: 'PortSwigger Web Security Academy', url: 'https://portswigger.net/web-security' },
        { label: 'Hack The Box Starting Point', url: 'https://app.hackthebox.com/starting-point' },
        { label: 'TryHackMe Vulnversity Room', url: 'https://tryhackme.com/room/vulnversity' }
      ]
    },
    {
      id: 'build',
      prompt: 'Do you love writing code, building systems, cloud architecture, and automating security into continuous CI/CD pipelines?',
      targetTrack: 'ENGINEERING',
      title: 'Security Engineering & Architecture (DevSecOps)',
      icon: '🛡️',
      color: '#4f46e5',
      bestFor: 'Those who enjoy software development, Linux administration, AWS/Azure cloud infrastructure, and Infrastructure as Code.',
      startingStack: [
        { label: 'Linux Foundation LFD121 (Free Cert)', url: 'https://training.linuxfoundation.org/training/developing-secure-software-lfd121/' },
        { label: 'DevSecOps Zero to Hero (GitHub)', url: 'https://github.com/iam-veeramalla/DevSecOps-Zero-to-Hero' },
        { label: 'Wiz Big IAM Challenge', url: 'https://bigiamchallenge.com/' }
      ]
    },
    {
      id: 'policy',
      prompt: 'Do you love business strategy, legal policies, regulations, compliance audits, and enterprise risk management?',
      targetTrack: 'GRC',
      title: 'Governance, Risk & Compliance (GRC)',
      icon: '⚖️',
      color: '#d97706',
      bestFor: 'Those with strong analytical and communication skills who want to bridge executive leadership, law, and technical security.',
      startingStack: [
        { label: 'Alison Fundamentals of GRC (Free)', url: 'https://alison.com/course/fundamentals-of-governance-risk-and-compliance-grc' },
        { label: 'Simply Cyber GRC Videos', url: 'https://www.youtube.com/@SimplyCyber' },
        { label: 'NIST CSF 2.0 Reference', url: 'https://www.nist.gov/cyberframework' }
      ]
    },
    {
      id: 'emerging',
      prompt: 'Do you want to work on cutting-edge artificial intelligence, Large Language Model safety, and red-teaming GenAI?',
      targetTrack: 'AI_SECURITY',
      title: 'AI & Emerging Cyber Security',
      icon: '🤖',
      color: '#9333ea',
      bestFor: 'Those fascinated by the frontier of generative AI, neural networks, prompt engineering risks, and autonomous agent safety.',
      startingStack: [
        { label: 'Fast.ai Practical Deep Learning', url: 'https://course.fast.ai/' },
        { label: 'OWASP Top 10 for LLM Applications', url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/' },
        { label: 'NVIDIA Garak LLM Scanner', url: 'https://github.com/NVIDIA/garak' }
      ]
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// RECOMMENDED STARTING STACK (ALL FREE)
// Sourced directly from page 24 of file 2.pdf
// ─────────────────────────────────────────────────────────────────────────────
const RECOMMENDED_STARTING_STACK = [
  { domain: 'Networking', tool: 'Cisco Networking Academy', desc: 'Free Packet Tracer and foundational network courses.', url: 'https://www.netacad.com/' },
  { domain: 'Operating Systems', tool: 'TryHackMe Linux Fundamentals', desc: 'Interactive in-browser Linux CLI rooms from scratch.', url: 'https://tryhackme.com/module/linux-fundamentals' },
  { domain: 'Core Security Concepts', tool: 'Professor Messer Security+ (YouTube)', desc: '100% Free complete video course for CompTIA Security+ SY0-701.', url: 'https://www.youtube.com/@professormesser' },
  { domain: 'Hands-on Labs', tool: 'TryHackMe Free Community Rooms', desc: 'Gamified cybersecurity challenges across offensive and defensive domains.', url: 'https://tryhackme.com/' },
  { domain: 'Offensive Web', tool: 'PortSwigger Web Security Academy', desc: '100% free interactive labs created by the makers of Burp Suite.', url: 'https://portswigger.net/web-security' },
  { domain: 'Defensive SIEM', tool: 'Splunk Free Training & WorkPlus', desc: 'Free official eLearning courses with search query labs.', url: 'https://www.splunk.com/en_us/training/free-courses.html' },
  { domain: 'GRC Foundations', tool: 'Alison GRC Fundamentals Course', desc: 'Free certified introduction to Governance, Risk, and Compliance.', url: 'https://alison.com/course/fundamentals-of-governance-risk-and-compliance-grc' },
  { domain: 'AI Security', tool: 'Microsoft Learn AI Security Fundamentals', desc: 'Free learning path on securing artificial intelligence systems.', url: 'https://learn.microsoft.com/en-us/training/paths/ai-security-fundamentals/' }
];

// ─────────────────────────────────────────────────────────────────────────────
// MARKET SALARY & DEMAND BENCHMARKS ACROSS ALL 5 ROLES
// ─────────────────────────────────────────────────────────────────────────────
const ROLE_SALARIES = [
  // BLUE TEAM / DEFENSE
  {
    track: 'DEFENSE',
    trackName: 'Cyber Defense & SOC',
    role: 'SOC Analyst L1 (India & US)',
    range: '₹4.5 – 8 LPA | $65k – $90k USD',
    sub: 'Entry Level (0–2 yrs): Alert triage, Wireshark, Splunk basics',
    items: ['Security+ or ISC2 CC qualifies for entry screening', 'Hands-on Wireshark packet capture & syslog analysis', 'Splunk Core Certified User brings ₹1-2 LPA premium', 'Top hiring: Wipro, Infosys, Cognizant, IBM SOCs, EY'],
    barColor: '#0284c7',
    barPct: 82
  },
  {
    track: 'DEFENSE',
    trackName: 'Cyber Defense & SOC',
    role: 'Incident Responder & Threat Hunter',
    range: '₹14 – 28 LPA | $120k – $175k USD',
    sub: 'Intermediate to Advanced: Memory forensics, Volatility, EDR',
    items: ['CySA+ / BTL1 / GCIH preferred by Fortune 500 incident teams', 'Deep memory analysis (Volatility) and YARA signature writing', 'KQL / Splunk hunting for Living-off-the-Land techniques (LOLBAS)', 'Fintech & banking CIRT teams offer top salaries'],
    barColor: '#0ea5e9',
    barPct: 88
  },
  {
    track: 'DEFENSE',
    trackName: 'Cyber Defense & SOC',
    role: 'Detection Engineer & SOC Manager',
    range: '₹24 – 48+ LPA | $150k – $225k+ USD',
    sub: 'Advanced to Leadership: Detection-as-Code, Sigma, SOAR',
    items: ['Sigma rule authoring, CI/CD detection validation', 'SOAR engineering (Tines / Shuffle playbooks) and MTTD reduction', 'CISSP often requested for SOC Manager & Director positions', 'Global enterprise CIRT & MDR providers paying top compensation'],
    barColor: '#38bdf8',
    barPct: 92
  },

  // RED TEAM / OFFENSIVE
  {
    track: 'OFFENSIVE',
    trackName: 'Offensive Security',
    role: 'Junior Penetration Tester',
    range: '₹5 – 10 LPA | $70k – $105k USD',
    sub: 'Entry to Associate (1–2 yrs): Web & network assessments',
    items: ['eJPT or PJPT proving practical hands-on methodology', 'Burp Suite Pro mastery, OWASP Top 10 web vulnerabilities', 'Public CVE disclosures and HackerOne/Bugcrowd ranking boost hiring', 'Top consultancies: KPMG, Deloitte, Bishop Fox, NCC Group'],
    barColor: '#dc2626',
    barPct: 78
  },
  {
    track: 'OFFENSIVE',
    trackName: 'Offensive Security',
    role: 'Senior Pentester & Red Team Operator',
    range: '₹16 – 32 LPA | $130k – $190k USD',
    sub: 'Senior (3–6 yrs): Active Directory, C2, EDR evasion',
    items: ['OSCP or PNPT is mandatory baseline for senior consultant tier', 'Active Directory graph exploitation with BloodHound & Impacket', 'Custom payload generation, AMSI and Defender bypass techniques', 'Top boutique offensive security consultancies & BFSI red teams'],
    barColor: '#ef4444',
    barPct: 90
  },
  {
    track: 'OFFENSIVE',
    trackName: 'Offensive Security',
    role: 'Exploit Developer & Red Team Director',
    range: '₹28 – 55+ LPA | $180k – $260k+ USD',
    sub: 'Expert (6+ yrs): Reverse engineering, binary exploitation',
    items: ['OSEP / OSWE / GXPN credentials command highest contracting rates', 'x86/x64 assembly, Ghidra, memory corruption, kernel exploit dev', 'Zero-day research and adversary emulation campaigns', 'Elite research labs, defense contractors, and specialized red teams'],
    barColor: '#f87171',
    barPct: 94
  },

  // SECURITY ENGINEERING / DEVSECOPS
  {
    track: 'ENGINEERING',
    trackName: 'DevSecOps & Cloud',
    role: 'Cloud Security Engineer',
    range: '₹8 – 22 LPA | $85k – $145k USD',
    sub: 'Entry to Mid (1–3 yrs): IAM, CloudTrail, GuardDuty, CSPM',
    items: ['AWS Solutions Architect + Security+ = ₹10-14 LPA entry', 'Prowler, ScoutSuite, and automated IAM least-privilege policies', 'High demand across SaaS unicorns and digital banks', 'Remote US/EU companies hire Indian talent at $60k-$90k'],
    barColor: '#16a34a',
    barPct: 86
  },
  {
    track: 'ENGINEERING',
    trackName: 'DevSecOps & Cloud',
    role: 'DevSecOps Engineer',
    range: '₹12 – 30 LPA | $110k – $170k USD',
    sub: 'Mid to Senior (2–5 yrs): CI/CD, Trivy, Semgrep, Kubernetes',
    items: ['Automated security gates: SAST, DAST, Container, and IaC scanning', 'Terraform + Kubernetes (CKA/CKS) pays top quartile compensation', 'Tech startups (Razorpay, Swiggy, Zepto) offer ₹18-28 LPA packages', 'FAANG India engineering hubs: ₹28-45 LPA total comp'],
    barColor: '#22c55e',
    barPct: 92
  },
  {
    track: 'ENGINEERING',
    trackName: 'DevSecOps & Cloud',
    role: 'Cloud Security Architect',
    range: '₹25 – 55+ LPA | $150k – $230k+ USD',
    sub: 'Principal / Architect (6+ yrs): Multi-cloud, Zero Trust',
    items: ['AWS Security Specialty + CCSP + CISSP architecture credential stack', 'Designing multi-tenant enterprise Zero-Trust and Landing Zones', 'Enterprise consulting (Accenture, PwC) & Global Fortune 500', 'Independent cloud architecture consulting at ₹5,000–15,000/hr'],
    barColor: '#4ade80',
    barPct: 95
  },

  // GRC & RISK
  {
    track: 'GRC',
    trackName: 'GRC & Compliance',
    role: 'Cybersecurity Risk & Compliance Analyst',
    range: '₹6 – 14 LPA | $75k – $115k USD',
    sub: 'Entry to Mid (1–3 yrs): NIST CSF, ISO 27001, SOC 2 audits',
    items: ['ISC2 CC or Security+ validates baseline risk concepts', 'Conducting vendor risk assessments and maintaining SimpleRisk registers', 'Auditing internal controls against ISO 27001 Annex A controls', 'Big 4 accounting firms (EY, PwC, Deloitte, KPMG) hire aggressively'],
    barColor: '#d97706',
    barPct: 80
  },
  {
    track: 'GRC',
    trackName: 'GRC & Compliance',
    role: 'Senior GRC Consultant / Audit Lead',
    range: '₹14 – 28 LPA | $115k – $165k USD',
    sub: 'Senior (3–6 yrs): CISA / CRISC, SOC 2 Type II assurance',
    items: ['CISA or CRISC certification is mandatory for audit team lead roles', 'Guiding enterprise clients through external SOC 2 Type II audits', 'Evaluating complex international privacy laws (GDPR, DPDP Act 2023)', 'Fastest growing demand due to global compliance regulations'],
    barColor: '#f59e0b',
    barPct: 88
  },
  {
    track: 'GRC',
    trackName: 'GRC & Compliance',
    role: 'Director of Governance & CISO',
    range: '₹30 – 65+ LPA | $185k – $285k+ USD',
    sub: 'Executive (8+ yrs): Enterprise risk strategy, board reporting',
    items: ['CISSP + CISM credentials required for C-suite executive roles', 'Directing enterprise cybersecurity strategy and board risk committees', 'Overseeing cyber insurance policies and breach liability defense', 'Key hire for pre-IPO fintech and healthcare enterprises'],
    barColor: '#fbbf24',
    barPct: 91
  },

  // AI & EMERGING SECURITY
  {
    track: 'AI_SECURITY',
    trackName: 'AI & Emerging Security',
    role: 'AI Red Teamer & LLM Security Engineer',
    range: '₹14 – 32 LPA | $130k – $195k USD',
    sub: 'Emerging High-Demand: Prompt injection, jailbreaks, PyRIT',
    items: ['Testing enterprise LLMs against OWASP GenAI Top 10 vulnerabilities', 'Automated red-teaming using PyRIT, Garak, and Promptfoo', 'Massive shortage of engineers with combined ML + security skillsets', 'AI labs and tech giants (OpenAI, Microsoft, Google, Anthropic, Meta)'],
    barColor: '#9333ea',
    barPct: 96
  },
  {
    track: 'AI_SECURITY',
    trackName: 'AI & Emerging Security',
    role: 'AI Security Architect & Safety Lead',
    range: '₹26 – 60+ LPA | $175k – $275k+ USD',
    sub: 'Senior to Principal: NeMo Guardrails, secure model training',
    items: ['Designing real-time inference safety guardrails (NeMo, Llama Guard)', 'Securing RAG pipelines, vector databases, and agent tool execution', 'NIST AI RMF compliance and EU AI Act regulatory adherence', 'Highest salary premium in the modern cybersecurity industry'],
    barColor: '#a855f7',
    barPct: 98
  }
];

// Export to global scope
if (typeof window !== 'undefined') {
  window.CAREER_TRACKS = CAREER_TRACKS;
  window.FREE_VOUCHERS = FREE_VOUCHERS;
  window.DECISION_TREE = DECISION_TREE;
  window.RECOMMENDED_STARTING_STACK = RECOMMENDED_STARTING_STACK;
  window.ROLE_SALARIES = ROLE_SALARIES;
}
