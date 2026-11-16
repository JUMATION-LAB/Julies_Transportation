/* ==========================================================
   UI-ONLY SCRIPT
   No API calls, no data logic — just swapping visible panels,
   toggling the active nav item, tab switching, and the
   mobile sidebar toggle. All wiring for backend behavior is
   intentionally left out.
   ========================================================== */

// ---- Sidebar navigation: show/hide panels ----
const navItems = document.querySelectorAll(".nav-item");
const panels = document.querySelectorAll(".panel");

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    const target = item.getAttribute("data-target");

    navItems.forEach((el) => el.classList.remove("is-active"));
    item.classList.add("is-active");

    panels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.id === target);
    });
  });
});

// ---- Bookings tab row: purely visual active state ----
const tabs = document.querySelectorAll(".tab");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("is-active"));
    tab.classList.add("is-active");
  });
});

// ---- Mobile sidebar toggle ----
const menuToggle = document.getElementById("menuToggle");
const app = document.querySelector(".app");

menuToggle.addEventListener("click", () => {
  app.classList.toggle("sidebar-collapsed");
});
