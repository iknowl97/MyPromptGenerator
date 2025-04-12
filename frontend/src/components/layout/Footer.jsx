import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/model-status" className="text-base text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                  Model Status
                </Link>
              </li>
              <li>
                <Link to="/docs" className="text-base text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/docs/api" className="text-base text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                  API Reference
                </Link>
              </li>
            </ul>
          </div>

          {/* User Types */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">User Guides</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/generate?userType=casual" className="text-base text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                  Casual AI Users
                </Link>
              </li>
              <li>
                <Link to="/generate?userType=content" className="text-base text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                  Content Creators
                </Link>
              </li>
              <li>
                <Link to="/generate?userType=agent" className="text-base text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                  AI Agent Developers
                </Link>
              </li>
            </ul>
          </div>

          {/* Coming Soon */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Coming Soon</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <span className="text-base text-gray-600 dark:text-gray-400">
                  AI News Digest
                </span>
              </li>
              <li>
                <span className="text-base text-gray-600 dark:text-gray-400">
                  Community Templates
                </span>
              </li>
              <li>
                <span className="text-base text-gray-600 dark:text-gray-400">
                  Advanced n8n Integration
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-base text-gray-500 dark:text-gray-400">
            &copy; {currentYear} PromptGen Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;