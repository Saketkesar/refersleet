import React, { useState } from 'react';
import { X, Check, Mail } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Referral, IssueReport } from '../../types';

interface ReportModalProps {
  referral: Referral;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ referral, onClose }) => {
  const { submitReport } = useData();
  const [reason, setReason] = useState<IssueReport['reason']>('not_working');
  const [details, setDetails] = useState('');
  const [reporterName, setReporterName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.trim()) return;

    submitReport({
      referralId: referral.id,
      referralName: referral.name,
      reason,
      details: details.trim(),
      reportedBy: reporterName.trim() || 'Community Member'
    });

    // Send email to maintainer
    const emailTo = 'kesarsaket607@gmail.com';
    const emailSubject = `[RefX Report] Issue with ${referral.name} (${reason})`;
    const emailBody = `Hey Saket,

A community member reported an issue with a referral listing:

• Program: ${referral.name} (ID: ${referral.id})
• Reason: ${reason}
• Details: ${details}
• Reported By: ${reporterName || 'Anonymous Community Member'}
• Page URL: ${window.location.href}
`;

    const mailtoUrl = `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoUrl, '_blank');

    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/30 backdrop-blur-xs animate-in fade-in duration-100">
      <div className="w-full max-w-md bg-white border border-stone-200 rounded-xl shadow-xl p-6 relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-stone-400 hover:text-stone-700 rounded hover:bg-stone-100"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-6 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Check className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-stone-900">Report Sent to Maintainer</h4>
            <p className="text-xs text-stone-500">
              Thank you for keeping RefX accurate.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Report {referral.name}
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Let maintainers know if the promo expired or rewards changed.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Your Name / GitHub (optional)
              </label>
              <input
                type="text"
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
                placeholder="e.g. John Doe / @johndoe"
                className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-md text-xs text-stone-800 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Reason
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value as IssueReport['reason'])}
                className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-md text-xs text-stone-800 focus:outline-none focus:border-orange-500"
              >
                <option value="not_working">Offer / Promo code is no longer working</option>
                <option value="reward_changed">Reward amount changed</option>
                <option value="eligibility_changed">Eligibility terms changed</option>
                <option value="program_ended">Program ended</option>
                <option value="other">Other issue</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Details *
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
                rows={3}
                placeholder="What happened when you tested this deal?"
                className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-md text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-md text-xs text-stone-600 hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="notion-btn-orange px-3.5 py-1.5 text-xs font-semibold inline-flex items-center gap-1"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send Report</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
