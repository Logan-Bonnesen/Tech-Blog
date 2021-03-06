const postId = document.querySelector('input[name="post-id"]').value;

const editForm = async function(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const body = document.querySelector('textarea[name="post-body"]').value.trim();

    await fetch(`/api/post/${postId}`,{
        method: 'PUT',
        body: JSON.stringify({ title, body }),
        headers: {'Content-Type': 'application/json'}
    })
    document.location.replace('/dashboard')
}

document.querySelector('#edit-post-form').addEventListener('submit', editForm)