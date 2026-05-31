import fs from 'fs';

const tools = [
    { id: "world-clock", name: "World Clock", icon: "🌍", cat: "Utilities", desc: "Check current time across major global timezones and add custom cities." },
    { id: "currency-converter", name: "Currency Converter", icon: "💱", cat: "Finance", desc: "Convert global currencies instantly with real-time exchange rates." },
    { id: "unit-converter", name: "Unit Converter", icon: "⚖️", cat: "Utilities", desc: "Easily convert length, weight, temperature, area, volume, and speed." },
    { id: "scientific-calculator", name: "Scientific Calc", icon: "➗", cat: "Math", desc: "Perform advanced mathematical operations including trigonometry and logarithms." },
    { id: "emi-calculator", name: "EMI Calc", icon: "🏦", cat: "Finance", desc: "Plan your loan repayment accurately with monthly EMI breakdowns." },
    { id: "tip-calculator", name: "Tip Calc", icon: "💰", cat: "Finance", desc: "Calculate precise restaurant tips and split bills effortlessly." },
    { id: "percentage-calculator", name: "Percentage", icon: "🔢", cat: "Math", desc: "Quickly compute percentages for discounts, tips, and data analysis." },
    { id: "age-calculator", name: "Age Calc", icon: "🎂", cat: "Utilities", desc: "Find your exact age in years, months, and days with high precision." },
    { id: "bmi-calculator", name: "BMI Calc", icon: "💪", cat: "Health", desc: "Examine your Body Mass Index for a healthier lifestyle." },
    { id: "daily-calorie-calculator", name: "Calorie Calc", icon: "🔥", cat: "Health", desc: "Estimate everyday calorie needs for weight maintenance and goals." },
    { id: "password-generator", name: "Password Gen", icon: "🔑", cat: "Security", desc: "Create robust, secure passwords to shield your digital accounts." }
];

