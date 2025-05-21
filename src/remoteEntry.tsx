
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './libs/shared-ui/shared-ui.css';

// Mount function to start up the app
const mount = (el: HTMLElement) => {
  const root = createRoot(el);
  root.render(<App />);
  
  return {
    unmount: () => {
      root.unmount();
    }
  };
};

// If we're in development and running the app standalone
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.getElementById('root');
  if (devRoot) {
    mount(devRoot);
  }
}

// We export the mount function so it can be used when the app is loaded as a remote
export { mount };
