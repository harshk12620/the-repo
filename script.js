"use strict";

const photos = [
  {
    title: "The long way home",
    location: "Dolomites, Italy",
    category: "nature",
    description: "A still morning among the mountains.",
    alt: "Mountain peaks reflected in a quiet alpine lake at sunrise",
    image: "photo-1470770841072-f978cf4d019e",
  },
  {
    title: "Where the road ends",
    location: "Madeira, Portugal",
    category: "coast",
    description: "Cliffs looking out toward an endless blue.",
    alt: "Dramatic green cliffs meeting a deep blue ocean",
    image: "photo-1518837695005-2083093ee35b",
  },
  {
    title: "Quiet geometry",
    location: "Copenhagen, Denmark",
    category: "architecture",
    description: "Clean lines and a little afternoon light.",
    alt: "Modern building facade with crisp geometric lines",
    image: "photo-1487958449943-2429e8be8625",
  },
  {
    title: "A city in bloom",
    location: "Kyoto, Japan",
    category: "city",
    description: "A softer moment in the middle of the city.",
    alt: "City street framed by flowering trees in soft daylight",
    image: "photo-1519501025264-65ba15a82390",
  },
  {
    title: "After the rain",
    location: "The Lake District, England",
    category: "nature",
    description: "Clouds lift over a valley of green.",
    alt: "Misty green valley and hills after a rain shower",
    image: "photo-1470252649378-9c29740c9fa8",
  },
  {
    title: "Salt in the air",
    location: "Amalfi Coast, Italy",
    category: "coast",
    description: "The shoreline at its most unhurried.",
    alt: "Waves rolling toward a sunlit Mediterranean shoreline",
    image: "photo-1500375592092-40eb2168fd21",
  },
  {
    title: "The open house",
    location: "Lisbon, Portugal",
    category: "architecture",
    description: "A bright facade catching the last of the sun.",
    alt: "Sunlit white architectural facade with repeating windows",
    image: "photo-1511818966892-d7d671e672a2",
  },
  {
    title: "Blue hour",
    location: "New York, USA",
    category: "city",
    description: "Windows begin to glow as evening settles in.",
    alt: "City skyline at dusk with lights beginning to glow",
    image: "photo-1480714378408-67cf0d13bc1b",
  },
  {
    title: "The quiet between",
    location: "Banff, Canada",
    category: "nature",
    description: "A lake holding onto the mountain sky.",
    alt: "Turquoise mountain lake surrounded by evergreen forest",
    image: "photo-1501785888041-af3ef285b470",
  },
  {
    title: "Tide lines",
    location: "Big Sur, California",
    category: "coast",
    description: "A coastline shaped by wind and water.",
    alt: "Rugged coastal cliffs above the Pacific Ocean",
    image: "photo-1464822759023-fed622ff2c3b",
  },
  {
    title: "A little symmetry",
    location: "Berlin, Germany",
    category: "architecture",
    description: "Old stone, new light.",
    alt: "Ornate historic building facade viewed from below",
    image: "photo-1518005020951-eccb494ad742",
  },
  {
    title: "One more block",
    location: "Tokyo, Japan",
    category: "city",
    description: "A busy street seen from a quieter corner.",
    alt: "Lively urban street with buildings and city traffic",
    image: "photo-1449824913935-59a10b8d2000",
  },
];

const imageBase = "https://images.unsplash.com/";
const imageOptions = "?auto=format&fit=crop&w=1000&q=85";
const grid = document.querySelector("#gallery-grid");
const count = document.querySelector("#photo-count");
const filters = document.querySelector(".filters");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxLocation = document.querySelector("#lightbox-location");
const lightboxDescription = document.querySelector("#lightbox-description");
const lightboxCounter = document.querySelector("#lightbox-counter");

let activeFilter = "all";
let visiblePhotos = photos;
let currentIndex = 0;
let lastFocusedElement = null;

function photoUrl(photo, width = 1000) {
  return `${imageBase}${photo.image}${imageOptions.replace("w=1000", `w=${width}`)}`;
}

