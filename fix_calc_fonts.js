import fs from 'fs';

let content = fs.readFileSync('src/components/ScientificCalculator.tsx', 'utf-8');

// Operators (+, -, ×, ÷, =) have flex justify-center items-center
// Let's replace text-xl sm:text-2xl with text-3xl sm:text-4xl (for math ops) IF they contain 'bg-teal-50' or 'bg-gradient'
const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('bg-teal-50') || lines[i].includes('bg-gradient')) {
    lines[i] = lines[i].replace('text-xl sm:text-2xl', 'text-3xl sm:text-4xl');
    // For = sign
    lines[i] = lines[i].replace('text-xl sm:text-2xl', 'text-3xl sm:text-4xl'); 
  } else if (lines[i].includes('bg-white/70')) {
    // Digits
    lines[i] = lines[i].replace('text-xl sm:text-2xl', 'text-2xl sm:text-3xl');
  } else if (lines[i].includes('bg-slate-200')) {
    // C, ( )
    if(lines[i].includes('text-lg sm:text-xl')) {
      lines[i] = lines[i].replace('text-lg sm:text-xl', 'text-xl sm:text-2xl');
    }
  } else if (lines[i].includes('bg-white/40')) {
    // Sci functions
    if(lines[i].includes('text-sm sm:text-base')) {
       // leave as is, it's good
    }
  }
}

fs.writeFileSync('src/components/ScientificCalculator.tsx', lines.join('\n'));
