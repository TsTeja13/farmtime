import React, { useState } from 'react';
import { 
  CloudSun, 
  Wind, 
  Droplets, 
  Sun, 
  Thermometer, 
  Calendar, 
  Search,
  Filter,
  CheckCircle,
  AlertTriangle,
  FileText
} from 'lucide-react';

const SOWING_DATA = [
  { crop: 'Rice (Paddy)', season: 'Kharif', temp: '22-32°C', rainfall: 'High', months: 'June - July', duration: '120-150 Days', details: 'Sow seeds in nursery, transplant 25-day seedlings to puddled clay soil. Keep water levels high.' },
  { crop: 'Tomato', season: 'Kharif / Rabi', temp: '18-28°C', rainfall: 'Moderate', months: 'June / October', duration: '90-110 Days', details: 'Transplant seedlings. Susceptible to frost. Provide stakes and prune lower leaves.' },
  { crop: 'Cotton', season: 'Kharif', temp: '21-30°C', rainfall: 'Moderate', months: 'May - June', duration: '160-180 Days', details: 'Requires well-drained deep black cotton soil. Sensitive to waterlogging.' },
  { crop: 'Maize (Corn)', season: 'Kharif / Rabi', temp: '20-27°C', rainfall: 'Moderate', months: 'June - July / Oct', duration: '95-115 Days', details: 'Sow directly in ridges. High nitrogen feeder. Rotate with legumes.' },
  { crop: 'Chilli', season: 'Kharif', temp: '20-30°C', rainfall: 'Moderate', months: 'June - July', duration: '120-140 Days', details: 'Sow in well-drained sandy loam. Protect seedlings from dumping-off disease.' },
  { crop: 'Wheat', season: 'Rabi', temp: '15-22°C', rainfall: 'Low', months: 'November - December', duration: '110-130 Days', details: 'Requires cool weather during growth and warm sunny days for ripening. Sow in rows.' },
  { crop: 'Potato', season: 'Rabi', temp: '15-20°C', rainfall: 'Low', months: 'October - November', duration: '90-120 Days', details: 'Plant seed tubers in ridges. Earth up soil twice during vegetative stage. Susceptible to blights.' },
  { crop: 'Mustard', season: 'Rabi', temp: '10-25°C', rainfall: 'Low', months: 'October - November', duration: '100-115 Days', details: 'Low water requirement. Grown as companion or intercrop with wheat.' },
  { crop: 'Chickpea (Chana)', season: 'Rabi', temp: '15-25°C', rainfall: 'Low', months: 'October - November', duration: '110-125 Days', details: 'Legume crop. Fixes nitrogen. Requires no synthetic nitrogen fertilizer.' },
  { crop: 'Watermelon', season: 'Zaid', temp: '25-35°C', rainfall: 'Dry/Irrigated', months: 'February - March', duration: '85-100 Days', details: 'Thrives in sandy riverbeds. Requires dry weather and warm nights for sugar accumulation.' },
  { crop: 'Cucumber', season: 'Zaid', temp: '22-32°C', rainfall: 'Irrigated', months: 'February - March', duration: '60-85 Days', details: 'Requires frequent light watering and rich organic compost in soil. Harvest young.' }
];

