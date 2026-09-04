// Servidor estático para revisar o site renderizado antes de aprovar um PR.
//
// Por que existe: a revisão do dia a dia é pelo diff do PR, e diff não mostra
// espaçamento, quebra de manchete nem peso de logo. Quando a mudança é visual,
// vale abrir. Um comando, sem instalar nada.
//
//   node scripts/servir.mjs        → http://localhost:4321
//   node scripts/servir.mjs 8080   → outra porta
//
// Resolve pasta para index.html, do mesmo jeito que o GitHub Pages serve.

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PORTA = Number(process.argv[2]) || 4321;

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2',
};

createServer(async (req, res) => {
  const pedido = decodeURIComponent(req.url.split('?')[0]);

  // Nunca servir fora da raiz do repositório, mesmo com ../ na URL.
  const alvo = normalize(join(RAIZ, pedido));
  if (!alvo.startsWith(RAIZ)) {
    res.writeHead(403, { 'content-type': 'text/plain; charset=utf-8' });
    return res.end('403');
  }

  try {
    const info = await stat(alvo).catch(() => null);
    const caminho = !info || info.isDirectory() ? join(alvo, 'index.html') : alvo;
    const corpo = await readFile(caminho);
    res.writeHead(200, {
      'content-type': TIPOS[extname(caminho).toLowerCase()] || 'application/octet-stream',
      // Sem cache: revisão em que o navegador segura a versão antiga é pior
      // que revisão nenhuma.
      'cache-control': 'no-store',
    });
    res.end(corpo);
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('404');
  }
}).listen(PORTA, () => {
  console.log(`\n  servindo ${RAIZ}\n  http://localhost:${PORTA}\n\n  ctrl+c para parar\n`);
});
