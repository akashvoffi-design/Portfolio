/* ============================================
   AKASH V — PORTFOLIO INTERACTIONS
   Particles, Scroll Animations, 3D Cards,
   Typing Effect, Navigation, Contact Form
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initNavbar();
  initMobileNav();
  initScrollAnimations();
  initParticles();
  initBackToTop();
  initContactForm();
  initProjectCardTilt();
  initExtraWorkManualScroll();
  initCertificateLightbox();
  initMetricsCounter();
  initHeroNameScroll();
});

/* ---------- Scroll Progress Bar ---------- */
function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    bar.style.width = progress + '%';
  }, { passive: true });
}

/* ---------- Navbar ---------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = document.querySelectorAll('.section[id]');

  // Scroll class
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // Active link highlighting
  const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // Smooth scroll with offset
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (!target) return;

      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ---------- Mobile Navigation ---------- */
function initMobileNav() {
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav a');

  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';

      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (!target) return;

      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* ---------- Scroll Animations (IntersectionObserver) ---------- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  if (!elements.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    elements.forEach(el => el.classList.add('animated'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  });

  elements.forEach(el => observer.observe(el));
}

/* ---------- Particle Background ---------- */
/* ---------- Japanese Technical Words & Kanji/Kana Ambient Particle Background ---------- */
function initParticles() {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationId;
  let particles = [];
  let mouseX = -9999;
  let mouseY = -9999;

  // Technical terms in Japanese: AI, Deep Learning, Computer Vision, Data Science, Math & CS
  const techTerms = [
    '人工知能',    // AI
    '深層学習',    // Deep Learning
    '機械学習',    // Machine Learning
    '神経回路',    // Neural Network
    '画像認識',    // Computer Vision
    '言語モデル',  // Language Model
    'アルゴリズム', // Algorithm
    '潜在空間',    // Latent Space
    '推論',        // Inference
    '畳み込み',    // Convolution
    '最適化',      // Optimization
    '変換器',      // Transformer
    '特徴量',      // Feature
    '行列計算',    // Matrix Computation
    '自動化',      // Automation
    'データ',      // Data
    'モデル',      // Model
    'コード',      // Code
    'エージェント', // Agent
    'ベクトル',    // Vector
    'テンソル',    // Tensor
    '勾配降下',    // Gradient Descent
    '注意機構',    // Attention Mechanism
    '生成AI',      // Generative AI
    '探索',        // Search
    '認知',        // Cognition
    '知能',        // Intelligence
    '論理',        // Logic
    '創発',        // Emergence
    '視覚',        // Vision
    '学習',        // Learning
    '逆伝播',      // Backpropagation
    // Single expressive Kanji & Kana
    '知', '能', '学', '深', '網', '機', 'デ', 'タ', '算', '理', '創', '視', '変', '文', '式', '信', '極', '流', '図', '界'
  ];

  let width = 0;
  let height = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const parent = canvas.parentElement;
    width = parent.offsetWidth;
    height = parent.offsetHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);
  }

  resize();
  window.addEventListener('resize', resize);

  // Mouse interaction on the hero container
  const heroSection = canvas.parentElement;
  heroSection.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  }, { passive: true });

  heroSection.addEventListener('mouseleave', () => {
    mouseX = -9999;
    mouseY = -9999;
  }, { passive: true });

  class JapaneseParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.word = techTerms[Math.floor(Math.random() * techTerms.length)];
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : (Math.random() > 0.5 ? -25 : height + 25);
      // Generous, readable font sizes: 16px to 22px for terms, and 24px to 32px for single Kanji
      if (this.word.length === 1) {
        this.fontSize = Math.floor(Math.random() * 9) + 24; // 24px to 32px
        this.baseOpacity = Math.random() * 0.18 + 0.08;
      } else if (this.word.length <= 3) {
        this.fontSize = Math.floor(Math.random() * 6) + 18; // 18px to 23px
        this.baseOpacity = Math.random() * 0.20 + 0.09;
      } else {
        this.fontSize = Math.floor(Math.random() * 5) + 16; // 16px to 20px
        this.baseOpacity = Math.random() * 0.20 + 0.09;
      }
      this.speedX = (Math.random() - 0.5) * 0.32;
      this.speedY = (Math.random() - 0.5) * 0.32;
      this.opacity = this.baseOpacity;
      this.pulseSpeed = Math.random() * 0.012 + 0.006;
      this.pulseVal = Math.random() * Math.PI * 2;

      // Subtle atmospheric color palette: cyan, soft indigo, and bright silver
      const palettes = [
        '78, 205, 196',   // cyan-teal
        '165, 180, 252',  // indigo-lavender
        '226, 232, 240',  // silver white
        '56, 189, 248',   // sky blue
        '45, 212, 168'    // emerald
      ];
      this.color = palettes[Math.floor(Math.random() * palettes.length)];
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Soft ambient breathing pulse
      this.pulseVal += this.pulseSpeed;
      this.opacity = this.baseOpacity + Math.sin(this.pulseVal) * 0.05;

      // Smooth cursor repulsion
      if (mouseX > 0 && mouseY > 0) {
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;
        if (dist < maxDist && dist > 0) {
          const force = (1 - dist / maxDist) * 1.8;
          this.x += (dx / dist) * force;
          this.y += (dy / dist) * force;
          this.opacity = Math.min(0.65, this.opacity + force * 0.25);
        }
      }

      // Seamless screen wrap (expanded bounds for larger glyphs)
      if (this.x < -140) this.x = width + 140;
      if (this.x > width + 140) this.x = -140;
      if (this.y < -50) this.y = height + 50;
      if (this.y > height + 50) this.y = -50;
    }

    draw() {
      ctx.font = `600 ${this.fontSize}px 'Noto Serif JP', 'Yu Mincho', 'Hiragino Mincho ProN', 'Inter', serif`;
      ctx.fillStyle = `rgba(${this.color}, ${Math.max(0.04, this.opacity)})`;
      ctx.fillText(this.word, this.x, this.y);
    }
  }

  // Create particles: balanced density (approx 45-65 words roaming)
  const count = Math.min(65, Math.max(30, Math.floor((width * height) / 16000)));
  for (let i = 0; i < count; i++) {
    particles.push(new JapaneseParticle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    animationId = requestAnimationFrame(animate);
  }

  // Animate only when visible in viewport
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate();
      } else {
        cancelAnimationFrame(animationId);
      }
    });
  }, { threshold: 0 });

  heroObserver.observe(canvas.parentElement);
}



