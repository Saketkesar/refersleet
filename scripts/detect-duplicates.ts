import fs from 'node:fs';
import matter from 'gray-matter';
import { globSync } from 'glob';

console.log('🔍 [RefX Duplicate Detector] Checking for duplicate identifiers...');

const referralFiles = globSync('referrals/**/*.md');
const ids = new Map<string, string>();
const slugs = new Map<string, string>();
const redirectSlugs = new Map<string, string>();

let hasDuplicates = false;

for (const file of referralFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const parsed = matter(content);
  const data = parsed.data;

  // Check ID
  if (ids.has(data.id)) {
    console.error(`❌ Duplicate ID "${data.id}" found in:\n  - ${ids.get(data.id)}\n  - ${file}`);
    hasDuplicates = true;
  } else {
    ids.set(data.id, file);
  }

  // Check slug
  if (slugs.has(data.slug)) {
    console.error(`❌ Duplicate slug "${data.slug}" found in:\n  - ${slugs.get(data.slug)}\n  - ${file}`);
    hasDuplicates = true;
  } else {
    slugs.set(data.slug, file);
  }

  // Check redirect slug
  if (data.refx?.redirect_slug) {
    if (redirectSlugs.has(data.refx.redirect_slug)) {
      console.error(`❌ Duplicate redirect slug "${data.refx.redirect_slug}" found in:\n  - ${redirectSlugs.get(data.refx.redirect_slug)}\n  - ${file}`);
      hasDuplicates = true;
    } else {
      redirectSlugs.set(data.refx.redirect_slug, file);
    }
  }
}

if (hasDuplicates) {
  console.error('\n❌ Duplicate check failed.');
  process.exit(1);
} else {
  console.log(`✨ Checked ${referralFiles.length} files. Zero duplicates detected!`);
}
