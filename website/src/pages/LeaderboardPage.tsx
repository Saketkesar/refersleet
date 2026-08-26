import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Medal, Award, ArrowLeft } from 'lucide-react';
import { useData } from '../context/DataContext';

export const LeaderboardPage: React.FC = () => {
  const { contributors } = useData();
  const rankedContributors = [...contributors].sort((a, b) => b.reputation - a.reputation);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      <div>
        <div className="text-xs text-stone-400 font-mono mb-1">
          refersleet / contributors
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-stone-900 font-heading">
          Contributor Leaderboard
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Public recognition for community members submitting and verifying referral programs.
        </p>
      </div>

      {/* Notion Database Table */}
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-medium border-b border-stone-200">
              <tr>
                <th className="px-4 py-3">Rank</th>
                <th className="px-4 py-3">Contributor</th>
                <th className="px-4 py-3">Reputation</th>
                <th className="px-4 py-3">Approved</th>
                <th className="px-4 py-3">Verifications</th>
                <th className="px-4 py-3 text-right">Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {rankedContributors.map((c, i) => (
                <tr key={c.username} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-4 py-3 font-mono font-semibold text-stone-700">
                    #{i + 1}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <img src={c.avatar} alt={c.display_name} className="w-6 h-6 rounded-full object-cover" />
                      <div>
                        <div className="font-semibold text-stone-900">{c.display_name}</div>
                        <div className="text-[11px] text-stone-400 font-mono">@{c.username}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono font-semibold text-orange-700">
                    {c.reputation} pts
                  </td>
                  <td className="px-4 py-3 font-mono text-stone-600">
                    {c.approved_submissions}
                  </td>
                  <td className="px-4 py-3 font-mono text-stone-600">
                    {c.verified_submissions}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to={`/contributors/${c.username}`}
                      className="text-orange-600 hover:text-orange-800 font-medium"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
