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
  window.addEventListener("message", (event) => {
    if (slot.hidden || frame.getAttribute("src") !== "/ads/advertica.html") return;
    if (event.origin !== location.origin || event.source !== frame.contentWindow) return;
    if (event.data?.type !== "delta-ad-unavailable" || event.data?.path !== "/ads/advertica.html") return;
    // A failed provider never leaves an empty advertisement in place.
    frame.src = "/ads/banner.html";
  });
  frame.src = providers[selected];
  slot.querySelector(".ad-close")?.addEventListener("click", () => {
    frame.src = "about:blank";
    slot.hidden = true;
    try { sessionStorage.setItem("delta-ad-hidden", "1"); } catch {}
  });
})();
