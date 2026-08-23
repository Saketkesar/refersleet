import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { globSync } from 'glob';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const referralSchema = JSON.parse(
  fs.readFileSync(path.resolve('schema/referral.schema.json'), 'utf-8')
);
const validateReferral = ajv.compile(referralSchema);

const categorySchema = JSON.parse(
  fs.readFileSync(path.resolve('schema/category.schema.json'), 'utf-8')
);
const validateCategory = ajv.compile(categorySchema);

const contributorSchema = JSON.parse(
  fs.readFileSync(path.resolve('schema/contributor.schema.json'), 'utf-8')
);
const validateContributor = ajv.compile(contributorSchema);

function normalizeData(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  if (obj instanceof Date) {
    return obj.toISOString().split('T')[0];
  }
  if (Array.isArray(obj)) {
    return obj.map(normalizeData);
  }
  if (typeof obj === 'object') {
    const res: any = {};
    for (const key of Object.keys(obj)) {
      res[key] = normalizeData(obj[key]);
    }
    return res;
  }
  return obj;
}

console.log('🔍 [RefX Validator] Starting validation of Markdown files...');

let hasErrors = false;

// 1. Validate Category Markdown files
const categoryFiles = globSync('categories/*.md');
console.log(`📁 Validating ${categoryFiles.length} category files...`);
for (const file of categoryFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const parsed = matter(content);
  const data = normalizeData(parsed.data);
  const valid = validateCategory(data);
  if (!valid) {
    console.error(`❌ Validation failed for category ${file}:`, validateCategory.errors);
    hasErrors = true;
  } else {
    console.log(`  ✓ ${file} [OK]`);
  }
}

// 2. Validate Referral Markdown files
const referralFiles = globSync('referrals/**/*.md');
console.log(`\n🎁 Validating ${referralFiles.length} referral files...`);
for (const file of referralFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const parsed = matter(content);
  const data = normalizeData({
    ...parsed.data,
    description: parsed.data.description || parsed.content
  });
  const valid = validateReferral(data);
  if (!valid) {
    console.error(`❌ Validation failed for referral ${file}:`, validateReferral.errors);
    hasErrors = true;
  } else {
    console.log(`  ✓ ${file} (${data.name}) [OK]`);
  }
}

// 3. Validate Contributor Markdown files
const contributorFiles = globSync('contributors/*.md').filter(f => !f.endsWith('README.md'));
console.log(`\n👥 Validating ${contributorFiles.length} contributor files...`);
for (const file of contributorFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const parsed = matter(content);
  const data = normalizeData(parsed.data);
  const valid = validateContributor(data);
  if (!valid) {
    console.error(`❌ Validation failed for contributor ${file}:`, validateContributor.errors);
    hasErrors = true;
  } else {
    console.log(`  ✓ ${file} (@${data.username}) [OK]`);
  }
}

if (hasErrors) {
  console.error('\n❌ Refersleet validation encountered errors.');
  process.exit(1);
} else {
  console.log('\n✨ All Refersleet files successfully validated against JSON schemas!');
}
