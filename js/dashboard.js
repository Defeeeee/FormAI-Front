const videoList = document.querySelector('.video-list');

async function fetchVideoHistory() {
    try {
        const userId = sessionStorage.getItem('id'); // Get the user ID from sessionStorage
        const token = sessionStorage.getItem('token'); // Get the token from sessionStorage

        const response = await fetch(`https://db.formaitic.me/videos/usuario/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const videos = await response.json();
            videoList.innerHTML = ''; // Clear the list before adding new items

            if (videos.length === 0) {
                const listItem = document.createElement('li');
                listItem.textContent = 'No hay videos en tu historial.';
                videoList.appendChild(listItem);
            } else {
                // Sort videos by ID in descending order (newest first)
                videos.sort((a, b) => b.id - a.id);

                videos.forEach(video => {
                    const listItem = document.createElement('li');
                    const ejercicio = video.id_ejercicio === 1 ? 'Sentadilla' : 'Plank'; // Determine exercise name
                    const correcto = video.correcto ? 'Correcto' : 'Incorrecto'; // Determine AI prediction

                    // Customize how you display video info
                    listItem.innerHTML = `
                        <a href="${video.url}" target="_blank">Video ${video.id} - ${ejercicio}</a> 
                        <span>(${correcto})</span>
                    `;
                    videoList.appendChild(listItem);
                });
            }
        } else {
            // Handle error fetching video history
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