/* ---------- Back to Top ---------- */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------- Contact Form ---------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#contact-name').value.trim();
    const email = form.querySelector('#contact-email').value.trim();
    const message = form.querySelector('#contact-message').value.trim();
    const msgBox = document.getElementById('form-message');

    // Validation
    if (!name || !email || !message) {
      showFormMessage(msgBox, 'Please fill in all fields.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showFormMessage(msgBox, 'Please enter a valid email address.', 'error');
      return;
    }

    // Simulate submission
    const submitBtn = form.querySelector('.form-submit');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      showFormMessage(msgBox, "Message sent! I'll get back to you soon. 🚀", 'success');
      form.reset();
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
    }, 1200);
  });

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showFormMessage(el, text, type) {
    el.textContent = text;
    el.className = 'form-message ' + type;
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, 5000);
  }
}

/* ---------- Project Card 3D Tilt ---------- */
function initProjectCardTilt() {
  const cards = document.querySelectorAll('.project-card');

  // Only on desktop
  if (window.matchMedia('(hover: none)').matches) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ---------- Extra Work Manual & Infinite Scroll Controller ---------- */
function initExtraWorkManualScroll() {
  const wrap = document.getElementById('extraMarqueeWrap');
  const track = document.getElementById('extraWorkTrack');
  const prevBtn = document.getElementById('extraPrevBtn');
  const nextBtn = document.getElementById('extraNextBtn');

  if (!wrap || !track) return;

  let currentOffset = 0;
  let targetOffset = 0;
  let isHovered = false;
  let isDragging = false;
  let startX = 0;
  let startOffset = 0;
  const autoSpeed = 0.65; // pixels per frame (smooth left-to-right drift)

  function getHalfWidth() {
    return track.scrollWidth / 2;
  }

  // Continuous animation loop
  function tick() {
    const halfWidth = getHalfWidth();

    if (halfWidth > 0) {
      if (!isHovered && !isDragging) {
        targetOffset += autoSpeed;
      }

      // Smooth dampening towards targetOffset
      if (!isDragging) {
        currentOffset += (targetOffset - currentOffset) * 0.12;
      }

      // Seamless infinite wrapping
      while (currentOffset >= halfWidth) {
        currentOffset -= halfWidth;
        targetOffset -= halfWidth;
      }
      while (currentOffset < 0) {
        currentOffset += halfWidth;
        targetOffset += halfWidth;
      }

      track.style.transform = `translate3d(${-halfWidth + currentOffset}px, 0, 0)`;
    }

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);

  // Hover detection
  wrap.addEventListener('mouseenter', () => { isHovered = true; });
  wrap.addEventListener('mouseleave', () => { 
    isHovered = false; 
    if (isDragging) {
      isDragging = false;
      wrap.classList.remove('is-dragging');
    }
  });

  // Mouse drag support
  wrap.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX;
    startOffset = currentOffset;
    wrap.classList.add('is-dragging');
    e.preventDefault();
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = (e.pageX - startX) * 1.35;
    currentOffset = startOffset + dx;
    targetOffset = currentOffset;
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      wrap.classList.remove('is-dragging');
    }
  });

  // Touch drag support for mobile/trackpads
  wrap.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      startX = e.touches[0].pageX;
      startOffset = currentOffset;
      wrap.classList.add('is-dragging');
    }
  }, { passive: true });

  wrap.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = (e.touches[0].pageX - startX) * 1.35;
    currentOffset = startOffset + dx;
    targetOffset = currentOffset;
  }, { passive: true });

  wrap.addEventListener('touchend', () => {
    if (isDragging) {
      isDragging = false;
      wrap.classList.remove('is-dragging');
    }
  });

  // Mouse wheel horizontal navigation support
  wrap.addEventListener('wheel', (e) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) > 5) {
      targetOffset -= delta * 0.85;
      e.preventDefault();
    }
  }, { passive: false });

  // Arrow navigation buttons
  const step = 348; // card width (324px) + gap (24px)
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      targetOffset -= step;
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      targetOffset += step;
    });
  }
}

