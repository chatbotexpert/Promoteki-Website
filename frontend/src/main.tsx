import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Initialize Lenis
const initLenis = () => {
  // @ts-ignore
  if (window.Lenis) {
    // @ts-ignore
    const lenis = new window.Lenis();
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }
};

const Root = () => {
  useEffect(() => {
    initLenis();
  }, []);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
