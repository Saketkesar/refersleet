# RefX Referral Data Format

Every referral in RefX is stored as a Markdown file with strict YAML frontmatter.

## Frontmatter Fields

| Field | Type | Description |
|---|---|---|
| `id` | String | Unique kebab-case identifier (e.g. `cred`, `zerodha`) |
| `name` | String | Official company / product name |
| `slug` | String | URL-safe slug for web routes |
| `status` | Enum | `active`, `expired`, `pending`, `flagged` |
| `category` | Array | Main category ID (e.g. `finance`, `technology`) |
| `subcategories` | Array | Subcategory IDs (e.g. `credit-cards`, `investing`) |
| `country` | Array | Supported ISO country codes (e.g. `['IN']`) |
| `official_website` | URL | Verified root website of the service |
| `reward` | Object | Referrer payout, referred user reward, and reward type |
| `eligibility` | Array | Bullet points on user qualifications (e.g. KYC, CIBIL) |
| `requirements` | Array | Exact step-by-step actions required to receive reward |
| `terms_url` | URL | Link to official terms and conditions |
| `submitted_by` | Object | Contributor username and display name |
| `submitted_at` | Date | Date added in `YYYY-MM-DD` |
| `last_verified` | Date | Date last validated by community or maintainer |
| `verification` | Object | Votes breakdown (`working_votes`, `not_working_votes`) |
| `tags` | Array | Search tags (`cashback`, `student`, `no-KYC`, `upi`) |
| `refx` | Object | Outbound redirect configuration and tracking metadata |

## Markdown Body Content

The Markdown body below the frontmatter contains:
- Background overview of the service.
- Detailed step-by-step claiming guide.
- Common gotchas, payout timelines, and exclusion criteria.
