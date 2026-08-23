import fs from 'node:fs';
import matter from 'gray-matter';
import { globSync } from 'glob';

console.log('🔗 [RefX Link Checker] Checking URL formats and domain safety...');

const referralFiles = globSync('referrals/**/*.md');
let hasErrors = false;

for (const file of referralFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const parsed = matter(content);
  const data = parsed.data;

  // 1. Check official website URL
  try {
    const officialUrl = new URL(data.official_website);
    if (!['http:', 'https:'].includes(officialUrl.protocol)) {
      console.error(`❌ [${file}] Invalid protocol in official_website: ${data.official_website}`);
      hasErrors = true;
    }
  } catch (e) {
    console.error(`❌ [${file}] Invalid official_website URL: ${data.official_website}`);
    hasErrors = true;
  }

  // 2. Check terms URL
  try {
    const termsUrl = new URL(data.terms_url);
    if (!['http:', 'https:'].includes(termsUrl.protocol)) {
      console.error(`❌ [${file}] Invalid protocol in terms_url: ${data.terms_url}`);
      hasErrors = true;
    }
  } catch (e) {
    console.error(`❌ [${file}] Invalid terms_url: ${data.terms_url}`);
    hasErrors = true;
  }

  // 3. Safe redirect destination check
  if (data.refx?.destination_url) {
    try {
      const destUrl = new URL(data.refx.destination_url);
      if (!['http:', 'https:'].includes(destUrl.protocol)) {
        console.error(`❌ [${file}] Invalid protocol in destination_url: ${data.refx.destination_url}`);
        hasErrors = true;
      }
    } catch (e) {
      console.error(`❌ [${file}] Invalid destination_url: ${data.refx.destination_url}`);
      hasErrors = true;
    }
  }
}

if (hasErrors) {
  console.error('\n❌ Link validation encountered errors.');
  process.exit(1);
} else {
  console.log('✨ All links and domains passed safety and format checks!');
}
