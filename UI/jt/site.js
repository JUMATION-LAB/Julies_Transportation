'use strict';

const byId = id => document.getElementById(id);
const booking = byId('booking');
const form = booking.elements;
const asset = name => 'jt/assets/' + name + '.webp';
const defaults = [
  ['Wedding Transport', 'Keep your guests together between the ceremony, reception and home.', 'wedding'],
  ['Tours & Adventures', 'Set your own pace for a safari, river escape or weekend away.', 'river'],
  ['Parties & Events', 'Arrange a shared pickup and return for your celebration.', 'executive'],
  ['Corporate Travel', 'Coordinate transfers for meetings, retreats and team visits.', 'executive'],
  ['Customized Group Travel', 'Build a private itinerary around your group and its stops.', 'hills']
].map(([name, description, photo]) => ({name, description, photo}));
const suggestions = [
  {title:'Jinja & the Nile', caption:'River escapes and weekend adventures', photo:'river', destination:'Jinja'},
  {title:'The western highlands', caption:'Scenic drives through western Uganda', photo:'hills', destination:'Western Uganda'}
];
let service = defaults[0].name;
let whatsapp = '256751176056';

function el(tag, text, className) {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  if (className) node.className = className;
  return node;
}
function httpUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return '';
  try {
    const url = new URL(value, location.href);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
  } catch { return ''; }
}
function photo(url, alt, fallback) {
  const img = el('img');
  img.alt = alt;
  img.loading = 'lazy';
  img.src = httpUrl(url) || asset(fallback);
  img.addEventListener('error', () => { img.src = asset(fallback); }, {once:true});
  return img;
}
async function resource(name) {
  const response = await fetch('/api/' + name, {signal:AbortSignal.timeout(8000)});
  if (!response.ok) throw new Error(name + ' unavailable');
  const payload = await response.json();
  if (!payload.success) throw new Error(name + ' unavailable');
  return payload.data;
}
function active(rows) {
  return Array.isArray(rows) ? rows.filter(row => row && row.is_active !== false) : [];
}
function chooseService(name) {
  service = name;
  for (const button of byId('service-tabs').children) {
    button.setAttribute('aria-pressed', String(button.textContent === name));
  }
}
function focusBooking() {
  location.hash = 'booking';
  form.pickup.focus({preventScroll:true});
}
function inquiryCard(item, action, onClick, fallback) {
  const card = el('article', '', 'card');
  const body = el('div', '', 'body');
  body.append(el('h3', item.name), el('p', item.description));
  if (action) {
    const button = el('button', action + ' ↗', 'text-action');
    button.type = 'button';
    button.onclick = onClick;
    body.append(button);
  }
  card.append(photo(item.image_url, '', fallback), body);
  return card;
}
function renderServices(rows) {
  const services = rows.length ? rows : defaults;
  const tabs = byId('service-tabs');
  tabs.replaceChildren();
  byId('service-cards').replaceChildren(...services.map((item, index) => {
    const button = el('button', item.name);
    button.type = 'button';
    button.onclick = () => chooseService(item.name);
    tabs.append(button);
    return inquiryCard(item, 'Plan this journey', () => {
      chooseService(item.name);
      focusBooking();
    }, item.photo || defaults[index % defaults.length].photo);
  }));
  chooseService(services.some(item => item.name === service) ? service : services[0].name);
}
function renderFleet(rows) {
  const container = byId('vehicle-cards');
  if (!rows.length) {
    const panel = el('div', '', 'fleet-inquiry');
    const copy = el('div');
    const link = el('a', 'Ask about a vehicle ↗');
    link.href = '#booking';
    copy.append(el('h3', 'Tell us about your group.'), el('p', 'Share your passenger count and luggage needs. Our team can confirm a suitable vehicle for your date.'), link);
    panel.append(photo('', 'Illustrative passenger van', 'executive'), copy);
    container.replaceChildren(panel);
    return;
  }
  container.className = 'cards';
  container.replaceChildren(...rows.map(item => {
    const available = item.is_available !== false;
    if (available) form.vehicle.add(new Option(item.name, item.name));
    const description = [item.description, item.passenger_capacity && item.passenger_capacity + ' passengers', item.luggage_capacity, available ? 'Inquire for your date' : 'Currently unavailable'].filter(Boolean).join(' · ');
    return inquiryCard({...item,description}, available ? 'Request this vehicle' : '', () => {
      form.vehicle.value = item.name;
      focusBooking();
    }, 'executive');
  }));
  byId('preferred').hidden = form.vehicle.length <= 1;
}
function renderGallery(rows) {
  const items = rows.length ? rows : [
    {title:'Wedding travel inspiration', photo:'wedding'}, {title:'River escapes', photo:'river'},
    {title:'Scenic drives', photo:'hills'}, {title:'Group transport inspiration', photo:'executive'}
  ];
  byId('gallery-note').textContent = rows.length ? '' : 'Illustrative scenes for planning your trip.';
  byId('photos').replaceChildren(...items.map(item => {
    const title = item.title || item.description || 'Travel photograph';
    const button = el('button');
    const img = photo(item.image_url, title, item.photo || 'journey');
    button.append(img);
    button.onclick = () => {
      const dialog = byId('viewer');
      dialog.querySelector('img').src = img.currentSrc || img.src;
      dialog.querySelector('img').alt = title;
      dialog.querySelector('p').textContent = item.description || title;
      dialog.showModal();
    };
    return button;
  }));
}
function renderReviews(rows, unavailable = false) {
  const reviews = rows.map(row => {
    const quote = el('blockquote', row.message);
    quote.append(el('p', [row.customer_name, row.customer_role].filter(Boolean).join(' · ')));
    return quote;
  });
  byId('reviews').replaceChildren(...(reviews.length ? reviews : [el('p', unavailable ? 'Traveler stories are currently unavailable.' : 'Traveler stories will appear here when shared.', 'empty')]));
}
function applySettings(settings) {
  if (!settings) return;
  const map = httpUrl(settings.map_url);
  if (map) byId('map').href = map;
  if (settings.address) byId('map').textContent = settings.address + ' ↗';
  const hero = httpUrl(settings.hero_image_url);
  if (hero) {
    const img = new Image();
    img.onload = () => { byId('hero-photo').src = hero; };
    img.src = hero;
  }
  const phone = String(settings.whatsapp_number || '').replace(/\D/g, '');
  if (/^[1-9]\d{9,14}$/.test(phone)) whatsapp = phone;
}
renderServices([]);
renderGallery([]);
byId('places').append(...suggestions.map(place => {
  const link = el('a', '', 'place');
  link.href = '#booking';
  link.append(photo('', '', place.photo), el('h3', place.title + ' ↗'), el('small', place.caption));
  link.onclick = () => { form.destination.value = place.destination; };
  return link;
}));
const menu = document.querySelector('.menu');
function setMenu(open) {
  menu.setAttribute('aria-expanded', String(open));
  byId('links').classList.toggle('open', open);
}
menu.onclick = () => setMenu(menu.getAttribute('aria-expanded') !== 'true');
byId('links').onclick = () => setMenu(false);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { setMenu(false); menu.focus(); }
});
byId('viewer').querySelector('button').onclick = () => byId('viewer').close();
const today = new Date();
form.date.min = new Intl.DateTimeFormat('en-CA', {year:'numeric',month:'2-digit',day:'2-digit',timeZone:'Africa/Kampala'}).format(today);
byId('year').textContent = today.getFullYear();
booking.onsubmit = event => {
  event.preventDefault();
  for (const input of [form.pickup, form.destination]) input.value = input.value.trim();
  if (!booking.reportValidity()) return;
  let message = 'Hello Julie Transporters, I would like to inquire about ' + service + '. My pickup location is ' + form.pickup.value + ', my destination is ' + form.destination.value + ', my travel date is ' + form.date.value + ', and I have ' + form.passengers.value + ' passenger(s).';
  if (form.vehicle.value) message += ' My preferred vehicle is ' + form.vehicle.value + '.';
  location.assign('https://wa.me/' + whatsapp + '?text=' + encodeURIComponent(message));
};
resource('services').then(data => renderServices(active(data))).catch(() => {});
resource('vehicles').then(data => renderFleet(active(data))).catch(() => renderFleet([]));
resource('gallery').then(data => renderGallery(active(data))).catch(() => {});
resource('testimonials').then(data => renderReviews(active(data))).catch(() => renderReviews([], true));
resource('settings').then(applySettings).catch(() => {});
