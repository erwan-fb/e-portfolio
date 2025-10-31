document.addEventListener("DOMContentLoaded", () => {
  const screen_overlay = document.getElementById("screen_overlay");
  let n = 50;
  let thickness = 1;
  for (i=1; i<n; i++){
    screen_overlay.innerHTML += `<div class="stripe" style="height:${thickness}px"></div>`
  }
  screen_overlay.style.gap = `calc((100vh - ${thickness}px) / ${n})`
})