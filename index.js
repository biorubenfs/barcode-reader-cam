import { addBookToMainLibrary } from "./add-book.js";
import { startCamera } from "./camera.js";
import { handleFetchBook } from "./fetch-book.js"

let currentBook = {}

await startCamera()

const fecthButton = document.getElementById('fetch-button')
const addBookButton = document.getElementById('add-book-button')
const snapshotButton = document.getElementById('snapshot-button')
const successMsg = document.getElementById('success-msg')

/* Event Listeners */
/* Fetch Book from Open Library */
fecthButton.addEventListener('click', async () => {
    try {
        const book = await handleFetchBook(document.getElementById('isbn-input'))
        currentBook = { ...book }
    } catch (error) {
        alert(`Error while searching in Open Library, ${error.message}`)
    }
})

/* Add book to library */
addBookButton.addEventListener('click', async () => {
    try {
        await addBookToMainLibrary(currentBook)
        successMsg.classList.remove("hidden")
        setTimeout(() => successMsg.classList.add('hidden'), 2000)
        // alert('Book Added')
    } catch (error) {
        alert(`Error while adding book: ${error.message}`);
    }   
})

/* Take snapshot when button is clicked */
snapshotButton.addEventListener('click', async () => {
    /* create canvas */
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const video = document.getElementById('camera');

    /* adjust canvas size */
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    /* draw the current video frame in canvas */
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    /* convert canvas content into a DataURL (base64 image) */
    const imageDataUrl = canvas.toDataURL('image/png');

    /* display the snapshot into a <img> tag */
    const imgElement = document.getElementById('captured-image');
    imgElement.src = imageDataUrl;

    await getIsbnFromImg(imageDataUrl);
});
