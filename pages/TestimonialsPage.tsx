import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, Quote, MapPin, Calendar, ThumbsUp, Loader } from 'lucide-react';
import { getTestimonials } from '@/utils/supabase/helpers';

interface TestimonialsPageProps {
    darkMode: boolean;
    onNavigate: (page: string) => void;
}

export function TestimonialsPage({ darkMode, onNavigate }: TestimonialsPageProps) {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTestimonials();
    }, []);

    const loadTestimonials = async () => {
        try {
            const data = await getTestimonials();
            setTestimonials(data);
        } catch (error) {
            console.error('Error loading testimonials:', error);
        } finally {
            setLoading(false);
        }
    };

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
                        Voices from the Community
                    </motion.span>
                    <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-[#1a2f5f]'}`}>
                        Testimonials
                    </h1>
                    <p className={`text-lg max-w-3xl mx-auto ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                        Hear directly from community leaders, beneficiaries, and partners about their experience with Mubarak Charity and the impact of our projects.
                    </p>
                </motion.div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader className="w-8 h-8 animate-spin text-[#ff6f0f]" />
                    </div>
                ) : (
                    <>
                        {testimonials.length > 0 ? (
                            <>
                                {/* Testimonials Grid */}
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                                    {testimonials.map((testimonial, index) => (
                                        <motion.div
                                            key={testimonial.id}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className={`${darkMode ? 'bg-[#1a2f5f] border-white/10' : 'bg-white border-gray-200'} border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all relative`}
                                        >
                                            {/* Quote Icon */}
                                            <div className="absolute top-6 right-6 opacity-10">
                                                <Quote className="w-16 h-16 text-[#ff6f0f]" />
                                            </div>

                                            {/* Profile */}
                                            <div className="flex items-center gap-4 mb-4 relative z-10">
                                                <img
                                                    src={testimonial.image}
                                                    alt={testimonial.name}
                                                    className="w-16 h-16 rounded-full object-cover border-2 border-[#ff6f0f]"
                                                />
                                                <div>
                                                    <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-[#1a2f5f]'}`}>
                                                        {testimonial.name}
                                                    </h3>
                                                    <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
                                                        {testimonial.role}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Rating */}
                                            <div className="flex gap-1 mb-4">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <Star key={i} className="w-5 h-5 fill-[#ff6f0f] text-[#ff6f0f]" />
                                                ))}
                                            </div>

                                            {/* Feedback */}
                                            <p className={`mb-4 leading-relaxed ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
                                                "{testimonial.feedback}"
                                            </p>

                                            {/* Meta Info */}
                                            <div className="space-y-2 pt-4 border-t border-white/10">
                                                <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
                                                    <MapPin className="w-4 h-4" />
                                                    {testimonial.location}
                                                </div>
                                                <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
                                                    <Calendar className="w-4 h-4" />
                                                    {testimonial.date}
                                                </div>
                                                <div className="pt-2">
                                                    <span className="inline-block px-3 py-1 bg-[#ff6f0f]/10 text-[#ff6f0f] rounded-full text-xs font-medium">
                                                        {testimonial.project}
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Stats Section */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className={`p-12 rounded-2xl ${darkMode ? 'bg-gradient-to-r from-[#1a2f5f] to-[#0f1c3f]' : 'bg-gradient-to-r from-gray-50 to-white'} border ${darkMode ? 'border-white/10' : 'border-gray-200'} mb-16`}
                                >
                                    <div className="grid md:grid-cols-3 gap-8 text-center">
                                        <div>
                                            <div className="w-16 h-16 bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] rounded-full flex items-center justify-center mx-auto mb-4">
                                                <ThumbsUp className="w-8 h-8 text-white" />
                                            </div>
                                            <h3 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#1a2f5f]'}`}>
                                                {testimonials.length}
                                            </h3>
                                            <p className={`${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                                                Total Testimonials
                                            </p>
                                        </div>
                                        <div>
                                            <div className="w-16 h-16 bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Star className="w-8 h-8 text-white" />
                                            </div>
                                            <h3 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#1a2f5f]'}`}>
                                                {testimonials.length > 0 ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1) : '0.0'}
                                            </h3>
                                            <p className={`${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                                                Average Rating
                                            </p>
                                        </div>
                                        <div>
                                            <div className="w-16 h-16 bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Quote className="w-8 h-8 text-white" />
                                            </div>
                                            <h3 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#1a2f5f]'}`}>
                                                {testimonials.filter(t => t.rating >= 4).length}
                                            </h3>
                                            <p className={`${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                                                Positive Reviews
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </>
                        ) : (
                            /* Empty State */
                            <div className="text-center py-16">
                                <div className="w-24 h-24 bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Quote className="w-12 h-12 text-white" />
                                </div>
                                <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#1a2f5f]'}`}>
                                    No Testimonials Yet
                                </h3>
                                <p className={`text-lg mb-8 max-w-2xl mx-auto ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                                    We're working hard to collect testimonials from our community. Check back soon to see what people are saying about our projects.
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => onNavigate('contact')}
                                    className="bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                                >
                                    Share Your Experience
                                </motion.button>
                            </div>
                        )}
                    </>
                )}

                {/* Call to Action */}
                {testimonials.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-center"
                    >
                        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#1a2f5f]'}`}>
                            Want to Share Your Experience?
                        </h2>
                        <p className={`text-lg mb-8 max-w-2xl mx-auto ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                            We value your feedback and would love to hear about your experience with our projects.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onNavigate('contact')}
                            className="bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                        >
                            Contact Us
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}