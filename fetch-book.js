function displayData({ title, authors, coverUrl, isbn, plot }) {
    const isbnTag = document.getElementById('isbn')
    const titleTag = document.getElementById('title')
    const authorsTag = document.getElementById('authors')
    // const plotTag = document.getElementById('plot')
    const coverTag = document.getElementById('cover')

    isbnTag.innerText = isbn
    titleTag.innerText = title
    authorsTag.innerText = authors.join(" - ")
    // plotTag.innerText = plot
    coverTag.src = coverUrl
    coverTag.alt = "Portada no disponible"
}

async function fetchBookData(isbn) {
    const isbn_url = `https://openlibrary.org/isbn/${isbn}.json`

    const response = await fetch(isbn_url, {method: 'GET'});
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }
    
    const data = await response.json()

    return data
}

function getCoverUrl(coverId) {
    if (!coverId) {
        return 'https://via.placeholder.com/150?text=No+Cover+Available'
    }
    return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
}

async function getAuthorsFromPath(path) {
    const response = await fetch(`https://openlibrary.org${path}.json`)
    const body = await response.json()
    return body.name
}

async function getBookAuthors(bookFetchResponse) {
    const authorsIdsArray = bookFetchResponse.authors
    const authorsNamesArray = []

    for (const author of authorsIdsArray) {
        const authorName = await getAuthorsFromPath(author.key)
        authorsNamesArray.push(authorName)
    }

    return authorsNamesArray
}

export async function handleFetchBook(isbn) {
    if (!isbn.value) {
        console.error('isbn not provided')
        return;
    }

    try {
        const formattedIsbn = isbn.value.trim().replaceAll('-', '')
        const bookData = await fetchBookData(formattedIsbn);

        const cover = bookData.covers?.[0]
        const coverUrl = getCoverUrl(cover);
        
        const authors = await getBookAuthors(bookData)

        const title = bookData.title

        const plot = "lorem ipsun"

        displayData({ title, coverUrl, isbn: formattedIsbn, authors, plot });
        
        return {title, cover, isbn: formattedIsbn, authors}
    } catch (error) {
        console.error('error', error)
    }
}