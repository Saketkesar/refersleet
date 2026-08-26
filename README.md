<p align="center">
  <img src="website/public/logo.png" alt="Refersleet Logo" width="280" />
</p>

<p align="center">
  <strong>An open-source directory of community-verified referral programs, AI developer compute credits, coupon finders, and cashback rewards.</strong>
</p>

<p align="center">
  <a href="https://saketkesar.github.io/refersleet/">🌐 Live Directory</a> •
  <a href="https://saketkesar.github.io/refersleet/#/explore">📂 Explore All (8)</a> •
  <a href="https://saketkesar.github.io/refersleet/#/api-docs">⚡ Public JSON Feeds</a> •
  <a href="https://saketkesar.github.io/refersleet/#/submit">➕ Submit Referral</a> •
  <a href="llms.txt">🤖 LLM Docs (llms.txt)</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Verified_Programs-8-orange.svg?style=flat-square" alt="Verified Programs" />
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="MIT License" />
  <img src="https://img.shields.io/badge/Zero_Ads-Guaranteed-emerald.svg?style=flat-square" alt="Zero Ads" />
  <img src="https://img.shields.io/badge/API-GitHub_CDN_Feed-purple.svg?style=flat-square" alt="API Feed" />
</p>

---

## ⚡ Overview

**Refersleet** is a clean, transparent, and open-source directory curated to replace broken, spammy coupon aggregators. Every program is tested for active reward terms, transparent requirements, and dual-sided benefits (both the user and referrer get rewarded).

All data is stored directly in Git-tracked Markdown files and distributed via high-speed global GitHub CDN feeds.

---

## 🎁 Verified Programs (2026)

| Program | Category | User Reward | Referrer Bonus | Type | Link |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Agent Router** | AI / Developer | **$50.00 AI Compute Credits** | $150.00 Credits | Dual-Sided | [Claim $50](https://agentrouter.org) |
| **FamApp by FamPay** | Finance / UPI | **₹20 Instant FamCash** | ₹20 FamCash | Dual-Sided | [Claim ₹20](https://get.fampay.in/SAKE6QP6F-100L) |
| **Honey by PayPal** | Shopping / Coupons | **500 Honey Gold (₹500 / $5 Card)** | 500 Honey Gold | Dual-Sided | [Claim Gold](https://joinhoney.com/ref/odbpdid) |
| **Buyhatke** | Shopping / Gift Cards | **Brand Gift Card Discounts** | Sales Commissions | Sale Reward (CPS) | [Claim Deals](https://buyhatke.com/gift-cards/referral) |
| **Pawns.app** | Passive Income / Bandwidth | **$3 Starter Bonus ($1 x 3 payouts)** | $3 + 10% Share | Dual-Sided | [Claim $3](https://discoverpawns.eu/11436209) |
| **PollPe** | Lifestyle / Surveys | **₹10 Free Instant Coins (STABLERSLEET)** | 100 Coins (₹10) | Dual-Sided | [Claim ₹10](https://pollpe.app/r/STABLERSLEET) |
| **AttaPoll** | Lifestyle / Paid Surveys | **Welcome Bonus + Paid Surveys** | 10% Earnings | Dual-Sided | [Claim Bonus](https://attapoll.app/join/fzckw) |
| **Rooter** | Gaming / Esports | **₹100 Bonus Coins & Diamonds** | Up to ₹100 | Lead Reward (CPL) | [Claim ₹100](https://rooter.app.link/0JMA1JuSS5b) |

---

## 🚀 Public Data Feeds & Developer API

Refersleet data is 100% free and accessible via static JSON feeds hosted on GitHub:

```javascript
// Fetch all active verified referral offers in JavaScript
const response = await fetch(
  "https://raw.githubusercontent.com/Saketkesar/refersleet/main/generated/referrals.json"
);
const programs = await response.json();
console.log(programs);
```

- **Referrals JSON**: `https://raw.githubusercontent.com/Saketkesar/refersleet/main/generated/referrals.json`
- **Categories JSON**: `https://raw.githubusercontent.com/Saketkesar/refersleet/main/generated/categories.json`
- **Platform Stats JSON**: `https://raw.githubusercontent.com/Saketkesar/refersleet/main/generated/stats.json`
- **OpenAPI 3.0 Spec**: [`api/openapi.yaml`](api/openapi.yaml)
- **AI & LLM Guide**: [`llms.txt`](llms.txt)

---

## ✍️ How to Submit a Program

1. **Web Form**: Go to **[saketkesar.github.io/refersleet/#/submit](https://saketkesar.github.io/refersleet/#/submit)** and click **"Copy for GitHub PR"**.
2. **Pull Request**: Add a Markdown file in `referrals/<category>/<subcategory>/<program>.md` and submit a PR.
3. Every pull request is automatically validated against JSON Schemas on GitHub Actions.

---

## 👨‍💻 Maintainer

Created and maintained with ❤️ by [Saket Kesar](https://github.com/Saketkesar).

## 📄 License

Open-source licensed under the [MIT License](LICENSE).
