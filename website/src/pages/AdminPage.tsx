import React from 'react';
import { ShieldCheck, Check, X } from 'lucide-react';
import { useData } from '../context/DataContext';

export const AdminPage: React.FC = () => {
  const { pendingSubmissions, reports, approveSubmission, rejectSubmission, resolveReport } = useData();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      <div>
        <div className="text-xs text-stone-400 font-mono mb-1">
          refersleet / moderation
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-stone-900 font-heading">
          Moderation Queue
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Review community submissions and triage user reports.
        </p>
      </div>

      {/* Pending Submissions */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-stone-900">
          Pending Submissions ({pendingSubmissions.length})
        </h2>

        {pendingSubmissions.length > 0 ? (
          pendingSubmissions.map((sub) => (
            <div key={sub.id} className="p-4 bg-white border border-stone-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-stone-900 text-sm">{sub.name}</h3>
                  <div className="text-xs text-stone-400 font-mono">
                    /{sub.slug} • {sub.category.join(', ')}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => rejectSubmission(sub.id)}
                    className="px-2.5 py-1 text-xs text-stone-600 hover:bg-stone-100 rounded border border-stone-200"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => approveSubmission(sub.id)}
                    className="notion-btn-orange px-3 py-1 text-xs"
                  >
                    Approve & Index
                  </button>
                </div>
              </div>

              <div className="p-2.5 bg-stone-50 rounded text-xs text-stone-600 space-y-1">
                <div><strong>Reward:</strong> {sub.reward.referred_user}</div>
                <div><strong>URL:</strong> <span className="font-mono text-stone-500">{sub.destination_url}</span></div>
                <div><strong>By:</strong> @{sub.submitted_by.username}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 bg-white border border-stone-200 rounded-xl text-center text-xs text-stone-500">
            No pending submissions in queue.
          </div>
        )}
      </div>

      {/* Issue Reports */}
      <div className="space-y-4 pt-4 border-t border-stone-200">
        <h2 className="text-base font-bold text-stone-900">
          Community Reports ({reports.length})
        </h2>

        {reports.map((report) => (
          <div key={report.id} className="p-4 bg-white border border-stone-200 rounded-xl flex items-center justify-between gap-4">
            <div className="space-y-1 text-xs">
              <div className="font-semibold text-stone-900">
                {report.referralName} — <span className="text-orange-700 uppercase font-mono">{report.reason}</span>
              </div>
              <p className="text-stone-600">{report.details}</p>
              <div className="text-stone-400 font-mono text-[11px]">
                by {report.reportedBy}
              </div>
            </div>

            {report.status !== 'resolved' && (
              <button
                onClick={() => resolveReport(report.id)}
                className="notion-btn-white px-3 py-1 text-xs shrink-0"
              >
                Resolve
              </button>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};
