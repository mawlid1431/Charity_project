import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Save, Image as ImageIcon, MapPin, Calendar, FileText, DollarSign, Activity, Upload, Loader, Link } from 'lucide-react';
import { supabase } from '@/utils/supabase/client';

interface Project {
    id: string;
    name: string;
    location: string;
    date: string;
    description: string;
    image: string;
    targetAmount: number;
    raisedAmount: number;
    donationLink: string;
    status: 'active' | 'completed' | 'paused';
}

interface ProjectFormProps {
    darkMode: boolean;
    project: Project | null;
    onSave: (project: Omit<Project, 'id' | 'createdAt'>) => void;
    onCancel: () => void;
}

export function ProjectForm({ darkMode, project, onSave, onCancel }: ProjectFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        date: '',
        description: '',
        image: '',
        targetAmount: 0,
        raisedAmount: 0,
        donationLink: '',
        status: 'active' as 'active' | 'completed' | 'paused'
    });

    const [uploading, setUploading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');

    useEffect(() => {
        if (project) {
            setFormData({
                name: project.name,
                location: project.location || '',
                date: project.date || '',
                description: project.description,
                image: project.image,
                targetAmount: project.targetAmount,
                raisedAmount: project.raisedAmount,
                donationLink: project.donationLink || '',
                status: project.status
            });
            setImagePreview(project.image);
        }
    }, [project]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // If there's a new image file, upload it first
        if (imageFile) {
            setUploading(true);
            const imageUrl = await uploadImage(imageFile);
            if (imageUrl) {
                formData.image = imageUrl;
            }
            setUploading(false);
        }

        onSave(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'targetAmount' || name === 'raisedAmount' ? parseFloat(value) || 0 : value
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should be less than 5MB');
                return;
            }

            setImageFile(file);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadImage = async (file: File): Promise<string | null> => {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
            const filePath = `projects/${fileName}`;

            // Upload to Supabase Storage
            const { error } = await supabase.storage
                .from('project-images')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (error) {
                console.error('Upload error:', error);
                alert('Failed to upload image. Please try again.');
                return null;
            }

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('project-images')
                .getPublicUrl(filePath);

            return publicUrl;
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload image. Please try again.');
            return null;
        }
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview('');
        setFormData(prev => ({ ...prev, image: '' }));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onCancel}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className={`w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${darkMode ? 'bg-[#1a2f5f] border border-white/10' : 'bg-white border border-gray-200'
                    }`}
            >
                {/* Header */}
                <div className={`sticky top-0 z-10 flex justify-between items-center p-6 border-b ${darkMode ? 'bg-[#1a2f5f] border-white/10' : 'bg-white border-gray-200'
                    }`}>
                    <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {project ? 'Edit Project' : 'Add New Project'}
                    </h2>
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onCancel}
                        className={`p-2 rounded-lg transition-all ${darkMode ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                            }`}
                    >
                        <X className="w-6 h-6" />
                    </motion.button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Project Name */}
                    <div>
                        <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                            <FileText className="w-4 h-4" />
                            Project Name *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter project name"
                            className={`w-full px-4 py-3 rounded-lg border transition-all ${darkMode
                                ? 'bg-[#0f1c3f] border-white/10 text-white placeholder-gray-400 focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                                }`}
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                            <MapPin className="w-4 h-4" />
                            Location *
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            placeholder="Enter project location"
                            className={`w-full px-4 py-3 rounded-lg border transition-all ${darkMode
                                ? 'bg-[#0f1c3f] border-white/10 text-white placeholder-gray-400 focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                                }`}
                        />
                    </div>

                    {/* Date */}
                    <div>
                        <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                            <Calendar className="w-4 h-4" />
                            Start Date *
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className={`w-full px-4 py-3 rounded-lg border transition-all ${darkMode
                                ? 'bg-[#0f1c3f] border-white/10 text-white focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                                : 'bg-white border-gray-300 text-gray-900 focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                                }`}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                            <FileText className="w-4 h-4" />
                            Description *
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={4}
                            placeholder="Enter project description"
                            className={`w-full px-4 py-3 rounded-lg border transition-all resize-none ${darkMode
                                ? 'bg-[#0f1c3f] border-white/10 text-white placeholder-gray-400 focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                                }`}
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                            <ImageIcon className="w-4 h-4" />
                            Project Image *
                        </label>

                        {/* Upload Button */}
                        <div className="space-y-3">
                            <label className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed cursor-pointer transition-all ${darkMode
                                ? 'bg-[#0f1c3f] border-white/20 hover:border-[#ff6f0f] hover:bg-[#0f1c3f]/80'
                                : 'bg-gray-50 border-gray-300 hover:border-[#ff6f0f] hover:bg-gray-100'
                                }`}>
                                <Upload className="w-5 h-5 text-[#ff6f0f]" />
                                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {imageFile ? imageFile.name : 'Click to upload image'}
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>

                            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Supported: JPG, PNG, GIF (Max 5MB)
                            </p>
                        </div>

                        {/* Image Preview */}
                        {(imagePreview || formData.image) && (
                            <div className="mt-3">
                                <div className="flex items-center justify-between mb-2">
                                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Image Preview:
                                    </p>
                                    <motion.button
                                        type="button"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={removeImage}
                                        className={`text-xs px-2 py-1 rounded transition-all ${darkMode
                                            ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                                            : 'bg-red-50 text-red-600 hover:bg-red-100'
                                            }`}
                                    >
                                        Remove
                                    </motion.button>
                                </div>
                                <div className="relative">
                                    <img
                                        src={imagePreview || formData.image}
                                        alt="Preview"
                                        className="w-full h-48 object-cover rounded-lg"
                                        onError={(e) => {
                                            e.currentTarget.src = 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800';
                                        }}
                                    />
                                    {uploading && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                                            <Loader className="w-8 h-8 text-white animate-spin" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Amounts Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Target Amount */}
                        <div>
                            <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                <DollarSign className="w-4 h-4" />
                                Target Amount ($) *
                            </label>
                            <input
                                type="number"
                                name="targetAmount"
                                value={formData.targetAmount}
                                onChange={handleChange}
                                required
                                min="0"
                                step="100"
                                placeholder="50000"
                                className={`w-full px-4 py-3 rounded-lg border transition-all ${darkMode
                                    ? 'bg-[#0f1c3f] border-white/10 text-white placeholder-gray-400 focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                                    }`}
                            />
                        </div>

                        {/* Raised Amount */}
                        <div>
                            <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                <DollarSign className="w-4 h-4" />
                                Raised Amount ($) *
                            </label>
                            <input
                                type="number"
                                name="raisedAmount"
                                value={formData.raisedAmount}
                                onChange={handleChange}
                                required
                                min="0"
                                step="100"
                                placeholder="15000"
                                className={`w-full px-4 py-3 rounded-lg border transition-all ${darkMode
                                    ? 'bg-[#0f1c3f] border-white/10 text-white placeholder-gray-400 focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                                    }`}
                            />
                        </div>
                    </div>

                    {/* Donation Link */}
                    <div>
                        <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                            <Link className="w-4 h-4" />
                            Donation Link
                        </label>
                        <input
                            type="url"
                            name="donationLink"
                            value={formData.donationLink}
                            onChange={handleChange}
                            placeholder="https://paypal.me/yourproject"
                            className={`w-full px-4 py-3 rounded-lg border transition-all ${darkMode
                                ? 'bg-[#0f1c3f] border-white/10 text-white placeholder-gray-400 focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                                }`}
                        />
                        <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Optional: PayPal, Stripe, or any donation page URL
                        </p>
                    </div>

                    {/* Status */}
                    <div>
                        <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                            <Activity className="w-4 h-4" />
                            Status *
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                            className={`w-full px-4 py-3 rounded-lg border transition-all ${darkMode
                                ? 'bg-[#0f1c3f] border-white/10 text-white focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                                : 'bg-white border-gray-300 text-gray-900 focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                                }`}
                        >
                            <option value="active">Active</option>
                            <option value="paused">Paused</option>
                            <option value="completed">Completed</option>
                        </select>
                        <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Active: Accepting donations | Paused: Temporarily stopped | Completed: Goal reached
                        </p>
                    </div>

                    {/* Progress Preview */}
                    {formData.targetAmount > 0 && (
                        <div className={`p-4 rounded-lg ${darkMode ? 'bg-[#0f1c3f] border border-white/10' : 'bg-gray-50 border border-gray-200'
                            }`}>
                            <p className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Progress Preview
                            </p>
                            <div className="flex justify-between items-center mb-2">
                                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    ${formData.raisedAmount.toLocaleString()} raised
                                </span>
                                <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {((formData.raisedAmount / formData.targetAmount) * 100).toFixed(1)}%
                                </span>
                            </div>
                            <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                <div
                                    className="h-2 bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] rounded-full transition-all"
                                    style={{ width: `${Math.min((formData.raisedAmount / formData.targetAmount) * 100, 100)}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onCancel}
                            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${darkMode
                                ? 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                                }`}
                        >
                            Cancel
                        </motion.button>
                        <motion.button
                            type="submit"
                            disabled={uploading}
                            whileHover={{ scale: uploading ? 1 : 1.02 }}
                            whileTap={{ scale: uploading ? 1 : 0.98 }}
                            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] text-white rounded-lg font-medium shadow-lg shadow-[#ff6f0f]/30 hover:shadow-xl hover:shadow-[#ff6f0f]/40 transition-all ${uploading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {uploading ? (
                                <>
                                    <Loader className="w-5 h-5 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    {project ? 'Update Project' : 'Create Project'}
                                </>
                            )}
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}
