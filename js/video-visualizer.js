document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const videoUrl = urlParams.get('url');
    const prediction = urlParams.get('prediction');

    const myVideo = document.getElementById('myVideo');
    const predictionResult = document.querySelector('.prediction-result');

    if (videoUrl) {
        myVideo.src = decodeURIComponent(videoUrl); // Decode the URL
    } else {
        console.error('Video URL not found in the query parameters.');
        predictionResult.textContent = 'Error: No se pudo cargar el video.';
    }

    if (prediction) {
        predictionResult.textContent = decodeURIComponent(prediction); // Decode the prediction
    } else {
        console.error('Prediction not found in the query parameters.');
    }
});