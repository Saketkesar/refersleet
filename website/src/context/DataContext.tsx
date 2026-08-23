import React, { createContext, useContext, useState, useEffect } from 'react';
import { Referral, Category, Contributor, PlatformStats, UserVote, IssueReport, SubmissionItem } from '../types';

import rawReferrals from '../../../generated/referrals.json';
import rawCategories from '../../../generated/categories.json';
import rawContributors from '../../../generated/contributors.json';
import rawStats from '../../../generated/stats.json';

interface DataContextType {
  referrals: Referral[];
  categories: Category[];
  contributors: Contributor[];
  stats: PlatformStats;
  userVotes: Record<string, 'working' | 'not_working' | 'reward_changed'>;
  reports: IssueReport[];
  pendingSubmissions: SubmissionItem[];
  castVote: (referralId: string, voteType: 'working' | 'not_working' | 'reward_changed') => void;
  submitReport: (report: Omit<IssueReport, 'id' | 'reportedAt' | 'status'>) => void;
  submitReferral: (submission: Omit<SubmissionItem, 'id' | 'submitted_at' | 'status'>) => void;
  approveSubmission: (id: string) => void;
  rejectSubmission: (id: string) => void;
  resolveReport: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always use the latest generated referrals as base
  const [referrals, setReferrals] = useState<Referral[]>(() => {
    return rawReferrals as unknown as Referral[];
  });

  const [categories] = useState<Category[]>(rawCategories as unknown as Category[]);
  const [contributors, setContributors] = useState<Contributor[]>(() => {
    return rawContributors as unknown as Contributor[];
  });

  const [userVotes, setUserVotes] = useState<Record<string, 'working' | 'not_working' | 'reward_changed'>>(() => {
    const saved = localStorage.getItem('refx_user_votes_v2');
    return saved ? JSON.parse(saved) : {};
  });

  const [reports, setReports] = useState<IssueReport[]>(() => {
    const saved = localStorage.getItem('refx_reports_v2');
    return saved ? JSON.parse(saved) : [];
  });

  const [pendingSubmissions, setPendingSubmissions] = useState<SubmissionItem[]>(() => {
    const saved = localStorage.getItem('refx_submissions_v2');
    return saved ? JSON.parse(saved) : [];
  });

  // Calculate dynamic stats
  const stats: PlatformStats = {
    total_referrals: referrals.length,
    active_referrals: referrals.filter(r => r.status === 'active').length,
    total_categories: categories.length,
    total_contributors: contributors.length,
    total_verifications: referrals.reduce(
      (sum, r) => sum + (r.verification?.working_votes || 0) + (r.verification?.not_working_votes || 0),
      0
    ),
    average_confidence: Math.round(
      referrals.reduce((sum, r) => sum + (r.verification?.confidence || 0), 0) / referrals.length
    ),
    last_synced_at: rawStats.last_synced_at || new Date().toISOString()
  };

  const castVote = (referralId: string, voteType: 'working' | 'not_working' | 'reward_changed') => {
    const previousVote = userVotes[referralId];
    if (previousVote === voteType) return;

    const updatedReferrals = referrals.map(ref => {
      if (ref.id !== referralId) return ref;

      const ver = { ...ref.verification };
      if (previousVote === 'working') ver.working_votes = Math.max(0, ver.working_votes - 1);
      if (previousVote === 'not_working') ver.not_working_votes = Math.max(0, ver.not_working_votes - 1);
      if (previousVote === 'reward_changed') ver.reward_changed_votes = Math.max(0, ver.reward_changed_votes - 1);

      if (voteType === 'working') ver.working_votes += 1;
      if (voteType === 'not_working') ver.not_working_votes += 1;
      if (voteType === 'reward_changed') ver.reward_changed_votes += 1;

      const total = ver.working_votes + ver.not_working_votes;
      ver.confidence = total > 0 ? Math.round((ver.working_votes / total) * 100) : 80;

      return {
        ...ref,
        verification: ver,
        last_verified: new Date().toISOString().split('T')[0]
      };
    });

    const newVotes = { ...userVotes, [referralId]: voteType };
    setUserVotes(newVotes);
    setReferrals(updatedReferrals);
    localStorage.setItem('refx_user_votes_v2', JSON.stringify(newVotes));
  };

  const submitReport = (reportData: Omit<IssueReport, 'id' | 'reportedAt' | 'status'>) => {
    const newReport: IssueReport = {
      ...reportData,
      id: `rep-${Date.now()}`,
      reportedAt: new Date().toISOString(),
      status: 'pending'
    };
    const updated = [newReport, ...reports];
    setReports(updated);
    localStorage.setItem('refx_reports_v2', JSON.stringify(updated));
  };

  const submitReferral = (subData: Omit<SubmissionItem, 'id' | 'submitted_at' | 'status'>) => {
    const newSub: SubmissionItem = {
      ...subData,
      id: `sub-${Date.now()}`,
      submitted_at: new Date().toISOString(),
      status: 'pending'
    };
    const updated = [newSub, ...pendingSubmissions];
    setPendingSubmissions(updated);
    localStorage.setItem('refx_submissions_v2', JSON.stringify(updated));
  };

  const approveSubmission = (id: string) => {
    const sub = pendingSubmissions.find(s => s.id === id);
    if (!sub) return;

    const newReferral: Referral = {
      id: sub.slug,
      name: sub.name,
      slug: sub.slug,
      status: 'active',
      category: sub.category,
      subcategories: sub.subcategories,
      country: ['IN'],
      official_website: sub.official_website,
      reward: sub.reward,
      eligibility: sub.eligibility,
      requirements: sub.requirements,
      terms_url: sub.terms_url,
      submitted_by: sub.submitted_by,
      submitted_at: new Date().toISOString().split('T')[0],
      last_verified: new Date().toISOString().split('T')[0],
      verification: {
        status: 'community-verified',
        working_votes: 1,
        not_working_votes: 0,
        reward_changed_votes: 0,
        confidence: 100
      },
      tags: sub.tags,
      description: sub.description,
      refx: {
        redirect_slug: sub.slug,
        disclosure_required: true,
        destination_url: sub.destination_url
      },
      refx_url: `https://refx.in/r/${sub.slug}`
    };

    const updatedReferrals = [newReferral, ...referrals];
    const updatedSubs = pendingSubmissions.filter(s => s.id !== id);
    setReferrals(updatedReferrals);
    setPendingSubmissions(updatedSubs);
    localStorage.setItem('refx_submissions_v2', JSON.stringify(updatedSubs));
  };

  const rejectSubmission = (id: string) => {
    const updatedSubs = pendingSubmissions.filter(s => s.id !== id);
    setPendingSubmissions(updatedSubs);
    localStorage.setItem('refx_submissions_v2', JSON.stringify(updatedSubs));
  };

  const resolveReport = (id: string) => {
    const updatedReports = reports.map(r => r.id === id ? { ...r, status: 'resolved' as const } : r);
    setReports(updatedReports);
    localStorage.setItem('refx_reports_v2', JSON.stringify(updatedReports));
  };

  return (
    <DataContext.Provider
      value={{
        referrals,
        categories,
        contributors,
        stats,
        userVotes,
        reports,
        pendingSubmissions,
        castVote,
        submitReport,
        submitReferral,
        approveSubmission,
        rejectSubmission,
        resolveReport
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};
