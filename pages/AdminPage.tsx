import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AdminLogin } from '../components/admin/AdminLogin';
import { AdminDashboard } from '../components/admin/AdminDashboard';

interface AdminPageProps {
    darkMode: boolean;
}

export function AdminPage({ darkMode }: AdminPageProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if admin is already logged in
        const adminToken = localStorage.getItem('adminToken');
        if (adminToken) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (success: boolean) => {
        if (success) {
            setIsAuthenticated(true);
            localStorage.setItem('adminToken', 'admin-authenticated');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('adminToken');
    };

    return (
        <div className={`min-h-screen pt-20 ${darkMode ? 'bg-[#0a1628]' : 'bg-gray-50'}`}>
            <AnimatePresence mode="wait">
                {!isAuthenticated ? (
                    <motion.div
                        key="login"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <AdminLogin darkMode={darkMode} onLogin={handleLogin} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="dashboard"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <AdminDashboard darkMode={darkMode} onLogout={handleLogout} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}