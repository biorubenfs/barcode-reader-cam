export async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.getElementById('camera');
        video.srcObject = stream;
    } catch (error) {
        alert(`Cannot access to webcam: ${error.message}`);
    }
}