export default function WeatherCalendar({ weatherData }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('all');

  const filteredCrops = SOWING_DATA.filter(crop => {
    const matchesSearch = crop.crop.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeason = selectedSeason === 'all' || crop.season.toLowerCase().includes(selectedSeason.toLowerCase());
    return matchesSearch && matchesSeason;
  });

  return (
    <div className="fade-in max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="icon-wrapper bg-primary-10">
          <Calendar className="text-primary icon-md" />
        </div>
        <div>
          <h1 className="h1">Weather & Sowing Calendar</h1>
          <p className="text-sm text-muted">Real-time agricultural weather indicators and seasonal sowing schedules tailored for Indian farming zones.</p>
        </div>
      </div>

      <div className="grid grid-3 mb-6">
        {/* Weather Parameter Cards */}
        <div className="glass-card p-4 flex items-center gap-3">
          <div className="icon-wrapper bg-primary-10 text-primary">
            <Thermometer className="icon-sm" />
          </div>
          <div>
            <span className="text-[10px] text-muted uppercase tracking-wider block font-semibold">Temperature & Status</span>
            <span className="font-semibold text-sm">{weatherData.temp}°C - {weatherData.desc}</span>
          </div>
        </div>

        <div className="glass-card p-4 flex items-center gap-3">
          <div className="icon-wrapper bg-info-10 text-info">
            <Droplets className="icon-sm" />
          </div>
          <div>
            <span className="text-[10px] text-muted uppercase tracking-wider block font-semibold">Relative Humidity</span>
            <span className="font-semibold text-sm">{weatherData.humidity}% (Moisture High)</span>
          </div>
        </div>

        <div className="glass-card p-4 flex items-center gap-3">
          <div className="icon-wrapper bg-warning-10 text-warning">
            <Wind className="icon-sm" />
          </div>
          <div>
            <span className="text-[10px] text-muted uppercase tracking-wider block font-semibold">Wind Speed</span>
            <span className="font-semibold text-sm">{weatherData.wind} km/h (North-East)</span>
          </div>
        </div>
      </div>

      {/* Dynamic Weather Advisory Warning */}
      <div className="alert alert-info flex gap-3 p-4 mb-6">
        <AlertTriangle className="text-info icon-sm shrink-0 mt-0.5" />
        <div className="text-xs">
          <h4 className="font-semibold text-info-deep mb-1">Live Agro-Weather Advisory</h4>
          <p className="text-muted-dark leading-relaxed">
            With humidity at **{weatherData.humidity}%** and temperatures around **{weatherData.temp}°C**, the atmospheric conditions are **highly conducive to leaf fungal development** (like powdery mildew and early blight). Avoid nitrogenous top dressing today. Plan preventive spraying of diluted **Sour Buttermilk** or **Neemastra** tomorrow morning.
          </p>
        </div>
      </div>

      {/* Sowing Calendar Dashboard */}
      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b pb-4">
          <h3 className="h3">Sowing Schedule Index</h3>
          
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-60">
              <Search className="absolute left-3 top-2.5 text-muted icon-xs" />
              <input 
                type="text" 
                placeholder="Search crops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-8 py-1-5 text-xs w-full"
              />
            </div>
            
            {/* Filter Buttons */}
            <div className="flex gap-1.5">
              {['all', 'Kharif', 'Rabi', 'Zaid'].map((season) => (
                <button
                  key={season}
                  onClick={() => setSelectedSeason(season)}
                  className={`btn btn-xs ${selectedSeason === season ? 'btn-primary' : 'btn-outline'}`}
                >
                  {season}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Crops List */}
        <div className="flex flex-col gap-4">
          {filteredCrops.length > 0 ? (
            filteredCrops.map((crop, idx) => (
              <div key={idx} className="p-4 bg-glass border rounded-xl hover-bg transition flex-col md:flex-row gap-4 justify-between">
                <div className="flex-1 flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-secondary-deep text-sm">{crop.crop}</h4>
                    <span className={`badge ${
                      crop.season === 'Kharif' ? 'badge-primary' :
                      crop.season === 'Rabi' ? 'badge-success' : 'badge-warning'
                    }`}>
                      {crop.season} Season
                    </span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">{crop.details}</p>
                </div>

                <div className="grid grid-3 gap-4 border-t md:border-t-0 md:border-l pt-3 md:pt-0 md:pl-4 min-w-[280px] text-xs text-muted">
                  <div>
                    <span className="block text-[10px] text-muted-dark uppercase font-semibold">Optimal Sowing</span>
                    <span className="font-medium text-secondary">{crop.months}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-muted-dark uppercase font-semibold">Temp / Rain</span>
                    <span className="font-medium text-secondary">{crop.temp} / {crop.rainfall}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-muted-dark uppercase font-semibold">Duration</span>
                    <span className="font-medium text-secondary">{crop.duration}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-6 text-muted text-xs">
              No crops match your search settings.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
