const tools = [
  {
    id: "world-clock",
    name: "World Clock",
    icon: "🌍",
    cat: "Utilities",
    keys: "time zone timezone global clock hour minute earth",
    link: "tools.html#world-clock"
  },
  {
    id: "currency-converter",
    name: "Currency Converter",
    icon: "💱",
    cat: "Finance",
    keys: "money exchange rate dollar euro cash conversion",
    link: "tools.html#currency-converter"
  },
  {
    id: "unit-converter",
    name: "Unit Converter",
    icon: "⚖️",
    cat: "Utilities",
    keys: "measurement length weight temperature metric imperial distance",
    link: "tools.html#unit-converter"
  },
  {
    id: "scientific-calculator",
    name: "Scientific Calc",
    icon: "➗",
    cat: "Math",
    keys: "math algebra calculator scientific sine cosine algebra",
    link: "tools.html#scientific-calculator"
  },
  {
    id: "emi-calculator",
    name: "EMI Calculator",
    icon: "🏦",
    cat: "Finance",
    keys: "loan rate mortgage interest payment installment",
    link: "tools.html#emi-calculator"
  },
  {
    id: "tip-calculator",
    name: "Tip Calculator",
    icon: "💰",
    cat: "Finance",
    keys: "gratuity bill split tip restaurant divide percentage",
    link: "tools.html#tip-calculator"
  },
  {
    id: "percentage-calculator",
    name: "Percentage",
    icon: "🔢",
    cat: "Math",
    keys: "percent fraction ratio math proportion",
    link: "tools.html#percentage-calculator"
  },
  {
    id: "age-calculator",
    name: "Age Calculator",
    icon: "🎂",
    cat: "Utilities",
    keys: "birthday birth date years months days old difference",
    link: "tools.html#age-calculator"
  },
  {
    id: "bmi-calculator",
    name: "BMI Calculator",
    icon: "💪",
    cat: "Health",
    keys: "body mass index weight height fitness fat",
    link: "tools.html#bmi-calculator"
  },
  {
    id: "calorie-calculator",
    name: "Calorie Calc",
    icon: "🔥",
    cat: "Health",
    keys: "food diet nutrition daily bmr intake energy",
    link: "tools.html#calorie-calculator"
  },
  {
    id: "password-generator",
    name: "Password Gen",
    icon: "🔑",
    cat: "Security",
    keys: "secure random strength hash code phrase credential",
    link: "tools.html#password-generator"
  }
];

function initSearch(inputId, dropId) {
  const inp = document.getElementById(inputId);
  const drop = document.getElementById(dropId);

  if (!inp || !drop) return;

  const highlight = (text, q) => {
    if (!q) return text;
    const escapedQ = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escapedQ})`, "gi");
    return text.replace(regex, '<span class="bg-teal-100 text-teal-800 rounded px-0.5">$1</span>');
  };

  inp.addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (!q) {
      drop.classList.add("hidden");
      return;
    }
    const m = tools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.cat.toLowerCase().includes(q) ||
        (t.keys && t.keys.toLowerCase().includes(q)),
    );
    if (m.length) {
      drop.innerHTML = m
        .map(
          (t) =>
            `<a href="${t.link}" class="p-3 hover:bg-teal-50 cursor-pointer flex items-center justify-between gap-3 border-b border-slate-50 transition-colors last:border-0">
               <div class="flex items-center gap-3">
                 <div class="text-xl w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center border border-slate-100">${t.icon}</div>
                 <div class="flex flex-col">
                   <span class="font-bold text-sm text-slate-800 leading-tight">${highlight(t.name, q)}</span>
                   <span class="text-[0.65rem] font-medium text-slate-500 uppercase tracking-wider mt-0.5">${highlight(t.cat, q)}</span>
                 </div>
               </div>
             </a>`,
        )
        .join("");
      drop.classList.remove("hidden");
    } else {
      drop.innerHTML =
        '<div class="p-5 text-center flex flex-col items-center justify-center gap-2"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-slate-300"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg><p class="text-sm text-slate-500 font-medium">No tools found for "<span class="text-slate-700 font-bold">' +
        e.target.value.replace(/</g, "&lt;").replace(/>/g, "&gt;") +
        '</span>"</p></div>';
      drop.classList.remove("hidden");
    }
  });
  document.addEventListener("click", (e) => {
    if (!inp.contains(e.target) && !drop.contains(e.target))
      drop.classList.add("hidden");
  });
}

// Global initialization for search bar if it exists
document.addEventListener("DOMContentLoaded", () => {
  initSearch("header-search", "search-dropdown");
});
