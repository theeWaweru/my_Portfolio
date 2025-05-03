// app/components/ui/ReCaptcha.jsx

"use client";

import { useEffect, useRef } from 'react';
import Script from 'next/script';

export default function ReCaptcha({ onVerify, siteKey }) {
    const containerRef = useRef(null);
    const widgetIdRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current || widgetIdRef.current) return;

        // Initialize reCAPTCHA when window.grecaptcha is ready
        const initReCaptcha = () => {
            if (!window.grecaptcha) return;

            // Render the reCAPTCHA widget
            widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
                sitekey: siteKey,
                callback: onVerify,
                'expired-callback': () => onVerify(null),
            });
        };

        // If grecaptcha is already loaded, initialize immediately
        if (window.grecaptcha && window.grecaptcha.render) {
            initReCaptcha();
        } else {
            // Ensure we only add the callback once
            window.onReCaptchaLoaded = window.onReCaptchaLoaded || [];
            window.onReCaptchaLoaded.push(initReCaptcha);

            // Global callback for when the script loads
            if (!window.onloadReCaptchaCallback) {
                window.onloadReCaptchaCallback = () => {
                    window.onReCaptchaLoaded.forEach(callback => callback());
                };
            }
        }

        // Clean up
        return () => {
            if (window.onReCaptchaLoaded) {
                window.onReCaptchaLoaded = window.onReCaptchaLoaded.filter(
                    callback => callback !== initReCaptcha
                );
            }
        };
    }, [onVerify, siteKey]);

    return (
        <>
            <Script
                src={`https://www.google.com/recaptcha/api.js?onload=onloadReCaptchaCallback&render=explicit`}
                strategy="afterInteractive"
            />
            <div ref={containerRef} className="g-recaptcha" />
        </>
    );
}
