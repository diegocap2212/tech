document.addEventListener('DOMContentLoaded', () => {
  // 1. INJECT COMPONENTS
  injectNavbar();
  injectFooter();

  // 2. INITIALIZE ANIMATIONS
  initScrollReveal();

  // 3. NAVBAR SCROLL EFFECT
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (nav) {
      if (window.scrollY > 20) {
        nav.classList.add('navbar--scrolled');
      } else {
        nav.classList.remove('navbar--scrolled');
      }
    }
  });

  // 4. LEAD FORM HANDLERS
  initLeadForm('lead-form');
  initLeadForm('lead-form-bottom');

  // 5. PORTFOLIO IFRAME SCALING
  scalePortfolioIframes();
  window.addEventListener('resize', scalePortfolioIframes);
});

function scalePortfolioIframes() {
  document.querySelectorAll('.portfolio__preview').forEach(function(preview) {
    var iframe = preview.querySelector('.portfolio__iframe');
    if (!iframe) return;
    var scale = preview.offsetWidth / 1200;
    iframe.style.transform = 'scale(' + scale + ')';
    preview.style.height = Math.round(750 * scale) + 'px';
  });
}

/**
 * Injects the global Navbar into elements with id="navbar-placeholder"
 */
function injectNavbar() {
  const placeholder = document.getElementById('navbar-placeholder');
  if (!placeholder) return;

  const isBlog = window.location.pathname.includes('/blog/');
  const rootPath = isBlog ? '../' : '';
  const blogPath = isBlog ? '' : 'blog/';

  // On blog pages keep WhatsApp link; on LP scroll to the lead form
  const ctaHref = isBlog
    ? 'href="https://api.whatsapp.com/send/?phone=5511991476160&text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20C%C3%A9lere%20e%20gostaria%20de%20agendar%20meu%20diagn%C3%B3stico%20gratuito&type=phone_number&app_absent=0" target="_blank"'
    : 'href="#lead-form-wrap"';

  placeholder.innerHTML = `
    <nav class="navbar">
      <div class="navbar__inner">
        <a href="${rootPath}index.html" class="navbar__logo">
          <span class="logo-mark">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" rx="8" fill="#EA580C"/>
              <path d="M 11 13 A 5 5 0 0 1 11 23" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M 11 9 A 9 9 0 0 1 11 27" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M 11 5 A 13 13 0 0 1 11 31" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
          </span>
          <div>
            <span class="logo-wordmark">CÉL<em>E</em>RE<span class="logo-tech"> TECH</span></span>
            <span class="logo-tagline">Consultoria · Software · Gestão</span>
          </div>
        </a>
        <div style="display:flex;align-items:center;gap:20px;">
          <nav class="navbar__links">
            <a href="${rootPath}index.html#solucao">Metodologia</a>
            <a href="${rootPath}index.html#portfolio">Portfólio</a>
            <a href="${rootPath}index.html#especialistas">Especialistas</a>
            <a href="${rootPath}${blogPath}index.html">Blog</a>
          </nav>
          <a ${ctaHref} class="btn btn--primary navbar__cta">
            Diagnóstico Gratuito
          </a>
        </div>
      </div>
    </nav>
  `;
}

/**
 * Handles lead form submission: fires Google Ads conversion + opens WhatsApp
 */
function initLeadForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome     = (form.querySelector('[name="nome"]')?.value     || '').trim();
    const empresa  = (form.querySelector('[name="empresa"]')?.value  || '').trim();
    const telefone = (form.querySelector('[name="telefone"]')?.value || '').trim();
    const cargo    = (form.querySelector('[name="cargo"]')?.value    || '').trim();

    if (!nome || !empresa || !telefone || !cargo) {
      form.querySelectorAll('input').forEach(input => {
        if (!input.value.trim()) input.style.borderColor = '#EF4444';
      });
      return;
    }

    // IMPORTANTE: substitua AW-XXXXXXXXXX/YYYYYYYYYY pelo seu ID de conversão do Google Ads
    if (typeof gtag === 'function') {
      gtag('event', 'conversion', { send_to: 'AW-XXXXXXXXXX/YYYYYYYYYY' });
    }

    const mensagem = encodeURIComponent(
      `Olá! Gostaria de agendar meu diagnóstico gratuito.\n\nNome: ${nome}\nEmpresa: ${empresa}\nTelefone: ${telefone}\nCargo: ${cargo}`
    );
    window.open(`https://api.whatsapp.com/send/?phone=5511991476160&text=${mensagem}`, '_blank');

    // Show success feedback
    const wrap = form.closest('.hero__form-card') || form.closest('.cta-final__form-wrap') || form.parentElement;
    const successHTML = `<div class="lead-form__success">
      <p>Obrigado, ${nome}! Abrindo o WhatsApp para confirmar seu diagnóstico. 🎉</p>
      <p style="font-size:14px;font-weight:400;color:var(--slate-light);margin-top:8px;">Não abriu? <a href="https://api.whatsapp.com/send/?phone=5511991476160&text=${mensagem}" target="_blank" style="color:var(--orange)">Clique aqui</a></p>
    </div>`;
    form.outerHTML = successHTML;
  });
}

/**
 * Injects the global Footer into elements with id="footer-placeholder"
 */
function injectFooter() {
  // Footer temporariamente removido — aguardando dados da empresa
}

/**
 * Initialize FAQ Accordion (can be called globally)
 */
window.toggleFaq = function(btn) {
  const item = btn.closest('.faq__item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq__item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
};

/**
 * Scroll reveal animations
 */
function initScrollReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve after animating
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Targets for reveal
  const targets = document.querySelectorAll('.reveal, .dor__item, .step, .stat, .spec__card, .case__col, .faq__item, .card');
  targets.forEach(el => {
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal');
    }
    observer.observe(el);
  });
}
