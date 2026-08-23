# Contributing to RefX

Thank you for contributing to RefX! RefX is an open-source, community-verified directory of referral programs, welcome rewards, student offers, and SaaS credits in India.

## Contribution Paths

### 1. Adding a New Referral Program via GitHub (Recommended)
1. **Fork** the repository and create a new feature branch.
2. **Create a Markdown file** under `referrals/<category>/<subcategory>/<slug>.md`.
3. Fill in all required frontmatter according to `schema/referral.schema.json`.
4. Validate official terms from the company's verified domain.
5. Run the local validation suite:
   ```bash
   npm run pipeline
   ```
6. Open a **Pull Request** with a summary and link to terms.

### 2. Updating an Existing Referral
If a reward amount, eligibility requirement, or promo code changed:
- Edit the corresponding `.md` file.
- Update `last_verified` to today's date (`YYYY-MM-DD`).
- Run `npm run pipeline` and submit a PR.

### 3. Submission via the Web Portal
Non-technical contributors can use the RefX web application at `/submit` to prepare a submission. The submission is queued for moderator review and converted into a GitHub pull request.

---

## Contribution Rules & Safety

> [!CAUTION]
> **Prohibited Content:**
> - Fabricated or non-existent referral rewards.
> - Malicious phishing links or unofficial URL shorteners.
> - Private personal referral codes where terms forbid public sharing.
> - Multi-level marketing (MLM) schemes or unregistered financial advisory links.
