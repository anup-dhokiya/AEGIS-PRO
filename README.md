# AegisPro v2.0 — Cybersecurity Career Academy (5 Specializations)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
![Platform](https://img.shields.io/badge/Platform-Web-blue)
![Firebase](https://img.shields.io/badge/Database-Firestore%20Offline--First-FFA611)
![Tracks](https://img.shields.io/badge/Career%20Tracks-5%20Elite%20Domains-0284c7)
![Vouchers](https://img.shields.io/badge/Free%20Vouchers-100%25%20Verified-10b981)
![UI Architecture](https://img.shields.io/badge/Theme-Warm%20Champagne%20%26%20Zero--Blur-F7E7CE)
![License](https://img.shields.io/badge/License-MIT-green)

A production-ready interactive cybersecurity learning academy and career accelerator covering 5 elite specializations based on the industry-standard blueprint:
1. **Cyber Defense & Analysis (Blue Team / SOC)**: SOC Analyst L1-L3, Incident Response, Threat Hunting, Detection-as-Code (Sigma), and SOC Operations.
2. **Offensive Security (Red Team / Pentesting)**: Network & Web Pentesting, Active Directory exploitation (BloodHound), EDR evasion, and Exploit Dev.
3. **Security Engineering & Architecture (DevSecOps)**: Cloud infrastructure (AWS), Terraform IaC, Container security (K8s/Docker), and CI/CD security pipelines.
4. **Governance, Risk & Compliance (GRC)**: NIST CSF 2.0, ISO 27001, SOC 2, HIPAA, PCI DSS v4.0, vendor risk assessments, and CISO leadership.
5. **AI & Emerging Cyber Security**: Securing Generative AI, OWASP LLM Top 10, prompt injection defenses, automated red-teaming (Garak, PyRIT), and model guardrails (NeMo).

---

## 🌟 Architecture & Features

- **5 Dedicated Career Specializations**: Switch seamlessly between Blue Team, Red Team, DevSecOps, GRC, and AI Security with dynamic syllabus, phase objectives, and roadmaps.
- **Free Certification Vouchers Portal**: Direct access to verified 100% free exam vouchers and university academic alliance programs (Splunk, ISC2 1M campaign, Linux Foundation LFD121, Fortinet, Microsoft, Cisco NetAcad, AWS Skill Builder).
- **Interactive Career Decision Tree**: Step-by-step pathfinder quiz guiding beginners to the exact cybersecurity domain matching their innate strengths, plus recommended free starting stacks.
- **Unified Security Arsenal**: Curated directory of 40+ open-source and enterprise tools with instant filtering by domain and verified documentation links.
- **Interactive Certification Tracker**: Plan, target, and track credentials across all 5 roles with instant visual progress and sound feedback.
- **Cross-Domain Deep Search**: Instant global search across all 5 career tracks, 80 curriculum modules, tools, and free voucher programs with deep linking.
- **Bidirectional Union Cloud Sync**: Seamlessly synchronizes progress between desktop, tablet, and mobile devices via Google Cloud Firestore with real-time `onSnapshot` listeners and local conflict resolution.
- **Offline-First Resilience**: Full IndexedDB offline persistence (`db.enablePersistence`) allows users to study with zero network connectivity; progress queues locally and syncs automatically upon reconnecting.
- **Champagne & Slate Design System**: Human-crafted visual palette featuring warm Champagne (`#F7E7CE`) accents, natural paper cards, and soft charcoal dark mode.
- **Zero-Blur Standard**: 100% free of CPU/GPU-heavy `backdrop-filter: blur(...)` and SVG `feGaussianBlur` filters for instantaneous rendering and buttery 60fps frame rates.
- **Client-Side URL Routing**: Preserves deep views (e.g. `/dashboard.html#vouchers` or `/dashboard.html#pathfinder`) across page refreshes and direct link sharing.
- **Battery-Friendly Throttling**: All background 3D canvas particles and perspective tilt loops automatically pause when the tab is backgrounded or when `prefers-reduced-motion` is active.

---

## 📂 Project Structure

```
AegisPro/
├── dashboard.html          # Main interactive learning workspace & bento grid
├── index.html              # Secure user authentication portal
├── register.html           # Account registration portal
├── forgot-password.html    # Self-service password recovery
├── style.css               # StudyFlow master stylesheet & Champagne design tokens
├── app.js                  # Core application engine, routing, & calculation tools
├── firebase-auth.js        # Real-time sync engine & Firebase Auth integration
├── firestore.rules         # Hardened database security rules
├── firestore.indexes.json  # Cloud Firestore composite indexes
├── vercel.json             # Vercel routing, clean URLs, and security headers
└── .gitignore              # Standard version control exclusion rules
```

---

## 🚀 One-Click Deployment to Vercel

1. Push this repository to **GitHub**.
2. Go to [Vercel Dashboard](https://vercel.com) and click **"Add New..." > "Project"**.
3. Import your `AegisPro` repository.
4. Framework Preset: Select **"Other"** (Plain HTML/JS static site).
5. Click **"Deploy"**.

### ⚠️ IMPORTANT: Firebase Authorized Domains Configuration
For Firebase Authentication (Email/Password & Google Sign-In) to operate on your live Vercel domain:
1. Open your [Firebase Console](https://console.firebase.google.com/).
2. Navigate to **Build > Authentication > Settings > Authorized domains**.
3. Click **"Add domain"** and enter your Vercel URL (e.g., `your-project-name.vercel.app`).

---

## 💻 Local Development

Run the lightweight local development server:

```powershell
# Using Python
python -m http.server 8080

# Or using Node.js (npx)
npx serve .
```

Then visit `http://localhost:8080` in your web browser.

---

## 🔒 Security & Headers

The repository includes a hardened `vercel.json` configured with:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- Strict Content Security Policy (CSP) allowing Google Auth and Firebase APIs.

---

## 📄 License
MIT License. Free for educational and personal learning use.
