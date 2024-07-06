document.getElementById('voteForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    try {
        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email })
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            document.getElementById('message').innerText = `Error: ${errorResponse.message}`;
        } else {
            const result = await response.json();
            document.getElementById('message').innerText = result.message;
        }
    } catch (error) {
        document.getElementById('message').innerText = `Error: ${error.message}`;
    }
});
