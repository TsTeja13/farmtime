import React, { useState, useEffect } from 'react';
import { 
  Sprout, 
  Camera, 
  Bot, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  Activity,
  Sun,
  Moon,
  Bell,
  Menu,
  X,
  User,
  Heart
} from 'lucide-react';

import Dashboard from './components/Dashboard';
import Scanner from './components/Scanner';
import Chatbot from './components/Chatbot';
import FarmingTips from './components/FarmingTips';
import WeatherCalendar from './components/WeatherCalendar';
import MandiPrices from './components/MandiPrices';
import SoilHealth from './components/SoilHealth';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Simulated agricultural weather sensor values
  const [weatherData, setWeatherData] = useState({
    temp: 29,
    humidity: 78,
    wind: 12,
    desc: 'Partly Cloudy'
  });

  // Handle Theme Toggle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  // Weather simulator (simulating slow sensor fluctuations)
  useEffect(() => {
    const interval = setInterval(() => {
      setWeatherData(prev => {
        const tempShift = Math.random() > 0.5 ? 1 : -1;
        const humShift = Math.random() > 0.5 ? 2 : -2;
        const newTemp = Math.min(Math.max(prev.temp + tempShift, 24), 36);
        const newHum = Math.min(Math.max(prev.humidity + humShift, 60), 95);
        return {
          ...prev,
          temp: newTemp,
          humidity: newHum,
          wind: Math.min(Math.max(prev.wind + (Math.random() > 0.5 ? 1 : -1), 5), 25)
        };
      });
    }, 15000); // update every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} weatherData={weatherData} />;
      case 'scanner':
        return <Scanner />;
      case 'chatbot':
        return <Chatbot />;
      case 'tips':
        return <FarmingTips />;
      case 'weather':
        return <WeatherCalendar weatherData={weatherData} />;
      case 'mandi':
        return <MandiPrices />;
      case 'soil':
        return <SoilHealth />;
      default:
        return <Dashboard setActiveTab={setActiveTab} weatherData={weatherData} />;
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Sprout },
    { id: 'scanner', label: 'Disease Scanner', icon: Camera },
    { id: 'chatbot', label: 'Krishi Mitra AI', icon: Bot },
    { id: 'tips', label: 'Natural Farming', icon: BookOpen },
    { id: 'weather', label: 'Sowing Calendar', icon: Calendar },
    { id: 'mandi', label: 'Mandi Rates', icon: TrendingUp },
    { id: 'soil', label: 'Soil Health', icon: Activity }
  ];

  return (
    <div className="app-container">
      {/* Sidebar Navigation (Desktop) */}
      <aside className={`sidebar ${mobileMenuOpen ? 'flex' : ''}`}>
        <div>
          <div className="sidebar-logo">
            <Sprout className="logo-icon" />
            <span className="logo-text">Farmtime</span>
          </div>

          <nav className="nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                >
                  <Icon className="nav-icon" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="border-t pt-4 mt-6 flex-col gap-1 text-[10px] text-muted sidebar-footer-text">
          <p className="flex items-center gap-1">Made with <Heart className="icon-xs text-danger fill-danger" /> for Farmers</p>
          <p>© 2026 Farmtime Corp.</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="content-wrapper">
        <header className="header">
          <div className="flex items-center gap-3">
            <button 
              className="btn btn-outline btn-sm md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="icon-sm" /> : <Menu className="icon-sm" />}
            </button>
            <h2 className="header-title capitalize text-primary font-bold">
              {navItems.find(item => item.id === activeTab)?.label}
            </h2>
          </div>

          <div className="header-actions">
            {/* Theme Toggle */}
            <button 
              className="btn btn-outline btn-sm p-2 rounded-full"
              onClick={toggleDarkMode}
              title="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="icon-xs text-warning" /> : <Moon className="icon-xs text-muted" />}
            </button>

            {/* Notification Badge */}
            <div className="relative cursor-pointer hover:opacity-85" title="Notifications">
              <span className="absolute top-0 right-0 w-2 h-2 bg-danger rounded-full pulse-dot" />
              <Bell className="text-muted icon-sm" />
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-2 border-l pl-3 ml-2">
              <div className="icon-wrapper bg-primary-10 text-primary h-8 w-8 rounded-full">
                <User className="icon-xs" />
              </div>
              <div className="hidden lg:flex flex-col text-[11px]">
                <span className="font-semibold text-secondary-deep">Teja S.</span>
                <span className="text-muted text-[10px]">Agro-Developer</span>
              </div>
            </div>
          </div>
        </header>

        <main className="main-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
