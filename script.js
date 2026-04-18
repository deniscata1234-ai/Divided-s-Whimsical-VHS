const STORAGE_KEY = 'vhs_videos';
const TOTAL_VIDEOS = 48;

function initializeVideos() {
    let videos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    
    for (let i = 1; i <= TOTAL_VIDEOS; i++) {
        if (!videos[i]) {
            videos[i] = { 
                name: '', 
                description: 'CHEAPEST AND BEST ANOMIC VHS MAKER' 
            };
        }
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
    return videos;
}

function renderVideos() {
    const videos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    const container = document.querySelector('.video-slot-container');
    container.innerHTML = '';

    for (let i = 1; i <= TOTAL_VIDEOS; i++) {
        const video = videos[i] || { 
            name: '', 
            description: 'CHEAPEST AND BEST ANOMIC VHS MAKER' 
        };
        const slot = createVideoSlot(i, video);
        container.appendChild(slot);
    }
}

function createVideoSlot(id, video) {
    const slot = document.createElement('div');
    slot.className = 'video-slot';
    slot.innerHTML = `
        <div class="video-icon">📼</div>
        <div class="video-title" data-id="${id}">
            <span class="slot-name">${video.name || 'Click to name this VHS'}</span>
        </div>
        <div class="video-description">${video.description}</div>
    `;
    
    slot.addEventListener('click', () => editVideoName(id, slot));
    return slot;
}

function editVideoName(id, slot) {
    const videos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    const video = videos[id];
    const nameElement = slot.querySelector('.slot-name');
    
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'edit-input';
    input.value = video.name;
    input.style.cssText = `
        width: 100%;
        padding: 8px;
        border: 2px solid #1e90ff;
        border-radius: 5px;
        background: rgba(30, 144, 255, 0.1);
        color: white;
        font-size: 1rem;
        font-weight: bold;
    `;
    
    nameElement.replaceWith(input);
    input.focus();
    input.select();
    
    function saveEdit() {
        video.name = input.value.trim();
        videos[id] = video;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
        renderVideos();
    }
    
    input.addEventListener('blur', saveEdit);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') saveEdit();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeVideos();
    renderVideos();
});

document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        alert('✅ All your VHS videos have been saved!');
    }
});
