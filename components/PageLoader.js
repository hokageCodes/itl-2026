"use client";
import { useEffect, useState } from 'react';
import Loader from './Loader';

export default function PageLoader({ children }) {
  const [showLoader, setShowLoader] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check if this is the first page load
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (!hasVisited) {
      setShowLoader(true);
      sessionStorage.setItem('hasVisited', 'true');
    }
  }, []);

  const handleLoaderComplete = () => {
    setShowLoader(false);
  };

  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <>
      {showLoader && <Loader onComplete={handleLoaderComplete} />}
      <div style={{ opacity: showLoader ? 0 : 1, transition: 'opacity 0.3s' }}>
        {children}
      </div>
    </>
  );
}

