import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Check } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface DonationFormProps {
  darkMode: boolean;
}

export function DonationForm({ darkMode }: DonationFormProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const presetAmounts = [10, 25, 50, 100, 250, 500];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const amount = selectedAmount || parseFloat(customAmount) || 0;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-7613194e/donate`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            name,
            email,
            amount,
            frequency,
            timestamp: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        const error = await response.text();
        console.error('Donation submission error:', error);
        throw new Error('Failed to submit donation');
      }

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setName('');
        setEmail('');
        setSelectedAmount(null);
        setCustomAmount('');
      }, 5000);
    } catch (error) {
      console.error('Error submitting donation:', error);
      alert('There was an error submitting your donation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 z-10 flex items-center justify-center"
          >
            <div className={`${darkMode ? 'bg-black' : 'bg-white'} rounded-2xl p-8 text-center shadow-2xl border ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-20 h-20 bg-[#ff6f0f] rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Check className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className={`mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
                Thank You!
              </h3>
              <p className={darkMode ? 'text-white/70' : 'text-black/70'}>
                Your generous donation makes a real difference in people's lives.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Frequency Toggle */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setFrequency('once')}
            className={`flex-1 py-3 rounded-lg transition-all ${
              frequency === 'once'
                ? 'bg-[#ff6f0f] text-white'
                : darkMode
                ? 'bg-white/5 text-white hover:bg-white/10'
                : 'bg-black/5 text-black hover:bg-black/10'
            }`}
          >
            One-time
          </button>
          <button
            type="button"
            onClick={() => setFrequency('monthly')}
            className={`flex-1 py-3 rounded-lg transition-all ${
              frequency === 'monthly'
                ? 'bg-[#ff6f0f] text-white'
                : darkMode
                ? 'bg-white/5 text-white hover:bg-white/10'
                : 'bg-black/5 text-black hover:bg-black/10'
            }`}
          >
            Monthly
          </button>
        </div>

        {/* Preset Amounts */}
        <div>
          <label className={`block mb-3 ${darkMode ? 'text-white' : 'text-black'}`}>
            Select Amount
          </label>
          <div className="grid grid-cols-3 gap-3">
            {presetAmounts.map((amount) => (
              <motion.button
                key={amount}
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedAmount(amount);
                  setCustomAmount('');
                }}
                className={`py-3 rounded-lg transition-all ${
                  selectedAmount === amount
                    ? 'bg-[#ff6f0f] text-white shadow-lg shadow-[#ff6f0f]/30'
                    : darkMode
                    ? 'bg-white/5 text-white hover:bg-white/10'
                    : 'bg-black/5 text-black hover:bg-black/10'
                }`}
              >
                ${amount}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Custom Amount */}
        <div>
          <label className={`block mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
            Custom Amount
          </label>
          <input
            type="number"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setSelectedAmount(null);
            }}
            placeholder="Enter custom amount"
            className={`w-full px-4 py-3 rounded-lg border ${
              darkMode
                ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40'
                : 'bg-white border-black/10 text-black placeholder:text-black/40'
            } focus:outline-none focus:ring-2 focus:ring-[#ff6f0f]`}
          />
        </div>

        {/* Name */}
        <div>
          <label className={`block mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={`w-full px-4 py-3 rounded-lg border ${
              darkMode
                ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40'
                : 'bg-white border-black/10 text-black placeholder:text-black/40'
            } focus:outline-none focus:ring-2 focus:ring-[#ff6f0f]`}
            placeholder="John Doe"
          />
        </div>

        {/* Email */}
        <div>
          <label className={`block mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`w-full px-4 py-3 rounded-lg border ${
              darkMode
                ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40'
                : 'bg-white border-black/10 text-black placeholder:text-black/40'
            } focus:outline-none focus:ring-2 focus:ring-[#ff6f0f]`}
            placeholder="john@example.com"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] text-white py-4 rounded-lg transition-all shadow-lg hover:shadow-xl hover:shadow-[#ff6f0f]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
        >
          <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
          {isSubmitting ? 'Processing...' : `Donate ${selectedAmount || customAmount ? `$${selectedAmount || customAmount}` : ''}`}
        </motion.button>

        <p className={`text-center ${darkMode ? 'text-white/50' : 'text-black/50'}`}>
          This is a demo form. In production, integrate with a payment processor like Stripe.
        </p>
      </form>
    </div>
  );
}
