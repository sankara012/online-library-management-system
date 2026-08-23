document.addEventListener("DOMContentLoaded", () => {
    console.log("Online Library System loaded");
});
const logoutLink = document.getElementById("logoutLink");

if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("currentUser");
        window.location.href = "login.html";
    });
}