function openModal(id) {
  state.editingId = id || null;
  document.getElementById("modalTitle").textContent = id ? "Edit Transaction" : "Add Transaction";

  if (id) {
    const transaction = state.transactions.find((item) => item.id === id);
    if (transaction) {
      document.getElementById("f_description").value = transaction.description;
      document.getElementById("f_amount").value = transaction.amount;
      document.getElementById("f_type").value = transaction.type;
      document.getElementById("f_category").value = transaction.category;
      document.getElementById("f_date").value = transaction.date;
    }
  } else {
    document.getElementById("f_description").value = "";
    document.getElementById("f_amount").value = "";
    document.getElementById("f_type").value = "expense";
    document.getElementById("f_category").value = "Food";
    document.getElementById("f_date").value = new Date().toISOString().substring(0, 10);
  }

  document.getElementById("modal").classList.add("open");
}

function closeModal() {
  state.editingId = null;
  document.getElementById("modal").classList.remove("open");
}

function saveTransaction() {
  const description = document.getElementById("f_description").value.trim();
  const amount = parseFloat(document.getElementById("f_amount").value);
  const type = document.getElementById("f_type").value;
  const category = document.getElementById("f_category").value;
  const date = document.getElementById("f_date").value;

  if (!description || Number.isNaN(amount) || amount <= 0 || !date) {
    showToast("Please fill all fields correctly", "#ef4444");
    return;
  }

  if (state.editingId) {
    const index = state.transactions.findIndex((transaction) => transaction.id === state.editingId);
    if (index !== -1) {
      state.transactions[index] = {
        ...state.transactions[index],
        description,
        amount,
        type,
        category,
        date
      };
    }
    showToast("Transaction updated!");
  } else {
    const newId = Math.max(0, ...state.transactions.map((transaction) => transaction.id)) + 1;
    state.transactions.unshift({ id: newId, date, description, amount, type, category });
    showToast("Transaction added!");
  }

  closeModal();
  saveState();
  refresh();
}

function editTx(id) {
  openModal(id);
}

function deleteTx(id) {
  if (!confirm("Delete this transaction?")) {
    return;
  }

  state.transactions = state.transactions.filter((transaction) => transaction.id !== id);
  state.editingId = null;
  saveState();
  refresh();
  showToast("Transaction deleted", "#ef4444");
}
