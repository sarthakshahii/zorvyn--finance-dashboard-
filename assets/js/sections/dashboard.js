function setChange(id, currentValue, previousValue, goodIfUp) {
  const element = document.getElementById(id);
  if (!previousValue || previousValue === 0) {
    element.textContent = "-";
    return;
  }

  const percentage = ((currentValue - previousValue) / Math.abs(previousValue) * 100).toFixed(1);
  const isUp = currentValue >= previousValue;
  element.className = "card-change " + ((isUp === goodIfUp) ? "up" : "down");
  element.textContent = (isUp ? "↑ " : "↓ ") + Math.abs(percentage) + "%";
}

function updateSummaryCards() {
  const latestMonth = getLatestMonth();
  const previousMonth = getPrevMonth(latestMonth);
  const currentSummary = calcSummary(getMonthTxs(latestMonth));
  const previousSummary = calcSummary(getMonthTxs(previousMonth));
  const balance = state.transactions.reduce(
    (sum, transaction) => (transaction.type === "income" ? sum + transaction.amount : sum - transaction.amount),
    0
  );

  document.getElementById("totalBalance").textContent = fmt(balance);
  document.getElementById("totalIncome").textContent = fmt(currentSummary.income);
  document.getElementById("totalExpenses").textContent = fmt(currentSummary.expenses);
  document.getElementById("netSavings").textContent = fmt(currentSummary.net);

  setChange("incomeChange", currentSummary.income, previousSummary.income, true);
  setChange("expensesChange", currentSummary.expenses, previousSummary.expenses, false);
  setChange("savingsChange", currentSummary.net, previousSummary.net, true);

  const [year, month] = latestMonth.split("-");
  document.getElementById("currentMonth").textContent = `${MONTHS[parseInt(month, 10) - 1]} ${year}`;
}

function renderRecentTx() {
  const tbody = document.querySelector("#recentTxTable tbody");
  const recent = [...state.transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  if (!recent.length) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;padding:20px;color:var(--text-muted);">No transactions</td></tr>';
    return;
  }

  tbody.innerHTML = recent
    .map((transaction) => `
      <tr>
        <td style="color:var(--text-muted);">${formatDate(transaction.date)}</td>
        <td>${transaction.description}</td>
        <td><span class="category-badge cat-${transaction.category.toLowerCase()}">${transaction.category}</span></td>
        <td class="tx-amount ${transaction.type}">${transaction.type === "income" ? "+" : "-"}${fmt(transaction.amount)}</td>
      </tr>
    `)
    .join("");
}
