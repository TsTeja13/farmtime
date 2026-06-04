import React, { useState } from 'react';
import { 
  Sprout, 
  Clock, 
  ShieldCheck, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  Flame,
  Award,
  BookOpen
} from 'lucide-react';

const RECIPES = [
  {
    id: 'jeevamrutha',
    name: 'Jeevamrutha (Microbial Inoculant)',
    tag: 'Soil Fertilizer',
    time: '4-7 Days Fermentation',
    shelf: 'Use within 12 days',
    target: 'Enhances soil microbes, fixes carbon, and activates earthworms.',
    ingredients: [
      '200 Litres Water',
      '10 kg Fresh Local Cow Dung',
      '5-10 Litres Cow Urine',
      '2 kg Organic Jaggery (Crushed)',
      '2 kg Gram Flour (Besan)',
      'A handful of fertile forest soil'
    ],
    steps: [
      'Fill a large 200L plastic drum with water.',
      'Add fresh cow dung and cow urine. Stir well with a wooden pole.',
      'Dissolve jaggery in a bucket of water and add it to the drum.',
      'Mix gram flour in water to make a paste (to avoid lumps) and pour it in.',
      'Add the handful of soil containing native micro-organisms.',
      'Stir the solution in a clockwise direction for 5 minutes.',
      'Cover with a wet gunny bag and keep in deep shade.',
      'Stir twice daily (clockwise) for 5 minutes. Ready in 4-7 days depending on temperature.'
    ],
    application: 'Pour 200 Litres per acre along with irrigation water. Spray directly on wet soil near root zones. Apply twice monthly.'
  },
  {
    id: 'bijamrutha',
    name: 'Bijamrutha (Seed Treatment)',
    tag: 'Fungicidal Seed Coat',
    time: '24 Hours Fermentation',
    shelf: 'Use immediately',
    target: 'Coats seeds to prevent seed-borne and soil-borne fungal diseases.',
    ingredients: [
      '20 Litres Water',
      '5 kg Cow Dung (tied in a cloth)',
      '5 Litres Cow Urine',
      '50 gm Lime (Chuna)',
      'A handful of forest soil'
    ],
    steps: [
      'Hang 5 kg cow dung in a cotton cloth suspended in 20L water for 12 hours.',
      'Squeeze the dung bag thoroughly to extract all soluble ingredients into the water.',
      'Add 5 Litres cow urine, a handful of forest soil, and 50g lime. Mix well.',
      'Let the mixture sit for 24 hours. Stir twice during this period.',
      'Filter with a sieve or cloth. The Bijamrutha is ready.'
    ],
    application: 'Spread seeds on a clean sheet. Sprinkle Bijamrutha over seeds, rub gently with hands to coat them, air dry in shade, and sow immediately.'
  },
  {
    id: 'neemastra',
    name: 'Neemastra (Botanical Pesticide)',
    tag: 'Insect Repellent',
    time: '48 Hours Fermentation',
    shelf: 'Up to 6 Months',
    target: 'Controls whiteflies, thrips, aphids, jassids, and minor sucking pests.',
    ingredients: [
      '100 Litres Water',
      '5 Litres Cow Urine',
      '2 kg Cow Dung',
      '5 kg Neem Leaves (crushed/pounded)'
    ],
    steps: [
      'Pour 100L water into a barrel. Add cow urine and cow dung.',
      'Pound the neem leaves and twigs into a paste. Add it to the mixture.',
      'Stir clockwise using a wooden stick.',
      'Cover with a jute bag and leave under shade for 48 hours.',
      'Stir clockwise twice a day.',
      'Filter using a double-layered cotton cloth.'
    ],
    application: 'Spray undiluted on plants using a knapsack sprayer. Repeat every 10-15 days during high pest alerts.'
  },
  {
    id: 'agniastra',
    name: 'Agniastra (Strong Insecticide)',
    tag: 'Caterpillar Control',
    time: 'Boil & 48hr Cool',
    shelf: 'Up to 3 Months',
    target: 'Controls leaf rollers, stem borers, and large leaf-eating caterpillars.',
    ingredients: [
      '10 Litres Cow Urine',
      '1 kg Crushed Neem Leaves',
      '500 gm Hot Green Chilli Paste',
      '250 gm Crushed Garlic Paste',
      '500 gm Crushed Tobacco Leaves (optional)'
    ],
    steps: [
      'Take 10L cow urine in a clay or copper pot.',
      'Add crushed neem leaves, green chilli paste, garlic, and tobacco.',
      'Stir well and boil the mixture on a slow fire (outdoors). Boil 5 times.',
      'Let the mixture cool down for 48 hours under shade.',
      'Filter using a clean cotton cloth.'
    ],
    application: 'Dilute 2 to 3 Litres of Agniastra in 100 Litres of water. Spray on affected crop foliage. This is a hot formulation; use protective eyewear.'
  }
];

