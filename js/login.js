document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const usernameInput = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const errorBox = document.getElementById("loginError");

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Allow login by email (since your form calls it username/email)
    const matchedUser = users.find(
        user => user.email === usernameInput && user.password === password
    );

    if (!matchedUser) {
        errorBox.textContent = "Invalid email or password.";
        return;
    }

    // Store current session
    localStorage.setItem("currentUser", JSON.stringify(matchedUser));

    window.location.href = "profile.html";
});