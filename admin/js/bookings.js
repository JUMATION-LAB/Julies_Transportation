// ======================================================
// Julie Transporters Admin - Bookings
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    lucide.createIcons();

    initializeDrawer();

    initializeSearch();

    initializeStatusFilter();

    initializeRefresh();

    initializePagination();

    initializeAnimations();

});

// ======================================================
// Demo Data
// Replace later with GET /api/bookings
// ======================================================

let bookings = [

    {
        id: 1,
        reference: "JT-2026-00012",
        customer: "John Doe",
        phone: "+256700000000",
        status: "Pending"
    },

    {
        id: 2,
        reference: "JT-2026-00013",
        customer: "Sarah Namusoke",
        phone: "+256751111111",
        status: "Confirmed"
    },

    {
        id: 3,
        reference: "JT-2026-00014",
        customer: "Michael Kato",
        phone: "+256772334455",
        status: "Completed"
    },

    {
        id: 4,
        reference: "JT-2026-00015",
        customer: "Brenda Achieng",
        phone: "+256704556677",
        status: "Cancelled"
    }

];

// ======================================================
// Drawer
// ======================================================

function initializeDrawer() {

    const drawer = document.getElementById("bookingDrawer");

    const closeButton = document.getElementById("closeDrawer");

    document.querySelectorAll(".action-btn").forEach(button => {

        button.addEventListener("click", () => {

            drawer.classList.add("show");

        });

    });

    closeButton.addEventListener("click", () => {

        drawer.classList.remove("show");

    });

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            drawer.classList.remove("show");

        }

    });

}

// ======================================================
// Search
// ======================================================

function initializeSearch() {

    const input = document.querySelector(".search-box input");

    const rows = document.querySelectorAll("tbody tr");

    if (!input) return;

    input.addEventListener("keyup", () => {

        const keyword = input.value.toLowerCase();

        rows.forEach(row => {

            const text = row.innerText.toLowerCase();

            row.style.display = text.includes(keyword)

                ? ""

                : "none";

        });

    });

}

// ======================================================
// Status Filter
// ======================================================

function initializeStatusFilter() {

    const selects = document.querySelectorAll("select");

    if (!selects.length) return;

    const statusSelect = selects[0];

    const rows = document.querySelectorAll("tbody tr");

    statusSelect.addEventListener("change", () => {

        const value = statusSelect.value.toLowerCase();

        rows.forEach(row => {

            if (value === "all status") {

                row.style.display = "";

                return;

            }

            const status = row.querySelector(".badge").textContent.toLowerCase();

            row.style.display = status.includes(value)

                ? ""

                : "none";

        });

    });

}

// ======================================================
// Refresh Button
// ======================================================

function initializeRefresh() {

    const refreshButton = document.querySelector(".btn-primary");

    if (!refreshButton) return;

    refreshButton.addEventListener("click", () => {

        refreshButton.disabled = true;

        Toast.info("Refreshing bookings...");

        setTimeout(() => {

            refreshButton.disabled = false;

            Toast.success("Bookings refreshed.");

        }, 1200);

    });

}

// ======================================================
// Pagination (placeholder)
// ======================================================

function initializePagination() {

    document.querySelectorAll(".pagination button").forEach(button => {

        button.addEventListener("click", () => {

            document
                .querySelectorAll(".pagination button")
                .forEach(item => item.classList.remove("active"));

            if (button.textContent !== "Previous" && button.textContent !== "Next") {

                button.classList.add("active");

            }

            Toast.info("Pagination will use backend later.");

        });

    });

}

// ======================================================
// Animations
// ======================================================

function initializeAnimations() {

    const cards = document.querySelectorAll(".stat-card");

    cards.forEach((card, index) => {

        card.style.opacity = "0";

        card.style.transform = "translateY(25px)";

        setTimeout(() => {

            card.style.transition = ".5s";

            card.style.opacity = "1";

            card.style.transform = "translateY(0)";

        }, index * 120);

    });

}

// ======================================================
// Future API Integration
// ======================================================

async function loadBookings() {

    /*
    const response = await API.get("/bookings");

    bookings = response.data;

    renderBookings(bookings);
    */

}