import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Download, Eye, Calendar, DollarSign, User, Loader } from 'lucide-react';
import { getDonations } from '@/utils/supabase/helpers';

interface Donation {
    id: string;
    donorName: string;
    donorEmail: string;
    amount: number;
    projectName: string;
    date: string;
    status: 'completed' | 'pending' | 'failed';
    paymentMethod: string;
}

interface DonationsManagerProps {
    darkMode: boolean;
}

export function DonationsManager({ darkMode }: DonationsManagerProps) {
    const [donations, setDonations] = useState<Donation[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Load donations from Supabase
    useEffect(() => {
        loadDonations();
    }, []);

    const loadDonations = async () => {
        try {
            setLoading(true);
            const data = await getDonations();
            const formattedDonations = data.map((d: any) => ({
                id: d.id,
                donorName: d.donor_name,
                donorEmail: d.donor_email,
                amount: Number(d.amount),
                projectName: d.projects?.name || 'General Donation',
                date: d.created_at.split('T')[0],
                status: d.payment_status,
                paymentMethod: d.payment_method
            }));
            setDonations(formattedDonations);
        } catch (error) {
            console.error('Error loading donations:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredDonations = donations.filter(donation => {
        const matchesSearch = donation.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donation.donorEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donation.projectName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || donation.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-500';
            case 'pending': return 'bg-yellow-500';
            case 'failed': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    const getTotalAmount = () => {
        return filteredDonations
            .filter(d => d.status === 'completed')
            .reduce((sum, d) => sum + d.amount, 0);
    };

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Donations Management
                    </h2>
                    <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Total: ${getTotalAmount().toLocaleString()} from {filteredDonations.filter(d => d.status === 'completed').length} donations
                    </p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${darkMode
                        ? 'bg-[#ff6f0f]/10 text-[#ff6f0f] hover:bg-[#ff6f0f]/20 border border-[#ff6f0f]/20'
                        : 'bg-[#ff6f0f]/10 text-[#ff6f0f] hover:bg-[#ff6f0f]/20 border border-[#ff6f0f]/20'
                        }`}
                >
                    <Download className="w-4 h-4" />
                    Export CSV
                </motion.button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                {/* Search */}
                <div className="flex-1 relative">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search donations..."
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all ${darkMode
                            ? 'bg-[#1a2f5f] border-white/10 text-white placeholder-gray-400 focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                            }`}
                    />
                </div>

                {/* Status Filter */}
                <div className="relative">
                    <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className={`pl-10 pr-8 py-3 rounded-lg border transition-all ${darkMode
                            ? 'bg-[#1a2f5f] border-white/10 text-white focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                            : 'bg-white border-gray-300 text-gray-900 focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                            }`}
                    >
                        <option value="all">All Status</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                    </select>
                </div>
            </div>

            {/* Donations Table */}
            <div className={`rounded-xl overflow-hidden shadow-lg ${darkMode ? 'bg-[#1a2f5f] border border-white/10' : 'bg-white border border-gray-200'
                }`}>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className={`${darkMode ? 'bg-[#0f1c3f]' : 'bg-gray-50'}`}>
                            <tr>
                                <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'
                                    }`}>
                                    Donor
                                </th>
                                <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'
                                    }`}>
                                    Project
                                </th>
                                <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'
                                    }`}>
                                    Amount
                                </th>
                                <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'
                                    }`}>
                                    Date
                                </th>
                                <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'
                                    }`}>
                                    Status
                                </th>
                                <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'
                                    }`}>
                                    Payment
                                </th>
                                <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'
                                    }`}>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className={`divide-y ${darkMode ? 'divide-white/10' : 'divide-gray-200'}`}>
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center">
                                        <Loader className="w-8 h-8 animate-spin text-[#ff6f0f] mx-auto" />
                                    </td>
                                </tr>
                            ) : filteredDonations.map((donation, index) => (
                                <motion.tr
                                    key={donation.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`${darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'} transition-colors`}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-gradient-to-br from-[#ff6f0f] to-[#ff8f3f] rounded-full flex items-center justify-center">
                                                <User className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="ml-4">
                                                <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                    {donation.donorName}
                                                </div>
                                                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    {donation.donorEmail}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                                        {donation.projectName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            ${donation.amount.toLocaleString()}
                                        </div>
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                                        <div className="flex items-center">
                                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                            {new Date(donation.date).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getStatusColor(donation.status)}`}>
                                            {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                                        {donation.paymentMethod}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-all ${darkMode
                                                ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20'
                                                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                                }`}
                                        >
                                            <Eye className="w-4 h-4" />
                                            View
                                        </motion.button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredDonations.length === 0 && (
                    <div className="text-center py-12">
                        <DollarSign className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                        <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            No donations found
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                            Try adjusting your search or filter criteria
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}