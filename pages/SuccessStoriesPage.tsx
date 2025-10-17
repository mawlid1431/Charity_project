import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MapPin, Calendar, Users, Droplet, GraduationCap, Stethoscope, X, Loader } from 'lucide-react';
import { getSuccessStories } from '@/utils/supabase/helpers';

interface SuccessStoriesPageProps {
    darkMode: boolean;
    onNavigate: (page: string) => void;
}

export function SuccessStoriesPage({ darkMode, onNavigate }: SuccessStoriesPageProps) {
    const [selectedStory, setSelectedStory] = useState<any>(null);
    const [stories, setStories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStories();
    }, []);

    const loadStories = async () => {
        try {
            const data = await getSuccessStories();
            setStories(data);
        } catch (error) {
            console.error('Error loading success stories:', error);
        } finally {
            setLoading(false);
        }
    };

    // Icon mapping for projects
    const getProjectIcon = (project: string) => {
        if (project.toLowerCase().includes('water')) return Droplet;
        if (project.toLowerCase().includes('education')) return GraduationCap;
        if (project.toLowerCase().includes('medical') || project.toLowerCase().includes('health')) return Stethoscope;
        if (project.toLowerCase().includes('food')) return Heart;
        return Heart;
    };

    const fallbackStories = [
        {
            id: 1,
            name: 'Amina Hassan',
            age: 32,
            location: 'Hargeisa, Somaliland',
            project: 'Clean Water Initiative',
            icon: Droplet,
            image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=800',
            story: 'Before the well was built in our village, I had to walk 5 kilometers every day to fetch water for my family. Now, we have clean water right in our community. My children are healthier, and I have time to work and support my family.',
            impact: 'Access to clean water for 200 families',
            date: 'January 2024'
        },
        {
            id: 2,
            name: 'Mohamed Ali',
            age: 15,
            location: 'Burao, Somaliland',
            project: 'Education for All',
            icon: GraduationCap,
            image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
            story: 'I dreamed of becoming a teacher, but my family could not afford school supplies. Thanks to the education program, I received books, a uniform, and school materials. Now I am top of my class and one step closer to my dream.',
            impact: 'Educational support for 150 students',
            date: 'February 2024'
        },
        {
            id: 3,
            name: 'Fatima Abdi',
            age: 45,
            location: 'Berbera, Somaliland',
            project: 'Medical Aid Program',
            icon: Stethoscope,
            image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800',
            story: 'When my daughter fell ill, the nearest hospital was too far and too expensive. The mobile clinic came to our village and provided free treatment and medicine. They saved my daughter\'s life. I am forever grateful.',
            impact: 'Healthcare for 500+ patients',
            date: 'January 2024'
        },
        {
            id: 4,
            name: 'Ahmed Yusuf',
            age: 38,
            location: 'Erigavo, Somaliland',
            project: 'Emergency Food Relief',
            icon: Heart,
            image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800',
            story: 'During the drought, my family struggled to find food. The emergency food packages kept us alive during the hardest months. Now the rains have returned, and we are rebuilding our lives with hope.',
            impact: 'Food support for 300 families',
            date: 'March 2024'
        },
        {
            id: 5,
            name: 'Khadija Omar',
            age: 28,
            location: 'Hargeisa, Somaliland',
            project: 'Clean Water Initiative',
            icon: Droplet,
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800',
            story: 'As a mother of four, clean water changed everything for us. My children no longer get sick from contaminated water. They can go to school regularly, and I can focus on our small business instead of spending hours fetching water.',
            impact: 'Improved health for entire community',
            date: 'February 2024'
        },
        {
            id: 6,
            name: 'Ibrahim Mohamed',
            age: 12,
            location: 'Borama, Somaliland',
            project: 'Education for All',
            icon: GraduationCap,
            image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
            story: 'I love learning, but we had no school in our area. The new school building brought education to our village. Now I can study science and mathematics. I want to become an engineer and help build my country.',
            impact: 'New school serving 200 children',
            date: 'March 2024'
        }
    ];

    return (
        <div className={`min-h-screen pt-24 pb-16 ${darkMode ? 'bg-[#0a1628]' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-2 bg-[#ff6f0f]/10 border border-[#ff6f0f]/30 rounded-full text-[#ff6f0f] mb-4"
                    >
                        Real Impact, Real Lives
                    </motion.span>
                    <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-[#1a2f5f]'}`}>
                        Success Stories
                    </h1>
                    <p className={`text-lg max-w-3xl mx-auto ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                        Meet the people whose lives have been transformed by our projects. These are the faces behind the numbers, the stories that inspire us to continue our mission.
                    </p>
                </motion.div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader className="w-8 h-8 animate-spin text-[#ff6f0f]" />
                    </div>
                ) : (
                    <>
                        {/* Success Stories Grid */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {(stories.length > 0 ? stories : fallbackStories).map((story, index) => {
                                const StoryIcon = story.icon || getProjectIcon(story.project);
                                return (
                                    <motion.div
                                        key={story.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.03, y: -5 }}
                                        className={`${darkMode ? 'bg-[#1a2f5f] border-white/10' : 'bg-white border-gray-200'} border rounded-2xl shadow-xl hover:shadow-2xl transition-all p-6`}
                                    >
                                        <div className="flex flex-col gap-4">
                                            {/* Image - Smaller and Rounded */}
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={story.image}
                                                    alt={story.name}
                                                    className="w-20 h-20 object-cover rounded-2xl shadow-lg flex-shrink-0"
                                                />
                                                <div className="flex-1">
                                                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#1a2f5f]'}`}>
                                                        {story.name}, {story.age}
                                                    </h3>
                                                    <div className="inline-flex items-center gap-2 bg-[#ff6f0f] text-white px-3 py-1 rounded-full text-xs mt-1">
                                                        <StoryIcon className="w-3 h-3" />
                                                        <span className="font-medium">{story.project}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex flex-col">
                                                <div className="flex flex-wrap gap-3 text-xs mb-3">
                                                    <div className={`flex items-center gap-1 ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
                                                        <MapPin className="w-3 h-3" />
                                                        {story.location}
                                                    </div>
                                                    <div className={`flex items-center gap-1 ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
                                                        <Calendar className="w-3 h-3" />
                                                        {story.date}
                                                    </div>
                                                </div>

                                                <p className={`text-sm mb-4 leading-relaxed italic line-clamp-3 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
                                                    "{story.story}"
                                                </p>

                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedStory(story);
                                                    }}
                                                    className="text-[#ff6f0f] text-sm font-medium hover:underline mb-3 flex items-center gap-1"
                                                >
                                                    Read More →
                                                </motion.button>

                                                <div className={`flex items-center gap-3 p-3 rounded-lg ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] flex items-center justify-center flex-shrink-0">
                                                        <Users className="w-4 h-4 text-white" />
                                                    </div>
                                                    <div>
                                                        <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
                                                            Impact
                                                        </p>
                                                        <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-[#1a2f5f]'}`}>
                                                            {story.impact}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </>
                )}

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <div className={`p-12 rounded-2xl ${darkMode ? 'bg-gradient-to-r from-[#1a2f5f] to-[#0f1c3f]' : 'bg-gradient-to-r from-gray-50 to-white'} border ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
                        <Heart className="w-16 h-16 text-[#ff6f0f] mx-auto mb-6" />
                        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#1a2f5f]'}`}>
                            Be Part of More Success Stories
                        </h2>
                        <p className={`text-lg mb-8 max-w-2xl mx-auto ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                            Every project creates new opportunities and transforms lives. Join us in making a difference.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onNavigate('projects')}
                            className="bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                        >
                            View Our Projects
                        </motion.button>
                    </div>
                </motion.div>

                {/* Modal for Full Story Details */}
                <AnimatePresence>
                    {selectedStory && (
                        <div
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                            onClick={() => setSelectedStory(null)}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ type: 'spring', damping: 25 }}
                                onClick={(e) => e.stopPropagation()}
                                className={`${darkMode ? 'bg-[#1a2f5f]' : 'bg-white'} rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl`}
                            >
                                {/* Modal Header */}
                                <div className={`sticky top-0 ${darkMode ? 'bg-[#1a2f5f]' : 'bg-white'} border-b ${darkMode ? 'border-white/10' : 'border-gray-200'} p-6 flex justify-between items-start z-10`}>
                                    <div className="flex items-center gap-4 flex-1">
                                        <img
                                            src={selectedStory.image}
                                            alt={selectedStory.name}
                                            className="w-20 h-20 rounded-2xl object-cover shadow-lg"
                                        />
                                        <div>
                                            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#1a2f5f]'}`}>
                                                {selectedStory.name}, {selectedStory.age}
                                            </h2>
                                            <div className="flex items-center gap-2 mt-2">
                                                {(() => {
                                                    const ModalIcon = selectedStory.icon || getProjectIcon(selectedStory.project);
                                                    return <ModalIcon className="w-4 h-4 text-[#ff6f0f]" />;
                                                })()}
                                                <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                                                    {selectedStory.project}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedStory(null)}
                                        className={`p-2 rounded-lg ${darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'} transition-colors`}
                                    >
                                        <X className={darkMode ? 'text-white' : 'text-gray-900'} />
                                    </button>
                                </div>

                                {/* Modal Content */}
                                <div className="p-6 space-y-6">
                                    {/* Location & Date */}
                                    <div className="flex flex-wrap gap-4">
                                        <div className={`flex items-center gap-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                                            <MapPin className="w-5 h-5 text-[#ff6f0f]" />
                                            <span>{selectedStory.location}</span>
                                        </div>
                                        <div className={`flex items-center gap-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                                            <Calendar className="w-5 h-5 text-[#ff6f0f]" />
                                            <span>{selectedStory.date}</span>
                                        </div>
                                    </div>

                                    {/* Story */}
                                    <div>
                                        <h3 className={`text-lg font-bold mb-3 ${darkMode ? 'text-white' : 'text-[#1a2f5f]'}`}>
                                            Their Story
                                        </h3>
                                        <p className={`text-lg leading-relaxed italic ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
                                            "{selectedStory.story}"
                                        </p>
                                    </div>

                                    {/* Impact */}
                                    <div className={`p-6 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] flex items-center justify-center flex-shrink-0">
                                                <Users className="w-8 h-8 text-white" />
                                            </div>
                                            <div>
                                                <p className={`text-sm mb-1 ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
                                                    Community Impact
                                                </p>
                                                <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#1a2f5f]'}`}>
                                                    {selectedStory.impact}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Call to Action */}
                                    <div className="flex gap-3 pt-4">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => {
                                                setSelectedStory(null);
                                                onNavigate('projects');
                                            }}
                                            className="flex-1 bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
                                        >
                                            View Our Projects
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setSelectedStory(null)}
                                            className={`px-6 py-3 rounded-xl font-semibold ${darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'}`}
                                        >
                                            Close
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
