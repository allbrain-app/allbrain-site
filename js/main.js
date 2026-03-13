/* ============================================
   All Brain Corporate Site - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Header scroll effect ----------
  const header = document.getElementById('header');

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ---------- Hamburger menu ----------
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---------- Scroll animations ----------
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const parent = el.parentElement;
          const siblings = parent ? parent.querySelectorAll('.animate-on-scroll') : [el];
          let delay = 0;

          siblings.forEach((sib) => {
            if (sib === el) {
              setTimeout(() => {
                el.classList.add('visible');
              }, delay);
            }
            delay += 120;
          });

          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  animatedElements.forEach(el => observer.observe(el));

  // ---------- Hero particles ----------
  const particlesContainer = document.getElementById('particles');

  if (particlesContainer) {
    const colors = [
      'rgba(232, 97, 77, 0.4)',
      'rgba(124, 92, 191, 0.3)',
      'rgba(91, 192, 222, 0.4)',
      'rgba(67, 97, 238, 0.3)',
    ];

    function createParticle() {
      const particle = document.createElement('div');
      particle.classList.add('particle');

      const size = Math.random() * 6 + 3;
      const left = Math.random() * 100;
      const duration = Math.random() * 12 + 10;
      const delay = Math.random() * 8;
      const color = colors[Math.floor(Math.random() * colors.length)];

      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = left + '%';
      particle.style.background = color;
      particle.style.animationDuration = duration + 's';
      particle.style.animationDelay = delay + 's';

      particlesContainer.appendChild(particle);
    }

    for (let i = 0; i < 30; i++) {
      createParticle();
    }
  }

  // ---------- Smooth scroll ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
