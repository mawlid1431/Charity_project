import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, MapPin, DollarSign, Heart, ExternalLink, Loader, Target, Users } from 'lucide-react';
import { getDonationCampaignById } from '@/utils/supabase/helpers';

interface DonationCampaign {
    id: string;
    project_donation_name: string;
    description: string;
    location: string;
    date: string;
    image: string;
    target_amount: number;
    raised_amount: number;
    donation_link: string | null;
    status: 'active' | 'completed' | 'paused';
    created_at: string;
}

interface DonationDetailPageProps {
    darkMode: boolean;
    campaignId: string;
    onNavigate: (page: string) => void;
}

export function DonationDetailPage({ darkMode, campaignId, onNavigate }: DonationDetailPageProps) {
    const [campaign, setCampaign] = useState<DonationCampaign | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCampaign();
    }, [campaignId]);

    const loadCampaign = async () => {
        setLoading(true);
        try {
            const data = await getDonationCampaignById(campaignId);
            if (data) {
                setCampaign(data);
            }
        } catch (error) {
            console.error('Error loading donation campaign:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className={`min-h-screen pt-20 flex items-center justify-center ${darkMode ? 'bg-[#0a1628]' : 'bg-gray-50'}`}>
                <div className="text-center">
                    <Loader className="w-16 h-16 text-[#ff6f0f] animate-spin mx-auto mb-4" />
                    <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Loading campaign...
                    </p>
                </div>
            </div>
        );
    }

    if (!campaign) {
        return (
            <div className={`min-h-screen pt-20 flex items-center justify-center ${darkMode ? 'bg-[#0a1628]' : 'bg-gray-50'}`}>
                <div className="text-center">
                    <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Campaign Not Found
                    </h2>
                    <button
                        onClick={() => onNavigate('donate')}
                        className="px-6 py-3 bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] text-white rounded-lg hover:shadow-lg transition-all"
                    >
                        Back to Campaigns
                    </button>
                </div>
            </div>
        );
    }

    const progressPercentage = Math.min((campaign.raised_amount / campaign.target_amount) * 100, 100);
    const remainingAmount = Math.max(campaign.target_amount - campaign.raised_amount, 0);

    const getStatusColor = () => {
        switch (campaign.status) {
            case 'active': return 'bg-green-500';
            case 'completed': return 'bg-blue-500';
            case 'paused': return 'bg-yellow-500';
            default: return 'bg-gray-500';
        }
    };

    const handleDonate = () => {
        if (campaign.donation_link) {
            window.open(campaign.donation_link, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div className={`min-h-screen pt-20 ${darkMode ? 'bg-[#0a1628]' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ x: -5 }}
                    onClick={() => onNavigate('donate')}
                    className={`flex items-center gap-2 mb-6 px-4 py-2 rounded-lg transition-all ${darkMode
                        ? 'text-gray-300 hover:text-white hover:bg-white/10'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Campaigns
                </motion.button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Side - Donation Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-1"
                    >
                        <div className={`sticky top-24 p-6 rounded-2xl shadow-lg ${darkMode ? 'bg-[#1a2f5f] border border-white/10' : 'bg-white border border-gray-200'
                            }`}>
                            {/* Status Badge */}
                            <div className="mb-4">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor()}`}>
                                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                                </span>
                            </div>

                            {/* Progress Section */}
                            <div className="mb-6">
                                <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    Campaign Progress
                                </h3>

                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            Raised
                                        </span>
                                        <span className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            ${campaign.raised_amount.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            Goal
                                        </span>
                                        <span className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            ${campaign.target_amount.toLocaleString()}
                                        </span>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className={`w-full h-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progressPercentage}%` }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            className="h-3 bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] rounded-full"
                                        />
                                    </div>

                                    <div className="flex justify-between items-center text-sm pt-2">
                                        <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            {progressPercentage.toFixed(0)}% funded
                                        </span>
                                    </div>

                                    {campaign.status !== 'completed' && (
                                        <div className={`text-sm pt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            ${remainingAmount.toLocaleString()} still needed
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Donate Button */}
                            {campaign.status === 'active' && campaign.donation_link ? (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleDonate}
                                    className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] text-white rounded-lg font-semibold shadow-lg shadow-[#ff6f0f]/30 hover:shadow-xl hover:shadow-[#ff6f0f]/40 transition-all"
                                >
                                    <Heart className="w-5 h-5" />
                                    Donate Now
                                    <ExternalLink className="w-4 h-4" />
                                </motion.button>
                            ) : campaign.status === 'completed' ? (
                                <div className="w-full py-4 px-6 bg-blue-500/20 text-blue-400 rounded-lg text-center font-semibold border border-blue-500/30">
                                    ✓ Goal Reached! Thank You
                                </div>
                            ) : (
                                <div className="w-full py-4 px-6 bg-yellow-500/20 text-yellow-400 rounded-lg text-center font-semibold border border-yellow-500/30">
                                    Campaign Paused
                                </div>
                            )}

                            {/* Campaign Info */}
                            <div className="mt-6 pt-6 border-t border-gray-200/20 space-y-3">
                                <div className="flex items-center gap-3">
                                    <MapPin className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {campaign.location}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Started {new Date(campaign.date).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Campaign Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-2"
                    >
                        {/* Campaign Header */}
                        <div className={`p-8 rounded-2xl shadow-lg mb-6 ${darkMode ? 'bg-[#1a2f5f] border border-white/10' : 'bg-white border border-gray-200'
                            }`}>
                            <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {campaign.project_donation_name}
                            </h1>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-3 gap-4 mt-6">
                                <div className={`p-4 rounded-lg ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                                    <Target className={`w-6 h-6 mb-2 ${darkMode ? 'text-[#ff6f0f]' : 'text-[#ff6f0f]'}`} />
                                    <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        ${campaign.target_amount.toLocaleString()}
                                    </p>
                                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Target Goal
                                    </p>
                                </div>
                                <div className={`p-4 rounded-lg ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                                    <DollarSign className={`w-6 h-6 mb-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                                    <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        ${campaign.raised_amount.toLocaleString()}
                                    </p>
                                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Raised So Far
                                    </p>
                                </div>
                                <div className={`p-4 rounded-lg ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                                    <Users className={`w-6 h-6 mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                                    <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {progressPercentage.toFixed(0)}%
                                    </p>
                                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Progress
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Campaign Image */}
                        <div className="mb-6">
                            <div className="relative h-96 rounded-2xl overflow-hidden">
                                <img
                                    src={campaign.image}
                                    alt={campaign.project_donation_name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800';
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="flex items-center gap-2 text-white">
                                        <MapPin className="w-5 h-5" />
                                        <span className="text-lg font-semibold">{campaign.location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Campaign Description */}
                        <div className={`p-8 rounded-2xl shadow-lg ${darkMode ? 'bg-[#1a2f5f] border border-white/10' : 'bg-white border border-gray-200'
                            }`}>
                            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                About This Campaign
                            </h2>
                            <div className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {campaign.description.split('\n').map((paragraph, index) => (
                                    <p key={index} className="mb-4">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            {/* Call to Action */}
                            {campaign.status === 'active' && campaign.donation_link && (
                                <div className={`mt-8 p-6 rounded-xl ${darkMode ? 'bg-[#ff6f0f]/10 border border-[#ff6f0f]/20' : 'bg-[#ff6f0f]/10 border border-[#ff6f0f]/20'}`}>
                                    <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        Make a Difference Today
                                    </h3>
                                    <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Your donation will directly help those in need. Every contribution counts!
                                    </p>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleDonate}
                                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                                    >
                                        <Heart className="w-5 h-5" />
                                        Donate Now
                                        <ExternalLink className="w-4 h-4" />
                                    </motion.button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
