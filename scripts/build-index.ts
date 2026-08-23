import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { globSync } from 'glob';

console.log('🏗️  [RefX Indexer] Compiling Markdown into structured JSON indexes...');

fs.mkdirSync(path.resolve('generated'), { recursive: true });

function normalizeDates(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  if (obj instanceof Date) {
    return obj.toISOString().split('T')[0];
  }
  if (Array.isArray(obj)) {
    return obj.map(normalizeDates);
  }
  if (typeof obj === 'object') {
    const res: any = {};
    for (const key of Object.keys(obj)) {
      res[key] = normalizeDates(obj[key]);
    }
    return res;
  }
  return obj;
}

// 1. Build Categories Index
const categoryFiles = globSync('categories/*.md');
const categories = categoryFiles.map(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const parsed = matter(content);
  return {
    ...normalizeDates(parsed.data),
    markdown_content: parsed.content.trim()
  };
});
fs.writeFileSync(path.resolve('generated/categories.json'), JSON.stringify(categories, null, 2));
console.log(`✓ Generated generated/categories.json (${categories.length} categories)`);

// 2. Build Referrals Index
const referralFiles = globSync('referrals/**/*.md');
const referrals = referralFiles.map(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const parsed = matter(content);
  const data = normalizeDates(parsed.data);
  const totalVotes = (data.verification?.working_votes || 0) + (data.verification?.not_working_votes || 0);
  const confidence = totalVotes > 0
    ? Math.round((data.verification.working_votes / totalVotes) * 100)
    : 80;

  return {
    ...data,
    verification: {
      ...data.verification,
      confidence: data.verification?.confidence || confidence
    },
    markdown_content: parsed.content.trim(),
    source_file: file,
    refx_url: `https://refx.in/r/${data.refx?.redirect_slug || data.slug}`
  };
});
fs.writeFileSync(path.resolve('generated/referrals.json'), JSON.stringify(referrals, null, 2));
console.log(`✓ Generated generated/referrals.json (${referrals.length} referrals)`);

// 3. Build Contributors Index
const contributorFiles = globSync('contributors/*.md').filter(f => !f.endsWith('README.md'));
const contributors = contributorFiles.map(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const parsed = matter(content);
  return {
    ...normalizeDates(parsed.data),
    markdown_content: parsed.content.trim(),
    source_file: file
  };
});
fs.writeFileSync(path.resolve('generated/contributors.json'), JSON.stringify(contributors, null, 2));
console.log(`✓ Generated generated/contributors.json (${contributors.length} contributors)`);

console.log('✨ Data indexes compiled successfully!');
