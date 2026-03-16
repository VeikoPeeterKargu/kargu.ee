/* ── main.js — kargu.ee v3 ── */
(function () {
  'use strict';

  /* ── NAVBAR: scroll behaviour ── */
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  function onScroll() {
    const y = window.scrollY;
    if (y > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── ACTIVE NAV LINK on scroll ── */
  const sections = document.querySelectorAll('section[id], header[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    const scrollY = window.scrollY + 120;
    let current = '';
    sections.forEach(section => {
      if (section.offsetTop <= scrollY) {
        current = section.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === '#' + current
      );
    });
  }
  window.addEventListener('scroll', updateActiveLink, { passive: true });

  /* ── HERO: Ken Burns trigger once loaded ── */
  const hero = document.getElementById('hero');
  if (hero) {
    // Small delay so CSS transition fires after paint
    requestAnimationFrame(() => {
      setTimeout(() => hero.classList.add('is-loaded'), 100);
    });
  }

  /* ── HAMBURGER / MOBILE MENU ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  function toggleMenu(open) {
    const isOpen = open ?? !mobileMenu.classList.contains('is-open');
    mobileMenu.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => toggleMenu());

    // Close on mobile link click
    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        toggleMenu(false);
        // Smooth scroll is handled by CSS, but we need offset for fixed nav
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          const top = target.offsetTop - parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (mobileMenu.classList.contains('is-open') &&
          !mobileMenu.contains(e.target) &&
          !hamburger.contains(e.target)) {
        toggleMenu(false);
      }
    });
  }

  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    // Fallback: show all immediately
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ── STAGGERED CARD REVEALS ── */
  // Give each card an additional delay based on its index
  document.querySelectorAll('.card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 90}ms`;
  });

  /* ── SMOOTH SCROLL for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--nav-h')) || 72;
        window.scrollTo({
          top: target.offsetTop - navH,
          behavior: 'smooth',
        });
      }
    });
  });

  /* ── SUBTLE PARALLAX on hero bg ── */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          const vh = window.innerHeight;
          if (scrolled < vh * 1.5) {
            heroBg.style.transform = `scale(1) translateY(${scrolled * 0.25}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

})();
