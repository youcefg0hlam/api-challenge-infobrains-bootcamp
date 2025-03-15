async function deleteShortUrl(event) {
    const button = event.target;
    console.log(button);
    
    button.addEventListener('click', async (e) => {  // u gotta click twice
        e.preventDefault();
        console.log('Delete button clicked'); 
        
        const urlContainer = button.closest('.shorten-url');
        if (!urlContainer) {
            console.error('No .shorten-url container found');
            return;
        }

        
        const id = button.getAttribute('url-id');
        if (!id) {
            console.error('ID not found');
            return;
        }

        const apiUrl = `https://www.shorten-url-api.infobrains.club/api/private/urls/${id}`;

        try {
            const response = await fetch(apiUrl, { 
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });

            if (response.ok) {
                console.log('URL deleted');
                urlContainer.style.display = 'none'; // Hide the URL container
            } else if (response.status === 500) {
                alert('Internal server error');
            } else if (response.status === 401) {
                alert('Unauthorized');
                localStorage.removeItem('token');
                window.location.href = '/index.html';
            } else {
                console.error('Error:', await response.text());
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    });
}