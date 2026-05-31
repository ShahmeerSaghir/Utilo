import fs from 'fs';
import path from 'path';

const dir = 'src/components';
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.tsx')) {
    const filePath = path.join(dir, file);
    let code = fs.readFileSync(filePath, 'utf8');
    
    // Replace p-6 sm:p-8 ... bg-white with just transparent or removing bg-white
    // Or we just find className="p-[...] ... bg-white" and replace bg-white with bg-transparent
    if (code.includes('bg-white max-w-')) {
      code = code.replace(/bg-white max-w-/g, 'bg-transparent max-w-');
    }
    // Also cover regular bg-white on the outermost div
    // A quick way is to replace className="p-6 sm:p-8 flex flex-col h-full bg-white" => "p-6 sm:p-8 flex flex-col h-full bg-transparent"
    code = code.replace('h-full bg-white"', 'h-full bg-transparent"');
    code = code.replace('h-full bg-white min-h', 'h-full bg-transparent min-h');
    fs.writeFileSync(filePath, code);
  }
});
