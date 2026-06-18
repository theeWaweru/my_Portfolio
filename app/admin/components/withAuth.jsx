// app/admin/components/withAuth.jsx
"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../../lib/supabase/client';
import LoadingScreen from './LoadingScreen';

export default function withAuth(Component) {
    return function AuthProtected(props) {
        const [isAuthenticated, setIsAuthenticated] = useState(null);
        const [isCheckingAuth, setIsCheckingAuth] = useState(true);
        const router = useRouter();

        useEffect(() => {
            let subscription;

            const checkAuth = async () => {
                if (!supabase) {
                    setIsAuthenticated(false);
                    setIsCheckingAuth(false);
                    router.push('/admin/login');
                    return;
                }

                // Check for a real Supabase session
                const { data } = await supabase.auth.getSession();
                if (data?.session) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    router.push('/admin/login');
                }
                setIsCheckingAuth(false);

                // React to logout / token expiry in real time
                const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
                    if (!session) {
                        setIsAuthenticated(false);
                        router.push('/admin/login');
                    }
                });
                subscription = listener?.subscription;
            };

            checkAuth();

            return () => {
                if (subscription) subscription.unsubscribe();
            };
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