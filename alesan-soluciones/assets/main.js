/**
 * Alesan Soluciones — interacciones de la landing.
 * Sin dependencias. Todo el contenido es visible si JavaScript falla.
 */

(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.getElementById('site-header');
  const menu = document.getElementById('mobile-menu');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const menuIconOpen = document.querySelector('[data-menu-icon-open]');
  const menuIconClose = document.querySelector('[data-menu-icon-close]');

  /* -----------------------------------------------------------------------
     Header: fondo sólido al abandonar el hero
     ----------------------------------------------------------------------- */
  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  /* -----------------------------------------------------------------------
     Menú móvil accesible
     ----------------------------------------------------------------------- */
  const setMenuState = (open) => {
    if (!menu || !menuToggle || !header) return;

    menu.hidden = !open;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    header.classList.toggle('menu-open', open);
    menuIconOpen?.classList.toggle('hidden', open);
    menuIconClose?.classList.toggle('hidden', !open);
    document.body.style.overflow = open ? 'hidden' : '';

    if (open) {
      menu.querySelector('a')?.focus({ preventScroll: true });
    }
  };

  menuToggle?.addEventListener('click', () => {
    setMenuState(menu?.hidden ?? true);
  });

  menu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (menu && !menu.hidden) {
      setMenuState(false);
      menuToggle?.focus({ preventScroll: true });
    }
  });

  document.addEventListener('click', (event) => {
    if (!menu || menu.hidden || !header) return;
    if (!header.contains(event.target)) setMenuState(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && menu && !menu.hidden) setMenuState(false);
  });

  /* -----------------------------------------------------------------------
     Aparición progresiva de bloques
     ----------------------------------------------------------------------- */
  const revealItems = document.querySelectorAll('.reveal, .reveal-scale');

  if (!('IntersectionObserver' in window) || reduceMotion) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' },
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  /* -----------------------------------------------------------------------
     Gráficas: activa las barras solo cuando entran en pantalla
     ----------------------------------------------------------------------- */
  const charts = document.querySelectorAll('[data-chart]');

  if (!('IntersectionObserver' in window) || reduceMotion) {
    charts.forEach((chart) => chart.classList.add('is-visible'));
  } else {
    const chartObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.25 },
    );

    charts.forEach((chart) => chartObserver.observe(chart));
  }

  /* -----------------------------------------------------------------------
     Año dinámico en el footer
     ----------------------------------------------------------------------- */
  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = new Date().getFullYear();
  });
})();
