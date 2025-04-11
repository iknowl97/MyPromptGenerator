import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiHelpCircle, FiArrowLeft, FiAlertTriangle } from 'react-icons/fi';

const NotFoundPage = () => {
  return (
    <div className="hero-gradient-bg min-h-screen flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-hero p-8 max-w-md w-full mx-auto relative overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
        
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 rounded-full bg-primary-50 dark:bg-primary-900 flex items-center justify-center animate-pulse">
            <FiAlertTriangle className="h-12 w-12 text-primary-500 dark:text-primary-400" />
          </div>
        </div>
        
        <h1 className="text-8xl font-bold text-center bg-gradient-to-r from-primary-500 to-secondary-500 text-transparent bg-clip-text mb-4">404</h1>
        
        <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
          The page you are looking for doesn't exist or has been moved to a new location.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Link 
            to="/"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 transition-colors duration-200 shadow-sm hover:shadow w-full sm:w-auto"
          >
            <FiHome className="mr-2" />
            Back to Home
          </Link>
          <Link 
            to="/docs"
            className="inline-flex items-center justify-center px-5 py-3 border border-gray-200 dark:border-gray-700 text-base font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 shadow-sm hover:shadow w-full sm:w-auto"
          >
            <FiHelpCircle className="mr-2" />
            View Documentation
          </Link>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <button 
          onClick={() => window.history.back()}
          className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 font-medium"
        >
          <FiArrowLeft className="mr-2" />
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;