import fs from 'fs';

let content = fs.readFileSync('src/components/ScientificCalculator.tsx', 'utf-8');

// Container
content = content.replace('p-6 sm:p-8 flex flex-col h-full bg-white min-h-[600px]', 'p-4 sm:p-6 flex flex-col h-full bg-white max-w-[400px] sm:max-w-md mx-auto w-full min-h-[500px]');
content = content.replace('min-h-[140px]', 'min-h-[100px] sm:min-h-[120px]');
content = content.replace('text-5xl sm:text-7xl', 'text-4xl sm:text-5xl');
content = content.replace('p-6 sm:p-8 mb-6', 'p-4 sm:p-6 mb-4 sm:mb-5');
content = content.replace('gap-3 sm:gap-4', 'gap-2 sm:gap-3');
content = content.replace('p-2 sm:p-4 bg-slate-100/50', 'p-2 sm:p-3 bg-slate-100/50');
content = content.replace(/p-3 sm:p-4/g, 'p-2 sm:p-3');
content = content.replace(/text-3xl sm:text-4xl/g, 'text-2xl sm:text-3xl');
content = content.replace(/text-2xl sm:text-3xl/g, 'text-xl sm:text-2xl');

fs.writeFileSync('src/components/ScientificCalculator.tsx', content);
