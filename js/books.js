const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const borrowButtons = document.querySelectorAll(".borrow-btn");

borrowButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (!currentUser) {
            alert("Please log in to borrow a book.");
            window.location.href = "login.html";
            return;
        }

        // Get the book title from the same card as this button
        const card = button.closest(".book-card");
        const title = card.querySelector("h3").textContent;
        const author = card.querySelector("p").textContent;

        // Load existing borrowed books for this user (or start fresh)
        const borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || {};
        const userBooks = borrowedBooks[currentUser.email] || [];

        // Avoid borrowing the same book twice
        const alreadyBorrowed = userBooks.some(book => book.title === title);
        if (alreadyBorrowed) {
            alert("You've already borrowed this book.");
            return;
        }

        userBooks.push({ title, author, borrowedDate: new Date().toLocaleDateString() });
        borrowedBooks[currentUser.email] = userBooks;
        localStorage.setItem("borrowedBooks", JSON.stringify(borrowedBooks));

        alert(`"${title}" borrowed successfully!`);
    });
});

// SEARCH
const searchForm = document.querySelector(".search-form");
const searchInput = document.getElementById("search");
const bookCards = document.querySelectorAll(".book-card");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const query = searchInput.value.trim().toLowerCase();

    bookCards.forEach((card) => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        const author = card.querySelector("p").textContent.toLowerCase();
        const category = card.dataset.category.toLowerCase();

        const matches = title.includes(query) || author.includes(query) || category.includes(query);
        card.style.display = matches ? "block" : "none";
    });
});

// CATEGORY FILTER
const categoryLinks = document.querySelectorAll(".category-link");

categoryLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const selectedCategory = link.dataset.category;

        bookCards.forEach((card) => {
            const matches = selectedCategory === "all" || card.dataset.category === selectedCategory;
            card.style.display = matches ? "block" : "none";
        });
    });
});

// VIEW DETAILS MODAL
const detailButtons = document.querySelectorAll(".details-btn");
const modal = document.getElementById("bookModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalAuthor = document.getElementById("modalAuthor");
const modalCategory = document.getElementById("modalCategory");
const closeModalBtn = document.getElementById("closeModal");

detailButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const card = button.closest(".book-card");

        const title = card.querySelector("h3").textContent;
        const author = card.querySelector("p").textContent;
        const category = card.dataset.category;
        const imageSrc = card.querySelector("img").src;

        modalImage.src = imageSrc;
        modalTitle.textContent = title;
        modalAuthor.textContent = `by ${author}`;
        modalCategory.textContent = `Category: ${category}`;

        modal.style.display = "flex";
    });
});

closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Also close if user clicks the dark overlay outside the box
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// PAGINATION
const booksPerPage = 4;
const allBookCards = document.querySelectorAll(".book-card");
const pageLinks = document.querySelectorAll(".page-link");
const prevPageBtn = document.getElementById("prevPage");
const nextPageBtn = document.getElementById("nextPage");
const totalPages = Math.ceil(allBookCards.length / booksPerPage);

let currentPage = 1;

function showPage(page) {
    currentPage = page;

    allBookCards.forEach((card, index) => {
        const start = (page - 1) * booksPerPage;
        const end = start + booksPerPage;
        card.style.display = (index >= start && index < end) ? "block" : "none";
    });

    // Highlight the active page number
    pageLinks.forEach((link) => {
        link.classList.toggle("active", Number(link.dataset.page) === page);
    });
}

pageLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        showPage(Number(link.dataset.page));
    });
});

prevPageBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage > 1) {
        showPage(currentPage - 1);
    }
});

nextPageBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
        showPage(currentPage + 1);
    }
});

// Show page 1 by default when the page loads
showPage(1);