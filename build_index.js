import fs from 'fs';

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Utilo - All Free Online Tools</title>
    <meta name="description" content="Fast, Accurate & Easy to Use Online Tools" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        teal: { 50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e', 800: '#115e59', 900: '#134e4a' }
                    },
                    fontFamily: {
                        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
                        mono: ['JetBrains Mono', 'ui-monospace', 'monospace']
                    }
                }
            }
        }
    </script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap');
        
        body { font-family: 'Inter', sans-serif; background-color: #f8fafc; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        
        .view { display: none; opacity: 0; transition: opacity 0.3s ease; }
        .view.active { display: block; opacity: 1; }
        
        .tool-card { border: 1px solid #f1f5f9; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
        .tool-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px -8px rgba(20, 184, 166, 0.15); border-color: #99f6e4; }
        
        .tool-section { display: none; }
        .tool-section.active { display: block; animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        
        @keyframes slideUp { 
            from { opacity: 0; transform: translateY(16px); } 
            to { opacity: 1; transform: translateY(0); } 
        }

        .glass-input { background: #f8fafc; border: 1px solid #e2e8f0; transition: all 0.2s; border-radius: 0.75rem; padding: 0.75rem 1rem; width: 100%; font-weight: 500; color: #0f172a; }
        .glass-input:focus { background: #fff; border-color: #2dd4bf; box-shadow: 0 0 0 4px rgba(45, 212, 191, 0.1); outline: none; }
        
        .calc-btn { transition: transform 0.15s, background-color 0.15s, box-shadow 0.15s; }
        .calc-btn:active { transform: scale(0.92); }

        input[type=range] { -webkit-appearance: none; background: transparent; width: 100%; }
        input[type=range]:focus { outline: none; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; height: 22px; width: 22px; border-radius: 50%; background: #14b8a6; cursor: pointer; margin-top: -8px; border: 3px solid #fff; box-shadow: 0 2px 6px rgba(20,184,166,0.4); transition: transform 0.1s; }
        input[type=range]::-webkit-slider-thumb:hover { transform: scale(1.1); }
        input[type=range]::-webkit-slider-runnable-track { width: 100%; height: 6px; cursor: pointer; background: #e2e8f0; border-radius: 4px; }
        input[type=range]:focus::-webkit-slider-runnable-track { background: #cbd5e1; }
        
        .result-box { background: linear-gradient(145deg, #f0fdfa 0%, #ccfbf1 100%); border: 1px solid #99f6e4; box-shadow: inset 0 2px 4px rgba(255,255,255,0.8), 0 4px 12px -2px rgba(20,184,166,0.1); border-radius: 1rem; padding: 1.5rem; text-align: center; }
        
        .label-text { display: block; font-size: 0.875rem; font-weight: 600; color: #475569; margin-bottom: 0.375rem; }
    </style>
</head>
<body class="text-slate-800 flex flex-col antialiased selection:bg-teal-200">

<!-- Header -->
<header class="bg-white/90 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.03)] sticky top-0 z-50 border-b border-slate-100 h-16 flex items-center transition-all">
    <div class="max-w-6xl mx-auto px-4 w-full flex items-center justify-between gap-4">
        <a href="#" onclick="showHome(event)" class="text-2xl font-extrabold text-slate-900 flex items-center gap-2.5 group tracking-tight">
            <div class="bg-gradient-to-br from-teal-500 to-teal-600 text-white p-1.5 rounded-lg shadow-sm group-hover:shadow-md transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="group-hover:rotate-180 transition-transform duration-500"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
            Utilo
        </a>
        
        <div id="search-bar" class="flex-1 max-w-md relative hidden sm:block">
            <input type="text" id="search-input" placeholder="Search for tools..." class="w-full bg-slate-100/70 text-sm border-transparent focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-500/10 rounded-xl py-2 pl-10 pr-4 transition-all font-medium placeholder-slate-400 text-slate-700 shadow-inner">
            <svg class="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>

        <button id="back-btn" onclick="showHome(event)" class="text-sm font-semibold text-slate-600 hover:text-teal-700 bg-white border border-slate-200 shadow-sm hover:bg-teal-50 hover:border-teal-200 px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 active:scale-95">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="m15 18-6-6 6-6"/></svg>
            <span class="hidden sm:inline">Back to Home</span><span class="sm:hidden">Back</span>
        </button>
    </div>
</header>

<!-- Mobile Search Bar -->
<div id="mobile-search-bar" class="sm:hidden bg-white/90 backdrop-blur-xl px-4 py-3 border-b border-slate-100 sticky top-16 z-40 transition-all">
    <div class="relative">
        <input type="text" id="mobile-search-input" placeholder="Search for tools..." class="w-full bg-slate-100/70 text-sm border-transparent focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-500/10 rounded-xl py-2.5 pl-10 pr-4 transition-all font-medium shadow-inner">
        <svg class="w-4 h-4 text-slate-400 absolute left-3.5 top-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
    </div>
</div>

<main class="flex-grow flex flex-col relative w-full pt-8 pb-16 min-h-[calc(100vh-140px)]">
    <!-- Home View -->
    <div id="home-view" class="view active max-w-6xl mx-auto px-4 w-full">
        <div class="text-center max-w-2xl mx-auto mb-12">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-sm font-bold mb-5 border border-teal-100 shadow-sm">
                <span>🚀</span> 100% Free & No Sign-up Required
            </div>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-5 leading-[1.15]">Fast, Accurate & Easy <br class="hidden sm:block" /><span class="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-600">Online Tools</span></h1>
            <p class="text-slate-500 text-lg sm:text-xl font-medium">Everything you need to calculate, convert, and secure your workflow, beautifully designed for all screens.</p>
        </div>
        <div id="tools-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"></div>
    </div>

    <!-- Tool View Wrapper -->
    <div id="tool-view" class="view max-w-2xl lg:max-w-3xl mx-auto px-4 w-full">
        <div class="bg-white rounded-[1.5rem] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden min-h-[400px]">
            
            <!-- World Clock -->
            <div id="tool-world-clock" class="tool-section p-6 sm:p-10">
                <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-8 text-center tracking-tight">🌍 World Clock</h2>
                <div id="clocks-container" class="space-y-3 sm:space-y-4"></div>
            </div>

            <!-- Currency Converter -->
            <div id="tool-currency-converter" class="tool-section p-6 sm:p-10">
                <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-8 text-center tracking-tight">💱 Currency Converter</h2>
                <div class="space-y-6">
                    <div>
                        <label class="label-text">Amount</label>
                        <input type="number" id="curr-amount" value="1" class="glass-input text-lg font-bold" oninput="convertCurrency()">
                    </div>
                    <div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                        <div class="w-full">
                            <label class="label-text">From</label>
                            <select id="curr-from" class="glass-input cursor-pointer" onchange="convertCurrency()">
                                <option value="USD">USD ($)</option><option value="EUR">EUR (€)</option><option value="GBP">GBP (£)</option>
                                <option value="INR">INR (₹)</option><option value="JPY">JPY (¥)</option><option value="CAD">CAD ($)</option><option value="AUD">AUD ($)</option>
                            </select>
                        </div>
                        <button onclick="swapCurrency()" class="calc-btn mt-0 sm:mt-6 p-3 rounded-full bg-teal-50 hover:bg-teal-100 text-teal-600 shadow-sm border border-teal-100 flex-shrink-0" title="Swap currencies">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5M4 21h5v-5M21 3l-7 7M3 21l7-7"/></svg>
                        </button>
                        <div class="w-full">
                            <label class="label-text">To</label>
                            <select id="curr-to" class="glass-input cursor-pointer" onchange="convertCurrency()">
                                <option value="EUR">EUR (€)</option><option value="USD">USD ($)</option><option value="GBP">GBP (£)</option>
                                <option value="INR" selected>INR (₹)</option><option value="JPY">JPY (¥)</option><option value="CAD">CAD ($)</option><option value="AUD">AUD ($)</option>
                            </select>
                        </div>
                    </div>
                    <div class="result-box mt-4">
                        <p class="text-sm font-bold text-teal-700/70 mb-1 uppercase tracking-wider">Converted Amount</p>
                        <p id="curr-result" class="text-4xl sm:text-5xl font-extrabold text-teal-700 tracking-tight">83.20 INR</p>
                    </div>
                </div>
            </div>

            <!-- Unit Converter -->
            <div id="tool-unit-converter" class="tool-section p-6 sm:p-10">
                <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-8 text-center tracking-tight">⚖️ Unit Converter</h2>
                <div class="space-y-6">
                    <div>
                        <label class="label-text">Type of Measurement</label>
                        <select id="unit-type" onchange="updateOptions()" class="glass-input cursor-pointer">
                            <option value="length">📏 Length</option><option value="weight">⚖️ Weight</option><option value="temperature">🌡️ Temperature</option>
                        </select>
                    </div>
                    <div>
                        <label class="label-text">Value</label>
                        <input type="number" id="unit-amount" value="1" class="glass-input text-lg font-bold" oninput="convertUnit()">
                    </div>
                    <div class="flex gap-4">
                        <div class="flex-1">
                            <label class="label-text">From</label>
                            <select id="unit-from" class="glass-input cursor-pointer" onchange="convertUnit()"></select>
                        </div>
                        <div class="flex-1">
                            <label class="label-text">To</label>
                            <select id="unit-to" class="glass-input cursor-pointer" onchange="convertUnit()"></select>
                        </div>
                    </div>
                    <div class="result-box mt-4 bg-slate-50 border-slate-200">
                        <p class="text-sm font-bold text-slate-500 mb-1 uppercase tracking-wider">Result</p>
                        <p id="unit-result" class="text-4xl font-extrabold text-slate-800 tracking-tight">100 cm</p>
                    </div>
                </div>
            </div>

            <!-- Scientific Calculator (COMPACT DESIGN) -->
            <div id="tool-scientific-calculator" class="tool-section p-6 sm:p-8 bg-slate-50/50">
                <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 text-center tracking-tight">➗ Calculator</h2>
                
                <div class="max-w-[340px] mx-auto bg-[#e2e8f0] p-3 sm:p-4 rounded-[1.5rem] border border-slate-300 shadow-inner">
                    <!-- Display -->
                    <div class="bg-white rounded-xl p-4 mb-4 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] border border-slate-200 flex flex-col justify-end items-end h-[84px] relative overflow-hidden">
                        <div class="absolute top-2 left-3 text-[10px] sm:text-xs font-bold text-slate-400">DEG</div>
                        <div id="calc-display" class="w-full text-right text-3xl sm:text-4xl font-normal text-slate-800 tracking-tight truncate font-mono">0</div>
                    </div>

                    <!-- Keypad grid -->
                    <div class="grid grid-cols-4 gap-2 sm:gap-2.5">
                        <!-- Math functions -->
                        <button onclick="calcApp('sin(')" class="calc-btn h-9 sm:h-10 bg-slate-300/50 hover:bg-slate-400/50 text-slate-700 rounded-lg text-sm font-semibold">sin</button>
                        <button onclick="calcApp('cos(')" class="calc-btn h-9 sm:h-10 bg-slate-300/50 hover:bg-slate-400/50 text-slate-700 rounded-lg text-sm font-semibold">cos</button>
                        <button onclick="calcApp('tan(')" class="calc-btn h-9 sm:h-10 bg-slate-300/50 hover:bg-slate-400/50 text-slate-700 rounded-lg text-sm font-semibold">tan</button>
                        <button onclick="calcApp('^')" class="calc-btn h-9 sm:h-10 bg-slate-300/50 hover:bg-slate-400/50 text-slate-700 rounded-lg text-sm font-semibold">xⁿ</button>
                        
                        <button onclick="calcApp('log(')" class="calc-btn h-9 sm:h-10 bg-slate-300/50 hover:bg-slate-400/50 text-slate-700 rounded-lg text-sm font-semibold">log</button>
                        <button onclick="calcApp('ln(')" class="calc-btn h-9 sm:h-10 bg-slate-300/50 hover:bg-slate-400/50 text-slate-700 rounded-lg text-sm font-semibold">ln</button>
                        <button onclick="calcApp('Math.sqrt(')" class="calc-btn h-9 sm:h-10 bg-slate-300/50 hover:bg-slate-400/50 text-slate-700 rounded-lg text-sm font-semibold">√</button>
                        <button onclick="calcApp('Math.PI')" class="calc-btn h-9 sm:h-10 bg-slate-300/50 hover:bg-slate-400/50 text-slate-700 rounded-lg text-[15px] font-semibold">π</button>

                        <!-- Controls -->
                        <button onclick="calcClear()" class="calc-btn h-11 sm:h-12 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl font-bold text-lg shadow-sm">C</button>
                        <button onclick="calcDel()" class="calc-btn h-11 sm:h-12 bg-slate-300 hover:bg-slate-400/80 text-slate-800 rounded-xl font-bold text-lg shadow-sm">⌫</button>
                        <button onclick="calcApp('(')" class="calc-btn h-11 sm:h-12 bg-slate-300 hover:bg-slate-400/80 text-slate-800 rounded-xl font-bold text-lg shadow-sm">(</button>
                        <button onclick="calcApp(')')" class="calc-btn h-11 sm:h-12 bg-slate-300 hover:bg-slate-400/80 text-slate-800 rounded-xl font-bold text-lg shadow-sm">)</button>

                        <!-- Numbers & Ops 1 -->
                        <button onclick="calcApp('7')" class="calc-btn h-11 sm:h-12 bg-white hover:bg-slate-50 text-slate-800 rounded-xl font-semibold text-xl shadow-sm">7</button>
                        <button onclick="calcApp('8')" class="calc-btn h-11 sm:h-12 bg-white hover:bg-slate-50 text-slate-800 rounded-xl font-semibold text-xl shadow-sm">8</button>
                        <button onclick="calcApp('9')" class="calc-btn h-11 sm:h-12 bg-white hover:bg-slate-50 text-slate-800 rounded-xl font-semibold text-xl shadow-sm">9</button>
                        <button onclick="calcApp('/')" class="calc-btn h-11 sm:h-12 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-xl font-bold text-2xl shadow-sm border border-teal-100/50">÷</button>

                        <!-- Numbers & Ops 2 -->
                        <button onclick="calcApp('4')" class="calc-btn h-11 sm:h-12 bg-white hover:bg-slate-50 text-slate-800 rounded-xl font-semibold text-xl shadow-sm">4</button>
                        <button onclick="calcApp('5')" class="calc-btn h-11 sm:h-12 bg-white hover:bg-slate-50 text-slate-800 rounded-xl font-semibold text-xl shadow-sm">5</button>
                        <button onclick="calcApp('6')" class="calc-btn h-11 sm:h-12 bg-white hover:bg-slate-50 text-slate-800 rounded-xl font-semibold text-xl shadow-sm">6</button>
                        <button onclick="calcApp('*')" class="calc-btn h-11 sm:h-12 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-xl font-bold text-2xl shadow-sm border border-teal-100/50">×</button>

                        <!-- Numbers & Ops 3 -->
                        <button onclick="calcApp('1')" class="calc-btn h-11 sm:h-12 bg-white hover:bg-slate-50 text-slate-800 rounded-xl font-semibold text-xl shadow-sm">1</button>
                        <button onclick="calcApp('2')" class="calc-btn h-11 sm:h-12 bg-white hover:bg-slate-50 text-slate-800 rounded-xl font-semibold text-xl shadow-sm">2</button>
                        <button onclick="calcApp('3')" class="calc-btn h-11 sm:h-12 bg-white hover:bg-slate-50 text-slate-800 rounded-xl font-semibold text-xl shadow-sm">3</button>
                        <button onclick="calcApp('-')" class="calc-btn h-11 sm:h-12 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-xl font-bold text-2xl shadow-sm border border-teal-100/50">−</button>

                        <!-- Numbers & Ops 4 -->
                        <button onclick="calcApp('0')" class="calc-btn h-11 sm:h-12 bg-white hover:bg-slate-50 text-slate-800 rounded-xl font-semibold text-xl shadow-sm">0</button>
                        <button onclick="calcApp('.')" class="calc-btn h-11 sm:h-12 bg-white hover:bg-slate-50 text-slate-800 rounded-xl font-extrabold text-xl shadow-sm">.</button>
                        <button onclick="calcEval()" class="calc-btn h-11 sm:h-12 bg-gradient-to-b from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-600 text-white rounded-xl font-bold text-2xl shadow-md border-b-2 border-teal-600">=</button>
                        <button onclick="calcApp('+')" class="calc-btn h-11 sm:h-12 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-xl font-bold text-2xl shadow-sm border border-teal-100/50">+</button>
                    </div>
                </div>
            </div>

            <!-- EMI Calculator -->
            <div id="tool-emi-calculator" class="tool-section p-6 sm:p-10">
                <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-8 text-center tracking-tight">🏦 EMI Calculator</h2>
                <div class="space-y-8">
                    <div>
                        <div class="flex justify-between items-end mb-3"><label class="label-text !mb-0 text-slate-500">Loan Amount</label><span class="font-bold text-xl text-teal-600 font-mono" id="emi-p-val">$50,000</span></div>
                        <input type="range" id="emi-p" min="1000" max="1000000" step="1000" value="50000" oninput="doEmi()">
                    </div>
                    <div>
                        <div class="flex justify-between items-end mb-3"><label class="label-text !mb-0 text-slate-500">Interest Rate (% p.a.)</label><span class="font-bold text-xl text-teal-600 font-mono" id="emi-r-val">7.5%</span></div>
                        <input type="range" id="emi-r" min="1" max="20" step="0.1" value="7.5" oninput="doEmi()">
                    </div>
                    <div>
                        <div class="flex justify-between items-end mb-3"><label class="label-text !mb-0 text-slate-500">Tenure (Years)</label><span class="font-bold text-xl text-teal-600 font-mono" id="emi-n-val">5 Yrs</span></div>
                        <input type="range" id="emi-n" min="1" max="30" step="1" value="5" oninput="doEmi()">
                    </div>
                    <div class="result-box mt-8">
                        <p class="text-sm font-bold text-teal-700/70 mb-1 uppercase tracking-wider">Monthly EMI</p>
                        <p id="emi-res" class="text-4xl sm:text-5xl font-extrabold text-teal-700 tracking-tight font-mono">$1,001.90</p>
                    </div>
                </div>
            </div>

            <!-- Tip Calculator -->
            <div id="tool-tip-calculator" class="tool-section p-6 sm:p-10">
                <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-8 text-center tracking-tight">💰 Tip Calculator</h2>
                <div class="space-y-8">
                    <div>
                        <label class="label-text">Bill Amount</label>
                        <div class="relative">
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-lg">$</span>
                            <input type="number" id="tip-b" value="100" class="glass-input pl-8 text-xl font-bold font-mono" placeholder="0.00" oninput="doTip()">
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-between items-end mb-3"><label class="label-text !mb-0 text-slate-500">Tip Percentage</label><span class="font-bold text-xl text-teal-600 font-mono" id="tip-p-val">15%</span></div>
                        <input type="range" id="tip-p" min="0" max="50" step="1" value="15" oninput="doTip()">
                    </div>
                    <div class="grid grid-cols-2 gap-4 mt-6">
                        <div class="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-center shadow-sm">
                            <p class="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">Tip</p>
                            <p id="tip-res-amt" class="text-2xl sm:text-3xl font-extrabold text-slate-800 font-mono">$15.00</p>
                        </div>
                        <div class="result-box !p-5">
                            <p class="text-xs text-teal-700/70 font-bold uppercase tracking-wider mb-2">Total</p>
                            <p id="tip-res-tot" class="text-2xl sm:text-3xl font-extrabold text-teal-700 font-mono">$115.00</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Percentage Calculator -->
            <div id="tool-percentage-calculator" class="tool-section p-6 sm:p-10">
                <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-8 text-center tracking-tight">🔢 Percentage Calc</h2>
                <div class="space-y-6">
                    <div class="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 flex flex-wrap items-center gap-4 justify-center text-lg sm:text-xl shadow-sm">
                        <span class="font-bold text-slate-600">What is</span>
                        <input type="number" id="perc-x" value="20" class="glass-input !w-24 text-center text-xl font-bold font-mono !p-2" oninput="doPerc()">
                        <span class="font-bold text-slate-600">% of</span>
                        <input type="number" id="perc-y" value="150" class="glass-input !w-32 text-center text-xl font-bold font-mono !p-2" oninput="doPerc()">
                        <span class="font-bold text-slate-600">?</span>
                    </div>
                    <div class="result-box mt-4">
                        <p class="text-sm font-bold text-teal-700/70 mb-1 uppercase tracking-wider">Result</p>
                        <p id="perc-res" class="text-5xl font-extrabold text-teal-700 tracking-tight font-mono">30</p>
                    </div>
                </div>
            </div>

            <!-- Age Calculator -->
            <div id="tool-age-calculator" class="tool-section p-6 sm:p-10">
               <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-8 text-center tracking-tight">🎂 Age Calculator</h2>
               <div class="space-y-6 max-w-md mx-auto w-full">
                   <div>
                       <label class="label-text">Select Date of Birth</label>
                       <input type="date" id="age-dob" class="glass-input text-lg font-bold" onchange="doAge()">
                   </div>
                   
                   <div id="age-res-container" class="hidden">
                       <div class="result-box mt-8 space-y-4">
                           <div class="text-center">
                               <p class="text-sm font-bold text-teal-700/70 uppercase tracking-wider mb-2">You are currently</p>
                               <div class="flex justify-center items-center gap-2 sm:gap-4 flex-wrap">
                                   <div class="text-center"><span id="age-y" class="text-4xl sm:text-5xl font-extrabold text-teal-700 tracking-tight font-mono">0</span><span class="block text-sm font-bold text-teal-600/80">Yrs</span></div>
                                   <div class="text-teal-400 text-3xl font-light">,</div>
                                   <div class="text-center"><span id="age-m" class="text-4xl sm:text-5xl font-extrabold text-teal-700 tracking-tight font-mono">0</span><span class="block text-sm font-bold text-teal-600/80">Mos</span></div>
                                   <div class="text-teal-400 text-3xl font-light">,</div>
                                   <div class="text-center"><span id="age-d" class="text-4xl sm:text-5xl font-extrabold text-teal-700 tracking-tight font-mono">0</span><span class="block text-sm font-bold text-teal-600/80">Days</span></div>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
            </div>

            <!-- BMI Calculator -->
            <div id="tool-bmi-calculator" class="tool-section p-6 sm:p-10">
               <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-8 text-center tracking-tight">💪 BMI Calculator</h2>
               <div class="space-y-6">
                   <div class="flex flex-col sm:flex-row gap-6">
                       <div class="flex-1">
                           <label class="label-text">Height (cm)</label>
                           <input type="number" id="bmi-h" value="175" class="glass-input text-lg font-bold font-mono" oninput="doBMI()">
                       </div>
                       <div class="flex-1">
                           <label class="label-text">Weight (kg)</label>
                           <input type="number" id="bmi-w" value="70" class="glass-input text-lg font-bold font-mono" oninput="doBMI()">
                       </div>
                   </div>
                   <div class="result-box mt-6 flex flex-col justify-center items-center gap-3">
                       <p class="text-sm font-bold text-teal-700/70 uppercase tracking-wider">Your Body Mass Index</p>
                       <div class="flex items-center gap-4">
                           <p id="bmi-res" class="text-5xl font-extrabold text-teal-700 tracking-tight font-mono">22.9</p>
                           <span id="bmi-tag" class="px-3.5 py-1.5 rounded-xl text-sm font-bold shadow-sm uppercase tracking-wide">Normal</span>
                       </div>
                   </div>
               </div>
            </div>

            <!-- Calorie Calculator -->
            <div id="tool-daily-calorie-calculator" class="tool-section p-6 sm:p-10">
               <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-8 text-center tracking-tight">🔥 Calorie Calculator</h2>
               <div class="space-y-6">
                   <div class="flex gap-4 sm:gap-6">
                       <div class="flex-1"><label class="label-text">Age</label><input type="number" id="cal-a" value="30" class="glass-input" oninput="doCal()"></div>
                       <div class="flex-1"><label class="label-text">Gender</label>
                           <select id="cal-g" class="glass-input cursor-pointer" onchange="doCal()">
                               <option value="m">Male</option><option value="f">Female</option>
                           </select>
                       </div>
                   </div>
                   <div class="flex gap-4 sm:gap-6">
                       <div class="flex-1"><label class="label-text">Height (cm)</label><input type="number" id="cal-h" value="175" class="glass-input" oninput="doCal()"></div>
                       <div class="flex-1"><label class="label-text">Weight (kg)</label><input type="number" id="cal-w" value="70" class="glass-input" oninput="doCal()"></div>
                   </div>
                   <div>
                       <label class="label-text">Activity Level</label>
                       <select id="cal-act" class="glass-input cursor-pointer" onchange="doCal()">
                           <option value="1.2">Sedentary (little to no exercise)</option>
                           <option value="1.375">Lightly active (light exercise/sports 1-3 days/week)</option>
                           <option value="1.55">Moderately active (moderate exercise/sports 3-5 days/week)</option>
                           <option value="1.725">Very active (hard exercise/sports 6-7 days a week)</option>
                       </select>
                   </div>
                   <div class="result-box mt-4">
                       <p class="text-sm font-bold text-teal-700/70 mb-1 uppercase tracking-wider">Maintenance Calories</p>
                       <p id="cal-res" class="text-4xl sm:text-5xl font-extrabold text-teal-700 font-mono">2,080 <span class="text-2xl text-teal-600/80 font-bold">kcal/day</span></p>
                   </div>
               </div>
            </div>

            <!-- Password Generator -->
            <div id="tool-password-generator" class="tool-section p-6 sm:p-10">
               <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-8 text-center tracking-tight">🔑 Password Generator</h2>
               <div class="space-y-8">
                   <div class="relative group">
                       <input type="text" id="pwd-res" readonly class="w-full bg-slate-50 border-2 border-slate-200 focus:border-teal-400 rounded-2xl p-5 text-center font-mono text-xl sm:text-2xl font-bold text-slate-800 pr-14 shadow-inner transition-colors outline-none cursor-pointer" onclick="copyPwd()">
                       <button onclick="copyPwd()" class="calc-btn absolute right-3 top-3 bottom-3 aspect-square bg-white hover:bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center border border-slate-200 hover:border-teal-200 shadow-sm transition-all" title="Copy to clipboard">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                       </button>
                   </div>
                   
                   <div>
                       <div class="flex justify-between items-end mb-3"><label class="label-text !mb-0 text-slate-500">Password Length</label><span class="font-bold text-xl text-teal-600 font-mono" id="pwd-l-val">16</span></div>
                       <input type="range" id="pwd-l" min="8" max="32" value="16" oninput="doPwd()">
                   </div>
                   
                   <div class="grid grid-cols-2 gap-3 sm:gap-4">
                       <label class="flex items-center gap-3 bg-slate-50 hover:bg-slate-100 p-3.5 rounded-xl border border-slate-200 cursor-pointer transition-colors shadow-sm font-semibold text-slate-700">
                           <input type="checkbox" id="pwd-u" checked class="w-5 h-5 accent-teal-600 cursor-pointer" onchange="doPwd()"> Uppercase
                       </label>
                       <label class="flex items-center gap-3 bg-slate-50 hover:bg-slate-100 p-3.5 rounded-xl border border-slate-200 cursor-pointer transition-colors shadow-sm font-semibold text-slate-700">
                           <input type="checkbox" id="pwd-lc" checked class="w-5 h-5 accent-teal-600 cursor-pointer" onchange="doPwd()"> Lowercase
                       </label>
                       <label class="flex items-center gap-3 bg-slate-50 hover:bg-slate-100 p-3.5 rounded-xl border border-slate-200 cursor-pointer transition-colors shadow-sm font-semibold text-slate-700">
                           <input type="checkbox" id="pwd-n" checked class="w-5 h-5 accent-teal-600 cursor-pointer" onchange="doPwd()"> Numbers
                       </label>
                       <label class="flex items-center gap-3 bg-slate-50 hover:bg-slate-100 p-3.5 rounded-xl border border-slate-200 cursor-pointer transition-colors shadow-sm font-semibold text-slate-700">
                           <input type="checkbox" id="pwd-s" checked class="w-5 h-5 accent-teal-600 cursor-pointer" onchange="doPwd()"> Symbols
                       </label>
                   </div>
                   
                   <button onclick="doPwd()" class="calc-btn w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-extrabold text-lg py-4 rounded-xl shadow-[0_4px_12px_rgba(20,184,166,0.3)] tracking-wide">Generate New Password</button>
               </div>
            </div>

        </div>
    </div>
</main>

<footer class="bg-white border-t border-slate-200 py-8 text-center mt-auto">
    <p class="text-slate-500 text-sm font-semibold mb-2">© 2026 Utilo. All rights reserved.</p>
    <p class="text-slate-400 text-xs">Fast, accurate and free online tools directly in your browser.</p>
</footer>

<script>
    const tools = [
        { id: "world-clock", name: "World Clock", icon: "🌍", cat: "Utilities" },
        { id: "currency-converter", name: "Currency Converter", icon: "💱", cat: "Finance" },
        { id: "unit-converter", name: "Unit Converter", icon: "⚖️", cat: "Utilities" },
        { id: "scientific-calculator", name: "Calculator", icon: "➗", cat: "Math" },
        { id: "emi-calculator", name: "EMI Calc", icon: "🏦", cat: "Finance" },
        { id: "tip-calculator", name: "Tip Calc", icon: "💰", cat: "Finance" },
        { id: "percentage-calculator", name: "Percentage", icon: "🔢", cat: "Math" },
        { id: "age-calculator", name: "Age Calc", icon: "🎂", cat: "Utilities" },
        { id: "bmi-calculator", name: "BMI Calc", icon: "💪", cat: "Health" },
        { id: "daily-calorie-calculator", name: "Calorie Calc", icon: "🔥", cat: "Health" },
        { id: "password-generator", name: "Password Gen", icon: "🔑", cat: "Security" }
    ];

    function renderCards(list) {
        const h = document.getElementById('tools-grid');
        h.innerHTML = list.length ? list.map(t => \`
            <div onclick="show('\${t.id}')" class="tool-card bg-white p-6 sm:p-8 rounded-3xl cursor-pointer flex flex-col items-center text-center gap-3 relative overflow-hidden group">
                <div class="absolute inset-0 bg-gradient-to-b from-transparent to-teal-50/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div class="text-4xl p-4 bg-slate-50 rounded-2xl group-hover:scale-110 transition-transform duration-300 relative z-10 border border-slate-100">\${t.icon}</div>
                <h3 class="font-extrabold text-slate-800 text-lg leading-tight relative z-10 mt-2">\${t.name}</h3>
                <span class="text-[11px] uppercase tracking-wider font-bold px-2.5 py-1 bg-teal-50/80 text-teal-700 rounded-lg relative z-10 border border-teal-100">\${t.cat}</span>
            </div>\`).join('') : '<p class="col-span-full text-center text-slate-500 py-10">No tools found.</p>';
    }

    function search(q) {
        q = q.toLowerCase();
        renderCards(tools.filter(t => t.name.toLowerCase().includes(q) || t.cat.toLowerCase().includes(q)));
    }

    document.getElementById('search-input').addEventListener('input', e => search(e.target.value));
    document.getElementById('mobile-search-input').addEventListener('input', e => {
        document.getElementById('search-input').value = e.target.value;
        search(e.target.value);
    });

    function showHome(e) {
        if(e) e.preventDefault();
        document.getElementById('home-view').classList.add('active');
        document.getElementById('tool-view').classList.remove('active');
        document.getElementById('search-bar').classList.remove('hidden');
        document.getElementById('mobile-search-bar').classList.remove('hidden');
        document.getElementById('back-btn').classList.add('hidden');
        document.getElementById('search-input').value = '';
        document.getElementById('mobile-search-input').value = '';
        renderCards(tools);
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    function show(id) {
        document.getElementById('home-view').classList.remove('active');
        document.getElementById('tool-view').classList.add('active');
        document.getElementById('search-bar').classList.add('hidden');
        document.getElementById('mobile-search-bar').classList.add('hidden');
        document.getElementById('back-btn').classList.remove('hidden');
        
        document.querySelectorAll('.tool-section').forEach(el => el.classList.remove('active'));
        document.getElementById('tool-' + id).classList.add('active');
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    // World Clock
    function initClock() {
        const c = document.getElementById('clocks-container');
        const list = [{n:'New York', tz:'America/New_York'}, {n:'London', tz:'Europe/London'}, {n:'Tokyo', tz:'Asia/Tokyo'}, {n:'Mumbai', tz:'Asia/Kolkata'}, {n:'Sydney', tz:'Australia/Sydney'}];
        setInterval(() => {
            c.innerHTML = list.map(l => \`<div class="flex justify-between items-center bg-slate-50 border border-slate-100 hover:border-teal-100 p-4 rounded-xl transition-colors"><span class="font-bold text-slate-700">\${l.n}</span><span class="font-mono font-bold text-teal-600 text-lg sm:text-xl">\${new Date().toLocaleTimeString('en-US',{timeZone:l.tz})}</span></div>\`).join('');
        }, 1000);
    }

    // Currency
    const rates = {USD:1, EUR:0.91, GBP:0.78, INR:83.2, JPY:148.5, CAD:1.35, AUD:1.52};
    window.convertCurrency = () => {
        const a=parseFloat(document.getElementById('curr-amount').value)||0, f=document.getElementById('curr-from').value, t=document.getElementById('curr-to').value;
        const res = ((a/rates[f])*rates[t]);
        document.getElementById('curr-result').innerText = res.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2}) + ' ' + t;
    };
    window.swapCurrency = () => {
        const f=document.getElementById('curr-from'), t=document.getElementById('curr-to'), tmp=f.value; f.value=t.value; t.value=tmp; convertCurrency();
    };

    // Unit
    const umap = { length: {m:1,km:0.001,cm:100,in:39.37,ft:3.28}, weight: {kg:1,g:1000,lbs:2.2046,oz:35.274}, temperature: {C:'c',F:'f'} };
    window.updateOptions = () => {
        const type = document.getElementById('unit-type').value, keys = Object.keys(umap[type]), f=document.getElementById('unit-from'), t=document.getElementById('unit-to');
        f.innerHTML = keys.map(k=>\`<option value="\${k}">\${k}</option>\`).join('');
        t.innerHTML = keys.map(k=>\`<option value="\${k}">\${k}</option>\`).join('');
        if(keys.length>1) t.options[1].selected=true;
        convertUnit();
    };
    window.convertUnit = () => {
        const typ=document.getElementById('unit-type').value, val=parseFloat(document.getElementById('unit-amount').value)||0, f=document.getElementById('unit-from').value, t=document.getElementById('unit-to').value;
        let res=0;
        if(typ==='temperature') res = (f==='C'&&t==='F') ? (val*9/5)+32 : (f==='F'&&t==='C') ? (val-32)*5/9 : val;
        else res = (val/umap[typ][f])*umap[typ][t];
        document.getElementById('unit-result').innerText = res.toPrecision(5) + ' ' + t;
    };

    // Calc
    let expr = "";
    window.calcApp = v => { if(expr==='Error')expr=''; expr+=v; document.getElementById('calc-display').innerText=expr; };
    window.calcClear = () => { expr=''; document.getElementById('calc-display').innerText='0'; };
    window.calcDel = () => { expr=expr.slice(0,-1); document.getElementById('calc-display').innerText=expr||'0'; };
    window.calcEval = () => { 
        try { 
            let e = expr.replace(/\\^/g,'**');
            let res = new Function('return '+e)();
            expr=String(Math.round(res*1e8)/1e8); 
            if(expr==="NaN" || expr==="Infinity" || expr==="-Infinity") throw new Error("Math Error");
            document.getElementById('calc-display').innerText=expr; 
        } catch(e) {
            expr=''; document.getElementById('calc-display').innerText='Error';
        } 
    };

    // EMI
    window.doEmi = () => {
        const p=parseFloat(document.getElementById('emi-p').value)||0, r=parseFloat(document.getElementById('emi-r').value)||0, n=parseFloat(document.getElementById('emi-n').value)||0;
        document.getElementById('emi-p-val').innerText = '$'+p.toLocaleString(); document.getElementById('emi-r-val').innerText = r.toFixed(1)+'%'; document.getElementById('emi-n-val').innerText = n+' Yrs';
        const R=r/12/100, N=n*12, e=p*R*Math.pow(1+R,N)/(Math.pow(1+R,N)-1);
        document.getElementById('emi-res').innerText = '$' + (e||0).toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2});
    };

    // Tip
    window.doTip = () => {
        const b=parseFloat(document.getElementById('tip-b').value)||0, p=parseFloat(document.getElementById('tip-p').value)||0;
        document.getElementById('tip-p-val').innerText = p+'%';
        const t = b*(p/100);
        document.getElementById('tip-res-amt').innerText='$'+t.toLocaleString('en-US',{minimumFractionDigits:2}); document.getElementById('tip-res-tot').innerText='$'+(b+t).toLocaleString('en-US',{minimumFractionDigits:2});
    };

    // Percent
    window.doPerc = () => document.getElementById('perc-res').innerText = ((parseFloat(document.getElementById('perc-x').value)||0)/100 * (parseFloat(document.getElementById('perc-y').value)||0)).toLocaleString('en-US', {maximumFractionDigits:2});

    // Age
    window.doAge = () => {
        const dob = new Date(document.getElementById('age-dob').value);
        if(!isNaN(dob)) {
            const today = new Date();
            if(today < dob) { alert("Date of birth cannot be in the future!"); return; }
            document.getElementById('age-res-container').classList.remove('hidden');
            
            let years = today.getFullYear() - dob.getFullYear();
            let months = today.getMonth() - dob.getMonth();
            let days = today.getDate() - dob.getDate();

            if (days < 0) {
                months--;
                // Get days in previous month
                const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
                days += prevMonth.getDate();
            }
            if (months < 0) {
                years--;
                months += 12;
            }

            document.getElementById('age-y').innerText = years;
            document.getElementById('age-m').innerText = months;
            document.getElementById('age-d').innerText = days;
        }
    };

    // BMI
    window.doBMI = () => {
        const h=(parseFloat(document.getElementById('bmi-h').value)||0)/100, w=parseFloat(document.getElementById('bmi-w').value)||0;
        if(h>0&&w>0) {
            const b = w/(h*h); document.getElementById('bmi-res').innerText = b.toFixed(1);
            const tg = document.getElementById('bmi-tag');
            if(b<18.5){tg.innerText='Underweight'; tg.className='px-3.5 py-1.5 rounded-xl text-sm font-bold bg-orange-100 text-orange-700 shadow-sm uppercase tracking-wide';}
            else if(b<25){tg.innerText='Normal'; tg.className='px-3.5 py-1.5 rounded-xl text-sm font-bold bg-green-100 text-green-700 shadow-sm uppercase tracking-wide';}
            else {tg.innerText='Overweight'; tg.className='px-3.5 py-1.5 rounded-xl text-sm font-bold bg-red-100 text-red-700 shadow-sm uppercase tracking-wide';}
        }
    };

    // Cal
    window.doCal = () => {
        const a=parseFloat(document.getElementById('cal-a').value)||0, h=parseFloat(document.getElementById('cal-h').value)||0, w=parseFloat(document.getElementById('cal-w').value)||0;
        const g=document.getElementById('cal-g').value, ac=parseFloat(document.getElementById('cal-act').value)||1.2;
        const cal = Math.round((10*w + 6.25*h - 5*a + (g==='m'?5:-161)) * ac);
        document.getElementById('cal-res').innerHTML = cal.toLocaleString() + ' <span class="text-2xl text-teal-600/80 font-bold">kcal/day</span>';
    };

    // Pwd
    window.doPwd = () => {
        const l=parseInt(document.getElementById('pwd-l').value)||16; document.getElementById('pwd-l-val').innerText=l;
        let c = '';
        if(document.getElementById('pwd-u').checked) c+='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if(document.getElementById('pwd-lc').checked) c+='abcdefghijklmnopqrstuvwxyz';
        if(document.getElementById('pwd-n').checked) c+='0123456789';
        if(document.getElementById('pwd-s').checked) c+='!@#$%^&*()_+~|}{[]:;?><,./-=';
        if(!c) c='abcdefghijklmnopqrstuvwxyz'; // fallback
        
        let pw = '';
        const cl = c.length;
        // Use crypto if available for better randomness
        if(window.crypto && window.crypto.getRandomValues) {
            const arr = new Uint32Array(l);
            window.crypto.getRandomValues(arr);
            for(let i=0; i<l; i++) pw += c[arr[i] % cl];
        } else {
            for(let i=0; i<l; i++) pw += c[Math.floor(Math.random()*cl)];
        }
        document.getElementById('pwd-res').value = pw;
    };
    
    window.copyPwd = () => { 
        const input = document.getElementById('pwd-res');
        input.select(); 
        input.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(input.value).catch(() => document.execCommand('copy'));
        
        // Visual feedback
        const bg = input.style.backgroundColor;
        input.style.backgroundColor = '#ecfdf5';
        setTimeout(() => input.style.backgroundColor = bg, 200);
    };

    // Init all
    showHome();
    initClock();
    updateOptions();
    convertCurrency();
    doEmi();
    doTip();
    doPerc();
    doBMI();
    doCal();
    doPwd();
</script>
</body>
</html>`;

fs.writeFileSync('index.html', htmlContent);
