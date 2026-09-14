document.getElementById("registerForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;
    const terms = document.getElementById("terms").checked;
    const errorBox = document.getElementById("registerError");

    // Validation
    if (fullname === "" || email === "" || password === "") {
        errorBox.textContent = "Please fill in all fields.";
        return;
    }
    if (password.length < 6) {
        errorBox.textContent = "Password must be at least 6 characters.";
        return;
    }
    if (password !== confirmPassword) {
        errorBox.textContent = "Passwords do not match.";
        return;
    }
    if (!terms) {
        errorBox.textContent = "You must accept the Terms and Conditions.";
        return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.some(user => user.email === email);
    if (exists) {
        errorBox.textContent = "An account with this email already exists.";
        return;
    }

    // Save new user
    users.push({ fullname, email, password, joinedDate: new Date().toLocaleDateString() });
    localStorage.setItem("users", JSON.stringify(users));

    errorBox.style.color = "green";
    errorBox.textContent = "Account created! Redirecting to login...";

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1200);
});