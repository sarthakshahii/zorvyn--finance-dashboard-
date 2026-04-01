function switchRole(role) {
  state.role = role;

  const label = role.charAt(0).toUpperCase() + role.slice(1);
  document.getElementById("roleBadgeLabel").textContent = label;
  document.getElementById("sidebarRoleLabel").textContent = label;

  const isAdmin = role === "admin";
  document.querySelectorAll(".admin-only").forEach((element) => {
    element.style.display = isAdmin ? "" : "none";
  });

  document.getElementById("adminBar").style.display = isAdmin ? "flex" : "none";
  document.getElementById("actionsHeader").style.display = isAdmin ? "" : "none";

  renderTxTable();
  saveState();
}
