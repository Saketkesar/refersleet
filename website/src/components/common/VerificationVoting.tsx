import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, RefreshCw, Flag, Check } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Referral } from '../../types';
import { ReportModal } from './ReportModal';

interface VerificationVotingProps {
  referral: Referral;
}

export const VerificationVoting: React.FC<VerificationVotingProps> = ({ referral }) => {
  const { userVotes, castVote } = useData();
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const currentVote = userVotes[referral.id];

  const handleVote = (type: 'working' | 'not_working' | 'reward_changed') => {
    castVote(referral.id, type);
  };

  return (
    <div className="p-5 bg-white border border-stone-200 rounded-xl space-y-4">
      <div className="flex items-center justify-between border-b border-stone-100 pb-3">
        <div>
          <h3 className="text-sm font-semibold text-stone-900">
            Community Verification
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Tested this recently? Help keep this program status accurate.
          </p>
        </div>

        <button
          onClick={() => setReportModalOpen(true)}
          className="text-xs text-stone-400 hover:text-stone-700 flex items-center gap-1"
        >
          <Flag className="w-3.5 h-3.5" />
          <span>Report issue</span>
        </button>
      </div>

      {/* Clean Action Buttons without fake counts */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => handleVote('working')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors flex items-center gap-1.5 ${
            currentVote === 'working'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
              : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
          }`}
        >
          <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
          <span>{currentVote === 'working' ? '✓ You confirmed it works' : 'It works'}</span>
        </button>

        <button
          onClick={() => handleVote('not_working')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors flex items-center gap-1.5 ${
            currentVote === 'not_working'
              ? 'bg-rose-50 text-rose-800 border-rose-300'
              : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
          }`}
        >
          <ThumbsDown className="w-3.5 h-3.5 text-rose-600" />
          <span>{currentVote === 'not_working' ? '✓ You reported not working' : 'Not working'}</span>
        </button>

        <button
          onClick={() => handleVote('reward_changed')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors flex items-center gap-1.5 ${
            currentVote === 'reward_changed'
              ? 'bg-amber-50 text-amber-800 border-amber-300'
              : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
          }`}
        >
          <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
          <span>{currentVote === 'reward_changed' ? '✓ You reported terms changed' : 'Terms changed'}</span>
        </button>
      </div>

      {reportModalOpen && (
        <ReportModal
          referral={referral}
          onClose={() => setReportModalOpen(false)}
        />
      )}
    </div>
  );
};
