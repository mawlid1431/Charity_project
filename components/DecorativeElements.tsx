import { motion } from 'motion/react';

export function DecorativeElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Diagonal Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-white" />
        </svg>
      </div>

      {/* Large Floating Circles */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          x: [0, 15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 right-[10%] w-32 h-32 bg-gradient-to-br from-[#ff6f0f]/20 to-[#ff8f3f]/10 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          y: [0, 40, 0],
          x: [0, -20, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[30%] left-[5%] w-40 h-40 bg-gradient-to-br from-[#4a90e2]/20 to-[#5aa0f2]/10 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          y: [0, -35, 0],
          x: [0, 25, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[20%] right-[15%] w-48 h-48 bg-gradient-to-br from-[#00d4a1]/15 to-[#00e4b1]/10 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[60%] left-[8%] w-24 h-24 bg-gradient-to-br from-[#ffd93d]/20 to-[#ffe95d]/10 rounded-full blur-2xl"
      />

      {/* Geometric Shapes with Gradient Borders */}
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[15%] left-[15%] w-32 h-32 rounded-2xl"
        style={{ 
          background: 'linear-gradient(135deg, rgba(255, 111, 15, 0.1), transparent)',
          transform: 'rotate(45deg)',
          border: '2px solid rgba(255, 111, 15, 0.1)',
        }}
      />

      <motion.div
        animate={{
          rotate: [360, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-[30%] right-[8%] w-40 h-40 rounded-full border-2 opacity-10"
        style={{
          borderColor: 'rgba(74, 144, 226, 0.3)',
        }}
      />

      {/* Animated Dots Cloud */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [0.1, 0.6, 0.1],
            scale: [1, 1.5, 1],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 4 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
          className="absolute w-1.5 h-1.5 bg-white rounded-full"
          style={{
            top: `${10 + Math.random() * 80}%`,
            left: `${5 + Math.random() * 90}%`,
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
          }}
        />
      ))}

      {/* Glowing Orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[40%] right-[20%] w-2 h-2 bg-[#ff6f0f] rounded-full"
        style={{
          boxShadow: '0 0 30px 10px rgba(255, 111, 15, 0.4)',
        }}
      />

      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-[35%] left-[25%] w-2 h-2 bg-[#4a90e2] rounded-full"
        style={{
          boxShadow: '0 0 30px 10px rgba(74, 144, 226, 0.4)',
        }}
      />
    </div>
  );
}
