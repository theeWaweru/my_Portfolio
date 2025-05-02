// app/admin/components/withAuth.jsx
"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingScreen from './LoadingScreen';

export default function withAuth(Component) {
    return function AuthProtected(props) {
        const [isAuthenticated, setIsAuthenticated] = useState(null);
        const [isCheckingAuth, setIsCheckingAuth] = useState(true);
        const router = useRouter();

        useEffect(() => {
            const checkAuth = () => {
                // Check if user is authenticated
                const auth = localStorage.getItem('isAuthenticated');

                if (auth === 'true') {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    // Redirect to login page
                    router.push('/admin/login');
                }

                setIsCheckingAuth(false);
            };

            checkAuth();
        }, [router]);

        // Show loading screen while checking authentication
        if (isCheckingAuth) {
            return <LoadingScreen />;
        }

        // Don't render the component if not authenticated
        if (isAuthenticated === false) {
            return null;
        }

        // Render the component if authenticated
        return <Component {...props} />;
    };
}