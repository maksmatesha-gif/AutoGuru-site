document.addEventListener('DOMContentLoaded', () => {
  // Before/After slider
  const slider = document.getElementById('baSlider');
  const handle = document.getElementById('baHandle');
  const after = slider?.querySelector('.ba__after');

  if (slider && handle && after) {
    let dragging = false;

    const update = (clientX) => {
      const rect = slider.getBoundingClientRect();
      let x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const pct = (x / rect.width) * 100;
      handle.style.left = pct + '%';
      after.style.clipPath = `inset(0 0 0 ${pct}%)`;
    };

    const start = (e) => { dragging = true; e.preventDefault(); };
    const move = (e) => {
      if (!dragging) return;
      update(e.touches ? e.touches[0].clientX : e.clientX);
    };
    const stop = () => { dragging = false; };

    handle.addEventListener('mousedown', start);
    handle.addEventListener('touchstart', start, { passive: false });
    slider.addEventListener('mousedown', (e) => { dragging = true; update(e.clientX); });
    slider.addEventListener('touchstart', (e) => {
      dragging = true;
      update(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move, { passive: true });
    window.addEventListener('mouseup', stop);
    window.addEventListener('touchend', stop);
  }

  // Case switcher
  const cases = [
    {
      before: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=1000&q=80',
      after: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1000&q=80',
      caption: '<strong>BMW X5</strong> · рихтовка крыла + покраска · 3 дня · 420 BYN'
    },
    {
      before: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000&q=80',
      after: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=1000&q=80',
      caption: '<strong>Audi A6</strong> · покраска бампера + полировка · 2 дня · 280 BYN'
    },
    {
      before: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1000&q=80',
      after: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1000&q=80',
      caption: '<strong>Toyota Camry</strong> · PDR + локальная покраска · 1 день · 190 BYN'
    }
  ];

  const caption = document.getElementById('baCaption');
  const beforeImg = document.querySelector('.ba__before img');
  const afterImg = document.querySelector('.ba__after img');

  document.querySelectorAll('.ba__tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const i = +tab.dataset.i;
      document.querySelectorAll('.ba__tab').forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      if (cases[i] && beforeImg && afterImg) {
        beforeImg.src = cases[i].before;
        afterImg.src = cases[i].after;
        if (caption) caption.innerHTML = cases[i].caption;
        if (handle && after) {
          handle.style.left = '50%';
          after.style.clipPath = 'inset(0 0 0 50%)';
        }
      }
    });
  });
});
