import React, { useState, useEffect } from 'react';
import { RefreshCw, ArrowRightLeft } from 'lucide-react';

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>('100');
  const [fromCurrency, setFromCurrency] = useState<string>('PKR');
  const [toCurrency, setToCurrency] = useState<string>('USD');
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await res.json();
      setRates(data.rates);
      setLastUpdated(new Date(data.date).toLocaleDateString('en-US'));
    } catch (e) {
      console.error(e);
      alert("Failed to fetch rates. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  const convert = (amt: string, from: string, to: string) => {
    if (!rates[from] || !rates[to]) return 0;
    const numAmount = parseFloat(amt) || 0;
    const usdAmount = numAmount / rates[from];
    return usdAmount * rates[to];
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const result = convert(amount, fromCurrency, toCurrency);
  const currencies = Object.keys(rates).sort();

  return (
    <div className="p-6 sm:p-8 flex flex-col h-full bg-transparent">
      <div className="flex flex-col mb-8">
        <p className="text-sm font-semibold text-teal-600 mb-1 uppercase tracking-wider">Currency Exchange</p>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight hidden">Convert</h2>
          <button 
            onClick={fetchRates}
            className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 text-slate-600 transition-colors"
            title="Refresh rates"
          >
            <RefreshCw size={20} className={loading ? "animate-spin text-teal-600" : ""} />
          </button>
        </div>
      </div>

      <div className="space-y-6 flex-grow">
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-2">Amount</label>
          <input
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-semibold text-2xl text-slate-900"
            placeholder="0.00"
            min="0"
          />
        </div>

        <div className="flex items-end gap-3 lg:gap-4 relative">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-500 mb-2">From</label>
            <div className="relative">
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full p-4 pr-10 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all appearance-none font-semibold text-lg text-slate-900"
              >
                {currencies.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                <svg className="fill-current h-4 w-4 text-slate-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          
          <button 
            onClick={swapCurrencies}
            className="p-3 mb-1 bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:border-teal-500 transition-all text-slate-500 hover:text-teal-600 shadow-sm z-10"
          >
            <ArrowRightLeft size={20} />
          </button>

          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-500 mb-2">To</label>
            <div className="relative">
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full p-4 pr-10 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all appearance-none font-semibold text-lg text-slate-900"
              >
                {currencies.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                <svg className="fill-current h-4 w-4 text-slate-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-8">
        {loading && !Object.keys(rates).length ? (
          <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-3xl p-8 min-h-[140px] shadow-sm relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-teal-500 animate-pulse"></div>
            <RefreshCw className="animate-spin mb-3 text-teal-600" size={28} />
            <span className="text-sm font-semibold tracking-wide text-slate-500 uppercase">Fetching live rates...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center bg-white border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(20,184,166,0.15)] hover:border-teal-300 transition-all duration-500 rounded-[2rem] p-6 sm:p-8 min-h-[120px] justify-center relative overflow-hidden group hover:scale-[1.02]">
             <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-400 to-teal-500 scale-x-100 group-hover:scale-x-110 transition-transform duration-500"></div>
             <div className="text-slate-500 font-semibold uppercase tracking-wide text-sm mb-3">
               {parseFloat(amount || '0').toLocaleString()} {fromCurrency} =
             </div>
             <div className="text-4xl sm:text-5xl font-extrabold text-teal-700 tracking-tight mb-1">
                {result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-2xl text-teal-600/80 font-bold ml-1">{toCurrency}</span>
             </div>
             {lastUpdated && <p className="text-xs text-slate-400 mt-4 font-medium uppercase tracking-wide">Updated: {lastUpdated}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
