# Célere Tech — site público

**Site:** celeretech.com.br · **Deploy:** GitHub Pages (push na `main` = deploy) · **Domínio:** CNAME

Este repositório é **público**. A intranet da operação vive em `diegocap2212/celere-intranet` e não tem relação com ele — se a tarefa for sobre a esteira, o Paper ou o quadro Kanban, é no outro repositório.

> **Antes de commitar, leia o [CONTRIBUTING.md](CONTRIBUTING.md).** `main` é produção e está protegida: push direto é recusado pelo GitHub, para todo mundo. Trabalho novo nasce numa worktree (`node scripts/worktree.mjs nova <nome>`) e entra por Pull Request. Abrir o PR é seu; o merge é decisão de pessoa.

## Posicionamento

A home fala com **donos de redes de varejo físico de 2 a 10 lojas**. A promessa é uma só: *a operação do varejo grande, no tamanho da sua rede*.

O produto de entrada não é software — é o **Mapa da Operação**, pago, vendido depois de um diagnóstico gratuito de 30 minutos. O sistema vem depois do Mapa, em fatias de 2 a 4 semanas, com loja piloto primeiro.

Isto substituiu o posicionamento anterior ("PMEs de 5 a 200 colaboradores", "software sob medida"), em setembro de 2026. Se for mexer em texto de venda, o argumento inteiro — ICP, oferta em quatro degraus, o que a Célere não faz, os selos de confiança — está no Paper de Fundação, dentro da intranet. **Não invente posicionamento novo aqui.**

Três travas de escrita, herdadas do Paper:

- Nunca prometa **"clareza"**, **"visibilidade"** ou **"diagnóstico completo"**. A promessa é a lista do que o cliente recebe, não o adjetivo.
- Nunca venda "digitalização como um todo" nem "transformação digital". É a frase de toda agência; o dono não sabe o que comprar quando ouve.
- Toda seção nova precisa caber num dono de rede de quatro lojas. Se serve para qualquer empresa, está errada.

## Stack

HTML5 semântico, CSS3 vanilla, JavaScript ES6. **Zero frameworks, zero build.** Fontes: Inter (corpo) e Space Grotesk (títulos), via Google Fonts.

## Design system

O tema é **escuro** (`body.page-dark`) — não claro. Tokens em `css/style.css`, seção 1:

```css
--navy-950: #060D1A   /* fundo da página */
--navy-900: #0A1628   /* fundo alternado entre seções */
--navy-800: #0F1F3A
--orange:       #EA580C   /* accent, CTAs */
--orange-light: #F97316
--grad-brand: linear-gradient(135deg, #EA580C, #F97316)
--text-hi:  #F1F5F9            /* títulos */
--text-mid: rgba(241,245,249,.70)  /* corpo */
--text-low: rgba(241,245,249,.45)  /* legendas */
--glass-bg: rgba(255,255,255,.04)  --glass-border: rgba(255,255,255,.09)
--r-sm: 8px  --r-md: 12px  --r-lg: 20px
```

Container 1120px, `.section` com 104px de padding vertical. Breakpoints em 900px e 600px.

**Tocou em `css/`? Rode `node scripts/bump-css.mjs` antes do PR.** O `?v=` das folhas é a única chave de cache do site; sem subi-lo a mudança vai ao ar e ninguém vê.

**`css/style.css` é compartilhado com o blog.** As assinaturas `.container`, `.section`, `.section-title`, `.section-sub`, `.btn*`, `.label*`, `.navbar*`, `footer`, `.reveal` e `.faq__*` são contrato — mexer nelas mexe no blog inteiro.

**`css/varejo.css` é a camada da home**, com o que não existe no compartilhado: `.trust-logos`, `.trad__*`, `.degraus__*`, `.mapa__*`, `.cases__*`, `.cases-empty__*`, `.project-card__*`, `.naofaz__*`, `.quemfaz__*` e o estilo do `<select>`. Antes de criar classe nova aqui, procure no `style.css` — `.glass-card`, `.step__num`, `.step__title`, `.step__text`, `.step__tag`, `.dor__*` e os formulários já existem e são reaproveitados.

> `style.css` ainda carrega as seções da home antiga (`#stats`, `#solucao`, `#comparativo`, `.case__cards`, `.spec__*`, `.pilares__*`, `.logo-marquee`). Está morto na home, mas parte disso o blog usa — não saia apagando sem conferir.

## Estrutura

```
/
├── index.html          # a landing (11 seções, listadas abaixo)
├── obrigado.html       # pós-formulário, noindex
├── css/style.css       # compartilhado com o blog
├── css/varejo.css      # camada da home
├── js/main.js          # navbar e rodapé injetados, formulários, animações
├── js/cases.js         # catálogo e componentes dos cases da home
├── images/logos/       # logos de clientes: branco com alfa (ver abaixo)
├── images/             # fotos e assets antigos
├── blog/               # 17 posts + index + _template.html
├── scripts/            # build-sitemap, build-related, update-blog-heads, blog-topics.json
└── CNAME, robots.txt, sitemap.xml, favicon.svg
```

