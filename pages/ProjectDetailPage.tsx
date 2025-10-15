import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Target, Users, Share2, Heart, CheckCircle } from 'lucide-react';
import { DonationForm } from '../components/DonationForm';

interface Project {
    id: string;
    name: string;
    description: string;
    longDescription: string;
    image: string;
    targetAmount: number;
    raisedAmount: number;
    donorsCount: number;
    status: 'active' | 'completed' | 'paused';
    createdAt: string;
    category: string;
    location: string;
    updates: Array<{
        date: string;
        title: string;
        content: string;
    }>;
}

interface ProjectDetailPageProps {
    darkMode: boolean;
    projectId: string;
    onNavigate: (page: string) => void;
}

export function ProjectDetailPage({ darkMode, projectId, onNavigate }: ProjectDetailPageProps) {
    const [project, setProject] = useState<Project | null>(null);
    const [activeTab, setActiveTab] = useState('overview');

    // Mock project data - in real app, fetch from API
    useEffect(() => {
        const mockProjects: Project[] = [
            {
                id: '1',
                name: 'Clean Water Initiative',
                description: 'Providing clean water access to rural communities in need.',
                longDescription: `Our Clean Water Initiative aims to bring safe, clean drinking water to remote villages that have been without access for generations. This comprehensive project includes drilling new wells, installing water purification systems, and training local communities in maintenance and hygiene practices.

The lack of clean water affects over 2 billion people worldwide, leading to preventable diseases and limiting opportunities for education and economic growth. In the communities we serve, children often walk miles each day to collect water from contaminated sources, missing school and putting their health at risk.

Our approach is sustainable and community-driven. We work closely with local leaders to identify the best locations for wells and water systems. Each installation includes:

• Deep water well drilling with modern equipment
• Solar-powered water pumps for reliability
• Water storage tanks and distribution systems
• Community training on maintenance and hygiene
• Ongoing monitoring and support

The impact is immediate and transformative. Families gain hours each day previously spent collecting water. Children can attend school regularly. Women can pursue income-generating activities. The entire community becomes healthier and more prosperous.

Your donation directly funds equipment, materials, and expert installation. Every dollar makes a difference in bringing this life-changing resource to those who need it most.`,
                image: '/api/placeholder/600/400',
                targetAmount: 50000,
                raisedAmount: 32500,
                donorsCount: 245,
                status: 'active',
                createdAt: '2024-01-15',
                category: 'Water & Sanitation',
                location: 'Rural Kenya',
                updates: [
                    {
                        date: '2024-01-20',
                        title: 'First Well Completed!',
                        content: 'We successfully completed our first well in Kibera village. The community now has access to clean water for the first time in decades.'
                    },
                    {
                        date: '2024-01-10',
                        title: 'Equipment Arrives',
                        content: 'All drilling equipment has arrived on site and our team is ready to begin construction.'
                    }
                ]
            },
            {
                id: '2',
                name: 'Education for All',
                description: 'Building schools and providing educational resources.',
                longDescription: `Education is the foundation of opportunity and hope. Our Education for All initiative focuses on building schools, training teachers, and providing learning materials in underserved communities where children have limited or no access to quality education.

In many remote areas, the nearest school is hours away by foot, making regular attendance impossible. Children, especially girls, are often kept home to help with household duties or work. Without education, the cycle of poverty continues across generations.

Our comprehensive approach addresses multiple barriers to education:

**Infrastructure Development:**
• Building new schools with proper classrooms
• Installing solar power for lighting and technology
• Constructing separate facilities for boys and girls
• Creating safe play areas and sports facilities

**Educational Resources:**
• Providing textbooks and learning materials
• Supplying computers and tablets for digital literacy
• Establishing libraries with age-appropriate books
• Creating science labs and workshops

**Teacher Training & Support:**
• Training local teachers in modern teaching methods
• Providing ongoing professional development
• Ensuring fair compensation for educators
• Supporting teacher housing in remote areas

**Community Engagement:**
• Working with parents to understand the value of education
• Providing school meals to encourage attendance
• Offering adult literacy programs
• Creating income opportunities for families

The results speak for themselves. In communities where we've built schools, enrollment rates increase by over 300%. Children who complete their education go on to become teachers, healthcare workers, and community leaders, creating a positive cycle of development.

Your support helps us build not just schools, but futures. Every contribution brings us closer to a world where every child has the opportunity to learn and grow.`,
                image: '/api/placeholder/600/400',
                targetAmount: 75000,
                raisedAmount: 45000,
                donorsCount: 189,
                status: 'active',
                createdAt: '2024-02-01',
                category: 'Education',
                location: 'Rural Bangladesh',
                updates: [
                    {
                        date: '2024-02-15',
                        title: 'School Construction Begins',
                        content: 'Ground breaking ceremony completed with the local community. Construction of the new school building has officially begun.'
                    }
                ]
            },
            {
                id: '3',
                name: 'Healthcare Support',
                description: 'Medical aid and healthcare facilities for underserved areas.',
                longDescription: `Access to healthcare is a fundamental human right, yet millions of people in remote and underserved areas lack basic medical services. Our Healthcare Support initiative brings essential medical care, preventive health programs, and healthcare infrastructure to communities that need it most.

In many rural areas, the nearest hospital or clinic can be days away by foot. Treatable conditions become life-threatening emergencies. Mothers give birth without medical assistance. Children suffer from preventable diseases. Our program addresses these critical gaps in healthcare access.

**Mobile Health Clinics:**
• Fully equipped medical vehicles that travel to remote villages
• Regular health checkups and preventive care
• Vaccination programs for children and adults
• Maternal and child health services
• Emergency medical response capabilities

**Healthcare Infrastructure:**
• Building and equipping local health centers
• Training community health workers
• Establishing medicine supply chains
• Installing medical equipment and technology
• Creating emergency communication systems

**Preventive Health Programs:**
• Health education and awareness campaigns
• Nutrition programs for children and pregnant women
• Disease prevention and early detection
• Mental health support and counseling
• Community hygiene and sanitation training

**Medical Training:**
• Training local healthcare workers and midwives
• Providing ongoing medical education
• Supporting healthcare worker certification
• Creating sustainable healthcare systems
• Building local medical expertise

Our impact is measured in lives saved and improved. Since launching this program, we've:
• Reduced child mortality rates by 40% in target communities
• Trained over 200 community health workers
• Provided medical care to more than 10,000 people
• Established 15 permanent health centers
• Delivered over 500 babies safely

Your donation directly funds medical supplies, equipment, training, and infrastructure. Together, we can ensure that geography is no longer a barrier to receiving life-saving healthcare.`,
                image: '/api/placeholder/600/400',
                targetAmount: 100000,
                raisedAmount: 100000,
                donorsCount: 412,
                status: 'completed',
                createdAt: '2023-12-10',
                category: 'Healthcare',
                location: 'Rural Ethiopia',
                updates: [
                    {
                        date: '2024-01-05',
                        title: 'Project Completed Successfully!',
                        content: 'We have successfully reached our goal and completed the healthcare center. The facility is now serving over 5,000 people in the region.'
                    }
                ]
            }
        ];

        const foundProject = mockProjects.find(p => p.id === projectId);
        setProject(foundProject || null);
    }, [projectId]);

    if (!project) {
        return (
            <div className={`min-h-screen pt-20 flex items-center justify-center ${darkMode ? 'bg-[#0a1628]' : 'bg-gray-50'}`}>
                <div className="text-center">
                    <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Project Not Found
                    </h2>
                    <button
                        onClick={() => onNavigate('projects')}
                        className="px-6 py-3 bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] text-white rounded-lg hover:shadow-lg transition-all"
                    >
                        Back to Projects
                    </button>
                </div>
            </div>
        );
    }

    const progressPercentage = Math.min((project.raisedAmount / project.targetAmount) * 100, 100);
    const remainingAmount = Math.max(project.targetAmount - project.raisedAmount, 0);

    const tabs = [
        { id: 'overview', name: 'Overview' },
        { id: 'updates', name: 'Updates' },
        { id: 'donors', name: 'Supporters' }
    ];

    return (
        <div className={`min-h-screen pt-20 ${darkMode ? 'bg-[#0a1628]' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ x: -5 }}
                    onClick={() => onNavigate('projects')}
                    className={`flex items-center gap-2 mb-6 px-4 py-2 rounded-lg transition-all ${darkMode
                        ? 'text-gray-300 hover:text-white hover:bg-white/10'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Projects
                </motion.button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Side - Donation Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-1"
                    >
                        <div className={`sticky top-24 p-6 rounded-2xl shadow-lg ${darkMode ? 'bg-[#1a2f5f] border border-white/10' : 'bg-white border border-gray-200'
                            }`}>
                            <div className="mb-6">
                                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    Support This Project
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            Raised
                                        </span>
                                        <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            ${project.raisedAmount.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            Goal
                                        </span>
                                        <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            ${project.targetAmount.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className={`w-full h-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progressPercentage}%` }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            className="h-3 bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] rounded-full"
                                        />
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                                            {progressPercentage.toFixed(0)}% funded
                                        </span>
                                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                                            {project.donorsCount} donors
                                        </span>
                                    </div>
                                    {project.status === 'completed' ? (
                                        <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                            <span className="text-green-500 font-medium">Project Completed!</span>
                                        </div>
                                    ) : (
                                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            ${remainingAmount.toLocaleString()} still needed
                                        </div>
                                    )}
                                </div>
                            </div>

                            {project.status !== 'completed' && (
                                <DonationForm darkMode={darkMode} />
                            )}

                            {/* Share Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 rounded-lg border transition-all ${darkMode
                                    ? 'border-white/20 text-gray-300 hover:bg-white/5'
                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <Share2 className="w-4 h-4" />
                                Share Project
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Right Side - Project Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-2"
                    >
                        {/* Project Header */}
                        <div className={`p-6 rounded-2xl shadow-lg mb-6 ${darkMode ? 'bg-[#1a2f5f] border border-white/10' : 'bg-white border border-gray-200'
                            }`}>
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {project.name}
                                    </h1>
                                    <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                        {project.description}
                                    </p>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className={`p-2 rounded-full transition-all ${darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'
                                        }`}
                                >
                                    <Heart className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                                </motion.button>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <Target className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                                        {project.category}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                                        Started {new Date(project.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                                        {project.location}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Project Image */}
                        <div className="mb-6">
                            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-[#ff6f0f]/20 to-[#ff8f3f]/20">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Target className="w-24 h-24 text-[#ff6f0f]/50" />
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex space-x-1 mb-6">
                            {tabs.map((tab) => (
                                <motion.button
                                    key={tab.id}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === tab.id
                                        ? 'bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] text-white shadow-lg'
                                        : darkMode
                                            ? 'bg-[#1a2f5f] text-gray-300 hover:bg-[#2a3f6f] border border-white/10'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                                        }`}
                                >
                                    {tab.name}
                                </motion.button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`p-6 rounded-2xl shadow-lg ${darkMode ? 'bg-[#1a2f5f] border border-white/10' : 'bg-white border border-gray-200'
                                }`}
                        >
                            {activeTab === 'overview' && (
                                <div className="prose max-w-none">
                                    <div className={`text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {project.longDescription.split('\n\n').map((paragraph, index) => (
                                            <p key={index} className="mb-4">
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'updates' && (
                                <div className="space-y-6">
                                    {project.updates.map((update, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className={`border-l-4 border-[#ff6f0f] pl-6 ${index !== project.updates.length - 1 ? 'pb-6 border-b border-gray-200/20' : ''
                                                }`}
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    {new Date(update.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <h4 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                {update.title}
                                            </h4>
                                            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                {update.content}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'donors' && (
                                <div className="text-center py-12">
                                    <Users className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                                    <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {project.donorsCount} Amazing Supporters
                                    </h3>
                                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Thank you to everyone who has contributed to this project!
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}