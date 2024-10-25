document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/posts')
        .then(response => response.json())
        .then(posts => {
            const postContainer = document.getElementById('posts');
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.innerHTML = `<h2>${post.title}</h2><p>${post.content}</p>`;
                postContainer.appendChild(postElement);
            });
        });
});
