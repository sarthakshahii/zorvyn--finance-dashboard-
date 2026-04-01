function buildCategoryChart() {
  const latestMonth = getLatestMonth();
  const expenses = getMonthTxs(latestMonth).filter((transaction) => transaction.type === "expense");
  const categoryTotals = {};

  expenses.forEach((transaction) => {
    categoryTotals[transaction.category] = (categoryTotals[transaction.category] || 0) + transaction.amount;
  });

  const sorted = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
  const labels = sorted.map(([label]) => label);
  const data = sorted.map(([, value]) => value);
  const colors = labels.map((label) => catColors[label] || "#888");

  if (categoryChartInst) {
    categoryChartInst.destroy();
  }

  const context = document.getElementById("categoryChart").getContext("2d");
  categoryChartInst = new Chart(context, {
    type: "doughnut",
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: colors,
        borderWidth: 2,
        borderColor: isDark() ? "#131c2e" : "#fff",
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "68%",
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => " $" + context.raw.toLocaleString()
          }
        }
      }
    }
  });

  document.getElementById("categoryLegend").innerHTML = labels
    .map((label, index) => `<div class="legend-item"><div class="legend-dot" style="background:${colors[index]};"></div>${label}</div>`)
    .join("");
}

function rebuildCharts() {
  setTimeout(() => {
    buildTrendChart();
    buildCategoryChart();
    if (document.getElementById("monthlyCompareChart")) {
      buildMonthlyCompareChart();
    }
    if (document.getElementById("savingsRateChart")) {
      buildSavingsChart();
    }
  }, 50);
}
