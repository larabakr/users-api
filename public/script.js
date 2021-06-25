const users = document.getElementById('users');

fetch('http://localhost:5000/api/users')
    .then(response => response.json())
    .then(result => {
        result.forEach(user => {
            users.innerHTML += `<div class="user" id="user-${user.id}">
            <p>Username: ${user.username}</p>
            <p>Country: ${user.country}</p>
            <button class="delete" onclick="deleteUser(${user.id})">delete</button>
            </div>`;
        });
    });

function deleteUser(id) {
    fetch(`http://localhost:5000/api/users/${id}`, { method: "delete" });
    location.reload();
}