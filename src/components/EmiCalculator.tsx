import React, { useState } from 'react';

export default function EmiCalculator() {
  const [principal, setPrincipal] = useState<number>(500000);
  const [rate, setRate] = useState<number>(12);
  const [months, setMonths] = useState<number>(36);

  const r = (rate / 12 / 100);
  const emi = principal > 0 && rate > 0 && months > 0 
    ? (principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1)) 
    : 0;

  return (
    <div className="p-6 sm:p-8 flex flex-col h-full bg-transparent min-h-[500px]">
      <div className="flex flex-col mb-8">
        <p className="text-sm font-semibold text-teal-600 mb-1 uppercase tracking-wider">Finance</p>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight hidden">EMI Calculator</h2>
      </div>

      <div className="space-y-6 flex-grow mb-8">
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <label className="block text-sm font-medium text-slate-700 mb-4 flex justify-between tracking-wide">
            <span>Principal Amount</span>
             <span className="text-teal-700 font-bold">${principal.toLocaleString()}</span>
          </label>
          <input
            type="range"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600 mb-6"
            min="1000"
            max="1000000"
            step="1000"
          />
          <input
            type="number"
            value={principal || ''}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-semibold text-xl text-slate-900 mt-2"
            placeholder="500000"
            min="0"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <label className="block text-sm font-medium text-slate-700 mb-3 tracking-wide">Interest Rate (%)</label>
            <input
              type="number"
              value={rate === 0 ? '' : rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-semibold text-lg text-slate-900"
              placeholder="12"
              min="0" step="0.1"
            />
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <label className="block text-sm font-medium text-slate-700 mb-3 tracking-wide">Tenure (Months)</label>
            <input
              type="number"
              value={months === 0 ? '' : months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-semibold text-lg text-slate-900"
              placeholder="36"
              min="1"
            />
          </div>
        </div>
      </div>

      <div className="mt-auto pt-8">
        <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(20,184,166,0.15)] hover:border-teal-300 transition-all duration-500 mt-4 relative overflow-hidden group hover:scale-[1.02]">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-400 to-teal-500 scale-x-100 group-hover:scale-x-110 transition-transform duration-500"></div>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Estimated Monthly EMI</p>
          <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-teal-700 flex items-baseline">
            <span className="text-3xl sm:text-4xl text-teal-600/80 mr-2 font-bold">$</span>
            {emi > 0 ? emi.toLocaleString(undefined, { maximumFractionDigits: 0 }) : '0'}
          </div>
        </div>
      </div>
    </div>
  );
}
