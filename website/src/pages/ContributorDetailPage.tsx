import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Github, Globe, ExternalLink } from 'lucide-react';
import { useData } from '../context/DataContext';
import { ReferralCard } from '../components/common/ReferralCard';

export const ContributorDetailPage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { contributors, referrals } = useData();

  const contributor = contributors.find(
    c => c.username.toLowerCase() === username?.toLowerCase()
  );

  if (!contributor) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-3">
        <h2 className="text-xl font-bold text-stone-900">Contributor Not Found</h2>
        <Link to="/explore" className="notion-btn-white inline-block px-3 py-1.5 text-xs">
          Back to Directory
        </Link>
      </div>
    );
  }

  const userSubmissions = referrals.filter(
    r => r.submitted_by?.username?.toLowerCase() === contributor.username.toLowerCase()
  );

  const githubUrl = contributor.github_url || `https://github.com/${contributor.username}`;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8 bg-white">
      
      <div>
        <Link to="/explore" className="text-xs text-stone-400 hover:text-stone-700 flex items-center gap-1 font-mono">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>refx / directory</span>
        </Link>
      </div>

      {/* Contributor Header */}
      <div className="p-6 bg-white rounded-xl border border-stone-200 space-y-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <img
              src={contributor.avatar}
              alt={contributor.display_name}
              className="w-16 h-16 rounded-full object-cover border border-stone-200 shadow-2xs"
            />
            <div>
              <h1 className="text-2xl font-bold text-stone-900 font-heading">
                {contributor.display_name}
              </h1>
              <div className="text-xs text-stone-400 font-mono">
                @{contributor.username}
              </div>
              <p className="text-xs text-stone-600 mt-1">
                {contributor.bio}
              </p>
            </div>
          </div>

          <div>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="notion-btn-white px-3.5 py-1.5 text-xs font-medium inline-flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Profile</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </a>
          </div>

        </div>

        {/* Stats Row */}
        <div className="pt-3 border-t border-stone-100 flex items-center gap-6 text-xs font-mono">
          <div>
            <span className="text-stone-400">Programs:</span>{' '}
            <strong className="text-stone-900">{userSubmissions.length} approved</strong>
          </div>
          <div>
            <span className="text-stone-400">Role:</span>{' '}
            <strong className="text-orange-700">Maintainer</strong>
          </div>
        </div>
      </div>

      {/* Referrals by User */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-stone-900">
          Programs submitted by {contributor.display_name} ({userSubmissions.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userSubmissions.map((referral) => (
            <ReferralCard key={referral.id} referral={referral} />
          ))}
        </div>
      </div>

    </div>
  );
};
