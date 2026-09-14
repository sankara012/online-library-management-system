const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
    window.location.href = "login.html";
}

document.getElementById("changePasswordForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const oldPassword = document.getElementById("old-password").value;
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const messageBox = document.getElementById("changePasswordMessage");

    if (oldPassword !== currentUser.password) {
        messageBox.style.color = "red";
        messageBox.textContent = "Old password is incorrect.";
        return;
    }

    if (newPassword.length < 6) {
        messageBox.style.color = "red";
        messageBox.textContent = "New password must be at least 6 characters.";
        return;
    }

    if (newPassword !== confirmPassword) {
        messageBox.style.color = "red";
        messageBox.textContent = "Passwords do not match.";
        return;
    }

    // Update the users array
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(user => user.email === currentUser.email);

    if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem("users", JSON.stringify(users));
    }

    // Update the current session too
    currentUser.password = newPassword;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    messageBox.style.color = "green";
    messageBox.textContent = "Password updated successfully!";
});