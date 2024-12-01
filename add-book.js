export async function addBookToMainLibrary(book) {
    const body = {
        ...book,
        cover: book.cover.toString(),
        isbn_13: book.isbn

    }

    try {
        const response = await fetch('https://webhook-test.com/323eff9d1ff6fa2caa317fca579c26b4', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            },
        })

        if (!response.ok) {
            const errorDetails = await response.json()
            const message = errorDetails.message || `HTTP Error ${response.status}: ${response.statusText}`;
            const status = response.status
            throw new Error(status, message);
        }

        // return success or something
        
    } catch (error) {
        if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
            throw new Error('Network Error: server no response.');
        }
        throw error;
    }

    
}