import { animate } from 'animejs';

(function () {
  'use strict';
  var html = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function init() {
    if (reduce) return;

    // ---- Scroll reveals (IntersectionObserver drives smooth entrance below the fold) ----
    function revealEl(el, params) {
      // A tall element (a long article, for example) may never reach 12% of
      // its own height inside the viewport, so fall back to "any part visible".
      var tall = el.getBoundingClientRect().height > window.innerHeight * 0.9;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            io.unobserve(el);
            animate(el, params);
          }
        });
      }, { threshold: tall ? 0 : 0.1, rootMargin: '0px 0px -4% 0px' });
      io.observe(el);
    }

    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      if (el.closest('.hero') || el.closest('.marquee')) return;
      revealEl(el, { opacity: [0, 1], translateY: [20, 0], duration: 600, ease: 'outQuad' });
    });

    // ---- Footer language control ----
    document.querySelectorAll('.lang-control').forEach(function (group) {
      group.querySelectorAll('button').forEach(function (btn) {
        btn.addEventListener('click', function () {
          group.querySelectorAll('button').forEach(function (b) { b.classList.remove('on'); });
          btn.classList.add('on');
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
