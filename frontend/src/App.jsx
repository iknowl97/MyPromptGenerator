import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTheme } from './contexts/ThemeContext';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import GeneratePage from './pages/GeneratePage';
import ModelStatusPage from './pages/ModelStatusPage';
import DocumentationPage from './pages/DocumentationPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme === 'dark' ? 'dark' : 'light'}`}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/generate" element={<GeneratePage />} />
            <Route path="/model-status" element={<ModelStatusPage />} />
            <Route path="/docs/*" element={<DocumentationPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;