/* ════════════════════════════════════════════════════════════════
   THE GIRL BEHIND THE SMILE — script.js
   ════════════════════════════════════════════════════════════════ */

'use strict';

/* ════════════════════════════════════════════════════════════
   1. GLOBAL STARFIELD — animated background
════════════════════════════════════════════════════════════ */
(function () {
  const cvs = document.getElementById('starfield');
  const ctx = cvs.getContext('2d');
  let stars = [];

  function resize () {
    cvs.width  = window.innerWidth;
    cvs.height = window.innerHeight;
    build();
  }

  function build () {
    stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * cvs.width,
      y: Math.random() * cvs.height,
      r: Math.random() * 1.1 + 0.15,
      t: Math.random() * Math.PI * 2,
      s: Math.random() * 0.007 + 0.002,
    }));
  }

  function draw () {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    stars.forEach(st => {
      st.t += st.s;
      const a = Math.max(0, 0.28 + Math.sin(st.t) * 0.38);
      ctx.beginPath();
      ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,245,${a})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
})();


/* ════════════════════════════════════════════════════════════
   2. CURSOR GLOW (desktop only)
════════════════════════════════════════════════════════════ */
(function () {
  const glow = document.getElementById('cursorGlow');
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
})();


/* ════════════════════════════════════════════════════════════
   3. OPENING — Enter button
════════════════════════════════════════════════════════════ */
(function () {
  const btn  = document.getElementById('enterBtn');
  const open = document.getElementById('opening');
  const body = document.getElementById('siteBody');

  btn.addEventListener('click', () => {
    open.classList.add('fade-exit');
    setTimeout(() => {
      open.style.display = 'none';
      body.style.display = 'block';
      body.classList.remove('site-hidden');
    }, 950);
  });
})();


/* ════════════════════════════════════════════════════════════
   4. SCROLL REVEAL (IntersectionObserver)
════════════════════════════════════════════════════════════ */
(function () {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el   = entry.target;
      const siblings = [...(el.parentElement?.querySelectorAll('.reveal') || [])];
      const idx  = siblings.indexOf(el);
      const base = parseFloat(getComputedStyle(el).getPropertyValue('--delay')) || 0;
      setTimeout(() => el.classList.add('in-view'), base * 1000 + idx * 80);
      obs.unobserve(el);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
})();


/* ════════════════════════════════════════════════════════════
   5. NAVIGATION — active dot tracking
════════════════════════════════════════════════════════════ */
(function () {
  const navBtns  = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.chapter');

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && e.intersectionRatio >= 0.35) {
        const id = e.target.id;
        navBtns.forEach(b => b.classList.toggle('active', b.dataset.target === id));
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => io.observe(s));

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();


/* ════════════════════════════════════════════════════════════
   6. FLIP CARDS
════════════════════════════════════════════════════════════ */
(function () {
  document.querySelectorAll('.flip-card').forEach(card => {
    const flip = () => card.classList.toggle('flipped');
    card.addEventListener('click', flip);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); }
    });
  });
})();


