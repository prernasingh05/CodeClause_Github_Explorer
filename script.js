const form = document.querySelector('form');
const input = document.querySelector('#username');
const resultsDiv = document.querySelector('#results');

form.addEventListener('submit', e => {
  e.preventDefault();

  const username = input.value;

  fetch(`https://api.github.com/users/${username}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('User not found');
      }
    })
    .then(user => {
      resultsDiv.innerHTML = `
        <h2>${user.name}</h2>
        <p><strong>Username:</strong> ${user.login}</p>
        <p><strong>Followers:</strong> ${user.followers}</p>
        <p><strong>Following:</strong> ${user.following}</p>
        <p><strong>Public repositories:</strong> ${user.public_repos}</p>
        <p><strong>Profile:</strong> <a href="${user.html_url}">${user.html_url}</a></p>
      `;
      resultsDiv.style.display = 'block';
    })
    .catch(error => {
      resultsDiv.innerHTML = `<p>${error.message}</p>`;
      resultsDiv.style.display = 'block';
    });
});
