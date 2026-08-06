document.addEventListener("DOMContentLoaded", () => {

    lucide.createIcons();

    initSidebar();

    animateCounters();

    initSearch();

    initNotifications();

    initLogout();

    initCards();

    initClock();

});

function initSidebar() {

    const links = document.querySelectorAll(".sidebar nav a");

    links.forEach(link => {

        link.addEventListener("click", () => {

            links.forEach(item => item.classList.remove("active"));

            link.classList.add("active");

        });

    });

}

function animateCounters() {

    const cards = document.querySelectorAll(".stat-card h3");

    cards.forEach(card => {

        const text = card.textContent.trim();

        if (text.includes("UGX")) {

            return;

        }

        const target = parseInt(text.replace(/\D/g, ""));

        if (isNaN(target)) {

            return;

        }

        let current = 0;

        const increment = Math.ceil(target / 60);

        const timer = setInterval(() => {

            current += increment;

            if (current >= target) {

                current = target;

                clearInterval(timer);

            }

            card.textContent = current;

        }, 25);

    });

}

function initSearch() {

    const input = document.querySelector(".search input");

    const rows = document.querySelectorAll("tbody tr");

    if (!input) return;

    input.addEventListener("keyup", () => {

        const keyword = input.value.toLowerCase();

        rows.forEach(row => {

            const text = row.textContent.toLowerCase();

            row.style.display = text.includes(keyword)

                ? ""

                : "none";

        });

    });

}

function initNotifications() {

    const bell = document.querySelector(".icon-btn");

    if (!bell) return;

    bell.addEventListener("click", () => {

        Toast.info("No new notifications.");

    });

}

function initLogout() {

    const logout = document.querySelector(".logout-btn");

    if (!logout) return;

    logout.addEventListener("click", () => {

        const confirmed = confirm("Logout?");

        if (!confirmed) {

            return;

        }

        Storage.removeToken();

        window.location.href = "login.html";

    });

}

function initCards() {

    const cards = document.querySelectorAll(".stat-card");

    cards.forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const y = e.clientY - rect.top;

            card.style.setProperty("--x", `${x}px`);

            card.style.setProperty("--y", `${y}px`);

        });

    });

}

function initClock() {

    const heading = document.querySelector(".eyebrow");

    if (!heading) return;

    update();

    setInterval(update, 1000);

    function update() {

        const now = new Date();

        heading.textContent = now.toLocaleString("en-UG", {

            weekday: "long",

            day: "numeric",

            month: "long",

            hour: "2-digit",

            minute: "2-digit"

        });

    }

}