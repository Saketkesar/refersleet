import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  ArrowUpRight, 
  LayoutGrid, 
  Table as TableIcon, 
  ArrowRight,
  Plus
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { ReferralCard } from '../components/common/ReferralCard';

export const HomePage: React.FC = () => {
  const { referrals } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRewardType, setSelectedRewardType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'gallery'>('table');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const getRewardTypeBadge = (type?: string) => {
    switch (type) {
      case 'sale_reward_cps': return 'Sale Reward (CPS)';
      case 'lead_reward_cpl': return 'Lead Reward (CPL)';
      case 'click_reward_cpc': return 'Click Reward (CPC)';
      case 'dual_sided': return 'Dual-Sided';
      default: return type || 'Incentive';
    }
  };

  const filteredReferrals = referrals
    .filter(r => r.status === 'active')
    .filter(r => {
      if (selectedRewardType !== 'all' && r.reward.type !== selectedRewardType) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          r.name.toLowerCase().includes(q) ||
          r.reward.description.toLowerCase().includes(q) ||
          r.tags.some(t => t.toLowerCase().includes(q))
        );
      }
      return true;
    });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-10 bg-white">
      
      {/* Notion Hero Section */}
      <section className="space-y-4 text-left max-w-3xl">
        <div className="flex items-center gap-2 text-xs text-stone-400 font-mono">
          <span>refersleet</span>
          <span>/</span>
          <span>directory</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.1] font-heading">
          The directory for <br />
          <span className="text-orange-600">referral rewards.</span>
        </h1>

        <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
          A free, community-verified directory of dual-sided incentives, sale rewards (CPS), lead perks (CPL), and API credits.
        </p>

        {/* Hero Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            to="/explore"
            className="notion-btn-orange px-5 py-2.5 text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs"
          >
            <span>Explore Directory</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/submit"
            className="notion-btn-white px-4 py-2.5 text-xs font-semibold inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 text-stone-500" />
            <span>Submit Referral</span>
          </Link>
        </div>
      </section>

      {/* Notion Database Section */}
      <section className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          <div>
            <h2 className="text-xl font-bold text-stone-900">
              Verified Referrals
            </h2>
            <p className="text-xs text-stone-500">
              Browse genuine programs with direct links, reward models, and verified payouts.
            </p>
          </div>

          {/* Search & View Switcher */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search programs..."
                className="pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-md text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 w-44 sm:w-56"
              />
            </div>

            <div className="flex items-center bg-stone-100 p-0.5 rounded-md border border-stone-200">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1 rounded text-xs flex items-center gap-1 transition-colors ${
                  viewMode === 'table'
                    ? 'bg-white text-stone-900 shadow-2xs font-medium'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
                title="Table View"
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Table</span>
              </button>

              <button
                onClick={() => setViewMode('gallery')}
                className={`p-1 rounded text-xs flex items-center gap-1 transition-colors ${
                  viewMode === 'gallery'
                    ? 'bg-white text-stone-900 shadow-2xs font-medium'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
                title="Gallery View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Gallery</span>
              </button>
            </div>
          </div>

        </div>

        {/* Reward Model Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs border-b border-stone-200 pb-2">
          <button
            onClick={() => setSelectedRewardType('all')}
            className={`px-3 py-1 rounded-md transition-colors ${
              selectedRewardType === 'all'
                ? 'bg-stone-900 text-white font-semibold'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            All Models ({referrals.length})
          </button>

          <button
            onClick={() => setSelectedRewardType('dual_sided')}
            className={`px-3 py-1 rounded-md transition-colors ${
              selectedRewardType === 'dual_sided'
                ? 'bg-stone-900 text-white font-semibold'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Dual-Sided ({referrals.filter(r => r.reward.type === 'dual_sided').length})
          </button>

          <button
            onClick={() => setSelectedRewardType('sale_reward_cps')}
            className={`px-3 py-1 rounded-md transition-colors ${
              selectedRewardType === 'sale_reward_cps'
                ? 'bg-stone-900 text-white font-semibold'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Sale Reward (CPS) ({referrals.filter(r => r.reward.type === 'sale_reward_cps').length})
          </button>

          <button
            onClick={() => setSelectedRewardType('lead_reward_cpl')}
            className={`px-3 py-1 rounded-md transition-colors ${
              selectedRewardType === 'lead_reward_cpl'
                ? 'bg-stone-900 text-white font-semibold'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Lead Reward (CPL) ({referrals.filter(r => r.reward.type === 'lead_reward_cpl').length})
          </button>

          <button
            onClick={() => setSelectedRewardType('click_reward_cpc')}
            className={`px-3 py-1 rounded-md transition-colors ${
              selectedRewardType === 'click_reward_cpc'
                ? 'bg-stone-900 text-white font-semibold'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Click Reward (CPC) ({referrals.filter(r => r.reward.type === 'click_reward_cpc').length})
          </button>
        </div>

        {/* Table View with Real Images */}
        {viewMode === 'table' ? (
          <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="notion-table">
                <thead>
                  <tr>
                    <th>Program</th>
                    <th>User Reward</th>
                    <th>Reward Type</th>
                    <th>Category</th>
                    <th>Verified</th>
                    <th className="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReferrals.map((referral) => (
                    <tr key={referral.id}>
                      <td className="font-semibold text-stone-900 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          {referral.screenshots?.[0] ? (
                            <div className="w-7 h-7 rounded bg-stone-50 border border-stone-200 p-0.5 flex items-center justify-center overflow-hidden shrink-0">
                              <img
                                src={referral.screenshots[0]}
                                alt={referral.name}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display = 'none';
                                }}
                              />
                            </div>
                          ) : (
                            <div className="w-7 h-7 rounded bg-stone-100 border border-stone-200 flex items-center justify-center font-bold text-xs text-stone-700 shrink-0">
                              {referral.name.substring(0, 2).toUpperCase()}
                            </div>
                          )}

                          <Link to={`/referrals/${referral.slug}`} className="hover:text-orange-600">
                            {referral.name}
                          </Link>
                        </div>
                      </td>
                      <td className="text-stone-700">
                        <div className="font-medium text-xs text-stone-900">{referral.reward.referred_user}</div>
                        <div className="text-[11px] text-stone-500 line-clamp-1">{referral.reward.description}</div>
                      </td>
                      <td className="whitespace-nowrap">
                        <span className="notion-pill-orange text-[10px]">
                          {getRewardTypeBadge(referral.reward.type)}
                        </span>
                      </td>
                      <td className="capitalize text-stone-500 whitespace-nowrap">
                        {referral.category[0]}
                      </td>
                      <td className="whitespace-nowrap">
                        <span className="font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded text-[11px] border border-emerald-200 font-semibold">
                          {referral.verification.confidence}%
                        </span>
                      </td>
                      <td className="text-right whitespace-nowrap">
                        <Link
                          to={`/r/${referral.refx?.redirect_slug || referral.slug}`}
                          className="notion-btn-orange px-2.5 py-1 text-xs inline-flex items-center gap-1 shadow-xs"
                        >
                          <span>Get</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredReferrals.map((referral) => (
              <ReferralCard
                key={referral.id}
                referral={referral}
              />
            ))}
          </div>
        )}
      </section>

    </div>
  );
};
