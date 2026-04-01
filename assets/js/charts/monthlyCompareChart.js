function buildMonthlyCompareChart() {
  const months = getAllMonths().slice(0, 6).reverse();
  const labels = months.map((month) => MONTHS[parseInt(month.split("-")[1], 10) - 1]);
  const incomes = months.map((month) => calcSummary(getMonthTxs(month)).income);
  const expenses = months.map((month) => calcSummary(getMonthTxs(month)).expenses);

  if (monthlyChartInst) {
    monthlyChartInst.destroy();
  }

  const context = document.getElementById("monthlyCompareChart").getContext("2d");
  monthlyChartInst = new Chart(context, {
    type: "bar",
    data: {
      labels,
      datasets: [
        { label: "Income", data: incomes, backgroundColor: "rgba(16,185,129,0.75)", borderRadius: 5 },
        { label: "Expenses", data: expenses, backgroundColor: "rgba(239,68,68,0.75)", borderRadius: 5 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: isDark() ? "#64748b" : "#94a3b8", font: { size: 11 } }
        },
        y: {
          grid: { color: isDark() ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" },
          ticks: {
            color: isDark() ? "#64748b" : "#94a3b8",
            font: { size: 11 },
            callback: (value) => "$" + (value / 1000).toFixed(0) + "k"
          }
        }
      }
    }
  });
}
