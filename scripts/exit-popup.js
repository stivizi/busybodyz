let exitPopupShown = false;
document.addEventListener('mouseleave', function(e) {
  if (e.clientY < 50 && !exitPopupShown) {
    document.getElementById('exit-popup').style.display = 'flex';
    exitPopupShown = true;
  }
});
document.getElementById('close-exit-popup').onclick = function() {
  document.getElementById('exit-popup').style.display = 'none';
};
