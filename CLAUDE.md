# Célere — Consultoria de Processos & Tecnologia

## Projeto
**Site:** celeretech.com.br  
**Deploy:** GitHub Pages (push to main = deploy automático)  
**Domínio:** CNAME → celeretech.com.br

## Stack
- HTML5 semântico + CSS3 vanilla + JavaScript ES6 puro
- **Zero frameworks** (sem React, Vue, Webpack, etc.)
- Fonte: Inter — Google Fonts (400, 500, 600, 700, 900)

## Design System

### Paleta de cores
```css
--navy:        #0A1628   /* Background principal / textos dark */
--navy-80:     rgba(10,22,40,0.80)
--orange:      #EA580C   /* Accent primário, CTAs */
--orange-h:    #C94C08   /* Hover do orange */
--white:       #FFFFFF
--off-white:   #F1F5F9   /* Background seções light */
--slate:       #334155   /* Texto principal */
--slate-light: #64748B   /* Texto secundário */
--border:      #E2E8F0
--shadow:      0 4px 24px rgba(0,0,0,0.1)
```

### Tipografia
- Família: Inter, sans-serif — Base: 17px / line-height 1.65
- Headings: `clamp()` para responsividade (ex: `clamp(32px, 4vw, 46px)`)

### Breakpoints
- `@media (max-width: 900px)` — tablet
- `@media (max-width: 600px)` — mobile

## Estrutura de Arquivos
```
/
├── index.html              # Landing page principal (602+ linhas)
├── css/style.css           # Todo o CSS (478+ linhas)
├── js/main.js              # Navbar/footer injetados + formulários + animações
├── images/                 # Fotos e logos
│   ├── diego.png           # Foto do Diego (especialistas)
│   ├── diego.stage.png     # Foto Diego palestrando (seção foto)
│   ├── renner.png          # Logo Lojas Renner
│   ├── dafiti.png          # Logo Dafiti
│   ├── pluxee.png          # Logo Pluxee
│   └── raia-drogasil.png   # Logo Raia Drogasil
├── portfolio/              # Mocks HTML de sistemas (iframes na seção portfólio)
│   ├── dashboard-metricas.html
│   ├── hr-system.html
│   ├── crm-system.html
│   ├── kanban-board.html
│   ├── delivery-system.html
│   ├── logistics-system.html
│   ├── workflow-system.html
│   ├── financial-dashboard.html
│   ├── governance-system.html
│   └── okr-dashboard.html
├── blog/                   # Posts do blog
│   ├── index.html
│   └── *.html              # Artigos individuais
├── obrigado.html           # Página de agradecimento pós-formulário
└── CNAME                   # celeretech.com.br
```

## Seções da Landing Page (em ordem)
1. `#hero` — Hero com headline + formulário de lead + logos de clientes
2. `#manifesto` — Posicionamento central ("Criamos o software para a sua empresa")
3. `#apresentacao` — Foto institucional (Diego palestrando)
4. `#stats` — 4 números-chave: 10+ anos, 300+ processos, R$2M+, 100% custom
5. `#dor` — 3 pontos de dor do cliente (tools caras, treinamento, contratos)
6. `#ferramentas` — Crítica às ferramentas genéricas (Jira, Salesforce, SAP, TOTVS, Monday, HubSpot)
7. `#nova-era` — Nova era do software customizado (~60% mais barato, ≈0 gestão)
8. `#solucao` — Metodologia 3 passos: Diagnóstico > Construção > Evolução
9. `#diferencial` — 3 diferenciais: Consultoria de Processos, Design de Fluxo, Sistema Integrado
10. `#cases` — Transformação Antes/Ação Célere/Depois de um case real
11. `#portfolio` — Portfólio de Produtos (10 mocks em iframe, 3 colunas)
12. `#comparativo` — Tabela vs. consultoria tradicional vs. SaaS vs. Célere
13. `#especialistas` — Diego Caporusso + Tiago Massaro
14. `#faq` — 7 perguntas frequentes (accordion)
15. `#cta-final` — Formulário de lead final (inline 4 colunas)

## Classes CSS Utilitárias Chave
| Classe | Uso |
|--------|-----|
| `.container` | max-width 1120px, margin auto, padding 24px |
| `.section` | padding 96px 0 |
| `.section--dark` | background navy, texto branco |
| `.section--light` | background off-white (#F1F5F9) |
| `.section-title` | h2 responsivo 32-46px, bold, navy |
| `.section-sub` | subtítulo 18px, slate-light |
| `.btn--primary` | botão laranja (#EA580C) |
| `.btn--lg` | variante grande (20px/44px) |
| `.label.label--orange` | badge laranja uppercase 12px |
| `.reveal` + `.reveal.active` | animação scroll (opacity + translateY) |

## Componentes Injetados (main.js)
- **Navbar** (`#navbar-placeholder`) — Fixa, dark navy, logo + link blog + CTA laranja
- **Footer** (`#footer-placeholder`) — Temporariamente vazio (aguardando dados)

## Interatividade (main.js)
- `initScrollReveal()` — IntersectionObserver em `.reveal`, `.dor__item`, `.step`, etc.
- `initLeadForm(id)` — Valida campos → dispara `gtag conversion` → abre WhatsApp
- `toggleFaq(btn)` — Accordion de FAQ (fecha os demais ao abrir um)
- `scalePortfolioIframes()` — Escala iframes do portfólio dinamicamente via ResizeObserver

## Integrações
- **WhatsApp Business:** +55 11 9 9147-6160
- **Google Ads GTM:** placeholder `AW-XXXXXXXXXX` (substituir pelo ID real de conversão)
- **Conversão:** `AW-XXXXXXXXXX/YYYYYYYYYY` (substituir ambos)

## Posicionamento & Mensagem
- **Tagline:** "Não adaptamos sua empresa ao software. Criamos o software para a sua empresa."
- **Público-alvo:** PMEs com 5–200 colaboradores, operação dependente de planilhas/processos manuais
- **Proposta de valor:** Consultoria de processos + construção de software customizado, resultados em 2–4 semanas
- **Payback prometido:** < 6 meses em média

## Founders
- **Diego Caporusso** — Founder & CEO (10+ anos em Raia Drogasil, Lojas Renner, Sodexo, Dafiti)
- **Tiago Massaro** — Co-Founder & CTO (arquiteto de software, sistemas sob medida)

## Portfólio de Produtos (seção #portfolio)
Cada card exibe um iframe de uma página HTML standalone em `portfolio/`. As páginas são mocks estáticos de 1200×750px que simulam SaaS reais. O JS escala o iframe dinamicamente para caber no card.

| Mock | Tipo | Arquivo |
|------|------|---------|
| Dashboard de Métricas | KPI + Burndown | `portfolio/dashboard-metricas.html` |
| Sistema de Hunting & Onboarding | RH & People | `portfolio/hr-system.html` |
| CRM Integrado | Sales CRM | `portfolio/crm-system.html` |
| Kanban de Produto | Produto/Agile | `portfolio/kanban-board.html` |
| Sistema de Delivery | Restaurantes | `portfolio/delivery-system.html` |
| Painel de Logística | Operações | `portfolio/logistics-system.html` |
| Ways of Working | Processos | `portfolio/workflow-system.html` |
| Dashboard Financeiro | Financeiro | `portfolio/financial-dashboard.html` |
| Governança de TI | Tecnologia | `portfolio/governance-system.html` |
| Dashboard OKRs & Flow | Produto/OKRs | `portfolio/okr-dashboard.html` |
