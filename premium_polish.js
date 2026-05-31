import fs from 'fs';
import path from 'path';

// read index.html
let html = fs.readFileSync('index.html', 'utf8');

// 1. Logo update
const oldLogoSVG = `<svg
              viewBox="0 0 100 100"
              class="w-full h-full absolute inset-0 text-white/90"
            >
              <g class="gear-group origin-center">
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="8"
                  stroke-dasharray="12 8"
                />
              </g>
              <path
                d="M38 35v20c0 6.6 5.4 12 12 12s12-5.4 12-12V35"
                fill="none"
                stroke="currentColor"
                stroke-width="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>`;

const newLogoSVG = `<svg viewBox="0 0 100 100" class="w-full h-full absolute inset-0">
              <defs>
                <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#fff" />
                  <stop offset="100%" stop-color="#ccfbf1" />
                </linearGradient>
                <linearGradient id="gear-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#99f6e4" />
                  <stop offset="100%" stop-color="#14b8a6" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <g class="gear-group origin-center" filter="url(#glow)">
                <circle cx="50" cy="46" r="28" fill="none" stroke="url(#gear-grad)" stroke-width="6" stroke-dasharray="10 8" opacity="0.8" />
                <circle cx="50" cy="46" r="22" fill="none" stroke="url(#gear-grad)" stroke-width="2" opacity="0.5" />
              </g>
              <path class="drop-shadow-md" d="M36 34v16c0 7.7 6.3 14 14 14s14-6.3 14-14V34" fill="none" stroke="url(#logo-grad)" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" />
            </svg>`;

html = html.replace(oldLogoSVG, newLogoSVG);

// Edit the favicon
const oldFavicon = `<link
      rel="icon"
      type="image/svg+xml"
      href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%2314b8a6'/%3E%3Cg stroke='white' stroke-width='8' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='50' cy='50' r='30' stroke-dasharray='12 8'/%3E%3Cpath d='M38 35v20c0 6.6 5.4 12 12 12s12-5.4 12-12V35' stroke-width='10'/%3E%3C/g%3E%3C/svg%3E"
    />`;
const newFaviconData = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='url(%23bg-grad)'/%3E%3Cdefs%3E%3ClinearGradient id='bg-grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%230d9488'/%3E%3Cstop offset='100%25' stop-color='%2314b8a6'/%3E%3C/linearGradient%3E%3ClinearGradient id='logo-grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23fff'/%3E%3Cstop offset='100%25' stop-color='%23ccfbf1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='none' stroke='url(%23logo-grad)' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='50' cy='48' r='28' stroke-width='5' stroke-dasharray='10 8' opacity='0.3'/%3E%3Cpath d='M36 34v16c0 7.7 6.3 14 14 14s14-6.3 14-14V34' stroke-width='11'/%3E%3C/g%3E%3C/svg%3E`;

const newFavicon = `<link
      rel="icon"
      type="image/svg+xml"
      href="${newFaviconData}"
    />`;

html = html.replace(oldFavicon, newFavicon);

// Logo hover rotating class update
html = html.replace(/\.logo-spin-hover:hover \.gear-group \{ animation: spin3d 1\.5s linear infinite; \}/g, 
  `.logo-spin-hover:hover .gear-group { animation: spin3d 2s linear infinite; filter: drop-shadow(0 0 4px rgba(45,212,191,0.8)); }
        .logo-spin-hover .bg-\\[\\#14b8a6\\] { background: linear-gradient(135deg, #14b8a6, #0f766e); box-shadow: 0 4px 15px -3px rgba(20,184,166,0.4), inset 0 2px 4px rgba(255,255,255,0.2); }
        .logo-spin-hover:hover .bg-\\[\\#14b8a6\\] { box-shadow: 0 6px 20px -3px rgba(20,184,166,0.6), inset 0 2px 4px rgba(255,255,255,0.3); }`
);

