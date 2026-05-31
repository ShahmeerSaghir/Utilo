import React, { useState } from 'react';

export default function PercentageCalculator() {
  const [num, setNum] = useState<number>(500);
  const [percent, setPercent] = useState<number>(20);

  const calculateResult = () => {
    if (isNaN(num) || isNaN(percent)) return null;
    return (num * percent) / 100;
  };

  const result = calculateResult();

  return (
    <div className="p-6 sm:p-8 flex flex-col h-full justify-between">
      <div className="flex flex-col mb-8">
        <p className="text-sm font-semibold text-teal-600 mb-1 uppercase tracking-wider">Math</p>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight hidden">Percentage Calculator</h2>
      </div>

      <div className="space-y-6 flex-grow mt-2">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 w-full">
            <input
              type="number"
              value={percent || ''}
              onChange={(e) => setPercent(Number(e.target.value))}
              placeholder="20"
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-semibold text-4xl text-center text-slate-900"
            />
            <div className="text-center text-slate-400 font-medium mt-2">%</div>
          </div>
          <div className="text-2xl font-bold text-slate-300">OF</div>
          <div className="flex-1 w-full">
            <input
              type="number"
              value={num || ''}
              onChange={(e) => setNum(Number(e.target.value))}
              placeholder="500"
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-semibold text-4xl text-center text-slate-900"
            />
            <div className="text-center text-slate-400 font-medium mt-2">Number</div>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-8">
        <div className="flex flex-col items-center justify-center min-h-[120px] bg-white border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(20,184,166,0.15)] hover:border-teal-300 transition-all duration-500 rounded-[2rem] p-6 sm:p-8 relative overflow-hidden group hover:scale-[1.02]">
           <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-400 to-teal-500 scale-x-100 group-hover:scale-x-110 transition-transform duration-500"></div>
           <p className="text-sm font-bold text-slate-500 mb-3 uppercase tracking-widest">Result</p>
           <p className="text-4xl sm:text-5xl font-extrabold tracking-tight text-teal-700">
             {result !== null ? result.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '-'}
           </p>
        </div>
      </div>
    </div>
  );
}
