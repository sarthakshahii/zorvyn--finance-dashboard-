function getMonthTxs(month) {
  return state.transactions.filter((transaction) => transaction.date.startsWith(month));
}

function calcSummary(transactions) {
  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const expenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  return { income, expenses, net: income - expenses };
}

function getAllMonths() {
  const months = new Set(state.transactions.map((transaction) => transaction.date.substring(0, 7)));
  return [...months].sort().reverse();
}

function getLatestMonth() {
  return getAllMonths()[0] || "2024-06";
}

function getPrevMonth(month) {
  const [year, monthIndex] = month.split("-").map(Number);
  const date = new Date(year, monthIndex - 2, 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function isDark() {
  return state.darkMode;
}
