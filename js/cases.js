/**
 * Catálogo de cases da home.
 *
 * Para publicar um projeto, basta acrescentar um objeto a esta lista. O
 * primeiro item com `destaque: true` ocupa o card maior; os demais entram no
 * grid. Enquanto a lista estiver vazia, o estado editorial do HTML permanece.
 *
 * Campos disponíveis:
 * - nome, categoria, descricao, problema, solucao e resultado;
 * - funcionalidades: lista de tags curtas;
 * - midia: { video, tipo, imagem, alt } — imagem também é fallback do vídeo;
 * - link e rotuloCta;
 * - destaque: true para o projeto principal.
 */
const projetos = [];

function criarElemento(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto) elemento.textContent = texto;
  return elemento;
}

function criarImagemProjeto(midia, nome) {
  if (!midia?.imagem) return null;

  const imagem = document.createElement('img');
  imagem.className = 'project-card__image';
  imagem.src = midia.imagem;
  imagem.alt = midia.alt || `Demonstração do projeto ${nome}`;
  imagem.loading = 'lazy';
  imagem.decoding = 'async';
  return imagem;
}

function criarMidiaProjeto(projeto) {
  const { midia, nome } = projeto;
  if (!midia?.video && !midia?.imagem) return null;

  const moldura = criarElemento('div', 'project-card__media');
  // Gancho estável para a futura abertura da demonstração em modal.
  moldura.dataset.caseMedia = '';

  if (!midia.video) {
    moldura.append(criarImagemProjeto(midia, nome));
    return moldura;
  }

  const video = document.createElement('video');
  video.className = 'project-card__video';
  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.controls = false;
  video.preload = 'metadata';
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('aria-label', midia.alt || `Demonstração do projeto ${nome}`);
  if (midia.imagem) video.poster = midia.imagem;

  const fonte = document.createElement('source');
  fonte.src = midia.video;
  fonte.type = midia.tipo || 'video/mp4';
  video.append(fonte);

  // Se o arquivo não carregar, o card continua útil com a imagem cadastrada.
  const usarFallback = () => {
    const imagem = criarImagemProjeto(midia, nome);
    if (imagem && video.isConnected) video.replaceWith(imagem);
  };
  fonte.addEventListener('error', usarFallback, { once: true });
  video.addEventListener('error', usarFallback, { once: true });

  moldura.append(video);
  return moldura;
}

function criarDetalheProjeto(rotulo, texto) {
  if (!texto) return null;

  const detalhe = criarElemento('div', 'project-card__detail');
  detalhe.append(
    criarElemento('span', 'project-card__meta-label', rotulo),
    criarElemento('p', '', texto)
  );
  return detalhe;
}

function criarCardProjeto(projeto, destaque = false) {
  const card = criarElemento('article', `project-card glass-card reveal${destaque ? ' project-card--featured' : ''}`);
  const midia = criarMidiaProjeto(projeto);
  const corpo = criarElemento('div', 'project-card__body');
  if (!midia) card.classList.add('project-card--no-media');

  if (projeto.categoria) corpo.append(criarElemento('span', 'project-card__category', projeto.categoria));
  corpo.append(criarElemento('h3', 'project-card__title', projeto.nome));
  if (projeto.descricao) corpo.append(criarElemento('p', 'project-card__description', projeto.descricao));

  const detalhes = [
    criarDetalheProjeto('Problema enfrentado', projeto.problema),
    criarDetalheProjeto('Solução construída', projeto.solucao),
    criarDetalheProjeto('Resultado obtido', projeto.resultado),
  ].filter(Boolean);

  if (detalhes.length) {
    const grupo = criarElemento('div', 'project-card__details');
    grupo.append(...detalhes);
    corpo.append(grupo);
  }

  if (projeto.funcionalidades?.length) {
    const tags = criarElemento('ul', 'project-card__tags');
    projeto.funcionalidades.forEach((funcionalidade) => {
      tags.append(criarElemento('li', '', funcionalidade));
    });
    corpo.append(tags);
  }

  if (projeto.link) {
    const cta = criarElemento('a', 'project-card__cta', projeto.rotuloCta || 'Conhecer o case');
    cta.href = projeto.link;
    cta.append(criarElemento('span', '', '→'));
    corpo.append(cta);
  }

  if (midia) card.append(midia);
  card.append(corpo);
  return card;
}

function renderizarProjetos() {
  const raiz = document.getElementById('cases-content');
  if (!raiz || !projetos.length) return;

  const fragmento = document.createDocumentFragment();
  const destaque = projetos.find((projeto) => projeto.destaque);
  const demais = projetos.filter((projeto) => projeto !== destaque);

  if (destaque) fragmento.append(criarCardProjeto(destaque, true));

  if (demais.length) {
    const grid = criarElemento('div', 'cases__grid stagger');
    demais.forEach((projeto) => grid.append(criarCardProjeto(projeto)));
    fragmento.append(grid);
  }

  raiz.replaceChildren(fragmento);
}

document.addEventListener('DOMContentLoaded', renderizarProjetos);
