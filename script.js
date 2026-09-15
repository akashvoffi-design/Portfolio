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
  initDepthCarousel();
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

/* ==================== 3D DEPTH CAROUSEL CONTROLLER ==================== */
function initDepthCarousel() {
  const rootEl = document.getElementById('projectsDepthCarousel');
  const stageEl = document.getElementById('depthCarouselStage');
  const prevBtn = document.getElementById('depthPrevBtn');
  const nextBtn = document.getElementById('depthNextBtn');
  const dotsEl = document.getElementById('depthDots');

  if (!rootEl || !stageEl) return;

  const DEPTH_PROJECT_ITEMS = [
    {
      image: 'assets/projects/project-mindpulse.jpg',
      alt: 'MindPulse — AI Mental Wellness Platform',
      num: '01 / 06',
      name: 'MindPulse',
      badge: '✓ Completed',
      badgeClass: 'done',
      category: 'Full-Stack AI & Mental Health',
      desc: 'AI mental wellness platform with real-time facial emotion recognition using VGG19 CNN fine-tuned on FER2013, Gemini voice companion, mood history dashboards, and Supabase persistence.',
      metrics: [
        { val: '84%', lbl: 'Accuracy' },
        { val: 'VGG19', lbl: 'Model' },
        { val: 'Solo', lbl: 'Full-Stack' }
      ],
      tags: ['React 18', 'Flask', 'Supabase', 'VGG19', 'Gemini API']
    },
    {
      image: 'assets/projects/project-shadowhunt.jpg',
      alt: 'ShadowHunt — Deepfake Detection System',
      num: '02 / 06',
      name: 'ShadowHunt',
      badge: '✓ Completed',
      badgeClass: 'done',
      category: 'Computer Vision & Blockchain',
      desc: 'Multi-modal deepfake detection supporting image, video, and audio inputs with 91%+ accuracy and Ethereum/IPFS blockchain watermarking for tamper-evident verification.',
      metrics: [
        { val: '91%+', lbl: 'Detection' },
        { val: 'Multi-Modal', lbl: 'Inputs' },
        { val: 'Blockchain', lbl: 'Verified' }
      ],
      tags: ['Python', 'TensorFlow', 'OpenCV', 'Ethereum', 'IPFS']
    },
    {
      image: 'assets/projects/project-sora.jpg',
      alt: 'SORA AI Agent — Voice Desktop Assistant',
      num: '03 / 06',
      name: 'SORA AI Agent',
      badge: '✓ Completed',
      badgeClass: 'done',
      category: 'Agentic AI & Multimodal',
      desc: 'Voice-controlled Windows AI with real-time speech understanding, screen and camera analysis, and multi-step task automation using Claude & Gemini APIs with LiveKit and Whisper.',
      metrics: [
        { val: 'Real-Time', lbl: 'Voice' },
        { val: 'Multi-Modal', lbl: 'Analysis' },
        { val: 'LiveKit', lbl: 'Audio' }
      ],
      tags: ['Python', 'Claude API', 'Gemini API', 'LiveKit', 'Whisper']
    },
    {
      image: 'assets/projects/project-skin-disease.jpg',
      alt: 'Skin Disease Classification — Dermoscopic Vision',
      num: '04 / 06',
      name: 'Skin Disease Classification',
      badge: '✓ Completed',
      badgeClass: 'done',
      category: 'Medical AI & Computer Vision',
      desc: 'Team project at Cybernaut Edtech. Led data pipeline and preprocessing — EDA, class balance analysis, and data augmentation on HAM10000 dermoscopic images using TensorFlow and Keras.',
      metrics: [
        { val: 'HAM10000', lbl: 'Dataset' },
        { val: 'Team Lead', lbl: 'Data Pipeline' },
        { val: 'CNN', lbl: 'Architecture' }
      ],
      tags: ['TensorFlow', 'Keras', 'CNN', 'EDA', 'Python']
    },
    {
      image: 'assets/projects/project-agentic-rag.jpg',
      alt: 'Agentic RAG — Autonomous Retrieval Generation',
      num: '05 / 06',
      name: 'Agentic RAG',
      badge: '✓ Production',
      badgeClass: 'done',
      category: 'Generative AI & LLM Systems',
      desc: 'Autonomous RAG pipeline powered by LangChain AgentExecutor, ChromaDB vector embeddings, GPT-4o reasoning, and a high-performance FastAPI backend with React 18 SSE streaming.',
      metrics: [
        { val: 'ChromaDB', lbl: 'Vector Search' },
        { val: 'LangChain', lbl: 'AgentExecutor' },
        { val: 'FastAPI', lbl: 'Streaming' }
      ],
      tags: ['FastAPI', 'LangChain', 'ChromaDB', 'GPT-4o', 'SSE']
    },
    {
      image: 'assets/projects/project-smart-cart.jpg',
      alt: 'Smart Shopping Cart — Autonomous Checkout',
      num: '06 / 06',
      name: 'Smart Shopping Cart',
      badge: '◉ Ongoing',
      badgeClass: 'wip',
      category: 'Edge AI & Embedded IoT',
      desc: 'Automated retail checkout system with real-time YOLOv8 object detection, HX711 IoT weight verification, and frictionless Razorpay/UPI instant autopay integration.',
      metrics: [
        { val: 'YOLOv8', lbl: 'Edge Detection' },
        { val: 'HX711', lbl: 'IoT Sensors' },
        { val: 'Razorpay', lbl: 'Autopay' }
      ],
      tags: ['YOLOv8', 'IoT', 'Razorpay', 'Computer Vision']
    }
  ];

  // Configuration values based directly on user usage code
  const depth = 220;
  const spread = 90;
  const tilt = 22;
  const tiltDirection = 'right';
  const perspective = 1400;
  const visibleCards = 4;
  const falloff = 0.2;
  const blur = 6;
  const autoplay = false;
  const loop = true;
  const cardWidth = 300;
  const cardHeight = 380;
  const radius = 18;
  const tint = '#05060a';
  const duration = 700;
  const ease = 'power3.out';
  const autoplayDelay = 3200;

  const count = DEPTH_PROJECT_ITEMS.length;
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

  let currentPos = 0;
  let focusIndex = 0;
  let activeIndex = 0;
  let currentScale = 1;
  let tween = null;
  let dragState = null;
  let wheelTimer = null;
  let autoTimer = null;
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Build card DOM elements
  stageEl.innerHTML = '';
  if (dotsEl) dotsEl.innerHTML = '';

  const cardEls = [];
  const overlayEls = [];
  const dotEls = [];

  DEPTH_PROJECT_ITEMS.forEach((item, i) => {
    // Card element
    const card = document.createElement('div');
    card.className = 'depth-carousel__card';
    card.style.width = `${cardWidth}px`;
    card.style.height = `${cardHeight}px`;
    card.style.borderRadius = `${radius}px`;
    card.setAttribute('role', 'group');
    card.setAttribute('aria-roledescription', 'slide');
    card.setAttribute('aria-label', `${i + 1} of ${count}`);
    card.setAttribute('aria-hidden', i === 0 ? 'false' : 'true');

    card.innerHTML = `
      <img class="depth-carousel__img" src="${item.image}" alt="${item.alt}" draggable="false" />
      <span class="depth-carousel__tint" style="background: ${tint};"></span>
      <div class="depth-carousel__card-overlay">
        <div class="depth-card-top-row">
          <span class="depth-card-badge ${item.badgeClass}">${item.badge}</span>
          <span class="depth-card-index">${item.num}</span>
        </div>
        <div class="depth-card-bottom">
          <h4 class="depth-card-title">${item.name}</h4>
          <span class="depth-card-tagline">✦ ${item.category}</span>
        </div>
      </div>
    `;

    stageEl.appendChild(card);
    cardEls.push(card);
    overlayEls.push(card.querySelector('.depth-carousel__tint'));

    // Dot indicator
    if (dotsEl) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `depth-carousel__dot${i === 0 ? ' is-active' : ''}`;
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dotsEl.appendChild(dot);
      dotEls.push(dot);

      dot.addEventListener('click', () => setFocus(i, true));
    }

    // Card click
    card.addEventListener('click', () => {
      if (dragState && dragState.moved) return;
      setFocus(i, true);
    });
  });

  // 3D Spatial Layout Calculation
  function layout(pos) {
    const n = count;
    if (!n) return;
    const dir = tiltDirection === 'left' ? -1 : 1;
    const sc = currentScale;

    for (let i = 0; i < n; i++) {
      const el = cardEls[i];
      if (!el) continue;

      let d = i - pos;
      if (loop && n > 1) {
        d = ((d % n) + n) % n;
        if (d > n / 2) d -= n;
      }

      const back = Math.max(0, d);
      const az = Math.abs(d);
      const shown = az <= visibleCards + 0.5;

      const tz = -depth * d;
      const tx = dir * spread * d;
      const ry = dir * tilt * clamp(d, 0, 1);

      let opacity = d < 0 ? Math.max(0, 1 + d) : 1;
      if (!shown) opacity = 0;

      const brightness = Math.max(0.15, 1 - back * falloff);
      const blurPx = blur > 0 ? Math.min(blur, (back / Math.max(1, visibleCards)) * blur) : 0;
      const zi = Math.round(2000 - d * 20);

      el.style.transform = `translate(-50%, -50%) scale(${sc}) translateX(${tx.toFixed(2)}px) translateZ(${tz.toFixed(2)}px) rotateY(${ry.toFixed(3)}deg)`;
      el.style.opacity = opacity.toFixed(3);
      el.style.filter = `brightness(${brightness.toFixed(3)}) blur(${blurPx.toFixed(2)}px)`;
      el.style.zIndex = String(zi);
      el.style.pointerEvents = shown && opacity > 0.05 ? 'auto' : 'none';

      const ov = overlayEls[i];
      if (ov) ov.style.opacity = clamp(back * falloff * 1.25, 0, 0.86).toFixed(3);
    }
  }

  // Update synchronized active project showcase panel
  function updateActivePanel(idx) {
    const item = DEPTH_PROJECT_ITEMS[idx];
    if (!item) return;

    const numEl = document.getElementById('depthActiveNum');
    const nameEl = document.getElementById('depthActiveName');
    const badgeEl = document.getElementById('depthActiveBadge');
    const descEl = document.getElementById('depthActiveDesc');
    const metricsEl = document.getElementById('depthActiveMetrics');
    const tagsEl = document.getElementById('depthActiveTags');

    if (numEl) numEl.textContent = item.num;
    if (nameEl) nameEl.textContent = item.name;
    if (badgeEl) {
      badgeEl.textContent = item.badge;
      badgeEl.className = `depth-active-badge ${item.badgeClass}`;
    }
    if (descEl) descEl.textContent = item.desc;
    if (metricsEl && item.metrics) {
      metricsEl.innerHTML = item.metrics.map(m => `
        <div class="depth-active-metric-item">
          <span class="depth-active-metric-val">${m.val}</span>
          <span class="depth-active-metric-lbl">${m.lbl}</span>
        </div>
      `).join('');
    }
    if (tagsEl && item.tags) {
      tagsEl.innerHTML = item.tags.map(t => `<span class="depth-active-chip">${t}</span>`).join('');
    }
  }

  function notify(idx) {
    activeIndex = idx;
    dotEls.forEach((dot, i) => {
      if (i === idx) {
        dot.classList.add('is-active');
        dot.setAttribute('aria-selected', 'true');
      } else {
        dot.classList.remove('is-active');
        dot.setAttribute('aria-selected', 'false');
      }
    });

    cardEls.forEach((card, i) => {
      card.setAttribute('aria-hidden', i !== idx ? 'true' : 'false');
    });

    updateActivePanel(idx);
  }

  // Tweening transition using GSAP with fallback
  function tweenTo(target, animate) {
    if (tween) tween.kill();
    const proxy = { p: currentPos };
    const dur = animate && !reducedMotion ? duration / 1000 : 0;

    if (window.gsap) {
      tween = gsap.to(proxy, {
        p: target,
        duration: dur,
        ease: ease,
        onUpdate: () => {
          currentPos = proxy.p;
          layout(proxy.p);
        },
        onComplete: () => {
          const n = count;
          if (n > 0) currentPos = ((currentPos % n) + n) % n;
          layout(currentPos);
        }
      });
    } else {
      currentPos = target;
      if (count > 0) currentPos = ((currentPos % count) + count) % count;
      layout(currentPos);
    }
  }

  function setFocus(rawIndex, animate = true) {
    const n = count;
    if (!n) return;
    const idx = loop ? ((rawIndex % n) + n) % n : clamp(rawIndex, 0, n - 1);
    let delta = idx - currentPos;
    if (loop && n > 1) {
      delta = ((delta % n) + n) % n;
      if (delta > n / 2) delta -= n;
    }
    tweenTo(currentPos + delta, animate);
    if (idx !== focusIndex) {
      focusIndex = idx;
      notify(idx);
    }
  }

  function navigateBy(step) {
    setFocus(focusIndex + step, true);
  }

  // ResizeObserver for dynamic scaling
  const ro = new ResizeObserver(entries => {
    if (!entries || !entries[0]) return;
    const w = entries[0].contentRect.width;
    const needed = cardWidth + Math.abs(spread) * 2 + 120;
    currentScale = clamp(w / needed, 0.38, 1);
    layout(currentPos);
  });
  ro.observe(rootEl);

  // Mouse wheel scroll support
  rootEl.addEventListener('wheel', e => {
    if (count < 2) return;
    e.preventDefault();
    if (tween) tween.kill();
    const raw = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    const delta = e.deltaMode === 1 ? raw * 24 : raw;
    const step = clamp(delta / (cardWidth * 0.9), -0.6, 0.6);
    currentPos += step;
    layout(currentPos);
    if (wheelTimer) clearTimeout(wheelTimer);
    wheelTimer = setTimeout(() => setFocus(Math.round(currentPos), true), 130);
  }, { passive: false });

  // Pointer drag & touch flick
  rootEl.addEventListener('pointerdown', e => {
    if (count < 2) return;
    if (tween) tween.kill();
    dragState = {
      x: e.clientX,
      startPos: currentPos,
      lastX: e.clientX,
      lastT: performance.now(),
      v: 0,
      moved: false,
      id: e.pointerId
    };
  });

  rootEl.addEventListener('pointermove', e => {
    if (!dragState) return;
    const stepPx = Math.max(cardWidth * 0.55 * currentScale, 40);
    const dx = e.clientX - dragState.x;
    if (!dragState.moved && Math.abs(dx) > 4) {
      dragState.moved = true;
      try { rootEl.setPointerCapture(dragState.id); } catch (_) {}
    }
    if (!dragState.moved) return;
    const now = performance.now();
    const dt = Math.max(now - dragState.lastT, 1);
    dragState.v = (e.clientX - dragState.lastX) / dt;
    dragState.lastX = e.clientX;
    dragState.lastT = now;
    currentPos = dragState.startPos - dx / stepPx;
    layout(currentPos);
  });

  const onPointerEnd = () => {
    if (!dragState) return;
    const ds = dragState;
    dragState = null;
    if (!ds.moved) return;
    const stepPx = Math.max(cardWidth * 0.55 * currentScale, 40);
    const projected = currentPos - (ds.v * 180) / stepPx;
    setFocus(Math.round(projected), true);
  };

  rootEl.addEventListener('pointerup', onPointerEnd);
  rootEl.addEventListener('pointercancel', onPointerEnd);

  // Keyboard navigation
  rootEl.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      navigateBy(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      navigateBy(1);
    }
  });

  // Arrow controls
  if (prevBtn) prevBtn.addEventListener('click', () => navigateBy(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => navigateBy(1));

  // Autoplay support if enabled
  if (autoplay && !reducedMotion && count > 1) {
    let isHovered = false;
    const startAuto = () => {
      if (autoTimer) clearInterval(autoTimer);
      autoTimer = setInterval(() => {
        if (!isHovered) navigateBy(1);
      }, Math.max(autoplayDelay, 600));
    };
    rootEl.addEventListener('mouseenter', () => { isHovered = true; });
    rootEl.addEventListener('mouseleave', () => { isHovered = false; });
    startAuto();
  }

  // Initial layout & notify
  layout(0);
  notify(0);
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


/* ==========================================================================
   DOT FIELD INTERACTIVE CANVAS ANIMATION (React-Bits DotField Port)
   ========================================================================== */
function initDotField(container, options = {}) {
  if (!container) return;

  const config = {
    dotRadius: options.dotRadius ?? 1.5,
    dotSpacing: options.dotSpacing ?? 14,
    cursorRadius: options.cursorRadius ?? 500,
    cursorForce: options.cursorForce ?? 0.1,
    bulgeOnly: options.bulgeOnly !== undefined ? options.bulgeOnly : true,
    bulgeStrength: options.bulgeStrength ?? 67,
    glowRadius: options.glowRadius ?? 0,
    cursorGlow: options.cursorGlow ?? false,
    sparkle: options.sparkle ?? false,
    waveAmplitude: options.waveAmplitude ?? 0,
    gradientFrom: options.gradientFrom || '#A855F7',
    gradientTo: options.gradientTo || '#B497CF',
    glowColor: options.glowColor || 'transparent',
  };

  const TWO_PI = Math.PI * 2;
  const canvas = container.querySelector('canvas') || document.createElement('canvas');
  if (!canvas.parentElement) container.appendChild(canvas);

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  // Only create SVG Glow filter overlay if cursorGlow is explicitly enabled with radius > 0
  let svg = container.querySelector('svg');
  let glowCircle = null;

  if (config.cursorGlow && config.glowRadius > 0) {
    const glowId = 'dot-field-glow-' + Math.random().toString(36).slice(2, 9);
    if (!svg) {
      svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'dot-field-svg');
      svg.style.cssText = 'position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;';

      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      const radGrad = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
      radGrad.setAttribute('id', glowId);

      const stop0 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop0.setAttribute('offset', '0%');
      stop0.setAttribute('stop-color', config.glowColor);

      const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop1.setAttribute('offset', '100%');
      stop1.setAttribute('stop-color', 'transparent');

      radGrad.appendChild(stop0);
      radGrad.appendChild(stop1);
      defs.appendChild(radGrad);
      svg.appendChild(defs);

      glowCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      glowCircle.setAttribute('cx', '-9999');
      glowCircle.setAttribute('cy', '-9999');
      glowCircle.setAttribute('r', String(config.glowRadius));
      glowCircle.setAttribute('fill', `url(#${glowId})`);
      glowCircle.style.cssText = 'opacity: 0; will-change: opacity;';
      svg.appendChild(glowCircle);

      container.appendChild(svg);
    } else {
      glowCircle = svg.querySelector('circle');
    }
  } else if (svg) {
    svg.remove();
  }

  let dotsList = [];
  let mouse = { x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 };
  let size = { w: 0, h: 0, offsetX: 0, offsetY: 0 };
  let glowOpacity = 0;
  let engagement = 0;
  let rafId = null;
  let isVisible = true;
  let frameCount = 0;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  function buildDots(w, h) {
    const step = config.dotRadius + config.dotSpacing;
    const cols = Math.floor(w / step);
    const rows = Math.floor(h / step);
    const padX = (w % step) / 2;
    const padY = (h % step) / 2;
    const dots = new Array(rows * cols);
    let idx = 0;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const ax = padX + col * step + step / 2;
        const ay = padY + row * step + step / 2;
        dots[idx++] = { ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay };
      }
    }
    dotsList = dots;
  }

  function doResize() {
    const rect = container.getBoundingClientRect();
    const w = rect.width || container.offsetWidth || window.innerWidth;
    const h = rect.height || container.offsetHeight || window.innerHeight;

    if (w <= 0 || h <= 0) return;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    size.w = w;
    size.h = h;
    size.offsetX = rect.left + window.scrollX;
    size.offsetY = rect.top + window.scrollY;

    buildDots(w, h);
  }

  let resizeTimer;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(doResize, 100);
  }

  function onMouseMove(e) {
    const rect = container.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    if (mx >= -config.cursorRadius && mx <= rect.width + config.cursorRadius &&
        my >= -config.cursorRadius && my <= rect.height + config.cursorRadius) {
      mouse.x = mx;
      mouse.y = my;
    } else {
      mouse.x = -9999;
      mouse.y = -9999;
    }
  }

  function updateMouseSpeed() {
    const dx = mouse.prevX - mouse.x;
    const dy = mouse.prevY - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    mouse.speed += (dist - mouse.speed) * 0.5;
    if (mouse.speed < 0.001) mouse.speed = 0;
    mouse.prevX = mouse.x;
    mouse.prevY = mouse.y;
  }

  setInterval(updateMouseSpeed, 20);

  function tick() {
    if (!isVisible) {
      rafId = requestAnimationFrame(tick);
      return;
    }

    frameCount++;
    const { w, h } = size;
    if (w === 0 || h === 0 || !dotsList.length) {
      rafId = requestAnimationFrame(tick);
      return;
    }

    const len = dotsList.length;
    const t = frameCount * 0.02;

    const isInside = mouse.x >= 0 && mouse.x <= w && mouse.y >= 0 && mouse.y <= h;
    const targetEngagement = isInside ? Math.min(Math.max(mouse.speed / 4, 0.42), 1) : Math.min(mouse.speed / 5, 1);
    
    engagement += (targetEngagement - engagement) * 0.06;
    if (engagement < 0.001) engagement = 0;
    const eng = engagement;

    glowOpacity += (eng - glowOpacity) * 0.08;

    if (glowCircle) {
      glowCircle.setAttribute('cx', String(mouse.x));
      glowCircle.setAttribute('cy', String(mouse.y));
      glowCircle.style.opacity = String(glowOpacity);
    }

    ctx.clearRect(0, 0, w, h);

    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, config.gradientFrom);
    grad.addColorStop(1, config.gradientTo);
    ctx.fillStyle = grad;

    const cr = config.cursorRadius;
    const crSq = cr * cr;
    const rad = config.dotRadius / 2;
    const isBulge = config.bulgeOnly;

    ctx.beginPath();

    for (let i = 0; i < len; i++) {
      const d = dotsList[i];
      const dx = mouse.x - d.ax;
      const dy = mouse.y - d.ay;
      const distSq = dx * dx + dy * dy;

      if (distSq < crSq && eng > 0.01) {
        const dist = Math.sqrt(distSq);
        if (isBulge) {
          const tVal = 1 - dist / cr;
          const push = tVal * tVal * config.bulgeStrength * eng;
          const angle = Math.atan2(dy, dx);
          d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.15;
          d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.15;
        } else {
          const angle = Math.atan2(dy, dx);
          const move = (500 / dist) * (mouse.speed * config.cursorForce);
          d.vx += Math.cos(angle) * -move;
          d.vy += Math.sin(angle) * -move;
        }
      } else if (isBulge) {
        d.sx += (d.ax - d.sx) * 0.1;
        d.sy += (d.ay - d.sy) * 0.1;
      }

      if (!isBulge) {
        d.vx *= 0.9;
        d.vy *= 0.9;
        d.x = d.ax + d.vx;
        d.y = d.ay + d.vy;
        d.sx += (d.x - d.sx) * 0.1;
        d.sy += (d.y - d.sy) * 0.1;
      }

      let drawX = d.sx;
      let drawY = d.sy;

      if (config.waveAmplitude > 0) {
        drawY += Math.sin(d.ax * 0.03 + t) * config.waveAmplitude;
        drawX += Math.cos(d.ay * 0.03 + t * 0.7) * config.waveAmplitude * 0.5;
      }

      if (config.sparkle) {
        const hash = ((i * 2654435761) ^ (frameCount >> 3)) >>> 0;
        if ((hash % 100) < 3) {
          ctx.moveTo(drawX + rad * 1.8, drawY);
          ctx.arc(drawX, drawY, rad * 1.8, 0, TWO_PI);
        } else {
          ctx.moveTo(drawX + rad, drawY);
          ctx.arc(drawX, drawY, rad, 0, TWO_PI);
        }
      } else {
        ctx.moveTo(drawX + rad, drawY);
        ctx.arc(drawX, drawY, rad, 0, TWO_PI);
      }
    }

    ctx.fill();

    rafId = requestAnimationFrame(tick);
  }

  // Optimize performance: pause rendering when scrolled out of view
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.02 });
    observer.observe(container);
  }

  doResize();
  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener('mousemove', onMouseMove, { passive: true });
  rafId = requestAnimationFrame(tick);
}

