import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Loader, Play } from 'lucide-react';
import { getProjectById } from '@/utils/supabase/helpers';

interface Project {
    id: string;
    name: string;
    description: string;
    image: string;
    date: string;
    created_at: string;
    video_url: string | null;
}

interface ProjectDetailPageProps {
    darkMode: boolean;
    projectId: string;
    onNavigate: (page: string) => void;
}

export function ProjectDetailPage({ darkMode, projectId, onNavigate }: ProjectDetailPageProps) {
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProject();
    }, [projectId]);

    const loadProject = async () => {
        setLoading(true);
        try {
            const data = await getProjectById(projectId);
            if (data) {
                setProject(data);
            }
        } catch (error) {
            console.error('Error loading project:', error);
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
                        Loading project...
                    </p>
                </div>
            </div>
        );
    }

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

    return (
        <div className={`min-h-screen pt-20 ${darkMode ? 'bg-[#0a1628]' : 'bg-gray-50'}`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

                {/* Project Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {/* Project Header */}
                    <div className={`p-8 rounded-2xl shadow-lg mb-6 ${darkMode ? 'bg-[#1a2f5f] border border-white/10' : 'bg-white border border-gray-200'
                        }`}>
                        <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {project.name}
                        </h1>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm">
                                <Calendar className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                                    {new Date(project.date).toLocaleDateString()}
                                </span>
                            </div>

                            {project.video_url && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => project.video_url && window.open(project.video_url, '_blank')}
                                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                                >
                                    <Play className="w-5 h-5" />
                                    Watch Video
                                </motion.button>
                            )}


                        </div>
                    </div>

                    {/* Project Image */}
                    <div className="mb-6">
                        <div className="relative h-96 rounded-2xl overflow-hidden">
                            <img
                                src={project.image}
                                alt={project.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800';
                                }}
                            />
                        </div>
                    </div>

                    {/* Project Description */}
                    <div className={`p-8 rounded-2xl shadow-lg ${darkMode ? 'bg-[#1a2f5f] border border-white/10' : 'bg-white border border-gray-200'
                        }`}>
                        <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            About This Project
                        </h2>
                        <div className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {project.description?.split('\n').map((paragraph, index) => (
                                <p key={index} className="mb-4">
                                    {paragraph}
                                </p>
                            )) || <p>No description available.</p>}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
