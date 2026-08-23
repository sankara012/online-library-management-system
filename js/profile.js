// check if someone is logged in
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
    window.location.href = "login.html";
}

// fill in the real user data
document.getElementById("profileName").textContent = currentUser.fullname;
document.getElementById("profileEmail").textContent = currentUser.email;