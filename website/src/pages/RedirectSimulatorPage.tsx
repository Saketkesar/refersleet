import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { useData } from '../context/DataContext';

export const RedirectSimulatorPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { referrals } = useData();

  const referral = referrals.find(
    r => r.redirect?.redirect_slug === slug || r.slug === slug || r.id === slug
  );

  const targetUrl = referral?.redirect?.destination_url || referral?.official_website || 'https://saketkesar.github.io/refersleet/';

  let destinationHost = 'partner.com';
  try {
    destinationHost = new URL(targetUrl).hostname;
  } catch (e) {}

  if (!referral) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-3">
        <h2 className="text-xl font-bold text-stone-900">Invalid Link</h2>
        <p className="text-xs text-stone-500">The requested redirect slug does not exist.</p>
        <Link to="/explore" className="notion-btn-white inline-block px-3 py-1.5 text-xs">
          Browse Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center space-y-6">
      
      <div className="p-8 bg-white border border-stone-200 rounded-2xl shadow-sm space-y-5">
        
        <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center mx-auto text-base font-bold font-mono">
          {referral.name.substring(0, 2).toUpperCase()}
        </div>

        <div className="space-y-1">
          <h1 className="text-xl font-bold text-stone-900">
            Continuing to {referral.name}
          </h1>
          <p className="text-xs text-stone-500">
            Redirecting to official partner domain: <strong className="text-stone-800">{destinationHost}</strong>
          </p>
        </div>

        {/* Reward Callout */}
        <div className="notion-callout text-left space-y-1">
          <div className="text-[11px] font-bold text-orange-900 font-mono uppercase">
            Active Promo
          </div>
          <div className="text-xs font-semibold text-stone-900">
            {referral.reward.referred_user}
          </div>
          <div className="text-xs text-stone-600">
            {referral.reward.description}
          </div>
        </div>

        <div className="pt-2">
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="notion-btn-orange w-full py-2.5 px-4 text-xs font-semibold inline-flex items-center justify-center gap-1.5 shadow-xs"
          >
            <span>Proceed to {referral.name}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="text-[11px] text-stone-400 pt-2">
          <Link to={`/referrals/${referral.slug}`} className="hover:text-stone-700 underline">
            Back to terms and instructions
          </Link>
        </div>

      </div>

    </div>
  );
};
