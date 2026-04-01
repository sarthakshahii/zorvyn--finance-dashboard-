function exportData(format) {
  const transactions = getFilteredTxs();

  if (format === "csv") {
    const header = "Date,Description,Category,Type,Amount";
    const rows = transactions.map((transaction) => `${transaction.date},"${transaction.description}",${transaction.category},${transaction.type},${transaction.amount}`);
    download("transactions.csv", [header, ...rows].join("\n"), "text/csv");
  } else {
    download("transactions.json", JSON.stringify(transactions, null, 2), "application/json");
  }

  showToast("Export downloaded!");
}

function download(filename, content, type) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([content], { type }));
  link.download = filename;
  link.click();
}
