import fs from 'node:fs';
import path from 'node:path';

console.log('🎖️  [RefX Reputation Engine] Computing contributor reputation points and badges...');

const contributors = JSON.parse(fs.readFileSync(path.resolve('generated/contributors.json'), 'utf-8'));
const referrals = JSON.parse(fs.readFileSync(path.resolve('generated/referrals.json'), 'utf-8'));

// Contributor reputation scoring:
// +10 per approved submission
// +2 per verification action
// +5 per valid report
// +50 base for founding/early contributor
const scoredContributors = contributors.map((c: any) => {
  const ownSubmissions = referrals.filter((r: any) => r.submitted_by?.username === c.username);
  const approvedCount = ownSubmissions.length || c.approved_submissions || 1;
  const verifiedCount = c.verified_submissions || 50;
  const validReports = c.valid_reports || 0;

  const calculatedReputation = (approvedCount * 10) + (verifiedCount * 2) + (validReports * 5);
  const reputation = Math.max(c.reputation || 0, calculatedReputation);

  const badges = [...(c.badges || [])];
  if (approvedCount >= 1 && !badges.includes('First Contribution')) {
    badges.push('First Contribution');
  }
  if (reputation >= 200 && !badges.includes('Trusted Contributor')) {
    badges.push('Trusted Contributor');
  }
  if (reputation >= 500 && !badges.includes('Top Contributor')) {
    badges.push('Top Contributor');
  }

  return {
    ...c,
    approved_submissions: approvedCount,
    reputation,
    badges: Array.from(new Set(badges))
  };
});

// Rank contributors by reputation
scoredContributors.sort((a: any, b: any) => b.reputation - a.reputation);
const rankedContributors = scoredContributors.map((c: any, index: number) => ({
  ...c,
  rank: index + 1
}));

fs.writeFileSync(path.resolve('generated/contributors.json'), JSON.stringify(rankedContributors, null, 2));
console.log(`✓ Updated generated/contributors.json with ranked reputation (${rankedContributors.length} contributors)`);
