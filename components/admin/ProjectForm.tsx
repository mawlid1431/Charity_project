import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Upload, DollarSign, FileText, Image } from 'lucide-react';

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

interface ProjectFormProps {
    darkMode: boolean;
    project?: Project | null;
    onSave: (project: Omit<Project, 'id' | 'createdAt'>) => void;
    onCancel: () => void;
}

export function ProjectForm({ darkMode, project, onSave, onCancel }: ProjectFormProps) {
    const [formData, setFormData] = useState({
        name: project?.name || '',
        description: project?.description || '',
        image: project?.image || '',
        targetAmount: project?.targetAmount || 0,
        raisedAmount: project?.raisedAmount || 0,
        status: project?.status || 'active' as const
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = 'Project name is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (formData.targetAmount <= 0) newErrors.targetAmount = 'Target amount must be greater than 0';
        if (formData.raisedAmount < 0) newErrors.raisedAmount = 'Raised amount cannot be negative';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            onSave(formData);
        }
    };

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={(e) => e.target === e.currentTarget && onCancel()}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl ${darkMode ? 'bg-[#1a2f5f] border border-white/10' : 'bg-white border border-gray-200'
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200/20">
                    <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {project ? 'Edit Project' : 'Add New Project'}
                    </h2>
                    <button
                        onClick={onCancel}
                        className={`p-2 rounded-lg transition-all ${darkMode ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                            }`}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Project Name */}
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Project Name *
                        </label>
                        <div className="relative">
                            <FileText className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all ${errors.name
                                        ? 'border-red-500 focus:ring-red-500/20'
                                        : darkMode
                                            ? 'bg-[#0f1c3f] border-white/10 text-white placeholder-gray-400 focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                                    }`}
                                placeholder="Enter project name"
                            />
                        </div>
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Description *
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            rows={4}
                            className={`w-full px-4 py-3 rounded-lg border transition-all resize-none ${errors.description
                                    ? 'border-red-500 focus:ring-red-500/20'
                                    : darkMode
                                        ? 'bg-[#0f1c3f] border-white/10 text-white placeholder-gray-400 focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                                }`}
                            placeholder="Enter project description"
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Project Image URL
                        </label>
                        <div className="relative">
                            <Image className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            <input
                                type="url"
                                value={formData.image}
                                onChange={(e) => handleInputChange('image', e.target.value)}
                                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all ${darkMode
                                        ? 'bg-[#0f1c3f] border-white/10 text-white placeholder-gray-400 focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                                    }`}
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>
                    </div>

                    {/* Amount Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Target Amount */}
                        <div>
                            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Target Amount ($) *
                            </label>
                            <div className="relative">
                                <DollarSign className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                <input
                                    type="number"
                                    min="0"
                                    step="100"
                                    value={formData.targetAmount}
                                    onChange={(e) => handleInputChange('targetAmount', parseInt(e.target.value) || 0)}
                                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all ${errors.targetAmount
                                            ? 'border-red-500 focus:ring-red-500/20'
                                            : darkMode
                                                ? 'bg-[#0f1c3f] border-white/10 text-white placeholder-gray-400 focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                                        }`}
                                    placeholder="50000"
                                />
                            </div>
                            {errors.targetAmount && <p className="text-red-500 text-sm mt-1">{errors.targetAmount}</p>}
                        </div>

                        {/* Raised Amount */}
                        <div>
                            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Raised Amount ($)
                            </label>
                            <div className="relative">
                                <DollarSign className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                <input
                                    type="number"
                                    min="0"
                                    step="100"
                                    value={formData.raisedAmount}
                                    onChange={(e) => handleInputChange('raisedAmount', parseInt(e.target.value) || 0)}
                                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all ${errors.raisedAmount
                                            ? 'border-red-500 focus:ring-red-500/20'
                                            : darkMode
                                                ? 'bg-[#0f1c3f] border-white/10 text-white placeholder-gray-400 focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                                        }`}
                                    placeholder="25000"
                                />
                            </div>
                            {errors.raisedAmount && <p className="text-red-500 text-sm mt-1">{errors.raisedAmount}</p>}
                        </div>
                    </div>

                    {/* Status */}
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Status
                        </label>
                        <select
                            value={formData.status}
                            onChange={(e) => handleInputChange('status', e.target.value)}
                            className={`w-full px-4 py-3 rounded-lg border transition-all ${darkMode
                                    ? 'bg-[#0f1c3f] border-white/10 text-white focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                                    : 'bg-white border-gray-300 text-gray-900 focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                                }`}
                        >
                            <option value="active">Active</option>
                            <option value="paused">Paused</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 pt-4">
                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onCancel}
                            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${darkMode
                                    ? 'bg-gray-600 text-white hover:bg-gray-700'
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                }`}
                        >
                            Cancel
                        </motion.button>
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 py-3 px-4 bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] text-white rounded-lg font-medium shadow-lg shadow-[#ff6f0f]/30 hover:shadow-xl hover:shadow-[#ff6f0f]/40 transition-all"
                        >
                            {project ? 'Update Project' : 'Create Project'}
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}