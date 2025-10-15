import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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

interface AppProps {
  initialPage?: string;
}

function App({ initialPage = 'home' }: AppProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

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

  const handleNavigate = (page: string, projectId?: string) => {
    setCurrentPage(page);
    if (projectId) {
      setSelectedProjectId(projectId);
    }
    scrollToTop();

    // Update URL for admin page
    if (page === 'admin') {
      window.history.pushState({}, '', '/admin');
    } else if (page === 'home') {
      window.history.pushState({}, '', '/');
    } else if (page === 'project-detail' && projectId) {
      window.history.pushState({}, '', `/project/${projectId}`);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#0a1628]' : 'bg-white'}`}>
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
          {currentPage === 'donate' && <DonatePage darkMode={darkMode} />}
          {currentPage === 'about' && <AboutPage darkMode={darkMode} />}
          {currentPage === 'contact' && <ContactPage darkMode={darkMode} />}
          {currentPage === 'project-detail' && selectedProjectId && (
            <ProjectDetailPage
              darkMode={darkMode}
              projectId={selectedProjectId}
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
