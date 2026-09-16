/* Progressive enhancement. No cookies, storage, third-party scripts, or network analytics. */
(() => {
'use strict';
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
$$('[data-media]').forEach((container) => {
const image = $('img', container);
if (!image) return;
const update = () => container.classList.toggle('loaded', image.complete && image.naturalWidth > 0);
image.addEventListener('load', update);
image.addEventListener('error', () => container.classList.remove('loaded'));
update();
});
const toggle = $('#menu-toggle');
const mobileNav = $('#mobile-nav');
const closeMenu = (restoreFocus = false) => {
if (!toggle || !mobileNav) return;
toggle.setAttribute('aria-expanded', 'false');
toggle.setAttribute('aria-label', 'Open navigation');
mobileNav.hidden = true;
if (restoreFocus) toggle.focus();
};
if (toggle && mobileNav) {
toggle.hidden = false;
toggle.addEventListener('click', () => {
const open = toggle.getAttribute('aria-expanded') !== 'true';
toggle.setAttribute('aria-expanded', String(open));
toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
mobileNav.hidden = !open;
});
$$('a', mobileNav).forEach((link) => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', (event) => {
if (event.key === 'Escape' && !mobileNav.hidden) closeMenu(true);
});
document.addEventListener('click', (event) => {
if (!mobileNav.hidden && !mobileNav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
});
matchMedia('(min-width: 961px)').addEventListener('change', (event) => {
if (event.matches) closeMenu();
});
}
const fitForm = $('#fit-form');
if (fitForm) {
const result = $('#fit-result');
const heading = $('#fit-result-title');
const copy = $('#fit-result-copy');
const reset = $('#fit-reset');
fitForm.addEventListener('submit', (event) => {
event.preventDefault();
const values = new FormData(fitForm);
const type = values.get('bottle-type');
const size = values.get('bottle-size');
let title, text, state;
if (type === 'other') {
title = 'Designed for roll-on bottles, not this format.';
text = 'That BARR is designed to hold compatible roll-on bottles. Sprays, pumps and squeeze tubes are outside its published intended use. Check the product listing before purchasing.';
state = 'unknown';
} else if (type === 'unsure' || size === 'unsure') {
title = 'Check the bottle label first.';
text = 'Look for a roll-on applicator and a size of 2.5–3 oz on the label. The published size range does not verify the fit of a particular bottle shape. Compare your exact bottle with the product listing before buying.';
state = 'unknown';
} else if (size === 'other') {
title = 'Outside the published 2.5–3 oz fit range.';
text = 'Compatibility with this bottle size is not confirmed. Do not assume it will fit or force it into the holder. Check your exact bottle with the seller before buying.';
state = 'unknown';
} else {
title = 'Within the published size range—not a confirmed fit.';
text = 'This matches the published roll-on format and 2.5–3 oz range. Bottle shape still matters, and most does not mean all. Check your exact bottle before purchasing and confirm that it seats securely before each use.';
state = 'range';
}
heading.textContent = title;
copy.textContent = text;
result.dataset.state = state;
result.hidden = false;
reset.hidden = false;
result.focus({ preventScroll: true });
});
fitForm.addEventListener('change', () => { result.hidden = true; reset.hidden = true; });
reset.addEventListener('click', () => {
fitForm.reset(); result.hidden = true; reset.hidden = true;
$('input[name="bottle-type"]', fitForm).focus();
});
}
const dialog = $('#privacy-dialog');
if (dialog && typeof dialog.showModal === 'function') {
$$('[data-open-privacy]').forEach((link) => link.addEventListener('click', (event) => {
event.preventDefault(); dialog.showModal();
}));
$$('[data-close-privacy]', dialog).forEach((button) => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', (event) => {
if (event.target === dialog) {
const r = dialog.getBoundingClientRect();
if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
}
});
}
$$('[data-purchase]').forEach((link) => link.addEventListener('click', () => {
window.dispatchEvent(new CustomEvent('thatbarr:outbound', {
detail: { location: link.dataset.purchase, destination: 'amazon', path: location.pathname }
}));
}));
})();
