import { cp, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const exportDirectory = path.join(projectDirectory, 'out');
const cordovaDirectory = path.join(projectDirectory, 'www');
const indexPath = path.join(exportDirectory, 'index.html');

const indexHtml = await readFile(indexPath, 'utf8');
if (!indexHtml.includes('</body>')) {
  throw new Error('Next.js export does not contain a closing body tag.');
}

await rm(cordovaDirectory, { recursive: true, force: true });
await cp(exportDirectory, cordovaDirectory, { recursive: true });

const cordovaIndexPath = path.join(cordovaDirectory, 'index.html');
await writeFile(cordovaIndexPath, indexHtml.replace('</body>', '<script src="cordova.js"></script></body>'));

console.log('Prepared the static export in Cordova www/.');