
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Only render if we're in a browser environment and have a root element
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
