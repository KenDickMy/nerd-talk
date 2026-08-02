(() => {
  const root = document.documentElement;
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("cp-theme", next);
    btn.setAttribute("aria-label", `Switch to ${next === "dark" ? "light" : "dark"} theme`);
  });

  // Follow the OS if the visitor has never picked a theme by hand.
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const followSystem = (e) => {
    if (!localStorage.getItem("cp-theme")) {
      root.setAttribute("data-theme", e.matches ? "dark" : "light");
    }
  };
  if (mq.addEventListener) mq.addEventListener("change", followSystem);
})();
