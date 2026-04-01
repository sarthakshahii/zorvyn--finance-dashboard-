function getFilteredTxs() {
  const filters = state.filters;
  return state.transactions.filter((transaction) => {
    const term = filters.search.toLowerCase();

    if (
      filters.search &&
      !transaction.description.toLowerCase().includes(term) &&
      !transaction.category.toLowerCase().includes(term)
    ) {
      return false;
    }

    if (filters.type && transaction.type !== filters.type) {
      return false;
    }

    if (filters.category && transaction.category !== filters.category) {
      return false;
    }

    if (filters.month && !transaction.date.startsWith(filters.month)) {
      return false;
    }

    return true;
  });
}

function getSortedTxs(transactions) {
  return [...transactions].sort((a, b) => {
    let aValue = a[state.sortField];
    let bValue = b[state.sortField];

    if (state.sortField === "amount") {
      aValue = Number(aValue);
      bValue = Number(bValue);
    }

    if (state.sortField === "date") {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (aValue < bValue) {
      return state.sortDir === "asc" ? -1 : 1;
    }

    if (aValue > bValue) {
      return state.sortDir === "asc" ? 1 : -1;
    }

    return 0;
  });
}

function renderTxTable() {
  const filtered = getFilteredTxs();
  const sorted = getSortedTxs(filtered);
  const total = sorted.length;
  const pages = Math.max(1, Math.ceil(total / state.pageSize));

  if (state.currentPage > pages) {
    state.currentPage = pages;
  }

  const start = (state.currentPage - 1) * state.pageSize;
  const paged = sorted.slice(start, start + state.pageSize);
  const isAdmin = state.role === "admin";
  const tbody = document.getElementById("txTableBody");

  if (!paged.length) {
    tbody.innerHTML = "";
    document.getElementById("txEmpty").style.display = "block";
  } else {
    document.getElementById("txEmpty").style.display = "none";
    tbody.innerHTML = paged
      .map((transaction) => `
        <tr class="${state.editingId === transaction.id ? "tx-row-editing" : ""}">
          <td>${formatDate(transaction.date)}</td>
          <td>${transaction.description}</td>
          <td><span class="category-badge cat-${transaction.category.toLowerCase()}">${transaction.category}</span></td>
          <td style="color:${transaction.type === "income" ? "var(--green)" : "var(--text-muted)"};font-size:12px;text-transform:capitalize;">${transaction.type}</td>
          <td class="tx-amount ${transaction.type}">${transaction.type === "income" ? "+" : "-"}${fmt(transaction.amount)}</td>
          ${isAdmin ? `<td><div class="edit-actions"><button class="btn-xs" onclick="editTx(${transaction.id})">Edit</button><button class="btn-xs danger" onclick="deleteTx(${transaction.id})">Delete</button></div></td>` : ""}
        </tr>
      `)
      .join("");
  }

  renderPagination(pages, total);
  updateSortArrows();
}

function renderPagination(pages, total) {
  const pagination = document.getElementById("pagination");
  if (pages <= 1) {
    pagination.innerHTML = "";
    return;
  }

  let html = `<span style="font-size:12px;color:var(--text-muted);margin-right:4px;">${total} items</span>`;
  html += `<button class="page-btn" onclick="goPage(${state.currentPage - 1})" ${state.currentPage === 1 ? "disabled" : ""}>‹</button>`;

  for (let index = 1; index <= pages; index += 1) {
    if (pages > 7 && index > 2 && index < pages - 1 && Math.abs(index - state.currentPage) > 1) {
      if (index === 3 || index === pages - 2) {
        html += '<span style="color:var(--text-muted);padding:0 4px;">…</span>';
      }
      continue;
    }

    html += `<button class="page-btn ${index === state.currentPage ? "active" : ""}" onclick="goPage(${index})">${index}</button>`;
  }

  html += `<button class="page-btn" onclick="goPage(${state.currentPage + 1})" ${state.currentPage === pages ? "disabled" : ""}>›</button>`;
  pagination.innerHTML = html;
}

function goPage(page) {
  state.currentPage = page;
  renderTxTable();
}

function sortBy(field) {
  if (state.sortField === field) {
    state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
  } else {
    state.sortField = field;
    state.sortDir = "desc";
  }

  renderTxTable();
}

function updateSortArrows() {
  ["date", "description", "amount"].forEach((field) => {
    const element = document.getElementById("sort-" + field);
    if (!element) {
      return;
    }

    element.className = "sort-arrow " + (state.sortField === field ? "active" : "");
    element.textContent = state.sortField === field ? (state.sortDir === "asc" ? "↑" : "↓") : "↕";
  });
}

function filterTransactions() {
  state.filters.search = document.getElementById("searchInput").value;
  state.filters.type = document.getElementById("typeFilter").value;
  state.filters.category = document.getElementById("categoryFilter").value;
  state.filters.month = document.getElementById("monthFilter").value;
  state.currentPage = 1;
  renderTxTable();
}

function populateFilters() {
  const categories = [...new Set(state.transactions.map((transaction) => transaction.category))].sort();
  const categorySelect = document.getElementById("categoryFilter");
  const currentCategory = categorySelect.value;
  categorySelect.innerHTML =
    '<option value="">All Categories</option>' +
    categories
      .map((category) => `<option value="${category}" ${category === currentCategory ? "selected" : ""}>${category}</option>`)
      .join("");

  const months = getAllMonths();
  const monthSelect = document.getElementById("monthFilter");
  const currentMonth = monthSelect.value;
  monthSelect.innerHTML =
    '<option value="">All Months</option>' +
    months
      .map((month) => {
        const [year, monthNumber] = month.split("-");
        return `<option value="${month}" ${month === currentMonth ? "selected" : ""}>${MONTHS[parseInt(monthNumber, 10) - 1]} ${year}</option>`;
      })
      .join("");
}
