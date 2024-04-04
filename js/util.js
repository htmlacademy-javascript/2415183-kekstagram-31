//функция получения случайного числа
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//функция получения уникального номера
const getUniqueNumber = (min, max) =>{
  const array = [];
  return function () {
    let number = getRandomInteger(min, max);
    if (array.length >= max - min + 1) {
      return null;
    }
    while (array.includes(number)) {
      number = getRandomInteger(min, max);
    }
    array.push(number);
    return number;
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';
const isEnterKey = (evt) => evt.key === 'Enter';

const openPopup = (popup, onDocumentKeydown) => {
  popup.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closePopup = (popup, onDocumentKeydown) => {
  popup.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
};

export { getRandomInteger, getUniqueNumber, isEscapeKey, isEnterKey, openPopup, closePopup };
