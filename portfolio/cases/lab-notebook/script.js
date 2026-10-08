const viewer = document.querySelector('#viewer');
const image = document.querySelector('#full-image');
let opener;
document.querySelectorAll('[data-image]').forEach(button => {
  button.addEventListener('click', () => {
    opener = button;
    image.src = button.dataset.image;
    image.alt = button.querySelector('img').alt;
    viewer.showModal();
  });
});
document.querySelector('.close').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });
viewer.addEventListener('close', () => opener?.focus());
const motion = document.querySelector('.motion-toggle');
motion?.addEventListener('click', () => {
  const paused = document.body.classList.toggle('motion-paused');
  motion.setAttribute('aria-pressed', String(paused));
  motion.setAttribute('aria-label', paused ? '播放页面动效' : '暂停页面动效');
  motion.textContent = paused ? '▷ 动效' : 'Ⅱ 动效';
});
