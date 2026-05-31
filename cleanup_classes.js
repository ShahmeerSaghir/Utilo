import fs from 'fs';
import path from 'path';

const dir = 'src/components';
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.tsx')) {
    const filePath = path.join(dir, file);
    let code = fs.readFileSync(filePath, 'utf8');

    // Clean up duplicated or bloated tailwind classes
    code = code.replace(/text-4xl sm:text-4xl sm:text-5xl/g, 'text-4xl sm:text-5xl');
    code = code.replace(/text-4xl sm:text-5xl sm:text-4xl sm:text-5xl/g, 'text-4xl sm:text-5xl');
    code = code.replace(/text-4xl sm:text-4xl/g, 'text-4xl sm:text-5xl');
    code = code.replace(/text-4xl sm:text-5xl sm:text-5xl/g, 'text-4xl sm:text-5xl');
    code = code.replace(/p-5 sm:p-8/g, 'p-6 sm:p-8');
    
    fs.writeFileSync(filePath, code);
  }
});
