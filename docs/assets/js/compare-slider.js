(function () {
  'use strict';

  var GRIP =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>' +
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>';

  function init() {
    document.querySelectorAll('.compare-slider').forEach(setup);
  }

  function setup(slider) {
    if (slider.dataset.compareInit) {
      return;
    }
    slider.dataset.compareInit = 'true';

    var imgs = slider.querySelectorAll('img');
    var base = imgs[0];
    var overlay = imgs[1];

    if (!base && !overlay) {
      return;
    }

    imgs.forEach(function (img) {
      img.draggable = false;
    });

    if (base) {
      base.classList.add('compare-base');
    }
    if (overlay) {
      overlay.classList.add('compare-overlay');
    }

    addLabel(slider, slider.dataset.leftLabel, 'compare-label-left');
    addLabel(slider, slider.dataset.rightLabel, 'compare-label-right');

    var handle = document.createElement('span');
    handle.className = 'compare-handle';
    handle.setAttribute('aria-hidden', 'true');
    var grip = document.createElement('span');
    grip.className = 'compare-grip';
    grip.innerHTML = GRIP;
    handle.appendChild(grip);
    slider.appendChild(handle);

    var baseOk = !base || !(base.complete && base.naturalWidth === 0);
    var overlayOk = !overlay || !(overlay.complete && overlay.naturalWidth === 0);

    function degrade() {
      if (!baseOk && !overlayOk) {
        slider.style.display = 'none';
        return;
      }
      slider.classList.add('compare-static');
      slider
        .querySelectorAll('.compare-handle, .compare-label, .compare-range')
        .forEach(function (el) {
          el.remove();
        });
      if (!baseOk) {
        if (base) {
          base.remove();
        }
        if (overlay) {
          overlay.classList.remove('compare-overlay');
          overlay.classList.add('compare-base');
        }
      } else if (!overlayOk && overlay) {
        overlay.remove();
      }
    }

    if (base) {
      base.addEventListener('error', function () {
        baseOk = false;
        degrade();
      });
    }
    if (overlay) {
      overlay.addEventListener('error', function () {
        overlayOk = false;
        degrade();
      });
    }

    if (!baseOk || !overlayOk) {
      degrade();
    }

    var range = slider.querySelector('.compare-range');
    if (range && !slider.classList.contains('compare-static')) {
      var apply = function () {
        slider.style.setProperty('--pos', range.value + '%');
        range.setAttribute('aria-valuetext', range.value + '%');
      };
      range.addEventListener('input', apply);
      apply();
    }
  }

  function addLabel(slider, text, position) {
    if (!text) {
      return;
    }
    var label = document.createElement('span');
    label.className = 'compare-label ' + position;
    label.textContent = text;
    slider.appendChild(label);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();