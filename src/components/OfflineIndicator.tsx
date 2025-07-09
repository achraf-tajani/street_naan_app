import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineMessage(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !showOfflineMessage) return null;

  return (
    <div className={`fixed top-20 left-4 right-4 md:left-auto md:right-4 md:w-80 rounded-lg p-4 shadow-lg z-50 transition-all duration-300 ${
      isOnline 
        ? 'bg-green-600 text-white' 
        : 'bg-red-600 text-white'
    }`}>
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          {isOnline ? (
            <Wifi className="h-5 w-5" />
          ) : (
            <WifiOff className="h-5 w-5" />
          )}
        </div>
        <div className="flex-1">
          <p className="font-medium">
            {isOnline ? 'Back online!' : 'You\'re offline'}
          </p>
          <p className="text-sm opacity-90">
            {isOnline 
              ? 'Your connection has been restored.' 
              : 'Some features may be limited.'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default OfflineIndicator;