export default function FarmingTips() {
  const [activeRecipe, setActiveRecipe] = useState(null);

  const toggleRecipe = (id) => {
    if (activeRecipe === id) setActiveRecipe(null);
    else setActiveRecipe(id);
  };

  return (
    <div className="fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="icon-wrapper bg-primary-10">
          <Sprout className="text-primary icon-md" />
        </div>
        <div>
          <h1 className="h1">Natural Farming & ZBNF Guide</h1>
          <p className="text-sm text-muted">Scientific recipes for Zero Budget Natural Farming formulations. Restore soil fertility and repel pests naturally.</p>
        </div>
      </div>

      <div className="grid grid-2-1">
        {/* Recipes Accordion */}
        <div className="flex flex-col gap-4">
          <h2 className="h3 flex items-center gap-2 border-b pb-2">
            <BookOpen className="text-primary icon-sm" /> Microbial & Bio-Pesticide Formulations
          </h2>

          {RECIPES.map((recipe) => {
            const isOpen = activeRecipe === recipe.id;
            return (
              <div key={recipe.id} className={`glass-card overflow-hidden transition ${isOpen ? 'border-primary' : ''}`}>
                <div 
                  onClick={() => toggleRecipe(recipe.id)}
                  className="p-4 flex justify-between items-center cursor-pointer hover-bg transition"
                >
                  <div className="flex items-center gap-3">
                    <span className={`badge ${recipe.id === 'jeevamrutha' ? 'badge-success' : recipe.id === 'agniastra' ? 'badge-danger' : 'badge-primary'}`}>
                      {recipe.tag}
                    </span>
                    <h3 className="h4 font-semibold text-secondary-deep">{recipe.name}</h3>
                  </div>
                  {isOpen ? <ChevronUp className="icon-sm text-muted" /> : <ChevronDown className="icon-sm text-muted" />}
                </div>

                {isOpen && (
                  <div className="p-5 border-t bg-glass flex-col gap-4 fade-in">
                    <div className="grid grid-3 gap-3 text-xs">
                      <div className="flex items-center gap-1.5 text-muted">
                        <Clock className="icon-xs text-primary" /> {recipe.time}
                      </div>
                      <div className="flex items-center gap-1.5 text-muted">
                        <ShieldCheck className="icon-xs text-success" /> {recipe.shelf}
                      </div>
                      {recipe.id === 'agniastra' && (
                        <div className="flex items-center gap-1.5 text-danger font-medium">
                          <Flame className="icon-xs" /> Hot Formulation
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-secondary uppercase tracking-wider mb-1">Target Action</h4>
                      <p className="text-xs text-muted">{recipe.target}</p>
                    </div>

                    <div className="grid grid-2 gap-4">
                      {/* Ingredients */}
                      <div>
                        <h4 className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2">Ingredients Needed</h4>
                        <ul className="flex flex-col gap-1.5">
                          {recipe.ingredients.map((ing, i) => (
                            <li key={i} className="text-xs text-muted-dark flex items-start gap-1.5">
                              <span className="text-success mt-0.5">•</span> {ing}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Application */}
                      <div>
                        <h4 className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2">Application Method</h4>
                        <p className="text-xs text-muted-dark leading-relaxed p-3 bg-primary-5 rounded-lg border-l-3 border-primary">
                          {recipe.application}
                        </p>
                      </div>
                    </div>

                    {/* Step by Step */}
                    <div className="border-t pt-4">
                      <h4 className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2">Preparation Instructions</h4>
                      <ol className="flex flex-col gap-2">
                        {recipe.steps.map((step, i) => (
                          <li key={i} className="text-xs text-muted-dark flex gap-2">
                            <span className="font-semibold text-primary shrink-0 bg-primary-10 h-5 w-5 rounded-full flex items-center justify-center text-[10px]">{i + 1}</span>
                            <span className="mt-0.5">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Side panel with Agronomy & crop rotation rules */}
        <div className="flex-col gap-6">
          <div className="glass-card p-6 bg-success-dark text-white relative overflow-hidden">
            <div className="absolute right-[-30px] top-[-30px] opacity-10 text-white">
              <Award size={140} />
            </div>
            <h3 className="h3 mb-3 text-white flex items-center gap-2">
              <Award className="icon-sm text-primary-light" /> Soil Organic Carbon
            </h3>
            <p className="text-xs leading-relaxed mb-4">
              Modern chemical farming strips soil carbon, leading to dead soil. ZBNF concentrates on restoring the Soil Organic Carbon (SOC) levels back to above **1%** using microbial cultures. If SOC is &gt; 1%, plants naturally build immunity to 80% of fungal pathogens.
            </p>
            <span className="badge badge-accent">Agro-Officer Recommended</span>
          </div>

          <div className="glass-card p-6">
            <h3 className="h4 mb-4 flex items-center gap-2 border-b pb-2">
              <AlertCircle className="text-warning icon-sm" /> Crop Rotation Golden Rules
            </h3>
            <div className="flex flex-col gap-3 text-xs">
              <div className="p-3 bg-muted-5 rounded-lg border">
                <span className="font-semibold block mb-1">1. Family Separation</span>
                <p className="text-muted">Never plant Solanaceous crops (Tomato, Potato, Eggplant, Chilli) in the same field consecutively. They share the same blight pathogens.</p>
              </div>
              <div className="p-3 bg-muted-5 rounded-lg border">
                <span className="font-semibold block mb-1">2. Nitrogen Restoration</span>
                <p className="text-muted">Follow heavy feeders (Corn, Wheat) with nitrogen fixers (Cowpeas, Chickpeas, Groundnuts) to replenish soil nitrogen profile naturally.</p>
              </div>
              <div className="p-3 bg-muted-5 rounded-lg border">
                <span className="font-semibold block mb-1">3. Deep Root Follow</span>
                <p className="text-muted">Follow deep taproot crops (Cotton) with fibrous shallow-root crops (Millets, Grasses) to prevent soil mineral exhaustion at deep levels.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
