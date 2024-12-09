document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get('id');

    const videoPlayer = document.getElementById('videoPlayer');
    const deleteVideoButton = document.getElementById('deleteVideo');
    const loadingIndicator = document.querySelector('.loading-indicator');

    async function fetchVideo() {
        try {
            const token = sessionStorage.getItem('token');

            if (!videoId || !token) {
                console.error('Video ID or token not found.');
                return;
            }

            const response = await fetch(`https://db.formaitic.me/videos/${videoId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const video = await response.json();
                videoPlayer.src = video.url;
            } else {
                console.error('Error fetching video:', response.status);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    }

    async function deleteVideo() {
        try {
            const token = sessionStorage.getItem('token');

            if (!videoId || !token) {
                console.error('Video ID or token not found.');
                return;
            }

            loadingIndicator.hidden = false;

            const response = await fetch(`https://db.formaitic.me/videos/${videoId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                alert('Video eliminado exitosamente.');
                window.location.href = '/dashboard';
            } else {
                console.error('Error deleting video:', response.status);
                alert('Error al eliminar el video.');
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Error de red al eliminar el video.');
        } finally {
            loadingIndicator.hidden = true;
        }
    }

    fetchVideo();

    deleteVideoButton.addEventListener('click', deleteVideo);
});
