// app/admin/components/withAuth.jsx
"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingScreen from './LoadingScreen';

export default function withAuth(Component) {
    return function AuthProtected(props) {
        const [isAuthenticated, setIsAuthenticated] = useState(null);
        const router = useRouter();

        useEffect(() => {
            const checkAuth = () => {
                const auth = localStorage.getItem('isAuthenticated');
                if (auth === 'true') {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    router.push('/admin/login');
                }
            };

            checkAuth();
        }, [router]);

        if (isAuthenticated === null) {
            return <LoadingScreen />;
        }

        if (isAuthenticated === false) {
            return null;
        }

        return <Component {...props} />;
    };
}