import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface ConfidenceMeterProps {
  score?: number;
  totalVotes?: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ConfidenceMeter: React.FC<ConfidenceMeterProps> = ({
  showLabel = true,
  size = 'md'
}) => {
  if (size === 'sm') {
    return (
      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
        <ShieldCheck className="w-3 h-3 text-emerald-600" />
        <span>Verified</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs">
      <div className="flex items-center gap-1.5 text-stone-800 font-medium">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Verified by Community</span>
      </div>
      <span className="text-[11px] text-emerald-800 font-medium bg-emerald-100/60 px-2 py-0.5 rounded">
        Active & Verified
      </span>
    </div>
  );
};
