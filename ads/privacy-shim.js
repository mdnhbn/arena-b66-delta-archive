// Sandboxed advertisements receive no access to the archive's cookies.
// Some banner scripts assume a cookie getter exists. An empty, nonpersistent
// value lets those scripts render without granting the frame a real origin.
try {
  void document.cookie;
} catch {
  Object.defineProperty(document, "cookie", {
    get() { return ""; },
    set() {},
    configurable: false
  });
}