/* ---------- Certificate Lightbox Modal ---------- */
function initCertificateLightbox() {
  const modal = document.getElementById('certLightboxModal');
  const modalImg = document.getElementById('certLightboxImg');
  const modalCaption = document.getElementById('certLightboxCaptionText');
  const modalLink = document.getElementById('certLightboxExternalLink');
  const closeBtn = document.getElementById('certLightboxClose');
  const triggers = document.querySelectorAll('.open-cert-modal');

  if (!modal || !modalImg) return;

  function openModal(src, caption) {
    modalImg.src = src;
    modalCaption.textContent = caption || 'Certificate / Award';
    if (modalLink) modalLink.href = src;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (!modal.classList.contains('active')) {
        modalImg.src = '';
      }
    }, 300);
  }

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const certSrc = trigger.getAttribute('data-cert');
      const caption = trigger.getAttribute('data-caption');
      if (certSrc) {
        openModal(certSrc, caption);
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ---------- Number Scrolling Odometer Effect ---------- */
function initMetricsCounter() {
  const metricsRow = document.getElementById('aboutMetricsRow');
  if (!metricsRow) return;

  const metricValues = metricsRow.querySelectorAll('.about-metric-value[data-target]');
  if (!metricValues.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = [];

  metricValues.forEach((el) => {
    const rawTarget = el.getAttribute('data-target') || '0';
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const digits = rawTarget.split('');

    // Clear and build odometer reels
    el.innerHTML = '';

    // Prefix (e.g. 'N')
    if (prefix) {
      const pSpan = document.createElement('span');
      pSpan.className = 'num-reel-affix';
      pSpan.textContent = prefix;
      el.appendChild(pSpan);
    }

    const colTracks = [];

    // Build rolling reel column for each digit
    digits.forEach((d) => {
      const digitNum = parseInt(d, 10);
      const col = document.createElement('span');
      col.className = 'num-reel-col';

      const track = document.createElement('span');
      track.className = 'num-reel-track';

      // 2 complete cycles (0-9, 0-9) so the numbers physically scroll past
      const totalItems = 20;
      for (let cycle = 0; cycle < 2; cycle++) {
        for (let n = 0; n <= 9; n++) {
          const item = document.createElement('span');
          item.className = 'num-reel-digit';
          item.textContent = n;
          track.appendChild(item);
        }
      }

      col.appendChild(track);
      el.appendChild(col);

      // Target position in the second cycle to ensure smooth vertical scroll
      const targetIndex = !isNaN(digitNum) ? 10 + digitNum : 0;
      const targetPercent = (targetIndex / totalItems) * 100;

      colTracks.push({
        track,
        targetPercent
      });
    });

    // Suffix (e.g. '+', '%')
    if (suffix) {
      const sSpan = document.createElement('span');
      sSpan.className = 'num-reel-affix';
      sSpan.textContent = suffix;
      el.appendChild(sSpan);
    }

    items.push({
      el,
      colTracks
    });
  });

  let hasAnimated = false;

  function runRollAnimation() {
    items.forEach((item, mIdx) => {
      const metricDelay = mIdx * 130;
      item.colTracks.forEach((col, dIdx) => {
        const colDelay = metricDelay + (dIdx * 90);
        const duration = prefersReducedMotion ? 0 : (1.4 + (dIdx * 0.35));
        
        col.track.style.transition = prefersReducedMotion 
          ? 'none' 
          : `transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${colDelay}ms`;
        col.track.style.transform = `translateY(-${col.targetPercent}%)`;
      });
    });
  }

  // Trigger on scroll via IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        requestAnimationFrame(() => {
          setTimeout(runRollAnimation, 80);
        });
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -30px 0px'
  });

  observer.observe(metricsRow);

  // Interactive replay on clicking any metric item
  const metricCards = metricsRow.querySelectorAll('.about-metric');
  metricCards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      const targetItem = items[idx];
      if (!targetItem) return;

      targetItem.colTracks.forEach((col) => {
        col.track.style.transition = 'transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)';
        col.track.style.transform = 'translateY(0%)';
      });

      setTimeout(() => {
        targetItem.colTracks.forEach((col, dIdx) => {
          const duration = 1.35 + (dIdx * 0.3);
          col.track.style.transition = `transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${dIdx * 80}ms`;
          col.track.style.transform = `translateY(-${col.targetPercent}%)`;
        });
      }, 300);
    });
  });
}

