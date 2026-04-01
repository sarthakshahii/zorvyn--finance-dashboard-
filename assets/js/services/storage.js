function loadState() {
  try {
    const saved = localStorage.getItem("ledger_state");
    if (saved) {
      const parsed = JSON.parse(saved);
      state.transactions = parsed.transactions || DEFAULT_TXS;
      state.darkMode = parsed.darkMode !== undefined ? parsed.darkMode : true;
      state.role = parsed.role || "admin";
    } else {
      state.transactions = [...DEFAULT_TXS];
    }
  } catch (error) {
    state.transactions = [...DEFAULT_TXS];
  }
}

function saveState() {
  try {
    localStorage.setItem(
      "ledger_state",
      JSON.stringify({
        transactions: state.transactions,
        darkMode: state.darkMode,
        role: state.role
      })
    );
  } catch (error) {
  }
}
