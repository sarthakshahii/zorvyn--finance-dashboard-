function showSection(name, element) {
  document.querySelectorAll(".section").forEach((section) => section.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("active"));

  document.getElementById(`section-${name}`).classList.add("active");
  if (element) {
    element.classList.add("active");
  }

  const titles = {
    dashboard: "Overview",
    transactions: "Transactions",
    insights: "Insights"
  };

  document.getElementById("pageTitle").textContent = titles[name] || name;

  if (name === "transactions") {
    populateFilters();
    renderTxTable();
  }

  if (name === "insights") {
    renderInsights();
  }

  if (window.innerWidth < 900) {
    closeSidebar();
  }
}

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("open");
  document.getElementById("sidebarOverlay").classList.toggle("open");
}

function closeSidebar() {
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("sidebarOverlay").classList.remove("open");
}
