import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  ExternalLink, 
  FileText,
  Share2,
  Check
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { VerificationVoting } from '../components/common/VerificationVoting';

export const ReferralDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { referrals, contributors } = useData();
  const [copiedLink, setCopiedLink] = useState(false);

  const referral = referrals.find(r => r.slug === slug || r.id === slug);

  if (!referral) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-3">
        <h2 className="text-xl font-bold text-stone-900">Referral Not Found</h2>
        <p className="text-xs text-stone-500">The requested referral "{slug}" does not exist.</p>
        <Link to="/explore" className="notion-btn-white inline-block px-3 py-1.5 text-xs">
          Back to Directory
        </Link>
      </div>
    );
  }

  const getInitials = (name: string) => name.substring(0, 2).toUpperCase();
  const image = referral.screenshots?.[0];
  const targetUrl = referral.redirect?.destination_url || referral.official_website;

  const contributor = contributors.find(
    c => c.username.toLowerCase() === referral.submitted_by?.username?.toLowerCase()
  );
  const contributorAvatar = contributor?.avatar || referral.submitted_by?.avatar || 'https://avatars.githubusercontent.com/u/93246904?v=4';
  const contributorName = contributor?.display_name || referral.submitted_by?.display_name || 'Saket Kesar';
  const contributorUsername = contributor?.username || referral.submitted_by?.username || 'saketkesar';

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const getRewardTypeBadge = (type?: string) => {
    switch (type) {
      case 'sale_reward_cps': return 'Sale Reward (CPS)';
      case 'lead_reward_cpl': return 'Lead Reward (CPL)';
      case 'click_reward_cpc': return 'Click Reward (CPC)';
      case 'dual_sided': return 'Dual-Sided Incentive';
      default: return type || 'Incentive';
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8 bg-white">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between text-xs text-stone-400 font-mono">
        <div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-900 font-mono transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>refersleet / directory</span>
          </Link>
        </div>

        <button
          onClick={copyShareLink}
          className="text-stone-500 hover:text-stone-800 flex items-center gap-1 font-medium"
        >
          {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
          <span>{copiedLink ? 'Copied' : 'Share'}</span>
        </button>
      </div>

      {/* Notion Page Header */}
      <div className="space-y-4">
        {image ? (
          <div className="w-14 h-14 rounded-xl bg-stone-50 border border-stone-200 p-2 flex items-center justify-center overflow-hidden">
            <img
              src={image}
              alt={referral.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center font-bold text-lg text-stone-800">
            {getInitials(referral.name)}
          </div>
        )}

        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            {referral.name}
          </h1>
          <p className="text-sm text-stone-600 leading-relaxed">
            {referral.reward.description}
          </p>
        </div>

        {/* Action CTA Bar & Social Sharing */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to={`/r/${referral.redirect?.redirect_slug || referral.slug}`}
              className="notion-btn-orange px-5 py-2.5 text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs"
            >
              <span>Get {referral.name} Referral</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <a
              href={referral.official_website}
              target="_blank"
              rel="noopener noreferrer"
              className="notion-btn-white px-4 py-2.5 text-xs font-semibold inline-flex items-center gap-1"
            >
              <span>Official Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
            </a>
          </div>

          {/* Viral 1-Click Share Triggers */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[11px] text-stone-400 font-mono hidden sm:inline">Share:</span>
            
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this verified ${referral.name} deal on Refersleet! Get ${referral.reward.referred_user}: https://saketkesar.github.io/refersleet/#/referrals/${referral.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-md text-[11px] font-medium transition-colors inline-flex items-center gap-1"
              title="Share on WhatsApp"
            >
              <span>WhatsApp</span>
            </a>

            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Claim verified ${referral.name} rewards on Refersleet: ${referral.reward.referred_user}`)}&url=${encodeURIComponent(`https://saketkesar.github.io/refersleet/#/referrals/${referral.slug}`)}&via=Saketkesar`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 rounded-md text-[11px] font-medium transition-colors inline-flex items-center gap-1"
              title="Share on X"
            >
              <span>Post on X</span>
            </a>

            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(`https://saketkesar.github.io/refersleet/#/referrals/${referral.slug}`)}&text=${encodeURIComponent(`Verified ${referral.name} referral on Refersleet: ${referral.reward.referred_user}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 rounded-md text-[11px] font-medium transition-colors inline-flex items-center gap-1"
              title="Share on Telegram"
            >
              <span>Telegram</span>
            </a>
          </div>
        </div>
      </div>

      {/* Notion Document Properties Table */}
      <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2.5 text-xs">
        
        <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-stone-100">
          <span className="text-stone-400 font-mono">Category</span>
          <span className="col-span-2 text-stone-800 font-medium capitalize">
            {referral.category.join(', ')}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-stone-100">
          <span className="text-stone-400 font-mono">Reward Model</span>
          <span className="col-span-2">
            <span className="notion-pill-orange text-[11px]">
              {getRewardTypeBadge(referral.reward.type)}
            </span>
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-stone-100">
          <span className="text-stone-400 font-mono">User Reward</span>
          <span className="col-span-2 text-orange-950 font-semibold">
            {referral.reward.referred_user}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-stone-100">
          <span className="text-stone-400 font-mono">Referrer Perk</span>
          <span className="col-span-2 text-stone-800 font-medium">
            {referral.reward.referrer}
          </span>
        </div>

        {/* Referral URL Direct Link */}
        <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-stone-100">
          <span className="text-stone-400 font-mono">Referral Link</span>
          <span className="col-span-2 font-mono text-stone-700 truncate flex items-center gap-1.5">
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:underline truncate"
            >
              {targetUrl}
            </a>
            <ExternalLink className="w-3 h-3 text-stone-400 shrink-0" />
          </span>
        </div>

        {/* Contributor with Avatar */}
        <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-stone-100">
          <span className="text-stone-400 font-mono">Submitted By</span>
          <div className="col-span-2 flex items-center gap-2">
            <img
              src={contributorAvatar}
              alt={contributorName}
              className="w-5 h-5 rounded-full object-cover border border-stone-200"
            />
            <Link
              to={`/contributors/${contributorUsername}`}
              className="text-stone-900 font-semibold hover:text-orange-600 flex items-center gap-1"
            >
              <span>{contributorName}</span>
              <span className="text-stone-400 font-mono font-normal text-[11px]">
                (@{contributorUsername})
              </span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 py-1">
          <span className="text-stone-400 font-mono">Verified Status</span>
          <span className="col-span-2 text-emerald-800 font-semibold">
            ✓ Active & Community Verified
          </span>
        </div>

      </div>

      {/* Structured Content: Overview, Eligibility, Steps */}
      <div className="space-y-6 text-sm text-stone-800 leading-relaxed">
        
        {/* Overview Callout */}
        <div className="notion-callout space-y-1">
          <div className="font-semibold text-orange-950 text-xs uppercase font-mono tracking-wider">
            Reward Summary
          </div>
          <div className="text-xs text-stone-700">
            {referral.reward.description}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h3 className="text-base font-bold text-stone-900">About the Program</h3>
          <p className="text-xs sm:text-sm text-stone-700 whitespace-pre-line leading-relaxed">
            {referral.description}
          </p>
        </div>

        {/* Eligibility */}
        <div className="space-y-2">
          <h3 className="text-base font-bold text-stone-900">Eligibility Criteria</h3>
          <ul className="space-y-1.5 text-xs sm:text-sm text-stone-700">
            {referral.eligibility?.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Claiming Steps */}
        <div className="space-y-2">
          <h3 className="text-base font-bold text-stone-900">How to Claim</h3>
          <ol className="space-y-2 text-xs sm:text-sm text-stone-700">
            {referral.requirements?.map((req, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="font-mono text-xs font-semibold text-orange-800 bg-orange-50 w-5 h-5 rounded flex items-center justify-center shrink-0 border border-orange-200">
                  {idx + 1}
                </span>
                <span className="pt-0.5">{req}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Terms Link */}
        <div className="pt-2 text-xs text-stone-500">
          <a
            href={referral.terms_url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-stone-800 underline inline-flex items-center gap-1"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Read official program terms on {new URL(referral.official_website).hostname}</span>
          </a>
        </div>

      </div>

      {/* Community Verification Voting Box */}
      <VerificationVoting referral={referral} />

    </div>
  );
};
