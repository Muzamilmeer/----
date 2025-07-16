# YouTube Music Player

A responsive, modern YouTube-based music player built with HTML, CSS, and JavaScript. This app allows users to search for YouTube videos and play them with custom controls in a beautiful, dark-mode enabled interface.

## Features

- 🔍 **YouTube Video Search** - Search for music videos using YouTube Data API v3
- 🎵 **Embedded Video Player** - Play videos using YouTube's embedded player
- 🎮 **Custom Controls** - Play and pause functionality with responsive controls
- 🌙 **Dark Mode Toggle** - Switch between light and dark themes
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- ⌨️ **Keyboard Shortcuts** - Space to play/pause, Enter to search, Escape to focus search
- 🎨 **Modern UI** - Clean, YouTube-inspired design with smooth animations
- 📋 **Demo Mode** - Works without API key using sample videos

## Demo

The app includes a demo mode with sample videos that works immediately without requiring an API key. Simply open `index.html` in your browser and start searching!

## Setup Instructions

### Quick Start (Demo Mode)
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start searching for music! (Demo mode will show sample results)

### Full Setup with YouTube API
1. **Get a YouTube Data API v3 Key:**
   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the YouTube Data API v3
   - Create credentials (API Key)
   - Copy your API key

2. **Configure the App:**
   - Open `script.js`
   - Replace `'YOUR_API_KEY_HERE'` with your actual API key:
     ```javascript
     const API_KEY = 'your-actual-api-key-here';
     ```

3. **Run the App:**
   - Open `index.html` in your web browser
   - The app will now use real YouTube search results!

## File Structure

```
├── index.html      # Main HTML file with app structure
├── styles.css      # Comprehensive CSS with responsive design and dark mode
├── script.js       # JavaScript with YouTube API integration and app logic
└── README.md       # This documentation file
```

## Usage

### Searching for Videos
1. Enter a search term in the search box
2. Press Enter or click the search button
3. Browse through the results in the sidebar

### Playing Videos
1. Click on any video from the search results
2. The video will load in the main player area
3. Use the custom play/pause controls below the video
4. Or use keyboard shortcuts (Space bar to play/pause)

### Dark Mode
- Click the moon/sun icon in the top right to toggle between light and dark themes
- Your preference is saved and will persist between sessions

### Keyboard Shortcuts
- `Space` - Play/pause current video
- `Enter` - Search (when search input is focused)
- `Escape` - Focus the search input

## Technical Details

### Technologies Used
- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with CSS Grid, Flexbox, and CSS variables
- **Vanilla JavaScript** - No external frameworks or libraries
- **YouTube IFrame API** - For embedded video playback
- **YouTube Data API v3** - For video search functionality
- **Font Awesome** - For icons

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

### API Usage
The app uses the YouTube Data API v3 with the following endpoints:
- `search` - To search for videos based on user queries

API quota usage is minimal, using only the search endpoint with configurable result limits.

## Customization

### Modifying Search Results
Change the number of results by updating the `MAX_RESULTS` constant in `script.js`:
```javascript
const MAX_RESULTS = 10; // Change this number
```

### Styling
The app uses CSS variables for easy theming. Modify the variables in `:root` and `[data-theme="dark"]` selectors in `styles.css` to customize colors and spacing.

### Adding Features
The modular JavaScript structure makes it easy to add new features:
- Additional player controls
- Playlist functionality
- Video queue management
- Social sharing features

## Demo Videos Included
When running in demo mode, the app includes these sample videos:
- Rick Astley - Never Gonna Give You Up
- Luis Fonsi - Despacito ft. Daddy Yankee
- Ed Sheeran - Shape of You
- The Weeknd - Blinding Lights
- Billie Eilish - bad guy

## Security Notes
- Never expose your API key in public repositories
- Use environment variables or server-side proxy for production deployments
- Consider implementing rate limiting for public deployments

## License
This project is open source and available under the MIT License.

## Contributing
Feel free to submit issues, fork the repository, and create pull requests for any improvements.
