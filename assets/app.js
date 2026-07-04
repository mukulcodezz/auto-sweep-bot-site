/* ============================================================================
   AUTO-SWEEP BOT — interaction layer (vanilla, no deps)
   Blueprint crosshair canvas · scroll reveals · split-line headings ·
   count-up stats · copy buttons · self-playing transcript · mobile nav.
   All motion respects prefers-reduced-motion and touch devices.
   ========================================================================== */
(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* -------------------------------------------------- blueprint crosshair */
  // A cursor-tracked survey crosshair with a live coordinate readout, drawn
  // over the CSS grid field. Idle-drifts when the mouse is still.
  function crosshair() {
    if (!fine || reduce) return;
    const c = document.createElement('canvas');
    c.id = 'crosshair';
    c.setAttribute('aria-hidden', 'true');
    document.body.appendChild(c);
    const ctx = c.getContext('2d');
    let w, h, tx = innerWidth / 2, ty = innerHeight / 2, x = tx, y = ty, idle = 0;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const size = () => { w = c.width = innerWidth * dpr; h = c.height = innerHeight * dpr;
      c.style.width = innerWidth + 'px'; c.style.height = innerHeight + 'px'; ctx.scale(dpr, dpr); };
    size(); addEventListener('resize', () => { ctx.setTransform(1,0,0,1,0,0); size(); });
    addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; idle = 0; }, { passive: true });

    (function loop() {
      requestAnimationFrame(loop);
      idle++;
      if (idle > 90) { tx += Math.sin(idle / 60) * 0.35; ty += Math.cos(idle / 90) * 0.25; }
      x += (tx - x) * 0.12; y += (ty - y) * 0.12;
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      ctx.strokeStyle = 'rgba(218,57,7,0.32)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, y + 0.5); ctx.lineTo(innerWidth, y + 0.5);
      ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, innerHeight); ctx.stroke();
      // node square
      ctx.strokeStyle = 'rgba(23,19,12,0.7)'; ctx.strokeRect(x - 5, y - 5, 10, 10);
      ctx.fillStyle = 'rgba(218,57,7,0.9)'; ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
      // coordinate readout
      ctx.font = "10px 'Spline Sans Mono', monospace";
      ctx.fillStyle = 'rgba(23,19,12,0.55)';
      const rx = Math.round(x).toString().padStart(4, '0'), ry = Math.round(y).toString().padStart(4, '0');
      const flip = x > innerWidth - 90, fy = y > innerHeight - 26;
      ctx.textAlign = flip ? 'right' : 'left';
      ctx.fillText(`X${rx} · Y${ry}`, x + (flip ? -10 : 10), y + (fy ? -10 : 16));
    })();
  }

  /* ------------------------------------------------------- scroll reveals */
  function reveals() {
    const els = $$('.reveal, [data-split]');
    if (reduce) { els.forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver((ents) => {
      ents.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
    els.forEach(e => io.observe(e));
  }

  /* --------------------------------------------------- split-line headings */
  function split() {
    $$('[data-split]').forEach(el => {
      const words = el.textContent.trim().split(/\s+/);
      el.innerHTML = words.map((wd, i) =>
        `<span class="word"><span style="transition-delay:${i * 55}ms">${wd}</span></span>`
      ).join(' ');
    });
  }

  /* ----------------------------------------------------------- count-ups */
  function counters() {
    const nums = $$('[data-count]');
    if (!nums.length) return;
    const io = new IntersectionObserver((ents) => {
      ents.forEach(e => {
        if (!e.isIntersecting) return; io.unobserve(e.target);
        const el = e.target, to = parseFloat(el.dataset.count), dec = (el.dataset.count.split('.')[1] || '').length;
        if (reduce) { el.textContent = to.toFixed(dec); return; }
        const t0 = performance.now(), dur = 1100;
        (function tick(t) {
          const p = Math.min((t - t0) / dur, 1), e2 = 1 - Math.pow(1 - p, 3);
          el.textContent = (to * e2).toFixed(dec);
          if (p < 1) requestAnimationFrame(tick);
        })(t0);
      });
    }, { threshold: 0.6 });
    nums.forEach(n => io.observe(n));
  }

  /* ------------------------------------------------------- copy buttons  */
  function copiers() {
    $$('[data-copy]').forEach(btn => {
      btn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(btn.dataset.copy);
          const old = btn.textContent; btn.textContent = 'COPIED'; btn.classList.add('ok');
          setTimeout(() => { btn.textContent = old; btn.classList.remove('ok'); }, 1400);
        } catch { /* clipboard blocked — no-op */ }
      });
    });
  }

  /* --------------------------------------------------------- mobile nav  */
  function mobileNav() {
    const t = $('.nav-toggle'), links = $('.nav-links');
    if (!t || !links) return;
    t.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      t.textContent = open ? '[ CLOSE ]' : '[ MENU ]';
      t.setAttribute('aria-expanded', open);
    });
    $$('.nav-links a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open'); t.textContent = '[ MENU ]';
    }));
  }

  /* -------------------------------------------------- transcript player  */
  // Self-plays the sweep→send story once in view, then loops on a long delay.
  function transcript() {
    const tg = $('[data-transcript]');
    if (!tg) return;
    const body = $('.tg-body', tg), msgs = $$('.msg', tg);
    const wait = ms => new Promise(r => setTimeout(r, ms));
    const dots = document.createElement('div');
    dots.className = 'tg-typing'; dots.setAttribute('aria-hidden', 'true');
    dots.innerHTML = '<i></i><i></i><i></i>';
    let running = false;

    async function play() {
      if (running) return; running = true;
      if (reduce) { msgs.forEach(m => m.classList.add('show')); running = false; return; }
      // eslint-disable-next-line no-constant-condition
      while (true) {
        msgs.forEach(m => m.classList.remove('show'));
        await wait(400);
        for (const m of msgs) {
          const isBot = m.classList.contains('bot');
          if (isBot) { body.insertBefore(dots, m); dots.classList.add('on'); await wait(680); dots.classList.remove('on'); body.removeChild(dots); }
          else { await wait(520); }
          m.classList.add('show');
          await wait(isBot ? 520 : 360);
        }
        await wait(6500);
      }
    }
    const io = new IntersectionObserver((ents) => {
      ents.forEach(e => { if (e.isIntersecting) { play(); io.disconnect(); } });
    }, { threshold: 0.4 });
    io.observe(tg);
  }

  /* ------------------------------------------------------ scroll parallax */
  function parallax() {
    const els = $$('[data-parallax]');
    if (!els.length || reduce) return;
    let ticking = false;
    const upd = () => {
      const vh = innerHeight;
      els.forEach(el => {
        const r = el.getBoundingClientRect();
        const f = parseFloat(el.dataset.parallax) || 0.12;
        const off = (r.top + r.height / 2 - vh / 2) * -f;
        el.style.transform = `translate3d(0, ${off.toFixed(1)}px, 0)`;
      });
      ticking = false;
    };
    addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(upd); ticking = true; } }, { passive: true });
    upd();
  }

  /* --------------------------------------------------- svg draw-on-view  */
  function drawSvg() {
    $$('[data-draw] path, [data-draw] line').forEach(p => {
      const len = p.getTotalLength ? p.getTotalLength() : 300;
      p.style.setProperty('--len', len);
      p.style.strokeDasharray = len; p.style.strokeDashoffset = reduce ? 0 : len;
    });
    const io = new IntersectionObserver((ents) => {
      ents.forEach(e => {
        if (!e.isIntersecting) return; io.unobserve(e.target);
        $$('path, line', e.target).forEach((p, i) => {
          if (reduce) { p.style.strokeDashoffset = 0; return; }
          p.style.animation = `drawLine 1.1s ${i * 0.12}s var(--ease, ease) forwards`;
        });
      });
    }, { threshold: 0.3 });
    $$('[data-draw]').forEach(s => io.observe(s));
  }

  /* -------------------------------------------------- magnetic buttons  */
  function magnetic() {
    if (!fine || reduce) return;
    $$('.btn').forEach(btn => {
      btn.classList.add('mag');
      const pull = 0.28, max = 9;
      btn.addEventListener('pointermove', e => {
        const r = btn.getBoundingClientRect();
        let dx = (e.clientX - (r.left + r.width / 2)) * pull;
        let dy = (e.clientY - (r.top + r.height / 2)) * pull;
        dx = Math.max(-max, Math.min(max, dx)); dy = Math.max(-max, Math.min(max, dy));
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
    });
  }

  /* --------------------------------------------- scroll progress + nav  */
  function chrome() {
    const bar = document.createElement('div'); bar.id = 'scrollbar'; bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    const nav = $('.nav');
    let ticking = false;
    const upd = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + '%';
      if (nav) nav.classList.toggle('scrolled', scrollY > 8);
      ticking = false;
    };
    addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(upd); ticking = true; } }, { passive: true });
    upd();
  }

  /* -------------------------------------------------------- active year  */
  function year() { $$('[data-year]').forEach(e => e.textContent = new Date().getFullYear()); }

  document.addEventListener('DOMContentLoaded', () => {
    split(); reveals(); counters(); copiers(); mobileNav(); transcript(); drawSvg(); year(); magnetic(); chrome(); parallax();
    crosshair();
    // page-load: mark hero split lines in immediately
    requestAnimationFrame(() => $$('[data-split].hero').forEach(e => e.classList.add('in')));
  });
})();
