function applyTheme() {
  if (state.darkMode) {
    document.body.classList.remove("light");
  } else {
    document.body.classList.add("light");
  }
}

function toggleTheme() {
  state.darkMode = !state.darkMode;
  applyTheme();
  saveState();
  rebuildCharts();
}
