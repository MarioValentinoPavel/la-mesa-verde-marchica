/* La Mesa Verde · mantel verde que se despliega, horizonte, plano de mesas con petición por Instagram */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = typeof gsap !== 'undefined';
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);
  const D = window.I18N;
  let LANG = 'fr';
  const u = () => D.ui[LANG];
  const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) { } } };

  /* ---------- plano ---------- */
  const TABLES = [
    { id: 'T1', z: 't', x: 120, y: 228, s: 2, shape: 'r' }, { id: 'T2', z: 't', x: 230, y: 228, s: 4, shape: 'r' }, { id: 'T3', z: 't', x: 345, y: 228, s: 4, shape: 'r' },
    { id: 'T4', z: 't', x: 460, y: 228, s: 2, shape: 'r' }, { id: 'T5', z: 't', x: 575, y: 228, s: 4, shape: 'r' }, { id: 'T6', z: 't', x: 690, y: 228, s: 6, shape: 'r' },
    { id: 'S1', z: 'r', x: 125, y: 400, s: 4, shape: 'q' }, { id: 'S2', z: 'r', x: 265, y: 400, s: 6, shape: 'q' }, { id: 'S3', z: 'r', x: 410, y: 400, s: 4, shape: 'q' },
    { id: 'S4', z: 'r', x: 265, y: 462, s: 8, shape: 'q' },
    { id: 'B1', z: 'b', x: 590, y: 392, s: 2, shape: 'r' }, { id: 'B2', z: 'b', x: 700, y: 392, s: 2, shape: 'r' }, { id: 'B3', z: 'b', x: 645, y: 455, s: 2, shape: 'r' }
  ];
  function tableSvg(t) {
    const chairs = [];
    if (t.shape === 'r') {
      const R = t.s > 4 ? 30 : 24;
      for (let i = 0; i < t.s; i++) { const a = (i / t.s) * Math.PI * 2 - Math.PI / 2; chairs.push(`<circle class="tbl__chair" cx="${(t.x + Math.cos(a) * (R + 11)).toFixed(1)}" cy="${(t.y + Math.sin(a) * (R + 11)).toFixed(1)}" r="6"/>`); }
      return `<g class="tbl" data-id="${t.id}" tabindex="0" role="button" aria-label="${t.id}, ${t.s}">${chairs.join('')}<circle class="tbl__top" cx="${t.x}" cy="${t.y}" r="${R}"/><text class="tbl__n" x="${t.x}" y="${t.y + 4}" text-anchor="middle">${t.id}</text></g>`;
    }
    const w = t.s >= 8 ? 150 : t.s >= 6 ? 96 : 66, h = 30, per = t.s / 2;
    for (let i = 0; i < per; i++) { const cx = t.x - w / 2 + (w / per) * (i + 0.5); chairs.push(`<circle class="tbl__chair" cx="${cx.toFixed(1)}" cy="${t.y - h / 2 - 9}" r="6"/><circle class="tbl__chair" cx="${cx.toFixed(1)}" cy="${t.y + h / 2 + 9}" r="6"/>`); }
    return `<g class="tbl" data-id="${t.id}" tabindex="0" role="button" aria-label="${t.id}, ${t.s}">${chairs.join('')}<rect class="tbl__top" x="${t.x - w / 2}" y="${t.y - h / 2}" width="${w}" height="${h}" rx="6"/><text class="tbl__n" x="${t.x}" y="${t.y + 4}" text-anchor="middle">${t.id}</text></g>`;
  }
  $('#tables').innerHTML = TABLES.map(tableSvg).join('');
  let sel = null, slot = '20:30';
  function pickTable(id) {
    sel = TABLES.find((t) => t.id === id);
    $$('.tbl').forEach((g) => g.classList.toggle('is-on', g.dataset.id === id));
    if (sel && +$('#ppl').value > sel.s) $('#ppl').value = sel.s;
    paint();
    if (hasGsap && !REDUCE && sel) gsap.fromTo(`.tbl[data-id="${id}"] .tbl__top`, { scale: 0.85, transformOrigin: 'center', transformBox: 'fill-box' }, { scale: 1, duration: 0.5, ease: 'back.out(2.4)' });
  }
  $('#tables').addEventListener('click', (e) => { const g = e.target.closest('.tbl'); if (g) pickTable(g.dataset.id); });
  $('#tables').addEventListener('keydown', (e) => { const g = e.target.closest('.tbl'); if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); pickTable(g.dataset.id); } });
  function renderSlots() {
    $('#slots').innerHTML = D.slots.map(([h, k]) => `<button type="button" class="slot${k ? ' slot--sun' : ''}" role="radio" aria-checked="${h === slot}" data-h="${h}">${h}${k ? ' · ' + u().sun : ''}</button>`).join('');
  }
  $('#slots').addEventListener('click', (e) => { const b = e.target.closest('.slot'); if (!b) return; slot = b.dataset.h; renderSlots(); paint(); });
  const dateIn = $('#date');
  const today = new Date(); today.setHours(12, 0, 0, 0);
  dateIn.min = today.toISOString().slice(0, 10);
  dateIn.value = new Date(today.getTime() + 864e5).toISOString().slice(0, 10);
  const dTxt = () => new Date(dateIn.value + 'T12:00').toLocaleDateString(LANG === 'es' ? 'es-ES' : 'fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  function paint() {
    const n = Math.max(1, +$('#ppl').value || 1);
    $('#pick').innerHTML = sel ? `${u().table} <b>${sel.id}</b> · ${D.zone[LANG][sel.z]} · ${sel.s} ${u().seats}` : u().none;
    $('#sum').textContent = u().sum.replace('{n}', n).replace('{d}', dTxt()).replace('{h}', slot);
  }
  dateIn.addEventListener('change', paint);
  $('#ppl').addEventListener('input', paint);
  $('#send').addEventListener('click', async () => {
    const note = $('#note');
    if (!sel) { note.textContent = u().pickFirst; note.classList.add('is-on'); return; }
    const n = Math.max(1, +$('#ppl').value || 1);
    const msg = u().msg.replace('{t}', sel.id).replace('{z}', D.zone[LANG][sel.z]).replace('{s}', sel.s).replace('{d}', dTxt()).replace('{h}', slot).replace('{n}', n);
    try { await navigator.clipboard.writeText(msg); } catch (e) { }
    note.textContent = LANG === 'es' ? D.dom.es['b.note'] : note.dataset.fr || note.textContent;
    note.classList.add('is-on');
    window.open('https://ig.me/m/lamesaverde.marchica', '_blank', 'noopener');
  });

  /* ---------- idioma ---------- */
  function applyLang(l) {
    LANG = l;
    document.documentElement.lang = l;
    $$('[data-i18n]').forEach((el) => {
      if (el.dataset.fr === undefined) el.dataset.fr = el.innerHTML;
      el.innerHTML = l === 'fr' ? el.dataset.fr : (D.dom[l] && D.dom[l][el.dataset.i18n]) || el.dataset.fr;
    });
    $$('[data-i18n-svg]').forEach((el) => (el.textContent = D.svg[l][el.dataset.i18nSvg]));
    $$('.lang button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === l)));
    store.set('mv-lang', l);
    $('#reviews').innerHTML = D.reviews[l].map(([t, w]) => `<figure class="rv"><p>${l === 'fr' ? '« ' + t + ' »' : '«' + t + '»'}</p><cite>${w}, Google</cite></figure>`).join('');
    renderSlots(); paint();
  }
  $$('.lang button').forEach((b) => b.addEventListener('click', () => applyLang(b.dataset.lang)));

  /* ---------- mantel + héroe ---------- */
  function heroIn() {
    if (!hasGsap || REDUCE) return;
    gsap.timeline()
      .from('.horizon', { scaleX: 0, duration: 1.6, ease: 'expo.inOut' })
      .from('.hero__script', { opacity: 0, x: -30, duration: 1.2, ease: 'expo.out' }, 0.2)
      .from('.hero__title, .hero__sub, .hero__cta', { y: 24, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.08 }, 0.35)
      .from('.hero__fig', { clipPath: 'inset(100% 0 0 0 round 14px)', duration: 1.4, ease: 'expo.inOut' }, 0.1)
      .from('.hero__fig img', { scale: 1.25, duration: 1.8, ease: 'expo.out' }, 0.1);
  }
  const cloth = $('#cloth');
  let seen = false;
  try { seen = sessionStorage.getItem('mv-intro') === '1'; sessionStorage.setItem('mv-intro', '1'); } catch (e) { }
  if (!hasGsap || REDUCE || seen) { cloth.remove(); heroIn(); }
  else {
    document.body.classList.add('is-locked');
    const tl = gsap.timeline({ onComplete: () => { cloth.remove(); document.body.classList.remove('is-locked'); } });
    // el mantel cae desde arriba con una ondulación y luego se retira hacia abajo
    tl.fromTo('.cloth__sheet', { scaleY: 0, skewY: 5 }, { scaleY: 1, skewY: 0, duration: 1.1, ease: 'expo.inOut' })
      .to('.cloth__script', { opacity: 1, y: -10, duration: 0.8, ease: 'expo.out' }, '-=0.3')
      .to(cloth, { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'expo.inOut' }, '+=0.35')
      .add(heroIn, '-=0.55');
    cloth.addEventListener('click', () => tl.progress(1));
  }

  /* ---------- scroll ---------- */
  function scrollFx() {
    if (!hasGsap || REDUCE) return;
    const nav = $('#nav');
    ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (s) => { const y = s.scroll(); nav.classList.toggle('is-solid', y > 60); nav.classList.toggle('is-hidden', s.direction === 1 && y > 700); } });
    ScrollTrigger.batch('.fd', { start: 'top 88%', once: true, onEnter: (els) => gsap.from(els, { y: 60, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: 0.1 }) });
    gsap.from('.tbl', { opacity: 0, scale: 0.6, transformOrigin: 'center', transformBox: 'fill-box', duration: 0.7, ease: 'back.out(2)', stagger: 0.04, scrollTrigger: { trigger: '#floor', start: 'top 80%' } });
    gsap.from('.gz', { clipPath: 'inset(100% 0 0 0 round 14px)', duration: 1.3, ease: 'expo.inOut', stagger: 0.12, scrollTrigger: { trigger: '.greenzone', start: 'top 75%' } });
    ScrollTrigger.batch('.rv', { start: 'top 90%', once: true, onEnter: (els) => gsap.from(els, { x: -20, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.1 }) });
  }

  const initial = [new URLSearchParams(location.search).get('lang'), store.get('mv-lang'), (navigator.language || '').slice(0, 2)].find((l) => l === 'fr' || l === 'es') || 'fr';
  applyLang(initial);
  scrollFx();
  addEventListener('load', () => hasGsap && ScrollTrigger.refresh());
})();
