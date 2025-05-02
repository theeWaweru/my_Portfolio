// app/lib/utils/previewState.js
"use client";

import { createContext, useContext, useState } from "react";

// Context for preview state management
const PreviewContext = createContext({
  previewData: null,
  setPreviewData: () => {},
  isPreviewMode: false,
  enablePreview: () => {},
  disablePreview: () => {},
  clearPreview: () => {},
});

// Hook for accessing preview state
export function usePreview() {
  return useContext(PreviewContext);
}

// Provider component for preview functionality
export function PreviewProvider({ children }) {
  const [previewData, setPreviewData] = useState(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const enablePreview = (data) => {
    setPreviewData(data);
    setIsPreviewMode(true);

    // Save to session storage to persist across page navigations
    if (typeof window !== "undefined") {
      sessionStorage.setItem("preview_data", JSON.stringify(data));
      sessionStorage.setItem("preview_mode", "true");
    }
  };

  const disablePreview = () => {
    setIsPreviewMode(false);

    // Update session storage
    if (typeof window !== "undefined") {
      sessionStorage.setItem("preview_mode", "false");
    }
  };

  const clearPreview = () => {
    setPreviewData(null);
    setIsPreviewMode(false);

    // Clear from session storage
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("preview_data");
      sessionStorage.removeItem("preview_mode");
    }
  };

  // Initialize from session storage if available
  useState(() => {
    if (typeof window !== "undefined") {
      const storedData = sessionStorage.getItem("preview_data");
      const storedMode = sessionStorage.getItem("preview_mode");

      if (storedData) {
        try {
          setPreviewData(JSON.parse(storedData));
        } catch (e) {
          console.error("Failed to parse preview data from session storage", e);
        }
      }

      if (storedMode === "true") {
        setIsPreviewMode(true);
      }
    }
  }, []);

  return (
    <PreviewContext.Provider
      value={{
        previewData,
        setPreviewData,
        isPreviewMode,
        enablePreview,
        disablePreview,
        clearPreview,
      }}
    >
      {children}
    </PreviewContext.Provider>
  );
}

// Export context for direct use if needed
export { PreviewContext };
