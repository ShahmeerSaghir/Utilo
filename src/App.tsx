/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Settings, Search, ChevronLeft } from 'lucide-react';

import Home from './pages/Home';
import WorldClock from './components/WorldClock';
import CurrencyConverter from './components/CurrencyConverter';
import AgeCalculator from './components/AgeCalculator';
import PercentageCalculator from './components/PercentageCalculator';
import PasswordGenerator from './components/PasswordGenerator';
import TipCalculator from './components/TipCalculator';
import ScientificCalculator from './components/ScientificCalculator';
import UnitConverter from './components/UnitConverter';
import CalorieCalculator from './components/CalorieCalculator';
import BmiCalculator from './components/BmiCalculator';
import EmiCalculator from './components/EmiCalculator';

const ALL_TOOLS = [
  { name: "World Clock", link: "/world-clock" },
  { name: "Currency Converter", link: "/currency-converter" },
  { name: "Unit Converter", link: "/unit-converter" },
  { name: "EMI Calculator", link: "/emi-calculator" },
  { name: "Tip Calculator", link: "/tip-calculator" },
  { name: "Scientific Calculator", link: "/scientific-calculator" },
  { name: "Percentage Calculator", link: "/percentage-calculator" },
  { name: "Age Calculator", link: "/age-calculator" },
  { name: "BMI Calculator", link: "/bmi-calculator" },
  { name: "Calorie Calculator", link: "/calorie-calculator" },
  { name: "Password Generator", link: "/password-generator" }
];

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';

  const filteredTools = ALL_TOOLS.filter(tool => 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getHighlightedText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    const words = text.split(' ');
    return (
      <span className="truncate">
        {words.map((word, i) => {
          const isMatch = word.toLowerCase().includes(highlight.toLowerCase());
          return (
            <React.Fragment key={i}>
              <span className={isMatch ? "text-teal-700 font-bold" : ""}>{word}</span>
              {i < words.length - 1 && ' '}
            </React.Fragment>
          );
        })}
      </span>
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isHome) {
    return (
      <nav className="bg-white/80 backdrop-blur-md shadow-[0_2px_10px_rgb(0,0,0,0.02)] border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <Link to="/" className="flex items-center gap-2 group hover:opacity-80 transition-opacity">
              <div className="bg-teal-600 text-white p-1 rounded-md shadow-sm">
                <Settings size={16} className="group-hover:rotate-180 transition-transform duration-500" />
              </div>
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">Utilo</span>
            </Link>
            <Link to="/" className="hidden sm:flex text-sm font-semibold text-slate-500 hover:text-teal-600 transition-colors items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-teal-50">
               <ChevronLeft size={16} />
               Back to Home
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-teal-600 text-white p-2 rounded-lg group-hover:bg-teal-700 transition-colors shadow-sm">
                <Settings size={22} className="group-hover:rotate-180 transition-transform duration-500" />
              </div>
              <span className="font-extrabold text-xl text-slate-900 tracking-tight hidden sm:block">Utilo</span>
            </Link>
          </div>
          <div className="flex-1 max-w-xl relative" ref={dropdownRef}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-full leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 text-sm sm:text-base transition-all duration-300 shadow-sm hover:border-slate-300 hover:shadow"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
              />
            </div>
            {showDropdown && searchQuery.length > 0 && (
              <div className="absolute mt-2 w-full bg-white/95 backdrop-blur-xl rounded-[1.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-200/50 overflow-hidden z-50 animate-in fade-in slide-in-from-top-4 zoom-in-95 duration-200 origin-top">
                {filteredTools.length > 0 ? (
                  <ul className="max-h-[60vh] overflow-y-auto custom-scrollbar p-2 space-y-1">
                    {filteredTools.map((tool, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => {
                            navigate(tool.link);
                            setShowDropdown(false);
                            setSearchQuery('');
                          }}
                          className="w-full text-left px-5 py-3.5 rounded-xl hover:bg-teal-50/80 active:bg-teal-100/50 transition-all duration-200 text-sm sm:text-base font-medium text-slate-700 group flex items-center gap-4"
                        >
                          <div className="flex-shrink-0 bg-slate-50 group-hover:bg-white p-2 rounded-lg transition-colors border border-slate-100 group-hover:border-teal-100 group-hover:shadow-sm">
                            <Search size={18} className="text-slate-400 group-hover:text-teal-600 transition-colors" />
                          </div>
                          {getHighlightedText(tool.name, searchQuery)}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-6 py-12 text-sm text-slate-500 text-center flex flex-col items-center justify-center gap-3">
                    <div className="bg-slate-50 p-4 rounded-full mb-2">
                       <Search className="h-8 w-8 text-slate-300" />
                    </div>
                    <p className="text-base text-slate-600">No matching tools for "<span className="font-bold text-slate-900">{searchQuery}</span>"</p>
                    <p className="text-sm text-slate-400">Try searching for 'calculator' or 'converter'</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function ToolLayout({ children, title }: { children: React.ReactNode, title: string }) {
  useEffect(() => {
    document.title = `${title} - Utilo`;
  }, [title]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-4 sm:py-8 sm:px-6 lg:px-8 min-h-[calc(100vh-56px)]">
      <div className="mb-4 sm:mb-6 border-b border-slate-200 pb-3 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight text-center sm:text-left">{title}</h1>
        <Link to="/" className="text-sm font-semibold text-slate-600 hover:text-teal-700 transition-colors flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-teal-50 bg-white border border-slate-200 shadow-sm sm:hidden">
          <ChevronLeft size={16} />
          Back to Home
        </Link>
      </div>
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden relative">
        {/* We strip brutalism from the child components globally via css, but some tools might still have specific tailwind classes. We will rely on our global CSS changes mostly. */}
        {children}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-sm">
         <p>© 2026 Utilo. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/world-clock" element={<ToolLayout title="World Clock"><WorldClock /></ToolLayout>} />
            <Route path="/currency-converter" element={<ToolLayout title="Currency Converter"><CurrencyConverter /></ToolLayout>} />
            <Route path="/age-calculator" element={<ToolLayout title="Age Calculator"><AgeCalculator /></ToolLayout>} />
            <Route path="/percentage-calculator" element={<ToolLayout title="Percentage Calculator"><PercentageCalculator /></ToolLayout>} />
            <Route path="/password-generator" element={<ToolLayout title="Password Generator"><PasswordGenerator /></ToolLayout>} />
            <Route path="/tip-calculator" element={<ToolLayout title="Tip Calculator"><TipCalculator /></ToolLayout>} />
            <Route path="/scientific-calculator" element={<ToolLayout title="Scientific Calculator"><ScientificCalculator /></ToolLayout>} />
            <Route path="/unit-converter" element={<ToolLayout title="Unit Converter"><UnitConverter /></ToolLayout>} />
            <Route path="/calorie-calculator" element={<ToolLayout title="Daily Calorie Calculator"><CalorieCalculator /></ToolLayout>} />
            <Route path="/bmi-calculator" element={<ToolLayout title="BMI Calculator"><BmiCalculator /></ToolLayout>} />
            <Route path="/emi-calculator" element={<ToolLayout title="EMI Calculator"><EmiCalculator /></ToolLayout>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
