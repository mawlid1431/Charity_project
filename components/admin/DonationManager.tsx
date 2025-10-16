import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit, Trash2, Calendar, FileText, Search, MapPin, ExternalLink } from 'lucide-react';
import { DonationAdminForm } from './DonationAdminForm';
import { supabase } from '@/utils/supabase/client';

interface Donation {
    id: string;
    name: string;
    location: string;
    date: string;
    description: string;
    image: string;
    targetAmount: number;
    raisedAmount: number;
    donationLink: string | null;
    status: 'active' | 'completed' | 'paused';
    created_at?: string;
    updated_at?: string;
}

interface DonationManagerProps {
    darkMode: boolean;
}

export function DonationManager({ darkMode }: DonationManagerProps) {
    const [donations, setDonations] = useState<Donation[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingDonation, setEditingDonation] = useState<Donation | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        loadDonations();
    }, []);

    const loadDonations = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('donation_campaigns')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Map the data to match our interface
            const mappedData = data?.map(item => ({
                id: item.id,
                name: item.project_donation_name,
                location: item.location,
                date: item.date,
                description: item.description,
                image: item.image,
                targetAmount: item.target_amount,
                raisedAmount: item.raised_amount,
                donationLink: item.donation_link || '',
                status: item.status,
                created_at: item.created_at,
                updated_at: item.updated_at
            })) || [];

            setDonations(mappedData);
            setError('');
        } catch (error) {
            console.error('Error loading donations:', error);
            setError('Failed to load donation campaigns');
        } finally {
            setLoading(false);
        }
    };

    const handleAddDonation = () => {
        setEditingDonation(null);
        setShowForm(true);
    };

    const handleEditDonation = (donation: Donation) => {
        setEditingDonation(donation);
        setShowForm(true);
    };

    const handleSaveDonation = async (donationData: Omit<Donation, 'id'>) => {
        try {
            // Map the data to match database schema
            const dbData = {
                project_donation_name: donationData.name,
                location: donationData.location,
                date: donationData.date,
                description: donationData.description,
                image: donationData.image,
                target_amount: donationData.targetAmount,
                raised_amount: donationData.raisedAmount,
                donation_link: donationData.donationLink,
                status: donationData.status
            };

            if (editingDonation) {
                // Update existing donation
                const { error } = await supabase
                    .from('donation_campaigns')
                    .update(dbData)
                    .eq('id', editingDonation.id);

                if (error) throw error;
            } else {
                // Create new donation
                const { error } = await supabase
                    .from('donation_campaigns')
                    .insert([dbData]);

                if (error) throw error;
            }

            setShowForm(false);
            setEditingDonation(null);
            await loadDonations();
        } catch (error) {
            console.error('Error saving donation:', error);
            throw error; // Let the form handle the error display
        }
    };

    const handleDeleteDonation = async (donation: Donation) => {
        if (!confirm(`Are you sure you want to delete "${donation.name}"?`)) {
            return;
        }

        try {
            const { error } = await supabase
                .from('donation_campaigns')
                .delete()
                .eq('id', donation.id);

            if (error) throw error;

            await loadDonations();
        } catch (error) {
            console.error('Error deleting donation:', error);
            setError('Failed to delete donation campaign');
        }
    };

    const handleCancelForm = () => {
        setShowForm(false);
        setEditingDonation(null);
    };

    const filteredDonations = donations.filter(donation =>
        donation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getProgressPercentage = (raised: number, target: number) => {
        return target > 0 ? Math.min((raised / target) * 100, 100) : 0;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Donation Campaigns
                    </h2>
                    <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Manage your donation campaigns and fundraising initiatives
                    </p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddDonation}
                    className="bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] hover:from-[#ff8f3f] hover:to-[#ffa55f] text-white px-6 py-3 rounded-lg transition-all flex items-center gap-2 shadow-lg"
                >
                    <Plus className="w-5 h-5" />
                    Add Campaign
                </motion.button>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                <input
                    type="text"
                    placeholder="Search campaigns..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${darkMode
                        ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-[#ff6f0f]'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#ff6f0f]'
                        } focus:outline-none focus:ring-2 focus:ring-[#ff6f0f]/20`}
                />
            </div>

            {/* Error Message */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                    <p className="text-red-600 text-sm">{error}</p>
                </motion.div>
            )}

            {/* Donations Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className={`p-6 rounded-xl animate-pulse ${darkMode ? 'bg-gray-800' : 'bg-gray-100'
                                }`}
                        >
                            <div className={`h-48 rounded-lg mb-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'
                                }`} />
                            <div className={`h-4 rounded mb-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'
                                }`} />
                            <div className={`h-3 rounded mb-4 w-3/4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'
                                }`} />
                            <div className="flex gap-2">
                                <div className={`h-8 rounded w-16 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'
                                    }`} />
                                <div className={`h-8 rounded w-16 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'
                                    }`} />
                            </div>
                        </div>
                    ))}
                </div>
            ) : filteredDonations.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`text-center py-12 rounded-xl border-2 border-dashed ${darkMode ? 'border-gray-600 text-gray-400' : 'border-gray-300 text-gray-500'
                        }`}
                >
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">
                        {searchTerm ? 'No campaigns found' : 'No donation campaigns yet'}
                    </p>
                    <p className="text-sm">
                        {searchTerm
                            ? 'Try adjusting your search terms'
                            : 'Create your first donation campaign to get started'
                        }
                    </p>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDonations.map((donation, index) => (
                        <motion.div
                            key={donation.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                                }`}
                        >
                            {/* Campaign Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={donation.image}
                                    alt={donation.name}
                                    className="w-full h-full object-cover transition-transform hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                <div className="absolute top-3 right-3">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${donation.status === 'active'
                                        ? 'bg-green-100 text-green-800'
                                        : donation.status === 'completed'
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {donation.status}
                                    </span>
                                </div>
                            </div>

                            {/* Campaign Content */}
                            <div className="p-6">
                                <h3 className={`text-lg font-semibold mb-2 line-clamp-1 ${darkMode ? 'text-white' : 'text-gray-900'
                                    }`}>
                                    {donation.name}
                                </h3>

                                <div className={`flex items-center gap-2 mb-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                    <MapPin className="w-4 h-4" />
                                    {donation.location}
                                </div>

                                <div className={`flex items-center gap-2 mb-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                    <Calendar className="w-4 h-4" />
                                    {formatDate(donation.date)}
                                </div>

                                <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'
                                    }`}>
                                    {donation.description}
                                </p>

                                {/* Progress Bar */}
                                <div className="mb-4">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                                            ${donation.raisedAmount.toLocaleString()} raised
                                        </span>
                                        <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            {getProgressPercentage(donation.raisedAmount, donation.targetAmount).toFixed(1)}%
                                        </span>
                                    </div>
                                    <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'
                                        }`}>
                                        <div
                                            className="h-2 bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] rounded-full transition-all"
                                            style={{ width: `${getProgressPercentage(donation.raisedAmount, donation.targetAmount)}%` }}
                                        />
                                    </div>
                                    <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                        Goal: ${donation.targetAmount.toLocaleString()}
                                    </p>
                                </div>

                                {/* Donation Link */}
                                {donation.donationLink && (
                                    <div className="mb-4">
                                        <a
                                            href={donation.donationLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm underline"
                                        >
                                            <ExternalLink className="w-3 h-3" />
                                            View Donation Page
                                        </a>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex gap-2">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleEditDonation(donation)}
                                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${darkMode
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
                                        onClick={() => handleDeleteDonation(donation)}
                                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${darkMode
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

            {/* Donation Form Modal */}
            <AnimatePresence>
                {showForm && (
                    <DonationAdminForm
                        darkMode={darkMode}
                        donation={editingDonation}
                        onSave={handleSaveDonation}
                        onCancel={handleCancelForm}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}