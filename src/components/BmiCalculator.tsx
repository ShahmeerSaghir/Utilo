import React, { useState } from 'react';

export default function BmiCalculator() {
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);

  const calculateBmi = () => {
    if (!weight || !height) return 0;
    const h = height / 100;
    return weight / (h * h);
  };

  const bmi = calculateBmi();
  
  const getStatus = (bmi: number) => {
    if (bmi === 0) return '';
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };
  
  const status = getStatus(bmi);

  return (
    <div className="p-6 sm:p-8 flex flex-col h-full bg-transparent min-h-[400px]">
      <div className="flex flex-col mb-8">
        <p className="text-sm font-semibold text-teal-600 mb-1 uppercase tracking-wider">Health</p>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight hidden">BMI Calculator</h2>
      </div>

      <div className="space-y-6 flex-grow mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-slate-700 mb-2">Weight (kg)</label>
            <input
              type="number"
              value={weight || ''}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-semibold text-xl text-slate-900"
              placeholder="70"
            />
          </div>
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-slate-700 mb-2">Height (cm)</label>
            <input
              type="number"
              value={height || ''}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-semibold text-xl text-slate-900"
              placeholder="170"
            />
          </div>
        </div>
      </div>

      <div className="mt-auto pt-8 flex flex-col sm:flex-row justify-between items-stretch min-h-[120px] gap-4 group">
        <div className="bg-white p-8 sm:p-10 rounded-[2rem] flex-1 border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(20,184,166,0.15)] hover:border-teal-300 transition-all duration-500 flex flex-col justify-center text-center sm:text-left relative overflow-hidden hover:scale-[1.02]">
           <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-200 group-hover:bg-teal-200 transition-colors"></div>
           <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Status</p>
           <p className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-800 uppercase leading-none">{status || '-'}</p>
        </div>
        <div className="bg-white p-8 sm:p-10 rounded-[2rem] flex-1 border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(20,184,166,0.15)] hover:border-teal-300 transition-all duration-500 flex flex-col justify-center text-center sm:text-right relative overflow-hidden group hover:scale-[1.02]">
           <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-400 to-teal-500 scale-x-100 group-hover:scale-x-110 transition-transform duration-500"></div>
           <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">BMI Score</p>
           <p className="text-4xl sm:text-5xl font-extrabold tracking-tight text-teal-700 leading-none">{bmi ? bmi.toFixed(1) : '0'}</p>
        </div>
      </div>
    </div>
  );
}
