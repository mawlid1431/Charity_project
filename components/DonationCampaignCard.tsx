import { motion } from 'motion/react';
import { MapPin, Calendar, DollarSign, ExternalLink } from 'lucide-react';

interface DonationCampaignCardProps {
    id: string;
    title: string;
    description: string;
    location: string;
    date: string;
    image: string;
    raised: string;
    goal: string;
    progress: number;
    donationLink?: string;
    status: 'active' | 'completed' | 'paused';
    darkMode: boolean;
    index: number;
    onClick?: () => void;
}

export function DonationCampaignCard({
    title,
    description,
    location,
    date,
    image,
    raised,
    goal,
    progress,
    donationLink,
    status,
    darkMode,
    index,
    onClick,
}: DonationCampaignCardProps) {
    const getStatusColor = () => {
        switch (status) {
            case 'active': return 'bg-green-500';
            case 'completed': return 'bg-blue-500';
            case 'paused': return 'bg-yellow-500';
            default: return 'bg-gray-500';
        }
    };

    const handleDonate = () => {
        if (donationLink) {
            window.open(donationLink, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            onClick={onClick}
            className={`rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all ${onClick ? 'cursor-pointer' : ''} ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-100'
                }`}
        >
            {/* Image */}
            <div className="relative h-56 overflow-hidden group">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800';
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor()}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                </div>

                {/* Location & Date */}
                <div className="absolute bottom-4 left-4 right-4 space-y-2">
                    <div className="flex items-center gap-2 text-white text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(date).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {title}
                </h3>
                <p className={`text-sm mb-6 line-clamp-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                    {description}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                            Progress
                        </span>
                        <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {progress}%
                        </span>
                    </div>
                    <div className={`w-full h-2 rounded-full overflow-hidden ${darkMode ? 'bg-white/10' : 'bg-gray-200'
                        }`}>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${progress}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="h-full bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] rounded-full"
                        />
                    </div>
                </div>

                {/* Amounts */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>Raised</p>
                        <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            ${raised}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>Goal</p>
                        <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            ${goal}
                        </p>
                    </div>
                </div>

                {/* Donate Button */}
                {donationLink && status === 'active' && (
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleDonate}
                        className="w-full bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:shadow-[#ff6f0f]/40 transition-all flex items-center justify-center gap-2"
                    >
                        <DollarSign className="w-5 h-5" />
                        Donate Now
                        <ExternalLink className="w-4 h-4" />
                    </motion.button>
                )}

                {status === 'completed' && (
                    <div className={`w-full py-3 px-6 rounded-lg text-center font-semibold ${darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600'
                        }`}>
                        Goal Reached! Thank You
                    </div>
                )}

                {status === 'paused' && (
                    <div className={`w-full py-3 px-6 rounded-lg text-center font-semibold ${darkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-50 text-yellow-600'
                        }`}>
                        Campaign Paused
                    </div>
                )}
            </div>
        </motion.div>
    );
}