// Modify Currency UI to Custom Dropdown (Premium Searchable)
const oldCurrHtml = `                            <div class="flex flex-col sm:flex-row items-center gap-4">
                              <div class="w-full">
                                <label class="label-text">From</label>
                                <select
                                  id="curr-from"
                                  class="glass-input font-bold text-lg cursor-pointer"
                                  onchange="calcCurr()"
                                ></select>
                              </div>
                              <button
                                onclick="swapCurr()"
                                class="calc-btn mt-0 sm:mt-6 p-4 rounded-2xl bg-teal-50 text-teal-600 border border-teal-200 hover:bg-teal-500 hover:text-white shadow-sm flex-shrink-0 group"
                              >
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="2.5"
                                  class="transition-transform group-hover:rotate-180"
                                >
                                  <path
                                    d="M16 3h5v5M4 21h5v-5M21 3l-7 7M3 21l7-7"
                                  />
                                </svg>
                              </button>
                              <div class="w-full">
                                <label class="label-text">To</label>
                                <select
                                  id="curr-to"
                                  class="glass-input font-bold text-lg cursor-pointer"
                                  onchange="calcCurr()"
                                ></select>
                              </div>
                            </div>`;

const newCurrHtml = `                            <div class="flex flex-col sm:flex-row items-center gap-4 relative">
                              <div class="w-full relative dropdown-container">
                                <label class="label-text">From</label>
                                <div class="relative">
                                  <button type="button" id="curr-from-btn" class="glass-input w-full text-left font-bold text-lg flex items-center justify-between" onclick="toggleDropdown('from')">
                                    <span id="curr-from-text" class="truncate">USD - US Dollar</span>
                                    <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                  </button>
                                  <div id="curr-from-dropdown" class="absolute z-50 left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-slate-200 hidden overflow-hidden flex flex-col">
                                    <div class="p-2 border-b border-slate-100 relative">
                                      <svg class="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                      <input type="text" id="curr-from-search" class="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20" placeholder="Search currency..." oninput="filterCurr('from', this.value)" autocomplete="off">
                                    </div>
                                    <div id="curr-from-list" class="max-h-60 overflow-y-auto w-full"></div>
                                  </div>
                                </div>
                              </div>
                              <button
                                onclick="swapCurr()"
                                class="calc-btn mt-0 sm:mt-6 p-4 rounded-2xl bg-teal-50 text-teal-600 border border-teal-200 hover:bg-teal-500 hover:text-white shadow-sm flex-shrink-0 group z-10"
                              >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="transition-transform group-hover:rotate-180">
                                  <path d="M16 3h5v5M4 21h5v-5M21 3l-7 7M3 21l7-7"/>
                                </svg>
                              </button>
                              <div class="w-full relative dropdown-container">
                                <label class="label-text">To</label>
                                <div class="relative">
                                  <button type="button" id="curr-to-btn" class="glass-input w-full text-left font-bold text-lg flex items-center justify-between" onclick="toggleDropdown('to')">
                                    <span id="curr-to-text" class="truncate">EUR - Euro</span>
                                    <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                  </button>
                                  <div id="curr-to-dropdown" class="absolute z-50 left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-slate-200 hidden overflow-hidden flex flex-col">
                                    <div class="p-2 border-b border-slate-100 relative">
                                      <svg class="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                      <input type="text" id="curr-to-search" class="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20" placeholder="Search currency..." oninput="filterCurr('to', this.value)" autocomplete="off">
                                    </div>
                                    <div id="curr-to-list" class="max-h-60 overflow-y-auto w-full"></div>
                                  </div>
                                </div>
                              </div>
                            </div>`;

html = html.replace(oldCurrHtml, newCurrHtml);