/* ---------- Hero Name Cursor Hover EN to JP Letter-by-Letter Scroll ---------- */
function initHeroNameScroll() {
  const container = document.getElementById('heroNameInteractive');
  if (!container) return;

  const letters = container.querySelectorAll('.letter-flip');
  if (!letters.length) return;

  let timers = [];
  let isJP = false;

  function clearTimers() {
    timers.forEach(t => clearTimeout(t));
    timers = [];
  }

  function rollToJapanese() {
    clearTimers();
    isJP = true;
    letters.forEach((letter, idx) => {
      const t = setTimeout(() => {
        letter.classList.add('to-jp');
      }, idx * 55);
      timers.push(t);
    });
  }

  function rollToEnglish() {
    clearTimers();
    isJP = false;
    const total = letters.length;
    letters.forEach((letter, idx) => {
      const t = setTimeout(() => {
        letter.classList.remove('to-jp');
      }, (total - 1 - idx) * 45);
      timers.push(t);
    });
  }

  // When cursor goes to name: each letter scrolls from English to Japanese
  container.addEventListener('mouseenter', rollToJapanese);

  // When cursor leaves: each letter scrolls back from Japanese to English
  container.addEventListener('mouseleave', rollToEnglish);

  // Click/tap toggle for touch devices
  container.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isJP) {
      rollToEnglish();
    } else {
      rollToJapanese();
    }
  });
}





/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
/*          CAREER TIMELINE SCROLL ANIMATION          */
/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
(function initTimelineAnimation() {
  const timelineItems = document.querySelectorAll('.timeline-item[data-animate]');
  if (!timelineItems.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  timelineItems.forEach((item) => observer.observe(item));
})();
