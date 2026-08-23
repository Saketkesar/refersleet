import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  Plus, 
  Menu, 
  X,
  Github
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 gap-4">
          
          {/* Refersleet Brand with Logo.png */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src={`${import.meta.env.BASE_URL}logo.png`}
                alt="Refersleet"
                className="h-5.5 sm:h-6 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>

            {/* Clean Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 text-sm">
              <Link
                to="/explore"
                className={`px-3 py-1.5 rounded-md text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors ${
                  isActive('/explore') ? 'text-stone-900 font-semibold bg-stone-100' : ''
                }`}
              >
                Directory
              </Link>

              <Link
                to="/api-docs"
                className={`px-3 py-1.5 rounded-md text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors ${
                  isActive('/api-docs') ? 'text-stone-900 font-semibold bg-stone-100' : ''
                }`}
              >
                API Feeds
              </Link>

              <Link
                to="/about"
                className={`px-3 py-1.5 rounded-md text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors ${
                  isActive('/about') ? 'text-stone-900 font-semibold bg-stone-100' : ''
                }`}
              >
                About
              </Link>
            </nav>
          </div>

          {/* Search and Action Buttons */}
          <div className="flex items-center gap-2.5">
            <form onSubmit={handleSearchSubmit} className="relative hidden sm:block w-44 lg:w-56">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search programs..."
                className="w-full pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-md text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </form>

            <Link
              to="/submit"
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-orange-600 hover:bg-orange-700 text-white rounded-md transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Referral</span>
            </Link>

            {/* Saket Kesar Avatar & GitHub link */}
            <a
              href="https://github.com/Saketkesar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 p-1 hover:bg-stone-100 rounded-md transition-colors border border-stone-200"
              title="Saket Kesar GitHub Profile"
            >
              <img
                src="https://avatars.githubusercontent.com/u/93246904?v=4"
                alt="Saket Kesar"
                className="w-5 h-5 rounded-full object-cover"
              />
              <Github className="w-3.5 h-3.5 text-stone-700 hidden sm:inline" />
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-md"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 bg-white border-b border-stone-200 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-md text-xs text-stone-800 placeholder-stone-400"
            />
          </form>

          <div className="grid grid-cols-2 gap-1 text-xs">
            <Link
              to="/explore"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded hover:bg-stone-100 text-stone-700"
            >
              Directory
            </Link>
            <Link
              to="/api-docs"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded hover:bg-stone-100 text-stone-700"
            >
              API Feeds
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded hover:bg-stone-100 text-stone-700"
            >
              About
            </Link>
            <Link
              to="/submit"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded hover:bg-stone-100 text-orange-600 font-medium col-span-2 text-center border border-orange-200 bg-orange-50"
            >
              + Submit Referral
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
