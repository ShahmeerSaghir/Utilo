import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonString = fs.readFileSync(path.join(__dirname, 'index.json'), 'utf8');
const data = JSON.parse(jsonString);

fs.writeFileSync(path.join(__dirname, 'index.html'), data.html);
console.log('Successfully wrote index.html');
