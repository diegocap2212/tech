// Reconstrói o sitemap inteiro a partir dos próprios posts.
//
// Por que reconstruir em vez de editar: a rotina de publicação nunca tocava o
// sitemap, e os 12 posts publicados entre maio e julho/2026 ficaram fora dele —
// meses invisíveis para o Google. Um arquivo derivado não deve ter estado
// próprio para alguém esquecer de sincronizar.
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const BLOG = join(RAIZ, 'blog');
const SITEMAP = join(RAIZ, 'sitemap.xml');
const BASE = 'https://celeretech.com.br';

// obrigado.html fica de fora de propósito: é noindex, nofollow.
const FORA = new Set(['index.html', '_template.html']);

// A quebra de linha não pode ser fixa: com core.autocrlf o checkout é CRLF no
// Windows e LF no sandbox Linux da rotina. Chumbar CRLF sujaria o diff inteiro
// de um lado ou do outro.
const quebraDe = (texto) => (texto.includes('\r\n') ? '\r\n' : '\n');
const EOL = existsSync(SITEMAP) ? quebraDe(readFileSync(SITEMAP, 'utf8')) : '\n';

// Lê "campo": "valor" do JSON-LD por índice: escapar barra dentro de template
// literal é frágil demais para uma busca desta simplicidade.
const campo = (html, nome) => {
  const chave = html.indexOf(`"${nome}"`);
  if (chave === -1) return null;
  const abre = html.indexOf('"', html.indexOf(':', chave + nome.length + 2) + 1);
  const fecha = html.indexOf('"', abre + 1);
  return abre === -1 || fecha === -1 ? null : html.slice(abre + 1, fecha);
};

const posts = readdirSync(BLOG)
  .filter((f) => f.endsWith('.html') && !FORA.has(f))
  .map((arquivo) => {
    const html = readFileSync(join(BLOG, arquivo), 'utf8');
    const publicado = campo(html, 'datePublished');
    if (!publicado) throw new Error(`${arquivo}: sem datePublished no JSON-LD`);
    return { arquivo, publicado, lastmod: campo(html, 'dateModified') ?? publicado };
  })
  .sort((a, b) => b.publicado.localeCompare(a.publicado));

// A home não muda a cada post: o lastmod dela é o commit que de fato a alterou.
const commitDe = (caminho) => {
  try {
    return (
      execFileSync('git', ['log', '-1', '--format=%cs', '--', caminho], {
        cwd: RAIZ,
        encoding: 'utf8',
      }).trim() || null
    );
  } catch {
    return null;
  }
};

const hoje = new Date().toISOString().slice(0, 10);

const entradas = [
  { loc: `${BASE}/`, lastmod: commitDe('index.html') ?? hoje, freq: 'monthly', prio: '1.0' },
  { loc: `${BASE}/blog/`, lastmod: posts[0]?.publicado ?? hoje, freq: 'weekly', prio: '0.8' },
  ...posts.map((p) => ({
    loc: `${BASE}/blog/${p.arquivo}`,
    lastmod: p.lastmod,
    freq: 'monthly',
    prio: '0.7',
  })),
];

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  '',
  ...entradas.flatMap((e) => [
    '  <url>',
    `    <loc>${e.loc}</loc>`,
    `    <lastmod>${e.lastmod}</lastmod>`,
    `    <changefreq>${e.freq}</changefreq>`,
    `    <priority>${e.prio}</priority>`,
    '  </url>',
    '',
  ]),
  '</urlset>',
  '',
].join(EOL);

writeFileSync(SITEMAP, xml, 'utf8');
console.log(`sitemap.xml: ${entradas.length} URLs (${posts.length} posts).`);
