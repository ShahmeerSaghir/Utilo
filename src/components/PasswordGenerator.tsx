import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, Check } from 'lucide-react';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pass);
    setCopied(false);
  };

  useEffect(() => {
    generatePassword();
  }, [length]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 sm:p-8 flex flex-col h-full">
      <div className="flex flex-col mb-8">
        <p className="text-sm font-semibold text-teal-600 mb-1 uppercase tracking-wider">Security</p>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight hidden">Password Generator</h2>
      </div>

      <div className="flex-grow flex flex-col justify-center mt-2">
        <div className="relative group cursor-pointer mb-8" onClick={copyToClipboard}>
          <div className="bg-white border border-slate-200/60 rounded-[2rem] p-8 sm:p-10 min-h-[140px] flex items-center justify-center break-all transition-all duration-500 hover:border-teal-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(20,184,166,0.15)] relative overflow-hidden group hover:scale-[1.02]">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-400 to-teal-500 scale-x-100 group-hover:scale-x-110 transition-transform duration-500"></div>
            <p className="font-mono text-3xl sm:text-4xl sm:text-5xl font-bold text-teal-700 text-center tracking-wider relative z-10 leading-none">{password}</p>
          </div>
          <div className="absolute -top-4 -right-4 z-20 transition-transform hover:scale-110 active:scale-95 duration-300">
             <button 
               className={`p-4 rounded-xl transition-all shadow-md border focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                 copied ? 'bg-teal-500 text-white border-teal-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-teal-600 hover:border-teal-300 backdrop-blur-sm'
               }`}
             >
               {copied ? <Check size={24} /> : <Copy size={24} />}
             </button>
          </div>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
             <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Password Length</label>
             <span className="text-lg font-bold text-teal-600">{length} characters</span>
          </div>
          <input
            type="range"
            min="8"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600 hover:accent-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all shadow-inner"
          />
        </div>
      </div>

      <div className="mt-8">
        <button 
          onClick={generatePassword}
          className="w-full py-4 sm:py-5 bg-teal-600 text-white rounded-2xl font-bold text-lg hover:bg-teal-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 border border-teal-700 relative overflow-hidden group"
        >
          <div className="absolute inset-0 w-full h-full bg-white/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out pointer-events-none"></div>
          <RefreshCw size={22} className="relative z-10 group-active:rotate-180 transition-transform duration-500" />
          <span className="relative z-10 tracking-wide">Generate New Password</span>
        </button>
      </div>
    </div>
  );
}
