document.getElementById("forgotPasswordForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const newPassword = document.getElementById("newPassword").value;
    const confirmNewPassword = document.getElementById("confirmNewPassword").value;
    const messageBox = document.getElementById("forgotPasswordMessage");

    if (newPassword.length < 6) {
        messageBox.style.color = "red";
        messageBox.textContent = "Password must be at least 6 characters.";
        return;
    }

    if (newPassword !== confirmNewPassword) {
        messageBox.style.color = "red";
        messageBox.textContent = "Passwords do not match.";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(user => user.email === email);

    if (userIndex === -1) {
        messageBox.style.color = "red";
        messageBox.textContent = "No account found with that email.";
        return;
    }

    users[userIndex].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));

    messageBox.style.color = "green";
    messageBox.textContent = "Password reset successfully! Redirecting to login...";

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1200);
});