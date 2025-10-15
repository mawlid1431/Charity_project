import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Check } from 'lucide-react';
import { supabase } from '@/utils/supabase/client';
import { toast } from 'sonner';

interface ContactFormProps {
  darkMode: boolean;
}

export function ContactForm({ darkMode }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate sending (you can add email service later)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Show success
      setShowSuccess(true);
      toast.success('Message sent successfully!');

      setTimeout(() => {
        setShowSuccess(false);
        setName('');
        setEmail('');
        setMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="bg-[#ff6f0f]/10 border border-[#ff6f0f] rounded-lg p-4 flex items-center gap-3"
        >
          <Check className="w-5 h-5 text-[#ff6f0f]" />
          <span className={darkMode ? 'text-white' : 'text-black'}>
            Message sent successfully! We'll get back to you soon.
          </span>
        </motion.div>
      )}

      <div>
        <label className={`block mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
          Full Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={`w-full px-4 py-3 rounded-lg border ${darkMode
            ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40'
            : 'bg-white border-black/10 text-black placeholder:text-black/40'
            } focus:outline-none focus:ring-2 focus:ring-[#ff6f0f]`}
          placeholder="Your name"
        />
      </div>

      <div>
        <label className={`block mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={`w-full px-4 py-3 rounded-lg border ${darkMode
            ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40'
            : 'bg-white border-black/10 text-black placeholder:text-black/40'
            } focus:outline-none focus:ring-2 focus:ring-[#ff6f0f]`}
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className={`block mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
          Message
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={6}
          className={`w-full px-4 py-3 rounded-lg border ${darkMode
            ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40'
            : 'bg-white border-black/10 text-black placeholder:text-black/40'
            } focus:outline-none focus:ring-2 focus:ring-[#ff6f0f] resize-none`}
          placeholder="How can we help you?"
        />
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] text-white py-4 rounded-lg transition-all shadow-lg hover:shadow-xl hover:shadow-[#ff6f0f]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Send className="w-5 h-5" />
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </motion.button>
    </form>
  );
}
