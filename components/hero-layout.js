(() => {
  const app = document.getElementById("app");
  if (!app) return;

  let hero = null;
  let panel = null;
  let editorial = null;
  let frame = 0;

  const positionTitle = () => {
    frame = 0;
    if (!hero?.isConnected || !panel?.isConnected || !editorial?.isConnected) return;
    const transform = getComputedStyle(editorial).transform;
    const currentShift = transform === "none" ? 0 : new DOMMatrixReadOnly(transform).m42;
    const gap = panel.getBoundingClientRect().top - editorial.getBoundingClientRect().bottom;
    const nextShift = currentShift + gap - 20;
    if (Math.abs(nextShift - currentShift) > 0.5) {
      editorial.style.setProperty("--hero-title-shift", `${nextShift}px`);
    }
  };

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(positionTitle);
  };

  const resizeObserver = new ResizeObserver(schedule);
  const sync = () => {
    const nextHero = app.querySelector("#home.hero");
    const nextPanel = nextHero?.querySelector(".custom-search-panel") || null;
    const nextEditorial = nextHero?.querySelector(".mezanino-hero-editorial") || null;
    if (hero === nextHero && panel === nextPanel && editorial === nextEditorial) return;
    resizeObserver.disconnect();
    hero = nextHero;
    panel = nextPanel;
    editorial = nextEditorial;
    if (hero && panel && editorial) {
      resizeObserver.observe(hero);
      resizeObserver.observe(panel);
      resizeObserver.observe(editorial);
      schedule();
    }
  };

  new MutationObserver(sync).observe(app, { childList: true, subtree: true });
  window.addEventListener("resize", schedule);
  sync();
})();
