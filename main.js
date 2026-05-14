/* INCLAVATUS — main.js */

// ─── CURSEUR PERSONNALISÉ ──────────────────────────────────
const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursor-trail');

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateTrail() {
  trailX += (mouseX - trailX) * .12;
  trailY += (mouseY - trailY) * .12;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top  = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

// Curseur change sur liens / boutons
document.querySelectorAll('a, button, input, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2)';
    cursor.style.background = 'var(--gold)';
    cursorTrail.style.opacity = '.7';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursor.style.background = 'var(--orange)';
    cursorTrail.style.opacity = '.4';
  });
});

// Masquer curseur si mobile
if ('ontouchstart' in window) {
  cursor.style.display = 'none';
  cursorTrail.style.display = 'none';
  document.body.style.cursor = 'default';
}

// ─── BRUIT DE FOND ────────────────────────────────────────
const canvas = document.getElementById('noise-canvas');
const ctx    = canvas.getContext('2d');

function generateNoise() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  const imageData = ctx.createImageData(canvas.width, canvas.height);
  const buffer    = new Uint32Array(imageData.data.buffer);
  for (let i = 0; i < buffer.length; i++) {
    const val = (Math.random() * 255) | 0;
    buffer[i] = (255 << 24) | (val << 16) | (val << 8) | val;
  }
  ctx.putImageData(imageData, 0, 0);
}

generateNoise();
setInterval(generateNoise, 80);
window.addEventListener('resize', generateNoise);

// ─── NAVIGATION SCROLL ────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Liens actifs au scroll
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: .4 });

sections.forEach(s => observer.observe(s));

// ─── SCROLL REVEAL ────────────────────────────────────────
const revealEls = document.querySelectorAll(
  '.extrait-card, .auteur-grid, .contact-card, .section-header'
);

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .1 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .7s ease, transform .7s ease';
  revealObserver.observe(el);
});

// ─── EFFET PARALLAXE HERO ────────────────────────────────
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  if (window.scrollY < window.innerHeight) {
    const y = window.scrollY * .3;
    hero.style.backgroundPositionY = `calc(80% + ${y}px)`;
  }
}, { passive: true });

// ─── FLAMME AU SURVOL DU TITRE ───────────────────────────
const titleLetters = document.querySelectorAll('.title-letter');
titleLetters.forEach((letter, i) => {
  letter.addEventListener('mouseenter', () => {
    letter.style.color = i % 2 === 0 ? 'var(--orange-glow)' : 'var(--gold-light)';
    letter.style.webkitTextStroke = `1px ${i % 2 === 0 ? 'var(--orange)' : 'var(--gold)'}`;
    letter.style.textShadow = `0 0 20px ${i % 2 === 0 ? 'rgba(232,97,10,.5)' : 'rgba(201,168,76,.5)'}`;
  });
  letter.addEventListener('mouseleave', () => {
    letter.style.color = 'transparent';
    letter.style.webkitTextStroke = '1px var(--gold)';
    letter.style.textShadow = 'none';
  });
});

// ─── FORMULAIRE (placeholder) ─────────────────────────────
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn  = form.querySelector('.submit-btn');
    const orig = btn.innerHTML;
    btn.innerHTML = '<span>Message envoyé ✦</span>';
    btn.style.borderColor = 'var(--gold)';
    btn.style.color       = 'var(--gold-light)';
    setTimeout(() => {
      btn.innerHTML         = orig;
      btn.style.borderColor = '';
      btn.style.color       = '';
      form.reset();
    }, 3000);
  });
}