let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Utilo - Premium Free Online Tools</title>
    <meta id="meta-desc" name="description" content="Fast, Accurate & Easy to Use Online Tools for your daily needs." />
    <meta name="keywords" content="online tools, calculator, converter, free tools, utilo" />
    <meta property="og:title" id="og-title" content="Utilo - Premium Free Online Tools" />
    <meta property="og:type" content="website" />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='%2314b8a6'/%3E%3Cpath d='M25 50a25 25 0 1 1 50 0 25 25 0 1 1-50 0' fill='none' stroke='white' stroke-width='10' stroke-dasharray='15 10'/%3E%3Ccircle cx='50' cy='50' r='10' fill='white'/%3E%3C/svg%3E" />
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: { teal: { 50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e', 800: '#115e59', 900: '#134e4a' } },
                    fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'], mono: ['JetBrains Mono', 'monospace'] },
                },
            },
        };
    </script>
    <style>
        .view { display: none; }
        .view.active { display: block; animation: fadeIn 0.3s ease; }
        .tool-section { display: none; }
        .tool-section.active { display: block; opacity: 1; animation: fadeIn 0.3s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        html { scroll-behavior: smooth; }
        .glass-input { width: 100%; background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 1rem; padding: 0.75rem 1rem; font-weight: 600; color: #1e293b; outline: none; transition: all 0.2s; }
        .glass-input:focus { border-color: #2dd4bf; background: #fff; box-shadow: 0 0 0 4px rgba(45,212,191,0.1); }
        .label-text { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 0.35rem; display: block; }
        .calc-btn { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 0.75rem; font-weight: 600; color: #334155; transition: all 0.1s; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .calc-btn:active { transform: scale(0.95); background: #e2e8f0; }
        .calc-btn:hover { background: #f1f5f9; border-color: #cbd5e1; }
        .result-box { background: linear-gradient(135deg, #14b8a6, #0d9488); border-radius: 1.25rem; padding: 1.5rem; text-align: center; color: white; display:flex; flex-direction: column; justify-content:center; align-items:center; box-shadow: 0 4px 6px -1px rgba(20, 184, 166, 0.2); }
        
        /* Accordion CSS for SEO */
        details { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 0.75rem; padding: 0.75rem 1.25rem; margin-bottom: 0.75rem; box-shadow: 0 1px 2px 0 rgba(0,0,0,0.02); transition: all 0.3s ease; }
        details[open] { border-color: #99f6e4; box-shadow: 0 4px 6px -1px rgba(20,184,166,0.1); }
        summary { font-weight: 600; color: #1e293b; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; outline: none; }
        summary::-webkit-details-marker { display: none; }
        summary::after { content: "+"; font-size: 1.25rem; color: #14b8a6; font-weight: 400; transition: transform 0.3s ease; }
        details[open] summary::after { transform: rotate(45deg); }
        details p, details ul { color: #475569; font-size: 0.9rem; margin-top: 0.75rem; line-height: 1.6; }
        details ul { list-style-type: disc; padding-left: 1.5rem; }
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .spin-hover:hover { animation: spin3d 1.5s linear infinite; }
        @keyframes spin3d {
            0% { transform: rotate3d(0, 1, 0, 0deg) rotate(0deg); }
            50% { transform: rotate3d(0, 1, 0, 180deg) rotate(90deg); }
            100% { transform: rotate3d(0, 1, 0, 360deg) rotate(180deg); }
        }
    </style>
</head>
<body class="text-slate-800 flex flex-col antialiased bg-slate-50 min-h-screen">

<!-- Header -->
<header class="bg-white/90 backdrop-blur-xl shadow-sm sticky top-0 z-50 border-b border-slate-100 h-16 flex items-center">
    <div class="max-w-6xl mx-auto px-4 w-full flex items-center justify-between gap-4">
        <a href="#" onclick="showHome(event)" class="text-2xl font-extrabold text-slate-900 flex items-center gap-2 group tracking-tight">
            <div class="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl shadow-md transition-transform spin-hover">
                <svg viewBox="0 0 100 100" class="w-7 h-7 text-white"><path d="M25 50a25 25 0 1 1 50 0 25 25 0 1 1-50 0" fill="none" stroke="currentColor" stroke-width="12" stroke-dasharray="15 10"/><circle cx="50" cy="50" r="12" fill="currentColor"/></svg>
            </div>
            Utilo
        </a>
        <div id="search-wrapper" class="flex-1 max-w-sm relative transition-all duration-300">
            <input type="text" id="global-search" placeholder="Search tools..." class="w-full bg-slate-100/70 border-none py-2.5 pl-10 pr-4 rounded-xl text-sm font-medium outline-none focus:bg-white focus:ring-2 focus:ring-teal-400/50" autocomplete="off" oninput="doSearch(this.value)" />
            <svg class="w-4 h-4 text-slate-400 absolute left-3.5 top-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <button id="back-btn" onclick="showHome(event)" class="hidden text-sm font-bold text-slate-600 hover:text-teal-700 bg-white border border-slate-200 shadow-sm hover:bg-teal-50 px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all w-[150px] justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg> Back to Tools
        </button>
    </div>
</header>

<main class="flex-grow flex flex-col relative w-full pt-6 sm:pt-10 pb-16 min-h-[calc(100vh-140px)]">
    <div class="max-w-6xl mx-auto px-4 w-full h-full flex flex-col lg:flex-row gap-8">
        
        <!-- Permanent Sidebar (Desktop only) -->
        <aside class="w-full lg:w-64 flex-shrink-0 hidden lg:block">
            <div class="bg-white rounded-[1.25rem] shadow-sm border border-slate-100 p-4 sticky top-24 max-h-[80vh] overflow-y-auto no-scrollbar">
                <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest pl-3 mb-3">All Tools</h3>
                <nav id="sidebar-nav" class="flex flex-col gap-1"></nav>
            </div>
        </aside>

        <!-- Main Content Area -->
        <div class="flex-1 w-full min-w-0">
            <!-- Home View -->
            <div id="home-view" class="view active w-full">
                <div class="mb-8 pl-1 text-center sm:text-left">
                    <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2">
                        Premium Free Online Tools
                    </h1>
                    <p class="text-slate-500 text-base font-medium">Fast, reliable, completely free, and functioning securely in your browser.</p>
                </div>
                <div id="tools-grid" class="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5"></div>
            </div>

            <!-- Tool View -->
            <div id="tool-view" class="view w-full">
                <!-- Tool Sections Container -->
                <div id="tools-container" class="bg-white rounded-[1.5rem] shadow-sm border border-slate-100 overflow-hidden relative">
                    <!-- Tools content will be placed here -->
                    
                    <!-- 1. World Clock -->
                    <div id="tool-world-clock" class="tool-section p-6 sm:p-10">
                        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight mb-6">World Clock</h1>
                        <div class="flex gap-2 max-w-sm mb-6">
                            <input type="text" id="clock-city-search" placeholder="City or Timezone (e.g. Paris)" class="glass-input flex-1" />
                            <button onclick="addClockCity()" class="calc-btn px-4 bg-teal-50 text-teal-700 hover:bg-teal-100 border-teal-200">Add</button>
                        </div>
                        <div id="clock-grid" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <!-- Dynamic Clocks -->
                        </div>
                    </div>

                    <!-- 2. Currency Converter -->
                    <div id="tool-currency-converter" class="tool-section p-6 sm:p-10">
                        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight mb-6">Currency Converter</h1>
                        <div class="space-y-4 max-w-lg">
                            <div><label class="label-text">Amount</label><input type="number" id="curr-amount" value="1" class="glass-input text-lg font-bold" oninput="calcCurr()" /></div>
                            <div class="flex flex-col sm:flex-row items-center gap-3">
                                <div class="w-full">
                                    <label class="label-text">From</label>
                                    <select id="curr-from" class="glass-input font-bold" onchange="calcCurr()"></select>
                                </div>
                                <button onclick="swapCurr()" class="calc-btn mt-0 sm:mt-5 p-3 rounded-xl bg-teal-50 text-teal-600 border-teal-100 hover:bg-teal-100 flex-shrink-0"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M16 3h5v5M4 21h5v-5M21 3l-7 7M3 21l7-7"/></svg></button>
                                <div class="w-full">
                                    <label class="label-text">To</label>
                                    <select id="curr-to" class="glass-input font-bold" onchange="calcCurr()"></select>
                                </div>
                            </div>
                            <div class="result-box mt-4 !items-start !text-left !px-6 !py-5">
                                <p class="text-[11px] font-bold text-teal-100 uppercase tracking-widest mb-1">Converted Amount</p>
                                <p id="curr-res" class="text-4xl font-black tracking-tight font-mono w-full break-all">...</p>
                                <p id="curr-info" class="text-sm font-medium text-teal-100 mt-2">Loading rates...</p>
                            </div>
                        </div>
                    </div>

                    <!-- 3. Unit Converter -->
                    <div id="tool-unit-converter" class="tool-section p-6 sm:p-10">
                        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight mb-6">Unit Converter</h1>
                        <div class="space-y-4 max-w-lg">
                            <div>
                                <label class="label-text">Category</label>
                                <select id="unit-type" class="glass-input mb-2" onchange="updateUnits()">
                                    <option value="length">Length</option>
                                    <option value="weight">Weight</option>
                                    <option value="temperature">Temperature</option>
                                    <option value="area">Area</option>
                                    <option value="volume">Volume</option>
                                    <option value="speed">Speed</option>
                                </select>
                            </div>
                            <div><label class="label-text">Value to Convert</label><input type="number" id="unit-val" value="1" class="glass-input font-bold text-lg" oninput="calcUnit()" /></div>
                            <div class="flex flex-col sm:flex-row gap-3">
                                <div class="w-full"><label class="label-text">From</label><select id="unit-from" class="glass-input font-bold uppercase transition-all" onchange="calcUnit()"></select></div>
                                <div class="w-full"><label class="label-text">To</label><select id="unit-to" class="glass-input font-bold uppercase transition-all" onchange="calcUnit()"></select></div>
                            </div>
                            <div class="result-box mt-4">
                                <p class="text-[11px] font-bold text-teal-100 uppercase tracking-widest mb-1">Result</p>
                                <p id="unit-res" class="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white mt-1 break-all">0</p>
                            </div>
                        </div>
                    </div>

                    <!-- 4. Scientific Calc (Teal/Light Theme) -->
                    <div id="tool-scientific-calculator" class="tool-section p-6 sm:p-8 m-1 sm:m-2">
                        <h1 class="text-3xl font-extrabold tracking-tight mb-6 text-slate-900">Scientific Calculator</h1>
                        <div class="max-w-sm mx-auto bg-slate-100 p-4 rounded-3xl border border-slate-200 shadow-sm">
                            <div class="bg-white border-2 border-slate-200 rounded-2xl p-4 mb-4 text-right shadow-sm flex flex-col justify-end min-h-[6.5rem]">
                                <div id="calc-exp" class="text-slate-400 text-sm font-semibold tracking-wider font-mono h-5 mb-1 overflow-hidden"></div>
                                <div id="calc-res" class="text-4xl font-black tracking-tight font-mono text-slate-800 overflow-hidden">0</div>
                            </div>
                            <div class="grid grid-cols-4 gap-2">
                                <button onclick="ca('sin(')" class="calc-btn !bg-white hover:!bg-teal-50 !text-slate-600 !border-slate-200 py-3">sin</button>
                                <button onclick="ca('cos(')" class="calc-btn !bg-white hover:!bg-teal-50 !text-slate-600 !border-slate-200 py-3">cos</button>
                                <button onclick="ca('tan(')" class="calc-btn !bg-white hover:!bg-teal-50 !text-slate-600 !border-slate-200 py-3">tan</button>
                                <button onclick="ce()" class="calc-btn !bg-rose-50 hover:!bg-rose-100 !text-rose-600 !border-rose-200 py-3 font-bold">C</button>
                                
                                <button onclick="ca('log(')" class="calc-btn !bg-white hover:!bg-teal-50 !text-slate-600 !border-slate-200 py-3">log</button>
                                <button onclick="ca('ln(')" class="calc-btn !bg-white hover:!bg-teal-50 !text-slate-600 !border-slate-200 py-3">ln</button>
                                <button onclick="ca('(')" class="calc-btn !bg-white hover:!bg-teal-50 !text-slate-600 !border-slate-200 py-3">(</button>
                                <button onclick="ca(')')" class="calc-btn !bg-white hover:!bg-teal-50 !text-slate-600 !border-slate-200 py-3">)</button>

                                <button onclick="ca('sqrt(')" class="calc-btn !bg-white hover:!bg-teal-50 !text-slate-600 !border-slate-200 py-3">√</button>
                                <button onclick="ca('^')" class="calc-btn !bg-white hover:!bg-teal-50 !text-slate-600 !border-slate-200 py-3">^</button>
                                <button onclick="ca('Math.PI')" class="calc-btn !bg-white hover:!bg-teal-50 !text-slate-600 !border-slate-200 py-3 font-serif italic text-lg">π</button>
                                <button onclick="cDel()" class="calc-btn !bg-amber-50 hover:!bg-amber-100 !text-amber-600 !border-amber-200 py-3 font-bold">DEL</button>
                                
                                <button onclick="ca('7')" class="calc-btn !bg-white hover:!bg-slate-50 !text-slate-800 !border-slate-200 shadow-sm py-3 text-xl">7</button>
                                <button onclick="ca('8')" class="calc-btn !bg-white hover:!bg-slate-50 !text-slate-800 !border-slate-200 shadow-sm py-3 text-xl">8</button>
                                <button onclick="ca('9')" class="calc-btn !bg-white hover:!bg-slate-50 !text-slate-800 !border-slate-200 shadow-sm py-3 text-xl">9</button>
                                <button onclick="ca('/')" class="calc-btn !bg-teal-50 hover:!bg-teal-100 !text-teal-700 !border-teal-200 py-3 text-2xl font-medium">÷</button>
                                
                                <button onclick="ca('4')" class="calc-btn !bg-white hover:!bg-slate-50 !text-slate-800 !border-slate-200 shadow-sm py-3 text-xl">4</button>
                                <button onclick="ca('5')" class="calc-btn !bg-white hover:!bg-slate-50 !text-slate-800 !border-slate-200 shadow-sm py-3 text-xl">5</button>
                                <button onclick="ca('6')" class="calc-btn !bg-white hover:!bg-slate-50 !text-slate-800 !border-slate-200 shadow-sm py-3 text-xl">6</button>
                                <button onclick="ca('*')" class="calc-btn !bg-teal-50 hover:!bg-teal-100 !text-teal-700 !border-teal-200 py-3 text-2xl font-medium">×</button>

                                <button onclick="ca('1')" class="calc-btn !bg-white hover:!bg-slate-50 !text-slate-800 !border-slate-200 shadow-sm py-3 text-xl">1</button>
                                <button onclick="ca('2')" class="calc-btn !bg-white hover:!bg-slate-50 !text-slate-800 !border-slate-200 shadow-sm py-3 text-xl">2</button>
                                <button onclick="ca('3')" class="calc-btn !bg-white hover:!bg-slate-50 !text-slate-800 !border-slate-200 shadow-sm py-3 text-xl">3</button>
                                <button onclick="ca('-')" class="calc-btn !bg-teal-50 hover:!bg-teal-100 !text-teal-700 !border-teal-200 py-3 text-2xl font-medium">−</button>

                                <button onclick="ca('0')" class="calc-btn !bg-white hover:!bg-slate-50 !text-slate-800 !border-slate-200 shadow-sm py-3 text-xl">0</button>
                                <button onclick="ca('.')" class="calc-btn !bg-white hover:!bg-slate-50 !text-slate-800 !border-slate-200 shadow-sm py-3 text-xl font-bold">.</button>
                                <button onclick="cEq()" class="calc-btn !bg-teal-500 hover:!bg-teal-600 !text-white !border-teal-600 shadow-md py-3 text-2xl font-bold">=</button>
                                <button onclick="ca('+')" class="calc-btn !bg-teal-50 hover:!bg-teal-100 !text-teal-700 !border-teal-200 py-3 text-2xl font-medium">+</button>
                            </div>
                        </div>
                    </div>

                    <!-- 5. EMI Calculator -->
                    <div id="tool-emi-calculator" class="tool-section p-6 sm:p-10">
                        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight mb-6">EMI Calculator</h1>
                        <div class="space-y-4 max-w-lg">
                            <div><label class="label-text">Loan Amount</label><input type="number" id="emi-p" value="10000" class="glass-input font-bold" oninput="calcEmi()"/></div>
                            <div class="grid grid-cols-2 gap-4">
                                <div><label class="label-text">Interest Rate (%)</label><input type="number" id="emi-r" value="10" step="0.1" class="glass-input font-bold" oninput="calcEmi()"/></div>
                                <div><label class="label-text">Tenure (Years)</label><input type="number" id="emi-n" value="5" class="glass-input font-bold" oninput="calcEmi()"/></div>
                            </div>
                            <div class="result-box mt-4 border-2 border-teal-500 bg-teal-50 !text-teal-900 !bg-none">
                                <p class="text-xs font-bold text-teal-600 uppercase tracking-widest mb-1">Monthly EMI</p>
                                <p id="emi-res" class="text-4xl font-black font-mono break-all text-teal-800">---</p>
                                <div class="mt-4 pt-4 border-t border-teal-200/50 w-full flex justify-between px-2">
                                    <span class="text-sm font-bold text-teal-600">Total Interest</span>
                                    <span id="emi-total" class="text-sm font-bold font-mono text-teal-800 break-all">---</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 6. Tip Calculator -->
                    <div id="tool-tip-calculator" class="tool-section p-6 sm:p-10">
                        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight mb-6">Tip Calculator</h1>
                        <div class="space-y-4 max-w-lg">
                            <div><label class="label-text">Bill Amount</label><input type="number" id="tip-amt" value="50" class="glass-input font-bold" oninput="calcTip()"/></div>
                            <div class="grid grid-cols-2 gap-4">
                                <div><label class="label-text">Tip Percentage (%)</label><input type="number" id="tip-perc" value="15" class="glass-input font-bold" oninput="calcTip()"/></div>
                                <div><label class="label-text">Number of People</label><input type="number" id="tip-ppl" value="2" min="1" class="glass-input font-bold" oninput="calcTip()"/></div>
                            </div>
                            <div class="result-box mt-4 border-2 border-teal-500 bg-teal-50 !text-teal-900 !bg-none">
                                <p class="text-xs font-bold text-teal-600 uppercase tracking-widest mb-1">Per Person</p>
                                <p id="tip-res" class="text-4xl font-black font-mono break-all text-teal-800">---</p>
                                <div class="mt-4 pt-4 border-t border-teal-200/50 w-full flex justify-between px-2">
                                    <span class="text-sm font-bold text-teal-600">Total Bill (w/ Tip)</span>
                                    <span id="tip-tot" class="text-sm font-bold font-mono text-teal-800 break-all">---</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 7. Percentage Calculator -->
                    <div id="tool-percentage-calculator" class="tool-section p-6 sm:p-10">
                        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight mb-6">Percentage Calculator</h1>
                        <div class="space-y-6 max-w-lg">
                            <div class="bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
                                <div class="absolute left-0 top-0 bottom-0 w-1 bg-teal-400"></div>
                                <div class="flex flex-wrap items-center gap-3">
                                    <span class="font-bold text-slate-500">What is</span>
                                    <input type="number" id="p1" value="20" class="glass-input !w-24 px-2 text-center" oninput="calcPerc()" />
                                    <span class="font-bold text-slate-500">% of</span>
                                    <input type="number" id="p2" value="150" class="glass-input !w-32 px-2 text-center" oninput="calcPerc()" />
                                </div>
                                <div class="mt-5 flex items-center justify-between border-t border-slate-200 pt-4">
                                    <span class="text-sm font-bold text-slate-400 uppercase tracking-wider">Result</span>
                                    <span id="p-res1" class="text-3xl font-black text-teal-600 font-mono break-all pl-4 text-right">30</span>
                                </div>
                            </div>
                            
                            <div class="bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
                                <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-400"></div>
                                <div class="flex flex-wrap items-center gap-3">
                                    <input type="number" id="p3" value="50" class="glass-input !w-24 px-2 text-center" oninput="calcPerc()" />
                                    <span class="font-bold text-slate-500">is what % of</span>
                                    <input type="number" id="p4" value="200" class="glass-input !w-32 px-2 text-center" oninput="calcPerc()" />
                                </div>
                                <div class="mt-5 flex items-center justify-between border-t border-slate-200 pt-4">
                                    <span class="text-sm font-bold text-slate-400 uppercase tracking-wider">Result</span>
                                    <span id="p-res2" class="text-3xl font-black text-blue-600 font-mono break-all pl-4 text-right">25%</span>
                                </div>
                            </div>

                            <div class="bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
                                <div class="absolute left-0 top-0 bottom-0 w-1 bg-purple-400"></div>
                                <div class="flex flex-wrap items-center gap-3">
                                    <span class="font-bold text-slate-500">Change from</span>
                                    <input type="number" id="p5" value="100" class="glass-input !w-24 px-2 text-center" oninput="calcPerc()" />
                                    <span class="font-bold text-slate-500">to</span>
                                    <input type="number" id="p6" value="120" class="glass-input !w-24 px-2 text-center" oninput="calcPerc()" />
                                </div>
                                <div class="mt-5 flex items-center justify-between border-t border-slate-200 pt-4">
                                    <span class="text-sm font-bold text-slate-400 uppercase tracking-wider">Result</span>
                                    <span id="p-res3" class="text-3xl font-black text-purple-600 font-mono break-all pl-4 text-right">+20%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 8. Age Calculator -->
                    <div id="tool-age-calculator" class="tool-section p-6 sm:p-10">
                        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight mb-6">Age Calculator</h1>
                        <div class="space-y-5 max-w-md mx-auto">
                            <div><label class="label-text text-center">Enter Date of Birth</label><input type="date" id="age-dob" class="glass-input font-mono !py-4 !text-xl text-center" onchange="calcAge()"/></div>
                            <div class="result-box mt-4 shadow-sm border border-teal-100 !bg-none bg-teal-500">
                                <div class="flex gap-2 sm:gap-6 justify-center w-full">
                                    <div class="text-center flex-1"><span id="age-y" class="text-4xl sm:text-5xl font-black font-mono">0</span><p class="text-[10px] uppercase tracking-widest font-bold opacity-80 mt-1">Years</p></div>
                                    <div class="w-px bg-teal-100/30"></div>
                                    <div class="text-center flex-1"><span id="age-m" class="text-4xl sm:text-5xl font-black font-mono">0</span><p class="text-[10px] uppercase tracking-widest font-bold opacity-80 mt-1">Months</p></div>
                                    <div class="w-px bg-teal-100/30"></div>
                                    <div class="text-center flex-1"><span id="age-d" class="text-4xl sm:text-5xl font-black font-mono">0</span><p class="text-[10px] uppercase tracking-widest font-bold opacity-80 mt-1">Days</p></div>
                                </div>
                            </div>
                            <div id="age-msg" class="text-center text-sm font-bold text-rose-500 hidden pt-2">Date of birth cannot be in the future!</div>
                        </div>
                    </div>

                    <!-- 9. BMI Calculator -->
                    <div id="tool-bmi-calculator" class="tool-section p-6 sm:p-10">
                        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight mb-6">BMI Calculator</h1>
                        <div class="space-y-5 max-w-sm mx-auto">
                            <div class="flex bg-slate-100 p-1 rounded-xl">
                                <label class="flex-1 cursor-pointer">
                                    <input type="radio" name="bmi-sys" value="metric" checked class="hidden peer" onchange="updBMI()">
                                    <div class="text-center py-2 rounded-lg font-bold text-slate-500 peer-checked:bg-white peer-checked:text-teal-600 peer-checked:shadow-sm transition-all text-sm">Metric</div>
                                </label>
                                <label class="flex-1 cursor-pointer">
                                    <input type="radio" name="bmi-sys" value="imperial" class="hidden peer" onchange="updBMI()">
                                    <div class="text-center py-2 rounded-lg font-bold text-slate-500 peer-checked:bg-white peer-checked:text-teal-600 peer-checked:shadow-sm transition-all text-sm">Imperial</div>
                                </label>
                            </div>
                            <div id="bmi-met" class="space-y-4">
                                <div><label class="label-text">Weight (kg)</label><input type="number" id="bmi-kg" value="70" class="glass-input font-bold" oninput="calcBmi()"/></div>
                                <div><label class="label-text">Height (cm)</label><input type="number" id="bmi-cm" value="175" class="glass-input font-bold" oninput="calcBmi()"/></div>
                            </div>
                            <div id="bmi-imp" class="hidden space-y-4">
                                <div><label class="label-text">Weight (lbs)</label><input type="number" id="bmi-lb" value="150" class="glass-input font-bold" oninput="calcBmi()"/></div>
                                <div><label class="label-text">Height (inches)</label><input type="number" id="bmi-in" value="68" class="glass-input font-bold" oninput="calcBmi()"/></div>
                            </div>
                            <div class="result-box mt-4 border-2 border-teal-500 bg-teal-50 !text-teal-900 !bg-none">
                                <p class="text-[11px] font-bold text-teal-600 uppercase tracking-widest mb-1">Your BMI</p>
                                <p id="bmi-res" class="text-5xl font-black font-mono text-teal-800">22.9</p>
                                <p id="bmi-cat" class="text-xs font-black bg-white text-teal-700 px-4 py-1.5 rounded-full mt-3 uppercase tracking-widest shadow-sm">Normal Weight</p>
                            </div>
                        </div>
                    </div>

                    <!-- 10. Calorie Calculator -->
                    <div id="tool-daily-calorie-calculator" class="tool-section p-6 sm:p-10">
                        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight mb-6">Daily Calorie Calc</h1>
                        <div class="space-y-4 max-w-md mx-auto">
                            <div><label class="label-text">Gender</label><select id="cal-g" class="glass-input font-bold" onchange="calcCal()"><option value="m">Male</option><option value="f">Female</option></select></div>
                            <div class="grid grid-cols-2 gap-4">
                                <div><label class="label-text">Age</label><input type="number" id="cal-a" value="25" class="glass-input font-bold" oninput="calcCal()"/></div>
                                <div><label class="label-text">Weight (kg)</label><input type="number" id="cal-w" value="70" class="glass-input font-bold" oninput="calcCal()"/></div>
                            </div>
                            <div><label class="label-text">Height (cm)</label><input type="number" id="cal-h" value="175" class="glass-input font-bold" oninput="calcCal()"/></div>
                            <div><label class="label-text">Activity Level</label><select id="cal-act" class="glass-input font-semibold" onchange="calcCal()">
                                <option value="1.2">Sedentary (Little/no exercise)</option>
                                <option value="1.375">Lightly active (1-3 days/wk)</option>
                                <option value="1.55">Moderately active (3-5 days/wk)</option>
                                <option value="1.725">Very active (6-7 days/wk)</option>
                                <option value="1.9">Extra active (Physical job)</option>
                            </select></div>
                            <div class="result-box mt-6 border-2 border-teal-500 bg-teal-50 !text-teal-900 !py-6 !bg-none">
                                <p class="text-[11px] font-bold text-teal-600 uppercase tracking-widest mb-1">Calories to Maintain Weight</p>
                                <div class="flex items-baseline gap-2">
                                    <p id="cal-res" class="text-5xl font-black font-mono text-teal-800">---</p>
                                    <p class="text-sm font-bold text-teal-600 uppercase">kcal/day</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 11. Password Generator -->
                    <div id="tool-password-generator" class="tool-section p-6 sm:p-10">
                        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight mb-6">Password Gen</h1>
                        <div class="space-y-6 max-w-md mx-auto">
                            <div class="relative group">
                                <div id="pass-res" class="glass-input text-center text-xl sm:text-2xl font-mono tracking-widest py-6 break-all shadow-sm border-teal-200 bg-teal-50 text-teal-900"></div>
                                <button onclick="copyPass()" id="copy-btn" class="absolute right-2 top-2 bottom-2 px-5 bg-teal-500 hover:bg-teal-600 text-white rounded-xl text-sm font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer">Copy</button>
                            </div>
                            <div class="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                                <label class="flex justify-between items-center label-text mb-4"><span>Length</span> <span id="pass-len-lbl" class="font-mono text-lg text-teal-600 font-black bg-white px-2 py-0.5 rounded shadow-sm border border-slate-200">16</span></label>
                                <input type="range" id="pass-len" min="6" max="64" value="16" class="w-full accent-teal-500 cursor-pointer" oninput="document.getElementById('pass-len-lbl').innerText=this.value; genPass();"/>
                            </div>
                            <div class="grid grid-cols-2 gap-3 mt-4">
                                <label class="flex items-center justify-between cursor-pointer bg-white p-4 rounded-xl border border-slate-200 hover:border-teal-400 transition-colors shadow-sm"><span class="text-sm font-bold text-slate-700">Uppercase</span> <input type="checkbox" id="pass-u" checked class="w-5 h-5 accent-teal-500" onchange="genPass()"/></label>
                                <label class="flex items-center justify-between cursor-pointer bg-white p-4 rounded-xl border border-slate-200 hover:border-teal-400 transition-colors shadow-sm"><span class="text-sm font-bold text-slate-700">Numbers</span> <input type="checkbox" id="pass-n" checked class="w-5 h-5 accent-teal-500" onchange="genPass()"/></label>
                                <label class="flex items-center justify-between cursor-pointer bg-white p-4 rounded-xl border border-slate-200 hover:border-teal-400 transition-colors shadow-sm col-span-2"><span class="text-sm font-bold text-slate-700">Special Symbols</span> <input type="checkbox" id="pass-s" checked class="w-5 h-5 accent-teal-500" onchange="genPass()"/></label>
                            </div>
                            <button onclick="genPass()" class="calc-btn w-full py-4 mt-2 !bg-slate-900 hover:!bg-slate-800 !text-white !border-slate-800 text-lg shadow-md transition-all">Generate New Password</button>
                        </div>
                    </div>
                    
                    <!-- Dynamic SEO Content Place -->
                    <div id="seo-content" class="px-6 pb-10 sm:px-10 mt-8 pt-8 border-t border-slate-100 bg-slate-50/50 hidden"></div>

                </div>
            </div>
        </div>
    </div>
</main>

<footer class="bg-white border-t border-slate-200 mt-auto">
    <div class="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-sm font-bold text-slate-400">© 2026 Utilo. All rights reserved.</p>
        <div class="flex gap-6 text-sm font-bold text-slate-500">
            <a href="#" class="hover:text-teal-600 transition-colors">Privacy</a>
            <a href="#" class="hover:text-teal-600 transition-colors">Terms</a>
            <a href="#" class="hover:text-teal-600 transition-colors">Contact</a>
        </div>
    </div>
</footer>

<script>
    const tools = ${JSON.stringify(tools)};
    
    // Core Navigation & Rendering
    function showHome(e) {
        if(e) e.preventDefault();
        window.history.pushState(null, null, ' ');
        document.title = "Utilo - Premium Free Online Tools";
        document.getElementById('meta-desc').content = "Fast, Accurate & Easy to Use Online Tools for your daily needs.";
        
        document.getElementById('home-view').classList.add('active');
        document.getElementById('tool-view').classList.remove('active');
        
        document.getElementById('back-btn').classList.add('hidden');
        document.getElementById('search-wrapper').classList.remove('hidden');
        
        renderGrid(tools);
        updateSidebarActive('');
        window.scrollTo({top:0, behavior:'smooth'});
    }

    function renderGrid(list) {
        const grid = document.getElementById('tools-grid');
        grid.innerHTML = list.length ? list.map(t => \`<div onclick="showTool('\${t.id}')" class="bg-white p-5 sm:p-6 rounded-[1.25rem] cursor-pointer flex flex-col items-center text-center gap-3 relative overflow-hidden group shadow-sm border border-slate-100 hover:border-teal-300 hover:shadow-md transition-all duration-300">
            <div class="text-4xl p-4 bg-slate-50 rounded-2xl group-hover:bg-teal-50 group-hover:scale-110 transition-all duration-300 relative z-10 border border-slate-100 group-hover:border-teal-100">\${t.icon}</div>
            <h3 class="font-extrabold text-slate-800 text-base sm:text-lg leading-tight relative z-10 mt-1 group-hover:text-teal-700 transition-colors">\${t.name}</h3>
            <span class="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-slate-100 text-slate-500 group-hover:bg-teal-100 group-hover:text-teal-700 rounded-md transition-colors">\${t.cat}</span>
        </div>\`).join('') : '<p class="col-span-full text-center text-slate-500 py-10 font-medium">No tools found matching your search.</p>';
    }

    function renderSidebar() {
        const nav = document.getElementById('sidebar-nav');
        nav.innerHTML = tools.map(t => \`<button id="nav-\${t.id}" onclick="showTool('\${t.id}')" class="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-xl transition-all border border-transparent text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-slate-50/0">
            <span class="text-lg">\${t.icon}</span> <span class="truncate">\${t.name}</span>
        </button>\`).join('');
    }

    function updateSidebarActive(id) {
        document.querySelectorAll('#sidebar-nav button').forEach(el => {
            el.className = "flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-xl transition-all border border-transparent text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900";
        });
        if(id) {
            const activeNav = document.getElementById('nav-' + id);
            if(activeNav) {
                activeNav.className = "flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-xl transition-all border border-teal-200 bg-teal-50 text-teal-800 font-bold shadow-sm";
            }
        }
    }

    function showTool(id) {
        const toolMeta = tools.find(t => t.id === id);
        if(!toolMeta) return;

        window.history.pushState(null, null, '#' + id);
        document.title = "Free Online " + toolMeta.name + " | Utilo";
        document.getElementById('meta-desc').content = toolMeta.desc;
        
        document.getElementById('home-view').classList.remove('active');
        document.getElementById('tool-view').classList.add('active');
        
        document.getElementById('back-btn').classList.remove('hidden');
        document.getElementById('search-wrapper').classList.add('hidden');

        // Hide all tool sections
        document.querySelectorAll('.tool-section').forEach(el => el.classList.remove('active'));
        // Show target
        const target = document.getElementById('tool-' + id);
        if(target) target.classList.add('active');
        
        updateSidebarActive(id);
        
        // Render SEO Content beautifully
        const seoDiv = document.getElementById('seo-content');
        seoDiv.classList.remove('hidden');
        seoDiv.innerHTML = \`
            <div class="max-w-2xl mx-auto">
                <h2 class="text-xl font-extrabold text-slate-800 mb-2">About \${toolMeta.name}</h2>
                <p class="text-slate-600 text-sm mb-8 leading-relaxed font-medium">\${toolMeta.desc} We designed this tool to be incredibly fast, operating entirely within your browser to ensure absolute privacy and security. By processing data locally, there is no waiting for server responses, providing you with real-time, accurate results instantly. It perfectly adapts to your mobile and desktop screens without any visual clutter or lag.</p>
                <h3 class="text-lg font-extrabold text-slate-800 mb-4">Frequently Asked Questions</h3>
                <div class="space-y-3">
                    <details class="group rounded-xl">
                        <summary class="font-bold text-slate-700 bg-white hover:bg-teal-50 transition-colors p-4 rounded-xl border border-slate-200 group-open:border-teal-200 group-open:bg-teal-50 group-open:rounded-b-none group-open:text-teal-800 outline-none">Is this tool free to use?</summary>
                        <p class="px-5 pb-5 pt-3 font-medium text-slate-600 border border-t-0 border-teal-200 rounded-b-xl bg-white">Yes, all features of this tool are completely free, with no hidden charges, subscriptions, or intrusive ads.</p>
                    </details>
                    <details class="group rounded-xl">
                        <summary class="font-bold text-slate-700 bg-white hover:bg-teal-50 transition-colors p-4 rounded-xl border border-slate-200 group-open:border-teal-200 group-open:bg-teal-50 group-open:rounded-b-none group-open:text-teal-800 outline-none">Is my data secure?</summary>
                        <p class="px-5 pb-5 pt-3 font-medium text-slate-600 border border-t-0 border-teal-200 rounded-b-xl bg-white">Absolutely. Calculations happen purely in your browser memory. We do not store, track, or transmit your personal data inputs over the internet.</p>
                    </details>
                    <details class="group rounded-xl">
                        <summary class="font-bold text-slate-700 bg-white hover:bg-teal-50 transition-colors p-4 rounded-xl border border-slate-200 group-open:border-teal-200 group-open:bg-teal-50 group-open:rounded-b-none group-open:text-teal-800 outline-none">Can I use it on my mobile phone?</summary>
                        <p class="px-5 pb-5 pt-3 font-medium text-slate-600 border border-t-0 border-teal-200 rounded-b-xl bg-white">Yes, the tool is heavily optimized using modern responsive design, providing a native-app-like experience across iOS and Android devices seamlessly.</p>
                    </details>
                    <details class="group rounded-xl">
                        <summary class="font-bold text-slate-700 bg-white hover:bg-teal-50 transition-colors p-4 rounded-xl border border-slate-200 group-open:border-teal-200 group-open:bg-teal-50 group-open:rounded-b-none group-open:text-teal-800 outline-none">How accurate are the results?</summary>
                        <p class="px-5 pb-5 pt-3 font-medium text-slate-600 border border-t-0 border-teal-200 rounded-b-xl bg-white">We use standard math libraries and algorithms operating with high JavaScript precision, ensuring accurate and reliable results every time you use it.</p>
                    </details>
                </div>
            </div>
        \`;

        // Reset scroll position on small screens for comfortable viewing
        window.scrollTo({top:0, behavior:'smooth'});
    }

    function doSearch(q) {
        q = q.toLowerCase();
        renderGrid(tools.filter(t => t.name.toLowerCase().includes(q) || t.cat.toLowerCase().includes(q)));
        const gSearch = document.getElementById('global-search');
        if(gSearch && gSearch.value !== q) gSearch.value = q;
    }

    // --- Specific Tool Scripts ---

    // 1. World Clock with Add City
    let clockCities = [
        { name: "New York", tz: "America/New_York" },
        { name: "London", tz: "Europe/London" },
        { name: "Dubai", tz: "Asia/Dubai" },
        { name: "Tokyo", tz: "Asia/Tokyo" }
    ];
    function renderClocks() {
        const grid = document.getElementById('clock-grid');
        grid.innerHTML = clockCities.map((c, i) => \`
            <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center relative group">
                \${i>3 ? \`<button onclick="removeClock(\${i})" class="absolute top-2 right-2 text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity">✖</button>\` : ''}
                <h3 class="text-slate-500 font-bold mb-2 uppercase tracking-wider text-xs">\${c.name}</h3>
                <p id="time-c-\${i}" class="text-3xl font-black text-slate-800 font-mono tracking-tighter">--:--:--</p>
            </div>
        \`).join('');
    }
    function updateClocks() {
        clockCities.forEach((c, i) => {
            const el = document.getElementById('time-c-' + i);
            if(el) {
                try {
                    el.innerText = new Date().toLocaleTimeString('en-US', {timeZone: c.tz, hour12: false});
                } catch(e) {
                    el.innerText = "Error";
                }
            }
        });
    }
    function addClockCity() {
        const inp = document.getElementById('clock-city-search');
        const v = inp.value.trim();
        if(!v) return;
        // Simple mapping, normally would use a timezone API, but let's support some common strings or standard formats.
        // If valid, pushes it. Using Intl.supportedValuesOf('timeZone') would be best if available, but for simplicity:
        try {
            new Date().toLocaleTimeString('en-US', {timeZone: v}); // Test if valid
            clockCities.push({ name: v.split('/').pop().replace('_', ' '), tz: v });
            inp.value = '';
            renderClocks();
        } catch(e) {
            alert("Invalid Timezone Format. Try something like 'Europe/Paris' or 'Asia/Kolkata'");
        }
    }
    function removeClock(index) {
        clockCities.splice(index, 1);
        renderClocks();
    }
    setInterval(updateClocks, 1000);
    setTimeout(renderClocks, 100);

    // 2. Currency Converter (extended list)
    const popCurrencies = ["USD", "EUR", "GBP", "INR", "PKR", "AED", "SAR", "CAD", "AUD", "JPY", "CNY", "BRL", "ZAR", "SGD", "NZD"];
    let currRates = null;
    async function initCurr() {
        // Populate dropdowns first
        const opts = popCurrencies.map(c => \`<option value="\${c}">\${c}</option>\`).join('');
        document.getElementById('curr-from').innerHTML = opts;
        document.getElementById('curr-to').innerHTML = opts;
        document.getElementById('curr-from').value = "USD";
        document.getElementById('curr-to').value = "INR";

        try {
            const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
            const data = await res.json();
            currRates = data.rates;
            calcCurr();
        } catch(e) {
            const inf = document.getElementById('curr-info');
            if(inf) inf.innerText = "Failed to load real-time rates. Please try again later.";
        }
    }
    function calcCurr() {
        if(!currRates) return;
        const a = parseFloat(document.getElementById('curr-amount').value)||0;
        const f = document.getElementById('curr-from').value;
        const t = document.getElementById('curr-to').value;
        if(currRates[f] && currRates[t]) {
            const res = (a / currRates[f]) * currRates[t];
            document.getElementById('curr-res').innerText = res.toFixed(2);
            document.getElementById('curr-info').innerText = \`Using live rate: 1 \${f} = \${(currRates[t]/currRates[f]).toFixed(4)} \${t}\`;
        } else {
            document.getElementById('curr-res').innerText = 'N/A';
        }
    }
    function swapCurr() {
        const f = document.getElementById('curr-from'), t = document.getElementById('curr-to');
        const tmp = f.value; f.value = t.value; t.value = tmp;
        calcCurr();
    }
    setTimeout(initCurr, 100);

    // 3. Unit Converter (Expanded)
    const unitMap = {
        length: { meters:1, kilometers:1000, centimeters:0.01, millimeters:0.001, inches:0.0254, feet:0.3048, yards:0.9144, miles:1609.34 },
        weight: { kilograms:1, grams:0.001, milligrams:0.000001, metric_tons:1000, pounds:0.453592, ounces:0.0283495 },
        temperature: { celsius: "c", fahrenheit: "f", kelvin: "k" },
        area: { square_meters:1, square_kilometers:1000000, hectares:10000, acres:4046.86, square_feet:0.092903, square_inches:0.00064516 },
        volume: { liters:1, milliliters:0.001, cubic_meters:1000, gallons:3.78541, quarts:0.946353, pints:0.473176, cups:0.236588 },
        speed: { "meters/second":1, "kilometers/hour":0.277778, "miles/hour":0.44704, "knots":0.514444 }
    };
    function updateUnits() {
        const t = document.getElementById('unit-type').value;
        const keys = Object.keys(unitMap[t]);
        const opts = keys.map(k => \`<option value="\${k}">\${k.replace('_', ' ')}</option>\`).join('');
        document.getElementById('unit-from').innerHTML = opts;
        document.getElementById('unit-to').innerHTML = opts;
        document.getElementById('unit-from').selectedIndex = 0;
        document.getElementById('unit-to').selectedIndex = 1;
        calcUnit();
    }
    function calcUnit() {
        const t = document.getElementById('unit-type').value;
        const v = parseFloat(document.getElementById('unit-val').value)||0;
        const f = document.getElementById('unit-from').value;
        const to = document.getElementById('unit-to').value;
        
        if (t === 'temperature') {
            let inC = 0;
            if (f === 'celsius') inC = v;
            else if (f === 'fahrenheit') inC = (v - 32) * 5/9;
            else if (f === 'kelvin') inC = v - 273.15;
            
            let out = 0;
            if (to === 'celsius') out = inC;
            else if (to === 'fahrenheit') out = (inC * 9/5) + 32;
            else if (to === 'kelvin') out = inC + 273.15;
            
            document.getElementById('unit-res').innerText = Number.isInteger(out) ? out : out.toFixed(4).replace(/\\.?0+$/,'');
            return;
        }

        const base = v * unitMap[t][f];
        let res = base / unitMap[t][to];
        document.getElementById('unit-res').innerText = Number.isInteger(res) ? res : res.toFixed(6).replace(/\\.?0+$/,'');
    }
    setTimeout(updateUnits, 100);

    // 4. Scientific Calc
    let scExp = "";
    function ca(val) {
        if(scExp === "Error") scExp = "";
        scExp += val;
        document.getElementById('calc-res').innerText = scExp;
    }
    function ce() { scExp = ""; document.getElementById('calc-res').innerText = "0"; document.getElementById('calc-exp').innerText = ""; }
    function cDel() {
        if(scExp === "Error") scExp="";
        else {
            const m = scExp.match(/(sin\\($|cos\\($|tan\\($|log\\($|ln\\($|sqrt\\($)/);
            if(m) scExp = scExp.slice(0, -m[0].length);
            else scExp = scExp.slice(0, -1);
        }
        document.getElementById('calc-res').innerText = scExp || "0";
    }
    function cEq() {
        if(!scExp) return;
        document.getElementById('calc-exp').innerText = scExp + " =";
        try {
            let e = scExp.replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-').replace(/sin\\(/g,'Math.sin(').replace(/cos\\(/g,'Math.cos(').replace(/tan\\(/g,'Math.tan(').replace(/log\\(/g,'Math.log10(').replace(/ln\\(/g,'Math.log(').replace(/sqrt\\(/g,'Math.sqrt(');
            let powMatches = 0; // simple guard
            while(e.includes('^') && powMatches < 10) {
                e = e.replace(/([\\d\\.]+)\\^([\\d\\.]+)/, 'Math.pow($1,$2)'); 
                powMatches++;
            }
            const res = new Function('return ' + e)();
            scExp = (res===Infinity || isNaN(res)) ? "Error" : parseFloat(res.toPrecision(12)).toString();
        } catch { scExp = "Error"; }
        document.getElementById('calc-res').innerText = scExp;
    }

    // 5. EMI
    function calcEmi() {
        const p = parseFloat(document.getElementById('emi-p').value)||0;
        const r = parseFloat(document.getElementById('emi-r').value)||0;
        const n = parseFloat(document.getElementById('emi-n').value)||0;
        const mr = r/12/100;
        const mn = n*12;
        let emi = 0, tot = 0;
        if(mr>0 && mn>0) {
            emi = p * mr * Math.pow(1+mr, mn)/(Math.pow(1+mr, mn)-1);
            tot = (emi * mn) - p;
        } else if (mn>0) { emi = p/mn; }
        document.getElementById('emi-res').innerText = emi.toFixed(2);
        document.getElementById('emi-total').innerText = tot.toFixed(2);
    }
    setTimeout(calcEmi, 100);

    // 6. Tip
    function calcTip() {
        const amt = parseFloat(document.getElementById('tip-amt').value)||0;
        const perc = parseFloat(document.getElementById('tip-perc').value)||0;
        const ppl = parseInt(document.getElementById('tip-ppl').value)||1;
        if(ppl < 1) return;
        const pTip = amt * (perc / 100);
        const tot = amt + pTip;
        document.getElementById('tip-res').innerText = (tot / ppl).toFixed(2);
        document.getElementById('tip-tot').innerText = tot.toFixed(2);
    }
    setTimeout(calcTip, 100);

    // 7. Percentage
    function calcPerc() {
        const p1 = parseFloat(document.getElementById('p1').value)||0, p2 = parseFloat(document.getElementById('p2').value)||0;
        const p3 = parseFloat(document.getElementById('p3').value)||0, p4 = parseFloat(document.getElementById('p4').value)||0;
        const p5 = parseFloat(document.getElementById('p5').value)||0, p6 = parseFloat(document.getElementById('p6').value)||0;
        
        document.getElementById('p-res1').innerText = ((p1/100)*p2).toFixed(2).replace(/\\.?0+$/,'');
        document.getElementById('p-res2').innerText = p4 ? ((p3/p4)*100).toFixed(2).replace(/\\.?0+$/,'') + '%' : '0%';
        
        if (p5 !== 0) {
            let diff = p6 - p5;
            let res3 = (diff / p5) * 100;
            let sign = res3 >= 0 ? '+' : '';
            document.getElementById('p-res3').innerText = sign + res3.toFixed(2).replace(/\\.?0+$/,'') + '%';
        } else {
            document.getElementById('p-res3').innerText = '0%';
        }
    }
    setTimeout(calcPerc, 100);

    // 8. Age
    function calcAge() {
        const val = document.getElementById('age-dob').value;
        if(!val) return;
        const dob = new Date(val), t = new Date();
        const ageMsg = document.getElementById('age-msg');
        
        if(isNaN(dob) || dob > t) {
            document.getElementById('age-y').innerText = "-";
            document.getElementById('age-m').innerText = "-";
            document.getElementById('age-d').innerText = "-";
            ageMsg.classList.remove('hidden');
            return;
        } else {
            ageMsg.classList.add('hidden');
        }
        
        let y = t.getFullYear() - dob.getFullYear();
        let m = t.getMonth() - dob.getMonth();
        let d = t.getDate() - dob.getDate();
        if(d < 0) {
            m--;
            d += new Date(t.getFullYear(), t.getMonth(), 0).getDate();
        }
        if(m < 0) { y--; m += 12; }
        document.getElementById('age-y').innerText = y;
        document.getElementById('age-m').innerText = m;
        document.getElementById('age-d').innerText = d;
    }
    setTimeout(() => { if(document.getElementById('age-dob')){ document.getElementById('age-dob').max = new Date().toISOString().split("T")[0]; calcAge(); } }, 100);

    // 9. BMI
    function updBMI() {
        const sys = document.querySelector('input[name="bmi-sys"]:checked').value;
        if(sys === 'metric') { document.getElementById('bmi-met').classList.remove('hidden'); document.getElementById('bmi-imp').classList.add('hidden'); }
        else { document.getElementById('bmi-met').classList.add('hidden'); document.getElementById('bmi-imp').classList.remove('hidden'); }
        calcBmi();
    }
    function calcBmi() {
        const sys = document.querySelector('input[name="bmi-sys"]:checked').value;
        let bmi = 0;
        if(sys === 'metric') {
            const kg = parseFloat(document.getElementById('bmi-kg').value)||0, cm = parseFloat(document.getElementById('bmi-cm').value)||0;
            if(cm>0) bmi = kg / Math.pow(cm/100, 2);
        } else {
            const lb = parseFloat(document.getElementById('bmi-lb').value)||0, inc = parseFloat(document.getElementById('bmi-in').value)||0;
            if(inc>0) bmi = 703 * lb / Math.pow(inc, 2);
        }
        document.getElementById('bmi-res').innerText = bmi ? bmi.toFixed(1) : '0';
        const ct = document.getElementById('bmi-cat');
        if(!bmi) { ct.innerText='-'; ct.className='hidden'; }
        else if(bmi<18.5) { ct.innerText='Underweight'; ct.className='text-[11px] font-black bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full mt-3 uppercase tracking-widest shadow-sm border border-amber-200'; }
        else if(bmi<25) { ct.innerText='Normal Weight'; ct.className='text-[11px] font-black bg-white text-teal-700 px-4 py-1.5 rounded-full mt-3 uppercase tracking-widest shadow-sm border border-teal-200'; }
        else if(bmi<30) { ct.innerText='Overweight'; ct.className='text-[11px] font-black bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full mt-3 uppercase tracking-widest shadow-sm border border-orange-200'; }
        else { ct.innerText='Obese'; ct.className='text-[11px] font-black bg-rose-100 text-rose-700 px-4 py-1.5 rounded-full mt-3 uppercase tracking-widest shadow-sm border border-rose-200'; }
    }
    setTimeout(calcBmi, 100);

    // 10. Calorie
    function calcCal() {
        const g = document.getElementById('cal-g').value, a = parseFloat(document.getElementById('cal-a').value)||0;
        const w = parseFloat(document.getElementById('cal-w').value)||0, h = parseFloat(document.getElementById('cal-h').value)||0;
        const act = parseFloat(document.getElementById('cal-act').value)||1.2;
        let bmr = 0;
        if(w>0 && h>0 && a>0) {
            bmr = g === 'm' ? (10*w + 6.25*h - 5*a + 5) : (10*w + 6.25*h - 5*a - 161);
        }
        document.getElementById('cal-res').innerText = bmr ? Math.round(bmr * act) : '---';
    }
    setTimeout(calcCal, 100);

    // 11. Password
    function genPass() {
        const len = parseInt(document.getElementById('pass-len').value)||16;
        const u = document.getElementById('pass-u').checked, n = document.getElementById('pass-n').checked, s = document.getElementById('pass-s').checked;
        let c = "abcdefghijklmnopqrstuvwxyz";
        if(u) c += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if(n) c += "0123456789";
        if(s) c += "!@#$%^&*()_+~|}{[]:;?><,./-=";
        let p = "";
        for(let i=0; i<len; i++) p += c[Math.floor(Math.random() * c.length)];
        document.getElementById('pass-res').innerText = p;
    }
    function copyPass() {
        const p = document.getElementById('pass-res').innerText;
        if(!p) return;
        navigator.clipboard.writeText(p);
        const btn = document.getElementById('copy-btn');
        btn.innerText = "Copied!";
        btn.classList.add('bg-slate-800', 'text-white');
        setTimeout(() => {
            btn.innerText = "Copy";
            btn.classList.remove('bg-slate-800', 'text-white');
        }, 2000);
    }
    setTimeout(genPass, 100);

    // Initial Routing
    window.addEventListener('popstate', () => {
        const h = window.location.hash.substring(1);
        if(h && tools.some(t => t.id === h)) showTool(h);
        else showHome();
    });
    
    document.addEventListener("DOMContentLoaded", () => {
        renderGrid(tools);
        renderSidebar();
        const h = window.location.hash.substring(1);
        if(h && tools.some(t => t.id === h)) showTool(h);
        else showHome();
    });
</script>
</body>
</html>`;

fs.writeFileSync('index.html', html);
console.log('Final SPA written to index.html successfully!');