### Seções da home, em ordem

`#hero` · `#dor` (os seis sintomas da segunda loja) · `#tese` (a ferramenta chegou, o processo não) · `#traducao` (o que desce do varejo grande e o que fica lá) · `#degraus` (os quatro degraus) · `#mapa` (o que o Mapa entrega) · `#cases` · `#naofazemos` · `#quemfaz` · `#faq` · `#cta-final`

A navbar e o rodapé linkam `#degraus`, `#mapa`, `#traducao`, `#quemfaz` e `#faq`. **Renomeou um id, atualize `js/main.js`** — as âncoras vêm de lá, não do HTML.

### Cases e portfólio

O catálogo vive no array `projetos` de `js/cases.js`. Vazio, ele mantém o estado editorial que já está no HTML; preenchido, renderiza o primeiro item marcado como `destaque` em formato maior e distribui os demais no grid. O componente aceita vídeo MP4 sem controles (`autoplay`, `muted`, `loop`, `playsInline`), usa a imagem cadastrada como poster e fallback e expõe `data-case-media` como gancho para um modal futuro.

Não publique card incompleto para ocupar espaço. Nome de cliente, problema, solução, resultado, mídia e autorização de uso entram apenas quando forem reais e confirmados.

## A faixa de logos

Os arquivos em `images/logos/` são a marca em **branco com canal alfa**, já recortada. Assentam direto no fundo escuro — sem chip, sem `filter: grayscale()`.

Isso não é preferência estética: os PNGs originais em `images/` (`renner.png`, `dafiti.png`, `pluxee.png`, `raia-drogasil.png`) **não têm transparência nenhuma** — são retângulos opacos de fundo branco, cinza ou verde. A home antiga disfarçava isso com um chip claro atrás de cada um, que é o "quadrado" que aparecia. Nunca volte a usar os originais na faixa.

A altura é **por marca**, em `varejo.css`, via `[data-marca="..."]`: um monograma quadrado e uma palavra de seis letras não têm a mesma massa óptica com a mesma altura. Logo novo = mais um `<img data-marca="x">` no HTML e mais uma linha de altura no CSS.

## Caminhos relativos

`caminhosDoSite()` em `js/main.js` calcula `rootPath` e `blogPath` contando a profundidade da URL. Não volte a testar `pathname.includes('/blog/')`: aquele booleano quebrava em qualquer pasta nova, e o `${rootPath}${blogPath}` que ele exigia dava 404 nos links de post do rodapé dentro do blog. `blogPath` já vem completo — use `${blogPath}post.html`, sem prefixo.

## Formulários

`initLeadForm(id)` valida pelo atributo `required` (não por lista fixa de campos), dispara a conversão do Ads e o `generate_lead` do GA4, e abre o WhatsApp com os dados. O `data-origem` do `<form>` vai junto no evento do GA4 — é como se separa a origem do lead nos relatórios.

O campo `lojas` é opcional no código e obrigatório na home: é a qualificação ("tem mais de uma loja?") feita antes da conversa, não durante.

## Integrações

- **WhatsApp:** +55 11 99147-6160
- **Google Ads:** `AW-856467424` · conversão de lead `AW-856467424/lswwCIi-r6ccEODPspgD` · página obrigado `AW-856467424/p2QlCKbMqKocEODPspgD`
- **GA4:** `G-LX9B0H8BF7` (property 250126879)
- **AdSense:** `ca-pub-5027217286342270` — **só no blog e na obrigado.** Fora da home de propósito: anúncio de terceiro numa página de captação disputa o clique com o formulário e pode vender o visitante para um concorrente.

## Blog

Um arquivo HTML por post, sem gerador. `scripts/blog-topics.json` é a fila de pautas (`published` / `pending`); a rotina de publicação consome a próxima `pending` e para em silêncio quando acabam. `build-sitemap.mjs` reconstrói o sitemap inteiro a partir dos posts — não edite `sitemap.xml` na mão.

A fila foi replanejada para varejo em setembro de 2026 (estoque entre lojas, reposição, conciliação de cartão, lucro por loja). Os 12 posts já publicados são do posicionamento antigo e continuam no ar: trazem tráfego orgânico e reescrevê-los quebraria os links internos que o `build-related.mjs` já gerou.

## Convenções

- Português no código, nos comentários e na interface.
- Comentário explica *por quê*, não *o quê*.
- Ícone é sempre SVG inline, com traço, na grade de 24px. Nunca emoji.
