import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface DonationFormProps {
  darkMode: boolean;
  onNavigate: (page: string) => void;
}

export function DonationForm({ onNavigate }: DonationFormProps) {
  const handleDonateClick = () => {
    onNavigate('projects');
  };

  return (
    <motion.button
      type="button"
      onClick={handleDonateClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] text-white py-5 px-8 rounded-xl text-xl font-bold transition-all shadow-lg hover:shadow-2xl hover:shadow-[#ff6f0f]/40 flex items-center justify-center gap-3 group"
    >
      <Heart className="w-6 h-6 group-hover:scale-110 transition-transform" />
      Donate Now
    </motion.button>
  );
}
