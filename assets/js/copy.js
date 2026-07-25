(() => {
  const buttons = document.querySelectorAll("[data-copy-target]");
  if (!buttons.length || !navigator.clipboard) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const target = document.getElementById(btn.dataset.copyTarget);
      if (!target) return;

      try {
        await navigator.clipboard.writeText(target.innerText.trim());
        const original = btn.textContent;
        btn.textContent = "Copied";
        btn.dataset.copied = "true";
        setTimeout(() => {
          btn.textContent = original;
          delete btn.dataset.copied;
        }, 1800);
      } catch {
        btn.textContent = "Press ⌘C";
      }
    });
  });
})();
