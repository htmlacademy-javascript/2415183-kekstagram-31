import {pictures, otherUserPost} from './miniatures.js';
import {isEscapeKey, openPopup, closePopup} from './util.js';

const bodyElement = document.querySelector('body');
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

  otherUserPost.forEach(({ id, url, likes, description, comments }) => {
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
});


