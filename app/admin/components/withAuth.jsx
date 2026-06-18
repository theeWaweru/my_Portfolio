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

                const { data } = await supabase.auth.getSession();
                if (data?.session) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    router.push('/admin/login');
                }
                setIsCheckingAuth(false);

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

        if (isCheckingAuth) {
            return <LoadingScreen />;
        }

        if (isAuthenticated === false) {
            return null;
        }

        return <Component {...props} />;
    };
}
