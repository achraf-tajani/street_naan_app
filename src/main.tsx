import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW, requestNotificationPermission } from './utils/pwaUtils';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Register service worker and setup PWA features
if (import.meta.env.PROD) {
  registerSW().then(async (registration) => {
    if (registration) {
      // Request notification permission
      await requestNotificationPermission();
    }
  });
}
