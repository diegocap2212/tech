// Cria, lista e remove worktrees do repositório — uma pasta por frente de
// trabalho.
//
// Por que worktree e não `git checkout`: o Diego, o Tiago e cada agente de IA
// precisam mexer no site ao mesmo tempo. Com um checkout só, trocar de branch
// obriga a dar stash no que o outro deixou no meio, e dois agentes rodando em
// paralelo se atropelam. Cada worktree é uma pasta com o seu próprio branch,
// compartilhando o mesmo histórico. Como o site não tem build nem
// node_modules, uma worktree nova já abre no navegador — custo zero.
//
// Uso:
//   node scripts/worktree.mjs nova <nome>   cria feat/<nome> em ../tech-<nome>
//   node scripts/worktree.mjs lista         mostra as worktrees e o estado de cada uma
//   node scripts/worktree.mjs fim <nome>    remove a worktree (recusa se houver trabalho solto)

import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PAI = dirname(RAIZ);
const PREFIXO = basename(RAIZ); // "tech"

const git = (args, opts = {}) =>
  execFileSync('git', args, { cwd: RAIZ, encoding: 'utf8', ...opts }).trim();

const gitEm = (dir, args) => execFileSync('git', args, { cwd: dir, encoding: 'utf8' }).trim();

// Sondagem: a chamada pode falhar de propósito (branch que nunca foi enviado
// não tem contraparte em origin). Sem engolir o stderr, o git escreve a
// própria mensagem de uso no terminal antes do catch tratar.
const sondar = (dir, args) => {
  try {
    return Number(
      execFileSync('git', args, {
        cwd: dir,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim()
    );
  } catch {
    return null;
  }
};

const morrer = (msg) => {
  console.error(`\n  ${msg}\n`);
  process.exit(1);
};

// O nome vira branch e vira pasta: só o que é seguro nos dois.
const limpar = (nome) =>
  nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

function nova(nomeCru) {
  if (!nomeCru) morrer('Falta o nome: node scripts/worktree.mjs nova conciliacao-de-cartao');
  const nome = limpar(nomeCru);
  if (!nome) morrer(`"${nomeCru}" não sobrou nada depois de limpar. Use letras e números.`);

  const branch = `feat/${nome}`;
  const destino = join(PAI, `${PREFIXO}-${nome}`);

  if (existsSync(destino)) morrer(`A pasta ${destino} já existe.`);

  const jaExiste = git(['branch', '--list', branch]) !== '';
  if (jaExiste) morrer(`O branch ${branch} já existe. Use "fim ${nome}" antes, ou escolha outro nome.`);

  // Parte sempre da main publicada, não do que está solto aqui: worktree que
  // nasce de trabalho não commitado do vizinho é a origem de metade dos
  // conflitos que ninguém entende depois.
  console.log('  buscando origin/main...');
  git(['fetch', 'origin', 'main', '--quiet']);
  git(['worktree', 'add', '-b', branch, destino, 'origin/main']);

  console.log(`
  worktree criada

    pasta   ${destino}
    branch  ${branch}
    base    origin/main

  cd "${destino}"
`);
}

function lista() {
  const bruto = git(['worktree', 'list', '--porcelain']);
  const blocos = bruto.split('\n\n').filter(Boolean);

  console.log('');
  for (const bloco of blocos) {
    const caminho = (bloco.match(/^worktree (.+)$/m) || [])[1];
    const branch = ((bloco.match(/^branch (.+)$/m) || [])[1] || '(detached)').replace('refs/heads/', '');
    if (!caminho) continue;

    let estado = '';
    try {
      const sujo = gitEm(caminho, ['status', '--porcelain']);
      const arquivos = sujo ? sujo.split('\n').length : 0;

      const naoEnviados = sondar(caminho, ['rev-list', '--count', 'origin/main..HEAD']) ?? 0;

      const partes = [];
      if (arquivos) partes.push(`${arquivos} arquivo(s) sem commit`);
      if (naoEnviados) partes.push(`${naoEnviados} commit(s) à frente de origin/main`);
      estado = partes.length ? partes.join(', ') : 'limpa e em dia';
    } catch {
      estado = 'pasta inacessível';
    }

    const aqui = resolve(caminho) === RAIZ ? '  ← você está aqui' : '';
    console.log(`  ${branch.padEnd(30)} ${estado}${aqui}`);
    console.log(`  ${''.padEnd(30)} ${caminho}\n`);
  }
}

function fim(nomeCru) {
  if (!nomeCru) morrer('Falta o nome: node scripts/worktree.mjs fim conciliacao-de-cartao');
  const nome = limpar(nomeCru);
  const destino = join(PAI, `${PREFIXO}-${nome}`);
  const branch = `feat/${nome}`;

  if (!existsSync(destino)) morrer(`Não existe a pasta ${destino}.`);

  // Nunca remover trabalho que não está em lugar nenhum.
  const sujo = gitEm(destino, ['status', '--porcelain']);
  if (sujo) {
    morrer(
      `${destino} tem alteração sem commit:\n\n${sujo
        .split('\n')
        .map((l) => `    ${l}`)
        .join('\n')}\n\n  Commite ou descarte antes. Não vou apagar isso por você.`
    );
  }

  // Se o branch já foi enviado, compara com ele; se nunca foi, todo commit
  // acima da main é trabalho que só existe nesta pasta.
  const naoEnviados =
    sondar(destino, ['rev-list', '--count', `origin/${branch}..HEAD`]) ??
    sondar(destino, ['rev-list', '--count', 'origin/main..HEAD']) ??
    0;
  if (naoEnviados) {
    morrer(
      `${branch} tem ${naoEnviados} commit(s) que não estão no GitHub.\n\n  Dê push (ou abra o PR) antes de remover — senão o trabalho vai embora com a pasta.`
    );
  }

  git(['worktree', 'remove', destino]);
  git(['branch', '-d', branch]);
  console.log(`\n  removidos: pasta ${destino} e branch ${branch}\n`);
}

const [comando, argumento] = process.argv.slice(2);
const comandos = { nova, lista, fim };

if (!comandos[comando]) {
  console.log(`
  node scripts/worktree.mjs nova <nome>   cria feat/<nome> numa pasta ao lado, a partir de origin/main
  node scripts/worktree.mjs lista         mostra as worktrees e o que há de solto em cada uma
  node scripts/worktree.mjs fim <nome>    remove a worktree — recusa se houver trabalho não salvo
`);
  process.exit(comando ? 1 : 0);
}

comandos[comando](argumento);
