import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Calculator, 
  DollarSign, 
  Coins,
  ArrowUpRight,
  Info
} from 'lucide-react';

const COMMODITIES = [
  { id: 'rice_basmati', name: 'Rice (Basmati)', price: 6200, change: 1.8, trend: 'up', min: 5900, max: 6400, unit: 'Quintal (100kg)', advice: 'High demand in export market. Hold inventory for another week if storage is dry.' },
  { id: 'wheat', name: 'Wheat (Sharbati)', price: 2450, change: -0.5, trend: 'down', min: 2400, max: 2550, unit: 'Quintal (100kg)', advice: 'Fresh arrivals from harvesting season driving prices down slightly. Sell surplus now.' },
  { id: 'tomato', name: 'Tomato (Local)', price: 1800, change: 8.4, trend: 'up', min: 1400, max: 2100, unit: 'Quintal (100kg)', advice: 'Pre-monsoon supply crunch. Prices expected to climb further over the next 4 days.' },
  { id: 'potato', name: 'Potato (Jyoti)', price: 1250, change: 0.2, trend: 'up', min: 1200, max: 1300, unit: 'Quintal (100kg)', advice: 'Stable supplies from cold storages. Average demand. Sell as per immediate cash requirements.' },
  { id: 'onion', name: 'Red Onion', price: 2100, change: -2.3, trend: 'down', min: 1950, max: 2300, unit: 'Quintal (100kg)', advice: 'High arrivals in Nasik Mandi. Prices stabilizing. Hold if quality is fit for storage.' },
  { id: 'cotton', name: 'Cotton (Long Staple)', price: 7800, change: 4.1, trend: 'up', min: 7400, max: 8100, unit: 'Quintal (100kg)', advice: 'Strong global textile demands. Organic cotton fetches 15% premium. Excellent price to sell.' },
  { id: 'chilli', name: 'Red Chilli (Guntur)', price: 18500, change: 1.2, trend: 'up', min: 17800, max: 19200, unit: 'Quintal (100kg)', advice: 'Dry stocks are limited. High export value. Sell in batches to capitalize on peak rates.' }
];

export default function MandiPrices() {
  const [searchTerm, setSearchTerm] = useState('');
  const [calcCrop, setCalcCrop] = useState('rice_basmati');
  const [calcQuantity, setCalcQuantity] = useState('');
  const [calcResult, setCalcResult] = useState(null);

  const filteredCommodities = COMMODITIES.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateHarvestValue = (e) => {
    e.preventDefault();
    const qty = parseFloat(calcQuantity);
    if (isNaN(qty) || qty <= 0) return;

    const cropObj = COMMODITIES.find(c => c.id === calcCrop);
    if (!cropObj) return;

    const gross = qty * cropObj.price;
    const minEst = qty * cropObj.min;
    const maxEst = qty * cropObj.max;

    setCalcResult({
      name: cropObj.name,
      gross,
      minEst,
      maxEst,
      price: cropObj.price,
      advice: cropObj.advice
    });
  };

  return (
    <div className="fade-in max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="icon-wrapper bg-primary-10">
          <TrendingUp className="text-primary icon-md" />
        </div>
        <div>
          <h1 className="h1">Commodity Mandi Prices</h1>
          <p className="text-sm text-muted">Track simulated agricultural market commodity prices and estimate your harvest revenues.</p>
        </div>
      </div>

      <div className="grid grid-2-1">
        {/* Mandi Rates Table */}
        <div className="glass-card p-5">
          <div className="flex justify-between items-center mb-4 border-b pb-3">
            <h3 className="h3">Regional APMC Mandi Rates</h3>
            
            <div className="relative">
              <Search className="absolute left-2.5 top-2 text-muted icon-xs" />
              <input 
                type="text" 
                placeholder="Search commodity..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-7 py-1 text-xs w-44"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b text-muted uppercase tracking-wider font-semibold text-[10px]">
                  <th className="py-2.5">Commodity</th>
                  <th className="py-2.5">Price / Quintal</th>
                  <th className="py-2.5">Change</th>
                  <th className="py-2.5">Range (Min - Max)</th>
                </tr>
              </thead>
              <tbody>
                {filteredCommodities.length > 0 ? (
                  filteredCommodities.map((crop) => (
                    <tr key={crop.id} className="border-b hover-bg transition">
                      <td className="py-3 font-semibold text-secondary-deep">{crop.name}</td>
                      <td className="py-3 font-medium">₹{crop.price.toLocaleString()}</td>
                      <td className={`py-3 flex items-center gap-1 font-semibold ${
                        crop.trend === 'up' ? 'text-success' : 'text-danger'
                      }`}>
                        {crop.trend === 'up' ? <TrendingUp className="icon-xs" /> : <TrendingDown className="icon-xs" />}
                        {crop.trend === 'up' ? '+' : ''}{crop.change}%
                      </td>
                      <td className="py-3 text-muted">₹{crop.min.toLocaleString()} - ₹{crop.max.toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-4 text-center text-muted">No commodities matched search criteria.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Harvest Calculator & Selling Advice */}
        <div className="flex-col gap-6">
          <div className="glass-card p-5">
            <h3 className="h4 mb-4 flex items-center gap-2 border-b pb-2">
              <Calculator className="text-primary icon-sm" /> Harvest Revenue Estimator
            </h3>
            
            <form onSubmit={calculateHarvestValue} className="flex-col gap-3">
              <div>
                <label className="text-[10px] text-secondary font-semibold uppercase tracking-wider block mb-1">Select Crop</label>
                <select 
                  value={calcCrop}
                  onChange={(e) => setCalcCrop(e.target.value)}
                  className="form-input text-xs w-full py-2 bg-glass"
                >
                  {COMMODITIES.map(c => (
                    <option key={c.id} value={c.id}>{c.name} (₹{c.price}/Quintal)</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] text-secondary font-semibold uppercase tracking-wider block mb-1">Quantity in Quintals (1 Q = 100 kg)</label>
                <input 
                  type="number" 
                  step="any"
                  placeholder="e.g. 15.5"
                  value={calcQuantity}
                  onChange={(e) => setCalcQuantity(e.target.value)}
                  className="form-input text-xs w-full"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-sm mt-1 w-full">
                <Coins className="btn-icon" /> Calculate Earnings
              </button>
            </form>

            {/* Calculations Result */}
            {calcResult && (
              <div className="mt-4 border-t pt-4 flex-col gap-3 fade-in">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted">Estimated Revenue:</span>
                  <span className="font-bold text-success text-sm">₹{calcResult.gross.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
                
                <div className="flex justify-between items-center text-[10px] text-muted border-b pb-2">
                  <span>Price Range Estimate:</span>
                  <span>₹{calcResult.minEst.toLocaleString()} - ₹{calcResult.maxEst.toLocaleString()}</span>
                </div>

                <div className="bg-primary-5 p-3 rounded-lg border-l-3 border-primary text-xs flex gap-2">
                  <Info className="text-primary icon-xs shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-[10px] text-secondary uppercase tracking-wider mb-1">Market Advisor Note</span>
                    <p className="text-[11px] text-muted-dark leading-tight">{calcResult.advice}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="glass-card p-5 text-center flex-col items-center justify-center bg-warning-5 text-warning-deep border-warning-20">
            <Coins className="icon-md mb-2" />
            <h4 className="font-semibold text-xs uppercase tracking-wider">APMC Price Policy Note</h4>
            <p className="text-[10px] text-muted-dark mt-1 leading-relaxed">
              These rates represent average wholesale market prices across regional mandis. Real values may fluctuate based on moisture levels, grain size, and impurity parameters of your crop produce.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
