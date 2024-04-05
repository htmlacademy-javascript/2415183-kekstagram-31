const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const inputValue = document.querySelector('.effect-level__value');
const items = document.querySelectorAll('.effects__item');
const image = document.querySelector('.img-upload__preview');
const STEP = 0.1;
const MARVIN_STEP = 1;
const MIN = 0;
const HEAT_MIN = 1;
const MAX = 1;
const MARVIN_MAX = 100;
const PHOBOS_MAX = 3;
const HEAT_MAX = 3;

//Создание слайдера
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
});

//Функция, возвращающая значение для фильтра
const addEffect = (value, index) => {
  switch (index) {
    case 1:
      return `grayscale(${value})`;
    case 2:
      return `sepia(${value})`;
    case 3:
      return `invert(${value}%)`;
    case 4:
      return `blur(${value}px)`;
    case 5:
      return `brightness(${value})`;
  }
};

// Функция, задающая значение интенсивности эффекта при изменении
const updateSlider = (index) => {
  sliderElement.noUiSlider.on('update', () => {
    inputValue.value = sliderElement.noUiSlider.get();
    image.style.filter = addEffect(inputValue.value, index);
  });
};



