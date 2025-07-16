// Replace this with your own YouTube Data API v3 key
const API_KEY = 'AIzaSyBNd45uhTNRfzMhtUiXJ8gNeUNzPKtx_Z8';
const MAX_RESULTS = 10;

// DOM Elements
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

// Global Variables
let player;
let currentVideoId = null;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  setupEvents();
  if (typeof YT !== 'undefined' && YT.loaded) onYouTubeIframeAPIReady();
});

function onYouTubeIframeAPIReady() {
  console.log('YouTube IFrame API Ready');
}

// Search YouTube
async function performSearch() {
  const query = searchInput.value.trim();
  if (!query) return;

  showLoading(true);
  resultsGrid.innerHTML = '';
  noResults.style.display = 'none';

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${MAX_RESULTS}&q=${encodeURIComponent(
        query
      )}&type=video&key=${API_KEY}`
    );
    const data = await response.json();
    const results = data.items || [];

    if (!results.length) {
      noResults.style.display = 'block';
    } else {
      results.forEach(video => {
        const videoElement = createVideoItem(video);
        resultsGrid.appendChild(videoElement);
      });
    }
  } catch (error) {
    console.error('API Error:', error);
    alert('Failed to fetch videos. Check API key.');
  } finally {
    showLoading(false);
  }
}

// Create video card
function createVideoItem(video) {
  const div = document.createElement('div');
  div.className = 'video-item';
  div.innerHTML = `
    <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}" />
    <h4>${video.snippet.title}</h4>
    <p>${video.snippet.channelTitle}</p>
  `;
  div.onclick = () => loadVideo(video.id.videoId, video.snippet.title);
  return div;
}

// Load and play selected video
function loadVideo(videoId, title) {
  currentVideoId = videoId;
  currentTitle.textContent = title;
  placeholder.style.display = 'none';
  playerDiv.style.display = 'block';
  controls.style.display = 'flex';

  if (player) {
    player.loadVideoById(videoId);
  } else {
    player = new YT.Player('player', {
      videoId: videoId,
      events: {
        onStateChange: onPlayerStateChange,
      },
    });
  }
}

// Player button controls
function playVideo() {
  if (player) player.playVideo();
}
function pauseVideo() {
  if (player) player.pauseVideo();
}
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
  } else {
    playBtn.style.display = 'block';
    pauseBtn.style.display = 'none';
  }
}

// Theme Toggle
function initializeTheme() {
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  updateIcon(saved);
}
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateIcon(next);
}
function updateIcon(theme) {
  themeToggle.innerHTML =
    theme === 'dark'
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
}

// Spinner
function showLoading(state) {
  loading.style.display = state ? 'block' : 'none';
}

// Event Listeners
function setupEvents() {
  searchBtn.onclick = performSearch;
  searchInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') performSearch();
  });
  themeToggle.onclick = toggleTheme;
  playBtn.onclick = playVideo;
  pauseBtn.onclick = pauseVideo;
}
