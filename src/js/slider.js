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

// Функция для обновления позиции слайдов
function updateSliderPosition() {
  slideCollection.forEach((item) => {
    item.style.transform = `translateX(${currentPosition}px)`;
  });
}

// Функция для обновления активного слайда
function updateActiveSlide() {
  // Удаляем класс active-slide у всех оверлеев
  slideOverlay.forEach((item) => {
    item.classList.remove("active-slide");
  });

  // Добавляем класс active-slide только текущему слайду
  if (slideOverlay[currentIndex]) {
    slideOverlay[currentIndex].classList.add("active-slide");
  }
}

// Обработчики кнопок "Вперед" и "Назад"
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

// Drag & Drop функционал
const slider = document.querySelector(".slider"); // Контейнер слайдера

let isDragging = false; // Флаг, указывающий, что происходит перетаскивание
let startX = 0; // Начальная позиция курсора/пальца
let currentTranslate = currentPosition; // Текущая позиция слайдера
let prevTranslate = 0; // Предыдущая позиция слайдера

// Функция для обработки начала перетаскивания
function handleDragStart(e) {
  isDragging = true;
  startX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
  prevTranslate = currentTranslate;

  // Отключаем стандартное поведение браузера
  e.preventDefault();
}

// Функция для обработки движения
function handleDragMove(e) {
  if (!isDragging) return;

  const currentX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
  const deltaX = currentX - startX; // Разница между текущей и начальной позицией
  currentTranslate = prevTranslate + deltaX;

  // Обновляем позицию слайдов
  slideCollection.forEach((item) => {
    item.style.transform = `translateX(${currentTranslate}px)`;
  });
}

// Функция для завершения перетаскивания
function handleDragEnd() {
  if (!isDragging) return;

  isDragging = false;

  // Определяем, насколько далеко был перетащен слайдер
  const movedBy = currentTranslate - prevTranslate;

  // Переход к следующему или предыдущему слайду
  if (movedBy < -50 && currentIndex < totalSlides - 1) {
    currentIndex++;
  } else if (movedBy > 50 && currentIndex > 0) {
    currentIndex--;
  }

  // Обновляем позицию слайдера
  currentPosition = currentIndex * -(slideWidth + gap);
  updateSliderPosition();
  updateActiveSlide();

  // Возвращаем текущую позицию
  currentTranslate = currentPosition;
}

// Добавляем обработчики событий
slider.addEventListener("mousedown", handleDragStart);
slider.addEventListener("mousemove", handleDragMove);
slider.addEventListener("mouseup", handleDragEnd);
slider.addEventListener("mouseleave", handleDragEnd); // Если курсор покинул область слайдера

// Поддержка сенсорных устройств
slider.addEventListener("touchstart", handleDragStart);
slider.addEventListener("touchmove", handleDragMove);
slider.addEventListener("touchend", handleDragEnd);

// Инициализация активного слайда
updateActiveSlide();
