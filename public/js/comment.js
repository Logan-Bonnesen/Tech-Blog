const commentHandler = async function (event) {
    event.preventDefault();

    const post = document.querySelector('input[name="post-id"]').value;
    const comment_text = document.querySelector('textarea[name="comment-body"]')

    if (comment_text) {
        await fetch('/api/comment', {
          method: 'POST',
          comment_text: JSON.stringify({
            post,
            comment_text
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        document.location.reload();
      }
    };  

document.querySelector('#new-comment-form').addEventListener('submit', commentHandler);