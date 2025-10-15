import { motion } from 'motion/react';
import { Heart, BookOpen, Users, Droplet, ArrowRight, Play, TrendingUp, Award, Target, Zap } from 'lucide-react';
import { DecorativeElements } from '../components/DecorativeElements';
import { ProjectCard } from '../components/ProjectCard';
import { TypewriterText } from '../components/TypewriterText';
import { HeroImageSlider } from '../components/HeroImageSlider';

interface HomePageProps {
  darkMode: boolean;
  onNavigate: (page: string) => void;
}

export function HomePage({ darkMode, onNavigate }: HomePageProps) {
  // Hero slider images - 3 different charity images that transition smoothly
  const heroImages = [
    'https://images.unsplash.com/photo-1653508311027-6765ae757c40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFyaXR5JTIwaGVscGluZyUyMGNoaWxkcmVuJTIwZWR1Y2F0aW9ufGVufDF8fHx8MTc2MDQ2NjA4NXww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1631295161934-ec6c829d282a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBzdXBwb3J0JTIwaGFuZHMlMjB0b2dldGhlcnxlbnwxfHx8fDE3NjA0MDI4MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1641569707854-c80945fb4719?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodW1hbml0YXJpYW4lMjBhaWQlMjB2b2x1bnRlZXJzfGVufDF8fHx8MTc2MDQ2NjA4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
  ];

  const projects = [
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
  ];

  const categories = [
    { icon: Heart, title: 'Health Care', count: '45+ Programs', color: 'from-red-500 to-pink-500' },
    { icon: BookOpen, title: 'Education', count: '60+ Programs', color: 'from-blue-500 to-cyan-500' },
    { icon: Users, title: 'Community', count: '35+ Programs', color: 'from-purple-500 to-indigo-500' },
    { icon: Droplet, title: 'Clean Water', count: '25+ Programs', color: 'from-green-500 to-emerald-500' },
  ];

  const stats = [
    { icon: Users, number: '10,000+', label: 'Lives Impacted', color: 'from-orange-500 to-red-500' },
    { icon: BookOpen, number: '50+', label: 'Active Projects', color: 'from-blue-500 to-cyan-500' },
    { icon: Heart, number: '$500K+', label: 'Funds Raised', color: 'from-pink-500 to-purple-500' },
  ];

  const features = [
    {
      icon: Target,
      title: 'Targeted Impact',
      description: 'Focused programs that address root causes and create lasting change',
    },
    {
      icon: TrendingUp,
      title: 'Transparent Growth',
      description: 'Track your contribution and see real-time impact metrics',
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: 'Award-winning programs recognized by international organizations',
    },
    {
      icon: Zap,
      title: 'Rapid Response',
      description: 'Quick deployment to areas in urgent need of assistance',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className={`relative min-h-screen flex items-center overflow-hidden ${darkMode ? 'bg-gradient-to-br from-[#0a1628] via-[#0f1c3f] to-[#1a2f5f]' : 'bg-gradient-to-br from-[#1a2f5f] via-[#2a4f7f] to-[#3a5f8f]'}`}>
        <DecorativeElements />
        
        {/* Animated gradient overlay */}
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(255, 111, 15, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(74, 144, 226, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(255, 111, 15, 0.15) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Image Slider with Typewriter Text Below */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative space-y-8"
            >
              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative"
              >
                <HeroImageSlider images={heroImages} interval={6000} />
              </motion.div>

              {/* Typewriter Text Below Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="text-center lg:text-left"
              >
                <TypewriterText
                  texts={[
                    'Empowering Communities...',
                    'Educating Children...',
                    'Building Hope...',
                    'Changing Lives...',
                    'Creating Impact...',
                  ]}
                  typingSpeed={100}
                  deletingSpeed={50}
                  pauseDuration={2000}
                  className="text-white/90 text-xl md:text-2xl"
                />
              </motion.div>
              
              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.6, type: 'spring' }}
                className="absolute top-8 -right-3 lg:-right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-2xl max-w-[200px] border border-white/20"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#ff6f0f] to-[#ff8f3f] rounded-xl flex items-center justify-center shadow-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Lives Impacted</p>
                    <p className="text-xl text-[#ff6f0f]">10,000+</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 pt-2.5 border-t border-gray-100">
                  <span className="text-[#ff6f0f] text-sm">⭐⭐⭐⭐⭐</span>
                  <span className="text-xs text-gray-600">Trusted</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.span
                  className="inline-block px-4 py-2 bg-[#ff6f0f]/10 border border-[#ff6f0f]/30 rounded-full text-[#ff6f0f] mb-6 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  Making a Difference Since 2015
                </motion.span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-white leading-tight"
              >
                Together, We Build a{' '}
                <span className="bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] bg-clip-text text-transparent">
                  Better Tomorrow
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-white/80 leading-relaxed max-w-xl"
              >
                Empowering communities through education, healthcare, and sustainable development. Join us in creating lasting change for families in need.
              </motion.p>
              
              {/* Quick stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-3 gap-4 py-4"
              >
                {[
                  { value: '50+', label: 'Projects' },
                  { value: '15+', label: 'Countries' },
                  { value: '100%', label: 'Transparent' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="text-center"
                  >
                    <p className="text-3xl text-white mb-1">{stat.value}</p>
                    <p className="text-white/60 text-sm">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate('donate')}
                  className="bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] text-white px-8 py-3 rounded-xl flex items-center gap-3 shadow-lg shadow-[#ff6f0f]/30 hover:shadow-xl hover:shadow-[#ff6f0f]/40 transition-all group"
                >
                  <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Donate Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate('about')}
                  className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-xl flex items-center gap-3 border border-white/20 hover:bg-white/20 transition-all group"
                >
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Learn More</span>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
          onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-white"
            />
          </div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className={`py-16 relative overflow-hidden ${darkMode ? 'bg-[#0a1628]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.span
              className={`inline-block px-4 py-2 rounded-full mb-4 ${
                darkMode ? 'bg-[#ff6f0f]/10 text-[#ff6f0f]' : 'bg-[#ff6f0f]/10 text-[#ff6f0f]'
              }`}
            >
              What We Do
            </motion.span>
            <h2 className={`mb-4 ${darkMode ? 'text-white' : 'text-[#1a2f5f]'}`}>
              Our Focus Areas
            </h2>
            <p className={`max-w-2xl mx-auto text-lg ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
              Discover how we're making an impact across different communities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`rounded-2xl p-8 text-center cursor-pointer transition-all relative group ${
                  darkMode 
                    ? 'bg-white/5 border border-white/10 hover:bg-white/10' 
                    : 'bg-white border border-gray-100 hover:shadow-2xl'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff6f0f]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className={`relative w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform`}>
                  <category.icon className="w-10 h-10 text-white" />
                </div>
                
                <h3 className={`mb-2 relative ${darkMode ? 'text-white' : 'text-[#1a2f5f]'}`}>
                  {category.title}
                </h3>
                <p className={`relative ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                  {category.count}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className={`py-16 relative overflow-hidden ${darkMode ? 'bg-gradient-to-br from-[#0f1c3f] to-[#1a2f5f]' : 'bg-gradient-to-br from-gray-50 to-white'}`}>
        <DecorativeElements />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.span
              className="inline-block px-4 py-2 bg-[#ff6f0f]/10 border border-[#ff6f0f]/30 rounded-full text-[#ff6f0f] mb-4"
            >
              Making Impact
            </motion.span>
            <h2 className={`mb-4 ${darkMode ? 'text-white' : 'text-[#1a2f5f]'}`}>
              Featured Projects
            </h2>
            <p className={`max-w-2xl mx-auto text-lg ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
              Your donations are creating real, measurable impact in communities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} darkMode={darkMode} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('projects')}
              className="bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] text-white px-10 py-4 rounded-xl flex items-center gap-3 mx-auto shadow-lg shadow-[#ff6f0f]/30 hover:shadow-xl hover:shadow-[#ff6f0f]/40 transition-all group"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className={`py-16 ${darkMode ? 'bg-[#0a1628]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.span
              className={`inline-block px-4 py-2 rounded-full mb-4 ${
                darkMode ? 'bg-[#ff6f0f]/10 text-[#ff6f0f]' : 'bg-[#ff6f0f]/10 text-[#ff6f0f]'
              }`}
            >
              Why Us
            </motion.span>
            <h2 className={`mb-4 ${darkMode ? 'text-white' : 'text-[#1a2f5f]'}`}>
              Why Choose Mubarak Charity
            </h2>
            <p className={`max-w-2xl mx-auto text-lg ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
              We're committed to transparency, efficiency, and lasting impact
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`p-8 rounded-2xl ${
                  darkMode ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-100'
                } hover:shadow-xl transition-all group`}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#ff6f0f]/20 to-[#4a90e2]/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-[#ff6f0f]" />
                </div>
                <h3 className={`mb-3 ${darkMode ? 'text-white' : 'text-[#1a2f5f]'}`}>
                  {feature.title}
                </h3>
                <p className={darkMode ? 'text-white/70' : 'text-gray-600'}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-16 relative overflow-hidden ${darkMode ? 'bg-gradient-to-br from-[#0f1c3f] to-[#1a2f5f]' : 'bg-gradient-to-br from-[#1a2f5f] to-[#2a4f7f]'}`}>
        <DecorativeElements />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: 'spring' }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="text-center p-10 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl"
              >
                <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                <motion.h2
                  initial={{ scale: 1 }}
                  whileInView={{ scale: [1, 1.1, 1] }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                  className="text-white mb-2"
                >
                  {stat.number}
                </motion.h2>
                <p className="text-white/80 text-lg">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 relative overflow-hidden ${darkMode ? 'bg-[#0a1628]' : 'bg-white'}`}>
        <DecorativeElements />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`rounded-3xl p-12 md:p-16 ${
              darkMode 
                ? 'bg-gradient-to-br from-[#0f1c3f] to-[#1a2f5f] border border-white/10' 
                : 'bg-gradient-to-br from-[#1a2f5f] to-[#2a4f7f]'
            } shadow-2xl`}
          >
            <motion.div
              className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-[#ff6f0f] to-[#ff8f3f] rounded-2xl flex items-center justify-center shadow-lg"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <Heart className="w-10 h-10 text-white" />
            </motion.div>
            
            <h2 className="text-white mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Every contribution, big or small, helps us change lives and build stronger communities. Join us today and be part of something bigger.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('donate')}
                className="bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] text-white px-12 py-5 rounded-xl shadow-xl hover:shadow-2xl transition-all text-lg group"
              >
                <span className="flex items-center gap-3">
                  Start Donating Today
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('contact')}
                className="bg-white/10 backdrop-blur-sm text-white px-12 py-5 rounded-xl border border-white/20 hover:bg-white/20 transition-all text-lg"
              >
                Get In Touch
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
