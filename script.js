/* ── NAVBAR SCROLL EFFECT ──────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveNav();
}, { passive: true });

/* ── HAMBURGER MENU ────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  const isOpen = navLinks.classList.contains('open');
  spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity   = isOpen ? '0' : '';
  spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity   = '';
    });
  });
});

/* ── ACTIVE NAV ON SCROLL ──────────────────────────────── */
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const height = sec.offsetHeight;
    const id     = sec.getAttribute('id');
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + height);
  });
}

/* ── SCROLL REVEAL ─────────────────────────────────────── */
const reveals = document.querySelectorAll(
  '.service-card, .portfolio-card, .testi-card, .value-item, .contact-item, .about-img-wrap, .about-content'
);

reveals.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => revealObserver.observe(el));

/* ── PORTFOLIO FILTER ──────────────────────────────────── */
const filterBtns   = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    portfolioCards.forEach(card => {
      const match = filter === 'all' || card.dataset.cat === filter;
      card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      if (match) {
        card.classList.remove('hidden');
        card.style.opacity   = '1';
        card.style.transform = 'scale(1)';
      } else {
        card.style.opacity   = '0';
        card.style.transform = 'scale(0.92)';
        setTimeout(() => card.classList.add('hidden'), 300);
      }
    });
  });
});

/* ── CONTACT FORM ──────────────────────────────────────── */
const form    = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const phone   = document.getElementById('phone').value.trim();
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value.trim();

  console.log('Contact Form Submission:', { name, email, phone, service, message });

  if (!name || !email || !message) {
    formMsg.textContent = 'Please fill in all required fields.';
    formMsg.style.color = '#f87171';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formMsg.textContent = 'Please enter a valid email address.';
    formMsg.style.color = '#f87171';
    return;
  }

  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    formMsg.textContent = '✦ Message sent! We\'ll be in touch within 24 hours.';
    formMsg.style.color = '#D4AF37';
    form.reset();
    btn.textContent = 'Send Message ✦';
    btn.disabled = false;
  }, 1400);
});

/* ── ANIMATED COUNTER ──────────────────────────────────── */
function animateCounter(el, target, duration = 1600) {
  let start = 0;
  const increment = target / (duration / 16);
  const suffix = el.textContent.replace(/\d+/, '').trim();
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + suffix;
    }
  }, 16);
}

const statNums = document.querySelectorAll('.stat-num');
let countersStarted = false;

const statsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !countersStarted) {
    countersStarted = true;
    statNums.forEach(el => {
      const raw    = el.textContent;
      const num    = parseInt(raw);
      const suffix = raw.replace(/\d+/, '');
      el.textContent = '0' + suffix;
      animateCounter(el, num);
    });
  }
}, { threshold: 0.5 });

if (statNums.length) statsObserver.observe(statNums[0].closest('.hero-stats') || statNums[0]);

/* ── SMOOTH SCROLL OFFSET (fixed nav) ─────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 70;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});
