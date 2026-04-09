/* ══════════════════════════════════════
   Chandan RAJ — PORTFOLIO SCRIPTS
══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAVBAR SCROLL ── */
  const nav = document.getElementById('mainNav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── ACTIVE NAV LINK ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 130;
    sections.forEach(s => {
      if (scrollY >= s.offsetTop && scrollY < s.offsetTop + s.offsetHeight) {
        navLinks.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === `#${s.id}`);
        });
      }
    });
  }, { passive: true });

  /* ── CLOSE MOBILE NAV ON CLICK ── */
  document.querySelectorAll('.navbar-nav .nav-link, .btn-nav-cta').forEach(el => {
    el.addEventListener('click', () => {
      const menu = document.getElementById('navMenu');
      bootstrap.Collapse.getInstance(menu)?.hide();
    });
  });

  /* ── SCROLL REVEAL ── */
  const revealTargets = document.querySelectorAll(
    '.skill-tile, .proj-card, .exp-card, .testi-card, .info-row, .cert-row, .ach-row, .c-item, .soft-tile, .res-entry'
  );

  const ro = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const siblings = [...(entry.target.closest('.row, .exp-timeline, .contact-list, .resume-box') || entry.target.parentElement).children];
      const idx = siblings.indexOf(entry.target.closest('[class]')) || 0;
      entry.target.style.transitionDelay = `${Math.min(idx * 70, 400)}ms`;
      entry.target.classList.add('reveal', 'visible');
      ro.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => {
    el.classList.add('reveal');
    ro.observe(el);
  });

  /* ── SKILL BAR ANIMATION ── */
  const fills = document.querySelectorAll('.st-fill');
  const so = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('animated'); so.unobserve(e.target); }
    });
  }, { threshold: 0.4 });
  fills.forEach(f => so.observe(f));

  /* ── BACK TO TOP ── */
  const btn = document.getElementById('backTop');
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ── TYPED HERO SUBTITLE ── */
  const tag = document.querySelector('.hero-nametag');
  if (tag) {
    const roles = ['Software Developer', 'React Specialist', 'Frontend Architect', 'Next.js Engineer'];
    let ri = 0, ci = 0, del = false;
    const base = 'Chandan Raj — ';

    const type = () => {
      const word = roles[ri];
      tag.textContent = del
        ? base + word.slice(0, --ci)
        : base + word.slice(0, ++ci);

      let wait = del ? 55 : 95;
      if (!del && ci === word.length) { wait = 2200; del = true; }
      else if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; wait = 350; }
      setTimeout(type, wait);
    };
    setTimeout(type, 2000);
  }

  /* ── CONTACT FORM ── */
  const submitBtn = document.querySelector('.btn-submit');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const inputs = document.querySelectorAll('.cf-input');
      const ok = [...inputs].every(i => i.value.trim());
      if (ok) {
        submitBtn.innerHTML = '<i class="bi bi-check-circle-fill"></i> Message Sent!';
        submitBtn.style.background = '#16a34a';
        submitBtn.style.borderColor = '#16a34a';
        setTimeout(() => {
          submitBtn.innerHTML = 'Send Message <i class="bi bi-send"></i>';
          submitBtn.style.background = '';
          submitBtn.style.borderColor = '';
          inputs.forEach(i => i.value = '');
        }, 3000);
      } else {
        submitBtn.innerHTML = 'Please fill all fields <i class="bi bi-exclamation-circle"></i>';
        submitBtn.style.background = '#dc2626';
        submitBtn.style.borderColor = '#dc2626';
        setTimeout(() => {
          submitBtn.innerHTML = 'Send Message <i class="bi bi-send"></i>';
          submitBtn.style.background = '';
          submitBtn.style.borderColor = '';
        }, 2500);
      }
    });
  }

  /* ── PROJECT CARD SUBTLE TILT ── */
  document.querySelectorAll('.proj-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateY(${x * 5}deg) rotateX(${-y * 3}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

});