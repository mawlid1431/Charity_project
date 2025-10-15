import { motion } from 'motion/react';
import { Target, Eye, Heart, Award, Globe, Users as UsersIcon } from 'lucide-react';
import { DecorativeElements } from '../components/DecorativeElements';
import { TeamCard } from '../components/TeamCard';

interface AboutPageProps {
  darkMode: boolean;
}

export function AboutPage({ darkMode }: AboutPageProps) {
  const team = [
    {
      name: 'Ahmed Mubarak',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1676276375450-3707e4e624c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwbWVldGluZyUyMGRpdmVyc2l0eXxlbnwxfHx8fDE3NjA0NDc2ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Fatima Hassan',
      role: 'Director of Programs',
      image: 'https://images.unsplash.com/photo-1666281269793-da06484657e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGVkdWNhdGlvbiUyMGFmcmljYXxlbnwxfHx8fDE3NjAzODc4MTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Ibrahim Ali',
      role: 'Community Outreach Manager',
      image: 'https://images.unsplash.com/photo-1697665387559-253e7a645e96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBoZWxwJTIwaGFuZHN8ZW58MXx8fHwxNzYwNDQ3Njg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Aisha Mohamed',
      role: 'Finance Director',
      image: 'https://images.unsplash.com/photo-1653508310326-2482de0e96c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjaGFyaXR5JTIwd29ya2VyJTIwc21pbGluZ3xlbnwxfHx8fDE3NjA0NDgwODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Omar Khalid',
      role: 'Volunteer Coordinator',
      image: 'https://images.unsplash.com/photo-1643214410415-de1976ad74ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHZvbHVudGVlciUyMGNvbW11bml0eXxlbnwxfHx8fDE3NjA0NDgwODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Zainab Ahmed',
      role: 'Communications Lead',
      image: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZG9uYXRpb24lMjBjaGFyaXR5fGVufDF8fHx8MTc2MDM4MDY4OXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

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
    { year: '2015', event: 'Founded Mubarak Charity', description: 'Started with a small team and big dreams' },
    { year: '2017', event: 'First 1,000 Lives Impacted', description: 'Reached our first major milestone' },
    { year: '2019', event: 'Expanded to 5 Countries', description: 'Growing our global presence' },
    { year: '2021', event: 'Launched Education Program', description: 'Opening doors to learning' },
    { year: '2023', event: '10,000+ Lives Changed', description: 'Celebrating a decade of impact' },
    { year: '2025', event: 'Building for the Future', description: 'Expanding programs and reach' },
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
              About Mubarak Charity
            </h1>
            <p className="text-white/80 max-w-3xl mx-auto">
              A journey of compassion, dedication, and transformative impact that started with a simple belief: every person deserves dignity, opportunity, and access to basic needs.
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
              Our Journey
            </h2>
            <div className={`space-y-6 text-left ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
              <p>
                Founded in 2015, Mubarak Charity was born from a simple belief: that every person deserves dignity, opportunity, and access to basic needs. What started as a small community initiative has grown into a movement that has touched thousands of lives across multiple countries.
              </p>
              <p>
                Our founder, Ahmed Mubarak, witnessed firsthand the challenges faced by underprivileged communities and was moved to take action. Starting with just a handful of volunteers and limited resources, we began by providing food and basic necessities to families in need.
              </p>
              <p>
                Today, we've expanded our reach to include education programs, healthcare initiatives, clean water projects, and women's empowerment programs. We work tirelessly to bridge the gap between those who have and those in need, creating sustainable solutions that empower communities to build their own futures.
              </p>
              <p>
                Our success is measured not in dollars, but in the smiles of children who can now go to school, the gratitude of families who have access to clean water, and the pride of women who have gained economic independence. Every story of transformation fuels our commitment to do more.
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
              className={`rounded-3xl p-10 ${
                darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-100'
              } shadow-xl`}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#ff6f0f]/20 to-[#4a90e2]/20 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-10 h-10 text-[#ff6f0f]" />
              </div>
              <h2 className={`mb-4 ${darkMode ? 'text-white' : 'text-[#1a2f5f]'}`}>
                Our Mission
              </h2>
              <p className={`${darkMode ? 'text-white/70' : 'text-gray-600'} leading-relaxed`}>
                To uplift vulnerable communities through education, food, and compassion. We believe in creating lasting change by addressing root causes and empowering individuals to become agents of their own transformation. Our approach is holistic, sustainable, and community-driven.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`rounded-3xl p-10 ${
                darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-100'
              } shadow-xl`}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#4a90e2]/20 to-[#ff6f0f]/20 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-10 h-10 text-[#4a90e2]" />
              </div>
              <h2 className={`mb-4 ${darkMode ? 'text-white' : 'text-[#1a2f5f]'}`}>
                Our Vision
              </h2>
              <p className={`${darkMode ? 'text-white/70' : 'text-gray-600'} leading-relaxed`}>
                A world where every individual has dignity, opportunity, and access to basic needs. We envision communities that are self-sustaining, educated, and empowered to create positive change for generations to come. A future where charity evolves into partnership and dependency transforms into independence.
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
                className={`rounded-2xl p-6 text-center ${
                  darkMode ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-100'
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
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className={`inline-block rounded-2xl p-6 ${
                      darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-100'
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <TeamCard key={index} {...member} darkMode={darkMode} index={index} />
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
              Join Our Mission
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Be part of something bigger. Whether through donations, volunteering, or spreading the word, your support makes all the difference.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] text-white px-12 py-4 rounded-lg shadow-xl"
              >
                Become a Donor
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
