import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  DollarSign, 
  Calculator, 
  CalendarDays, 
  Percent, 
  ShieldCheck, 
  Coins, 
  Dumbbell, 
  Activity, 
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const categories = [
  {
    title: "Popular Tools",
    description: "Our most used everyday utilities.",
    tools: [
      { name: "World Clock", icon: <Globe className="text-teal-600" />, desc: "Check time across multiple time zones.", link: "/world-clock" },
      { name: "Currency Converter", icon: <DollarSign className="text-teal-600" />, desc: "Live exchange rates for 150+ currencies.", link: "/currency-converter" },
      { name: "Unit Converter", icon: <Calculator className="text-teal-600" />, desc: "Convert length, weight, temperature & more.", link: "/unit-converter" },
    ]
  },
  {
    title: "Finance Tools",
    description: "Manage your money and loans easily.",
    tools: [
      { name: "EMI Calculator", icon: <Calculator className="text-teal-600" />, desc: "Calculate monthly loan installments quickly.", link: "/emi-calculator" },
      { name: "Tip Calculator", icon: <Coins className="text-teal-600" />, desc: "Split bills and calculate tips with ease.", link: "/tip-calculator" },
    ]
  },
  {
    title: "Math & Science Tools",
    description: "Advanced calculators for your tasks.",
    tools: [
      { name: "Scientific Calculator", icon: <Calculator className="text-teal-600" />, desc: "Solve complex equations and trigonometry.", link: "/scientific-calculator" },
      { name: "Percentage Calculator", icon: <Percent className="text-teal-600" />, desc: "Find percentages, differences, and more.", link: "/percentage-calculator" },
      { name: "Age Calculator", icon: <CalendarDays className="text-teal-600" />, desc: "Find your exact age in years, months, and days.", link: "/age-calculator" },
    ]
  },
  {
    title: "Health & Fitness Tools",
    description: "Track your body and health metrics.",
    tools: [
      { name: "BMI Calculator", icon: <Activity className="text-teal-600" />, desc: "Check if you are at a healthy weight.", link: "/bmi-calculator" },
      { name: "Calorie Calculator", icon: <Dumbbell className="text-teal-600" />, desc: "Calculate your daily BMR and TDEE needs.", link: "/calorie-calculator" },
    ]
  },
  {
    title: "Security Tools",
    description: "Protect your digital identity securely.",
    tools: [
      { name: "Password Generator", icon: <ShieldCheck className="text-teal-600" />, desc: "Create secure, random passwords instantly.", link: "/password-generator" },
    ]
  }
];

export default function Home() {
  useEffect(() => {
    document.title = "Utilo - All Free Online Tools";
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200 pt-20 pb-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-teal-50 rounded-full blur-3xl opacity-50 mix-blend-multiply pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-50 mix-blend-multiply pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-sm font-semibold mb-6">
            <Sparkles size={16} /> <span>10+ Free Tools Added</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            Utilo - Free Online Tools
          </h1>
          <p className="mt-4 max-w-2xl text-2xl font-medium text-teal-600 mx-auto mb-4">
            Fast, Accurate & Easy to Use Online Tools
          </p>
          <p className="max-w-2xl text-xl text-slate-600 mx-auto mb-10">
            Daily use calculators, converters and utilities in one place.
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })} className="bg-teal-600 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl hover:bg-teal-700 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(20,184,166,0.3)] hover:-translate-y-1 active:scale-95 active:translate-y-0 active:shadow-md inline-flex items-center gap-3 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 border border-teal-700 relative overflow-hidden">
              <div className="absolute inset-0 w-full h-full bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out pointer-events-none"></div>
              <span className="relative z-10 tracking-wide">Browse All Tools</span> 
              <ArrowRight size={22} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {categories.map((category, idx) => (
            <div key={idx}>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{category.title}</h2>
                <p className="text-slate-500 mt-2">{category.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.tools.map((tool, i) => (
                  <Link 
                    key={i} 
                    to={tool.link}
                    className="group bg-white rounded-[2rem] p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-200 hover:shadow-[0_8px_30px_rgb(20,184,166,0.12)] hover:border-teal-300 transition-all duration-500 flex flex-col items-start gap-6 hover:scale-[1.02] relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500 opacity-50 pointer-events-none"></div>
                    <div className="p-4 bg-teal-50 rounded-2xl group-hover:bg-teal-100 transition-colors text-teal-700 relative z-10 w-16 h-16 flex items-center justify-center">
                      {React.cloneElement(tool.icon, { size: 32, className: "" })}
                    </div>
                    <div className="flex-1 w-full relative z-10">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-2">
                        {tool.name}
                      </h3>
                      <p className="text-slate-600 leading-relaxed font-medium">{tool.desc}</p>
                    </div>
                    <div className="mt-2 text-teal-600 font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 relative z-10">
                      Open Tool <ChevronRight size={18} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
