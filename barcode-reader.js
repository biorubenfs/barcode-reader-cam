export async function getIsbnFromImg() {
    /* create the barcode reader */
    const codeReader = new ZXing.BrowserBarcodeReader();

    const img = document.getElementById('captured-image');
    const isbnInput = document.getElementById('isbn-input')

    try {
        const result = await codeReader.decodeFromImage(img);
        isbnInput.value = result.text;
    } catch (err) {
        const messageAlert = document.getElementById('message-alert')
        messageAlert.classList.remove("hidden");
    }
}