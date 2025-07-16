// YouTube Music Player App
// Replace 'YOUR_API_KEY_HERE' with your actual YouTube Data API v3 key
const API_KEY = 'YOUR_API_KEY_HERE';
const MAX_RESULTS = 10;

// Global variables
let player;
let currentVideoId = null;
let searchResults = [];

// DOM elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsGrid = document.getElementById('resultsGrid');
const loading = document.getElementById('loading');
const noResults = document.getElementById('noResults');
const placeholder = document.getElementById('placeholder');
const playerDiv = document.getElementById('player');
const controls = document.getElementById('controls');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const currentTitle = document.getElementById('currentTitle');
const themeToggle = document.getElementById('themeToggle');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    setupEventListeners();
    
    // Initialize YouTube Player API when ready
    if (typeof YT !== 'undefined' && YT.loaded) {
        onYouTubeIframeAPIReady();
    }
});

// YouTube IFrame API ready callback
function onYouTubeIframeAPIReady() {
    console.log('YouTube IFrame API is ready');
}

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Event Listeners
function setupEventListeners() {
    // Search functionality
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Player controls
    playBtn.addEventListener('click', playVideo);
    pauseBtn.addEventListener('click', pauseVideo);
}

// Search functionality
async function performSearch() {
    const query = searchInput.value.trim();
    
    if (!query) {
        showMessage('Please enter a search term', 'error');
        return;
    }
    
    if (API_KEY === 'YOUR_API_KEY_HERE') {
        showDemoResults(query);
        return;
    }
    
    showLoading(true);
    
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${MAX_RESULTS}&q=${encodeURIComponent(query)}&type=video&key=${API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        searchResults = data.items || [];
        displayResults(searchResults);
        
    } catch (error) {
        console.error('Search error:', error);
        showMessage('Error searching videos. Please check your API key and try again.', 'error');
        showDemoResults(query); // Fallback to demo results
    } finally {
        showLoading(false);
    }
}

// Demo results for when API key is not configured
function showDemoResults(query) {
    const demoResults = [
        {
            id: { videoId: 'dQw4w9WgXcQ' },
            snippet: {
                title: 'Rick Astley - Never Gonna Give You Up (Demo)',
                channelTitle: 'Rick Astley',
                thumbnails: {
                    medium: { url: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg' }
                }
            }
        },
        {
            id: { videoId: 'kJQP7kiw5Fk' },
            snippet: {
                title: 'Luis Fonsi - Despacito ft. Daddy Yankee (Demo)',
                channelTitle: 'Luis Fonsi',
                thumbnails: {
                    medium: { url: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/mqdefault.jpg' }
                }
            }
        },
        {
            id: { videoId: 'JGwWNGJdvx8' },
            snippet: {
                title: 'Ed Sheeran - Shape of You (Demo)',
                channelTitle: 'Ed Sheeran',
                thumbnails: {
                    medium: { url: 'https://i.ytimg.com/vi/JGwWNGJdvx8/mqdefault.jpg' }
                }
            }
        },
        {
            id: { videoId: 'hT_nvWreIhg' },
            snippet: {
                title: 'The Weeknd - Blinding Lights (Demo)',
                channelTitle: 'The Weeknd',
                thumbnails: {
                    medium: { url: 'https://i.ytimg.com/vi/hT_nvWreIhg/mqdefault.jpg' }
                }
            }
        },
        {
            id: { videoId: 'fNFzfwLM72c' },
            snippet: {
                title: 'Billie Eilish - bad guy (Demo)',
                channelTitle: 'Billie Eilish',
                thumbnails: {
                    medium: { url: 'https://i.ytimg.com/vi/fNFzfwLM72c/mqdefault.jpg' }
                }
            }
        }
    ];
    
    // Filter demo results based on search query
    const filteredResults = demoResults.filter(video => 
        video.snippet.title.toLowerCase().includes(query.toLowerCase()) ||
        video.snippet.channelTitle.toLowerCase().includes(query.toLowerCase())
    );
    
    searchResults = filteredResults.length > 0 ? filteredResults : demoResults.slice(0, 3);
    displayResults(searchResults);
    
    showMessage('Demo mode: Using sample videos. Add your YouTube API key for real search results.', 'info');
}

// Display search results
function displayResults(results) {
    resultsGrid.innerHTML = '';
    
    if (results.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    results.forEach(video => {
        const videoItem = createVideoItem(video);
        resultsGrid.appendChild(videoItem);
    });
}

// Create video item element
function createVideoItem(video) {
    const videoItem = document.createElement('div');
    videoItem.className = 'video-item';
    videoItem.setAttribute('tabindex', '0');
    
    const thumbnail = video.snippet.thumbnails.medium?.url || 
                     video.snippet.thumbnails.default?.url || 
                     'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjY4IiB2aWV3Qm94PSIwIDAgMTIwIDY4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjY4IiBmaWxsPSIjZjBmMGYwIi8+Cjx0ZXh0IHg9IjYwIiB5PSIzNCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
    
    videoItem.innerHTML = `
        <img src="${thumbnail}" alt="${video.snippet.title}" class="video-thumbnail" 
             onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjY4IiB2aWV3Qm94PSIwIDAgMTIwIDY4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjY4IiBmaWxsPSIjZjBmMGYwIi8+Cjx0ZXh0IHg9IjYwIiB5PSIzNCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K'">
        <div class="video-details">
            <div class="video-title">${escapeHtml(video.snippet.title)}</div>
            <div class="video-channel">${escapeHtml(video.snippet.channelTitle)}</div>
        </div>
    `;
    
    // Add click event to play video
    videoItem.addEventListener('click', () => selectVideo(video));
    videoItem.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectVideo(video);
        }
    });
    
    return videoItem;
}

