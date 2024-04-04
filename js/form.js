import { isEscapeKey, openPopup, closePopup } from "./util";
const body = document.querySelector('body');
const uploadButton = document.querySelector('.img-upload__input');
const popup = document.querySelector('.img-upload__overlay');
const form = document.querySelector('.img-upload__form');
const uploadCloseButton = document.querySelector('.img-upload__cancel');
const hashtag = document.querySelector('.text__hashtag');
const textComment = document.querySelector('.text__description');

const regex = /^#[a-zа-яё0-9]{1,19}/i;

const HASHTAG_LIMIT = 5;
const COMMENT_MAX_LENGTH = 140;

//создание экземпляра валидации
const pristine = new Pristine (form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParrent: 'img-upload__field-wrapper',
  errorTextClass: 'information__error'
});

//запрет на закрытие окна при фокусе ввода хэштега или описания
const onDocumentKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDeafault();
    if (evt.target === hashtag || evt.target === textComment){
      evt.stopPropagation();
    } else{
      popup.classList.add('hidden');
      uploadButton.value = '';
    }
  }
};

//открытие и закрытие модального окна
uploadButton.addEventListener('change', () =>{
  openPopup(popup, onDocumentKeydown);
  body.classList.add('modal-open');
});

uploadButtonClose.addEventListener('change', () =>{
  closePopupPopup(popup, onDocumentKeydown);
  body.classList.remove('modal-open');
});

//функция валидации хэштега
const hashtagValidation = (array) => {
  array = hashtag.value.trim().split(' ');
  if (hashtag.value === '') {
    return true;
  }
  for (let i = 0; i < array.length; i++){
    if (!regex.test(array[i])) {
      return false;
    }
  }
  return true;
};
