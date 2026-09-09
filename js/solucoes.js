(() => {
  const icones = {
    estoque: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8 12 3 3 8l9 5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 16 9 5 9-5"/></svg>',
    transferencias: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3l4 4-4 4"/><path d="M3 7h18"/><path d="m7 21-4-4 4-4"/><path d="M21 17H3"/></svg>',
    compras: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1"/><circle cx="19" cy="20" r="1"/><path d="M3 4h2l2.4 10.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 7H6"/></svg>',
    perdas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"/><path d="m4.93 4.93 2.83 2.83"/><path d="M2 12h4"/><path d="m4.93 19.07 2.83-2.83"/><path d="M12 18v4"/><path d="M22 12h-4"/><circle cx="12" cy="12" r="6"/></svg>',
    financeiro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M6 15h2"/></svg>',
    inteligencia: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 1.4 4.1a5 5 0 0 0 3.1 3.1l4.1 1.4-4.1 1.4a5 5 0 0 0-3.1 3.1L12 20.2l-1.4-4.1A5 5 0 0 0 7.5 13l-4.1-1.4 4.1-1.4a5 5 0 0 0 3.1-3.1L12 3Z"/></svg>',
    painel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,13 7,13 9,7 13,19 16,11 22,11"/></svg>',
    agenda: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    jornada: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="6" r="2"/><circle cx="19" cy="19" r="2"/><path d="M7 6h6a4 4 0 0 1 0 8H9a4 4 0 0 0 0 8"/></svg>',
    tutores: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><circle cx="6.6" cy="9.2" r="1.8"/><circle cx="10.9" cy="6.1" r="1.8"/><circle cx="15.2" cy="6.4" r="1.8"/><circle cx="18.7" cy="10" r="1.8"/><path d="M12 12c-3.3 0-5.8 2.1-5.8 4.7 0 2 1.8 3.5 3.9 3.5 1.1 0 2-.5 2.9-.5s1.6.5 2.7.5c2.1 0 3.8-1.5 3.8-3.6 0-2.5-2.4-4.6-5.5-4.6z"/></svg>',
    recorrencia: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".8" fill="currentColor"/></svg>',
    backlog: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="3.5" cy="6" r="1"/><circle cx="3.5" cy="12" r="1"/><circle cx="3.5" cy="18" r="1"/></svg>',
    quadro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="15"/></svg>',
    timeline: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><circle cx="7" cy="12" r="2"/><circle cx="16" cy="12" r="2"/></svg>',
    metricas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 16v-4"/><path d="M12 16V8"/><path d="M17 16v-7"/></svg>',
    wiki: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2Z"/><path d="M22 4h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7Z"/></svg>',
    equipe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    provador: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.2a1.9 1.9 0 1 1-1.7 2.8"/><path d="M12 6 2.8 14.6c-1 .9-.3 2.6 1 2.6h16.4c1.3 0 2-1.7 1-2.6L12 6z"/><path d="M4.5 16h15"/></svg>',
    ajustes: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 20.5l4.2-1.1L18.6 8.5a2.2 2.2 0 0 0-3.1-3.1L4.6 16.3l-1.1 4.2z"/><path d="M13.5 7.1l3.4 3.4"/><circle cx="19" cy="5" r="1.6"/></svg>',
    producao: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c1.8 2.6-.6 3.7-.6 6.2a2.6 2.6 0 0 0 5.2 0c0-1.6-.7-2.5-.7-2.5 1.8 1 3.3 3.3 3.3 5.9A6.8 6.8 0 1 1 5.2 12.6c0-3.5 2.6-5.5 3.8-7.5.6.9 1.3 1.6 3 1.9z"/></svg>',
    encomendas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="9.5" width="17" height="10.5" rx="2"/><path d="M3.5 9.5h17M12 9.5v10.5"/><path d="M8.2 9.5c-1.7 0-3.2-1.1-3.2-2.8S6.5 4 8.2 4.8C9.7 5.5 11 7.4 12 9.5M15.8 9.5c1.7 0 3.2-1.1 3.2-2.8S17.5 4 15.8 4.8C14.3 5.5 13 7.4 12 9.5"/></svg>',
    manipulacao: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5a8 8 0 0 0 16 0"/><path d="M3 12.5h18"/><path d="M15.5 4.2l3.3 3.3-7.4 7.4-3.3-3.3z"/></svg>',
    receitas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="4" width="14" height="18" rx="2"/><rect x="9" y="2.3" width="6" height="3.2" rx="1"/><path d="M8.3 10.5h7.4M8.3 14h7.4M8.3 17.5h4.5"/></svg>',
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
        'Nenhuma rede de mercados opera do mesmo jeito. Antes de qualquer tela chegar na sua operação, o Retail Control é ajustado ao que já funciona na sua rede — o critério que decide uma transferência entre lojas, o jeito que cada loja fecha o caixa no fim do dia, a exceção que só a sua equipe conhece.',
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
        { icone: 'inteligencia', titulo: 'Inteligência Operacional', texto: 'Aponta qual loja, produto ou processo revisar primeiro — e por quê.' },
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
      segmento: 'Petshops · Redes de 2 a 10 unidades',
      status: 'Demo',
      statusTom: 'demo',
      headline: 'Uma operação que conhece o pet, não apenas o agendamento.',
      abertura: 'O problema normalmente não é falta de agenda.',
      sistemas: ['A agenda marca o horário.', 'O caderno ou a planilha guarda o histórico.', 'O grupo de WhatsApp lembra quem sumiu — quando alguém lembra.'],
      descricao: [
        'A dificuldade aparece quando agenda, histórico do pet, recorrência de cada tutor e financeiro por unidade precisam conversar.',
        'O Célere Pet conecta os dados que a operação já possui e transforma a rotina de banho, tosa e retorno em decisões diárias.',
        'Ele não substitui a agenda que a rede já usa.',
        'Ele atua no espaço onde normalmente vivem cadernos de anotação, grupos de WhatsApp e a memória de quem atendeu aquele pet da última vez.',
        'Nenhuma rede de petshop atende do mesmo jeito. Antes de qualquer tela chegar na sua operação, o Célere Pet é ajustado ao que já funciona na sua rede — a frequência de retorno que muda por porte e serviço, o jeito que cada unidade organiza a agenda, a exceção que só a sua equipe conhece.',
      ],
      demonstracao: 'demos/pet/index.html',
      fluxo: [
        { rotulo: 'Pet', valor: 'Thor · banho a cada 15 dias', detalhe: 'Tutora Marina Alves' },
        { rotulo: 'Frequência', valor: '4 dias acima do padrão', tom: 'alerta' },
        { rotulo: 'Risco', valor: 'Sem próximo horário marcado' },
        { rotulo: 'Insumo', valor: 'Shampoo neutro acaba em 2 dias', detalhe: 'Consumo de 1,7 L/dia' },
        { rotulo: 'Célere', valor: 'Mensagem de retorno pronta para o WhatsApp', tom: 'celere' },
        { rotulo: 'Decisão', valor: 'Chamar o tutor e repor o insumo', tom: 'decisao' },
      ],
      mensagemFluxo: 'O sistema não mostra apenas a agenda do dia. Ele aponta quem deveria estar voltando e o que a loja precisa comprar antes de faltar.',
      capacidades: [
        { icone: 'painel', titulo: 'Painel do dia', texto: 'Faturamento projetado, ocupação e o que pede atenção agora.' },
        { icone: 'agenda', titulo: 'Agenda por porte e serviço', texto: 'Horários considerando porte do pet, serviço e profissional disponível.' },
        { icone: 'jornada', titulo: 'Jornada do pet', texto: 'Check-in, banho, secagem e finalização visíveis em tempo real.' },
        { icone: 'tutores', titulo: 'Pets & tutores', texto: 'Histórico e frequência organizados por pet, não por ficha genérica de cliente.' },
        { icone: 'recorrencia', titulo: 'Recorrência', texto: 'Quem está atrasado para voltar, com o motivo e o contato prontos.' },
        { icone: 'financeiro', titulo: 'Financeiro por unidade', texto: 'Receita separada por serviço, produto e plano, loja a loja.' },
      ],
      comparativo: {
        headline: 'Menos gente para lembrar. Mais retorno de tutor sinalizado a tempo.',
        antes: [
          { rotulo: 'Retorno do tutor', texto: '“Faz tempo que não vejo o Thor por aqui.”' },
          { rotulo: 'Agenda', texto: 'Caderno ou planilha por unidade.' },
          { rotulo: 'Insumo', texto: '“Alguém viu quanto shampoo sobrou?”' },
          { rotulo: 'Financeiro', texto: '“Quanto veio de banho e quanto veio de produto?”' },
        ],
        depois: ['Tutor sinalizado antes de sumir.', 'Agenda por porte e profissional.', 'Consumo de insumo com alerta.', 'Receita separada por serviço, produto e plano.'],
      },
      objetivos: [
        'Reduzir tutores que somem sem aviso',
        'Reduzir tempo remontando a agenda à mão',
        'Reduzir insumo em falta no meio do atendimento',
        'Aumentar taxa de retorno dos tutores',
        'Aumentar receita rastreada por unidade',
        'Aumentar controle entre unidades',
      ],
      cenario: {
        frase: 'O objetivo é simples: em vez de a equipe lembrar de cada tutor de cabeça, o sistema aponta quem deveria estar voltando e o que fazer a respeito.',
        identificacao: 'Cenário demonstrativo — Unidade Moema',
        aviso: 'Unidade, tutores, pets e dados desta demonstração são fictícios.',
      },
    },
    {
      id: 'moda',
      indice: '03',
      navegacao: 'Moda',
      nome: 'Célere Moda',
      segmento: 'Lojas de moda e vestuário · Redes de 2 a 10 lojas',
      status: 'Demo',
      statusTom: 'demo',
      headline: 'Uma loja vende o último tamanho. Outra tem a peça parada na vitrine.',
      abertura: 'O problema normalmente não é falta de estoque.',
      sistemas: ['O caixa registra a venda.', 'A etiqueta diz o preço.', 'O grupo de WhatsApp entre lojas resolve — quando alguém vê a mensagem a tempo.'],
      descricao: [
        'A dificuldade aparece quando tamanho, cor e coleção precisam bater entre loja, provador e depósito ao mesmo tempo.',
        'O Célere Moda conecta os dados que a rede já possui e transforma um provador lotado, um tamanho esgotado ou uma cliente sumida em decisão — não em correria.',
        'Ele não substitui o caixa nem o sistema de vendas que a loja já usa.',
        'Ele atua no espaço onde normalmente vivem grupo de WhatsApp entre lojas, papel colado no espelho do provador e a memória de quem lembra que a cliente prefere um número acima.',
        'Nenhuma rede de moda vende do mesmo jeito. Antes de qualquer tela chegar na sua operação, o Célere Moda é ajustado ao que já funciona na sua rede — a curva de tamanho que muda por loja, o critério de transferência entre unidades, a exceção que só a sua equipe conhece.',
      ],
      demonstracao: 'demos/moda/index.html',
      fluxo: [
        { rotulo: 'Peça', valor: 'Vestido midi floral · tam. M', detalhe: 'Best-seller da coleção' },
        { rotulo: 'Situação', valor: 'Esgotado na loja', tom: 'alerta' },
        { rotulo: 'Depósito central', valor: '6 unidades disponíveis' },
        { rotulo: 'Provador', valor: 'Cliente decidindo agora', detalhe: 'Provador 2' },
        { rotulo: 'Célere', valor: 'Transferência solicitada para a loja', tom: 'celere' },
        { rotulo: 'Decisão', valor: 'Aprovar e reservar antes que a cliente saia', tom: 'decisao' },
      ],
      mensagemFluxo: 'O sistema não mostra só o estoque zerado. Ele aponta onde a peça está e o que fazer antes que a venda escape.',
      capacidades: [
        { icone: 'painel', titulo: 'Painel do dia', texto: 'Faturamento, ocupação dos provadores e o que pede atenção agora.' },
        { icone: 'provador', titulo: 'Da vitrine ao caixa', texto: 'Cada cliente visível — selecionando, provando, decidindo ou no caixa.' },
        { icone: 'ajustes', titulo: 'Ajustes & costura', texto: 'Bainha, cintura e retirada com prazo e sinal acompanhados.' },
        { icone: 'estoque', titulo: 'Estoque por peça', texto: 'Tamanho crítico e ponto de reposição, peça a peça.' },
        { icone: 'recorrencia', titulo: 'Clientes', texto: 'Quem sumiu da rotina de compra, com potencial e contato prontos.' },
        { icone: 'financeiro', titulo: 'Financeiro por categoria', texto: 'Vestuário, acessórios e ajustes separados no mesmo retrato do mês.' },
      ],
      comparativo: {
        headline: 'Menos correria no provador. Mais venda fechada na loja certa.',
        antes: [
          { rotulo: 'Tamanho esgotado', texto: '“Será que tem no depósito?”' },
          { rotulo: 'Ajuste', texto: 'Prazo e sinal anotados no papel do espelho.' },
          { rotulo: 'Cliente sumida', texto: '“Faz tempo que não vejo a Beatriz por aqui.”' },
          { rotulo: 'Financeiro', texto: '“Quanto veio de roupa e quanto veio de acessório?”' },
        ],
        depois: ['Transferência entre lojas rastreada.', 'Prazo e sinal do ajuste acompanhados.', 'Cliente sinalizada antes de sumir.', 'Receita separada por categoria.'],
      },
      objetivos: [
        'Reduzir venda perdida por tamanho esgotado',
        'Reduzir ajuste sem sinal confirmado',
        'Reduzir cliente que some da rotina de compra',
        'Aumentar aproveitamento do estoque entre lojas',
        'Aumentar retirada de ajuste no prazo',
        'Aumentar receita separada por categoria',
      ],
      cenario: {
        frase: 'O objetivo é simples: em vez de a vendedora torcer para o tamanho aparecer, o sistema já aponta onde a peça está e como ela chega à cliente a tempo.',
        identificacao: 'Cenário demonstrativo — Closet Aurora',
        aviso: 'Loja, clientes e dados desta demonstração são fictícios.',
      },
    },
    {
      id: 'padaria',
      indice: '04',
      navegacao: 'Panificadoras',
      nome: 'Célere Panificadoras & Confeitarias',
      segmento: 'Padarias e confeitarias · Redes de 2 a 10 lojas',
      status: 'Demo',
      statusTom: 'demo',
      headline: 'Uma fornada atrasa. Uma encomenda de festa fica sem sinal confirmado.',
      abertura: 'O problema normalmente não é falta de forno.',
      sistemas: ['O forno assa.', 'O caixa registra a venda do balcão.', 'O caderno de encomendas anota — quando alguém lembra de escrever nele.'],
      descricao: [
        'A dificuldade aparece quando produção, encomenda, insumo e financeiro precisam bater no mesmo dia, loja a loja.',
        'O Célere Panificadoras conecta os dados que a padaria já possui e transforma uma fornada em andamento, uma encomenda sem sinal ou um insumo perto do fim em decisão — não em correria de última hora.',
        'Ele não substitui o forno nem o caixa que a padaria já usa.',
        'Ele atua no espaço onde normalmente vivem caderno de encomenda, grupo de WhatsApp e a memória de quem sabe quanto falta de farinha até amanhã.',
        'Nenhuma rede de padaria produz do mesmo jeito. Antes de qualquer tela chegar na sua operação, o Célere Panificadoras é ajustado ao que já funciona na sua rede — a receita que muda de proporção por loja, o prazo de sinal que a sua padaria já pratica, a exceção que só a sua equipe conhece.',
      ],
      demonstracao: 'demos/padaria/index.html',
      fluxo: [
        { rotulo: 'Encomenda', valor: 'Bolo de aniversário · 2 andares', detalhe: 'Cliente: Beatriz Lins' },
        { rotulo: 'Retirada', valor: 'Amanhã às 16h' },
        { rotulo: 'Situação', valor: 'Sinal de 30% não confirmado', tom: 'alerta' },
        { rotulo: 'Insumo', valor: 'Farinha especial acaba amanhã', detalhe: 'Consumo de 18kg/dia' },
        { rotulo: 'Célere', valor: 'Mensagem de cobrança pronta para o WhatsApp', tom: 'celere' },
        { rotulo: 'Decisão', valor: 'Cobrar o sinal e repor a farinha antes que falte', tom: 'decisao' },
      ],
      mensagemFluxo: 'O sistema não mostra só a lista de encomendas do dia. Ele aponta o que está sem sinal e o que vai faltar na bancada amanhã.',
      capacidades: [
        { icone: 'painel', titulo: 'Painel do dia', texto: 'Faturamento, ocupação dos fornos e o que pede atenção agora.' },
        { icone: 'producao', titulo: 'Da massa à vitrine', texto: 'Cada fornada visível — massa, fermentação, forno e vitrine.' },
        { icone: 'encomendas', titulo: 'Encomendas & festas', texto: 'Bolos, tortas e salgados com prazo, sinal e retirada acompanhados.' },
        { icone: 'estoque', titulo: 'Insumos sob controle', texto: 'Consumo médio, validade e ponto de pedido de cada ingrediente.' },
        { icone: 'recorrencia', titulo: 'Clientes', texto: 'Quem sumiu da rotina de compra, com potencial e contato prontos.' },
        { icone: 'financeiro', titulo: 'Financeiro por categoria', texto: 'Pães, doces, salgados e encomendas no mesmo retrato do mês.' },
      ],
      comparativo: {
        headline: 'Menos aposta na fornada. Mais encomenda com sinal garantido.',
        antes: [
          { rotulo: 'Encomenda sem sinal', texto: '“Ela confirma o sinal, né?”' },
          { rotulo: 'Insumo', texto: '“Alguém viu quanto sobrou de farinha?”' },
          { rotulo: 'Cliente sumida', texto: '“Faz tempo que a Renata não vem comprar pão.”' },
          { rotulo: 'Financeiro', texto: '“Quanto veio de pão e quanto veio de encomenda?”' },
        ],
        depois: ['Sinal cobrado antes da retirada.', 'Insumo reposto antes de faltar.', 'Cliente sinalizada antes de sumir.', 'Receita separada por categoria.'],
      },
      objetivos: [
        'Reduzir encomenda sem sinal confirmado',
        'Reduzir insumo em falta no meio da produção',
        'Reduzir cliente que some da rotina de compra',
        'Aumentar retirada de encomenda no prazo',
        'Aumentar reposição de insumo a tempo',
        'Aumentar receita separada por categoria',
      ],
      cenario: {
        frase: 'O objetivo é simples: em vez de descobrir a farinha em falta no meio da fornada, o sistema avisa antes — e a encomenda da festa não chega sem sinal confirmado.',
        identificacao: 'Cenário demonstrativo — Padaria Trigo Dourado',
        aviso: 'Padaria, clientes e dados desta demonstração são fictícios.',
      },
    },
    {
      id: 'farmacia',
      indice: '05',
      navegacao: 'Farmácias',
      nome: 'Célere Farmácias',
      segmento: 'Farmácias e drogarias · Redes de 2 a 10 lojas',
      status: 'Demo',
      statusTom: 'demo',
      headline: 'Uma manipulação atrasa na bancada. Uma receita controlada espera há dias no balcão.',
      abertura: 'O problema normalmente não é falta de remédio.',
      sistemas: ['O caixa registra a venda.', 'A manipulação segue a receita à risca.', 'A planilha de validade avisa — quando alguém lembra de abrir.'],
      descricao: [
        'A dificuldade aparece quando manipulação, receita, validade de lote e financeiro precisam bater no mesmo balcão, loja a loja.',
        'O Célere Farmácias conecta os dados que a rede já possui e transforma uma bancada ocupada, uma receita controlada parada ou um lote perto do vencimento em decisão — não em correria de última hora.',
        'Ele não substitui o sistema de manipulação nem o caixa que a farmácia já usa.',
        'Ele atua no espaço onde normalmente vivem caderno de controlado, planilha de validade e a memória de quem lembra qual paciente está atrasado para retirar.',
        'Nenhuma rede de farmácia manipula do mesmo jeito. Antes de qualquer tela chegar na sua operação, o Célere Farmácias é ajustado ao que já funciona na sua rede — o protocolo de controlados que a sua farmácia já segue, o critério de prioridade de lote, a exceção que só a sua equipe conhece.',
      ],
      demonstracao: 'demos/farmacia/index.html',
      fluxo: [
        { rotulo: 'Receita', valor: 'Colírio manipulado · controlado', detalhe: 'Paciente: Sra. Helena Martins' },
        { rotulo: 'Situação', valor: 'Pronta, aguardando retirada há 3 dias', tom: 'alerta' },
        { rotulo: 'Lote', valor: 'Matéria-prima vence em 12 dias' },
        { rotulo: 'Impacto', valor: '18 fórmulas ainda dependem desse lote', detalhe: 'Risco de parar a manipulação' },
        { rotulo: 'Célere', valor: 'Lembrete de retirada pronto para o WhatsApp', tom: 'celere' },
        { rotulo: 'Decisão', valor: 'Avisar a paciente e priorizar o lote antes de vencer', tom: 'decisao' },
      ],
      mensagemFluxo: 'O sistema não mostra só a fila de manipulação. Ele aponta quem está esperando e o que vai faltar na bancada antes que falte.',
      capacidades: [
        { icone: 'painel', titulo: 'Painel do dia', texto: 'Faturamento, ocupação da manipulação e o que pede atenção agora.' },
        { icone: 'manipulacao', titulo: 'Da bancada ao balcão', texto: 'Cada fórmula visível — recebida, pesagem, manipulação, controle de qualidade e pronta.' },
        { icone: 'receitas', titulo: 'Receitas & retiradas', texto: 'Prazo, pagamento e retirada de cada receita acompanhados.' },
        { icone: 'estoque', titulo: 'Lote & validade', texto: 'Validade e ponto de reposição por lote, matéria-prima a matéria-prima.' },
        { icone: 'recorrencia', titulo: 'Pacientes', texto: 'Quem está atrasado para a próxima retirada, com potencial e contato prontos.' },
        { icone: 'financeiro', titulo: 'Financeiro por categoria', texto: 'Manipulados, genéricos, perfumaria e convênios no mesmo retrato do mês.' },
      ],
      comparativo: {
        headline: 'Menos receita esquecida no balcão. Mais paciente avisado a tempo.',
        antes: [
          { rotulo: 'Receita parada', texto: '“Ela ainda não veio buscar?”' },
          { rotulo: 'Lote vencendo', texto: '“Alguém confere a validade dessa semana?”' },
          { rotulo: 'Paciente atrasado', texto: '“Faz tempo que o Sr. Eduardo não vem repor.”' },
          { rotulo: 'Financeiro', texto: '“Quanto veio de manipulado e quanto veio de convênio?”' },
        ],
        depois: ['Paciente avisado antes do prazo vencer.', 'Lote priorizado antes de vencer.', 'Paciente sinalizado antes de sumir.', 'Receita separada por categoria.'],
      },
      objetivos: [
        'Reduzir receita pronta parada no balcão',
        'Reduzir lote perdido por vencimento',
        'Reduzir paciente que atrasa a retirada de uso contínuo',
        'Aumentar aviso de retirada dentro do prazo',
        'Aumentar priorização de lote perto de vencer',
        'Aumentar receita separada por categoria',
      ],
      cenario: {
        frase: 'O objetivo é simples: em vez de descobrir a receita esquecida no balcão ou o lote vencido tarde demais, o sistema avisa antes — e a paciente é chamada a tempo.',
        identificacao: 'Cenário demonstrativo — Farmácia Vida Plena',
        aviso: 'Farmácia, pacientes e dados desta demonstração são fictícios.',
      },
    },
    {
      id: 'flow',
      indice: '06',
      navegacao: 'Flow',
      nome: 'Célere Flow',
      segmento: 'Time administrativo · Projetos, aberturas e reformas',
      status: 'Produto',
      statusTom: 'produto',
      headline: 'A loja nova não abre sozinha. O projeto também precisa de dono.',
      abertura: 'O problema normalmente não é falta de tarefa.',
      sistemas: ['A abertura de loja vira um grupo de WhatsApp.', 'A reforma anda por mensagem solta e print de orçamento.', 'O prazo mora na cabeça de quem está tocando o projeto.'],
      descricao: [
        'A dificuldade aparece quando abrir uma loja, reformar outra ou tirar um processo novo do papel depende de gente, prazo e responsável organizados em um lugar só.',
        'O Célere Flow organiza esse trabalho em backlog, quadro, cronograma e indicadores — o motor abaixo, ilustrado com um projeto de exemplo, funciona do mesmo jeito para a abertura da próxima loja, uma reforma ou o plano do time administrativo.',
        'Ele não substitui a operação do dia a dia da loja.',
        'Ele atua no trabalho que fica por trás da operação: projetos com começo, meio e fim, que hoje vivem espalhados entre WhatsApp, planilha e a memória de quem está tocando.',
        'Nenhuma rede organiza projetos do mesmo jeito. Antes de qualquer tela chegar na sua operação, o Célere Flow é ajustado ao que já funciona no seu time — os projetos que a sua rede já toca (abertura de loja, reforma, um processo novo), o jeito que a equipe já prioriza, a exceção que só o seu time conhece.',
      ],
      demonstracao: 'demos/flow/index.html',
      fluxo: [
        { rotulo: 'Item', valor: 'CEL-184 · Falha no webhook de pagamento', detalhe: 'Sprint 24' },
        { rotulo: 'Prioridade', valor: 'Alta — bloqueio ativo', tom: 'alerta' },
        { rotulo: 'Responsável', valor: 'Tiago Martins' },
        { rotulo: 'Contexto', valor: 'Aberto há 3 dias, impacta o fluxo de pagamentos', detalhe: 'Resumo gerado a partir do histórico do item' },
        { rotulo: 'Célere', valor: 'Próxima ação recomendada: concluir e enviar para Code Review', tom: 'celere' },
        { rotulo: 'Decisão', valor: 'Priorizar antes do fechamento da sprint', tom: 'decisao' },
      ],
      mensagemFluxo: 'O sistema não mostra apenas a lista de tarefas. Ele aponta o que está travando o prazo e o que fazer a respeito.',
      capacidades: [
        { icone: 'backlog', titulo: 'Backlog priorizado', texto: 'O que fazer primeiro, com prioridade e responsável definidos.' },
        { icone: 'quadro', titulo: 'Quadro de trabalho', texto: 'Da fila até concluído, acompanhado por todo o time.' },
        { icone: 'timeline', titulo: 'Cronograma', texto: 'Prazos e etapas do projeto — abertura de loja, reforma ou lançamento.' },
        { icone: 'metricas', titulo: 'Indicadores do time', texto: 'Ritmo de entrega, itens concluídos e bloqueios ativos.' },
        { icone: 'wiki', titulo: 'Wiki do projeto', texto: 'Decisões e processos registrados, não perdidos em conversa.' },
        { icone: 'equipe', titulo: 'Equipe e permissões', texto: 'Quem participa de cada projeto e o que cada um pode ver.' },
      ],
      comparativo: {
        headline: 'Menos tarefa perdida em conversa. Mais projeto com dono e prazo.',
        antes: [
          { rotulo: 'Abertura de loja', texto: '“Quem ficou de resolver o alvará?”' },
          { rotulo: 'Reforma', texto: 'Orçamento e prazo em print de WhatsApp.' },
          { rotulo: 'Prioridade', texto: '“Acho que isso é mais urgente.”' },
          { rotulo: 'Bloqueio', texto: '“Isso trava com quem mesmo?”' },
        ],
        depois: ['Responsável e prazo por tarefa.', 'Cronograma acompanhado pelo time.', 'Prioridade definida por critério.', 'Bloqueio identificado e endereçado.'],
      },
      objetivos: [
        'Reduzir tarefa sem responsável definido',
        'Reduzir atraso em projetos como abertura e reforma de loja',
        'Reduzir decisão perdida em conversa de WhatsApp',
        'Aumentar prazo cumprido nos projetos do time',
        'Aumentar prioridade definida por critério, não por achismo',
        'Aumentar controle entre projetos em andamento',
      ],
      cenario: {
        frase: 'O objetivo é simples: em vez de o projeto avançar por mensagem solta e planilha perdida, cada tarefa aparece com responsável, prazo e prioridade definidos.',
        identificacao: 'Cenário demonstrativo — projeto de exemplo (Produto Digital)',
        aviso: 'Pessoas e dados são fictícios; o mesmo quadro serve para a abertura de uma loja, uma reforma ou o backlog do time administrativo.',
      },
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
      <p class="solucao-demo__disclaimer">${solucao.cenario ? `${escapar(solucao.cenario.identificacao)}. ${escapar(solucao.cenario.aviso)}` : 'Dados desta demonstração são fictícios.'}</p>
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

  // Largura "de desktop" em que os protótipos foram desenhados — ver o
  // comentário de .solucao-demo__viewport em varejo.css.
  const LARGURA_DEMO = 1440;
  let observadorDemo = null;

  function ajustarEscalaDemo(viewport) {
    const iframe = viewport?.querySelector('iframe');
    if (!iframe) return;
    iframe.style.setProperty('--solucao-demo-escala', viewport.clientWidth / LARGURA_DEMO);
  }

  function observarEscalaDemo(showcase) {
    observadorDemo?.disconnect();
    const viewport = showcase.querySelector('.solucao-demo__viewport');
    if (!viewport) return;
    ajustarEscalaDemo(viewport);
    observadorDemo = new ResizeObserver(() => ajustarEscalaDemo(viewport));
    observadorDemo.observe(viewport);
  }

  function iniciarSolucoes() {
    const app = document.getElementById('solucoes-app');
    if (!app) return;

    app.innerHTML = `${renderizarNavegacao()}<div class="solucoes__showcase">${renderizarSolucao(solucoes[0])}</div>`;
    const showcase = app.querySelector('.solucoes__showcase');
    const tabs = [...app.querySelectorAll('[role="tab"]')];
    observarEscalaDemo(showcase);

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
      observarEscalaDemo(showcase);
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
