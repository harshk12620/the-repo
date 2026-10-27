# Wanderlight — CodeAlpha Image Gallery

A polished, responsive photo gallery built with HTML, CSS, and vanilla JavaScript for CodeAlpha Frontend Development Internship Task 1. Browse a small visual journal of nature, coast, architecture, and city photography.

## Features

- Responsive CSS Grid layout for desktop, tablet, and mobile.
- Category filters with clear active states.
- Accessible image descriptions, semantic landmarks, focus indicators, and keyboard-operable controls.
- Full-size modal lightbox with previous/next buttons, wraparound navigation, a close button, and Escape-key support.
- Left/right arrow-key navigation while the lightbox is open, plus focus restoration when it closes.
- Smooth image hover effects and reduced-motion support.
- Graceful SVG image fallback if a sample image cannot be loaded.
- No frameworks or runtime dependencies.

## Technologies

- HTML5
- CSS3 (Grid, responsive media queries, transitions)
- Vanilla JavaScript
- Sample photography served by [Unsplash](https://unsplash.com)

An internet connection is needed to load the sample photos and optional Google Fonts. If a photo does not load, the gallery displays a styled fallback image instead.

## Run locally

1. Open this folder in Visual Studio Code.
2. Install the **Live Server** extension if it is not already installed.
3. Open `index.html`, then select **Go Live** in the VS Code status bar (or right-click the file and choose **Open with Live Server**).
4. Live Server opens the gallery in your browser. The project can also be opened directly as `index.html`.

## Project files

```text
CodeAlpha_ImageGallery/
├── index.html
├── style.css
├── script.js
└── README.md
```
