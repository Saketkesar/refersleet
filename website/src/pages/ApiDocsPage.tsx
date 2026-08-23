import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Code2 } from 'lucide-react';
import { useData } from '../context/DataContext';

export const ApiDocsPage: React.FC = () => {
  const { referrals, categories, stats } = useData();
  const [activeTab, setActiveTab] = useState<'referrals' | 'categories' | 'stats'>('referrals');
  const [copied, setCopied] = useState(false);

  const rawGithubBase = 'https://raw.githubusercontent.com/Saketkesar/refersleet/main/generated';

  const endpoints = {
    referrals: {
      title: 'Referrals API',
      url: `${rawGithubBase}/referrals.json`,
      localUrl: '/api/referrals.json',
      data: referrals
    },
    categories: {
      title: 'Categories API',
      url: `${rawGithubBase}/categories.json`,
      localUrl: '/api/categories.json',
      data: categories
    },
    stats: {
      title: 'Platform Statistics API',
      url: `${rawGithubBase}/stats.json`,
      localUrl: '/api/stats.json',
      data: stats
    }
  };

  const currentEndpoint = endpoints[activeTab];
  const responseJson = JSON.stringify(currentEndpoint.data, null, 2);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10 bg-white">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="text-xs text-stone-400 font-mono">
          refersleet / developer / api
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-heading">
          Public JSON Data Feeds
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl">
          Direct, zero-auth raw JSON feeds hosted directly on GitHub and CDN. Ideal for bots, browser extensions, aggregators, and fintech apps.
        </p>
      </div>

      {/* Real Live Endpoint Card */}
      <div className="p-5 bg-stone-50 border border-stone-200 rounded-xl space-y-3 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-xs font-bold text-stone-400 uppercase font-mono tracking-wider">
              Live GitHub CDN Endpoint
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                GET
              </span>
              <code className="text-xs font-mono text-stone-900 break-all select-all">
                {currentEndpoint.url}
              </code>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={currentEndpoint.url}
              target="_blank"
              rel="noopener noreferrer"
              className="notion-btn-white px-3 py-1.5 text-xs font-medium inline-flex items-center gap-1"
            >
              <span>Open in Browser</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </a>

            <button
              onClick={() => handleCopy(currentEndpoint.url)}
              className="notion-btn-orange px-3 py-1.5 text-xs font-medium inline-flex items-center gap-1 shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy URL'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Code Examples */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-stone-900">
          How to Fetch (JavaScript)
        </h3>
        <pre className="p-4 bg-stone-900 text-stone-100 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed">
{`// Fetch live verified referrals from Refersleet
const res = await fetch("${currentEndpoint.url}");
const data = await res.json();
console.log(data);`}
        </pre>
      </div>

      {/* Interactive JSON Viewer */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-stone-200 pb-2">
          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => setActiveTab('referrals')}
              className={`px-3 py-1 rounded-md font-mono transition-colors ${
                activeTab === 'referrals'
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              referrals.json
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`px-3 py-1 rounded-md font-mono transition-colors ${
                activeTab === 'categories'
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              categories.json
            </button>

            <button
              onClick={() => setActiveTab('stats')}
              className={`px-3 py-1 rounded-md font-mono transition-colors ${
                activeTab === 'stats'
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              stats.json
            </button>
          </div>

          <button
            onClick={() => handleCopy(responseJson)}
            className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1 font-mono"
          >
            <Copy className="w-3 h-3" />
            <span>Copy JSON</span>
          </button>
        </div>

        <pre className="p-4 bg-stone-50 border border-stone-200 rounded-xl font-mono text-[11px] text-stone-800 h-96 overflow-y-auto leading-relaxed select-all">
          {responseJson}
        </pre>
      </div>

    </div>
  );
};
