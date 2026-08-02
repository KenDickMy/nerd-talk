/* Client-side search — fetches /search.json once, scores matches locally. */
(() => {
  const input = document.getElementById("search-input");
  const results = document.getElementById("search-results");
  const count = document.getElementById("search-count");
  if (!input || !results || !count) return;

  let index = null;
  let loading = null;

  const load = () => {
    if (!loading) {
      loading = fetch(window.__searchIndexUrl)
        .then((r) => r.json())
        .then((data) => { index = data; })
        .catch(() => { count.textContent = "// Index failed to load — try a hard refresh"; });
    }
    return loading;
  };

  const escapeHtml = (s) =>
    s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const score = (doc, terms) => {
    let total = 0;
    const title = doc.title.toLowerCase();
    const tags = doc.tags.join(" ").toLowerCase();
    const desc = doc.desc.toLowerCase();
    const text = doc.text.toLowerCase();
    for (const t of terms) {
      let s = 0;
      if (title.includes(t)) s += 6;
      if (tags.includes(t)) s += 4;
      if (desc.includes(t)) s += 2;
      if (text.includes(t)) s += 1;
      if (s === 0) return 0; // every term must match somewhere
      total += s;
    }
    return total;
  };

  const snippet = (doc, terms) => {
    const text = doc.text;
    const lower = text.toLowerCase();
    let pos = -1;
    for (const t of terms) {
      pos = lower.indexOf(t);
      if (pos !== -1) break;
    }
    if (pos === -1) return escapeHtml(doc.desc || text.slice(0, 160));
    const start = Math.max(0, pos - 70);
    const end = Math.min(text.length, pos + 110);
    let out = (start > 0 ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : "");
    out = escapeHtml(out);
    for (const t of terms) {
      out = out.replace(new RegExp("(" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig"), "<mark>$1</mark>");
    }
    return out;
  };

  const render = (query) => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) {
      results.innerHTML = "";
      count.textContent = "";
      return;
    }
    const hits = index
      .map((doc) => ({ doc, s: score(doc, terms) }))
      .filter((h) => h.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 30);

    count.textContent = "// " + (hits.length ? hits.length + " result" + (hits.length === 1 ? "" : "s") : "No results — try fewer or broader terms");

    results.innerHTML = hits
      .map(({ doc }) => {
        const meta = [doc.type, doc.date].filter(Boolean).join(" · ");
        return (
          '<article class="card card--result">' +
          '<div class="card__meta"><span>' + escapeHtml(meta) + "</span></div>" +
          '<h2 class="card__title card__title--sm"><a href="' + doc.url + '">' + escapeHtml(doc.title) + "</a></h2>" +
          '<p class="card__excerpt">' + snippet(doc, terms) + "</p>" +
          "</article>"
        );
      })
      .join("");
  };

  let timer;
  input.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      await load();
      if (index) render(input.value);
    }, 120);
  });

  // Submitting the form just re-runs the search without a page load.
  input.form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await load();
    if (index) render(input.value);
    const url = new URL(window.location);
    if (input.value) url.searchParams.set("q", input.value); else url.searchParams.delete("q");
    history.replaceState(null, "", url);
  });

  // Honour ?q= on arrival.
  const initial = new URLSearchParams(window.location.search).get("q");
  if (initial) {
    input.value = initial;
    load().then(() => { if (index) render(initial); });
  } else {
    // Warm the index so the first keystroke feels instant.
    load();
  }
})();
