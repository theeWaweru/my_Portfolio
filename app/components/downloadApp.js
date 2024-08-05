// components/DownloadApp.js

"use client";

import { useEffect } from "react";

const DownloadApp = () => {
  useEffect(() => {
    const downloadApp = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;

      if (/android/i.test(userAgent)) {
        // Redirect to Google Play Store
        window.location.href =
          "https://play.google.com/store/apps/details?id=us.zoom.videomeetings";
      } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        // Redirect to Apple App Store
        window.location.href =
          "https://apps.apple.com/ke/app/zoom-workplace/id546505307";
      } else {
        // Redirect to a different page for desktop users
        window.location.href = "https://www.example.com/download";
      }
    };

    downloadApp();
  }, []);

  return null; // Since it's a redirect, no UI is needed
};

export default DownloadApp;
