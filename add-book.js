export async function addBookToMainLibrary(book) {
    const body = {
        ...book,
        cover: book.cover.toString(),
        isbn_13: book.isbn

    }

    await fetch('http://localhost:3000/books', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
}