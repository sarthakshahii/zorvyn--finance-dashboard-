function buildTrendChart() {
  const months = getAllMonths().slice(0, 6).reverse();
  const labels = months.map((month) => {
    const [year, monthNumber] = month.split("-");
    return `${MONTHS[parseInt(monthNumber, 10) - 1]} ${year.slice(2)}`;
  });

  const incomes = [];
  const expenses = [];
  const balances = [];
  let runningBalance = 0;

  months.forEach((month) => {
    const summary = calcSummary(getMonthTxs(month));
    incomes.push(summary.income);
    expenses.push(summary.expenses);
    runningBalance += summary.net;
    balances.push(runningBalance);
  });

  if (trendChartInst) {
    trendChartInst.destroy();
  }

  const context = document.getElementById("trendChart").getContext("2d");
  trendChartInst = new Chart(context, {
    data: {
      labels,
      datasets: [
        {
          type: "line",
          label: "Balance",
          data: balances,
          yAxisID: "y2",
          borderColor: "#f59e0b",
          backgroundColor: "rgba(245,158,11,0.08)",
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: "#f59e0b",
          fill: true,
          tension: 0.4
        },
        {
          type: "bar",
          label: "Income",
          data: incomes,
          backgroundColor: "rgba(16,185,129,0.7)",
          borderRadius: 4
        },
        {
          type: "bar",
          label: "Expenses",
          data: expenses,
          backgroundColor: "rgba(239,68,68,0.7)",
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          grid: { color: isDark() ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" },
          ticks: { color: isDark() ? "#64748b" : "#94a3b8", font: { size: 11 } }
        },
        y: {
          grid: { color: isDark() ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" },
          ticks: {
            color: isDark() ? "#64748b" : "#94a3b8",
            font: { size: 11 },
            callback: (value) => "$" + (value / 1000).toFixed(0) + "k"
          }
        },
        y2: {
          position: "right",
          grid: { display: false },
          ticks: {
            color: "#f59e0b",
            font: { size: 11 },
            callback: (value) => "$" + (value / 1000).toFixed(1) + "k"
          }
        }
      }
    }
  });
}
