import fs from 'node:fs';
import path from 'node:path';

console.log('⚡ [Refersleet API Generator] Generating production-ready API summary stats and public feeds...');

const referrals = JSON.parse(fs.readFileSync(path.resolve('generated/referrals.json'), 'utf-8'));
const categories = JSON.parse(fs.readFileSync(path.resolve('generated/categories.json'), 'utf-8'));
const contributors = JSON.parse(fs.readFileSync(path.resolve('generated/contributors.json'), 'utf-8'));

// Sanitize public referrals
const publicReferrals = referrals.map((r: any) => ({
  id: r.id,
  name: r.name,
  slug: r.slug,
  status: r.status,
  category: r.category,
  subcategories: r.subcategories || [],
  country: r.country,
  official_website: r.official_website,
  reward: r.reward,
  eligibility: r.eligibility,
  requirements: r.requirements,
  terms_url: r.terms_url,
  submitted_by: {
    username: r.submitted_by?.username,
    display_name: r.submitted_by?.display_name,
    avatar: r.submitted_by?.avatar
  },
  submitted_at: r.submitted_at,
  last_verified: r.last_verified,
  verification: r.verification,
  tags: r.tags,
  screenshots: r.screenshots || [],
  description: r.description
}));

fs.writeFileSync(path.resolve('generated/public-referrals.json'), JSON.stringify(publicReferrals, null, 2));

// Calculate stats
const stats = {
  total_referrals: referrals.length,
  active_referrals: referrals.filter((r: any) => r.status === 'active').length,
  total_categories: categories.length,
  total_contributors: contributors.length,
  total_verifications: referrals.reduce((sum: number, r: any) => sum + (r.verification?.working_votes || 0) + (r.verification?.not_working_votes || 0), 0),
  average_confidence: Math.round(referrals.reduce((sum: number, r: any) => sum + (r.verification?.confidence || 0), 0) / referrals.length),
  last_synced_at: new Date().toISOString()
};

fs.writeFileSync(path.resolve('generated/stats.json'), JSON.stringify(stats, null, 2));

// Also copy to website/public/api for direct HTTP fetching
const publicApiDir = path.resolve('website/public/api');
if (!fs.existsSync(publicApiDir)) {
  fs.mkdirSync(publicApiDir, { recursive: true });
}
fs.writeFileSync(path.join(publicApiDir, 'referrals.json'), JSON.stringify(publicReferrals, null, 2));
fs.writeFileSync(path.join(publicApiDir, 'public-referrals.json'), JSON.stringify(publicReferrals, null, 2));
fs.writeFileSync(path.join(publicApiDir, 'categories.json'), JSON.stringify(categories, null, 2));
fs.writeFileSync(path.join(publicApiDir, 'contributors.json'), JSON.stringify(contributors, null, 2));
fs.writeFileSync(path.join(publicApiDir, 'stats.json'), JSON.stringify(stats, null, 2));

// Generate RSS 2.0 Feed
const rssItems = referrals.map((r: any) => `    <item>
      <title><![CDATA[${r.name}: ${r.reward.referred_user}]]></title>
      <link>https://saketkesar.github.io/refersleet/#/referrals/${r.slug}</link>
      <guid>https://saketkesar.github.io/refersleet/#/referrals/${r.slug}</guid>
      <pubDate>${new Date(r.submitted_at).toUTCString()}</pubDate>
      <description><![CDATA[${r.reward.description}]]></description>
      <category>${r.category[0] || 'General'}</category>
    </item>`).join('\n');

const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Refersleet — Verified Referral & Reward Feed</title>
    <link>https://saketkesar.github.io/refersleet/</link>
    <description>Latest community-verified referral offers, AI compute credits, and coupon rewards.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://saketkesar.github.io/refersleet/rss.xml" rel="self" type="application/rss+xml" />
${rssItems}
  </channel>
</rss>`;

fs.writeFileSync(path.resolve('generated/rss.xml'), rssXml);
fs.writeFileSync(path.resolve('website/public/rss.xml'), rssXml);

console.log(`✓ Generated generated/ & website/public/api/:`, stats);
console.log('✓ Generated website/public/rss.xml feed for aggregators');
console.log('✨ All Refersleet API data successfully compiled!');
