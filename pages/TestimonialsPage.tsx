import { motion } from 'motion/react';
import { Star, Quote, MapPin, Calendar, ThumbsUp } from 'lucide-react';

interface TestimonialsPageProps {
    darkMode: boolean;
    onNavigate: (page: string) => void;
}

export function TestimonialsPage({ darkMode, onNavigate }: TestimonialsPageProps) {
    const testimonials = [
        {
            id: 1,
            name: 'Sahra Mohamed',
            role: 'Community Leader',
            location: 'Hargeisa, Somaliland',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
            rating: 5,
            date: 'March 2024',
            feedback: 'Mubarak Charity has been a blessing to our community. The clean water project transformed our village. The team was professional, caring, and truly committed to making a lasting impact. Our children are healthier, and families have more time for education and work.',
            project: 'Clean Water Initiative'
        },
        {
            id: 2,
            name: 'Hassan Abdi',
            role: 'School Principal',
            location: 'Burao, Somaliland',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
            rating: 5,
            date: 'February 2024',
            feedback: 'The education program brought hope to hundreds of students who could not afford school supplies. The quality of materials and the ongoing support from Mubarak Charity has been exceptional. We have seen remarkable improvement in student attendance and performance.',
            project: 'Education for All'
        },
        {
            id: 3,
            name: 'Dr. Amina Jama',
            role: 'Medical Director',
            location: 'Berbera, Somaliland',
            image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400',
            rating: 5,
            date: 'January 2024',
            feedback: 'The mobile clinic program has saved countless lives in remote areas. Mubarak Charity provided modern medical equipment and essential medicines. Their commitment to healthcare access for underserved communities is truly inspiring. This is professional charity work at its finest.',
            project: 'Medical Aid Program'
        },
        {
            id: 4,
            name: 'Abdullahi Yusuf',
            role: 'Village Elder',
            location: 'Erigavo, Somaliland',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
            rating: 5,
            date: 'March 2024',
            feedback: 'During the drought, when our community faced starvation, Mubarak Charity responded quickly with emergency food relief. They did not just provide food packages; they gave us dignity and hope. The organization is transparent, efficient, and genuinely cares about people.',
            project: 'Emergency Food Relief'
        },
        {
            id: 5,
            name: 'Hawa Ibrahim',
            role: 'Women\'s Group Leader',
            location: 'Hargeisa, Somaliland',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
            rating: 5,
            date: 'February 2024',
            feedback: 'As a women\'s advocate, I have worked with many organizations. Mubarak Charity stands out for their respect, professionalism, and genuine partnership with local communities. They listen to our needs and deliver sustainable solutions. The water wells have empowered women in our area.',
            project: 'Clean Water Initiative'
        },
        {
            id: 6,
            name: 'Omar Hassan',
            role: 'Parent & Farmer',
            location: 'Borama, Somaliland',
            image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
            rating: 5,
            date: 'March 2024',
            feedback: 'My three children now attend the school built by Mubarak Charity. The quality of education and the dedication of the teachers they support is outstanding. This organization is changing the future of our children and our community. May Allah bless their work.',
            project: 'Education for All'
        },
        {
            id: 7,
            name: 'Nurse Faduma Ali',
            role: 'Healthcare Worker',
            location: 'Berbera, Somaliland',
            image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
            rating: 5,
            date: 'January 2024',
            feedback: 'Working with Mubarak Charity\'s medical program has been an honor. They provide consistent support, quality supplies, and proper training. The impact on maternal and child health in our region has been significant. This is how charity should be done - with professionalism and heart.',
            project: 'Medical Aid Program'
        },
        {
            id: 8,
            name: 'Sheikh Ahmed Nur',
            role: 'Religious Leader',
            location: 'Hargeisa, Somaliland',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
            rating: 5,
            date: 'February 2024',
            feedback: 'Mubarak Charity embodies the true spirit of Islamic charity - compassion, transparency, and service to humanity. I have personally witnessed their projects and can testify to their integrity and effectiveness. They are making a real difference in Somaliland.',
            project: 'Multiple Projects'
        },
        {
            id: 9,
            name: 'Maryan Abdi',
            role: 'Teacher',
            location: 'Burao, Somaliland',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
            rating: 5,
            date: 'March 2024',
            feedback: 'The school supplies and educational materials from Mubarak Charity are high quality and culturally appropriate. They consulted with us teachers to understand what students really need. The result is a program that truly works and helps children learn effectively.',
            project: 'Education for All'
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
                        Voices from the Community
                    </motion.span>
                    <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-[#1a2f5f]'}`}>
                        Testimonials
                    </h1>
                    <p className={`text-lg max-w-3xl mx-auto ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                        Hear directly from community leaders, beneficiaries, and partners about their experience with Mubarak Charity and the impact of our projects.
                    </p>
                </motion.div>

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
                                100%
                            </h3>
                            <p className={`${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                                Satisfaction Rate
                            </p>
                        </div>
                        <div>
                            <div className="w-16 h-16 bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] rounded-full flex items-center justify-center mx-auto mb-4">
                                <Star className="w-8 h-8 text-white" />
                            </div>
                            <h3 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#1a2f5f]'}`}>
                                5.0
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
                                500+
                            </h3>
                            <p className={`${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                                Positive Testimonials
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Call to Action */}
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
            </div>
        </div>
    );
}
