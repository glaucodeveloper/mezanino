/* Preparo progressivo de fotografias criadas pelos componentes geradores do site. */
(() => {
  const mark = (img) => {
    if (!(img instanceof HTMLImageElement) || img.dataset.mezaninoPrepared) return;
    img.dataset.mezaninoPrepared = '1';
    if (!img.hasAttribute('decoding')) img.decoding = 'async';
    const critical = Boolean(img.closest('.topbar, .brand, .hero'));
    if (critical) {
      img.loading = 'eager';
      try { img.fetchPriority = 'high'; } catch {}
    } else if (!img.hasAttribute('loading')) {
      img.loading = 'lazy';
    }
    img.dataset.mezaninoPhoto = '1';
    const loaded = () => { img.dataset.loaded = 'true'; };
    if (img.complete && img.naturalWidth > 0) loaded();
    else {
      img.dataset.loaded = 'false';
      img.addEventListener('load', loaded, { once: true });
      img.addEventListener('error', () => { img.dataset.loaded = 'error'; }, { once: true });
    }
  };

  const scan = (root) => {
    if (root instanceof HTMLImageElement) mark(root);
    root.querySelectorAll?.('img').forEach(mark);
  };
  const start = () => {
    scan(document);
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const n of m.addedNodes) if (n.nodeType === Node.ELEMENT_NODE) scan(n);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  };
  if (document.body) start();
  else document.addEventListener('DOMContentLoaded', start, { once: true });
})();
