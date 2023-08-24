const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const dots = document.querySelectorAll('.dot');

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
