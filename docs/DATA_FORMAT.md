# Refersleet Referral Data Format

Every referral in Refersleet is stored as a Markdown file with strict YAML frontmatter:

```yaml
---
id: program-slug
name: Company Name
slug: program-slug
status: active
category:
  - shopping
reward:
  referrer: Referrer Perk
  referred_user: User Reward
  type: dual_sided
  description: Overview of reward perk
official_website: https://example.com
terms_url: https://example.com/terms
submitted_by:
  username: contributor
  display_name: Contributor Name
  avatar: https://avatars.githubusercontent.com/...
submitted_at: 2026-08-23
last_verified: 2026-08-23
verification:
  status: community-verified
  working_votes: 10
  not_working_votes: 0
  reward_changed_votes: 0
  confidence: 100
tags:
  - shopping
screenshots:
  - https://example.com/logo.png
description: |
  Program description
refx:
  redirect_slug: program-slug
  disclosure_required: true
  destination_url: https://example.com/ref/invite
---
```
