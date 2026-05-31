import React, { useState } from 'react';

export default function TipCalculator() {
  const [bill, setBill] = useState<number>(100);
  const [tipPercent, setTipPercent] = useState<number>(15);

  const tipAmount = (bill * tipPercent) / 100;
  const totalAmount = bill + tipAmount;

  return (
    <div className="p-6 sm:p-8 flex flex-col h-full justify-between">
      <div className="flex flex-col mb-8">
        <p className="text-sm font-semibold text-teal-600 mb-1 uppercase tracking-wider">Finance</p>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight hidden">Tip Calculator</h2>
      </div>

      <div className="space-y-6 flex-grow mt-2">
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-2">Bill Amount</label>
          <div className="relative mt-1">
             <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="font-semibold text-xl text-slate-400">$</span>
             </div>
            <input
              type="number"
              value={bill || ''}
              onChange={(e) => setBill(Number(e.target.value))}
              placeholder="100.00"
              className="w-full pl-10 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-semibold text-2xl text-slate-900"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-end mb-3">
            <label className="block text-sm font-medium text-slate-500 mb-2">Tip %</label>
            <span className="font-bold text-lg text-teal-600">{tipPercent}%</span>
          </div>
          <div className="flex gap-2">
            {[10, 15, 18, 20, 25].map(pct => (
              <button
                key={pct}
                onClick={() => setTipPercent(pct)}
                className={`flex-1 py-3 font-semibold rounded-lg border transition-all ${
                  tipPercent === pct 
                    ? 'bg-teal-600 text-white border-teal-600 shadow-md' 
                    : 'bg-white text-slate-700 border-slate-200 hover:border-teal-500 hover:text-teal-600'
                }`}
              >
                {pct}%
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto pt-8 flex flex-col gap-4">
        <div className="flex justify-between items-center text-slate-500 bg-white border border-slate-200 p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-teal-200 transition-all duration-300">
           <span className="font-bold text-sm uppercase tracking-wider">Tip Amount</span>
           <span className="font-bold text-2xl sm:text-3xl text-slate-700">${tipAmount.toFixed(2)}</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(20,184,166,0.15)] hover:border-teal-300 transition-all duration-500 p-6 sm:p-8 rounded-[2rem] relative overflow-hidden gap-3 group hover:scale-[1.02]">
           <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-400 to-teal-500 scale-x-100 group-hover:scale-x-110 transition-transform duration-500"></div>
           <span className="font-bold text-sm text-slate-500 uppercase tracking-widest">Total Bill</span>
           <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-teal-700">${totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
