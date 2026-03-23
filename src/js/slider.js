const prevBtn = document.querySelector(".arrow-btn--left");
const nextBtn = document.querySelector(".arrow-btn--right");
const slideCollection = document.querySelectorAll(".slider__slide");
const slideOverlay = document.querySelectorAll(".slider__overlay");

let currentPosition = 0;
let currentIndex = 0;
const slideWidth = 300;
const gap = 20;
const totalSlides = slideCollection.length;
const visibleSlides = 5;

const maxPosition = -slideWidth * (totalSlides - visibleSlides);

function updateSliderPosition() {
  slideCollection.forEach((item) => {
    item.style.transform = `translateX(${currentPosition}px)`;
  });
}

function updateActiveSlide() {
  slideOverlay.forEach((item) => {
    item.classList.remove("active-slide");
  });

  if (slideOverlay[currentIndex]) {
    slideOverlay[currentIndex].classList.add("active-slide");
  }
}

nextBtn.addEventListener("click", () => {
  if (currentIndex < totalSlides - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  updateActiveSlide();
  currentPosition -= slideWidth + gap;
  if (currentPosition < maxPosition) {
    currentPosition = 0;
  }
  updateSliderPosition();
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = totalSlides - 1;
  }
  updateActiveSlide();
  currentPosition += slideWidth + gap;
  if (currentPosition > 0) {
    currentPosition = maxPosition;
  }
  updateSliderPosition();
});

const slider = document.querySelector(".slider");

let isDragging = false;
let startX = 0;
let currentTranslate = currentPosition;
let prevTranslate = 0;

function handleDragStart(e) {
  isDragging = true;
  startX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
  prevTranslate = currentTranslate;

  e.preventDefault();
}

function handleDragMove(e) {
  if (!isDragging) return;

  const currentX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
  const deltaX = currentX - startX;
  currentTranslate = prevTranslate + deltaX;

  slideCollection.forEach((item) => {
    item.style.transform = `translateX(${currentTranslate}px)`;
  });
}

function handleDragEnd() {
  if (!isDragging) return;

  isDragging = false;

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -50 && currentIndex < totalSlides - 1) {
    currentIndex++;
  } else if (movedBy > 50 && currentIndex > 0) {
    currentIndex--;
  }

  currentPosition = currentIndex * -(slideWidth + gap);
  updateSliderPosition();
  updateActiveSlide();

  currentTranslate = currentPosition;
}

slider.addEventListener("mousedown", handleDragStart);
slider.addEventListener("mousemove", handleDragMove);
slider.addEventListener("mouseup", handleDragEnd);
slider.addEventListener("mouseleave", handleDragEnd);

slider.addEventListener("touchstart", handleDragStart);
slider.addEventListener("touchmove", handleDragMove);
slider.addEventListener("touchend", handleDragEnd);

updateActiveSlide();
