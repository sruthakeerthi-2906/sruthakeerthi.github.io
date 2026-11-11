/* Aaroh – site scripts */
function track(name, params){ if (typeof gtag === 'function') gtag('event', name, params || {}); }

// Mobile menu
const burger = document.querySelector('.burger'), menu = document.querySelector('.menu');
if (burger) burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});

// Hide broken images so the gradient background shows instead
document.querySelectorAll('img').forEach(i => i.addEventListener('error', () => { i.style.display = 'none'; }));

// Category filter (products page)
document.querySelectorAll('.filters button').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.filters button').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
  btn.classList.add('active'); btn.setAttribute('aria-pressed', 'true');
  const cat = btn.dataset.filter;
  document.querySelectorAll('.card[data-cat]').forEach(c => { c.hidden = !(cat === 'all' || c.dataset.cat === cat); });
}));

// GA4 select_item on product buttons
document.querySelectorAll('[data-item]').forEach(b => b.addEventListener('click', () => {
  const card = b.closest('.card');
  track('select_item', {
    item_list_name: 'Aaroh Menu',
    items: [{ item_id: b.dataset.id, item_name: b.dataset.item, item_category: card ? card.dataset.cat : '', price: Number(b.dataset.price), currency: 'INR' }]
  });
  const d = document.getElementById('detail');
  if (d) { d.textContent = b.dataset.item + ' – ₹' + b.dataset.price + '. Ask our team about portions and spice level at the café.'; d.classList.add('show'); }
}));

// Validation helpers
const emailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
function setErr(input, msg){ const e = document.getElementById(input.id + '-err'); if (e) e.textContent = msg; input.setAttribute('aria-invalid', msg ? 'true' : 'false'); return !msg; }

// Contact form (demo only: nothing is sent anywhere)
const cf = document.getElementById('contact-form');
if (cf) cf.addEventListener('submit', e => {
  e.preventDefault();
  const f = cf.elements;
  const ok = [
    setErr(f.name, f.name.value.trim().length < 2 ? 'Please enter your name.' : ''),
    setErr(f.email, emailOk(f.email.value) ? '' : 'Enter a valid email address.'),
    setErr(f.subject, f.subject.value.trim().length < 3 ? 'Please add a subject.' : ''),
    setErr(f.message, f.message.value.trim().length < 10 ? 'Message needs at least 10 characters.' : '')
  ].every(Boolean);
  if (!ok) return;
  // Demo form: use demo_form_submit. Switch to generate_lead ONLY after connecting a real form service (e.g. Formspree) and receiving a success response.
  track('demo_form_submit', { form_name: 'contact' });
  const s = document.getElementById('contact-status');
  s.textContent = 'Thanks! This is a demonstration form, so your message was not sent.'; s.classList.add('show');
  cf.reset();
});

// Newsletter (demo only)
const nf = document.getElementById('news-form');
if (nf) nf.addEventListener('submit', e => {
  e.preventDefault();
  const em = document.getElementById('news-email');
  if (!setErr(em, emailOk(em.value) ? '' : 'Enter a valid email address.')) return;
  // Demo: use demo_form_submit. Use sign_up only after a real newsletter service confirms registration.
  track('demo_form_submit', { form_name: 'newsletter' });
  const s = document.getElementById('news-status');
  s.textContent = 'Demo only: no subscription was created.'; s.classList.add('show');
  nf.reset();
});
