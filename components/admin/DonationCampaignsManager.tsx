import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit, Trash2, Heart, Loader, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { DonationAdminForm } from './DonationAdminForm';
import { getDonationCampaigns, createDonationCampaign, updateDonationCampaign, deleteDonationCampaign } from '@/utils/supabase/helpers';
import { toast } from 'sonner';

interface DonationCampaign {
    id: string;
    project_donation_name: string;
    location: string;
    date: string;
    description: string;
    image: string;
    target_amount: number;
    raised_amount: number;
    donation_link: string | null;
    status: 'active' | 'completed' | 'paused';
    created_at: string;
}

interface DonationCampaignsManagerProps {
    darkMode: boolean;
    onRefresh?: () => void;
}

export function DonationCampaignsManager({ darkMode, onRefresh }: DonationCampaignsManagerProps) {
    const [campaigns, setCampaigns] = useState<DonationCampaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingCampaign, setEditingCampaign] = useState<DonationCampaign | null>(null);

    // Load campaigns from Supabase
    useEffect(() => {
        loadCampaigns();
    }, []);

    const loadCampaigns = async () => {
        try {
            setLoading(true);
            const data = await getDonationCampaigns();
            setCampaigns(data);
        } catch (error) {
            console.error('Error loading donation campaigns:', error);
            toast.error('Failed to load donation campaigns');
        } finally {
            setLoading(false);
        }
    };

    const handleAddCampaign = () => {
        setEditingCampaign(null);
        setShowForm(true);
    };

    const handleEditCampaign = (campaign: DonationCampaign) => {
        setEditingCampaign(campaign);
        setShowForm(true);
    };

    const handleDeleteCampaign = async (id: string) => {
        if (!confirm('Are you sure you want to delete this donation campaign?')) return;

        try {
            await deleteDonationCampaign(id);
            toast.success('Donation campaign deleted successfully');
            loadCampaigns();
            onRefresh?.();
        } catch (error) {
            console.error('Error deleting donation campaign:', error);
            toast.error('Failed to delete donation campaign');
        }
    };

    const handleSaveCampaign = async (campaignData: any) => {
        try {
            if (editingCampaign) {
                // Update existing campaign
                await updateDonationCampaign(editingCampaign.id, {
                    project_donation_name: campaignData.name,
                    location: campaignData.location,
                    date: campaignData.date,
                    description: campaignData.description,
                    image: campaignData.image,
                    target_amount: campaignData.targetAmount,
                    raised_amount: campaignData.raisedAmount,
                    donation_link: campaignData.donationLink,
                    status: campaignData.status
                });
                toast.success('Donation campaign updated successfully');
            } else {
                // Add new campaign
                await createDonationCampaign({
                    project_donation_name: campaignData.name,
                    location: campaignData.location,
                    date: campaignData.date,
                    description: campaignData.description,
                    image: campaignData.image,
                    target_amount: campaignData.targetAmount,
                    raised_amount: campaignData.raisedAmount,
                    donation_link: campaignData.donationLink,
                    status: campaignData.status
                });
                toast.success('Donation campaign created successfully');
            }
            setShowForm(false);
            setEditingCampaign(null);
            loadCampaigns();
            onRefresh?.();
        } catch (error) {
            console.error('Error saving donation campaign:', error);
            toast.error('Failed to save donation campaign');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-500';
            case 'completed': return 'bg-blue-500';
            case 'paused': return 'bg-yellow-500';
            default: return 'bg-gray-500';
        }
    };

    const getProgressPercentage = (raised: number, target: number) => {
        return Math.min((raised / target) * 100, 100);
    };

    // Convert campaign data for the form
    const convertCampaignForForm = (campaign: DonationCampaign) => ({
        id: campaign.id,
        name: campaign.project_donation_name,
        location: campaign.location,
        date: campaign.date,
        description: campaign.description,
        image: campaign.image,
        targetAmount: campaign.target_amount,
        raisedAmount: campaign.raised_amount,
        donationLink: campaign.donation_link,
        status: campaign.status,
        createdAt: campaign.created_at
    });

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Donation Campaigns Management
                </h2>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddCampaign}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] text-white rounded-lg shadow-lg shadow-[#ff6f0f]/30 hover:shadow-xl hover:shadow-[#ff6f0f]/40 transition-all"
                >
                    <Plus className="w-5 h-5" />
                    Add Campaign
                </motion.button>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader className="w-8 h-8 animate-spin text-[#ff6f0f]" />
                </div>
            ) : campaigns.length === 0 ? (
                <div className="text-center py-20">
                    <Heart className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                    <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        No donation campaigns yet
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        Click "Add Campaign" to create your first donation campaign
                    </p>
                </div>
            ) : (
                /* Campaigns Grid */
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {campaigns.map((campaign, index) => (
                        <motion.div
                            key={campaign.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`rounded-xl overflow-hidden shadow-lg ${darkMode ? 'bg-[#1a2f5f] border border-white/10' : 'bg-white border border-gray-200'
                                }`}
                        >
                            {/* Campaign Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={campaign.image}
                                    alt={campaign.project_donation_name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800';
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute top-3 right-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(campaign.status)}`}>
                                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                                    </span>
                                </div>
                                <div className="absolute bottom-3 left-3 right-3">
                                    <div className="flex items-center gap-2 text-white text-xs mb-1">
                                        <MapPin className="w-3 h-3" />
                                        {campaign.location}
                                    </div>
                                    <div className="flex items-center gap-2 text-white text-xs">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(campaign.date).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>

                            {/* Campaign Content */}
                            <div className="p-6">
                                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {campaign.project_donation_name}
                                </h3>
                                <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {campaign.description}
                                </p>

                                {/* Progress */}
                                <div className="mb-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            Progress
                                        </span>
                                        <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            {getProgressPercentage(campaign.raised_amount, campaign.target_amount).toFixed(0)}%
                                        </span>
                                    </div>
                                    <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                        <div
                                            className="h-2 bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] rounded-full transition-all duration-500"
                                            style={{ width: `${getProgressPercentage(campaign.raised_amount, campaign.target_amount)}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Amounts */}
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Raised</p>
                                        <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            ${campaign.raised_amount.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Target</p>
                                        <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            ${campaign.target_amount.toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                {/* Donation Link */}
                                {campaign.donation_link && (
                                    <div className="mb-4">
                                        <a
                                            href={campaign.donation_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg transition-all ${darkMode
                                                ? 'bg-[#ff6f0f]/10 text-[#ff6f0f] hover:bg-[#ff6f0f]/20 border border-[#ff6f0f]/20'
                                                : 'bg-[#ff6f0f]/10 text-[#ff6f0f] hover:bg-[#ff6f0f]/20 border border-[#ff6f0f]/20'
                                                }`}
                                        >
                                            <ExternalLink className="w-3 h-3" />
                                            View Donation Page
                                        </a>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleEditCampaign(campaign)}
                                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg transition-all ${darkMode
                                            ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20'
                                            : 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200'
                                            }`}
                                    >
                                        <Edit className="w-4 h-4" />
                                        Edit
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleDeleteCampaign(campaign.id)}
                                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg transition-all ${darkMode
                                            ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20'
                                            : 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                                            }`}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Campaign Form Modal */}
            <AnimatePresence>
                {showForm && (
                    <DonationAdminForm
                        darkMode={darkMode}
                        donation={editingCampaign ? convertCampaignForForm(editingCampaign) : null}
                        onSave={handleSaveCampaign}
                        onCancel={() => {
                            setShowForm(false);
                            setEditingCampaign(null);
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}