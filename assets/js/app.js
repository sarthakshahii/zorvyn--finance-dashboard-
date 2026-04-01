function refresh() {
  updateSummaryCards();
  buildTrendChart();
  buildCategoryChart();
  renderRecentTx();
  populateFilters();

  if (document.getElementById("section-transactions").classList.contains("active")) {
    renderTxTable();
  }

  if (document.getElementById("section-insights").classList.contains("active")) {
    renderInsights();
  }
}

function init() {
  loadState();
  applyTheme();
  document.getElementById("roleSelect").value = state.role;
  switchRole(state.role);

  document.getElementById("currentMonth").textContent = "";
  updateSummaryCards();

  setTimeout(() => {
    buildTrendChart();
    buildCategoryChart();
    renderRecentTx();
  }, 100);

  document.getElementById("modal").addEventListener("click", function onModalClick(event) {
    if (event.target === this) {
      closeModal();
    }
  });
}

window.addEventListener("load", init);
