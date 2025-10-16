import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Filter, Search, Loader } from 'lucide-react';
import { DecorativeElements } from '../components/DecorativeElements';
import { ProjectCard } from '../components/ProjectCard';
import { getProjects } from '@/utils/supabase/helpers';

interface ProjectsPageProps {
  darkMode: boolean;
  onNavigate: (page: string, projectId?: string) => void;
}

export function ProjectsPage({ darkMode, onNavigate }: ProjectsPageProps) {
  const [allProjects, setAllProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load projects from Supabase
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      const formattedProjects = data.map(p => ({
        id: p.id,
        title: p.name,
        description: p.description,
        image: p.image,
        date: p.date,
      }));
      setAllProjects(formattedProjects);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#0a1628]' : 'bg-white'}`}>
      {/* Header Section */}
      <section className={`relative py-32 overflow-hidden ${darkMode ? 'bg-gradient-to-r from-[#0f1c3f] to-[#1a2f5f]' : 'bg-gradient-to-r from-[#1a2f5f] to-[#2a4f7f]'}`}>
        <DecorativeElements />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#ff6f0f] mb-4 tracking-wider uppercase"
            >
              Our Impact
            </motion.p>
            <h1 className="text-white mb-6">
              Making a Difference Together
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              Every project represents hope, change, and the power of community working together for a better future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className={`py-8 ${darkMode ? 'bg-[#0f1c3f]' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1"
            >
              <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${darkMode
                ? 'bg-white/5 border-white/10'
                : 'bg-white border-gray-200'
                }`}>
                <Search className={`w-5 h-5 ${darkMode ? 'text-white/40' : 'text-gray-400'}`} />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className={`flex-1 bg-transparent outline-none ${darkMode ? 'text-white placeholder:text-white/40' : 'text-gray-900 placeholder:text-gray-400'
                    }`}
                />
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg border ${darkMode
                ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50'
                } transition-all`}
            >
              <Filter className="w-5 h-5" />
              Filter
            </motion.button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className={`py-16 ${darkMode ? 'bg-[#0a1628]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full flex justify-center py-20">
                <Loader className="w-12 h-12 animate-spin text-[#ff6f0f]" />
              </div>
            ) : allProjects.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  No active projects at the moment
                </p>
                <p className={`text-sm mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Check back soon for new projects!
                </p>
              </div>
            ) : (
              allProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  {...project}
                  darkMode={darkMode}
                  index={index}
                  onClick={() => onNavigate('project-detail', project.id)}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 relative overflow-hidden ${darkMode ? 'bg-gradient-to-r from-[#0f1c3f] to-[#1a2f5f]' : 'bg-gradient-to-r from-[#1a2f5f] to-[#2a4f7f]'}`}>
        <DecorativeElements />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-white mb-6">
              Don't See What You're Looking For?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              We're constantly expanding our programs. Get in touch to learn more about how you can help.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] text-white px-12 py-4 rounded-lg shadow-xl"
            >
              Contact Us
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
