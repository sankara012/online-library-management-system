const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
    window.location.href = "login.html";
}

// Fill in real name/email
document.getElementById("headerName").textContent = currentUser.fullname;
document.getElementById("profileCardName").textContent = currentUser.fullname;
document.getElementById("dashboardEmail").textContent = currentUser.email;

// Load and display borrowed books
const borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || {};
const userBooks = borrowedBooks[currentUser.email] || [];

const borrowedList = document.getElementById("borrowedList");

if (userBooks.length === 0) {
    borrowedList.innerHTML = "<li>You haven't borrowed any books yet.</li>";
} else {
    userBooks.forEach((book) => {
    const item = document.createElement("li");
    item.innerHTML = `
        ${book.title} <span>by ${book.author} — borrowed ${book.borrowedDate}</span>
        <button class="btn return-btn" data-title="${book.title}">Return</button>
    `;
    borrowedList.appendChild(item);
});

// Handle Return button clicks
document.querySelectorAll(".return-btn").forEach((button) => {
    button.addEventListener("click", () => {
        const titleToRemove = button.dataset.title;

        // Remove this book from the user's borrowed list
        const updatedBooks = userBooks.filter(book => book.title !== titleToRemove);
        borrowedBooks[currentUser.email] = updatedBooks;
        localStorage.setItem("borrowedBooks", JSON.stringify(borrowedBooks));

        // Refresh the page to show the updated list
        location.reload();
    });
});
}

const savedImage = localStorage.getItem(`profileImage_${currentUser.email}`);
if (savedImage) {
    document.getElementById("dashboardAvatar").src = savedImage;
}

// Member Since
document.getElementById("dashboardJoined").textContent = currentUser.joinedDate || "Unknown";

// Quick Stats — total borrowed count
document.getElementById("statsTotalBorrowed").textContent = userBooks.length;