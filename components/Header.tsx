import React from 'react';
import type { Tab, User } from '../types';

interface HeaderProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

const FootballIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.05 7.95l1.414-1.414a.5.5 0 01.707 0l1.414 1.414a.5.5 0 010 .707l-1.414 1.414a.5.5 0 01-.707 0L9.05 8.657a.5.5 0 010-.707zM6.222 9.364l1.414-1.414a.5.5 0 01.707 0l1.414 1.414a.5.5 0 010 .707l-1.414 1.414a.5.5 0 01-.707 0L6.222 10.07a.5.5 0 010-.707zM9.05 12.192l1.414-1.414a.5.5 0 01.707 0l1.414 1.414a.5.5 0 010 .707l-1.414 1.414a.5.5 0 01-.707 0l-1.414-1.414a.5.5 0 010-.707zM12.879 9.364l1.414-1.414a.5.5 0 01.707 0l1.414 1.414a.5.5 0 010 .707l-1.414 1.414a.5.5 0 01-.707 0l-1.414-1.414a.5.5 0 010-.707zM6.222 13.606l1.414-1.414a.5.5 0 01.707 0l1.414 1.414a.5.5 0 010 .707l-1.414 1.414a.5.5 0 01-.707 0l-1.414-1.414a.5.5 0 010-.707zM4.808 10.778l1.414-1.414a.5.5 0 01.707 0l1.414 1.414a.5.5 0 010 .707l-1.414 1.414a.5.5 0 01-.707 0l-1.414-1.414a.5.5 0 010-.707z"/>
    </svg>
);


export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, user, onLoginClick, onLogout }) => {
  const navItems: { id: Tab, label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'groups', label: 'Groups' },
    { id: 'stadiums', label: 'Stadiums' },
  ];

  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
             <FootballIcon />
            <h1 className="text-xl font-bold tracking-tight text-white">WC 2026 Tracker</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-green-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-300 hidden sm:block">Welcome, {user.username}</span>
                <button
                  onClick={onLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="px-3 py-2 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors"
              >
                Login to Predict
              </button>
            )}
          </div>
        </div>
         <nav className="md:hidden flex items-center justify-around py-2 border-t border-gray-700">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium flex-1 text-center ${
                  activeTab === item.id
                    ? 'bg-green-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
      </div>
    </header>
  );
};
