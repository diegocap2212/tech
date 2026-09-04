(() => {
  const icones = {
    estoque: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8 12 3 3 8l9 5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 16 9 5 9-5"/></svg>',
    transferencias: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3l4 4-4 4"/><path d="M3 7h18"/><path d="m7 21-4-4 4-4"/><path d="M21 17H3"/></svg>',
    compras: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1"/><circle cx="19" cy="20" r="1"/><path d="M3 4h2l2.4 10.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 7H6"/></svg>',
    perdas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"/><path d="m4.93 4.93 2.83 2.83"/><path d="M2 12h4"/><path d="m4.93 19.07 2.83-2.83"/><path d="M12 18v4"/><path d="M22 12h-4"/><circle cx="12" cy="12" r="6"/></svg>',
    financeiro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M6 15h2"/></svg>',
    inteligencia: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 1.4 4.1a5 5 0 0 0 3.1 3.1l4.1 1.4-4.1 1.4a5 5 0 0 0-3.1 3.1L12 20.2l-1.4-4.1A5 5 0 0 0 7.5 13l-4.1-1.4 4.1-1.4a5 5 0 0 0 3.1-3.1L12 3Z"/></svg>',
  };

  // Novo produto = novo objeto. Os blocos detalhados são opcionais; sem eles,
  // o renderer mantém um placeholder editorial sem inventar funcionalidades.
  const solucoes = [
    {
      id: 'retail-control',
      indice: '01',
      navegacao: 'Retail Control',
      nome: 'Célere Retail Control',
      segmento: 'Mercados e Supermercados · Redes de 2 a 10 lojas',
      status: 'Demo',
      statusTom: 'demo',
      headline: 'Uma loja fica sem. Outra tem produto parado.',
      abertura: 'O problema normalmente não é falta de sistema.',
      sistemas: ['O PDV registra.', 'O ERP controla.', 'A adquirente processa.'],
      descricao: [
        'A dificuldade aparece quando estoque, compras, transferências, perdas e financeiro precisam conversar.',
        'O Célere Retail Control conecta os dados que a empresa já possui e transforma exceções operacionais em decisões.',
        'Ele não substitui ERP ou PDV.',
        'Ele atua no espaço onde normalmente vivem planilhas, mensagens de WhatsApp, conferências manuais e regras conhecidas apenas pelas pessoas da operação.',
      ],
      demonstracao: 'demos/retail-control/index.html',
      fluxo: [
        { rotulo: 'Loja 03', valor: 'Coca-Cola 2L', detalhe: '14 unidades' },
        { rotulo: 'Cobertura', valor: '0,8 dia' },
        { rotulo: 'Risco', valor: 'Ruptura prevista', tom: 'alerta' },
        { rotulo: 'Outra loja', valor: 'Loja 05', detalhe: '84 unidades · excesso' },
        { rotulo: 'Célere', valor: 'Transferir 36 unidades', tom: 'celere' },
        { rotulo: 'Decisão', valor: 'Aprovar transferência', tom: 'decisao' },
      ],
      mensagemFluxo: 'O sistema não mostra apenas o problema. Ele conecta o problema à próxima decisão.',
      capacidades: [
        { icone: 'estoque', titulo: 'Estoque & Reposição', texto: 'Cobertura, excesso e risco de ruptura.' },
        { icone: 'transferencias', titulo: 'Transferências', texto: 'Movimentação entre lojas com rastreabilidade.' },
        { icone: 'compras', titulo: 'Compras', texto: 'Necessidade consolidada da rede.' },
        { icone: 'perdas', titulo: 'Perdas & Validade', texto: 'Identificação de riscos antes do descarte.' },
        { icone: 'financeiro', titulo: 'Conciliação Financeira', texto: 'PDV, adquirentes, PIX e recebimentos.' },
        { icone: 'inteligencia', titulo: 'Inteligência Operacional', texto: 'Alertas, recomendações e interpretação dos dados.' },
      ],
      comparativo: {
        headline: 'Menos informação para procurar. Mais decisões prontas para tomar.',
        antes: [
          { rotulo: 'WhatsApp', texto: '“Alguém tem Coca-Cola sobrando?”' },
          { rotulo: 'Planilha', texto: 'estoque_lojas_final_v7.xlsx' },
          { rotulo: 'Decisão', texto: '“Acho melhor comprar mais.”' },
          { rotulo: 'Financeiro', texto: '“Esse valor do cartão está certo?”' },
        ],
        depois: ['Transferência rastreada.', 'Estoque consolidado.', 'Compra sugerida.', 'Divergência identificada.'],
      },
      assistente: {
        pergunta: 'Por que minha margem caiu esta semana?',
        resposta: [
          'A Loja 02 representa o maior impacto na queda de margem.',
          'As perdas do açougue aumentaram 18%, enquanto a Loja 03 apresentou ruptura em produtos de margem acima da média.',
        ],
        prioridade: 'Prioridade recomendada: Loja 02.',
        sugestoes: ['Qual loja precisa da minha atenção?', 'Onde estou perdendo dinheiro?', 'O que devo fazer primeiro?'],
      },
      objetivos: [
        'Reduzir ruptura',
        'Reduzir estoque parado',
        'Reduzir perdas evitáveis',
        'Reduzir trabalho manual',
        'Aumentar previsibilidade',
        'Aumentar controle entre lojas',
      ],
      cenario: {
        frase: 'O objetivo é simples: em vez de o gestor procurar o problema em cinco sistemas diferentes, o problema aparece acompanhado do contexto necessário para decidir.',
        identificacao: 'Cenário demonstrativo — Rede Boa Compra',
        aviso: 'Empresa, personagens e dados desta demonstração são fictícios.',
      },
    },
    {
      id: 'pet',
      indice: '02',
      navegacao: 'Pet',
      nome: 'Célere Pet',
      segmento: 'Petshops',
      status: 'Em breve',
      statusTom: 'breve',
      headline: 'Uma operação que conhece o pet, não apenas o agendamento.',
    },
    {
      id: 'flow',
      indice: '03',
      navegacao: 'Flow',
      nome: 'Célere Flow',
      segmento: 'Gestão de Trabalho',
      status: 'Produto',
      statusTom: 'produto',
      headline: 'Planejamento, execução, métricas e colaboração em um único fluxo.',
    },
  ];

  const escapar = (valor = '') => String(valor)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  function renderizarNavegacao() {
    return `<div class="solucoes__nav" role="tablist" aria-label="Soluções Célere">
      ${solucoes.map((solucao, indice) => `
        <button type="button" role="tab" id="tab-${escapar(solucao.id)}" aria-controls="painel-solucoes" aria-selected="${indice === 0}" tabindex="${indice === 0 ? '0' : '-1'}" data-solucao="${escapar(solucao.id)}">
          <span>${escapar(solucao.indice)}</span>
          ${escapar(solucao.navegacao)}
        </button>`).join('')}
    </div>`;
  }

  function renderizarMoldura(solucao) {
    if (!solucao.demonstracao) return '';

    return `<div class="solucao-demo">
      <div class="solucao-demo__frame">
        <div class="solucao-demo__browser">
          <div class="solucao-demo__dots" aria-hidden="true"><i></i><i></i><i></i></div>
          <span>${escapar(solucao.nome)}</span>
          <span class="solucao-demo__live"><i></i> demo navegável</span>
        </div>
        <div class="solucao-demo__viewport">
          <iframe src="${escapar(solucao.demonstracao)}" title="Prévia navegável do ${escapar(solucao.nome)}" loading="lazy" tabindex="-1" sandbox="allow-scripts allow-forms allow-modals"></iframe>
          <div class="solucao-demo__shield" aria-hidden="true"></div>
        </div>
      </div>
      <div class="solucao-demo__actions">
        <button type="button" class="btn btn--primary" data-abrir-demo data-demo-url="${escapar(solucao.demonstracao)}" data-demo-title="${escapar(solucao.nome)}">Explorar demonstração →</button>
        <a href="${escapar(solucao.demonstracao)}" target="_blank" rel="noopener">Abrir em nova aba</a>
      </div>
      <p class="solucao-demo__disclaimer">Cenário demonstrativo — Rede Boa Compra. Empresa, personagens e dados desta demonstração são fictícios.</p>
    </div>`;
  }

  function renderizarFluxo(solucao) {
    if (!solucao.fluxo) return '';

    return `<div class="solucao-bloco solucao-fluxo">
      <div class="solucao-bloco__cabecalho">
        <span>Da exceção à ação</span>
        <h4>Uma decisão construída com o contexto da rede.</h4>
      </div>
      <ol class="solucao-fluxo__trilha">
        ${solucao.fluxo.map((etapa, indice) => `<li class="${etapa.tom ? `solucao-fluxo__item--${escapar(etapa.tom)}` : ''}">
          <span class="solucao-fluxo__indice">0${indice + 1}</span>
          <small>${escapar(etapa.rotulo)}</small>
          <strong>${escapar(etapa.valor)}</strong>
          ${etapa.detalhe ? `<em>${escapar(etapa.detalhe)}</em>` : ''}
        </li>`).join('')}
      </ol>
      <p class="solucao-fluxo__mensagem">${escapar(solucao.mensagemFluxo)}</p>
    </div>`;
  }

  function renderizarCapacidades(solucao) {
    if (!solucao.capacidades) return '';

    return `<div class="solucao-bloco solucao-capacidades">
      <div class="solucao-bloco__cabecalho">
        <span>Capacidades</span>
        <h4>O que precisa conversar para a operação decidir.</h4>
      </div>
      <div class="solucao-capacidades__grid">
        ${solucao.capacidades.map((capacidade) => `<div class="solucao-capacidade">
          <span class="solucao-capacidade__icone">${icones[capacidade.icone]}</span>
          <div><h5>${escapar(capacidade.titulo)}</h5><p>${escapar(capacidade.texto)}</p></div>
        </div>`).join('')}
      </div>
    </div>`;
  }

  function renderizarComparativo(solucao) {
    if (!solucao.comparativo) return '';
    const { comparativo } = solucao;

    return `<div class="solucao-bloco solucao-comparativo">
      <div class="solucao-bloco__cabecalho solucao-bloco__cabecalho--centro">
        <span>Antes e depois</span>
        <h4>${escapar(comparativo.headline)}</h4>
      </div>
      <div class="solucao-comparativo__grid">
        <div class="solucao-comparativo__lado solucao-comparativo__lado--antes">
          <p class="solucao-comparativo__rotulo">Antes</p>
          ${comparativo.antes.map((item) => `<div><small>${escapar(item.rotulo)}</small><p>${escapar(item.texto)}</p></div>`).join('')}
        </div>
        <div class="solucao-comparativo__lado solucao-comparativo__lado--depois">
          <p class="solucao-comparativo__rotulo">Depois</p>
          ${comparativo.depois.map((item) => `<div><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><p>${escapar(item)}</p></div>`).join('')}
        </div>
      </div>
    </div>`;
  }

  function renderizarAssistente(solucao) {
    if (!solucao.assistente) return '';
    const { assistente } = solucao;

    return `<div class="solucao-bloco solucao-assistente">
      <div class="solucao-assistente__contexto">
        <span class="solucao-assistente__marca">${icones.inteligencia} Assistente inteligente</span>
        <h4>Uma pergunta sobre a operação, respondida com prioridade.</h4>
        <div class="solucao-assistente__sugestoes">
          <span>Perguntas sugeridas</span>
          ${assistente.sugestoes.map((pergunta) => `<span class="solucao-assistente__sugestao">${escapar(pergunta)}</span>`).join('')}
        </div>
      </div>
      <div class="solucao-assistente__conversa">
        <p class="solucao-assistente__pergunta">${escapar(assistente.pergunta)}</p>
        <div class="solucao-assistente__resposta">
          ${assistente.resposta.map((paragrafo) => `<p>${escapar(paragrafo)}</p>`).join('')}
          <strong>${escapar(assistente.prioridade)}</strong>
        </div>
        <span>Resposta demonstrativa, sem IA ativa nesta página.</span>
      </div>
    </div>`;
  }

  function renderizarObjetivos(solucao) {
    if (!solucao.objetivos) return '';

    return `<div class="solucao-bloco solucao-objetivos">
      <div class="solucao-bloco__cabecalho">
        <span>Resultados esperados</span>
        <h4>Objetivos operacionais, sem percentuais inventados.</h4>
      </div>
      <ul>${solucao.objetivos.map((objetivo) => `<li>${escapar(objetivo)}</li>`).join('')}</ul>
    </div>`;
  }

  function renderizarCenario(solucao) {
    if (!solucao.cenario) return '';
    const { cenario } = solucao;

    return `<figure class="solucao-cenario">
      <blockquote>“${escapar(cenario.frase)}”</blockquote>
      <figcaption>
        <strong>${escapar(cenario.identificacao)}</strong>
        <span>${escapar(cenario.aviso)}</span>
      </figcaption>
    </figure>`;
  }

  function renderizarPlaceholder(solucao) {
    return `<article class="solucao-placeholder" id="painel-solucoes" role="tabpanel" tabindex="0" aria-labelledby="tab-${escapar(solucao.id)}">
      <div class="solucao-placeholder__copy">
        <div class="solucao-painel__meta">
          <span class="solucao-status solucao-status--${escapar(solucao.statusTom)}">${escapar(solucao.status)}</span>
          <span>${escapar(solucao.segmento)}</span>
        </div>
        <p class="solucao-painel__nome">${escapar(solucao.nome)}</p>
        <h3>${escapar(solucao.headline)}</h3>
        <p class="solucao-placeholder__nota">A apresentação desta solução está sendo preparada.</p>
      </div>
      <div class="solucao-placeholder__visual" aria-hidden="true">
        <span>${escapar(solucao.indice)}</span>
        <div><i></i><i></i><i></i><i></i></div>
      </div>
    </article>`;
  }

  function renderizarSolucao(solucao) {
    if (!solucao.demonstracao) return renderizarPlaceholder(solucao);

    return `<article class="solucao-painel" id="painel-solucoes" role="tabpanel" tabindex="0" aria-labelledby="tab-${escapar(solucao.id)}">
      <div class="solucao-painel__hero">
        <div class="solucao-painel__copy">
          <div class="solucao-painel__meta">
            <span class="solucao-status solucao-status--${escapar(solucao.statusTom)}">${escapar(solucao.status)}</span>
            <span>${escapar(solucao.segmento)}</span>
          </div>
          <p class="solucao-painel__nome">${escapar(solucao.nome)}</p>
          <h3>${escapar(solucao.headline)}</h3>
          <p class="solucao-painel__abertura">${escapar(solucao.abertura)}</p>
          <div class="solucao-painel__sistemas">${solucao.sistemas.map((item) => `<span>${escapar(item)}</span>`).join('')}</div>
          <div class="solucao-painel__descricao">${solucao.descricao.map((paragrafo) => `<p>${escapar(paragrafo)}</p>`).join('')}</div>
        </div>
        ${renderizarMoldura(solucao)}
      </div>
      ${renderizarFluxo(solucao)}
      ${renderizarCapacidades(solucao)}
      ${renderizarComparativo(solucao)}
      ${renderizarAssistente(solucao)}
      ${renderizarObjetivos(solucao)}
      ${renderizarCenario(solucao)}
    </article>`;
  }

  function iniciarSolucoes() {
    const app = document.getElementById('solucoes-app');
    if (!app) return;

    app.innerHTML = `${renderizarNavegacao()}<div class="solucoes__showcase">${renderizarSolucao(solucoes[0])}</div>`;
    const showcase = app.querySelector('.solucoes__showcase');
    const tabs = [...app.querySelectorAll('[role="tab"]')];

    const selecionar = (id, moverFoco = false) => {
      const solucao = solucoes.find((item) => item.id === id);
      if (!solucao) return;

      tabs.forEach((tab) => {
        const ativa = tab.dataset.solucao === id;
        tab.setAttribute('aria-selected', String(ativa));
        tab.tabIndex = ativa ? 0 : -1;
        if (ativa && moverFoco) tab.focus();
      });
      showcase.innerHTML = renderizarSolucao(solucao);
    };

    tabs.forEach((tab, indice) => {
      tab.addEventListener('click', () => selecionar(tab.dataset.solucao));
      tab.addEventListener('keydown', (evento) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(evento.key)) return;
        evento.preventDefault();
        let proximo = indice;
        if (evento.key === 'ArrowRight') proximo = (indice + 1) % tabs.length;
        if (evento.key === 'ArrowLeft') proximo = (indice - 1 + tabs.length) % tabs.length;
        if (evento.key === 'Home') proximo = 0;
        if (evento.key === 'End') proximo = tabs.length - 1;
        selecionar(tabs[proximo].dataset.solucao, true);
      });
    });

    app.addEventListener('click', (evento) => {
      const botao = evento.target.closest('[data-abrir-demo]');
      if (botao) abrirDemo(botao.dataset.demoUrl, botao.dataset.demoTitle, botao);
    });
  }

  const modal = document.getElementById('demo-modal');
  const frameModal = document.getElementById('demo-modal-frame');
  const tituloModal = document.getElementById('demo-modal-title');
  const linkExterno = document.getElementById('demo-modal-external');
  const fecharModal = document.getElementById('demo-modal-close');
  let focoAnterior = null;

  function abrirDemo(url, titulo, origem) {
    if (!modal || !frameModal) return;
    focoAnterior = origem;
    tituloModal.textContent = titulo;
    linkExterno.href = url;
    frameModal.src = url;
    modal.hidden = false;
    document.body.classList.add('demo-modal-open');
    requestAnimationFrame(() => {
      modal.classList.add('open');
      fecharModal.focus();
    });
  }

  function encerrarDemo() {
    if (!modal || modal.hidden) return;
    modal.classList.remove('open');
    document.body.classList.remove('demo-modal-open');
    window.setTimeout(() => {
      modal.hidden = true;
      frameModal.src = 'about:blank';
      focoAnterior?.focus();
    }, 220);
  }

  fecharModal?.addEventListener('click', encerrarDemo);
  modal?.addEventListener('click', (evento) => {
    if (evento.target === modal) encerrarDemo();
  });
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && modal && !modal.hidden) encerrarDemo();
  });
  document.addEventListener('DOMContentLoaded', iniciarSolucoes);
})();
