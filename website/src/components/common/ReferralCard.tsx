import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { Referral } from '../../types';

interface ReferralCardProps {
  referral: Referral;
}

export const ReferralCard: React.FC<ReferralCardProps> = ({ referral }) => {
  const getInitials = (name: string) => name.substring(0, 2).toUpperCase();
  const image = referral.screenshots?.[0];

  return (
    <div className="notion-card p-5 flex flex-col justify-between overflow-hidden">
      
      <div>
        {/* Header with Logo Image / Initial and Name */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            {image ? (
              <div className="w-10 h-10 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-center p-1 overflow-hidden shrink-0">
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
              <div className="w-10 h-10 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center font-bold text-stone-700 text-sm shrink-0">
                {getInitials(referral.name)}
              </div>
            )}

            <div>
              <Link
                to={`/referrals/${referral.slug}`}
                className="font-bold text-stone-900 hover:text-orange-600 transition-colors text-base"
              >
                {referral.name}
              </Link>

              <div className="text-xs text-stone-500 capitalize">
                {referral.category?.[0] || 'General'}
                {referral.subcategories?.[0] && ` / ${referral.subcategories[0].replace('-', ' ')}`}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>{referral.verification?.confidence || 100}%</span>
          </div>
        </div>

        {/* Notion Callout Box for Reward */}
        <div className="my-3 notion-callout space-y-1">
          <div className="text-xs font-semibold text-orange-950">
            {referral.reward.referred_user}
          </div>
          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {referral.reward.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {referral.tags?.slice(0, 3).map((tag) => (
            <span key={tag} className="notion-pill text-[11px]">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer: Details & Action */}
      <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3 text-xs">
        <div className="text-stone-400 font-mono text-[11px]">
          verified program
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/referrals/${referral.slug}`}
            className="notion-btn-white px-2.5 py-1 text-xs"
          >
            Details
          </Link>

          <Link
            to={`/r/${referral.redirect?.redirect_slug || referral.refx?.redirect_slug || referral.slug}`}
            className="notion-btn-orange px-3 py-1 text-xs flex items-center gap-1 shadow-xs"
          >
            <span>Get Referral</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

    </div>
  );
};
