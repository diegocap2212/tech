document.addEventListener('DOMContentLoaded', () => {
  // 1. INJECT COMPONENTS
  injectNavbar();
  injectFooter();

  // 2. INITIALIZE ANIMATIONS
  initScrollReveal();
  initCountUp();

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
  initLeadForm('lead-form-hero');
  initLeadForm('lead-form-bottom');
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Injects the global Navbar into elements with id="navbar-placeholder"
 */
function injectNavbar() {
  const placeholder = document.getElementById('navbar-placeholder');
  if (!placeholder) return;

  const isBlog = window.location.pathname.includes('/blog/');
  const rootPath = isBlog ? '../' : '';
  const blogPath = isBlog ? '' : 'blog/';

  // On blog pages keep WhatsApp link; on LP scroll to the hero lead form
  const ctaHref = isBlog
    ? 'href="https://api.whatsapp.com/send/?phone=5511991476160&text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20C%C3%A9lere%20e%20gostaria%20de%20agendar%20meu%20diagn%C3%B3stico%20gratuito&type=phone_number&app_absent=0" target="_blank"'
    : 'href="#cta-final"';

  placeholder.innerHTML = `
    <nav class="navbar">
      <div class="navbar__inner">
        <a href="${rootPath}index.html" class="navbar__logo">
          <span class="logo-mark">
            <svg width="36" height="36" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="7,7 55,7 49,19 7,19" fill="#EA580C"/>
              <rect x="7" y="19" width="13" height="24" fill="#EA580C"/>
              <polygon points="7,43 55,43 49,55 7,55" fill="#EA580C"/>
            </svg>
          </span>
          <div class="logo-wordmark">
            <span class="logo-name">CÉLERE</span>
            <span class="logo-sub">TECH</span>
          </div>
        </a>
        <div class="navbar__right">
          <nav class="navbar__links" id="navbar-links">
            <a href="${rootPath}index.html#solucao">Metodologia</a>
            <a href="${rootPath}index.html#especialistas">Especialistas</a>
            <a href="${rootPath}${blogPath}index.html">Blog</a>
            <a ${ctaHref} class="navbar__links-cta">Diagnóstico Gratuito</a>
          </nav>
          <a ${ctaHref} class="btn btn--primary navbar__cta">
            Diagnóstico Gratuito
          </a>
          <button class="navbar__toggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="navbar-links">
            <svg class="icon-menu" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>
            <svg class="icon-close" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
          </button>
        </div>
      </div>
    </nav>
  `;

  const nav = placeholder.querySelector('.navbar');
  const toggle = placeholder.querySelector('.navbar__toggle');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('navbar--open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  // Fecha o menu ao navegar
  placeholder.querySelectorAll('.navbar__links a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('navbar--open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
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

    if (!nome || !empresa || !telefone) {
      form.querySelectorAll('input').forEach(input => {
        if (!input.value.trim()) input.style.borderColor = '#EF4444';
      });
      return;
    }

    // Dispara conversão — Lead — Diagnóstico Gratuito
    if (typeof gtag === 'function') {
      gtag('event', 'conversion', { send_to: 'AW-856467424/lswwCIi-r6ccEODPspgD' });
    }

    const mensagem = encodeURIComponent(
      `Olá! Gostaria de agendar meu diagnóstico gratuito.\n\nNome: ${nome}\nEmpresa: ${empresa}\nTelefone: ${telefone}`
    );
    window.open(`https://api.whatsapp.com/send/?phone=5511991476160&text=${mensagem}`, '_blank');

    // Show success feedback
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
  const placeholder = document.getElementById('footer-placeholder');
  if (!placeholder) return;

  const isBlog = window.location.pathname.includes('/blog/');
  const rootPath = isBlog ? '../' : '';
  const blogPath = isBlog ? '' : 'blog/';
  const year = new Date().getFullYear();

  placeholder.innerHTML = `
    <footer>
      <div class="container footer__inner">
        <div class="footer__grid">
          <div class="footer__brand">
            <a href="${rootPath}index.html" class="navbar__logo">
              <span class="logo-mark">
                <svg width="32" height="32" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="7,7 55,7 49,19 7,19" fill="#EA580C"/>
                  <rect x="7" y="19" width="13" height="24" fill="#EA580C"/>
                  <polygon points="7,43 55,43 49,55 7,55" fill="#EA580C"/>
                </svg>
              </span>
              <div class="logo-wordmark">
                <span class="logo-name">CÉLERE</span>
                <span class="logo-sub">TECH</span>
              </div>
            </a>
            <p class="footer__tagline">Não adaptamos sua empresa ao software. Criamos o software para a sua empresa.</p>
          </div>
          <div>
            <h4 class="footer__col-title">Navegação</h4>
            <ul class="footer__links">
              <li><a href="${rootPath}index.html#solucao">Metodologia</a></li>
              <li><a href="${rootPath}index.html#especialistas">Especialistas</a></li>
              <li><a href="${rootPath}index.html#faq">Perguntas Frequentes</a></li>
            </ul>
          </div>
          <div>
            <h4 class="footer__col-title">Conteúdo</h4>
            <ul class="footer__links">
              <li><a href="${rootPath}${blogPath}index.html">Blog</a></li>
              <li><a href="${rootPath}${blogPath}como-criar-sop-guia-pratico-pmes.html">Como criar um SOP</a></li>
              <li><a href="${rootPath}${blogPath}excel-vs-sistema-de-gestao-quando-migrar.html">Excel vs. Sistema</a></li>
              <li><a href="${rootPath}${blogPath}indicadores-operacionais-para-pmes.html">Indicadores para PMEs</a></li>
            </ul>
          </div>
          <div>
            <h4 class="footer__col-title">Contato</h4>
            <ul class="footer__links">
              <li><a href="https://api.whatsapp.com/send/?phone=5511991476160&text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20C%C3%A9lere%20e%20gostaria%20de%20agendar%20meu%20diagn%C3%B3stico%20gratuito&type=phone_number&app_absent=0" target="_blank" rel="noopener">WhatsApp — (11) 99147-6160</a></li>
              <li><a href="https://www.linkedin.com/company/celere-tech" target="_blank" rel="noopener">LinkedIn</a></li>
              <li><a href="mailto:diegocaporusso@gmail.com">E-mail</a></li>
            </ul>
          </div>
        </div>
        <div class="footer__bottom">
          <p class="footer__text">© ${year} Célere Tech — Consultoria de Processos & Tecnologia. Todos os direitos reservados.</p>
          <p class="footer__text">celeretech.com.br</p>
        </div>
      </div>
    </footer>
  `;
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
 * Scroll reveal animations (with stagger support via .stagger containers)
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

  // Stagger: children of .stagger containers animate in sequence
  document.querySelectorAll('.stagger').forEach(container => {
    Array.from(container.children).forEach((child, i) => {
      if (!child.classList.contains('reveal')) child.classList.add('reveal');
      child.style.transitionDelay = prefersReducedMotion ? '0ms' : `${i * 80}ms`;
    });
  });

  // Targets for reveal
  const targets = document.querySelectorAll('.reveal, .dor__item, .step, .stat, .spec__card, .case__col, .faq__item, .card');
  targets.forEach(el => {
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal');
    }
    observer.observe(el);
  });
}

/**
 * Animated count-up for elements with [data-target].
 * Supports data-prefix, data-suffix and data-decimals.
 */
function initCountUp() {
  const nums = document.querySelectorAll('[data-target]');
  if (!nums.length) return;

  const render = (el, value) => {
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    el.textContent = (el.dataset.prefix || '') + value.toFixed(decimals) + (el.dataset.suffix || '');
  };

  if (prefersReducedMotion) {
    nums.forEach(el => render(el, parseFloat(el.dataset.target)));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      observer.unobserve(el);

      const target = parseFloat(el.dataset.target);
      const duration = 1200;
      const start = performance.now();

      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
        render(el, target * eased);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.4 });

  nums.forEach(el => observer.observe(el));
}
