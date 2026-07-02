// Passada única: alinha cache-busting (v=20) e adiciona Space Grotesk nos heads do blog.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const blogDir = new URL('../blog', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const files = readdirSync(blogDir).filter(f => f.endsWith('.html'));

const FONTS_OLD = 'family=Inter:wght@400;500;600;700;900&display=swap';
const FONTS_NEW = 'family=Inter:wght@400;500;600;700;900&family=Space+Grotesk:wght@500;600;700&display=swap';

let changed = 0;
for (const file of files) {
  const path = join(blogDir, file);
  const before = readFileSync(path, 'utf8');
  const after = before
    .replace(/style\.css\?v=\d+/g, 'style.css?v=20')
    .replace(/main\.js\?v=\d+/g, 'main.js?v=20')
    .replace(FONTS_OLD, FONTS_NEW);
  if (after !== before) {
    writeFileSync(path, after, 'utf8');
    changed++;
    console.log(`updated: ${file}`);
  }
}
console.log(`\n${changed}/${files.length} arquivos atualizados.`);
