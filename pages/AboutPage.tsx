import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Target, Eye, Heart, Award, Globe, Users as UsersIcon } from 'lucide-react';
import { DecorativeElements } from '../components/DecorativeElements';
import { TeamCard } from '../components/TeamCard';
import { getTeamMembers } from '@/utils/supabase/helpers';

interface AboutPageProps {
  darkMode: boolean;
  onNavigate?: (page: string) => void;
}

export function AboutPage({ darkMode, onNavigate }: AboutPageProps) {
  const [team, setTeam] = useState<Array<{ name: string; role: string; image: string }>>([]);
  const [loadingTeam, setLoadingTeam] = useState(true);

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = async () => {
    try {
      const data = await getTeamMembers();
      setTeam(data);
    } catch (error) {
      console.error('Error loading team:', error);
    } finally {
      setLoadingTeam(false);
    }
  };

  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We lead with empathy and understanding in everything we do',
    },
    {
      icon: Globe,
      title: 'Integrity',
      description: 'We operate with transparency and accountability to our donors and communities',
    },
    {
      icon: UsersIcon,
      title: 'Community',
      description: 'We believe in the power of collective action and inclusive growth',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for the highest standards in our programs and operations',
    },
  ];

  const milestones = [
    { year: '2019', event: 'Strengthening Community Partnerships', description: 'Deepened collaboration with local leaders to ensure sustainable impact.' },
    { year: '2021', event: 'Vocational Training Programs', description: 'Launched skills-based training to empower youth and adults with job-ready capabilities.' },
    { year: '2023', event: 'Digital Access for All', description: 'Introduced digital literacy programs and provided tech resources to bridge the digital divide.' },
    { year: '2025', event: 'Building for the Future', description: 'Expanding our programs to reach more communities—continuing to empower lives and build lasting change.' },
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
              Our Story
            </motion.p>
            <h1 className="text-white mb-6">
              About Us
            </h1>
            <p className="text-white/80 text-2xl max-w-3xl mx-auto font-semibold">
              Empowering Lives, Building Futures
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className={`py-20 ${darkMode ? 'bg-[#0a1628]' : 'bg-white'}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className={`mb-8 ${darkMode ? 'text-white' : 'text-[#1a2f5f]'}`}>
              Who We Are
            </h2>
            <div className={`space-y-6 text-left text-lg leading-relaxed ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
              <p>
                Mubarik Charity is a nonprofit organization dedicated to creating sustainable change in underserved communities. Founded in 2010, we have been at the forefront of providing humanitarian aid, education, and healthcare to those in need. Our team of passionate professionals and volunteers works tirelessly to ensure that every individual has the opportunity to thrive.
              </p>
            </div>

            <h2 className={`mt-12 mb-8 ${darkMode ? 'text-white' : 'text-[#1a2f5f]'}`}>
              What We Do
            </h2>
            <div className={`space-y-6 text-left text-lg leading-relaxed ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
              <p>
                We focus on three core areas: Education, Healthcare, and Community Development. From sponsoring school fees and providing medical supplies to organizing food drives and vocational training programs, we aim to address the root causes of poverty and inequality. Our initiatives are designed to empower individuals and communities to build a brighter future.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className={`py-20 ${darkMode ? 'bg-[#0f1c3f]' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`rounded-3xl p-10 ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-100'
                } shadow-xl`}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#ff6f0f]/20 to-[#4a90e2]/20 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-10 h-10 text-[#ff6f0f]" />
              </div>
              <h2 className={`mb-4 ${darkMode ? 'text-white' : 'text-[#1a2f5f]'}`}>
                Our Mission
              </h2>
              <p className={`${darkMode ? 'text-white/70' : 'text-gray-600'} leading-relaxed text-lg`}>
                Our mission is to provide access to essential resources and opportunities that enable individuals and communities to break the cycle of poverty. We believe in the power of collective action and are committed to creating a world where everyone has the chance to live a healthy, educated, and fulfilling life.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`rounded-3xl p-10 ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-100'
                } shadow-xl`}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#4a90e2]/20 to-[#ff6f0f]/20 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-10 h-10 text-[#4a90e2]" />
              </div>
              <h2 className={`mb-4 ${darkMode ? 'text-white' : 'text-[#1a2f5f]'}`}>
                Our Vision
              </h2>
              <p className={`${darkMode ? 'text-white/70' : 'text-gray-600'} leading-relaxed text-lg`}>
                We envision a world where every individual, regardless of their circumstances, has access to the tools and opportunities needed to reach their full potential. Through our work, we strive to build resilient communities that can sustain themselves and contribute to global progress.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={`py-20 ${darkMode ? 'bg-[#0a1628]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`mb-4 ${darkMode ? 'text-white' : 'text-[#1a2f5f]'}`}>
              Our Core Values
            </h2>
            <p className={`max-w-2xl mx-auto ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
              The principles that guide every decision we make
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`rounded-2xl p-6 text-center ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-100'
                  } transition-all`}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#ff6f0f]/20 to-[#4a90e2]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-[#ff6f0f]" />
                </div>
                <h3 className={`mb-3 ${darkMode ? 'text-white' : 'text-[#1a2f5f]'}`}>
                  {value.title}
                </h3>
                <p className={`${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className={`py-20 ${darkMode ? 'bg-[#0f1c3f]' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`mb-4 ${darkMode ? 'text-white' : 'text-[#1a2f5f]'}`}>
              Our Journey in Milestones
            </h2>
            <p className={`max-w-2xl mx-auto ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
              Key moments that shaped our organization
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className={`absolute left-1/2 top-0 bottom-0 w-0.5 ${darkMode ? 'bg-white/10' : 'bg-gray-200'} hidden lg:block`} />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className={`inline-block rounded-2xl p-6 ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-100'
                      } shadow-lg`}>
                      <div className="text-[#ff6f0f] mb-2">{milestone.year}</div>
                      <h3 className={`mb-2 ${darkMode ? 'text-white' : 'text-[#1a2f5f]'}`}>
                        {milestone.event}
                      </h3>
                      <p className={darkMode ? 'text-white/60' : 'text-gray-600'}>
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  <div className="hidden lg:block w-4 h-4 bg-[#ff6f0f] rounded-full border-4 border-[#0f1c3f] relative z-10" />

                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={`py-20 ${darkMode ? 'bg-[#0a1628]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`mb-4 ${darkMode ? 'text-white' : 'text-[#1a2f5f]'}`}>
              Meet Our Team
            </h2>
            <p className={`max-w-2xl mx-auto ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
              Dedicated individuals working tirelessly to make a difference
            </p>
          </motion.div>

          {loadingTeam ? (
            <div className="flex justify-center items-center py-12">
              <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${darkMode ? 'border-white' : 'border-[#1a2f5f]'}`}></div>
            </div>
          ) : team.length === 0 ? (
            <div className={`text-center py-12 ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
              <p>No team members found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <TeamCard key={index} {...member} darkMode={darkMode} index={index} />
              ))}
            </div>
          )}
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
              Join Our Mission
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Be part of something bigger. Whether through donations, volunteering, or spreading the word, your support makes all the difference.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate?.('projects')}
                className="bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] text-white px-12 py-4 rounded-lg shadow-xl"
              >
                Become a Donor
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate?.('contact')}
                className="bg-white/10 backdrop-blur-sm text-white px-12 py-4 rounded-lg border border-white/20 hover:bg-white/20 transition-all"
              >
                Volunteer With Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
