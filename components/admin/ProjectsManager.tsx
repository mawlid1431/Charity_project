import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit, Trash2, Target } from 'lucide-react';
import { ProjectForm } from './ProjectForm';

interface Project {
    id: string;
    name: string;
    description: string;
    image: string;
    targetAmount: number;
    raisedAmount: number;
    status: 'active' | 'completed' | 'paused';
    createdAt: string;
}

interface ProjectsManagerProps {
    darkMode: boolean;
}

export function ProjectsManager({ darkMode }: ProjectsManagerProps) {
    const [projects, setProjects] = useState<Project[]>([
        {
            id: '1',
            name: 'Clean Water Initiative',
            description: 'Providing clean water access to rural communities in need.',
            image: '/api/placeholder/300/200',
            targetAmount: 50000,
            raisedAmount: 32500,
            status: 'active',
            createdAt: '2024-01-15'
        },
        {
            id: '2',
            name: 'Education for All',
            description: 'Building schools and providing educational resources.',
            image: '/api/placeholder/300/200',
            targetAmount: 75000,
            raisedAmount: 45000,
            status: 'active',
            createdAt: '2024-02-01'
        },
        {
            id: '3',
            name: 'Healthcare Support',
            description: 'Medical aid and healthcare facilities for underserved areas.',
            image: '/api/placeholder/300/200',
            targetAmount: 100000,
            raisedAmount: 100000,
            status: 'completed',
            createdAt: '2023-12-10'
        }
    ]);

    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    const handleAddProject = () => {
        setEditingProject(null);
        setShowForm(true);
    };

    const handleEditProject = (project: Project) => {
        setEditingProject(project);
        setShowForm(true);
    };

    const handleDeleteProject = (id: string) => {
        if (confirm('Are you sure you want to delete this project?')) {
            setProjects(projects.filter(p => p.id !== id));
        }
    };

    const handleSaveProject = (projectData: Omit<Project, 'id' | 'createdAt'>) => {
        if (editingProject) {
            // Update existing project
            setProjects(projects.map(p =>
                p.id === editingProject.id
                    ? { ...p, ...projectData }
                    : p
            ));
        } else {
            // Add new project
            const newProject: Project = {
                ...projectData,
                id: Date.now().toString(),
                createdAt: new Date().toISOString().split('T')[0]
            };
            setProjects([...projects, newProject]);
        }
        setShowForm(false);
        setEditingProject(null);
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

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Projects Management
                </h2>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddProject}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] text-white rounded-lg shadow-lg shadow-[#ff6f0f]/30 hover:shadow-xl hover:shadow-[#ff6f0f]/40 transition-all"
                >
                    <Plus className="w-5 h-5" />
                    Add Project
                </motion.button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`rounded-xl overflow-hidden shadow-lg ${darkMode ? 'bg-[#1a2f5f] border border-white/10' : 'bg-white border border-gray-200'
                            }`}
                    >
                        {/* Project Image */}
                        <div className="relative h-48 bg-gradient-to-br from-[#ff6f0f]/20 to-[#ff8f3f]/20">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Target className="w-16 h-16 text-[#ff6f0f]/50" />
                            </div>
                            <div className="absolute top-3 right-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(project.status)}`}>
                                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                </span>
                            </div>
                        </div>

                        {/* Project Content */}
                        <div className="p-6">
                            <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {project.name}
                            </h3>
                            <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                {project.description}
                            </p>

                            {/* Progress */}
                            <div className="mb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Progress
                                    </span>
                                    <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {getProgressPercentage(project.raisedAmount, project.targetAmount).toFixed(0)}%
                                    </span>
                                </div>
                                <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                    <div
                                        className="h-2 bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] rounded-full transition-all duration-500"
                                        style={{ width: `${getProgressPercentage(project.raisedAmount, project.targetAmount)}%` }}
                                    />
                                </div>
                            </div>

                            {/* Amounts */}
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Raised</p>
                                    <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        ${project.raisedAmount.toLocaleString()}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Target</p>
                                    <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        ${project.targetAmount.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleEditProject(project)}
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
                                    onClick={() => handleDeleteProject(project.id)}
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

            {/* Project Form Modal */}
            <AnimatePresence>
                {showForm && (
                    <ProjectForm
                        darkMode={darkMode}
                        project={editingProject}
                        onSave={handleSaveProject}
                        onCancel={() => {
                            setShowForm(false);
                            setEditingProject(null);
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}