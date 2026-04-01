let state = {
  transactions: [],
  role: "admin",
  darkMode: true,
  sortField: "date",
  sortDir: "desc",
  currentPage: 1,
  pageSize: 10,
  editingId: null,
  filters: { search: "", type: "", category: "", month: "" }
};

let trendChartInst;
let categoryChartInst;
let monthlyChartInst;
let savingsChartInst;
