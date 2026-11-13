(() => {
  const app = document.getElementById("app");
  if (!app) return;

  const photo = new Image();
  photo.src = new URL("./assets/identidade/hero-familia-novo-lar.png", document.baseURI).href;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  let hero = null;
  let title = null;
  let outline = null;
  let editorial = null;
  let frame = 0;

  const percent = (value, fallback) => value.endsWith("%") ? parseFloat(value) / 100 : fallback;

  const render = () => {
    frame = 0;
    if (!ctx || !photo.complete || !photo.naturalWidth || !outline?.isConnected) return;
    const box = hero.getBoundingClientRect();
    const text = title.getBoundingClientRect();
    if (!box.width || !box.height || !text.width || !text.height) return;

    canvas.width = Math.ceil(text.width);
    canvas.height = Math.ceil(text.height);
    const style = getComputedStyle(hero);
    const scale = Math.max(box.width / photo.naturalWidth, box.height / photo.naturalHeight);
    const width = photo.naturalWidth * scale;
    const height = photo.naturalHeight * scale;
    const x = (box.width - width) * percent(style.backgroundPositionX, .5);
    const y = (box.height - height) * percent(style.backgroundPositionY, .5);
    ctx.drawImage(photo, x - (text.left - box.left), y - (text.top - box.top), width, height);

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < pixels.data.length; i += 4) {
      const r = pixels.data[i], g = pixels.data[i + 1], b = pixels.data[i + 2];
      const distance = Math.hypot(r - 5, g - 52, b - 63);
      const blue = b > r * 1.08 && g > r * 1.08;
      const strength = blue ? Math.max(0, Math.min(1, (100 - distance) / 40)) : 0;
      pixels.data[i] = pixels.data[i + 1] = pixels.data[i + 2] = 0;
      pixels.data[i + 3] = Math.round(strength * 255);
    }
    ctx.putImageData(pixels, 0, 0);
    outline.style.setProperty("--hero-blue-mask", `url("${canvas.toDataURL()}")`);
  };

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(() => requestAnimationFrame(render));
  };
  const resizeObserver = new ResizeObserver(schedule);
  const styleObserver = new MutationObserver(schedule);
  const sync = () => {
    const nextHero = app.querySelector("#home.hero");
    const nextTitle = nextHero?.querySelector(".hero-title") || null;
    const nextOutline = nextTitle?.querySelector(".hero-title-outline") || null;
    const nextEditorial = nextHero?.querySelector(".mezanino-hero-editorial") || null;
    if (hero === nextHero && title === nextTitle && outline === nextOutline && editorial === nextEditorial) return;
    resizeObserver.disconnect();
    styleObserver.disconnect();
    hero = nextHero;
    title = nextTitle;
    outline = nextOutline;
    editorial = nextEditorial;
    if (hero && title && outline && editorial) {
      resizeObserver.observe(hero);
      resizeObserver.observe(title);
      styleObserver.observe(editorial, { attributes: true, attributeFilter: ["style"] });
      schedule();
    }
  };

  photo.addEventListener("load", schedule);
  document.fonts?.ready.then(schedule);
  window.addEventListener("resize", schedule);
  new MutationObserver(sync).observe(app, { childList: true, subtree: true });
  sync();
})();
