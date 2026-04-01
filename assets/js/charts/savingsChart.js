function buildSavingsChart() {
  const months = getAllMonths().slice(0, 6).reverse();
  const labels = months.map((month) => MONTHS[parseInt(month.split("-")[1], 10) - 1]);
  const rates = months.map((month) => {
    const summary = calcSummary(getMonthTxs(month));
    return summary.income > 0 ? Math.round((summary.net / summary.income) * 100) : 0;
  });

  if (savingsChartInst) {
    savingsChartInst.destroy();
  }

  const context = document.getElementById("savingsRateChart").getContext("2d");
  savingsChartInst = new Chart(context, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Savings Rate %",
        data: rates,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.1)",
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: "#3b82f6",
        fill: true,
        tension: 0.4
      }]
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
            callback: (value) => value + "%"
          }
        }
      }
    }
  });
}