function fallbackUrl(title) {
  const label = title.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
  })[character]);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#64746c"/><stop offset="1" stop-color="#c3a68e"/></linearGradient></defs><rect width="1200" height="800" fill="url(#g)"/><circle cx="600" cy="320" r="95" fill="#f3e7ce" opacity=".8"/><text x="600" y="540" fill="white" font-family="Georgia,serif" font-size="46" text-anchor="middle">${label}</text><text x="600" y="590" fill="white" font-family="Arial,sans-serif" font-size="20" text-anchor="middle">Image temporarily unavailable</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function useFallback(image, title) {
  if (image.dataset.fallbackApplied === "true") return;
  image.dataset.fallbackApplied = "true";
  image.alt = `Image unavailable: ${title}`;
  image.src = fallbackUrl(title);
}

function renderGallery() {
  visiblePhotos = activeFilter === "all"
    ? photos
    : photos.filter((photo) => photo.category === activeFilter);

  count.textContent = `${String(visiblePhotos.length).padStart(2, "0")} PHOTOS`;
  grid.replaceChildren();

  visiblePhotos.forEach((photo, index) => {
    const card = document.createElement("article");
    card.className = "photo-card";

    const button = document.createElement("button");
    button.className = "photo-button";
    button.type = "button";
    button.setAttribute("aria-label", `Open ${photo.title}, ${photo.location}`);
    button.addEventListener("click", () => openLightbox(index, button));

    const image = document.createElement("img");
    image.className = "photo-image";
    image.src = photoUrl(photo, 700);
    image.alt = photo.alt;
    image.loading = "lazy";
    image.decoding = "async";
    image.addEventListener("error", () => useFallback(image, photo.title));
    button.append(image);

    const meta = document.createElement("div");
    meta.className = "photo-meta";

    const title = document.createElement("span");
    title.className = "photo-title";
    title.textContent = photo.title;

    const category = document.createElement("span");
    category.className = "photo-category";
    category.textContent = photo.category;

    meta.append(title, category);
    card.append(button, meta);
    grid.append(card);
  });
}

function updateLightbox() {
  const photo = visiblePhotos[currentIndex];
  if (!photo) return;

  lightboxImage.dataset.fallbackApplied = "false";
  lightboxImage.src = photoUrl(photo, 1800);
  lightboxImage.alt = photo.alt;
  lightboxImage.onerror = () => useFallback(lightboxImage, photo.title);
  lightboxLocation.textContent = photo.location;
  lightboxDescription.textContent = photo.description;
  lightboxCounter.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${String(visiblePhotos.length).padStart(2, "0")}`;
}

function openLightbox(index, trigger) {
  currentIndex = index;
  lastFocusedElement = trigger;
  updateLightbox();
  lightbox.showModal();
  document.querySelector("#lightbox-close").focus();
}

function closeLightbox() {
  if (lightbox.open) lightbox.close();
}

function moveLightbox(direction) {
  currentIndex = (currentIndex + direction + visiblePhotos.length) % visiblePhotos.length;
  updateLightbox();
}

filters.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-filter]");
  if (!button) return;

  activeFilter = button.dataset.filter;
  filters.querySelectorAll(".filter-button").forEach((filterButton) => {
    const isActive = filterButton === button;
    filterButton.classList.toggle("is-active", isActive);
    filterButton.setAttribute("aria-pressed", String(isActive));
  });
  renderGallery();
});

document.querySelector("#lightbox-close").addEventListener("click", closeLightbox);
document.querySelector("#lightbox-previous").addEventListener("click", () => moveLightbox(-1));
document.querySelector("#lightbox-next").addEventListener("click", () => moveLightbox(1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

lightbox.addEventListener("close", () => {
  if (lastFocusedElement?.isConnected) lastFocusedElement.focus();
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.open) return;
  if (event.key === "Escape") {
    event.preventDefault();
    closeLightbox();
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    moveLightbox(1);
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    moveLightbox(-1);
  }
});

renderGallery();
