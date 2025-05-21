
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './libs/shared-ui/shared-ui.css';

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(<App />);
}

// Export the App
export { default } from './App';
