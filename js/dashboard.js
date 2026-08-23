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
        item.innerHTML = `${book.title} <span>by ${book.author} — borrowed ${book.borrowedDate}</span>`;
        borrowedList.appendChild(item);
    });
}