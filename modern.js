(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.addEventListener('click', (event) => {
    const control = event.target.closest?.('button:not(:disabled),a.button');
    if (!control || reduced.matches || !control.animate) return;
    control.animate([
      { transform: 'translateY(0) scale(1)' },
      { transform: 'translateY(2px) scale(.97)', offset: .35 },
      { transform: 'translateY(0) scale(1)' }
    ], { duration: 180, easing: 'ease-out' });
  });
  window.addEventListener('hashchange', () => {
    if (reduced.matches) return;
    requestAnimationFrame(() => document.querySelector('#page')?.animate?.([
      { opacity: .65, transform: 'translateY(5px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration: 160, easing: 'ease-out' }));
  });
  // Counts anonymous visits only. No names, IPs, contacts, or Facebook identity.
  if (navigator.doNotTrack === '1' || navigator.globalPrivacyControl === true) return;
  if (location.hostname !== 'arena-b66-delta-archive.vercel.app') return;
  fetch('/api/visit', { method: 'POST', credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ route: location.hash || '#overview' }), keepalive: true
  }).catch(() => {});
})();
