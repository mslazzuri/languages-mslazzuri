document.getElementById('post-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form from refreshing the page

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const token = localStorage.getItem('authToken');  // Get the token from localStorage

    fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'x-access-token': token  // Include the token in the request headers
        },
        body: JSON.stringify({ title, content })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert("Post created successfully!");
            window.location.href = 'index.html';  // Redirect to home after creating post
        } else {
            document.getElementById('post-error').textContent = "Error creating post.";
        }
    })
    .catch(error => console.error('Error:', error));
});

// post_form.js for Editing Posts
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('id');

    if (postId) {
        // Fetch existing post data for editing
        fetch(`http://localhost:3000/posts/${postId}`)
            .then(response => response.json())
            .then(post => {
                document.getElementById('title').value = post.title;
                document.getElementById('content').value = post.content;
            })
            .catch(error => console.error('Error:', error));
    }

    // Add event listener for form submission (for edit functionality)
    document.getElementById('post-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const token = localStorage.getItem('authToken');

        if (!title || !content) {
            alert('Please fill out all fields.');
            return;
        }

        fetch(`http://localhost:3000/posts/${postId}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({ title, content })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert("Post updated successfully!");
                window.location.href = 'index.html';
            } else {
                document.getElementById('post-error').textContent = "Error updating post.";
            }
        })
        .catch(error => console.error('Error:', error));
    });
});