/* ════════════════════════════════════════════════════════════
   7. STARS ROOM — interactive canvas

   ★ STARS DATA — ADD YOUR OWN STARS HERE ★
   ─────────────────────────────────────────
   Each object is one clickable star.
   Fields:
     title  → the heading shown in the pop-up (keep it short)
     text   → the memory, compliment, or reason she is special
     size   → visual star size — use 1.5 to 3.5
     color  → the star's colour as an rgba() string

   To add a star: copy any object below, paste it after the last
   one (before the closing ]  ), and fill in your own title and text.
════════════════════════════════════════════════════════════ */
const STARS_DATA = [
  {
    title: "the way she laughs",
    text: "Her real laugh — the uncontrollable one she tries to suppress — is one of the greatest sounds that has ever existed. I would embarrass myself completely, on purpose, just to hear it again.",
    size: 2.6, color: "rgba(200,164,106,1)"
  },
  {
    title: "3am conversations",
    text: "The night we talked until neither of us could keep our eyes open — that's when I realised I was in serious trouble. The best, most welcome kind of trouble.",
    size: 2.0, color: "rgba(220,200,160,1)"
  },
  {
    title: "replace with your memory",
    text: "Replace this text with a real memory she wouldn't expect you to remember — a specific detail, a small thing, something that proves you have always been paying very close attention.",
    size: 3.1, color: "rgba(255,230,178,1)"
  },
  {
    title: "replace with an inside thing",
    text: "Replace this with something only you two would understand. A joke, a reference, a moment that has no name but you both know exactly what it means.",
    size: 1.8, color: "rgba(180,158,128,1)"
  },
  {
    title: "something she said once",
    text: "Replace this with an exact thing she said that has lived in your head ever since. Something that revealed her — completely, quietly, fully her.",
    size: 2.2, color: "rgba(230,210,170,1)"
  },
  {
    title: "what i never say enough",
    text: "Replace this with something you've thought a hundred times but only said once, or never. She deserves to read it. Right now.",
    size: 2.9, color: "rgba(255,245,218,1)"
  },
  {
    title: "a thing she doesn't know i notice",
    text: "Replace this with a tiny, specific habit or detail — something she does without thinking, that you have memorised without meaning to. Something so her it's almost embarrassing how well you know it.",
    size: 1.7, color: "rgba(218,198,152,1)"
  },
  {
    title: "my favourite version of her",
    text: "Replace this with a description of the version of her that only you get to see. The private, comfortable, unperformed version. Write it down. Tell her what you see.",
    size: 2.4, color: "rgba(240,220,178,1)"
  },
  {
    title: "the first time i knew",
    text: "Replace this with the specific moment — a sentence, a look, a laugh — when you knew. She should know exactly when it was. Tell her.",
    size: 3.3, color: "rgba(255,238,192,1)"
  },
  {
    title: "what i hope for her",
    text: "Replace this with one future thing you hope for her — not for the two of you, just for her. Her peace. Her confidence. One specific thing you want her life to feel like.",
    size: 1.9, color: "rgba(200,164,106,.9)"
  },
  {
    title: "replace with a reason",
    text: "Replace this with one specific reason she is irreplaceable. Not a general compliment — a specific, earned, impossible-to-say-about-anyone-else reason.",
    size: 2.1, color: "rgba(210,190,148,1)"
  },
  {
    title: "replace with any memory",
    text: "Replace this with any memory. A place. A day. A sentence. A moment that still feels warm when you return to it. Give it to her.",
    size: 1.6, color: "rgba(178,158,118,1)"
  },
];

