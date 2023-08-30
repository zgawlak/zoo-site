// image slider
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const dots = document.querySelectorAll('.dot');

// image gallery
const imageItems = document.querySelectorAll('.gallery-img');
const overlay = document.querySelector('.overlay');
const overlayImage = document.querySelector('.overlay-img');
const closeBtn = document.querySelector('.close-btn');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const counter = document.querySelector('.counter');

let currentSlide = 0;
let timer;

function goToSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.style.display = 'block';
        } else if (i === currentSlide) {
            slide.style.display = 'none';
        } else {
            slide.style.display = 'none';
        }
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    currentSlide = index;
    clearInterval(timer);
    timer = setInterval(nextSlide, 8000);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(currentSlide);
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToSlide(index);
    });
});

prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);
goToSlide(currentSlide);


// image gallery
let currentIndex = 0;

function updateOverlay(index) {
    const imageUrl = imageItems[index].querySelector('img').src;
    overlayImage.src = imageUrl;
    counter.textContent = `${index + 1} / ${imageItems.length}`;
    updateButtons();
}

function updateButtons() {
    nextBtn.disabled = currentIndex === imageItems.length - 1;
    prevBtn.disabled = currentIndex === 0;
}

imageItems.forEach((item, index) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        currentIndex = index;
        updateOverlay(currentIndex);
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

closeBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
});

overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

function showNextImage() {
    currentIndex = (currentIndex + 1) % imageItems.length;
    updateOverlay(currentIndex);
}

function showPrevImage() {
    currentIndex = (currentIndex - 1 + imageItems.length) % imageItems.length;
    updateOverlay(currentIndex);
}

nextBtn.addEventListener('click', showNextImage);
prevBtn.addEventListener('click', showPrevImage);
updateOverlay(currentIndex);