// Initialize DotField instances (with zero cursor glow)
function initAllDotFields() {
  // 1. Where I've worked section (Experience)
  const expContainer = document.getElementById('experienceDotField');
  if (expContainer) {
    initDotField(expContainer, {
      dotRadius: 1.5,
      dotSpacing: 14,
      bulgeStrength: 67,
      glowRadius: 0,
      cursorGlow: false,
      cursorRadius: 500,
      cursorForce: 0.1,
      bulgeOnly: true,
      sparkle: false,
      waveAmplitude: 0,
      gradientFrom: 'rgba(168, 85, 247, 0.4)',
      gradientTo: 'rgba(180, 151, 207, 0.28)',
      glowColor: 'transparent',
    });
  }

  // 2. First Page (Hero) section
  const heroContainer = document.getElementById('heroDotField');
  if (heroContainer) {
    initDotField(heroContainer, {
      dotRadius: 1.5,
      dotSpacing: 14,
      bulgeStrength: 67,
      glowRadius: 0,
      cursorGlow: false,
      cursorRadius: 500,
      cursorForce: 0.1,
      bulgeOnly: true,
      sparkle: false,
      waveAmplitude: 0,
      gradientFrom: 'rgba(168, 85, 247, 0.4)',
      gradientTo: 'rgba(180, 151, 207, 0.28)',
      glowColor: 'transparent',
    });
  }
}