(function () {
  const cvs  = document.getElementById('starRoom');
  if (!cvs) return;
  const ctx  = cvs.getContext('2d');
  const overlay   = document.getElementById('starOverlay');
  const closeBtn  = document.getElementById('starClose');
  const titleEl   = document.getElementById('starTitle');
  const textEl    = document.getElementById('starText');

  let placed = [];

  function resize () {
    cvs.width  = cvs.offsetWidth  || window.innerWidth;
    cvs.height = cvs.offsetHeight || window.innerHeight;
    place();
  }

  function place () {
    placed = STARS_DATA.map((s, i) => ({
      ...s,
      // Deterministic, spread positions using trig seeds
      x: 0.06 + Math.abs(Math.sin(i * 2.41 + 1.3)) * 0.88,
      y: 0.06 + Math.abs(Math.cos(i * 1.73 + 2.1)) * 0.88,
      t: i * 0.85,
      ts: 0.013 + i * 0.002,
      hov: false,
    }));
  }

  function draw () {
    ctx.clearRect(0, 0, cvs.width, cvs.height);

    placed.forEach(s => {
      s.t += s.ts;
      const alpha = 0.55 + Math.sin(s.t) * 0.38;
      const px = s.x * cvs.width;
      const py = s.y * cvs.height;
      const r  = s.size * (s.hov ? 1.6 : 1);

      // Glow halo
      const g = ctx.createRadialGradient(px, py, 0, px, py, r * 9);
      g.addColorStop(0, s.color.replace(/[\d.]+\)$/, `${alpha * 0.38})`));
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(px, py, r * 9, 0, Math.PI * 2);
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.globalAlpha = alpha;
      ctx.fill();
      ctx.globalAlpha = 1;

      // Cross sparkle for bigger stars
      if (s.size >= 2.2) {
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(s.t * 0.06);
        ctx.beginPath();
        ctx.moveTo(0, -r * 3.8); ctx.lineTo(0,  r * 3.8);
        ctx.moveTo(-r * 3.8, 0); ctx.lineTo( r * 3.8, 0);
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 0.65;
        ctx.globalAlpha = alpha * 0.3;
        ctx.stroke();
        ctx.restore();
        ctx.globalAlpha = 1;
      }
    });

    requestAnimationFrame(draw);
  }

  /* Hit detection */
  function hitStar (cx, cy) {
    const rect = cvs.getBoundingClientRect();
    const mx   = (cx - rect.left) * (cvs.width  / rect.width);
    const my   = (cy - rect.top)  * (cvs.height / rect.height);
    return placed.find(s => {
      const px = s.x * cvs.width, py = s.y * cvs.height;
      const hitR = (s.size + 2) * 18; // generous touch area
      return Math.hypot(mx - px, my - py) <= hitR;
    });
  }

  function openStar (s) {
    titleEl.textContent = s.title;
    textEl.textContent  = s.text;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeStar () {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  cvs.addEventListener('click', e => {
    const s = hitStar(e.clientX, e.clientY);
    if (s) openStar(s);
  });

  cvs.addEventListener('touchend', e => {
    e.preventDefault();
    const t = e.changedTouches[0];
    const s = hitStar(t.clientX, t.clientY);
    if (s) openStar(s);
  }, { passive: false });

  cvs.addEventListener('mousemove', e => {
    const s = hitStar(e.clientX, e.clientY);
    placed.forEach(st => { st.hov = false; });
    if (s) { s.hov = true; cvs.style.cursor = 'pointer'; }
    else     cvs.style.cursor = 'crosshair';
  });

  closeBtn.addEventListener('click', closeStar);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeStar(); });

  resize();
  window.addEventListener('resize', resize);
  draw();
})();


const LETTERS_DATA = {

  sad: {
    heading: "open when you're sad",
    body: `
      <p>hey, you.</p>
      <p>i know today is heavy. i don't know exactly what's made it that way but i know you, and i know that when you feel things, you feel them completely. that's not a flaw. that's one of the most tender, real things about you.</p>
      <p>please don't rush past this. sit with it for a minute. let it move through you. but don't let it lie to you don't let it tell you you're alone in this, or that it won't pass, or that you're somehow less because today is hard.</p>
      <p>it will pass. you will still be whole on the other side. and you will still be you still everything, still enough, still the person i think about more than i will probably ever say out loud.</p>
      <p>if i could be there right now, i would be. take a breath. you're going to be okay. i'm absolutely certain of it.</p>
    `
  },

  overthinking: {
    heading: "open when you're overthinking",
    body: `
      <p>stop. breathe. put your phone down for a moment after you finish reading this.</p>
      <p>you're in your head again. running through every possible version of something that may not even be real. preparing for catastrophes that probably won't arrive. i know you. you do this. and i say that with nothing but love.</p>
      <p>here is what is actually true right now: you are safe. you are loved. the thing your brain is catastrophising about is almost certainly not as bad as it feels at whatever hour this is.</p>
      <p>you are not your anxiety. you are not your worst thought. you are the person who keeps going anyway quietly, stubbornly, more bravely than you ever give yourself credit for.</p>
      <p>put the spiral down. drink some water. go outside for three minutes if you can. you are okay. i promise.</p>
    `
  },

  insecure: {
    heading: "open when you feel insecure",
    body: `
      <p>listen to me.</p>
      <p>whatever it is you're comparing yourself to right now stop. it isn't fair to you. it isn't accurate. and it isn't the way i see you, not even a little.</p>
      <p>you are not too much. you are not not enough. you are not behind, or wrong, or less than. you are exactly, specifically, irreplaceably yourself and that version of you is one of the most remarkable things i have ever encountered.</p>
      <p>i need you to hear this: the things you see as flaws, i often see as proof that you're real. proof that you're human and complicated and honest. that is not something to hide. that is something to be held carefully.</p>
      <p>you are allowed to take up space. you are allowed to be imperfect and still be incredible. both of those things are true at the same time. you are allowed to believe it.</p>
    `
  },

  miss: {
    heading: "open when you miss me",
    body: `
      <p>you opened this one, which means you're thinking about me.</p>
      <p>i want you to know i think about you too. more than makes rational sense. you've become the first thought in the morning and the last one at night, and honestly, i'm not even slightly sorry about that.</p>
      <p>distance is a strange thing. it doesn't change how much i care it just makes it louder somehow. like when everything goes quiet, the important things become the clearest.</p>
      <p>so go do something that makes you smile. something small and good. eat something you love. call someone who matters. and know that wherever i am right now, part of me is always a little bit with you.</p>
      <p>i miss you back. more than this letter can hold.</p>
    `
  },

  reminder: {
    heading: "open when you need a reminder",
    body: `
      <p>this is your reminder.</p>
      <p>you are not who you were on your worst day. you are not the sum of your hardest moments. you are not what anyone who didn't take the time to know you has ever decided you are.</p>
      <p>you are the person who shows up. who cares without being asked to. who notices the things other people walk past. who carries more than she lets on, and keeps going anyway.</p>
      <p>you are someone who has made real differences in real people's lives quietly, without a fuss, without needing credit. that matters. you matter. not in an abstract, everyone-matters way. in a specific, you-specifically, i-have-seen-it-firsthand way.</p>
      <p>you are loved. you are enough. you are more than enough. now go live like you believe it even just for today.</p>
    `
  }

};

