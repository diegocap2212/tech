// Preenche o bloco "Leia também" de cada post do blog.
//
// Por que existe: a lista de posts linkáveis vivia chumbada no prompt da rotina
// de publicação, congelada nos 5 artigos originais. Os 12 posts publicados
// depois nunca receberam um link interno sequer — fora da index, eram órfãos.
//
// A escolha é balanceada de propósito: processa do post mais antigo para o mais
// novo e, dentro da mesma categoria, prefere quem recebeu menos links até ali.
// Sem isso os mesmos poucos hubs concentrariam tudo de novo.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const BLOG = join(dirname(fileURLToPath(import.meta.url)), '..', 'blog');
const FORA = new Set(['index.html', '_template.html']);
const QUANTOS = 3;

const INICIO = '<!-- related:start -->';
const FIM = '<!-- related:end -->';

// A quebra de linha não pode ser fixa: com core.autocrlf o checkout é CRLF no
// Windows e LF no sandbox Linux da rotina. Um post com quebras misturadas conta
// como CRLF, que é o que a âncora do fim do artigo usa nesses arquivos.
const quebraDe = (texto) => (texto.includes('\r\n') ? '\r\n' : '\n');

// Extração por índice, sem regex: escapar barra em template literal já quebrou
// este script uma vez e a marcação aqui é fixa o bastante para não precisar.
const entre = (texto, abertura, fechamento) => {
  const i = texto.indexOf(abertura);
  if (i === -1) return null;
  const j = texto.indexOf(fechamento, i + abertura.length);
  return j === -1 ? null : texto.slice(i + abertura.length, j);
};

const campoJsonLd = (html, nome) => {
  const chave = html.indexOf(`"${nome}"`);
  if (chave === -1) return null;
  const abre = html.indexOf('"', html.indexOf(':', chave + nome.length + 2) + 1);
  const fecha = html.indexOf('"', abre + 1);
  return abre === -1 || fecha === -1 ? null : html.slice(abre + 1, fecha);
};

// "Gestão & Processos" aparece escapada em alguns posts e crua em outros; sem
// normalizar, a mesma categoria vira duas e o agrupamento se perde.
const normalizar = (s) => s.replace(/&amp;/g, '&').trim();
const escapar = (s) => s.replace(/&/g, '&amp;');

const posts = readdirSync(BLOG)
  .filter((f) => f.endsWith('.html') && !FORA.has(f))
  .map((arquivo) => {
    const html = readFileSync(join(BLOG, arquivo), 'utf8');
    const categoria = entre(html, '<p class="article-cat reveal">', '</p>');
    const titulo = entre(html, '<h1 class="reveal">', '</h1>');
    const data = campoJsonLd(html, 'datePublished');
    if (!categoria || !titulo || !data) throw new Error(`${arquivo}: hero fora do padrão`);
    return { arquivo, html, titulo: titulo.trim(), categoria: normalizar(categoria), data };
  });

const recebidos = new Map(posts.map((p) => [p.arquivo, 0]));

const escolherPara = (post) =>
  posts
    .filter((o) => o.arquivo !== post.arquivo)
    .sort((a, b) => {
      const mesma = (o) => (o.categoria === post.categoria ? 0 : 1);
      return (
        mesma(a) - mesma(b) ||
        recebidos.get(a.arquivo) - recebidos.get(b.arquivo) ||
        b.data.localeCompare(a.data) ||
        a.arquivo.localeCompare(b.arquivo)
      );
    })
    .slice(0, QUANTOS);

// Escopado sob .article-body: as regras base do artigo para ul e li têm
// especificidade maior que classe solta e sobrescreveriam o bloco.
const ESTILO = [
  '    <style>',
  '      .article-body .related { margin-top: 56px; padding-top: 32px; border-top: 1px solid var(--border); }',
  '      .article-body .related__title { font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--slate-light); margin-bottom: 20px; }',
  '      .article-body .related__list { list-style: none; margin: 0; padding: 0; }',
  '      .article-body .related__list li { margin: 0 0 18px; }',
  '      .article-body .related__cat { display: block; font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--orange); margin-bottom: 2px; }',
  '      .article-body .related__list a { font-size: 17px; font-weight: 600; line-height: 1.5; color: var(--navy); text-decoration: none; border-bottom: 2px solid transparent; transition: color 0.2s, border-color 0.2s; }',
  '      .article-body .related__list a:hover { color: var(--orange); border-bottom-color: var(--orange); }',
  '    </style>',
];

const montarBloco = (escolhidos, eol) =>
  [
    `    ${INICIO}`,
    ...ESTILO,
    '    <nav class="related reveal" aria-label="Leia também">',
    '      <p class="related__title">Leia também</p>',
    '      <ul class="related__list">',
    ...escolhidos.map(
      (c) =>
        `        <li><span class="related__cat">${escapar(c.categoria)}</span><a href="${c.arquivo}">${c.titulo}</a></li>`
    ),
    '      </ul>',
    '    </nav>',
    `    ${FIM}`,
  ].join(eol);

let alterados = 0;

// Do mais antigo para o mais novo: é essa ordem que deixa o balanceamento
// determinístico, já que cada escolha altera a contagem das seguintes.
const ordemDeProcessamento = [...posts].sort(
  (a, b) => a.data.localeCompare(b.data) || a.arquivo.localeCompare(b.arquivo)
);

for (const post of ordemDeProcessamento) {
  const escolhidos = escolherPara(post);
  for (const c of escolhidos) recebidos.set(c.arquivo, recebidos.get(c.arquivo) + 1);

  const eol = quebraDe(post.html);
  const bloco = montarBloco(escolhidos, eol);
  const inicio = post.html.indexOf(INICIO);
  let novo;

  if (inicio !== -1) {
    const fim = post.html.indexOf(FIM, inicio);
    if (fim === -1) throw new Error(`${post.arquivo}: marcador de abertura sem fechamento`);
    // Recua até o começo da linha para não deixar a indentação antiga órfã.
    const linha = post.html.lastIndexOf(eol, inicio) + eol.length;
    novo = post.html.slice(0, linha) + bloco + post.html.slice(fim + FIM.length);
  } else {
    // O bloco entra no fim do .article-body, depois do CTA: o convite para
    // conversar continua sendo a primeira saída que o leitor encontra.
    const ancora = `${eol}  </div>${eol}</article>`;
    const posicao = post.html.lastIndexOf(ancora);
    if (posicao === -1) throw new Error(`${post.arquivo}: fim do .article-body não encontrado`);
    novo = post.html.slice(0, posicao) + eol + bloco + post.html.slice(posicao);
  }

  if (novo !== post.html) {
    writeFileSync(join(BLOG, post.arquivo), novo, 'utf8');
    alterados++;
  }
}

const contagens = [...recebidos.values()];
console.log(`Leia também: ${alterados}/${posts.length} arquivos atualizados.`);
console.log(
  `Links internos recebidos por post: min ${Math.min(...contagens)}, max ${Math.max(...contagens)}.`
);
