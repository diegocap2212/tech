// Sobe o número de versão dos CSS em todas as páginas de uma vez.
//
// Por que existe: as folhas são pedidas como `css/style.css?v=20`, e esse
// número é a única chave de cache do site. Editar o CSS sem subi-lo faz o
// navegador e a borda do GitHub continuarem servindo a folha antiga — a
// mudança fica no ar e ninguém vê.
//
// Aconteceu de verdade: o reset de imagem foi corrigido, subiu para produção,
// e o retrato do fundador continuou esticado porque o `?v=20` não mudou. Como
// o site não tem build para calcular hash de conteúdo, o número é manual — e
// o que é manual e repetitivo tem que virar comando.
//
//   node scripts/bump-css.mjs           sobe todas as folhas em 1
//   node scripts/bump-css.mjs style     sobe só a style.css
//   node scripts/bump-css.mjs --check   só mostra as versões, sem alterar

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Toda página HTML do site, na raiz e no blog.
const paginas = [
  ...readdirSync(RAIZ)
    .filter((f) => f.endsWith('.html'))
    .map((f) => join(RAIZ, f)),
  ...readdirSync(join(RAIZ, 'blog'))
    .filter((f) => f.endsWith('.html'))
    .map((f) => join(RAIZ, 'blog', f)),
];

const argumento = process.argv[2];
const soConferir = argumento === '--check';
const alvo = soConferir ? null : argumento;

// Descobre a versão atual de cada folha. Se as páginas discordarem, a maior
// vence: significa que alguma ficou para trás num bump anterior.
const versoes = new Map();
const padrao = /(?<folha>[\w-]+)\.css\?v=(?<versao>\d+)/g;

for (const pagina of paginas) {
  for (const m of readFileSync(pagina, 'utf8').matchAll(padrao)) {
    const { folha, versao } = m.groups;
    versoes.set(folha, Math.max(versoes.get(folha) ?? 0, Number(versao)));
  }
}

if (!versoes.size) {
  console.error('\n  nenhuma folha versionada encontrada nas páginas.\n');
  process.exit(1);
}

if (soConferir) {
  console.log('');
  for (const [folha, versao] of versoes) {
    // Só interessa quem pede a folha. A varejo.css, por exemplo, é a camada da
    // home e não é usada no blog — contar as páginas do blog como "atrasadas"
    // era alarme falso.
    let pedem = 0;
    let emDia = 0;
    for (const pagina of paginas) {
      const html = readFileSync(pagina, 'utf8');
      const m = html.match(new RegExp(`${folha}\\.css\\?v=(\\d+)`));
      if (!m) continue;
      pedem++;
      if (Number(m[1]) === versao) emDia++;
    }
    console.log(
      `  ${folha}.css  v=${versao}  em ${emDia}/${pedem} página(s) que a usam` +
        (pedem - emDia ? `  ← ${pedem - emDia} atrasada(s)` : '')
    );
  }
  console.log('');
  process.exit(0);
}

if (alvo && !versoes.has(alvo)) {
  console.error(`\n  não existe ${alvo}.css versionada. Folhas: ${[...versoes.keys()].join(', ')}\n`);
  process.exit(1);
}

const subir = alvo ? [alvo] : [...versoes.keys()];
const novas = new Map(subir.map((f) => [f, versoes.get(f) + 1]));

let tocadas = 0;
for (const pagina of paginas) {
  const antes = readFileSync(pagina, 'utf8');
  let depois = antes;
  for (const [folha, nova] of novas) {
    // Reescreve qualquer versão da folha, não só a mais alta: página que
    // ficou atrasada num bump anterior volta a ficar em dia agora.
    depois = depois.replace(new RegExp(`${folha}\\.css\\?v=\\d+`, 'g'), `${folha}.css?v=${nova}`);
  }
  if (depois !== antes) {
    writeFileSync(pagina, depois);
    tocadas++;
  }
}

console.log('');
for (const [folha, nova] of novas) console.log(`  ${folha}.css  v=${versoes.get(folha)} → v=${nova}`);
console.log(`\n  ${tocadas} página(s) atualizada(s) de ${paginas.length}\n`);
