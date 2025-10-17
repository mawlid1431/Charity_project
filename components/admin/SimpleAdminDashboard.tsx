import React, { useState } from 'react';
import { FolderOpen, Users } from 'lucide-react';
import { ProjectsManager } from './ProjectsManager';
import { TeamManager } from './TeamManager';

interface SimpleAdminDashboardProps {
    darkMode: boolean;
}

type TabType = 'projects' | 'team';

const SimpleAdminDashboard: React.FC<SimpleAdminDashboardProps> = ({ darkMode }) => {
    const [activeTab, setActiveTab] = useState<TabType>('projects');

    const tabs = [
        { id: 'projects', label: 'Projects', icon: FolderOpen },
        { id: 'team', label: 'Team', icon: Users },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'projects':
                return <ProjectsManager darkMode={darkMode} />;
            case 'team':
                return <TeamManager darkMode={darkMode} />;
            default:
                return <ProjectsManager darkMode={darkMode} />;
        }
    };

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {/* Header */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                Admin Dashboard
                            </h1>
                            <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                Manage your charity projects and team members
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex space-x-8">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as TabType)}
                                    className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                        ? `border-blue-500 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`
                                        : `border-transparent ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
                                        }`}
                                >
                                    <Icon className="w-5 h-5 mr-2" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default SimpleAdminDashboard;