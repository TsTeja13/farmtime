import React, { useState } from 'react';
import { 
  Activity, 
  Leaf, 
  CheckCircle, 
  AlertTriangle,
  Droplet,
  Info,
  BookOpen,
  Clipboard
} from 'lucide-react';

export default function SoilHealth() {
  const [nVal, setNVal] = useState('110');
  const [pVal, setPVal] = useState('12');
  const [kVal, setKVal] = useState('160');
  const [phVal, setPhVal] = useState('6.5');
  const [result, setResult] = useState(null);

  const calculateRemedies = (e) => {
    e.preventDefault();
    
    const n = parseFloat(nVal);
    const p = parseFloat(pVal);
    const k = parseFloat(kVal);
    const ph = parseFloat(phVal);

    if (isNaN(n) || isNaN(p) || isNaN(k) || isNaN(ph)) return;

    let phStatus = 'Optimal';
    let phRemedy = '';
    if (ph < 6.0) {
      phStatus = 'Acidic';
      phRemedy = 'Apply **Agricultural Lime** (calcium carbonate) or **Wood Ash** (approx 10-15 kg per 100 sq ft) to raise the soil pH. Mix well into topsoil.';
    } else if (ph > 7.5) {
      phStatus = 'Alkaline';
      phRemedy = 'Apply **Elemental Sulfur** or **Agricultural Gypsum** (approx 5-8 kg per 100 sq ft), or incorporate abundant acidic **compost/peat moss** to reduce pH levels.';
    } else {
      phRemedy = 'Soil pH is in the sweet spot (6.0 - 7.5) for optimal nutrient absorption. No amendments needed.';
    }

    let nStatus = 'Optimal';
    let nRemedy = '';
    if (n < 120) {
      nStatus = 'Deficient (Low)';
      nRemedy = 'Incorporate organic **Vermicompost** or **Blood Meal**. Spray **Jeevamrutha** (200L/acre) near root zones. Plan a cover cropping cycle with nitrogen-fixing **Sunn hemp** or **clover** next season.';
    } else if (n > 250) {
      nStatus = 'Excessive (High)';
      nRemedy = 'Excess Nitrogen promotes excessive leaf growth but delays fruiting/flowering. Suspend all nitrogenous organic manure. Mulch with high-carbon materials like straw or sawdust to absorb nitrogen.';
    } else {
      nRemedy = 'Nitrogen levels are optimal. Maintain by applying compost twice a year.';
    }

    let pStatus = 'Optimal';
    let pRemedy = '';
    if (p < 15) {
      pStatus = 'Deficient (Low)';
      pRemedy = 'Incorporate **Bone Meal** or **Rock Phosphate** directly into root zones during bed preparation. You can also mix in crushed **Banana peels** which release trace phosphorus.';
    } else if (p > 35) {
      pStatus = 'Excessive (High)';
      pRemedy = 'Phosphorus is high. Avoid bone meal or commercial manures. Maintain general organic compost.';
    } else {
      pRemedy = 'Phosphorus levels are optimal. Good for root development.';
    }

    let kStatus = 'Optimal';
    let kRemedy = '';
    if (k < 120) {
      kStatus = 'Deficient (Low)';
      kRemedy = 'Add organic **Greensand**, **Kelp Meal**, or sprinkle small amounts of **Wood Ash** (which is rich in potash, but use sparingly as it raises pH). Composted banana peels are also high in potassium.';
    } else if (k > 280) {
      kStatus = 'Excessive (High)';
      kRemedy = 'Potassium is high. Restrict wood ash or kelp additions. Water normally to leach excess salts.';
    } else {
      kRemedy = 'Potassium levels are optimal. Good for crop disease resistance and starch transfer.';
    }

    setResult({
      phStatus,
      phRemedy,
      nStatus,
      nRemedy,
      pStatus,
      pRemedy,
      kStatus,
      kRemedy
    });
  };

  return (
    <div className="fade-in max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="icon-wrapper bg-primary-10">
          <Activity className="text-primary icon-md" />
        </div>
        <div>
          <h1 className="h1">Soil Health Analyzer</h1>
          <p className="text-sm text-muted">Enter NPK values (kg/acre) and pH from your soil test report to generate tailored organic replenishment solutions.</p>
        </div>
      </div>

      <div className="grid grid-2-1">
        {/* NPK Form */}
        <div className="glass-card p-5">
          <h3 className="h3 mb-4 border-b pb-3">Soil Test Value Inputs</h3>
          
          <form onSubmit={calculateRemedies} className="flex-col gap-4">
            <div className="grid grid-3 gap-3">
              <div>
                <label className="text-[10px] text-secondary font-semibold uppercase tracking-wider block mb-1">Nitrogen (N) (kg/acre)</label>
                <input 
                  type="number" 
                  value={nVal}
                  onChange={(e) => setNVal(e.target.value)}
                  className="form-input text-xs w-full"
                  placeholder="e.g. 110"
                  required
                />
                <span className="text-[9px] text-muted mt-1 block">Optimal: 120 - 250</span>
              </div>
              <div>
                <label className="text-[10px] text-secondary font-semibold uppercase tracking-wider block mb-1">Phosphorus (P) (kg/acre)</label>
                <input 
                  type="number" 
                  value={pVal}
                  onChange={(e) => setPVal(e.target.value)}
                  className="form-input text-xs w-full"
                  placeholder="e.g. 15"
                  required
                />
                <span className="text-[9px] text-muted mt-1 block">Optimal: 15 - 35</span>
              </div>
              <div>
                <label className="text-[10px] text-secondary font-semibold uppercase tracking-wider block mb-1">Potassium (K) (kg/acre)</label>
                <input 
                  type="number" 
                  value={kVal}
                  onChange={(e) => setKVal(e.target.value)}
                  className="form-input text-xs w-full"
                  placeholder="e.g. 160"
                  required
                />
                <span className="text-[9px] text-muted mt-1 block">Optimal: 120 - 280</span>
              </div>
            </div>

            <div>
              <label className="text-[10px] text-secondary font-semibold uppercase tracking-wider block mb-1">Soil pH Level</label>
              <input 
                type="number" 
                step="any"
                value={phVal}
                onChange={(e) => setPhVal(e.target.value)}
                className="form-input text-xs w-full"
                placeholder="e.g. 6.5"
                required
              />
              <span className="text-[9px] text-muted mt-1 block">Optimal: 6.0 - 7.5 (Slightly Acidic to Neutral)</span>
            </div>

            <button type="submit" className="btn btn-primary btn-sm mt-1 w-full">
              <Clipboard className="btn-icon" /> Calculate Remedies
            </button>
          </form>
        </div>

        {/* Results Panel */}
        <div className="flex-col gap-6">
          {!result && (
            <div className="glass-card p-5 text-center flex-col items-center justify-center min-h-[250px] text-muted">
              <BookOpen className="icon-lg text-muted mb-3" />
              <h4 className="font-semibold text-secondary mb-1">Awaiting Soil Analysis</h4>
              <p className="text-xs max-w-[200px] mx-auto mt-1">Input values from your latest soil card report and click calculate to check NPK health.</p>
            </div>
          )}

          {result && (
            <div className="glass-card p-5 fade-in flex-col gap-4">
              <h3 className="h4 flex items-center gap-2 border-b pb-2">
                <Leaf className="text-primary icon-sm" /> Soil Nutrient Diagnosis
              </h3>

              {/* pH status */}
              <div className="flex-col gap-1.5 border-b pb-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold">Soil pH Condition:</span>
                  <span className={`badge ${result.phStatus === 'Optimal' ? 'badge-success' : 'badge-warning'}`}>
                    {result.phStatus} ({phVal})
                  </span>
                </div>
                <p className="text-[11px] text-muted leading-relaxed">{result.phRemedy}</p>
              </div>

              {/* N status */}
              <div className="flex-col gap-1.5 border-b pb-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold">Nitrogen (N):</span>
                  <span className={`badge ${result.nStatus === 'Optimal' ? 'badge-success' : 'badge-danger'}`}>
                    {result.nStatus}
                  </span>
                </div>
                <p className="text-[11px] text-muted leading-relaxed">{result.nRemedy}</p>
              </div>

              {/* P status */}
              <div className="flex-col gap-1.5 border-b pb-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold">Phosphorus (P):</span>
                  <span className={`badge ${result.pStatus === 'Optimal' ? 'badge-success' : 'badge-danger'}`}>
                    {result.pStatus}
                  </span>
                </div>
                <p className="text-[11px] text-muted leading-relaxed">{result.pRemedy}</p>
              </div>

              {/* K status */}
              <div className="flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold">Potassium (K):</span>
                  <span className={`badge ${result.kStatus === 'Optimal' ? 'badge-success' : 'badge-danger'}`}>
                    {result.kStatus}
                  </span>
                </div>
                <p className="text-[11px] text-muted leading-relaxed">{result.kRemedy}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
