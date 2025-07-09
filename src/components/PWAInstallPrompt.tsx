import React from 'react';
import { Download, X } from 'lucide-react';
import { usePWA } from '../hooks/usePWA';

const PWAInstallPrompt = () => {
  const { isInstallable, installApp } = usePWA();
  const [showPrompt, setShowPrompt] = React.useState(false);

  React.useEffect(() => {
    if (isInstallable) {
      // Show prompt after 3 seconds
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isInstallable]);

  if (!isInstallable || !showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-lg z-50 animate-slide-up">
      <div className="flex items-start space-x-3">
        <div className="bg-green-500 p-2 rounded-full">
          <Download className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-white font-semibold mb-1">Install FoodHub</h3>
          <p className="text-gray-300 text-sm mb-3">
            Install our app for faster access and offline ordering!
          </p>
          <div className="flex space-x-2">
            <button
              onClick={installApp}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Install
            </button>
            <button
              onClick={() => setShowPrompt(false)}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Later
            </button>
          </div>
        </div>
        <button
          onClick={() => setShowPrompt(false)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;