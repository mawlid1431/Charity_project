import { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, User, Eye, EyeOff } from 'lucide-react';

interface AdminLoginProps {
    darkMode: boolean;
    onLogin: (success: boolean) => void;
}

export function AdminLogin({ darkMode, onLogin }: AdminLoginProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simple authentication (replace with real authentication)
        if (username === 'admin' && password === 'admin123') {
            setTimeout(() => {
                onLogin(true);
                setIsLoading(false);
            }, 1000);
        } else {
            setTimeout(() => {
                setError('Invalid username or password');
                setIsLoading(false);
            }, 1000);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className={`w-full max-w-md p-8 rounded-2xl shadow-2xl ${darkMode
                        ? 'bg-[#1a2f5f] border border-white/10'
                        : 'bg-white border border-gray-200'
                    }`}
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ rotate: -10 }}
                        animate={{ rotate: 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-16 h-16 bg-gradient-to-br from-[#ff6f0f] to-[#ff8f3f] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#ff6f0f]/30"
                    >
                        <Lock className="w-8 h-8 text-white" />
                    </motion.div>
                    <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Admin Dashboard
                    </h1>
                    <p className={`text-sm mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Sign in to manage Mubarak Charity
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center"
                        >
                            {error}
                        </motion.div>
                    )}

                    {/* Username Field */}
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Username
                        </label>
                        <div className="relative">
                            <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all ${darkMode
                                        ? 'bg-[#0f1c3f] border-white/10 text-white placeholder-gray-400 focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                                    }`}
                                placeholder="Enter username"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Password
                        </label>
                        <div className="relative">
                            <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-all ${darkMode
                                        ? 'bg-[#0f1c3f] border-white/10 text-white placeholder-gray-400 focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#ff6f0f] focus:ring-2 focus:ring-[#ff6f0f]/20'
                                    }`}
                                placeholder="Enter password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Login Button */}
                    <motion.button
                        type="submit"
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${isLoading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-[#ff6f0f] to-[#ff8f3f] hover:from-[#ff8f3f] hover:to-[#ffa55f] shadow-lg shadow-[#ff6f0f]/30 hover:shadow-xl hover:shadow-[#ff6f0f]/40'
                            } text-white`}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                Signing in...
                            </div>
                        ) : (
                            'Sign In'
                        )}
                    </motion.button>
                </form>

                {/* Demo Credentials */}
                <div className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-[#0f1c3f]/50' : 'bg-gray-50'}`}>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} text-center`}>
                        Demo Credentials:<br />
                        Username: <span className="font-mono">admin</span><br />
                        Password: <span className="font-mono">admin123</span>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}