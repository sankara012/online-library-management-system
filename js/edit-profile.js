const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
    window.location.href = "login.html";
}

document.getElementById("fullname").value = currentUser.fullname;
document.getElementById("email").value = currentUser.email;

document.getElementById("editProfileForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const updatedName = document.getElementById("fullname").value.trim();
    const updatedEmail = document.getElementById("email").value.trim();
    const messageBox = document.getElementById("editProfileMessage");

    if (updatedName === "" || updatedEmail === "") {
        messageBox.style.color = "red";
        messageBox.textContent = "Please fill in all fields.";
        return;
    }

    // Update the users array
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(user => user.email === currentUser.email);

    if (userIndex !== -1) {
        users[userIndex].fullname = updatedName;
        users[userIndex].email = updatedEmail;
        localStorage.setItem("users", JSON.stringify(users));
    }

    // Update the current session too
    currentUser.fullname = updatedName;
    currentUser.email = updatedEmail;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    messageBox.style.color = "green";
    messageBox.textContent = "Profile updated! Redirecting...";

    setTimeout(() => {
        window.location.href = "profile.html";
    }, 1200);
});