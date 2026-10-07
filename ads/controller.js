(() => {
  const slot = document.querySelector(".sponsor-slot");
  const frame = slot?.querySelector("[data-ad-frame]");
  if (!slot || !frame) return;
  try {
    if (sessionStorage.getItem("delta-ad-hidden") === "1") {
      slot.hidden = true;
      return;
    }
  } catch {}
  // One banner per page visit. Hash navigation never reloads it.
  const providers = ["/ads/banner.html", "/ads/advertica.html"];
  let selected = 0;
  try {
    const next = Number(localStorage.getItem("delta-ad-next") || 0);
    selected = Number.isSafeInteger(next) && next >= 0 ? next % providers.length : 0;
    localStorage.setItem("delta-ad-next", String((selected + 1) % providers.length));
  } catch {
    selected = Math.floor(Math.random() * providers.length);
  }
  frame.src = providers[selected];
  slot.querySelector(".ad-close")?.addEventListener("click", () => {
    frame.src = "about:blank";
    slot.hidden = true;
    try { sessionStorage.setItem("delta-ad-hidden", "1"); } catch {}
  });
})();
