import React, { useState } from 'react';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');

  const calculateAge = () => {
    if (!birthDate) return null;
    
    const birth = new Date(birthDate);
    const today = new Date();
    
    let ageY = today.getFullYear() - birth.getFullYear();
    let ageM = today.getMonth() - birth.getMonth();
    let ageD = today.getDate() - birth.getDate();

    if (ageD < 0) {
      ageM--;
      const daysInPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      ageD += daysInPreviousMonth;
    }

    if (ageM < 0) {
      ageY--;
      ageM += 12;
    }

    if (ageY < 0) {
      return { years: 0, months: 0, days: 0, isFuture: true };
    }

    return { years: ageY, months: ageM, days: ageD, isFuture: false };
  };

  const age = calculateAge();

  return (
    <div className="p-6 sm:p-8 flex flex-col h-full justify-between">
      <div className="flex flex-col mb-8">
        <p className="text-sm font-semibold text-teal-600 mb-1 uppercase tracking-wider">Dates & Time</p>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight hidden">Age Calculator</h2>
      </div>

      <div className="flex-grow mt-2">
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-2">Select Your Birth Date</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-semibold text-xl text-slate-900 cursor-text"
          />
        </div>
      </div>

      <div className="mt-12 flex-grow flex flex-col justify-end">
        {age && age.isFuture ? (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl font-medium text-center border border-red-100">
             Birth date cannot be in the future.
          </div>
        ) : age ? (
          <div className="flex flex-col sm:flex-row justify-between items-stretch gap-4 group">
             <div className="text-center bg-white border border-slate-200/60 rounded-[2rem] p-8 sm:p-10 flex-1 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(20,184,166,0.15)] hover:border-teal-300 transition-all duration-500 w-full relative overflow-hidden group/item hover:scale-[1.02]">
               <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-400 to-teal-500 scale-x-100 group-hover/item:scale-x-110 transition-transform duration-500"></div>
               <p className="text-4xl sm:text-5xl font-extrabold text-teal-700 tracking-tight leading-none">{age.years}</p>
               <p className="text-sm font-bold text-slate-500 mt-4 uppercase tracking-widest">Years</p>
             </div>
             <div className="text-center bg-white border border-slate-200/60 rounded-[2rem] p-8 sm:p-10 flex-1 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(20,184,166,0.15)] hover:border-teal-300 transition-all duration-500 w-full relative overflow-hidden group/item hover:scale-[1.02]">
               <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-400 to-teal-500 scale-x-100 group-hover/item:scale-x-110 transition-transform duration-500"></div>
               <p className="text-4xl sm:text-5xl font-extrabold text-teal-700 tracking-tight leading-none">{age.months}</p>
               <p className="text-sm font-bold text-slate-500 mt-4 uppercase tracking-widest">Months</p>
             </div>
             <div className="text-center bg-white border border-slate-200/60 rounded-[2rem] p-8 sm:p-10 flex-1 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(20,184,166,0.15)] hover:border-teal-300 transition-all duration-500 w-full relative overflow-hidden group/item hover:scale-[1.02]">
               <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-400 to-teal-500 scale-x-100 group-hover/item:scale-x-110 transition-transform duration-500"></div>
               <p className="text-4xl sm:text-5xl font-extrabold text-teal-700 tracking-tight leading-none">{age.days}</p>
               <p className="text-sm font-bold text-slate-500 mt-4 uppercase tracking-widest">Days</p>
             </div>
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl flex items-center justify-center min-h-[140px]">
             Enter your birth date above to see your exact age.
          </div>
        )}
      </div>
    </div>
  );
}
