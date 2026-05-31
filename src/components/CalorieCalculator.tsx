import React, { useState } from 'react';

export default function CalorieCalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(25);
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [activity, setActivity] = useState<number>(1.375);

  const calculateCalories = () => {
    if (!age || !weight || !height) return { bmr: 0, tdee: 0 };

    let bmr = 0;
    if (gender === 'male') {
      bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    } else {
      bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.330 * age;
    }

    const tdee = bmr * activity;
    return { bmr, tdee };
  };

  const { bmr, tdee } = calculateCalories();

  return (
    <div className="p-6 sm:p-8 flex flex-col h-full bg-transparent min-h-[500px]">
      <div className="flex flex-col mb-8">
        <p className="text-sm font-semibold text-teal-600 mb-1 uppercase tracking-wider">Health & Fitness</p>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight hidden">Daily Calories</h2>
      </div>

      <div className="space-y-6 flex-grow mb-8 text-slate-900">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-2">Gender</label>
            <div className="relative">
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                className="w-full p-4 pr-10 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all appearance-none font-semibold text-lg text-slate-900 cursor-pointer"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                <svg className="fill-current h-4 w-4 text-slate-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-2">Age</label>
            <input
              type="number"
              value={age || ''}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-semibold text-xl text-slate-900"
              placeholder="25"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-2">Weight (kg)</label>
            <input
              type="number"
              value={weight || ''}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-semibold text-xl text-slate-900"
              placeholder="70"
            />
          </div>
          <div className="flex-1">
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

        <div>
           <label className="block text-sm font-medium text-slate-700 mb-2">Activity Level</label>
            <div className="relative">
              <select
                value={activity}
                onChange={(e) => setActivity(Number(e.target.value))}
                className="w-full p-4 pr-10 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all appearance-none font-semibold text-base text-slate-900 cursor-pointer"
              >
                <option value="1.2">Sedentary</option>
                <option value="1.375">Light Exercise (1-3 days)</option>
                <option value="1.55">Moderate (3-5 days)</option>
                <option value="1.725">Heavy (6-7 days)</option>
                <option value="1.9">Athlete</option>
              </select>
               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                <svg className="fill-current h-4 w-4 text-slate-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
        </div>
      </div>

      <div className="mt-auto pt-8 flex flex-col sm:flex-row justify-between items-stretch min-h-[120px] gap-4 group">
        <div className="bg-white p-8 sm:p-10 rounded-[2rem] flex-1 border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(20,184,166,0.15)] hover:border-teal-300 transition-all duration-500 flex flex-col justify-center text-center sm:text-left relative overflow-hidden hover:scale-[1.02]">
           <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-200 group-hover:bg-teal-200 transition-colors"></div>
           <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">BMR</p>
           <p className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-800 leading-none">{bmr ? bmr.toFixed(0) : '0'}</p>
        </div>
        <div className="bg-white p-8 sm:p-10 rounded-[2rem] flex-1 border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(20,184,166,0.15)] hover:border-teal-300 transition-all duration-500 flex flex-col justify-center text-center sm:text-right relative overflow-hidden group hover:scale-[1.02]">
           <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-400 to-teal-500 scale-x-100 group-hover:scale-x-110 transition-transform duration-500"></div>
           <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Daily Needs (TDEE)</p>
           <p className="text-4xl sm:text-5xl font-extrabold tracking-tight text-teal-700 leading-none">{tdee ? tdee.toFixed(0) : '0'}</p>
        </div>
      </div>
    </div>
  );
}
