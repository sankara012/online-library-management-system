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

const changeImageBtn = document.getElementById("bt");
const imageInput = document.getElementById("imageInput");
const avatarPreview = document.getElementById("avatarPreview");

// Load saved image (if any) when the page opens
const savedImage = localStorage.getItem(`profileImage_${currentUser.email}`);
if (savedImage) {
    avatarPreview.src = savedImage;
}

// Clicking the visible button opens the hidden file picker
changeImageBtn.addEventListener("click", () => {
    imageInput.click();
});

// When a file is chosen, read it and preview it
imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];

    if (!file) {
        return;
    }

    // Warn if the image is too large for localStorage
    const maxSizeMB = 2;
    if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`Please choose an image smaller than ${maxSizeMB}MB.`);
        return;
    }

    const reader = new FileReader();

    reader.onload = () => {
        const base64Image = reader.result;
        avatarPreview.src = base64Image;
        localStorage.setItem(`profileImage_${currentUser.email}`, base64Image);
    };

    reader.readAsDataURL(file);
});