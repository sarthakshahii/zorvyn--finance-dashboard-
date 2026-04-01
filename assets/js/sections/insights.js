function renderInsights() {
  const latestMonth = getLatestMonth();
  const previousMonth = getPrevMonth(latestMonth);
  const expenses = state.transactions.filter((transaction) => transaction.type === "expense");
  const categoryTotals = {};

  expenses.forEach((transaction) => {
    categoryTotals[transaction.category] = (categoryTotals[transaction.category] || 0) + transaction.amount;
  });

  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
  const currentStats = calcSummary(getMonthTxs(latestMonth));
  const previousStats = calcSummary(getMonthTxs(previousMonth));
  const savingsRate = currentStats.income > 0 ? Math.round((currentStats.net / currentStats.income) * 100) : 0;
  const averageMonthlyExpense = Math.round(
    expenses.reduce((sum, transaction) => sum + transaction.amount, 0) / Math.max(1, getAllMonths().length)
  );

  const expenseDelta = previousStats.expenses > 0
    ? ((currentStats.expenses - previousStats.expenses) / previousStats.expenses * 100).toFixed(1)
    : 0;
  const incomeDelta = previousStats.income > 0
    ? ((currentStats.income - previousStats.income) / previousStats.income * 100).toFixed(1)
    : 0;

  const cards = [
    { icon: "🏆", label: "Top Spending Category", value: topCategory ? topCategory[0] : "N/A", desc: topCategory ? `$${topCategory[1].toLocaleString()} total spent` : "" },
    { icon: "💸", label: "Savings Rate", value: savingsRate + "%", desc: `Saving ${savingsRate}% of monthly income` },
    { icon: "📊", label: "Avg Monthly Spend", value: fmt(averageMonthlyExpense), desc: "Average over all tracked months" },
    { icon: "📈", label: "Income Change", value: (incomeDelta > 0 ? "+" : "") + incomeDelta + "%", desc: "vs. previous month" },
    { icon: "📉", label: "Expense Change", value: (expenseDelta > 0 ? "+" : "") + expenseDelta + "%", desc: "vs. previous month" },
    { icon: "🎯", label: "Net This Month", value: fmt(currentStats.net), desc: currentStats.net >= 0 ? "Positive cash flow" : "Negative cash flow - review expenses" }
  ];

  document.getElementById("insightsGrid").innerHTML = cards
    .map((card) => `
      <div class="insight-card">
        <div class="insight-icon">${card.icon}</div>
        <div class="insight-label">${card.label}</div>
        <div class="insight-value">${card.value}</div>
        <div class="insight-desc">${card.desc}</div>
      </div>
    `)
    .join("");

  buildMonthlyCompareChart();
  buildSavingsChart();
  renderHeatmap();
}

function renderHeatmap() {
  const months = getAllMonths().slice(0, 6).reverse();
  const categories = [...new Set(state.transactions.filter((transaction) => transaction.type === "expense").map((transaction) => transaction.category))].sort();

  if (!categories.length || !months.length) {
    return;
  }

  const maxValue = Math.max(
    ...months.flatMap((month) =>
      categories.map((category) =>
        getMonthTxs(month)
          .filter((transaction) => transaction.type === "expense" && transaction.category === category)
          .reduce((sum, transaction) => sum + transaction.amount, 0)
      )
    )
  );

  let html = '<table style="border-collapse:collapse;font-size:12px;min-width:500px;">';
  html += '<tr><th style="padding:8px 12px;text-align:left;color:var(--text-muted);font-weight:400;border-bottom:1px solid var(--border);">Category</th>';

  months.forEach((month) => {
    const [, monthNumber] = month.split("-");
    html += `<th style="padding:8px 12px;color:var(--text-muted);font-weight:400;border-bottom:1px solid var(--border);">${MONTHS[parseInt(monthNumber, 10) - 1]}</th>`;
  });

  html += "</tr>";

  categories.forEach((category) => {
    html += `<tr><td style="padding:8px 12px;color:var(--text-secondary);border-bottom:1px solid var(--border);white-space:nowrap;">${category}</td>`;

    months.forEach((month) => {
      const value = getMonthTxs(month)
        .filter((transaction) => transaction.type === "expense" && transaction.category === category)
        .reduce((sum, transaction) => sum + transaction.amount, 0);
      const intensity = maxValue > 0 ? value / maxValue : 0;
      const color = catColors[category] || "#888";
      const background = value > 0 ? color + Math.round(intensity * 0.7 * 255).toString(16).padStart(2, "0") : "transparent";

      html += `<td style="padding:8px 12px;text-align:right;background:${background};border-bottom:1px solid var(--border);border-radius:4px;color:var(--text-primary);">${value > 0 ? "$" + value.toLocaleString() : "—"}</td>`;
    });

    html += "</tr>";
  });

  html += "</table>";
  document.getElementById("heatmap").innerHTML = html;
}
