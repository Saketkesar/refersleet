import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-stone-200 mt-20 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-stone-500">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <img
                src="/favicon.png"
                alt="Refersleet icon"
                className="w-5 h-5 rounded object-contain"
              />
              <span className="font-bold text-stone-900 text-sm">Refersleet</span>
              <span>— Open Source Community Referral Directory</span>
            </div>
            <p className="text-[11px] text-stone-400">
              Open source under MIT. Maintained by <a href="https://github.com/Saketkesar" target="_blank" rel="noopener noreferrer" className="text-stone-700 hover:underline">Saket Kesar</a>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <Link to="/explore" className="hover:text-stone-900">Directory</Link>
            <Link to="/api-docs" className="hover:text-stone-900">API Feeds</Link>
            <Link to="/about" className="hover:text-stone-900">About</Link>
            <Link to="/submit" className="hover:text-stone-900 text-orange-600 font-medium">Submit Referral</Link>
            <a 
              href="mailto:kesarsaket607@gmail.com" 
              className="hover:text-stone-900 flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </a>
            <a 
              href="https://github.com/Saketkesar" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-stone-900 flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>@Saketkesar</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
