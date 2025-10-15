import { motion } from 'motion/react';
import { Shield, Award, TrendingUp, Users } from 'lucide-react';
import { DecorativeElements } from '../components/DecorativeElements';
import { DonationForm } from '../components/DonationForm';

interface DonatePageProps {
  darkMode: boolean;
}

export function DonatePage({ darkMode }: DonatePageProps) {
  const benefits = [
    {
      icon: Shield,
      title: 'Secure Donations',
      description: '100% secure payment processing with industry-leading encryption',
    },
    {
      icon: Award,
      title: 'Tax Deductible',
      description: 'All donations are tax-deductible. Receive instant receipts.',
    },
    {
      icon: TrendingUp,
      title: 'Direct Impact',
      description: '100% of your donation goes directly to helping those in need',
    },
    {
      icon: Users,
      title: 'Regular Updates',
      description: 'Receive updates on how your donation is making a difference',
    },
  ];

  const impactLevels = [
    {
      amount: '$25',
      impact: 'Provides school supplies for 2 children for a month',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      amount: '$50',
      impact: 'Feeds a family of 4 for two weeks',
      color: 'from-purple-500 to-pink-500',
    },
    {
      amount: '$100',
      impact: 'Provides medical care for 5 people',
      color: 'from-orange-500 to-red-500',
    },
    {
      amount: '$250',
      impact: 'Helps build water infrastructure for a village',
      color: 'from-green-500 to-emerald-500',
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
              Support Our Cause
            </motion.p>
            <h1 className="text-white mb-6">
              Every Donation Changes Lives
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              Your generosity transforms lives. Every contribution, no matter the size, makes a meaningful impact in communities around the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className={`py-16 ${darkMode ? 'bg-[#0a1628]' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`rounded-3xl p-8 md:p-12 shadow-2xl ${
              darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-100'
            }`}
          >
            <DonationForm darkMode={darkMode} />
          </motion.div>
        </div>
      </section>

      {/* Impact Levels */}
      <section className={`py-20 ${darkMode ? 'bg-[#0f1c3f]' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`mb-4 ${darkMode ? 'text-white' : 'text-[#1a2f5f]'}`}>
              Your Impact at Every Level
            </h2>
            <p className={`max-w-2xl mx-auto ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
              See the tangible difference your donation makes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactLevels.map((level, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`rounded-2xl p-6 ${
                  darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-100'
                } shadow-lg hover:shadow-2xl transition-all cursor-pointer`}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${level.color} flex items-center justify-center mb-4 text-white`}>
                  <span className="text-lg">{level.amount}</span>
                </div>
                <p className={`${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
                  {level.impact}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={`py-20 ${darkMode ? 'bg-[#0a1628]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`mb-4 ${darkMode ? 'text-white' : 'text-[#1a2f5f]'}`}>
              Why Donate With Us?
            </h2>
            <p className={`max-w-2xl mx-auto ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
              Transparent, secure, and impactful giving
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex gap-6 p-6 rounded-2xl ${
                  darkMode ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-100'
                }`}
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#ff6f0f]/20 to-[#4a90e2]/20 rounded-xl flex items-center justify-center">
                    <benefit.icon className="w-7 h-7 text-[#ff6f0f]" />
                  </div>
                </div>
                <div>
                  <h3 className={`mb-2 ${darkMode ? 'text-white' : 'text-[#1a2f5f]'}`}>
                    {benefit.title}
                  </h3>
                  <p className={darkMode ? 'text-white/70' : 'text-gray-600'}>
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className={`py-20 relative overflow-hidden ${darkMode ? 'bg-gradient-to-r from-[#0f1c3f] to-[#1a2f5f]' : 'bg-gradient-to-r from-[#1a2f5f] to-[#2a4f7f]'}`}>
        <DecorativeElements />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <span className="text-6xl text-[#ff6f0f]">"</span>
            </div>
            <p className="text-white/90 mb-6 text-xl">
              Donating to Mubarak Charity has been one of the most rewarding experiences. Seeing the direct impact of my contribution through their transparent updates gives me confidence that my donation is truly making a difference.
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#ff6f0f] to-[#ff8f3f] rounded-full" />
              <div className="text-left">
                <p className="text-white">Sarah Johnson</p>
                <p className="text-white/60">Monthly Donor</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
