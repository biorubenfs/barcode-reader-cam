import { addBookToMainLibrary } from "./add-book.js";
import { handleFetchBook } from "./fetch-book.js"

let currentBook = {}

document.getElementById('fetch-button').addEventListener('click', async () => {
    const book = await handleFetchBook(document.getElementById('isbn-input'))
    currentBook = { ...book }
})

document.getElementById('add-book-button').addEventListener('click', async () => await addBookToMainLibrary(currentBook))

const video = document.getElementById('camera');
const canvas = document.getElementById('snapshot');
const captureButton = document.getElementById('capture-btn');
const ctx = canvas.getContext('2d');

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (error) {
        console.error("Error al acceder a la cámara web:", error);
        alert("No se pudo acceder a la cámara web.");
    }
}

/* Take snapshot when button is clicked */
captureButton.addEventListener('click', async () => {
    // Ajustar el tamaño del canvas al tamaño del video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    canvas.style.display = "none";

    // Dibujar el frame actual del video en el canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convertir el contenido del canvas en un Data URL (imagen en base64)
    const imageDataUrl = canvas.toDataURL('image/png');

    // Mostrar la imagen en una etiqueta<img>
    const imgElement = document.getElementById('captured-image')
    imgElement.src = imageDataUrl;
    // No es necesario mostrarla
    // imgElement.style.display = "none"

    await getIsbnFromImg()
});

async function getIsbnFromImg() {
    // Crear un lector de códigos QR
    const codeReader = new ZXing.BrowserBarcodeReader();

    const img = document.getElementById('captured-image');
    const resultEl = document.getElementById('result');
    const isbnInput = document.getElementById('isbn-input')

    codeReader.decodeFromImage(img)
        .then(result => {
            console.log(result);
            resultEl.textContent = result.text;
            isbnInput.value = result.text
        })
        .catch(err => {
            console.error(err);
            resultEl.textContent = err;
        });
}


startCamera()