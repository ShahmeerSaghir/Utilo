import fs from 'fs';

const htmlContent = fs.readFileSync('build_index.js', 'utf8').split('\n').slice(2, -2).join('\n').replace(/^const htmlContent \= \`/, '').replace(/\`\;$/, '');

// htmlContent is the giant string.
// Let's split it into parts to create index.html and tools.html

let headHtml = htmlContent.substring(0, htmlContent.indexOf('</head>') + 7);
let headerHtml = htmlContent.substring(htmlContent.indexOf('<!-- Header -->'), htmlContent.indexOf('<!-- Mobile Search Bar -->'));
let mobileSearchHtml = htmlContent.substring(htmlContent.indexOf('<!-- Mobile Search Bar -->'), htmlContent.indexOf('<main'));
let footerHtml = htmlContent.substring(htmlContent.indexOf('<footer'), htmlContent.indexOf('</footer>') + 9);

let homeView = htmlContent.substring(htmlContent.indexOf('<!-- Home View -->'), htmlContent.indexOf('<!-- Tool View Wrapper -->'));
let toolView = htmlContent.substring(htmlContent.indexOf('<!-- Tool View Wrapper -->'), htmlContent.indexOf('</main>'));
let tailwindScriptIndex = htmlContent.indexOf('<script>');
let lastScriptIndex = htmlContent.lastIndexOf('<script>');
let scriptContent = htmlContent.substring(lastScriptIndex, htmlContent.lastIndexOf('</script>') + 9);

// For index.html
let indexScript = `
<script>
    const tools = [
        { id: "world-clock", name: "World Clock", icon: "🌍", cat: "Utilities" },
        { id: "currency-converter", name: "Currency Converter", icon: "💱", cat: "Finance" },
        { id: "unit-converter", name: "Unit Converter", icon: "⚖️", cat: "Utilities" },
        { id: "scientific-calculator", name: "Scientific Calc", icon: "➗", cat: "Math" },
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
            <a href="tools.html#\${t.id}" class="tool-card bg-white p-6 sm:p-8 rounded-[1.5rem] cursor-pointer flex flex-col items-center text-center gap-3 relative overflow-hidden group shadow-sm">
                <div class="absolute inset-0 bg-gradient-to-b from-transparent to-teal-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div class="text-4xl sm:text-5xl p-4 bg-slate-50 rounded-2xl group-hover:scale-110 transition-transform duration-300 relative z-10 border border-slate-100/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">\${t.icon}</div>
                <h3 class="font-extrabold text-slate-800 text-lg leading-tight relative z-10 mt-2 group-hover:text-teal-700 transition-colors">\${t.name}</h3>
                <span class="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold px-2.5 py-1 bg-teal-50/80 text-teal-700 rounded-lg relative z-10 border border-teal-100/50">\${t.cat}</span>
            </a>\`).join('') : '<p class="col-span-full text-center text-slate-500 py-10">No tools found.</p>';
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

    renderCards(tools);
</script>
`;

let indexOutput = headHtml + `
<body class="text-slate-800 flex flex-col antialiased selection:bg-teal-200">
` + headerHtml.replace('id="back-btn"', 'id="back-btn" class="hidden"') + mobileSearchHtml + `
<main class="flex-grow flex flex-col relative w-full pt-8 pb-16 min-h-[calc(100vh-140px)]">
` + homeView.replace('id="home-view" class="view active', 'id="home-view" class="active') + `
</main>
` + footerHtml + indexScript + `
</body>
</html>
`;
fs.writeFileSync('index.html', indexOutput);


// For tools.html
let toolsScript = scriptContent
    .replace(/function showHome[\s\S]*?function show/m, 'function show')
    .replace(/showHome\(\);/g, "const hash = window.location.hash.substring(1);\n    if(hash) { show(hash); } else { show('world-clock'); }");

// Update back btn to go to index.html
let toolHeader = headerHtml
    .replace(/<a href="#" onclick="showHome[^>]*>/, '<a href="index.html" class="text-2xl font-extrabold text-slate-900 flex items-center gap-2.5 group tracking-tight">')
    .replace(/<button id="back-btn" onclick="showHome[^>]*>/, '<a id="back-btn" href="index.html" class="text-sm font-semibold text-slate-600 hover:text-teal-700 bg-white border border-slate-200 shadow-sm hover:bg-teal-50 hover:border-teal-200 px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 active:scale-95">')
    .replace('</button>', '</a>')
    .replace(/id="search-bar"[^>]*>/, 'id="search-bar" class="hidden">')

let toolOutput = headHtml + `
<body class="text-slate-800 flex flex-col antialiased selection:bg-teal-200">
` + toolHeader + `
<main class="flex-grow flex flex-col flex-wrap lg:flex-nowrap lg:flex-row relative w-full pt-6 pb-16 max-w-6xl mx-auto px-4 gap-6">

    <aside class="w-full lg:w-64 flex-shrink-0">
        <div class="bg-white rounded-[1.5rem] shadow-sm border border-slate-100 p-4 sticky top-24">
            <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest pl-3 mb-3">All Tools</h3>
            <nav id="tool-nav" class="flex flex-col gap-1">
                <!-- Nav items generated by JS -->
            </nav>
        </div>
    </aside>

    <div class="flex-1 w-full">
` + toolView.replace(/id="tool-view" class="view([^"]*)"/, 'id="tool-view" class="w-full"') + `
    </div>
</main>
` + footerHtml + toolsScript.replace('function show(id) {', `
    function show(id) {
        document.querySelectorAll('.tool-section').forEach(el => el.classList.remove('active'));
        const target = document.getElementById('tool-' + id);
        if(target) target.classList.add('active');
        
        document.querySelectorAll('#tool-nav button').forEach(el => {
            el.classList.remove('bg-teal-50', 'text-teal-700', 'border-transparent');
            el.classList.add('text-slate-600', 'border-transparent', 'hover:bg-slate-50', 'hover:border-slate-200');
        });
        const activeNav = document.getElementById('nav-' + id);
        if(activeNav) {
            activeNav.classList.remove('text-slate-600', 'border-transparent', 'hover:bg-slate-50', 'hover:border-slate-200');
            activeNav.classList.add('bg-teal-50', 'text-teal-700', 'border-teal-200', 'font-bold');
        }
        window.history.replaceState(null, null, '#' + id);
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    const navHtml = tools.map(t => \`<button id="nav-\${t.id}" onclick="show('\${t.id}')" class="flex items-center gap-3 w-full text-left px-4 py-2.5 rounded-xl transition-all border border-transparent text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-200">\${t.icon} \${t.name}</button>\`).join('');
    document.getElementById('tool-nav').innerHTML = navHtml;
`) + `
</body>
</html>
`;
fs.writeFileSync('tools.html', toolOutput);
