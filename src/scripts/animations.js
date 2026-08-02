import { animate, createTimeline, stagger, set } from 'animejs';

(function () {
  'use strict';
  var html = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function bail() { html.classList.remove('js'); }

  function splitWords(el) {
    Array.prototype.slice.call(el.childNodes).forEach(function (n) {
      if (n.nodeType === 3) {
        var t = n.nodeValue;
        if (!t || !t.trim()) return;
        var f = document.createDocumentFragment();
        t.split(/(\s+)/).forEach(function (p) {
          if (p === '') return;
          if (/^\s+$/.test(p)) { f.appendChild(document.createTextNode(p)); return; }
          var o = document.createElement('span'); o.className = 'w';
          var i = document.createElement('span'); i.className = 'w-i';
          i.textContent = p; o.appendChild(i); f.appendChild(o);
        });
        el.replaceChild(f, n);
      } else if (n.nodeType === 1 && n.tagName !== 'BR') splitWords(n);
    });
  }

  function init() {
    window.__animOK = true;
    if (reduce) { bail(); return; }

    // Safety: reveal everything if animations never advance.
    setTimeout(function () {
      var probe = document.querySelector('.hero-title .w-i');
      var op = probe ? parseFloat(getComputedStyle(probe).opacity) : 1;
      if (op < 0.05) {
        bail();
        document.querySelectorAll('[data-reveal],[data-words],[data-words] .w-i').forEach(function (el) {
          el.style.removeProperty('transform');
          el.style.opacity = '1';
          el.style.visibility = 'inherit';
        });
      }
    }, 1600);

    document.querySelectorAll('[data-words]').forEach(splitWords);
    set('[data-words]', { opacity: 1 });
    set('.w-i', { opacity: 0 });

    // ---- HERO entrance ----
    var heroTl = createTimeline({ defaults: { ease: 'outExpo', duration: 800 } });
    heroTl
      .add('.badges', { opacity: [0, 1], translateY: [14, 0], duration: 500 })
      .add('.hero-title .w-i', { opacity: [0, 1], translateY: ['90%', '0%'], rotateX: [-25, 0], transformOrigin: ['0% 100%', '0% 100%'], delay: stagger(40), duration: 950 }, '-=300')
      .add('.hero-deck', { opacity: [0, 1], translateY: [20, 0], duration: 650 }, '-=550')
      .add('.hero-ctas', { opacity: [0, 1], translateY: [16, 0], duration: 500 }, '-=400')
      .add('.hero-proof', { opacity: [0, 1], translateY: [14, 0], duration: 500 }, '-=350');

    // ---- Scroll reveals (IntersectionObserver drives anime) ----
    function revealEl(el, params) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { io.unobserve(el); animate(el, params); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
      io.observe(el);
    }
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      if (el.closest('.hero') || el.closest('.marquee')) return;
      revealEl(el, { opacity: [0, 1], translateY: [26, 0], duration: 700, ease: 'outQuad' });
    });

    // ---- Education mega menu (click toggle; CSS handles hover) ----
    document.querySelectorAll('[data-mega]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var li = btn.closest('li');
        var open = li.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
    document.addEventListener('click', function () {
      document.querySelectorAll('.nav-links li.open').forEach(function (li) {
        li.classList.remove('open');
        var b = li.querySelector('[data-mega]');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
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

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