// Currency Config Modification
const oldCurrJS = `      const currNames = {
        USD: "US Dollar",
        EUR: "Euro",
        GBP: "British Pound",
        INR: "Indian Rupee",
        PKR: "Pakistani Rupee",
        AED: "UAE Dirham",
        SAR: "Saudi Riyal",
        CAD: "Canadian Dollar",
        AUD: "Australian Dollar",
        JPY: "Japanese Yen",
        CNY: "Chinese Yuan",
        BRL: "Brazilian Real",
        ZAR: "South African Rand",
        SGD: "Singapore Dollar",
        CHF: "Swiss Franc",
        NZD: "New Zealand Dollar",
        HKD: "Hong Kong Dollar",
        SEK: "Swedish Krona",
        KRW: "South Korean Won",
        NOK: "Norwegian Krone",
        MXN: "Mexican Peso",
        RUB: "Russian Ruble",
        TRY: "Turkish Lira",
        MYR: "Malaysian Ringgit",
        THB: "Thai Baht",
      };
      let rates = {};

      function initCurr() {
        const selFrom = document.getElementById("curr-from");
        const selTo = document.getElementById("curr-to");
        const opts = Object.entries(currNames)
          .map(
            (e) =>
              '<option value="' +
              e[0] +
              '">' +
              e[0] +
              " - " +
              e[1] +
              "</option>",
          )
          .join("");
        selFrom.innerHTML = opts;
        selTo.innerHTML = opts;
        selFrom.value = "USD";
        selTo.value = "EUR";

        fetch("https://api.exchangerate-api.com/v4/latest/USD")
          .then((res) => res.json())
          .then((data) => {
            rates = data.rates;
            document.getElementById("curr-info").innerText =
              "Live exchange rates updated.";
            calcCurr();
          })
          .catch(() => {
            document.getElementById("curr-info").innerText =
              "Error fetching live rates.";
          });
      }

      function calcCurr() {
        let f = document.getElementById("curr-from").value;
        let t = document.getElementById("curr-to").value;
        let amt = parseFloat(document.getElementById("curr-amount").value) || 0;
        if (!rates[f] || !rates[t]) return;
        let r = rates[t] / rates[f];
        document.getElementById("curr-res").innerText =
          formatNum((amt * r).toFixed(2)) + " " + t;
      }

      function swapCurr() {
        let f = document.getElementById("curr-from");
        let t = document.getElementById("curr-to");
        let temp = f.value;
        f.value = t.value;
        t.value = temp;
        calcCurr();
      }`;

const newCurrJS = `      // Expanded 60+ Currencies
      const currNames = {
        USD: "US Dollar", EUR: "Euro", GBP: "British Pound", INR: "Indian Rupee", PKR: "Pakistani Rupee", 
        AED: "UAE Dirham", SAR: "Saudi Riyal", CAD: "Canadian Dollar", AUD: "Australian Dollar", JPY: "Japanese Yen",
        CNY: "Chinese Yuan", BRL: "Brazilian Real", ZAR: "South African Rand", SGD: "Singapore Dollar", CHF: "Swiss Franc",
        NZD: "New Zealand Dollar", HKD: "Hong Kong Dollar", SEK: "Swedish Krona", KRW: "South Korean Won", NOK: "Norwegian Krone",
        MXN: "Mexican Peso", RUB: "Russian Ruble", TRY: "Turkish Lira", MYR: "Malaysian Ringgit", THB: "Thai Baht",
        IDR: "Indonesian Rupiah", HUF: "Hungarian Forint", CZK: "Czech Koruna", ILS: "Israeli New Shekel", PHP: "Philippine Peso",
        PLN: "Polish Zloty", DKK: "Danish Krone", RON: "Romanian Leu", COP: "Colombian Peso", CLP: "Chilean Peso",
        EGP: "Egyptian Pound", JOD: "Jordanian Dinar", OMR: "Omani Rial", QAR: "Qatari Riyal", KWD: "Kuwaiti Dinar",
        BHD: "Bahraini Dinar", TWD: "New Taiwan Dollar", ARS: "Argentine Peso", PEN: "Peruvian Sol", VND: "Vietnamese Dong",
        NGN: "Nigerian Naira", KES: "Kenyan Shilling", LKR: "Sri Lankan Rupee", BDT: "Bangladeshi Taka", MAD: "Moroccan Dirham",
        VUV: "Vanuatu Vatu", XAF: "CFA Franc BEAC", XOF: "CFA Franc BCEAO", ISK: "Icelandic Króna", DZD: "Algerian Dinar"
      };
      
      let rates = {};
      let currState = { from: "USD", to: "EUR" };

      function initCurr() {
        renderCurrDropdown("from", currNames);
        renderCurrDropdown("to", currNames);
        updateCurrBtnText("from");
        updateCurrBtnText("to");

        fetch("https://api.exchangerate-api.com/v4/latest/USD")
          .then((res) => res.json())
          .then((data) => {
            rates = data.rates;
            document.getElementById("curr-info").innerText = "Live exchange rates updated.";
            calcCurr();
          })
          .catch(() => {
            document.getElementById("curr-info").innerText = "Error fetching live rates.";
          });
          
        // Click outside to close custom dropdowns
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown-container')) {
                document.getElementById('curr-from-dropdown').classList.add('hidden');
                document.getElementById('curr-to-dropdown').classList.add('hidden');
            }
        });
      }

      function renderCurrDropdown(type, listObj) {
        const listDiv = document.getElementById(\`curr-\${type}-list\`);
        let html = '';
        const sorted = Object.entries(listObj).sort();
        if (sorted.length === 0) {
            html = '<div class="px-4 py-2 text-sm text-slate-500">No matching currencies.</div>';
        } else {
            sorted.forEach(([code, name]) => {
                const isActive = currState[type] === code;
                html += \`<div onclick="selectCurr('\${type}', '\${code}')" class="px-4 py-2.5 hover:bg-teal-50 cursor-pointer flex items-center justify-between transition-colors \${isActive ? 'bg-teal-50/50 font-bold text-teal-700' : 'text-slate-700 font-medium'}">
                    <span><span class="w-10 inline-block font-mono text-slate-400">\${code}</span> \${name}</span>
                    \${isActive ? '<svg class="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>' : ''}
                </div>\`;
            });
        }
        listDiv.innerHTML = html;
      }
      
      function toggleDropdown(type) {
        const drop = document.getElementById(\`curr-\${type}-dropdown\`);
        const otherDrop = document.getElementById(\`curr-\${type === 'from' ? 'to' : 'from'}-dropdown\`);
        otherDrop.classList.add('hidden');
        drop.classList.toggle('hidden');
        if(!drop.classList.contains('hidden')) {
            document.getElementById(\`curr-\${type}-search\`).focus();
        }
      }

      function filterCurr(type, q) {
        q = q.toLowerCase();
        let filtered = {};
        for(let key in currNames) {
            if(key.toLowerCase().includes(q) || currNames[key].toLowerCase().includes(q)) {
                filtered[key] = currNames[key];
            }
        }
        renderCurrDropdown(type, filtered);
      }

      function selectCurr(type, code) {
        currState[type] = code;
        updateCurrBtnText(type);
        document.getElementById(\`curr-\${type}-dropdown\`).classList.add('hidden');
        document.getElementById(\`curr-\${type}-search\`).value = '';
        renderCurrDropdown(type, currNames); 
        calcCurr();
      }

      function updateCurrBtnText(type) {
        document.getElementById(\`curr-\${type}-text\`).innerText = currState[type] + " - " + currNames[currState[type]];
      }

      function calcCurr() {
        let f = currState.from;
        let t = currState.to;
        let amt = parseFloat(document.getElementById("curr-amount").value) || 0;
        if (!rates[f] || !rates[t]) return;
        let r = rates[t] / rates[f];
        // handle extreme decimal values
        let rawVal = amt * r;
        let formatted = rawVal < 0.01 ? rawVal.toPrecision(3) : formatNum((rawVal).toFixed(2));
        document.getElementById("curr-res").innerText = formatted + " " + t;
      }

      function swapCurr() {
        let temp = currState.from;
        currState.from = currState.to;
        currState.to = temp;
        updateCurrBtnText('from');
        updateCurrBtnText('to');
        renderCurrDropdown('from', currNames);
        renderCurrDropdown('to', currNames);
        calcCurr();
      }`;

