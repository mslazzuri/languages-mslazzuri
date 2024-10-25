document.getElementById("login-form").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the form from submitting normally

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        // Handle successful login
        alert("Login successful!");
        window.location.href = "index.html"; // Redirect to the homepage or another page
    } else {
        // Handle errors
        const errorMessage = await response.json();
        alert(errorMessage.message || "Login failed.");
    }
});
