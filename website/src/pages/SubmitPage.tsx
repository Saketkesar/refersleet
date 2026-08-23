import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Check, Mail, ExternalLink, Send, ArrowRight } from 'lucide-react';

export const SubmitPage: React.FC = () => {
  // Program Details
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('shopping');
  const [rewardType, setRewardType] = useState('dual_sided');
  const [officialWebsite, setOfficialWebsite] = useState('');
  const [destinationUrl, setDestinationUrl] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  
  // Reward Details
  const [referrerReward, setReferrerReward] = useState('');
  const [referredUserReward, setReferredUserReward] = useState('');
  const [rewardDescription, setRewardDescription] = useState('');
  const [howItWorks, setHowItWorks] = useState('');

  // Contributor Details
  const [contributorName, setContributorName] = useState('');
  const [contributorGithub, setContributorGithub] = useState('');
  const [contributorAvatar, setContributorAvatar] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleNameChange = (val: string) => {
    setName(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
  };

  const getRewardTypeLabel = (type: string) => {
    switch (type) {
      case 'sale_reward_cps': return 'Sale reward (CPS)';
      case 'lead_reward_cpl': return 'Lead reward (CPL)';
      case 'click_reward_cpc': return 'Click reward (CPC)';
      case 'dual_sided': return 'Dual-sided incentives';
      default: return type;
    }
  };

  const generatedMarkdown = `---
id: ${slug || 'company-slug'}
name: ${name || 'Company Name'}
slug: ${slug || 'company-slug'}
status: active
category:
  - ${category}
official_website: ${officialWebsite || 'https://example.com'}
reward:
  referrer: "${referrerReward || 'Referrer reward'}"
  referred_user: "${referredUserReward || 'User reward'}"
  type: ${rewardType}
  description: "${rewardDescription || 'Overview of reward perk'}"
terms_url: ${officialWebsite || 'https://example.com'}
submitted_by:
  username: ${(contributorGithub ? contributorGithub.split('/').filter(Boolean).pop() : '') || 'contributor'}
  display_name: ${contributorName || 'Contributor Name'}
  avatar: ${contributorAvatar || 'https://avatars.githubusercontent.com/u/93246904?v=4'}
submitted_at: ${new Date().toISOString().split('T')[0]}
last_verified: ${new Date().toISOString().split('T')[0]}
verification:
  status: community-verified
  working_votes: 1
  not_working_votes: 0
  reward_changed_votes: 0
  confidence: 100
tags:
  - ${category}
  - ${rewardType.replace(/_/g, '-')}
screenshots:
  - ${logoUrl || 'https://example.com/logo.png'}
description: |
  ${rewardDescription || name}
redirect:
  redirect_slug: ${slug || 'company-slug'}
  disclosure_required: true
  featured: false
  destination_url: ${destinationUrl || officialWebsite || 'https://example.com'}
---

# ${name || 'Company Name'} Referral Program

${rewardDescription || 'Program description'}

### How to Claim:
${howItWorks || '1. Sign up via referral link\n2. Complete first qualifying action\n3. Receive bonus rewards'}
`;

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generatedMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !destinationUrl.trim() || !contributorName.trim()) return;

    const emailTo = 'kesarsaket607@gmail.com';
    const emailSubject = `[Refersleet Submission] New Referral: ${name} (${getRewardTypeLabel(rewardType)})`;
    const emailBody = `Hey Saket,

Here is a new referral program submission for Refersleet:

------------------------------------
PROGRAM DETAILS
------------------------------------
• Company Name: ${name}
• Referral / Invite Link: ${destinationUrl}
• Official Website: ${officialWebsite}
• Program Logo URL: ${logoUrl || 'N/A'}
• Category: ${category}
• Reward Type: ${getRewardTypeLabel(rewardType)}

------------------------------------
REWARD TERMS
------------------------------------
• User Reward: ${referredUserReward}
• Referrer Perk: ${referrerReward}
• Reward Description: ${rewardDescription}
• How It Works / Steps:
${howItWorks}

------------------------------------
CONTRIBUTOR INFORMATION
------------------------------------
• Contributor Name: ${contributorName}
• GitHub / Profile URL: ${contributorGithub || 'N/A'}
• Profile Avatar (PFP) URL: ${contributorAvatar || 'N/A'}

------------------------------------
MARKDOWN CONTENT:
------------------------------------
${generatedMarkdown}
`;

    const mailtoUrl = `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 bg-white">
      
      {/* Header */}
      <div>
        <div className="text-xs text-stone-400 font-mono mb-1">
          refersleet / submit
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 font-heading">
          Submit a Referral Program
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Add an active referral offer or reward model. Your submission will be emailed to <strong className="text-stone-800 font-mono">kesarsaket607@gmail.com</strong> for verification and published to the directory.
        </p>
      </div>

      {submitted ? (
        <div className="p-8 bg-white rounded-xl border border-stone-200 text-center space-y-4 shadow-2xs">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
            <Check className="w-6 h-6" />
          </div>
          
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-stone-900">Email Draft Created!</h2>
            <p className="text-xs text-stone-600 max-w-md mx-auto">
              Your email client was opened to send the details directly to <strong className="text-stone-800">kesarsaket607@gmail.com</strong>.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleCopyMarkdown}
              className="notion-btn-white px-4 py-2 text-xs font-semibold inline-flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Markdown' : 'Copy Markdown for GitHub PR'}</span>
            </button>

            <button
              onClick={() => setSubmitted(false)}
              className="notion-btn-orange px-4 py-2 text-xs font-semibold"
            >
              Submit Another Program
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Form Column */}
          <form onSubmit={handleEmailSubmit} className="lg:col-span-7 space-y-5">
            
            {/* Contributor Profile */}
            <div className="p-5 bg-white rounded-xl border border-stone-200 space-y-3 shadow-2xs">
              <h3 className="text-xs font-bold text-stone-400 uppercase font-mono tracking-wider">
                1. Your Contributor Details
              </h3>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={contributorName}
                  onChange={(e) => setContributorName(e.target.value)}
                  placeholder="e.g. Saket Kesar"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-md text-xs focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    GitHub or Profile URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={contributorGithub}
                    onChange={(e) => setContributorGithub(e.target.value)}
                    placeholder="https://github.com/Saketkesar"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-md text-xs focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Your Avatar / PFP Image URL
                  </label>
                  <input
                    type="url"
                    value={contributorAvatar}
                    onChange={(e) => setContributorAvatar(e.target.value)}
                    placeholder="https://avatars.githubusercontent.com/..."
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-md text-xs focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Company Details */}
            <div className="p-5 bg-white rounded-xl border border-stone-200 space-y-3 shadow-2xs">
              <h3 className="text-xs font-bold text-stone-400 uppercase font-mono tracking-wider">
                2. Program & Reward Type
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Company / Program Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. Honey by PayPal"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-md text-xs focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Reward Model / Incentive Type *
                  </label>
                  <select
                    value={rewardType}
                    onChange={(e) => setRewardType(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-md text-xs focus:border-orange-500 focus:outline-none font-medium"
                  >
                    <option value="dual_sided">Dual-sided incentives (Both get perks)</option>
                    <option value="sale_reward_cps">Sale reward (CPS)</option>
                    <option value="lead_reward_cpl">Lead reward (CPL)</option>
                    <option value="click_reward_cpc">Click reward (CPC)</option>
                    <option value="credits">AI / Cloud Credits</option>
                    <option value="points">Points & Gift Cards</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-md text-xs focus:border-orange-500 focus:outline-none capitalize"
                  >
                    <option value="shopping">Shopping & Coupons</option>
                    <option value="technology">Technology & AI</option>
                    <option value="finance">Finance & Banking</option>
                    <option value="education">Education & Courses</option>
                    <option value="lifestyle">Lifestyle & Fitness</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Program Logo Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    placeholder="https://.../logo.png"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-md text-xs focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Your Referral / Invite URL *
                </label>
                <input
                  type="url"
                  required
                  value={destinationUrl}
                  onChange={(e) => setDestinationUrl(e.target.value)}
                  placeholder="https://joinhoney.com/ref/odbpdid"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-md text-xs focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Official Website URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={officialWebsite}
                    onChange={(e) => setOfficialWebsite(e.target.value)}
                    placeholder="https://www.joinhoney.com"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-md text-xs focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Reward Terms */}
            <div className="p-5 bg-white rounded-xl border border-stone-200 space-y-3 shadow-2xs">
              <h3 className="text-xs font-bold text-stone-400 uppercase font-mono tracking-wider">
                3. Reward Terms & Claiming Steps
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    User Reward *
                  </label>
                  <input
                    type="text"
                    required
                    value={referredUserReward}
                    onChange={(e) => setReferredUserReward(e.target.value)}
                    placeholder="e.g. $50.00 AI credits / 500 Gold"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-md text-xs focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Referrer Perk *
                  </label>
                  <input
                    type="text"
                    required
                    value={referrerReward}
                    onChange={(e) => setReferrerReward(e.target.value)}
                    placeholder="e.g. $150.00 reward / 10% commission"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-md text-xs focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Reward Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={rewardDescription}
                  onChange={(e) => setRewardDescription(e.target.value)}
                  placeholder="Explain the perk clearly..."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-md text-xs focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  How It Works (Steps to Claim)
                </label>
                <textarea
                  rows={3}
                  value={howItWorks}
                  onChange={(e) => setHowItWorks(e.target.value)}
                  placeholder="Step 1: Sign up via link&#10;Step 2: Complete first purchase&#10;Step 3: Receive bonus"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-md text-xs focus:border-orange-500 focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={handleCopyMarkdown}
                className="notion-btn-white px-4 py-2.5 text-xs inline-flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Markdown' : 'Copy for GitHub PR'}</span>
              </button>

              <button
                type="submit"
                className="notion-btn-orange px-5 py-2.5 text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send to kesarsaket607@gmail.com</span>
              </button>
            </div>

          </form>

          {/* Right Live YAML Preview */}
          <div className="lg:col-span-5 space-y-2">
            <div className="text-xs font-mono text-stone-400 flex items-center justify-between">
              <span>GitHub Markdown Format</span>
              <button onClick={handleCopyMarkdown} className="hover:text-stone-800">
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre className="p-4 bg-stone-50 border border-stone-200 rounded-xl font-mono text-[11px] text-stone-800 h-[540px] overflow-y-auto leading-relaxed select-all">
              {generatedMarkdown}
            </pre>
          </div>

        </div>
      )}

    </div>
  );
};
