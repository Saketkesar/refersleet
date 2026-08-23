export type RewardType = 
  | 'sale_reward_cps' 
  | 'lead_reward_cpl' 
  | 'click_reward_cpc' 
  | 'dual_sided' 
  | 'cashback' 
  | 'discount' 
  | 'credits' 
  | 'free_trial' 
  | 'points' 
  | 'crypto' 
  | 'gift_card' 
  | 'other';

export interface Reward {
  referrer: string;
  referred_user: string;
  type: RewardType;
  description: string;
}

export interface SubmittedBy {
  username: string;
  display_name: string;
  avatar?: string;
}

export interface Verification {
  status: 'community-verified' | 'official-verified' | 'unverified' | 'stale' | 'flagged';
  working_votes: number;
  not_working_votes: number;
  reward_changed_votes: number;
  confidence: number;
}

export interface RefXMeta {
  redirect_slug: string;
  disclosure_required: boolean;
  featured?: boolean;
  destination_url?: string;
}

export interface Referral {
  id: string;
  name: string;
  slug: string;
  status: 'active' | 'expired' | 'pending' | 'flagged' | 'archived';
  category: string[];
  subcategories?: string[];
  country: string[];
  official_website: string;
  reward: Reward;
  eligibility: string[];
  requirements: string[];
  terms_url: string;
  submitted_by: SubmittedBy;
  submitted_at: string;
  last_verified: string;
  verification: Verification;
  tags: string[];
  screenshots?: string[];
  description: string;
  notes?: string;
  refx: RefXMeta;
  markdown_content?: string;
  source_file?: string;
  refx_url?: string;
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  featured?: boolean;
  subcategories: SubCategory[];
  markdown_content?: string;
}

export interface Contributor {
  username: string;
  display_name: string;
  bio?: string;
  avatar: string;
  github_url: string;
  twitter_url?: string;
  website_url?: string;
  joined_at: string;
  approved_submissions: number;
  verified_submissions: number;
  reports_submitted: number;
  valid_reports: number;
  reputation: number;
  rank: number;
  badges: string[];
  markdown_content?: string;
  source_file?: string;
}

export interface PlatformStats {
  total_referrals: number;
  active_referrals: number;
  total_categories: number;
  total_contributors: number;
  total_verifications: number;
  average_confidence: number;
  last_synced_at: string;
}

export interface UserVote {
  referralId: string;
  voteType: 'working' | 'not_working' | 'reward_changed';
  timestamp: string;
}

export interface IssueReport {
  id: string;
  referralId: string;
  referralName: string;
  reason: 'not_working' | 'reward_changed' | 'eligibility_changed' | 'program_ended' | 'misleading' | 'malicious_link' | 'other';
  details: string;
  reportedBy: string;
  reportedAt: string;
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
}

export interface SubmissionItem {
  id: string;
  name: string;
  slug: string;
  category: string[];
  subcategories: string[];
  official_website: string;
  reward: Reward;
  eligibility: string[];
  requirements: string[];
  terms_url: string;
  destination_url: string;
  description: string;
  tags: string[];
  submitted_by: SubmittedBy;
  submitted_at: string;
  status: 'pending' | 'approved' | 'rejected';
}
