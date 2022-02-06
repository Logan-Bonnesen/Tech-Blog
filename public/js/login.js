const login = async function(event) {
    event.preventDefault();

    const username = document.querySelector('#username-login');
    const password = document.querySelector('#password-login');

    const response = await fetch('/api/user', {
        method: 'POST', 
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to login');
    }
};

document.querySelector('#login').addEventListener('submit', login);