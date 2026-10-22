const carousel = document.querySelector('.hero-carousel');
const slides = carousel.querySelectorAll('img');
const title = document.querySelector('.hero-title');
const category = document.querySelector('.hero-category');
const pauseButton = document.querySelector('.carousel-pause');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let current = 0;
let paused = reducedMotion.matches;
let timer;
function updateButton() {
  pauseButton.textContent = paused ? 'Reproducir ▶' : 'Pausar ⏸';
  pauseButton.setAttribute('aria-label', paused ? 'Reproducir carrusel' : 'Pausar carrusel');
}
function advance() {
  current = (current + 1) % slides.length;
  carousel.classList.toggle('show-next', current === 1);
  slides.forEach((slide, index) => slide.setAttribute('aria-hidden', String(index !== current)));
  title.textContent = current === 0 ? '01 / Luz de hogar' : '02 / Color y materia';
  category.textContent = current === 0 ? 'Interiores' : 'Textiles';
}
function schedule() {
  clearInterval(timer);
  if (!paused && !document.hidden) timer = setInterval(advance, 4500);
}
pauseButton.addEventListener('click', () => { paused = !paused; updateButton(); schedule(); });
document.addEventListener('visibilitychange', schedule);
reducedMotion.addEventListener('change', event => { paused = event.matches; updateButton(); schedule(); });
updateButton();
schedule();
