# Contributing to Refersleet

Thank you for contributing to Refersleet! Refersleet is an open-source, community-verified directory of referral programs, coupon extensions, and developer API credits.

## Contribution Guidelines

### 1. Web Form Submission (Recommended)
- Visit **[saketkesar.github.io/refersleet/#/submit](https://saketkesar.github.io/refersleet/#/submit)** to fill in the program details.
- Click **"Copy for GitHub PR"** to get pre-formatted, schema-validated Markdown.
- Paste it into a new file in `referrals/<category>/<subcategory>/<program>.md` and open a Pull Request.

### 2. Manual PR Submission
1. Fork the repository on GitHub.
2. Create a markdown file in `referrals/<category>/<subcategory>/<program>.md`.
3. Fill in the YAML frontmatter with company details, logo URL, and reward perks.
4. Run `npm run pipeline` to validate.
5. Open a Pull Request.
