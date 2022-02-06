const newForm = async function(event) {
    event.preventDefault()


const title = document.querySelector('input[name="post-title"]').value.trim();
const body = document.querySelector('textarea[name="post-body"]').value.trim();

const response = await fetch('/api/user', {
    method: 'POST', 
    body: JSON.stringify({ title, body }),
    headers: { 'Content-Type': 'application/json'},
})

document.location.replace('/dashboard');
};

document.querySelector('#newPostForm').addEventListener('submit', newForm)