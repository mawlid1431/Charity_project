import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroImageSliderProps {
  images: string[];
  interval?: number;
}

export function HeroImageSlider({ images, interval = 5000 }: HeroImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative w-full max-w-sm mx-auto lg:mx-0">
      {/* Glow effect behind images */}
      <div className="absolute -inset-3 bg-gradient-to-r from-[#ff6f0f]/20 to-[#4a90e2]/20 rounded-[2.5rem] blur-2xl opacity-50 z-0" />
      
      {/* Fixed aspect ratio container */}
      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl ring-1 ring-white/10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              opacity: { duration: 1.5, ease: 'easeInOut' },
              scale: { duration: 1.5, ease: 'easeInOut' }
            }}
            className="absolute inset-0 w-full h-full"
          >
            <ImageWithFallback
              src={images[currentIndex]}
              alt={`Charity image ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Subtle overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Image indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {images.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-500 rounded-full ${
                index === currentIndex
                  ? 'w-10 h-2.5 bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f]'
                  : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/60'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress bar for current image */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] rounded-full z-20"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: interval / 1000, ease: 'linear' }}
          key={`progress-${currentIndex}`}
        />
      </div>
    </div>
  );
}
