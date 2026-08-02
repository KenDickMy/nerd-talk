(() => {
  const canCopy = !!navigator.clipboard;

  const bind = (btn, getText) => {
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(getText());
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
  };

  // Explicit copy buttons (install blocks on skill pages).
  if (canCopy) {
    document.querySelectorAll("[data-copy-target]").forEach((btn) => {
      bind(btn, () => {
        const target = document.getElementById(btn.dataset.copyTarget);
        return target ? target.innerText.trim() : "";
      });
    });
  }

  // Inject a copy button on every prose code block.
  if (canCopy) {
    document.querySelectorAll(".prose pre").forEach((pre) => {
      if (pre.closest(".install")) return; // install blocks already have one
      const code = pre.querySelector("code");
      if (!code) return;

      const wrap = document.createElement("div");
      wrap.className = "code-wrap";
      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(pre);

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "copy-btn code-copy";
      btn.textContent = "Copy";
      btn.setAttribute("aria-label", "Copy code to clipboard");
      bind(btn, () => code.innerText.trim());
      wrap.appendChild(btn);
    });
  }

  // Anchor links on prose headings (kramdown auto-generates the ids).
  document.querySelectorAll(".prose h2[id], .prose h3[id], .prose h4[id]").forEach((h) => {
    const a = document.createElement("a");
    a.className = "h-anchor";
    a.href = "#" + h.id;
    a.textContent = "#";
    a.setAttribute("aria-label", "Link to this section");
    h.appendChild(a);
  });
})();