(function () {
  const overlay   = document.getElementById('letterOverlay');
  const headEl   = document.getElementById('letterHeading');
  const bodyEl   = document.getElementById('letterBody');
  const closeBtn = document.getElementById('letterClose');

  document.querySelectorAll('.envelope').forEach(env => {
    env.addEventListener('click', () => {
      const data = LETTERS_DATA[env.dataset.letter];
      if (!data) return;
      headEl.textContent = data.heading;
      bodyEl.innerHTML   = data.body;
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function close () {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', close);
  if (overlay) overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
})();

/* ════════════════════════════════════════════════════════════
   10. BACKGROUND MUSIC
   📷 AUDIO: Place a file named  song.mp3  next to index.html
════════════════════════════════════════════════════════════ */
(function () {
  const btn   = document.getElementById('musicBtn');
  const audio = document.getElementById('bgMusic');
  if (!btn || !audio) return;

  let playing = false;

  btn.addEventListener('click', () => {
    if (playing) {
      audio.pause();
      playing = false;
      btn.textContent = '♪';
      btn.classList.remove('on');
    } else {
      audio.play().catch(() => {
        // Browser blocked autoplay — that's fine, user can try again
      });
      playing = true;
      btn.textContent = '♫';
      btn.classList.add('on');
    }
  });
})();


/* ════════════════════════════════════════════════════════════
   11. SUBTLE PARALLAX on starfield
════════════════════════════════════════════════════════════ */
(function () {
  let tick = false;
  window.addEventListener('scroll', () => {
    if (tick) return;
    tick = true;
    requestAnimationFrame(() => {
      const sf = document.getElementById('starfield');
      if (sf) sf.style.transform = `translateY(${window.scrollY * 0.06}px)`;
      tick = false;
    });
  }, { passive: true });
})();


/* ════════════════════════════════════════════════════════════
   12. PHOTO CARDS — show placeholder text when no image loaded
   (Works automatically — no editing needed)
════════════════════════════════════════════════════════════ */
(function () {
  document.querySelectorAll('.bc-photo, .bday-photo').forEach(el => {
    const style = el.getAttribute('style') || '';
    const match = style.match(/url\(['"]?([^'")\s]+)['"]?\)/);
    if (!match || !match[1]) {
      el.classList.add('no-image');
      return;
    }
    const src = match[1];
    if (src === '' || src === '#') {
      el.classList.add('no-image');
      return;
    }
    const img = new Image();
    img.onload = () => { /* image loaded fine */ };
    img.onerror = () => { el.classList.add('no-image'); };
    img.src = src;
  });
})();