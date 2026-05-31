import fs from 'fs';
import path from 'path';

const dir = 'src/components';
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.tsx')) {
    const filePath = path.join(dir, file);
    let code = fs.readFileSync(filePath, 'utf8');

    // Reduce padding
    code = code.replace(/p-6 sm:p-8/g, 'p-5 sm:p-8');
    code = code.replace(/p-8 sm:p-12/g, 'p-6 sm:p-8');
    code = code.replace(/p-6 sm:p-10/g, 'p-5 sm:p-8');

    // Reduce font sizes for results
    code = code.replace(/text-5xl sm:text-7xl/g, 'text-4xl sm:text-5xl');
    code = code.replace(/text-5xl sm:text-6xl/g, 'text-4xl sm:text-5xl');
    code = code.replace(/text-[5-7]xl/g, 'text-4xl sm:text-5xl');

    // Fix large margins/paddings
    code = code.replace(/min-h-\[160px\]/g, 'min-h-[120px]');
    
    fs.writeFileSync(filePath, code);
  }
});
