import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster } from 'sonner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { DonatePage } from './pages/DonatePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { DonationDetailPage } from './pages/DonationDetailPage';

interface AppProps {
  initialPage?: string;
}

function App({ initialPage = 'home' }: AppProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (page: string, id?: string) => {
    setCurrentPage(page);
    if (id) {
      if (page === 'project-detail') {
        setSelectedProjectId(id);
      } else if (page === 'donation-detail') {
        setSelectedCampaignId(id);
      }
    }
    scrollToTop();

    // Update URL
    if (page === 'admin') {
      window.history.pushState({}, '', '/admin');
    } else if (page === 'home') {
      window.history.pushState({}, '', '/');
    } else if (page === 'project-detail' && id) {
      window.history.pushState({}, '', `/project/${id}`);
    } else if (page === 'donation-detail' && id) {
      window.history.pushState({}, '', `/donation/${id}`);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#0a1628]' : 'bg-white'}`}>
      <Toaster position="top-right" richColors />
      {currentPage !== 'admin' && (
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentPage === 'home' && <HomePage darkMode={darkMode} onNavigate={handleNavigate} />}
          {currentPage === 'projects' && <ProjectsPage darkMode={darkMode} onNavigate={handleNavigate} />}
          {currentPage === 'donate' && <DonatePage darkMode={darkMode} onNavigate={handleNavigate} />}
          {currentPage === 'about' && <AboutPage darkMode={darkMode} onNavigate={handleNavigate} />}
          {currentPage === 'contact' && <ContactPage darkMode={darkMode} />}
          {currentPage === 'project-detail' && selectedProjectId && (
            <ProjectDetailPage
              darkMode={darkMode}
              projectId={selectedProjectId}
              onNavigate={handleNavigate}
            />
          )}
          {currentPage === 'donation-detail' && selectedCampaignId && (
            <DonationDetailPage
              darkMode={darkMode}
              campaignId={selectedCampaignId}
              onNavigate={handleNavigate}
            />
          )}
          {currentPage === 'admin' && <AdminPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
        </motion.div>
      </AnimatePresence>

      {currentPage !== 'admin' && (
        <>
          <Footer darkMode={darkMode} />
          <WhatsAppButton />
        </>
      )}
    </div>
  );
}

export default App;
