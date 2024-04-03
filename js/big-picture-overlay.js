import {pictures, photoData} from './miniatures.js';
import {isEscapeKey} from './util.js';

/* const bodyElement = document.querySelector('body');
const overlay = document.querySelector('.overlay');
const preview = document.querySelector('.big-picture');
const popup = preview.querySelector('.big-picture__preview');
const previewCLose = preview.querySelector('.big-picture__cancel');
const previewImage = preview.querySelector('.big-picture__img').querySelector('img');
const previewLikes = preview.querySelector('.likes-count');
const previewCommentsBlock = preview.querySelector('.social__comments');
const previewCommentsCount = preview.querySelector('.social__comment-shown-count');
const previewCommentsTotal = preview.querySelector('.social__comment-total-count');
const previewCaption = preview.querySelector('.social__caption');
const loadCommentsButton = preview.querySelector('.comments-loader');
const pictureDataFragment = document.createDocumentFragment;
const maxComments = 5;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    preview.classList.add('hidden');
  }
};

const createComment = (comment) => {
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

const createCommentsAmount = () => {
  let count = 0;
  return function (comments, index, limit) {
    for (let i = index; i < comments.length; i++){
      createComment(comments[i]);
      count++;
      if (i >= limit) {
        break;
      }
    }
    previewCommentsCount.textContent = count;
    previewCommentsBlock.append(pictureDataFragment);
    if (count === comments.length){
      loadCommentsButton.classList.add('hidden');
    }
  };
};

pictures.addEventListener('click', (evt) => {
  let index = 0;
  let limit = 4;
  const createRandom = createCommentsAmount();

  photoData.forEach(({ id, url, likes, description, comments }) => {
    const onClickLoadButton = () => {
      index += maxComments;
      limit += maxComments;
      createRandom (comments, index, limit);
    };

    const modalClose = () => {
      closePopup(preview, onDocumentKeydown);
      bodyElement.classList.remove('modal-open');
      loadCommentsButton.removeEventListener('click', onClickLoadButton);
    };

    if (+(evt.target.closest('.picture').dataset.id) === id) {
      previewImage.src = url;
      previewLikes.textContent = likes;
      previewCaption.textContent = description;
      previewCommentsTotal.textContent = comments.length;
      bodyElement.classList.add('modal-open');
      previewCommentsBlock.innerHTML = '';
      createRandom (comments, index, limit);
      openPopup(preview, onDocumentKeydown);

      if (comments.length >= maxComments){
        loadCommentsButton.addEventListener('click', () => {
          loadCommentsButton.classList.remove('hidden');
          loadCommentsButton.addEventListener('click', onClickLoadButton);
          createRandom (comments, index, limit);
        });
      } else {
        loadCommentsButton.classList.add('hidden');
      }
    }
    previewCLose.addEventListener('click', modalClose);
    overlay.addEventListener('click', modalClose);
  });
});

popup.addEventListener('click', (evt) => {
  evt.stopPropagation();
}); */


const body = document.querySelector('body');
const popup = document.querySelector('.big-picture');
const image = popup.querySelector('.big-picture__img');
const likesCount = popup.querySelector('.likes-count');
const commentShownCount = popup.querySelector('.social__comment-shown-count');
const commentTotalCount = popup.querySelector('.social__comment-total-count');
const descriptionPhoto = popup.querySelector('.social__caption');
const socialComments = popup.querySelector('.social__comments');
const closeButton = popup.querySelector('.big-picture__cancel');
const loadMoreButton = popup.querySelector('.comments-loader');
const pictureDataFragment = document.createDocumentFragment();

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    popup.classList.add('hidden');
  }
};

const openPopup = () => {
  popup.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closePopup = () => {
  popup.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
};

// Создает комментарий
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

// Создает список комментариев
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

//Событие для открытия экрана
pictures.addEventListener('click', (evt) => {
  let index = 0;
  let limit = 4;
  const createSome = createComments();

  //Перебирает массив объектов с данными
  photoData.forEach(({ id, url, likes, description, comments }) => {
    if (Number(evt.target.closest('.picture').dataset.id) === id) {
      image.children[0].src = url;
      likesCount.textContent = likes;
      descriptionPhoto.textContent = description;
      commentTotalCount.textContent = comments.length;
      body.classList.add('modal-open');
      socialComments.innerHTML = '';
      createSome(comments, index, limit);
      openPopup();
      if (comments.length >= 5) {
        loadMoreButton.addEventListener('click', () => {
          index += 5;
          limit += 5;
          createSome(comments, index, limit);
        });
      }
    }
  });

  //Событие, закрывающее окно
  closeButton.addEventListener('click', () => {
    closePopup();
  });
});