html = html.replace(oldCurrJS, newCurrJS);


// Clean up calculator gap/sizes
const oldCalcGridClass = `                          <div class="grid grid-cols-4 gap-2 sm:gap-3">`;
const newCalcGridClass = `                          <div class="grid grid-cols-4 gap-3 sm:gap-4">`;
html = html.replace(oldCalcGridClass, newCalcGridClass);

// Tweak calculator buttons
html = html.replace(/hover:bg-slate-100 text-slate-600 border border-slate-200 py-[a-zA-Z\.0-9\-]+ sm:py-[a-zA-Z\.0-9\-]+/g, `hover:bg-teal-50 hover:border-teal-200 hover:text-teal-700 text-slate-600 border border-slate-200 py-3.5 sm:py-4 transition-colors`);

// Fix big numbers and + button sizes to look perfectly aligned
html = html.replace(/<button onclick="ca\('\+'\)" class="calc-btn bg-teal-50 hover:bg-teal-100 hover:text-teal-800 text-teal-600 border border-teal-200 py-4 text-2xl font-black rounded-xl mt-\[-76px\] sm:mt-\[-82px\] h-\[152px\] sm:h-\[164px\]">\+<\/button>/, `<button onclick="ca('+')" class="calc-btn bg-teal-50 hover:bg-teal-100 hover:text-teal-800 text-teal-600 border border-teal-200 py-4 text-2xl font-black rounded-xl mt-[-80px] sm:mt-[-88px] h-[160px] sm:h-[176px]">+</button>`);


fs.writeFileSync('index.html', html);
console.log('Premium upgrades applied');
