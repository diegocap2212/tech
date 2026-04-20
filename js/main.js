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
});

/**
 * Injects the global Navbar into elements with id="navbar-placeholder"
 */
function injectNavbar() {
  const placeholder = document.getElementById('navbar-placeholder');
  if (!placeholder) return;

  // Determine if we are in the blog subdirectory to adjust links
  const isBlog = window.location.pathname.includes('/blog/');
  const rootPath = isBlog ? '../' : '';
  const blogPath = isBlog ? '' : 'blog/';

  placeholder.innerHTML = `
    <nav class="navbar">
      <div class="navbar__inner">
        <a href="${rootPath}index.html" class="navbar__logo">
          <span class="logo-mark">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="34" height="34" rx="8" fill="rgba(255,255,255,0.06)"/>
              <path d="M9 10 L18 17 L9 24" stroke="#EA580C" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M17 10 L26 17 L17 24" stroke="#EA580C" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" opacity="0.45"/>
            </svg>
          </span>
          <div>
            <span class="logo-wordmark">CÉL<em>E</em>RE</span>
            <span class="logo-tagline">Processos & Tecnologia</span>
          </div>
        </a>
        <div style="display:flex;align-items:center;gap:20px;">
          <a href="${rootPath}${blogPath}index.html" style="font-size:14px;font-weight:600;color:rgba(255,255,255,0.55);letter-spacing:0.02em;">Blog</a>
          <a href="https://wa.me/55SEUNUMERO?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20meu%20diagn%C3%B3stico%20gratuito"
             target="_blank" class="btn btn--primary navbar__cta">
            Diagnóstico Gratuito
          </a>
        </div>
      </div>
    </nav>
  `;
}

/**
 * Injects the global Footer into elements with id="footer-placeholder"
 */
function injectFooter() {
  const placeholder = document.getElementById('footer-placeholder');
  if (!placeholder) return;

  placeholder.innerHTML = `
    <footer>
      <div class="container">
        <div class="footer__logo">
          <span class="logo-mark">
            <svg width="38" height="38" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="34" height="34" rx="8" fill="rgba(255,255,255,0.05)"/>
              <path d="M9 10 L18 17 L9 24" stroke="#EA580C" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M17 10 L26 17 L17 24" stroke="#EA580C" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" opacity="0.45"/>
            </svg>
          </span>
          <div>
            <span class="logo-wordmark" style="font-size:22px;">CÉL<em>E</em>RE</span>
            <span class="logo-tagline">Processos & Tecnologia</span>
          </div>
        </div>
        <p class="footer__text">
          Diego Caporusso & Tiago Massaro — Consultoria em Processos e Tecnologia para PMEs<br/>
          <a href="mailto:diegocaporusso@gmail.com">diegocaporusso@gmail.com</a>
          &nbsp;·&nbsp; © 2026 Célere
        </p>
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
