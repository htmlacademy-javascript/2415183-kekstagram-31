import {pictures, photoData} from './miniatures.js'; // pictures - миниатюры ; photoData - функция создания миниатюр
import {isEscapeKey, openPopup, closePopup} from './util.js';

const COMMENT_LIMIT = 5;

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const popup = document.querySelector('.big-picture__preview');
const image = bigPicture.querySelector('.big-picture__img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const descriptionPhoto = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const loadMoreButton = bigPicture.querySelector('.comments-loader');
const overlay = document.querySelector('.overlay');
const pictureDataFragment = document.createDocumentFragment();

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  }
};

// функция создания комментария
const createElement = (comment) => {
  const element = document.createElement('li');
  const newImage = document.createElement('img');
  const text = document.createElement('p');
  element.classList.add('social__comment');
  newImage.classList.add('social__picture');
  newImage.style.width = '35px';
  newImage.style.height = '35px';
  newImage.src = comment.avatar;
  newImage.alt = comment.name;
  element.append(newImage);
  text.classList.add('social__text');
  text.textContent = comment.message;
  element.append(text);
  pictureDataFragment.append(element);
};

// функция создания списка комментариев
const createComments = () => {
  let count = 0;
  return function (comments, index, limit) {
    for (let i = index; i < comments.length; i++) {
      createElement(comments[i]);
      count++;
      if (i >= limit) {
        break;
      }
    }
    commentShownCount.textContent = count;
    socialComments.append(pictureDataFragment);
  };
};


// событие открытия экрана
pictures.addEventListener('click', (evt) => {
  let index = 0;
  let limit = 4;
  const createElements = createComments();

  // перебор массива объектов с данными
  photoData.forEach(({ id, url, likes, description, comments }) => {
    const onLoadButtonClick = () => {
      index += COMMENT_LIMIT;
      limit += COMMENT_LIMIT;
      createElements(comments, index, limit);
    };
    const modalClose = () => {
      closePopup(bigPicture, onDocumentKeydown);
      body.classList.remove('modal-open');
      loadMoreButton.removeEventListener('click', onLoadButtonClick);
    };
    if (Number(evt.target.closest('.picture').dataset.id) === id) {
      image.children[0].src = url;
      likesCount.textContent = likes;
      descriptionPhoto.textContent = description;
      commentTotalCount.textContent = comments.length;
      body.classList.add('modal-open');
      socialComments.innerHTML = '';
      createElements(comments, index, limit);
      openPopup(bigPicture, onDocumentKeydown);
      if (comments.length >= COMMENT_LIMIT) {
        loadMoreButton.classList.remove('hidden');
        loadMoreButton.addEventListener('click', onLoadButtonClick);
      } else {
        loadMoreButton.classList.add('hidden');
      }
    }
    // событие закрытия окна
    closeButton.addEventListener('click', modalClose);
    overlay.addEventListener('click', modalClose);
  });
});

popup.addEventListener('click', (evt) => {
  evt.stopPropagation();
});

