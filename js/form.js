import { isEscapeKey, openPopup, closePopup } from './util.js';
const body = document.querySelector('body');
const uploadButton = document.querySelector('.img-upload__input');
const popup = document.querySelector('.img-upload__overlay');
const form = document.querySelector('.img-upload__form');
const uploadButtonClose = popup.querySelector('.img-upload__cancel');
const hashtag = document.querySelector('.text__hashtags');
const textComment = popup.querySelector('.text__description');
const regex = /^#[a-zа-яё0-9]{1,19}$/i;
const LIMIT_OF_HASHTAG = 5;
const LIMIT_OF_COMMENT = 140;

// Создание экземпляра валидатора
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'information__error'
});

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (evt.target === hashtag || evt.target === textComment) {
      evt.stopPropagation();
    } else {
      popup.classList.add('hidden');
      uploadButton.value = ' ';
    }
  }
};

uploadButton.addEventListener('change', () => {
  openPopup(popup, onDocumentKeydown);
  body.classList.add('modal-open');
});

uploadButtonClose.addEventListener('click', () => {
  closePopup(popup, onDocumentKeydown);
  body.classList.remove('modal-open');
});

// Функция для проверки валидности хэштега
const validateHashtagName = (array) => {
  array = hashtag.value.trim().split(' ');
  if (hashtag.value === '') {
    return true;
  }
  for (let i = 0; i < array.length; i++) {
    if (!regex.test(array[i])) {
      return false;
    }
  }
  return true;
};

// Функция для проверки количества введеных хэштегов
const validateHashtagAmount = () => hashtag.value.trim().split(' ').length <= LIMIT_OF_HASHTAG;

// Функция для проверки одинаковых хэштегов
const validateHashtagSimilar = (array) => {
  const hashtagArr = array.toLowerCase().trim().split(' ');
  const uniqueHashtags = [...new Set(hashtagArr)];
  return hashtagArr.length === uniqueHashtags.length;
};

// Функция для проверки количества символов в комментарии
const validateLimitOfComment = () => textComment.value.length <= LIMIT_OF_COMMENT;

pristine.addValidator (
  hashtag,
  validateHashtagName,
  'Используйте #, буквы и цифры'
);

pristine.addValidator (
  hashtag,
  validateHashtagAmount,
  'Допускается не более 5 хэштэгов'
);

pristine.addValidator(
  hashtag,
  validateHashtagSimilar,
  'Хэштэги не должны повторяться'
);

pristine.addValidator(
  textComment,
  validateLimitOfComment,
  'Описание не должно быть длиннее 140 символов'
);

form.addEventListener('submit', (evt) => {
  const valid = pristine.validate();
  if (!valid) {
    evt.preventDefault();
  }
});

