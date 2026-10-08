(() => {
  const image = document.getElementById('product-image');
  const panel = document.getElementById('library-panel');
  const zoom = document.getElementById('screen-zoom');
  let viewLabel = '书库';
  function wireTabs(list, activate) {
    const tabs = [...list.querySelectorAll('[role="tab"]')];
    function select(tab) {
      tabs.forEach(item => {
        const selected = item === tab;
        item.setAttribute('aria-selected', String(selected));
        item.tabIndex = selected ? 0 : -1;
      });
      activate(tab);
    }
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => select(tab));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next === undefined) return;
        event.preventDefault(); select(tabs[next]); tabs[next].focus();
      });
    });
  }
  wireTabs(document.querySelector('.view-tabs'), tab => {
    image.src = tab.dataset.view;
    viewLabel = tab.dataset.label;
    image.alt = `Margin 真实界面：${viewLabel}，使用原创示例 PDF`;
    panel.setAttribute('aria-labelledby', tab.id);
    zoom.setAttribute('aria-label', `放大${viewLabel}界面`);
  });
  wireTabs(document.querySelector('.explanation-tabs'), tab => {
    document.getElementById('translation').hidden = tab.id !== 'tab-translation';
    document.getElementById('structure').hidden = tab.id !== 'tab-structure';
  });
  const selection = document.getElementById('selected-sentence');
  selection.addEventListener('click', () => {
    const expanded = selection.getAttribute('aria-expanded') !== 'true';
    selection.setAttribute('aria-expanded', String(expanded));
    document.getElementById('explanation').hidden = !expanded;
  });
  const viewer = document.getElementById('image-viewer');
  const fullImage = document.getElementById('full-image');
  const close = document.getElementById('close-viewer');
  zoom.addEventListener('click', () => {
    fullImage.src = image.src; fullImage.alt = image.alt;
    document.getElementById('viewer-title').textContent = viewLabel;
    viewer.showModal(); close.focus();
  });
  close.addEventListener('click', () => viewer.close());
  let backdrop = false;
  viewer.addEventListener('pointerdown', event => { backdrop = event.target === viewer; });
  viewer.addEventListener('click', event => { if (backdrop && event.target === viewer) viewer.close(); });
  viewer.addEventListener('close', () => { fullImage.removeAttribute('src'); zoom.focus({ preventScroll: true }); });
})();
