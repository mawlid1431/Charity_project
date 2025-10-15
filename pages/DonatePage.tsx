import { motion } from 'motion/react';
import { Shield, Award, TrendingUp, Users } from 'lucide-react';
import { DecorativeElements } from '../components/DecorativeElements';
import { DonationForm } from '../components/DonationForm';

interface DonatePageProps {
  darkMode: boolean;
  onNavigate: (page: string) => void;
}

export function DonatePage({ darkMode, onNavigate }: DonatePageProps) {
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
      {/* Beautiful Animated Arabic/English Header */}
      <section className={`relative py-24 overflow-hidden ${darkMode ? 'bg-gradient-to-br from-[#0f1c3f] via-[#1a2f5f] to-[#0f1c3f]' : 'bg-gradient-to-br from-[#1a2f5f] via-[#2a4f7f] to-[#1a2f5f]'}`}>
        <DecorativeElements />

        {/* Animated Background Orbs */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-10 w-72 h-72 bg-[#ff6f0f] rounded-full blur-3xl"
          ></motion.div>
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -50, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 right-10 w-96 h-96 bg-[#ff8f3f] rounded-full blur-3xl"
          ></motion.div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Decorative Top Stars */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="flex items-center justify-center gap-4 mb-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-4xl"
              >
                ✨
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl"
              >
                🌟
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-4xl"
              >
                ✨
              </motion.div>
            </motion.div>

            {/* Arabic Text with Glow Effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="mb-8"
            >
              <motion.h1
                className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl"
                style={{
                  fontFamily: 'Arial, sans-serif',
                  textShadow: '0 0 40px rgba(255, 111, 15, 0.5), 0 0 80px rgba(255, 111, 15, 0.3)'
                }}
                animate={{
                  textShadow: [
                    '0 0 40px rgba(255, 111, 15, 0.5)',
                    '0 0 60px rgba(255, 111, 15, 0.8)',
                    '0 0 40px rgba(255, 111, 15, 0.5)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                الصدقة بركة لا تنتهي
              </motion.h1>

              {/* Animated Decorative Line */}
              <div className="flex items-center justify-center gap-6 mb-6">
                <motion.div
                  className="h-1 w-32 bg-gradient-to-r from-transparent via-[#ff6f0f] to-[#ff8f3f] rounded-full"
                  animate={{
                    scaleX: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                ></motion.div>
                <motion.div
                  className="relative"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-4 h-4 bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] rounded-full"></div>
                  <motion.div
                    className="absolute inset-0 w-4 h-4 bg-[#ff6f0f] rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  ></motion.div>
                </motion.div>
                <motion.div
                  className="h-1 w-32 bg-gradient-to-r from-[#ff8f3f] via-[#ff6f0f] to-transparent rounded-full"
                  animate={{
                    scaleX: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                ></motion.div>
              </div>
            </motion.div>

            {/* English Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-4"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Charity is a blessing that never ends
              </h2>
              <motion.p
                className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Your generosity creates lasting impact and brings hope to those in need
              </motion.p>
            </motion.div>

            {/* Animated Hearts */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex items-center justify-center gap-4"
            >
              {[0, 0.2, 0.4].map((delay, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: delay
                  }}
                  className="text-3xl"
                >
                  ❤️
                </motion.div>
              ))}
            </motion.div>

            {/* Bouncing Dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 flex items-center justify-center gap-3"
            >
              {[0, 0.15, 0.3].map((delay, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] rounded-full"
                  animate={{
                    y: [0, -15, 0],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: delay,
                    ease: "easeInOut"
                  }}
                ></motion.div>
              ))}
            </motion.div>
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
            className={`rounded-3xl p-8 md:p-12 shadow-2xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-100'
              }`}
          >
            <DonationForm darkMode={darkMode} onNavigate={onNavigate} />
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
                className={`rounded-2xl p-6 ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-100'
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
                className={`flex gap-6 p-6 rounded-2xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-100'
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
