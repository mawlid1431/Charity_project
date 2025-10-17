import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

interface Testimonial {
    id: string;
    name: string;
    role: string;
    location: string;
    image: string;
    rating: number;
    feedback: string;
    project: string;
    date: string;
    created_at: string;
}

const TestimonialAdmin: React.FC = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        location: '',
        image: '',
        rating: 5,
        feedback: '',
        project: '',
        date: ''
    });

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const { data, error } = await supabase
                .from('testimonials')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setTestimonials(data || []);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
            alert('Error fetching testimonials');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editingTestimonial) {
                // Update existing testimonial
                const { error } = await supabase
                    .from('testimonials')
                    .update(formData)
                    .eq('id', editingTestimonial.id);

                if (error) throw error;
                alert('Testimonial updated successfully!');
            } else {
                // Create new testimonial
                const { error } = await supabase
                    .from('testimonials')
                    .insert([formData]);

                if (error) throw error;
                alert('Testimonial created successfully!');
            }

            resetForm();
            fetchTestimonials();
        } catch (error) {
            console.error('Error saving testimonial:', error);
            alert('Error saving testimonial');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (testimonial: Testimonial) => {
        setEditingTestimonial(testimonial);
        setFormData({
            name: testimonial.name,
            role: testimonial.role,
            location: testimonial.location,
            image: testimonial.image,
            rating: testimonial.rating,
            feedback: testimonial.feedback,
            project: testimonial.project,
            date: testimonial.date
        });
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this testimonial?')) return;

        setLoading(true);
        try {
            const { error } = await supabase
                .from('testimonials')
                .delete()
                .eq('id', id);

            if (error) throw error;
            alert('Testimonial deleted successfully!');
            fetchTestimonials();
        } catch (error) {
            console.error('Error deleting testimonial:', error);
            alert('Error deleting testimonial');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            role: '',
            location: '',
            image: '',
            rating: 5,
            feedback: '',
            project: '',
            date: ''
        });
        setEditingTestimonial(null);
        setShowForm(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'rating' ? parseInt(value) : value
        }));
    };

    if (loading && testimonials.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading testimonials...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Testimonial Management</h1>
                            <p className="text-gray-600 mt-2">Manage customer testimonials and reviews</p>
                        </div>
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Add New Testimonial
                        </button>
                    </div>
                </div>

                {/* Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
                                    </h2>
                                    <button
                                        onClick={resetForm}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Customer name"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Role *
                                            </label>
                                            <input
                                                type="text"
                                                name="role"
                                                value={formData.role}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Job title or role"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Location *
                                            </label>
                                            <input
                                                type="text"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="City, Country"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Rating *
                                            </label>
                                            <select
                                                name="rating"
                                                value={formData.rating}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value={5}>5 Stars</option>
                                                <option value={4}>4 Stars</option>
                                                <option value={3}>3 Stars</option>
                                                <option value={2}>2 Stars</option>
                                                <option value={1}>1 Star</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Project *
                                            </label>
                                            <input
                                                type="text"
                                                name="project"
                                                value={formData.project}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Related project name"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Date *
                                            </label>
                                            <input
                                                type="text"
                                                name="date"
                                                value={formData.date}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="e.g., March 2024"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Image URL *
                                        </label>
                                        <input
                                            type="url"
                                            name="image"
                                            value={formData.image}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Feedback *
                                        </label>
                                        <textarea
                                            name="feedback"
                                            value={formData.feedback}
                                            onChange={handleInputChange}
                                            required
                                            rows={4}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Customer testimonial text..."
                                        />
                                    </div>

                                    <div className="flex justify-end space-x-4">
                                        <button
                                            type="button"
                                            onClick={resetForm}
                                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                                        >
                                            {loading ? 'Saving...' : editingTestimonial ? 'Update' : 'Create'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Testimonials List */}
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">
                            All Testimonials ({testimonials.length})
                        </h2>
                    </div>

                    {testimonials.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="text-gray-400 mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No testimonials yet</h3>
                            <p className="text-gray-600 mb-6">Get started by adding your first testimonial.</p>
                            <button
                                onClick={() => setShowForm(true)}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Add First Testimonial
                            </button>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {testimonials.map((testimonial) => (
                                <div key={testimonial.id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start space-x-4">
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                className="w-16 h-16 rounded-full object-cover"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                                                    <div className="flex items-center">
                                                        {[...Array(testimonial.rating)].map((_, i) => (
                                                            <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-2">{testimonial.role} • {testimonial.location}</p>
                                                <p className="text-gray-800 mb-2 line-clamp-3">{testimonial.feedback}</p>
                                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                    <span>Project: {testimonial.project}</span>
                                                    <span>•</span>
                                                    <span>{testimonial.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => handleEdit(testimonial)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Edit testimonial"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(testimonial.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete testimonial"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TestimonialAdmin;