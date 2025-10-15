import { motion } from 'motion/react';
import { Filter, Search } from 'lucide-react';
import { DecorativeElements } from '../components/DecorativeElements';
import { ProjectCard } from '../components/ProjectCard';

interface ProjectsPageProps {
  darkMode: boolean;
}

export function ProjectsPage({ darkMode }: ProjectsPageProps) {
  const allProjects = [
    {
      title: 'Education for All',
      description: 'Providing quality education and school supplies to underprivileged children across rural communities.',
      image: 'https://images.unsplash.com/photo-1666281269793-da06484657e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGVkdWNhdGlvbiUyMGFmcmljYXxlbnwxfHx8fDE3NjAzODc4MTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      progress: 75,
      raised: '15,000',
      goal: '20,000',
    },
    {
      title: 'Community Support',
      description: 'Supporting families in need with essential resources, food, and healthcare services.',
      image: 'https://images.unsplash.com/photo-1697665387559-253e7a645e96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBoZWxwJTIwaGFuZHN8ZW58MXx8fHwxNzYwNDQ3Njg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      progress: 60,
      raised: '12,000',
      goal: '20,000',
    },
    {
      title: 'Clean Water Access',
      description: 'Building wells and water infrastructure to provide clean drinking water to remote villages.',
      image: 'https://images.unsplash.com/photo-1649518319696-7835249a7c72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHdlbGwlMjBjb21tdW5pdHl8ZW58MXx8fHwxNzYwMzQ0OTI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      progress: 45,
      raised: '9,000',
      goal: '20,000',
    },
    {
      title: 'Food Distribution',
      description: 'Providing nutritious meals and food packages to families facing food insecurity.',
      image: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZG9uYXRpb24lMjBjaGFyaXR5fGVufDF8fHx8MTc2MDM4MDY4OXww&ixlib=rb-4.1.0&q=80&w=1080',
      progress: 82,
      raised: '16,400',
      goal: '20,000',
    },
    {
      title: 'Healthcare Initiative',
      description: 'Mobile health clinics providing free medical care and vaccinations to underserved areas.',
      image: 'https://images.unsplash.com/photo-1653508310326-2482de0e96c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjaGFyaXR5JTIwd29ya2VyJTIwc21pbGluZ3xlbnwxfHx8fDE3NjA0NDgwODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      progress: 55,
      raised: '11,000',
      goal: '20,000',
    },
    {
      title: 'Women Empowerment',
      description: 'Vocational training and microfinance programs to help women achieve economic independence.',
      image: 'https://images.unsplash.com/photo-1643214410415-de1976ad74ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHZvbHVudGVlciUyMGNvbW11bml0eXxlbnwxfHx8fDE3NjA0NDgwODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      progress: 68,
      raised: '13,600',
      goal: '20,000',
    },
  ];

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
              <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${
                darkMode 
                  ? 'bg-white/5 border-white/10' 
                  : 'bg-white border-gray-200'
              }`}>
                <Search className={`w-5 h-5 ${darkMode ? 'text-white/40' : 'text-gray-400'}`} />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className={`flex-1 bg-transparent outline-none ${
                    darkMode ? 'text-white placeholder:text-white/40' : 'text-gray-900 placeholder:text-gray-400'
                  }`}
                />
              </div>
            </motion.div>
            
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg border ${
                darkMode 
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
            {allProjects.map((project, index) => (
              <ProjectCard key={index} {...project} darkMode={darkMode} index={index} />
            ))}
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
