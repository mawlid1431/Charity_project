import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

interface SuccessStory {
    id: string;
    name: string;
    age: number;
    location: string;
    project: string;
    image: string;
    story: string;
    impact: string;
    date: string;
    created_at: string;
}

const SuccessStoriesAdmin: React.FC = () => {
    const [stories, setStories] = useState<SuccessStory[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingStory, setEditingStory] = useState<SuccessStory | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        age: 0,
        location: '',
        project: '',
        image: '',
        story: '',
        impact: '',
        date: ''
    });

    useEffect(() => {
        fetchStories();
    }, []);

    const fetchStories = async () => {
        try {
            const { data, error } = await supabase
                .from('success_stories')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setStories(data || []);
        } catch (error) {
            console.error('Error fetching success stories:', error);
            alert('Error fetching success stories');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editingStory) {
                // Update existing story
                const { error } = await supabase
                    .from('success_stories')
                    .update(formData)
                    .eq('id', editingStory.id);

                if (error) throw error;
                alert('Success story updated successfully!');
            } else {
                // Create new story
                const { error } = await supabase
                    .from('success_stories')
                    .insert([formData]);

                if (error) throw error;
                alert('Success story created successfully!');
            }

            resetForm();
            fetchStories();
        } catch (error) {
            console.error('Error saving success story:', error);
            alert('Error saving success story');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (story: SuccessStory) => {
        setEditingStory(story);
        setFormData({
            name: story.name,
            age: story.age,
            location: story.location,
            project: story.project,
            image: story.image,
            story: story.story,
            impact: story.impact,
            date: story.date
        });
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this success story?')) return;

        setLoading(true);
        try {
            const { error } = await supabase
                .from('success_stories')
                .delete()
                .eq('id', id);

            if (error) throw error;
            alert('Success story deleted successfully!');
            fetchStories();
        } catch (error) {
            console.error('Error deleting success story:', error);
            alert('Error deleting success story');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            age: 0,
            location: '',
            project: '',
            image: '',
            story: '',
            impact: '',
            date: ''
        });
        setEditingStory(null);
        setShowForm(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'age' ? parseInt(value) || 0 : value
        }));
    };

    if (loading && stories.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading success stories...</p>
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
                            <h1 className="text-3xl font-bold text-gray-900">Success Stories Management</h1>
                            <p className="text-gray-600 mt-2">Manage inspiring success stories from your projects</p>
                        </div>
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Add New Story
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
                                        {editingStory ? 'Edit Success Story' : 'Add New Success Story'}
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
                                                placeholder="Person's name"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Age *
                                            </label>
                                            <input
                                                type="number"
                                                name="age"
                                                value={formData.age}
                                                onChange={handleInputChange}
                                                required
                                                min="1"
                                                max="120"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Age"
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
                                            Impact *
                                        </label>
                                        <input
                                            type="text"
                                            name="impact"
                                            value={formData.impact}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="e.g., Access to clean water for 200 families"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Story *
                                        </label>
                                        <textarea
                                            name="story"
                                            value={formData.story}
                                            onChange={handleInputChange}
                                            required
                                            rows={4}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Tell their inspiring story..."
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
                                            {loading ? 'Saving...' : editingStory ? 'Update' : 'Create'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Stories List */}
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">
                            All Success Stories ({stories.length})
                        </h2>
                    </div>

                    {stories.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="text-gray-400 mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No success stories yet</h3>
                            <p className="text-gray-600 mb-6">Get started by adding your first success story.</p>
                            <button
                                onClick={() => setShowForm(true)}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Add First Story
                            </button>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {stories.map((story) => (
                                <div key={story.id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start space-x-4">
                                            <img
                                                src={story.image}
                                                alt={story.name}
                                                className="w-16 h-16 rounded-full object-cover"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <h3 className="text-lg font-semibold text-gray-900">{story.name}, {story.age}</h3>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-2">{story.location} • {story.project}</p>
                                                <p className="text-gray-800 mb-2 line-clamp-3">{story.story}</p>
                                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                    <span>Impact: {story.impact}</span>
                                                    <span>•</span>
                                                    <span>{story.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => handleEdit(story)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Edit story"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(story.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete story"
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

export default SuccessStoriesAdmin;