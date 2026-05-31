import React, { useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';

const unitFactors: Record<string, Record<string, number | string>> = {
  length: {
    Kilometer: 1000, Meter: 1, Centimeter: 0.01, Millimeter: 0.001, Mile: 1609.344, Yard: 0.9144, Foot: 0.3048, Inch: 0.0254
  },
  weight: {
    Kilogram: 1, Gram: 0.001, Milligram: 0.000001, Pound: 0.45359237, Ounce: 0.02834952, Ton: 1000
  },
  temp: {
    Celsius: 'C', Fahrenheit: 'F', Kelvin: 'K'
  },
  volume: {
    Liter: 1, Milliliter: 0.001, 'Cubic Meter': 1000, 'Gallon (US)': 3.78541178, Cup: 0.236588236
  }
};

const unitData = {
  length: { name: "Length", units: Object.keys(unitFactors.length) },
  weight: { name: "Weight", units: Object.keys(unitFactors.weight) },
  temp: { name: "Temperature", units: Object.keys(unitFactors.temp) },
  volume: { name: "Volume", units: Object.keys(unitFactors.volume) }
};

type UnitCategory = keyof typeof unitData;

export default function UnitConverter() {
  const [category, setCategory] = useState<UnitCategory>('length');
  const [amount, setAmount] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('Meter');
  const [toUnit, setToUnit] = useState<string>('Foot');

  const switchCategory = (cat: UnitCategory) => {
    setCategory(cat);
    setFromUnit(unitData[cat].units[0]);
    setToUnit(unitData[cat].units[1] || unitData[cat].units[0]);
  };

  const convertUnit = () => {
    const numericAmount = parseFloat(amount) || 0;
    
    if (category === 'temp') {
      let c = 0;
      if (fromUnit === 'Celsius') c = numericAmount;
      else if (fromUnit === 'Fahrenheit') c = (numericAmount - 32) * 5/9;
      else if (fromUnit === 'Kelvin') c = numericAmount - 273.15;
      
      if (toUnit === 'Celsius') return c;
      if (toUnit === 'Fahrenheit') return (c * 9/5) + 32;
      if (toUnit === 'Kelvin') return c + 273.15;
      return 0;
    }
    
    const factors = unitFactors[category] as Record<string, number>;
    const fromFactor = factors[fromUnit] || 1;
    const toFactor = factors[toUnit] || 1;
    
    // convert fromUnit to base unit, then to toUnit
    const baseValue = numericAmount * fromFactor;
    return baseValue / toFactor;
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const result = convertUnit();

  return (
    <div className="p-6 sm:p-8 flex flex-col h-full bg-transparent">
      <div className="flex flex-col mb-8">
        <p className="text-sm font-semibold text-teal-600 mb-1 uppercase tracking-wider">Metrics</p>
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight hidden">Convert</h2>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => switchCategory(e.target.value as UnitCategory)}
                className="bg-slate-50 border border-slate-200 text-slate-700 hover:text-teal-600 focus:outline-none appearance-none font-semibold uppercase text-xs pl-3 pr-8 py-2 rounded-lg cursor-pointer transition-colors"
              >
                {Object.entries(unitData).map(([key, data]) => (
                   <option className="text-slate-900" key={key} value={key}>{data.name}</option>
                ))}
              </select>
               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <svg className="fill-current h-3 w-3 text-slate-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
        </div>
      </div>

      <div className="space-y-6 flex-grow mt-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Value</label>
          <input
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-semibold text-2xl text-slate-900"
            placeholder="1"
          />
        </div>

        <div className="flex items-end gap-3 lg:gap-4 relative">
          <div className="flex-1 overflow-hidden">
            <label className="block text-sm font-medium text-slate-700 mb-2">From</label>
            <div className="relative mt-1">
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full p-4 pr-8 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all appearance-none font-semibold text-lg text-slate-900 truncate cursor-pointer"
              >
                {unitData[category].units.map(u => <option className="text-slate-900" key={u} value={u}>{u}</option>)}
              </select>
               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                <svg className="fill-current h-4 w-4 text-slate-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          
          <button 
            onClick={swapUnits}
            className="p-3 mb-1 bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:border-teal-500 transition-all text-slate-500 hover:text-teal-600 shadow-sm z-10 shrink-0"
          >
             <ArrowRightLeft size={20} />
          </button>

          <div className="flex-1 overflow-hidden">
            <label className="block text-sm font-medium text-slate-700 mb-2">To</label>
            <div className="relative mt-1">
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full p-4 pr-8 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all appearance-none font-semibold text-lg text-slate-900 truncate cursor-pointer"
              >
                {unitData[category].units.map(u => <option className="text-slate-900" key={u} value={u}>{u}</option>)}
              </select>
               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                <svg className="fill-current h-4 w-4 text-slate-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-8">
        <div className="flex flex-col items-center text-center bg-white border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(20,184,166,0.15)] hover:border-teal-300 transition-all duration-500 rounded-[2rem] p-6 sm:p-8 min-h-[120px] justify-center relative overflow-hidden group hover:scale-[1.02]">
           <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-400 to-teal-500 scale-x-100 group-hover:scale-x-110 transition-transform duration-500"></div>
           <p className="text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">Converted Result</p>
           <div className="flex items-baseline justify-center flex-wrap gap-2 text-center">
             <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-teal-700">{result.toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
             <span className="text-2xl font-bold text-teal-600/80 ml-1">{toUnit}</span>
           </div>
        </div>
      </div>
    </div>
  );
}
