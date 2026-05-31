import fs from 'fs';

let content = fs.readFileSync('build_index.js', 'utf8');
// content has `const htmlContent = \`<!DOCTYPE html>... \`;
// we will construct our own single file HTML from scratch to be safe, by extracting templates.

const toolsMeta = [
    { id: "world-clock", name: "World Clock", icon: "🌍", cat: "Utilities", desc: "Check current time across major global timezones effortlessly." },
    { id: "currency-converter", name: "Currency Converter", icon: "💱", cat: "Finance", desc: "Convert global currencies instantly with real-time exchange rates." },
    { id: "unit-converter", name: "Unit Converter", icon: "⚖️", cat: "Utilities", desc: "Easily convert lengths, weights, and temperatures between systems." },
    { id: "scientific-calculator", name: "Scientific Calc", icon: "➗", cat: "Math", desc: "Perform advanced mathematical operations including trigonometry and logarithms." },
    { id: "emi-calculator", name: "EMI Calc", icon: "🏦", cat: "Finance", desc: "Plan your loan repayment accurately with monthly EMI breakdowns." },
    { id: "tip-calculator", name: "Tip Calc", icon: "💰", cat: "Finance", desc: "Calculate precise restaurant tips and split bills instantly." },
    { id: "percentage-calculator", name: "Percentage", icon: "🔢", cat: "Math", desc: "Quickly compute percentages for discounts, tips, and tests." },
    { id: "age-calculator", name: "Age Calc", icon: "🎂", cat: "Utilities", desc: "Find your exact age in years, months, and days with high precision." },
    { id: "bmi-calculator", name: "BMI Calc", icon: "💪", cat: "Health", desc: "Examine your Body Mass Index for a healthier lifestyle." },
    { id: "daily-calorie-calculator", name: "Calorie Calc", icon: "🔥", cat: "Health", desc: "Estimate everyday calorie needs for weight maintenance and goals." },
    { id: "password-generator", name: "Password Gen", icon: "🔑", cat: "Security", desc: "Create robust, secure passwords to shield your digital accounts." }
];

let baseHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Utilo - All Free Online Tools</title>
    <meta name="description" content="Fast, Accurate & Easy to Use Online Tools for your daily needs." />
    <meta name="keywords" content="online tools, calculator, converter, free tools, utilo" />
    <meta property="og:title" content="Utilo - All Free Online Tools" />
    <meta property="og:type" content="website" />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='%2314b8a6'/%3E%3Cpath d='M30 50 L45 65 L70 35' stroke='white' stroke-width='10' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E" />
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
        .view.active { display: block; }
        .tool-section { display: none; }
        .tool-section.active { display: block; }
        html { scroll-behavior: smooth; }
        .glass-input { width: 100%; background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 1rem; padding: 0.75rem 1rem; font-weight: 600; color: #1e293b; outline: none; transition: all 0.2s; }
        .glass-input:focus { border-color: #2dd4bf; background: #fff; box-shadow: 0 0 0 4px rgba(45,212,191,0.1); }
        .label-text { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 0.35rem; display: block; }
        .calc-btn { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 0.75rem; font-weight: 600; color: #334155; transition: all 0.1s; display: flex; align-items: center; justify-content: center; }
        .calc-btn:active { transform: scale(0.95); background: #e2e8f0; }
        .result-box { background: #14b8a6; border-radius: 1.25rem; padding: 1.5rem; text-align: center; color: white; display:flex; flex-direction: column; justify-content:center; align-items:center; }
        .result-box p { margin: 0; }
        
        /* Accordion CSS for SEO */
        details { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 0.75rem; padding: 0.75rem 1.25rem; margin-bottom: 0.75rem; box-shadow: 0 1px 2px 0 rgba(0,0,0,0.02); transition: all 0.3s ease; }
        details[open] { border-color: #99f6e4; box-shadow: 0 4px 6px -1px rgba(20,184,166,0.1); }
        summary { font-weight: 600; color: #1e293b; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; outline: none; }
        summary::-webkit-details-marker { display: none; }
        summary::after { content: "+"; font-size: 1.25rem; color: #14b8a6; font-weight: 400; transition: transform 0.3s ease; }
        details[open] summary::after { transform: rotate(45deg); }
        details p, details ul { color: #475569; font-size: 0.9rem; margin-top: 0.75rem; line-height: 1.6; }
        details ul { list-style-type: disc; padding-left: 1.5rem; }
        
        /* Hide scrollbar for sidebar */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    </style>
</head>
<body class="text-slate-800 flex flex-col antialiased selection:bg-teal-200 bg-slate-50 min-h-screen">
`;

// Extract header tools wrapper
let rawContent = content.substring(content.indexOf('<!-- Header -->'));
rawContent = rawContent.replace(/\\`/g, '\`');
rawContent = rawContent.replace(/\\\$/g, '\$');

// Let's just generate the HTML pieces purely in the script, it's safer.
