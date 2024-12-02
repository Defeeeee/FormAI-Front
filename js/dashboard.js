document.addEventListener('DOMContentLoaded', () => {
    const videoList = document.querySelector('.video-list');
    const dropZones = document.querySelectorAll('.drop-zone');

    async function fetchVideoHistory() {
        try {
            const userId = sessionStorage.getItem('id');
            const token = sessionStorage.getItem('token');

            // Check if userId and token are available
            if (!userId || !token) {
                console.error('User ID or token not found in session storage.');
                const listItem = document.createElement('li');
                listItem.textContent = 'Error: No se pudo obtener la información del usuario.';
                videoList.appendChild(listItem);
                return; // Stop execution if authentication is missing
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

                    // Limit the history to the latest 5 videos
                    const latestVideos = videos.slice(0, 5);

                    latestVideos.forEach(video => {
                        const listItem = document.createElement('li');
                        const ejercicio = video.id_ejercicio === 1 ? 'Sentadilla' : 'Plank';
                        const correcto = video.correcto ? 'Correcto' : 'Incorrecto';

                        listItem.innerHTML = `
                            <span>Video ${video.localId} - ${ejercicio} (${correcto})</span>
                            <a href="${video.url}" target="_blank">Ver video</a>
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

    dropZones.forEach(dropZone => {
        const fileInput = dropZone.querySelector('.file-input');
        const loadingIndicator = dropZone.querySelector('.loading-indicator');

        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        // Highlight drop zone when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, unhighlight, false);
        });

        function highlight(e) {
            dropZone.classList.add('highlight');
        }

        function unhighlight(e) {
            dropZone.classList.remove('highlight');
        }

        // Handle dropped files
        dropZone.addEventListener('drop', handleDrop, false);

        function handleDrop(e) {
            let dt = e.dataTransfer;
            let files = dt.files;

            handleFiles(files);
        }

        // Handle files from input element
        fileInput.addEventListener('change', handleInput, false);

        function handleInput(e) {
            let files = e.target.files;
            handleFiles(files);
        }

        function handleFiles(files) {
            // Only process one file
            const file = files[0];
            if (!file) return;

            // Show loading indicator (make sure loadingIndicator is not null)
            const loadingIndicator = dropZone.querySelector('.loading-indicator');
            if (loadingIndicator) {
                loadingIndicator.hidden = false;
            } else {
                console.error('Loading indicator not found.', dropZone); // Log the dropZone to inspect it
                return;
            }

            const exerciseId = dropZone.dataset.exerciseId;
            const userId = sessionStorage.getItem('id');
            const token = sessionStorage.getItem('token');

            // Check if userId and token are available
            if (!userId || !token) {
                console.error('User ID or token not found in session storage.');
                loadingIndicator.hidden = true; // Hide loading indicator
                alert('Error: No se pudo obtener la información del usuario.');
                return; // Stop execution if authentication is missing
            }

            const formData = new FormData();
            formData.append('video', file);
            formData.append('userId', userId);
            formData.append('exerciseId', exerciseId);

            fetch('https://db.formaitic.me/videos/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            })
                .then(response => {
                    loadingIndicator.hidden = true; // Hide loading indicator
                    if (!response.ok) {
                        return response.json().then(data => {
                            throw new Error(data.message || 'Error al subir el video.');
                        });
                    }
                    return response.json();
                })
                .then(data => {
                    // Handle successful upload
                    alert(`Video subido correctamente. Predicción de la IA: ${data.correct ? 'Correcto' : 'Incorrecto'}`);
                    // Refresh video history after successful upload
                    fetchVideoHistory();
                })
                .catch(error => {
                    // Handle errors
                    console.error('Error:', error);
                    alert(error.message);
                });
        }

        // Handle clicks on the drop zone
        dropZone.addEventListener('click', () => {
            fileInput.click();
        });
    });
});