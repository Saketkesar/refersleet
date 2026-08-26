import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useData } from '../context/DataContext';
import { ReferralCard } from '../components/common/ReferralCard';

export const CategoryDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { categories, referrals } = useData();
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');

  const category = categories.find(c => c.slug === slug || c.id === slug);

  if (!category) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-3">
        <h2 className="text-xl font-bold text-stone-900">Category Not Found</h2>
        <Link to="/explore" className="notion-btn-white inline-block px-3 py-1.5 text-xs">
          Back to Directory
        </Link>
      </div>
    );
  }

  const categoryReferrals = referrals.filter(r => {
    const inCategory = r.category.includes(category.id) || r.category.includes(category.slug);
    if (!inCategory) return false;
    if (selectedSubcategory && !r.subcategories?.includes(selectedSubcategory)) return false;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      <div>
        <Link
          to="/explore"
          className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-900 font-mono transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>refersleet / categories</span>
        </Link>
      </div>

      <div className="p-6 bg-white border border-stone-200 rounded-xl space-y-3">
        <h1 className="text-2xl font-bold text-stone-900 font-heading">
          {category.name} Referrals
        </h1>
        <p className="text-xs sm:text-sm text-stone-600">
          {category.description}
        </p>

        {category.subcategories && category.subcategories.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-stone-100 text-xs">
            <button
              onClick={() => setSelectedSubcategory('')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                selectedSubcategory === ''
                  ? 'bg-stone-900 text-white font-medium'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              All
            </button>

            {category.subcategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubcategory(selectedSubcategory === (sub.slug || sub.id) ? '' : (sub.slug || sub.id))}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedSubcategory === (sub.slug || sub.id)
                    ? 'bg-stone-900 text-white font-medium'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Referral Cards */}
      <div className="space-y-4">
        <div className="text-xs text-stone-500 font-mono">
          Showing {categoryReferrals.length} referral programs
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categoryReferrals.map((referral) => (
            <ReferralCard key={referral.id} referral={referral} />
          ))}
        </div>
      </div>

    </div>
  );
};
