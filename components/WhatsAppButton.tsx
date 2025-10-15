import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function WhatsAppButton() {
  const whatsappNumber = '1234567890'; // Replace with actual WhatsApp number
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#ff6f0f] hover:bg-[#ff8f3f] rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{
        boxShadow: '0 0 25px rgba(255, 111, 15, 0.5)',
      }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageCircle className="w-7 h-7" />
    </motion.a>
  );
}
