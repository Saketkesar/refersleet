# RefX Community Verification Engine

RefX employs a weighted community verification model rather than simple upvote/downvote counting.

## Confidence Levels

| Confidence Score | Status Level | Badge Color | Description |
|---|---|---|---|
| **95% – 100%** | Highly Verified | Emerald Green | High volume of recent positive confirmations and maintainer verified |
| **85% – 94%** | Verified | Green | Consistently working with minimal failure reports |
| **70% – 84%** | Mostly Verified | Amber | Generally functional; some users reporting edge-case conditions |
| **50% – 69%** | Needs Verification | Orange | Low verification volume or older referral requiring re-check |
| **< 50%** | Questionable / Stale | Red | Multiple failed reports or rewards discontinued |

## Anti-Abuse Controls
- Self-voting prevention: Contributors cannot boost confidence on their own submissions.
- Time-decay: Referrals without verification activity decay towards "Needs Verification" after 90 days.
- Rapid report triggers: A sudden influx of "Not Working" reports temporarily flags the entry for maintainer triage.
