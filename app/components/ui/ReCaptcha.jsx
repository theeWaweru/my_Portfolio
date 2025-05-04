"use client";

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

export default function ReCaptcha({ onVerify, siteKey }) {
    const containerRef = useRef(null);
    const widgetIdRef = useRef(null);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [isReCaptchaReady, setIsReCaptchaReady] = useState(false);

    // This effect prevents server/client mismatch by not rendering anything on server
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Handle script loading
    const handleScriptLoad = () => {
        setIsScriptLoaded(true);

        // Wait for grecaptcha to be fully ready with render function
        const checkRecaptchaReady = () => {
            if (window.grecaptcha && typeof window.grecaptcha.render === 'function') {
                setIsReCaptchaReady(true);
            } else {
                setTimeout(checkRecaptchaReady, 100);
            }
        };

        checkRecaptchaReady();
    };

    // Render reCAPTCHA when everything is ready
    useEffect(() => {
        if (!isScriptLoaded || !isReCaptchaReady || !isMounted || !containerRef.current) {
            return;
        }

        // Validate siteKey
        if (!siteKey) {
            console.error('ReCaptcha Error: Missing required parameter: siteKey');
            return;
        }

        // Check if already rendered
        if (containerRef.current.querySelector('.g-recaptcha-response')) {
            return;
        }

        try {
            window.grecaptcha.ready(() => {
                try {
                    widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
                        sitekey: siteKey,
                        callback: onVerify,
                        'expired-callback': () => onVerify(null),
                        'error-callback': () => onVerify(null),
                    });
                } catch (e) {
                    console.error('Error rendering reCAPTCHA:', e);
                }
            });
        } catch (e) {
            console.error('Error with grecaptcha.ready:', e);

            // Fallback if .ready() is not available
            try {
                widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
                    sitekey: siteKey,
                    callback: onVerify,
                    'expired-callback': () => onVerify(null),
                    'error-callback': () => onVerify(null),
                });
            } catch (innerError) {
                console.error('Fallback rendering also failed:', innerError);
            }
        }
    }, [isScriptLoaded, isReCaptchaReady, isMounted, onVerify, siteKey]);

    // Reset reCAPTCHA on unmount
    useEffect(() => {
        return () => {
            if (widgetIdRef.current !== null &&
                window.grecaptcha &&
                typeof window.grecaptcha.reset === 'function') {
                try {
                    window.grecaptcha.reset(widgetIdRef.current);
                } catch (e) {
                    console.error('Error resetting reCAPTCHA:', e);
                }
            }
        };
    }, []);

    // Don't render anything on the server to prevent hydration mismatch
    if (!isMounted) {
        return null;
    }

    return (
        <>
            <Script
                src="https://www.google.com/recaptcha/api.js?render=explicit"
                strategy="lazyOnload"
                onLoad={handleScriptLoad}
            />
            <div ref={containerRef} className="g-recaptcha" />
        </>
    );
}
