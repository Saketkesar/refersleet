import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, RotateCcw, ShieldCheck } from 'lucide-react';
import { useData } from '../context/DataContext';
import { ReferralCard } from '../components/common/ReferralCard';

export const ExplorePage: React.FC = () => {
  const { referrals, categories } = useData();
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';
  const sortParam = searchParams.get('sort') || 'confidence';
  const tagParam = searchParams.get('tag') || '';
  const verifiedOnlyParam = searchParams.get('verified_only') === 'true';

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedSort, setSelectedSort] = useState(sortParam);
  const [selectedTag, setSelectedTag] = useState(tagParam);
  const [verifiedOnly, setVerifiedOnly] = useState(verifiedOnlyParam);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    referrals.forEach(r => r.tags?.forEach(t => set.add(t)));
    return Array.from(set);
  }, [referrals]);

  const filteredReferrals = useMemo(() => {
    return referrals.filter(r => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = r.name.toLowerCase().includes(q);
        const matchDesc = r.description.toLowerCase().includes(q);
        const matchReward = r.reward.description.toLowerCase().includes(q);
        const matchTag = r.tags.some(t => t.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchReward && !matchTag) return false;
      }

      if (selectedCategory && !r.category.includes(selectedCategory)) return false;
      if (selectedTag && !r.tags.includes(selectedTag)) return false;
      if (verifiedOnly && (r.verification?.confidence || 0) < 85) return false;

      return true;
    }).sort((a, b) => {
      if (selectedSort === 'newest') {
        return new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime();
      }
      if (selectedSort === 'name') {
        return a.name.localeCompare(b.name);
      }
      // default: confidence
      return (b.verification?.confidence || 0) - (a.verification?.confidence || 0);
    });
  }, [referrals, searchQuery, selectedCategory, selectedTag, verifiedOnly, selectedSort]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedSort('confidence');
    setSelectedTag('');
    setVerifiedOnly(false);
    setSearchParams({});
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Header */}
      <div>
        <div className="text-xs text-stone-400 font-mono mb-1">
          refx / directory
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-stone-900 font-heading">
          Explore Referral Programs
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Browse verified referral rewards, gift cards, and coupons in India.
        </p>
      </div>

      {/* Notion-style Filter Properties Bar */}
      <div className="p-3 bg-white border border-stone-200 rounded-lg space-y-3 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
          
          <div className="sm:col-span-6 relative">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by name, reward, tag..."
              className="w-full pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-md text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-md text-xs text-stone-700 focus:outline-none focus:border-orange-500"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-md text-xs text-stone-700 focus:outline-none focus:border-orange-500"
            >
              <option value="confidence">Highest Confidence</option>
              <option value="newest">Recently Added</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>

        </div>

        {/* Tag chips */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-stone-400 font-mono text-[11px]">Tags:</span>
            {allTags.slice(0, 7).map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  selectedTag === tag
                    ? 'bg-orange-600 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>

          {(searchQuery || selectedCategory || selectedTag || verifiedOnly) && (
            <button
              onClick={handleReset}
              className="text-stone-500 hover:text-stone-800 text-xs font-medium flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-xs text-stone-500 font-mono">
        Showing {filteredReferrals.length} referral programs
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredReferrals.map((referral) => (
          <ReferralCard key={referral.id} referral={referral} />
        ))}
      </div>

    </div>
  );
};
