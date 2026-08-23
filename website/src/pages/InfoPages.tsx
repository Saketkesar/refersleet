import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Github, Mail, Sparkles, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const AboutPage: React.FC = () => (
  <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-10 bg-white">
    
    {/* Breadcrumb & Header */}
    <div className="space-y-3">
      <div className="text-xs text-stone-400 font-mono">
        refersleet / about
      </div>
      <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight font-heading">
        About Refersleet
      </h1>
      <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
        An open-source, community-verified directory of referral codes, automatic coupon finders, and developer API perks.
      </p>
    </div>

    {/* Notion Document Content */}
    <div className="space-y-8 text-sm text-stone-800 leading-relaxed">
      
      {/* Notion Callout Box */}
      <div className="notion-callout space-y-1.5">
        <div className="font-bold text-orange-950 text-xs uppercase font-mono tracking-wider">
          Our Mission
        </div>
        <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
          The internet is filled with spammy coupon aggregators that display expired or misleading promo codes. Refersleet replaces them with a clean, transparent, GitHub-powered open directory where every offer is verified by real users.
        </p>
      </div>

      {/* Core Principles */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-stone-900">
          How Refersleet Works
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-700 font-bold text-xs flex items-center justify-center font-mono">
              01
            </div>
            <h3 className="font-bold text-stone-900 text-sm">Community Powered</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Anyone can submit active referral links via the web form or by opening a Pull Request on GitHub.
            </p>
          </div>

          <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center font-mono">
              02
            </div>
            <h3 className="font-bold text-stone-900 text-sm">Verified Accuracy</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Users test deals and report status updates. Expired or altered promos are quickly updated or removed.
            </p>
          </div>

          <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-stone-200 text-stone-800 font-bold text-xs flex items-center justify-center font-mono">
              03
            </div>
            <h3 className="font-bold text-stone-900 text-sm">100% Open Source</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              All program data is stored transparently as Markdown files in our public GitHub repository under MIT.
            </p>
          </div>
        </div>
      </div>

      {/* Maintainer Info */}
      <div className="p-5 bg-white border border-stone-200 rounded-xl space-y-3">
        <h3 className="text-sm font-bold text-stone-900">
          Created & Maintained by Saket Kesar
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          Refersleet is an open-source project founded to build a distraction-free, privacy-friendly referral directory. Have a question or want to collaborate?
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
          <a
            href="https://github.com/Saketkesar"
            target="_blank"
            rel="noopener noreferrer"
            className="notion-btn-white px-3 py-1.5 inline-flex items-center gap-1.5 font-medium"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub (@Saketkesar)</span>
            <ArrowUpRight className="w-3 h-3 text-stone-400" />
          </a>

          <a
            href="mailto:kesarsaket607@gmail.com"
            className="notion-btn-orange px-3 py-1.5 inline-flex items-center gap-1.5 font-medium"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>kesarsaket607@gmail.com</span>
          </a>
        </div>
      </div>

    </div>

  </div>
);

export const DisclosurePage: React.FC = () => (
  <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8 bg-white">
    <div className="text-xs text-stone-400 font-mono">refersleet / disclosure</div>
    <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 font-heading">
      Transparency & Affiliate Disclosure
    </h1>
    <div className="p-6 bg-white border border-stone-200 rounded-xl space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
      <p>
        Refersleet is free to use. To support hosting, domain names, and continuous verification, some links on this platform are referral or partner links where the submitter or Refersleet may receive bonus points or credits when you sign up.
      </p>
      <p>
        <strong>No Bias Guarantee:</strong> We never promote broken deals for affiliate commissions. If a referral program ends or reduces its payout, it is immediately updated based on community reports.
      </p>
    </div>
  </div>
);

export const FAQPage: React.FC = () => (
  <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8 bg-white">
    <div className="text-xs text-stone-400 font-mono">refersleet / faq</div>
    <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 font-heading">
      Frequently Asked Questions
    </h1>
    <div className="space-y-4">
      {[
        {
          q: 'How do I add my referral link to Refersleet?',
          a: 'Visit the Submit Referral page, fill out the form with your link, logo, and reward details, and send it to kesarsaket607@gmail.com or open a Pull Request on GitHub.'
        },
        {
          q: 'Is Refersleet free to use?',
          a: 'Yes, 100% free with zero paywalls, advertisements, or tracking scripts.'
        },
        {
          q: 'How does verification work without a database?',
          a: 'Community votes update your local browser view instantly. When users report broken or changed terms, an automated report is dispatched to maintainers who update the GitHub repository files.'
        }
      ].map((faq, i) => (
        <div key={i} className="p-5 bg-white border border-stone-200 rounded-xl space-y-1.5 shadow-2xs">
          <h3 className="font-bold text-stone-900 text-sm">{faq.q}</h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{faq.a}</p>
        </div>
      ))}
    </div>
  </div>
);
