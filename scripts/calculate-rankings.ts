import fs from 'node:fs';
import path from 'node:path';

console.log('📊 [Refersleet Rankings] Calculating trending, trusted, and top reward rankings...');

const referrals = JSON.parse(fs.readFileSync(path.resolve('generated/referrals.json'), 'utf-8'));
const contributors = JSON.parse(fs.readFileSync(path.resolve('generated/contributors.json'), 'utf-8'));

// Calculate weighted score for each referral
const scoredReferrals = referrals.map((ref: any) => {
  const confidence = ref.verification?.confidence || 75;
  const votes = (ref.verification?.working_votes || 0) + (ref.verification?.not_working_votes || 0);
  const isFeatured = ref.refx?.featured ? 15 : 0;
  
  // Calculate synthetic rank metrics
  const verificationScore = Math.min(votes * 0.5, 30);
  const confidenceScore = (confidence / 100) * 40;
  const trendingScore = Math.round(confidenceScore + verificationScore + isFeatured + Math.random() * 5);

  return {
    ...ref,
    scores: {
      confidence,
      votes,
      trending_score: trendingScore
    }
  };
});

// 1. Trending Referrals
const trending = [...scoredReferrals].sort((a, b) => b.scores.trending_score - a.scores.trending_score);

// 2. Highest Confidence / Most Trusted
const mostTrusted = [...scoredReferrals].sort((a, b) => {
  if (b.scores.confidence === a.scores.confidence) {
    return b.scores.votes - a.scores.votes;
  }
  return b.scores.confidence - a.scores.confidence;
});

// 3. Recently Verified / Newest
const newest = [...scoredReferrals].sort((a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime());

const rankings = {
  calculated_at: new Date().toISOString(),
  total_referrals: referrals.length,
  trending: trending.map(r => ({ id: r.id, slug: r.slug, name: r.name, category: r.category, reward: r.reward, confidence: r.scores.confidence })),
  most_trusted: mostTrusted.map(r => ({ id: r.id, slug: r.slug, name: r.name, category: r.category, confidence: r.scores.confidence, votes: r.scores.votes })),
  newest: newest.map(r => ({ id: r.id, slug: r.slug, name: r.name, submitted_at: r.submitted_at }))
};

fs.writeFileSync(path.resolve('generated/rankings.json'), JSON.stringify(rankings, null, 2));
console.log('✓ Generated generated/rankings.json');
