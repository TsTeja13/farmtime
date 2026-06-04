import React, { useState, useEffect } from 'react';
import { 
  Sprout, 
  CloudSun, 
  Bot, 
  TrendingUp, 
  FileText, 
  Activity, 
  ArrowRight, 
  Calendar,
  AlertTriangle,
  Award,
  BookOpen
} from 'lucide-react';

export default function Dashboard({ setActiveTab, weatherData }) {
  const [greeting, setGreeting] = useState('');
  const [currentTip, setCurrentTip] = useState('');

  const tips = [
    "Sprinkling diluted sour buttermilk acts as an effective anti-fungal agent on vegetable leaves.",
    "Applying Jeevamrutha every 14 days increases soil microbial activity by up to 300%.",
    "Crop rotation with legumes (beans, peas) naturally restores nitrogen in the soil.",
    "Intercropping tomato with marigold reduces root-knot nematodes and insect pests.",
    "Water plants early in the morning to prevent evaporation and leaf fungal development."
  ];

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setGreeting('Good Morning, Farmer!');
    else if (hours < 18) setGreeting('Good Afternoon, Farmer!');
    else setGreeting('Good Evening, Farmer!');

    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setCurrentTip(randomTip);
  }, []);

  return (
    <div className="fade-in">
      {/* Welcome Banner */}
      <div className="banner-card mb-6">
        <div className="banner-content">
          <span className="badge badge-accent mb-2">
            <Award className="icon-xs" /> Certified Agro-Companion App
          </span>
          <h1 className="h1 text-white mb-2">{greeting}</h1>
          <p className="text-muted-white mb-4">
            Welcome back to Farmtime. Your fields are looking promising today. Let's inspect, learn, and grow sustainably.
          </p>
          <div className="banner-buttons">
            <button className="btn btn-primary" onClick={() => setActiveTab('scanner')}>
              <Sprout className="btn-icon" /> Scan Leaf for Disease
            </button>
            <button className="btn btn-secondary-white" onClick={() => setActiveTab('chatbot')}>
              <Bot className="btn-icon" /> Ask Krishi Mitra
            </button>
          </div>
        </div>
        <div className="banner-illustration">
          {/* Animated SVG illustration of a growing plant */}
          <svg viewBox="0 0 100 100" className="animated-plant-svg">
            <path d="M50,90 C50,60 40,40 50,20 C60,40 50,60 50,90 Z" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
            <path d="M50,55 Q65,45 60,35 Q50,45 50,55" fill="var(--color-primary-light)" opacity="0.8" />
            <path d="M50,40 Q35,30 40,20 Q50,30 50,40" fill="var(--color-accent-light)" opacity="0.8" />
            <circle cx="50" cy="20" r="3" fill="var(--color-warning)" className="pulse-dot" />
          </svg>
        </div>
      </div>

      {/* Grid of Key Actions & Metrics */}
      <div className="grid grid-3 mb-6">
        {/* Weather Quick Widget */}
        <div className="glass-card flex-col flex-between p-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-secondary uppercase font-semibold tracking-wider">Current Weather</p>
              <h3 className="h2 mt-1">{weatherData.temp}°C</h3>
              <p className="text-sm text-muted mt-1">{weatherData.desc} • Humidity: {weatherData.humidity}%</p>
            </div>
            <div className="icon-wrapper bg-primary-10">
              <CloudSun className="text-primary icon-md" />
            </div>
          </div>
          <div className="border-t pt-3 mt-2 flex justify-between items-center text-xs text-primary font-medium cursor-pointer hover:underline" onClick={() => setActiveTab('weather')}>
            <span>View Sowing Calendar</span>
            <ArrowRight className="icon-xs" />
          </div>
        </div>

        {/* AI Health Index */}
        <div className="glass-card flex-col flex-between p-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-secondary uppercase font-semibold tracking-wider">Field Health Status</p>
              <h3 className="h2 mt-1 text-success">Good</h3>
              <p className="text-sm text-muted mt-1">Based on recent scanner submissions & local parameters.</p>
            </div>
            <div className="icon-wrapper bg-success-10">
              <Activity className="text-success icon-md" />
            </div>
          </div>
          <div className="border-t pt-3 mt-2 flex justify-between items-center text-xs text-success font-medium cursor-pointer hover:underline" onClick={() => setActiveTab('soil')}>
            <span>Assess Soil NPK levels</span>
            <ArrowRight className="icon-xs" />
          </div>
        </div>

        {/* Mandi Prices Summary */}
        <div className="glass-card flex-col flex-between p-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-secondary uppercase font-semibold tracking-wider">Mandi Price Index</p>
              <h3 className="h2 mt-1 text-warning">+4.2%</h3>
              <p className="text-sm text-muted mt-1">Spike in Organic Rice and Tomato market rates today.</p>
            </div>
            <div className="icon-wrapper bg-warning-10">
              <TrendingUp className="text-warning icon-md" />
            </div>
          </div>
          <div className="border-t pt-3 mt-2 flex justify-between items-center text-xs text-warning font-medium cursor-pointer hover:underline" onClick={() => setActiveTab('mandi')}>
            <span>Check Crop Mandi Rates</span>
            <ArrowRight className="icon-xs" />
          </div>
        </div>
      </div>

      <div className="grid grid-2-1">
        {/* Dynamic Ag Ticker / Officer Recommendations */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4 border-b pb-3">
            <Sprout className="text-primary icon-md" />
            <h2 className="h3">Agriculture Officer's Advisories</h2>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="alert alert-warning flex gap-3 p-4">
              <AlertTriangle className="text-warning icon-sm shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-warning-deep text-sm mb-1">Pre-Monsoon Disease Warning (Tomato / Potato)</h4>
                <p className="text-xs text-muted-dark">
                  High relative humidity (85%+) predicted for the next 3 days. There is a high alert for **Late Blight**. Farmers are advised to spray diluted Neem Oil (5ml/L) or Sour Buttermilk formulation as a preventive measure.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 hover-bg rounded-lg transition">
              <span className="badge badge-primary mt-1">Tips</span>
              <div>
                <h4 className="font-semibold text-sm mb-1">Zero Budget Natural Farming (ZBNF) Activation</h4>
                <p className="text-xs text-muted">
                  Apply Jeevamrutha during watering cycles this week. It increases earthworm activation and enriches the soil rhizosphere.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 hover-bg rounded-lg transition">
              <span className="badge badge-success mt-1">Market</span>
              <div>
                <h4 className="font-semibold text-sm mb-1">Organic Cotton Rates Skyrocket</h4>
                <p className="text-xs text-muted">
                  Demand for certified organic long-staple cotton has risen. Consider planning crop cover sequences to keep soil fertile for next rotation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel: Daily Task & Natural Recipe Quote */}
        <div className="flex-col gap-6">
          {/* Daily Quick Fact / Tip */}
          <div className="glass-card bg-primary-dark text-white p-6 relative overflow-hidden">
            <div className="absolute right-[-20px] bottom-[-20px] opacity-10 text-white">
              <BookOpen size={120} />
            </div>
            <h3 className="h4 mb-3 text-primary-light flex items-center gap-2">
              <BookOpen className="icon-sm" /> Smart Farming Tip
            </h3>
            <p className="text-sm italic leading-relaxed mb-4">
              "{currentTip}"
            </p>
            <button className="btn btn-secondary-white btn-sm" onClick={() => setActiveTab('tips')}>
              Explore Natural Farming
            </button>
          </div>

          {/* Quick Stats Widget */}
          <div className="glass-card p-6">
            <h3 className="h4 mb-4 flex items-center gap-2">
              <Calendar className="text-primary icon-sm" /> Upcoming Sowing Recommendations
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-sm border-b pb-2">
                <span className="font-medium">Tomato (Kharif)</span>
                <span className="badge badge-success">Optimal Sowing</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b pb-2">
                <span className="font-medium">Chilli (Kharif)</span>
                <span className="badge badge-success">Optimal Sowing</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b pb-2">
                <span className="font-medium">Wheat (Rabi)</span>
                <span className="text-xs text-muted">Prepare fields (Oct)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