// Select and load video
function selectVideo(video) {
    const videoId = video.id.videoId;
    const title = video.snippet.title;
    
    currentVideoId = videoId;
    currentTitle.textContent = title;
    
    // Show controls and hide placeholder
    placeholder.style.display = 'none';
    playerDiv.style.display = 'block';
    controls.style.display = 'flex';
    
    // Create or update YouTube player
    if (player) {
        player.loadVideoById(videoId);
    } else {
        createPlayer(videoId);
    }
    
    // Scroll to player on mobile
    if (window.innerWidth <= 768) {
        document.querySelector('.player-section').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }
}

// Create YouTube player
function createPlayer(videoId) {
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
            'playsinline': 1,
            'autoplay': 0,
            'controls': 1,
            'rel': 0,
            'modestbranding': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        }
    });
}

// Player event handlers
function onPlayerReady(event) {
    console.log('Player is ready');
}

function onPlayerStateChange(event) {
    // Update control buttons based on player state
    if (event.data === YT.PlayerState.PLAYING) {
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'flex';
    } else {
        playBtn.style.display = 'flex';
        pauseBtn.style.display = 'none';
    }
}

function onPlayerError(event) {
    console.error('Player error:', event.data);
    showMessage('Error loading video. Please try another video.', 'error');
}

// Player controls
function playVideo() {
    if (player && player.playVideo) {
        player.playVideo();
    }
}

function pauseVideo() {
    if (player && player.pauseVideo) {
        player.pauseVideo();
    }
}

// Utility functions
function showLoading(show) {
    loading.style.display = show ? 'block' : 'none';
    if (show) {
        resultsGrid.innerHTML = '';
        noResults.style.display = 'none';
    }
}

function showMessage(message, type = 'info') {
    // Create or update message element
    let messageEl = document.querySelector('.message');
    if (!messageEl) {
        messageEl = document.createElement('div');
        messageEl.className = 'message';
        document.querySelector('.container').appendChild(messageEl);
    }
    
    messageEl.textContent = message;
    messageEl.className = `message ${type}`;
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#ff4444' : type === 'info' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
        font-size: 14px;
        line-height: 1.4;
    `;
    
    // Add CSS for animation if not exists
    if (!document.querySelector('#message-styles')) {
        const style = document.createElement('style');
        style.id = 'message-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        if (messageEl) {
            messageEl.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => {
                if (messageEl && messageEl.parentNode) {
                    messageEl.parentNode.removeChild(messageEl);
                }
            }, 300);
        }
    }, 5000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Responsive handling
window.addEventListener('resize', function() {
    if (player && player.getIframe) {
        // YouTube player automatically handles responsive resizing
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Space bar to play/pause (when not focused on input)
    if (e.code === 'Space' && e.target !== searchInput && player) {
        e.preventDefault();
        if (player.getPlayerState() === YT.PlayerState.PLAYING) {
            pauseVideo();
        } else {
            playVideo();
        }
    }
    
    // Enter to search when focused on search input
    if (e.key === 'Enter' && e.target === searchInput) {
        performSearch();
    }
    
    // Escape to focus search input
    if (e.key === 'Escape') {
        searchInput.focus();
    }
});

// Initialize search input focus
searchInput.focus();