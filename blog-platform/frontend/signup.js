// Event listener for form submission
document.getElementById('signup-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form from reloading the page
    console.log("Form submission detected"); // <-- Add this line

    // Get input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Check if passwords match
    if (password !== confirmPassword) {
        document.getElementById('signup-error').innerText = 'Passwords do not match.';
        return;
    }

    // Clear any previous error messages
    document.getElementById('signup-error').innerText = '';

    // Prepare data to send to backend
    const userData = {
        username: username,
        password: password
    };

    try {
        // Send a POST request to the server for signup
        const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        // Handle the response
        if (response.ok) {
            // User created successfully, redirect to login page
            window.location.href = 'login.html';
        } else {
            // Handle errors
            const errorData = await response.json();
            document.getElementById('signup-error').innerText = errorData.message || 'An error occurred during sign up.';
        }
    } catch (error) {
        // Catch network errors or unexpected failures
        document.getElementById('signup-error').innerText = 'Failed to sign up. Please try again later.';
    }
});
