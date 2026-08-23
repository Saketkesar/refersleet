import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { ReferralDetailPage } from './pages/ReferralDetailPage';
import { CategoryDetailPage } from './pages/CategoryDetailPage';
import { RedirectSimulatorPage } from './pages/RedirectSimulatorPage';
import { SubmitPage } from './pages/SubmitPage';
import { ContributorDetailPage } from './pages/ContributorDetailPage';
import { AboutPage, DisclosurePage, FAQPage } from './pages/InfoPages';
import { ApiDocsPage } from './pages/ApiDocsPage';

export const App: React.FC = () => {
  return (
    <DataProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-[#FFFFFF] text-[#191716] font-sans selection:bg-orange-100 selection:text-orange-900">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/referrals/:slug" element={<ReferralDetailPage />} />
              <Route path="/category/:slug" element={<CategoryDetailPage />} />
              <Route path="/r/:slug" element={<RedirectSimulatorPage />} />
              <Route path="/submit" element={<SubmitPage />} />
              <Route path="/contributors/:username" element={<ContributorDetailPage />} />
              <Route path="/api-docs" element={<ApiDocsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/disclosure" element={<DisclosurePage />} />
              <Route path="/faq" element={<FAQPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </DataProvider>
  );
};
export default App;