/* ==========================================================================
   3D PHYSICS LANYARD ID CARD ANIMATION (Verlet Rope & Pendulum Engine)
   ========================================================================== */
function initLanyard() {
  const container = document.getElementById('lanyardContainer');
  const cardWrap = document.getElementById('lanyardCardWrap');
  const strapPath = document.getElementById('lanyardStrapPath');
  if (!container || !cardWrap || !strapPath) return;

  // Physics parameters
  const gravity = 1800; // px/s^2
  const damping = 0.965; // realistic air/rope damping
  const segmentLength = 12; // shortened rest length to place card higher up
  const numSegments = 4; // 5 nodes total: N0 (pinned) -> N1 -> N2 -> N3 -> N4 (clip/card)
  const dt = 1 / 60;

  // Anchor point (top center of container)
  let anchorX = 160;
  let anchorY = 0;

  // Initialize Verlet nodes
  const nodes = [];
  for (let i = 0; i <= numSegments; i++) {
    const y = anchorY + i * segmentLength;
    nodes.push({
      x: anchorX,
      y: y,
      oldX: anchorX,
      oldY: y,
    });
  }

  // Card dynamics & state
  let cardRotZ = 0;
  let cardRotY = 0;
  let cardRotX = 0;
  let isDragging = false;
  let hasInteracted = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  let targetPointerX = anchorX;
  let targetPointerY = anchorY + numSegments * segmentLength;
  let isVisible = true;
  let rafId = null;

  // Update anchor if window resized
  function updateAnchor() {
    const w = container.offsetWidth || 320;
    anchorX = Math.round(w * 0.5);
    nodes[0].x = anchorX;
    nodes[0].y = anchorY;
  }
  updateAnchor();
  window.addEventListener('resize', updateAnchor, { passive: true });

  // Pointer dragging tracking
  cardWrap.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    isDragging = true;
    hasInteracted = true;
    cardWrap.classList.add('is-dragging', 'has-interacted');
    cardWrap.setPointerCapture(e.pointerId);

    const rect = container.getBoundingClientRect();
    const endNode = nodes[nodes.length - 1];
    dragOffsetX = (e.clientX - rect.left) - endNode.x;
    dragOffsetY = (e.clientY - rect.top) - endNode.y;
    targetPointerX = (e.clientX - rect.left) - dragOffsetX;
    targetPointerY = (e.clientY - rect.top) - dragOffsetY;
  });

  window.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const rect = container.getBoundingClientRect();
    targetPointerX = (e.clientX - rect.left) - dragOffsetX;
    targetPointerY = (e.clientY - rect.top) - dragOffsetY;
  }, { passive: true });

  const onPointerRelease = (e) => {
    if (isDragging) {
      isDragging = false;
      cardWrap.classList.remove('is-dragging');
      try { cardWrap.releasePointerCapture(e.pointerId); } catch (_) {}
    }
  };

  window.addEventListener('pointerup', onPointerRelease);
  window.addEventListener('pointercancel', onPointerRelease);

  // Gentle 3D magnetic hover tilt when not dragging
  container.addEventListener('pointermove', (e) => {
    if (isDragging) return;
    const rect = container.getBoundingClientRect();
    const rx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const ry = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    cardRotY += (rx * 12 - cardRotY) * 0.1;
    cardRotX += (-ry * 10 - cardRotX) * 0.1;
  }, { passive: true });

  container.addEventListener('pointerleave', () => {
    if (!isDragging) {
      cardRotY += (0 - cardRotY) * 0.08;
      cardRotX += (0 - cardRotX) * 0.08;
    }
  });

  let time = 0;

  function tick() {
    if (!isVisible) {
      rafId = requestAnimationFrame(tick);
      return;
    }

    time += dt;
    const lastIdx = nodes.length - 1;
    const endNode = nodes[lastIdx];

    // Dragging physics
    if (isDragging) {
      const vx = (targetPointerX - endNode.x) * 0.45;
      const vy = (targetPointerY - endNode.y) * 0.45;
      endNode.oldX = endNode.x;
      endNode.oldY = endNode.y;
      endNode.x += vx;
      endNode.y += vy;

      // 3D tilt follows drag speed
      const targetTiltY = Math.max(-32, Math.min(32, vx * 1.8));
      const targetTiltX = Math.max(-24, Math.min(24, -vy * 1.5));
      cardRotY += (targetTiltY - cardRotY) * 0.2;
      cardRotX += (targetTiltX - cardRotX) * 0.2;
    } else {
      // Verlet integration for internal rope nodes + end node
      for (let i = 1; i <= lastIdx; i++) {
        const n = nodes[i];
        const vx = (n.x - n.oldX) * damping;
        const vy = (n.y - n.oldY) * damping;
        n.oldX = n.x;
        n.oldY = n.y;
        n.x += vx;
        n.y += vy + gravity * (dt * dt);
      }

      // Subtle ambient air sway
      if (!hasInteracted) {
        nodes[lastIdx].x += Math.sin(time * 1.2) * 0.03;
      }
    }

    // Distance constraints relaxation passes (8 passes for sturdy, non-stretching rope)
    for (let pass = 0; pass < 8; pass++) {
      // Node 0 is pinned to the anchor
      nodes[0].x = anchorX;
      nodes[0].y = anchorY;

      for (let i = 0; i < lastIdx; i++) {
        const pA = nodes[i];
        const pB = nodes[i + 1];
        const dx = pB.x - pA.x;
        const dy = pB.y - pA.y;
        const dist = Math.hypot(dx, dy) || 0.001;
        const diff = (dist - segmentLength) / dist;

        if (i === 0) {
          pB.x -= dx * diff;
          pB.y -= dy * diff;
        } else if (i + 1 === lastIdx && isDragging) {
          pA.x += dx * diff;
          pA.y += dy * diff;
        } else {
          pA.x += dx * diff * 0.5;
          pA.y += dy * diff * 0.5;
          pB.x -= dx * diff * 0.5;
          pB.y -= dy * diff * 0.5;
        }
      }
    }

    // Calculate rotation of the card based on the angle of the last rope segment
    const pPrev = nodes[lastIdx - 1];
    const angleRad = Math.atan2(endNode.x - pPrev.x, endNode.y - pPrev.y);
    const targetRotZ = (angleRad * (180 / Math.PI));
    
    // Natural angular inertia and spring response
    cardRotZ += (targetRotZ - cardRotZ) * (isDragging ? 0.25 : 0.15);

    // Natural tilt damping back to upright in rest
    if (!isDragging) {
      const vx = endNode.x - endNode.oldX;
      const vy = endNode.y - endNode.oldY;
      const targetRotY = Math.max(-28, Math.min(28, vx * 1.2));
      const targetRotX = Math.max(-20, Math.min(20, -vy * 1.0));
      cardRotY += (targetRotY - cardRotY) * 0.1;
      cardRotX += (targetRotX - cardRotX) * 0.1;
    }

    // Build smooth SVG Catmull-Rom/Bezier curve for the lanyard strap
    let pathD = `M ${nodes[0].x.toFixed(1)} ${nodes[0].y.toFixed(1)}`;
    for (let i = 0; i < lastIdx; i++) {
      const pCurrent = nodes[i];
      const pNext = nodes[i + 1];
      const mx = (pCurrent.x + pNext.x) / 2;
      const my = (pCurrent.y + pNext.y) / 2;
      pathD += ` Q ${pCurrent.x.toFixed(1)} ${pCurrent.y.toFixed(1)}, ${mx.toFixed(1)} ${my.toFixed(1)}`;
    }
    pathD += ` L ${endNode.x.toFixed(1)} ${endNode.y.toFixed(1)}`;
    strapPath.setAttribute('d', pathD);

    // Transform the 3D card wrap dynamically centered on the rope end node
    const cardHalfWidth = (cardWrap.offsetWidth ? cardWrap.offsetWidth * 0.5 : 146);
    cardWrap.style.transform = `translate3d(${(endNode.x - cardHalfWidth).toFixed(1)}px, ${endNode.y.toFixed(1)}px, 0px) rotateZ(${cardRotZ.toFixed(2)}deg) rotateY(${cardRotY.toFixed(2)}deg) rotateX(${cardRotX.toFixed(2)}deg)`;

    rafId = requestAnimationFrame(tick);
  }

  // IntersectionObserver to pause rendering when offscreen
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });
    observer.observe(container);
  }

  rafId = requestAnimationFrame(tick);
}

function initAllComponents() {
  initAllDotFields();
  initLanyard();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAllComponents);
} else {
  initAllComponents();
}


