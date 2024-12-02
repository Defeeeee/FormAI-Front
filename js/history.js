document.addEventListener('DOMContentLoaded', () => {
    const videoList = document.querySelector('.video-list');

    async function fetchVideoHistory() {
        try {
            const userId = sessionStorage.getItem('id');
            const token = sessionStorage.getItem('token');

            if (!userId || !token) {
                console.error('User ID or token not found in session storage.');
                const listItem = document.createElement('li');
                listItem.textContent = 'Error: No se pudo obtener la información del usuario.';
                videoList.appendChild(listItem);
                return;
            }

            const response = await fetch(`https://db.formaitic.me/videos/usuario/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const videos = await response.json();
                videoList.innerHTML = '';

                if (videos.length === 0) {
                    const listItem = document.createElement('li');
                    listItem.textContent = 'No hay videos en tu historial.';
                    videoList.appendChild(listItem);
                } else {
                    // Sort videos by server's ID in ascending order (oldest first)
                    videos.sort((a, b) => a.id - b.id);

                    // Change each video's ID to the local ID
                    videos.forEach((video, index) => {
                        video.localId = index + 1;
                    });

                    // Sort by local ID in descending order (newest first)
                    videos.sort((a, b) => b.localId - a.localId);

                    videos.forEach(video => {
                        const listItem = document.createElement('li');
                        const ejercicio = video.id_ejercicio === 1 ? 'Sentadilla' : 'Plank';
                        const correcto = video.correcto ? 'Correcto' : 'Incorrecto';

                        const videoVisualizerUrl = `video-visualizer?url=${encodeURIComponent(video.url)}&prediction=${encodeURIComponent(correcto)}`;

                        listItem.innerHTML = `
                            <span>Video ${video.localId} - ${ejercicio} (${correcto})</span>
                            <a href="${videoVisualizerUrl}" target="_blank">Ver video</a>
                        `;
                        videoList.appendChild(listItem);
                    });
                }
            } else {
                console.error('Error fetching video history:', response.status);
                const listItem = document.createElement('li');
                listItem.textContent = 'Error al cargar el historial de videos.';
                videoList.appendChild(listItem);
            }
        } catch (error) {
            console.error('Network error:', error);
            const listItem = document.createElement('li');
            listItem.textContent = 'Error de red al cargar el historial de videos.';
            videoList.appendChild(listItem);
        }
    }

    fetchVideoHistory();
});