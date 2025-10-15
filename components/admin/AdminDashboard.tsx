import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LogOut, BarChart3, Users, DollarSign, Target, Sun, Moon, FolderKanban, UsersRound } from 'lucide-react';
import { ProjectsManager } from './ProjectsManager';
import { TeamManager } from './TeamManager';
import { getDashboardStats } from '@/utils/supabase/helpers';

interface AdminDashboardProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
    onLogout: () => void;
}

export function AdminDashboard({ darkMode, toggleDarkMode, onLogout }: AdminDashboardProps) {
    const [activeTab, setActiveTab] = useState<'projects' | 'team'>('projects');
    const [stats, setStats] = useState([
        { name: 'Total Projects', value: '0', icon: Target, color: 'from-blue-500 to-blue-600' },
        { name: 'Total Raised', value: '$0', icon: DollarSign, color: 'from-green-500 to-green-600' },
        { name: 'Total Donations', value: '0', icon: Users, color: 'from-purple-500 to-purple-600' },
        { name: 'Success Rate', value: '0%', icon: BarChart3, color: 'from-orange-500 to-orange-600' },
    ]);



    // Load dashboard stats
    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const data = await getDashboardStats();
            setStats([
                { name: 'Active Projects', value: data.activeProjects.toString(), icon: Target, color: 'from-blue-500 to-blue-600' },
                { name: 'Total Raised', value: `$${data.totalRaised.toLocaleString()}`, icon: DollarSign, color: 'from-green-500 to-green-600' },
                { name: 'Total Donations', value: data.totalDonations.toString(), icon: Users, color: 'from-purple-500 to-purple-600' },
                { name: 'Success Rate', value: `${data.successRate}%`, icon: BarChart3, color: 'from-orange-500 to-orange-600' },
            ]);
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Admin Dashboard
                    </h1>
                    <p className={`text-lg mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Manage Mubarak Charity operations
                    </p>
                </div>
                <div className="flex gap-3">
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 180 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleDarkMode}
                        className={`p-3 rounded-xl transition-all shadow-lg ${darkMode
                            ? 'bg-white/10 text-white hover:bg-white/20'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.href = '/'}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${darkMode
                            ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20'
                            : 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200'
                            }`}
                    >
                        Back to Site
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onLogout}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${darkMode
                            ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20'
                            : 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                            }`}
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </motion.button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-6 rounded-xl ${darkMode ? 'bg-[#1a2f5f] border border-white/10' : 'bg-white border border-gray-200'
                            } shadow-lg`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {stat.name}
                                </p>
                                <p className={`text-2xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {stat.value}
                                </p>
                            </div>
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab('projects')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'projects'
                            ? 'bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] text-white shadow-lg shadow-[#ff6f0f]/30'
                            : darkMode
                                ? 'bg-white/5 text-gray-400 hover:bg-white/10'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    <FolderKanban className="w-5 h-5" />
                    Projects
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab('team')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'team'
                            ? 'bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] text-white shadow-lg shadow-[#ff6f0f]/30'
                            : darkMode
                                ? 'bg-white/5 text-gray-400 hover:bg-white/10'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    <UsersRound className="w-5 h-5" />
                    Team
                </motion.button>
            </div>

            {/* Content */}
            {activeTab === 'projects' ? (
                <ProjectsManager darkMode={darkMode} onRefresh={loadStats} />
            ) : (
                <TeamManager darkMode={darkMode} />
            )}
        </div>
    );
}