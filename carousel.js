const carouselContainer = document.getElementById("carousel-container");
const carouselItem = document.querySelector(".carousel-item");
const prevButton = document.getElementById("carousel-arrow-prev");
const nextButton = document.getElementById("carousel-arrow-next");

let carouselIndex = 0;

nextButton.addEventListener('click', (event) => {
    const carouselWidth = carouselItem.clientWidth;
    carouselIndex += 1;
    if (carouselIndex >= carouselContainer.childElementCount) {
        carouselIndex = carouselContainer.childElementCount - 1;
    }
    carouselContainer.scrollLeft = carouselWidth * carouselIndex;
});

prevButton.addEventListener('click', (event) => {
    const carouselWidth = carouselItem.clientWidth;
    carouselIndex -= 1;
    if (carouselIndex <= 0) {
        carouselIndex = 0;
    }
    carouselContainer.scrollLeft = carouselWidth * carouselIndex;
});