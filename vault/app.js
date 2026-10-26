'use strict';
const categories = [
  ['ai', 'AI'], ['hacking', 'Cyber Security'], ['marketing', 'Marketing'],
  ['editing', 'Editing'], ['trading', 'Trading'], ['coding', 'Coding'],
  ['design', 'Design'], ['ecommerce', 'Ecommerce'], ['youtube', 'YouTube'], ['other','Other courses'],
];
const categoryIds = new Set(categories.map(([id]) => id));
const state = { courses: [], category: '', query: '', view: 'library', limit:50 };
const $ = id => document.getElementById(id);
function element(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}
function closeMenu() {
  $('sidebar').classList.remove('is-open');
  $('backdrop').hidden = true;
  $('menu-toggle').setAttribute('aria-expanded', 'false');
}
function categoryTitle(id) { return categories.find(c => c[0] === id)?.[1] || ''; }
function readRoute() {
  state.limit=50;
  const route = location.hash.slice(1) || 'library';
  const courseRoute = route.match(/^course\/([a-z0-9-]+)(?:\/lesson\/([a-z0-9-]+))?$/);
  const match = route.match(/^category\/(\w+)$/);
  state.category = match && categoryIds.has(match[1]) ? match[1] : '';
  state.view = courseRoute ? 'course' : ['library', 'courses', 'categories'].includes(route) ? route : 'library';
  document.querySelectorAll('.hero,.stats,#course-library').forEach(n => { n.hidden = !!courseRoute; });
  $('course-view').hidden = !courseRoute;
  if (courseRoute) window.dispatchEvent(new CustomEvent('vault:course',{detail:{course:state.courses.find(c=>c.id===courseRoute[1]),courseId:courseRoute[1],lessonId:courseRoute[2]}}));
  $('breadcrumb').textContent = courseRoute ? 'Course lessons' : state.category ? categoryTitle(state.category) : state.view === 'categories' ? 'Categories' : 'Courses';
  $('category-section').hidden = state.view !== 'categories';
  document.querySelectorAll('[data-view]').forEach(a => {
    if (!state.category && a.dataset.view === state.view) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  document.querySelectorAll('[data-category]').forEach(a => {
    const selected = a.dataset.category === state.category;
    if (a.tagName === 'A') {
      if (selected) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    } else a.setAttribute('aria-pressed', String(selected));
  });
  closeMenu(); renderCourses();
}
function renderCategories() {
  $('category-nav').replaceChildren(); $('category-grid').replaceChildren();
  for (const [id, title] of categories) {
    const a = element('a', '', title.toLowerCase()); a.href = '#category/' + id;
    a.dataset.category = id; a.prepend(element('span', 'category-dot'));
    $('category-nav').append(a);
    const button = element('button', 'category-card'); button.type = 'button'; button.dataset.category = id;
    button.append(element('strong', '', title), element('span', '', state.courses.filter(c => c.category === id || c.categories?.includes(id)).length + ' courses'));
    button.addEventListener('click', () => { location.hash = 'category/' + id; });
    $('category-grid').append(button);
  }
}
function renderCourses() {
  const query = state.query.trim().toLocaleLowerCase();
  const filtered = state.courses.filter(c => (!state.savedOnly || window.LibraryPreferences?.isSaved(c.id)) && (!state.category || c.category === state.category || c.categories?.includes(state.category)) &&
    [c.title, c.description, c.category, ...c.tags].join(' ').toLocaleLowerCase().includes(query));
  const cards = filtered.slice(0,state.limit).map(c => {
    const a = element('a', 'course-card'); a.href = c.url;
    a.setAttribute('aria-label', 'Open ' + c.title);
    const icon = element('span', 'course-icon', c.category === 'hacking' ? '⌘' : '▤'); icon.setAttribute('aria-hidden', 'true');
    const info = element('span', 'course-info');
    info.append(element('span', 'course-title', c.title), element('span', 'course-meta', (c.serial?'Course '+String(c.serial).padStart(4,'0')+' · ':'')+categoryTitle(c.category) + ' · ' + c.description));
    a.append(icon, info, element('span', 'open', 'Open course ↗')); return a;
  });
  $('course-grid').replaceChildren(...cards); $('course-grid').setAttribute('aria-busy', 'false');
  $('result-count').textContent = filtered.length + (filtered.length === 1 ? ' result' : ' results');
  $('load-more-courses').hidden=filtered.length<=state.limit;
  $('empty-state').hidden = filtered.length !== 0;
  $('empty-description').textContent = state.category && !query ? 'No courses have been added to this category yet.' : 'Try a different search or category.';
  $('active-filter').hidden = !state.category;
  $('filter-name').textContent = categoryTitle(state.category);
}
function reset() { state.query = ''; $('search').value = ''; location.hash = 'courses'; readRoute(); }
$('search').addEventListener('input', e => { state.query = e.target.value; state.limit=50; renderCourses(); if(state.view==='course')location.hash='courses'; });
$('load-more-courses').addEventListener('click',()=>{state.limit+=50;renderCourses();});
$('clear-filter').addEventListener('click', () => { location.hash = 'courses'; });
$('reset-search').addEventListener('click', reset);
document.querySelectorAll('[data-view]').forEach(a => a.addEventListener('click', () => {
  state.savedOnly=false;document.querySelector('.saved-filter')?.setAttribute('aria-pressed','false');state.query = ''; $('search').value = ''; renderCourses();
}));
$('menu-toggle').addEventListener('click', () => {
  const open = $('sidebar').classList.toggle('is-open');
  $('backdrop').hidden = !open; $('menu-toggle').setAttribute('aria-expanded', String(open));
});
$('backdrop').addEventListener('click', closeMenu);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
  if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey && !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) {
    e.preventDefault(); $('search').focus();
  }
});
window.addEventListener('hashchange', readRoute);
async function load() {
  try {
    const response = await fetch('/api/learning-courses',{cache:'no-store',signal:AbortSignal.timeout(15000)});
    if(!response.ok)throw new Error('Library unavailable');
    const payload=await response.json(),data=payload.courses;
    $('snapshot-notice').hidden = !payload.readOnlySnapshot;
    if (!Array.isArray(data)) throw new Error('Invalid collection');
    const ids = new Set();
    state.courses = data.filter(c => {
      if (!c || typeof c.id !== 'string' || ids.has(c.id) || typeof c.title !== 'string' || !categoryIds.has(c.category) || typeof c.description !== 'string' || !Array.isArray(c.tags) || !c.tags.every(t => typeof t === 'string')) return false;
      try { if (new URL(c.url).protocol !== 'https:') return false; } catch { return false; }
      ids.add(c.id); return true;
    });
    $('hero-count').textContent = state.courses.length;
    $('total-count').textContent = state.courses.length;
    $('category-count').textContent = categories.length;
    renderCategories(); readRoute();
  } catch {
    $('load-error').hidden = false; $('result-count').textContent = 'Unavailable';
    $('course-grid').setAttribute('aria-busy', 'false');
  }
}
load();

