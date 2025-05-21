
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './libs/shared-ui/shared-ui.css';

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(<App />);
}

// Export components that can be consumed by a host application
export { default as SharedUIDemo } from './pages/SharedUIDemo';
export { Sidebar } from './components/layout/Sidebar';
export { MainLayout } from './components/layout/MainLayout';
export * from './libs/shared-ui/components/shared';
