import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';

interface City {
  name: string;
  offset: number;
}

const initialCities: City[] = [
  { name: 'Karachi', offset: 5 },
  { name: 'London', offset: 0 },
  { name: 'New York', offset: -4 },
  { name: 'Dubai', offset: 4 },
  { name: 'Delhi', offset: 5.5 }
];

export default function WorldClock() {
  const [cities, setCities] = useState<City[]>(initialCities);
  const [now, setNow] = useState(new Date());
  const [newCityName, setNewCityName] = useState('');
  const [newCityOffset, setNewCityOffset] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const addCity = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCityName && !isNaN(Number(newCityOffset))) {
      setCities([...cities, { name: newCityName, offset: Number(newCityOffset) }]);
      setNewCityName('');
      setNewCityOffset('');
      setIsAdding(false);
    }
  };

  const removeCity = (indexToRemove: number) => {
    setCities(cities.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="p-6 sm:p-8 flex flex-col h-full bg-transparent">
      <div className="flex flex-col mb-6">
        <p className="text-sm font-semibold text-teal-600 mb-1 uppercase tracking-wider">Time & World</p>
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight hidden">World Clock</h2>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 text-slate-600 transition-colors"
          >
            {isAdding ? <X size={20} /> : <Plus size={20} />}
          </button>
        </div>
      </div>

      {isAdding && (
        <form onSubmit={addCity} className="mb-6 flex flex-col gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <input
            type="text"
            value={newCityName}
            onChange={e => setNewCityName(e.target.value)}
            placeholder="City Name"
            className="w-full p-3 bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all font-medium text-slate-900"
            required
          />
          <input
            type="number"
            value={newCityOffset}
            onChange={e => setNewCityOffset(e.target.value)}
            placeholder="UTC Offset (e.g. -5, 5.5)"
            step="0.5"
            className="w-full p-3 bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all font-medium text-slate-900"
            required
          />
          <button type="submit" className="mt-1 bg-teal-600 text-white font-medium py-2.5 rounded-lg hover:bg-teal-700 transition-colors">
            Add City
          </button>
        </form>
      )}

      <div className="flex-grow flex flex-col gap-3 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
        {cities.map((city, idx) => {
          const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
          const cityTime = new Date(utc + (city.offset * 3600000));
          const timeStr = cityTime.toLocaleTimeString('en-US', {
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
          });

          return (
            <div key={idx} className="flex justify-between items-center group bg-white p-6 rounded-[1.5rem] border border-slate-200/60 shadow-sm hover:shadow-[0_8px_30px_rgb(20,184,166,0.12)] hover:border-teal-300 transition-all duration-500 relative overflow-hidden hover:scale-[1.02]">
              <div className="absolute left-0 top-0 w-1.5 h-full bg-slate-200 group-hover:bg-gradient-to-b group-hover:from-teal-400 group-hover:to-teal-500 transition-all duration-500"></div>
              <div className="flex flex-col pl-4">
                <span className="font-extrabold text-slate-800 text-lg sm:text-2xl tracking-tight leading-none mb-1">{city.name}</span>
                <span className="text-sm font-bold text-slate-500 tracking-widest uppercase">UTC {city.offset >= 0 ? `+${city.offset}` : city.offset}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-extrabold font-mono text-xl sm:text-3xl text-teal-700 tracking-tight">{timeStr}</span>
                <button onClick={() => removeCity(idx)} className="text-slate-400 opacity-0 group-hover:opacity-100 group-hover:-translate-x-2 translate-x-4 hover:text-red-500 transition-all duration-300 bg-red-50 p-2 rounded-full hover:bg-red-100 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                  <X size={18} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
