function showToast(message, color) {
  const toast = document.getElementById("toast");
  const dot = toast.querySelector(".toast-dot");

  document.getElementById("toastMsg").textContent = message;
  if (dot) {
    dot.style.background = color || "var(--green)";
  }

  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}
