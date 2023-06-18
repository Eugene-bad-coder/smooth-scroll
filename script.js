"use strict";
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('[data-anchor]').forEach(function (item) {
    item.addEventListener('click', function (e) {
      let targetId = this.getAttribute('href') || '#' + this.getAttribute('data-anchor');
      if (!targetId) return;
      e.preventDefault();
      doScrolling(document.querySelector(targetId).getBoundingClientRect().top + window.scrollY, 0.5);
    })
  })
});

function doScrolling(elementY, speed) {
  let startingY = window.scrollY;
  let diff = elementY - startingY;
  if (diff == 0)
    return
  let start;
  let duration = Math.abs(speed * diff);
  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    let time = timestamp - start;
    let percent = Math.min(time / duration, 1);
    window.scrollTo(0, startingY + diff * percent);
    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  })
};